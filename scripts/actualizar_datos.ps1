$ErrorActionPreference = "Stop"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptDir

$catalogoJsonPath = Join-Path $projectRoot "data\catalogo.json"
if (-not (Test-Path $catalogoJsonPath)) {
  Write-Error "No se encontro catalogo.json"
  exit 1
}

$catalogoRaw = [System.IO.File]::ReadAllText($catalogoJsonPath, [System.Text.Encoding]::UTF8)
$catalogoObj = $catalogoRaw | ConvertFrom-Json

$capDataMap = [ordered]@{}
$totalCapitulos = 0

foreach ($curso in $catalogoObj.cursos) {
  foreach ($asig in $curso.asignaturas) {
    foreach ($tema in $asig.temas) {
      foreach ($cap in $tema.capitulos) {
        $totalCapitulos++
        $relPath = $cap.archivo
        $fullPath = Join-Path $projectRoot ($relPath -replace '/', '\')
        if (Test-Path $fullPath) {
          $capContent = [System.IO.File]::ReadAllText($fullPath, [System.Text.Encoding]::UTF8)
          $capDataMap[$cap.id] = $capContent
          $capDataMap[$relPath] = $capContent
          Write-Host "  [OK] Capitulo: $($cap.id)" -ForegroundColor Green
        } else {
          Write-Warning "  [AVISO] No encontrado: $fullPath"
        }
      }
    }
  }
}

$sb = [System.Text.StringBuilder]::new()
[void]$sb.AppendLine("// catalogo_data.js - Generado automaticamente para compatibilidad file://")
[void]$sb.AppendLine("(function() {")
[void]$sb.AppendLine("  'use strict';")
[void]$sb.AppendLine("  window.CATALOGO_DATA = $catalogoRaw;")
[void]$sb.AppendLine("  window.CAPITULOS_DATA = {")

$first = $true
foreach ($entry in $capDataMap.GetEnumerator()) {
  if (-not $first) { [void]$sb.AppendLine(",") }
  $first = $false
  $k = $entry.Key
  $v = $entry.Value
  [void]$sb.Append("    `"$k`": $v")
}

[void]$sb.AppendLine("")
[void]$sb.AppendLine("  };")
[void]$sb.AppendLine("})();")

$outputPath = Join-Path $projectRoot "data\catalogo_data.js"
[System.IO.File]::WriteAllText($outputPath, $sb.ToString(), [System.Text.Encoding]::UTF8)
Write-Host "catalogo_data.js actualizado con exito ($totalCapitulos capitulos)." -ForegroundColor Cyan
