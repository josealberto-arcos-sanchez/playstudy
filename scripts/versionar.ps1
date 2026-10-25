# versionar.ps1 - Genera sw_version.js (version de cache + lista de precache del SW).
#
# La version de la cache ('playstudy-<hash>') se deriva del contenido del shell
# de la PWA (index.html, manifest.json, css/, src/game_bundle.js e icons/), asi
# que cualquier cambio de codigo o estilos mueve la version automaticamente y el
# Service Worker antiguo se descarta solo: nadie tiene que acordarse de subir un
# numero a mano. La lista de URLs de precache tambien se genera escaneando esos
# mismos directorios: anadir un CSS nuevo no requiere tocar ninguna lista.
#
# Uso:
#   powershell -ExecutionPolicy Bypass -File scripts/versionar.ps1          -> regenera sw_version.js
#   powershell -ExecutionPolicy Bypass -File scripts/versionar.ps1 -Check   -> solo comprueba la sincronizacion (exit 1 si no coincide)
#
# jugar.bat ejecuta este script al arrancar y el workflow "Versionado SW"
# comprueba en cada PR que el sw_version.js subido a git coincide con el shell.
# sw.js carga este archivo con importScripts(): no hay logica a mano por aqui.

param([switch]$Check)

$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$OutFile     = Join-Path $ProjectRoot "sw_version.js"

# ── Shell de la PWA: los mismos archivos que se pre-cachean ──────────────────
# Rutas relativas al raiz del proyecto, orden estable (ordenadas) para que el
# hash no dependa del orden que devuelva el sistema de archivos.
function Get-ShellFiles {
  $raiz = @('index.html', 'manifest.json', 'src/game_bundle.js')
  $css   = Get-ChildItem (Join-Path $ProjectRoot 'css')   -File | ForEach-Object { 'css/'   + $_.Name }
  $icons = Get-ChildItem (Join-Path $ProjectRoot 'icons') -File | ForEach-Object { 'icons/' + $_.Name }
  return @($raiz + $css + $icons) | Sort-Object
}

# Comparacion insensible a CRLF/LF para que -Check funcione con cualquier
# configuracion de git (autocrlf) en la maquina que lo ejecute.
function Get-CanonicalContent([string]$path) {
  return ([System.IO.File]::ReadAllText($path) -replace "`r`n", "`n")
}

# ── Hash del contenido del shell → version de la cache ──────────────────────
function Get-ShellHash([string[]]$files) {
  $sb = New-Object System.Text.StringBuilder
  foreach ($f in $files) {
    $ruta = Join-Path $ProjectRoot ($f -replace '/', '\')
    if (-not (Test-Path $ruta)) { throw "Falta un archivo del shell: $f" }
    [void]$sb.Append($f); [void]$sb.Append("`n")
    [void]$sb.Append((Get-CanonicalContent $ruta)); [void]$sb.Append("`n")
  }
  $sha = [System.Security.Cryptography.SHA256]::Create()
  try {
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($sb.ToString())
    $hex = ($sha.ComputeHash($bytes) | ForEach-Object { $_.ToString('x2') }) -join ''
  } finally { $sha.Dispose() }
  return $hex.Substring(0, 8)
}

# ── Contenido de sw_version.js ──────────────────────────────────────────────
function New-SwVersionContent([string]$hash, [string[]]$files) {
  $urls = ($files | ForEach-Object { "    '$_'," }) -join "`n"
  $banner = @(
    "/* GENERADO AUTOMATICAMENTE por scripts/versionar.ps1. NO EDITAR A MANO:"
    "   la version de la cache y la lista de precache se derivan del contenido"
    "   del shell (index.html, manifest.json, css/, src/game_bundle.js, icons/)."
    "   Regenera con: powershell -ExecutionPolicy Bypass -File scripts/versionar.ps1 */"
  ) -join "`n"
  return @(
    $banner
    "self.PLAYSTUDY_SW = {"
    "  cacheName: 'playstudy-$hash',"
    "  precacheUrls: ["
    $urls
    "  ],"
    "};"
  ) -join "`n"
}

# ── Generar / comprobar ──────────────────────────────────────────────────────
$shellFiles = Get-ShellFiles
$hash       = Get-ShellHash $shellFiles
$generado   = New-SwVersionContent $hash $shellFiles

if ($Check) {
  if (-not (Test-Path $OutFile)) {
    Write-Host "DESINCRONIZADO: falta sw_version.js (se genera con scripts/versionar.ps1)." -ForegroundColor Red
    exit 1
  }
  $subido = (Get-CanonicalContent $OutFile) -replace "`n+$", ''
  if ($generado -eq $subido) {
    Write-Host "OK: sw_version.js esta sincronizado con el shell de la PWA (playstudy-$hash)." -ForegroundColor Green
    exit 0
  }
  Write-Host "DESINCRONIZADO: sw_version.js no coincide con el contenido actual del shell." -ForegroundColor Red
  Write-Host "Regeneralo antes de subir:" -ForegroundColor Red
  Write-Host "  powershell -ExecutionPolicy Bypass -File scripts/versionar.ps1"
  exit 1
}

$utf8 = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($OutFile, $generado + "`n", $utf8)
Write-Host "sw_version.js regenerado: version de cache playstudy-$hash ($($shellFiles.Count) recursos de precache)." -ForegroundColor Green