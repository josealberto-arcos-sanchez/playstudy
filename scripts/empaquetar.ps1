# empaquetar.ps1 - Genera src/game_bundle.js a partir de los modulos de src/.
#
# El bundle es la unica pieza de codigo que carga index.html: los modulos ES
# no funcionan al abrir el juego con doble clic (file://), asi que se empaquetan
# en un unico script clasico con esbuild. NO se edita a mano: se regenera con
# este script y el workflow "Bundle sincronizado" comprueba en cada PR que
# el bundle subido a git coincide con lo que generan los modulos.
#
# Uso:
#   powershell -ExecutionPolicy Bypass -File scripts/empaquetar.ps1          -> regenera src/game_bundle.js
#   powershell -ExecutionPolicy Bypass -File scripts/empaquetar.ps1 -Check   -> solo comprueba la sincronizacion (exit 1 si no coincide)
#
# La primera ejecucion descarga el binario de esbuild (unos 10 MB) a tools/ y
# verifica su checksum SHA-512 contra el registro de npm. tools/ esta ignorado
# por git y solo hace falta conexion para esa primera descarga.

param([switch]$Check)

$ErrorActionPreference = "Stop"

# Conexion segura para Invoke-WebRequest/RestMethod en Windows PowerShell 5.1
[Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12

# ── Configuracion (actualizar esbuild = cambiar solo la version) ──────────────
$EsbuildVersion  = "0.28.2"
$PlatformPackage = "win32-x64"   # binario de Windows, igual que el resto de scripts del proyecto
$ProjectRoot     = Split-Path -Parent $PSScriptRoot
$ToolsDir        = Join-Path $ProjectRoot "tools"
$EsbuildExe      = Join-Path $ToolsDir "esbuild.exe"
$EntryFile       = "src/app.js"          # raiz del grafo de modulos
$BundleFile      = "src/game_bundle.js"  # artefacto generado (se sube a git para que file:// funcione sin servidor)
$Banner          = "/* GENERADO AUTOMATICAMENTE por scripts/empaquetar.ps1 con esbuild $EsbuildVersion. NO EDITAR A MANO: edita los modulos de src y regenera con: powershell -ExecutionPolicy Bypass -File scripts/empaquetar.ps1 */"

# ── Asegurar el binario de esbuild ────────────────────────────────────────────
function Ensure-Esbuild {
  if (Test-Path $EsbuildExe) {
    $version = (& $EsbuildExe --version) | Out-String
    if ($version.Trim() -eq $EsbuildVersion) { return }
    Write-Host "La version de esbuild en tools/ no coincide; se vuelve a descargar." -ForegroundColor Yellow
    Remove-Item $EsbuildExe -Force
  }

  New-Item -ItemType Directory -Force -Path $ToolsDir | Out-Null
  Write-Host "Descargando esbuild $EsbuildVersion (@esbuild/$PlatformPackage)..." -ForegroundColor Cyan

  $manifestUrl = "https://registry.npmjs.org/@esbuild%2F$PlatformPackage/$EsbuildVersion"
  $manifest = Invoke-RestMethod -Uri $manifestUrl -UseBasicParsing
  $tarball      = $manifest.dist.tarball
  $expectedHash = ($manifest.dist.integrity -replace '^sha512-', '')

  $tarPath = Join-Path $ToolsDir "esbuild.tgz"
  Invoke-WebRequest -Uri $tarball -OutFile $tarPath -UseBasicParsing

  $sha512 = [System.Security.Cryptography.SHA512]::Create()
  try {
    $actualHash = [Convert]::ToBase64String($sha512.ComputeHash([System.IO.File]::ReadAllBytes($tarPath)))
  } finally { $sha512.Dispose() }
  if ($actualHash -ne $expectedHash) {
    Remove-Item $tarPath -Force
    throw "El checksum SHA-512 del archivo descargado no coincide con el registro de npm."
  }

  & tar -xf $tarPath -C $ToolsDir
  if ($LASTEXITCODE -ne 0) { throw "No se pudo extraer el archivo descargado." }
  Move-Item (Join-Path $ToolsDir "package\esbuild.exe") $EsbuildExe -Force
  Remove-Item (Join-Path $ToolsDir "package") -Recurse -Force
  Remove-Item $tarPath -Force
  Write-Host "esbuild listo en tools/esbuild.exe (no se sube a git)." -ForegroundColor Green
}

# ── Generar el bundle (desde la raiz, para rutas estables en el output) ──────
function Invoke-Build([string]$outPath) {
  Push-Location $ProjectRoot
  try {
    & $EsbuildExe $EntryFile --bundle --format=iife "--outfile=$outPath" "--banner:js=$Banner"
    if ($LASTEXITCODE -ne 0) { throw "esbuild fallo con codigo de salida $LASTEXITCODE." }
  } finally {
    Pop-Location
  }
}

# Comparacion insensible a CRLF/LF para que -Check funcione con cualquier
# configuracion de git (autocrlf) en la maquina que lo ejecute.
function Get-CanonicalContent([string]$path) {
  return ([System.IO.File]::ReadAllText($path) -replace "`r`n", "`n")
}

Ensure-Esbuild

if ($Check) {
  $tmp = Join-Path ([System.IO.Path]::GetTempPath()) "playstudy_bundle_check.js"
  try {
    Invoke-Build $tmp
    $generado = Get-CanonicalContent $tmp
    $subido   = Get-CanonicalContent (Join-Path $ProjectRoot $BundleFile)
    if ($generado -eq $subido) {
      Write-Host "OK: src/game_bundle.js esta sincronizado con los modulos de src/." -ForegroundColor Green
      exit 0
    }
    Write-Host "DESINCRONIZADO: src/game_bundle.js no coincide con lo que generan los modulos de src/." -ForegroundColor Red
    Write-Host "Edita los modulos de src/ y regenera el bundle antes de subir:" -ForegroundColor Red
    Write-Host "  powershell -ExecutionPolicy Bypass -File scripts/empaquetar.ps1"
    exit 1
  } finally {
    Remove-Item $tmp -Force -ErrorAction SilentlyContinue
  }
} else {
  Invoke-Build $BundleFile
  Write-Host "Bundle regenerado: $BundleFile" -ForegroundColor Green
  Write-Host "Recuerda: si cambia la shell de la PWA (este bundle o CSS), sube la version CACHE_NAME en sw.js." -ForegroundColor Yellow
}
