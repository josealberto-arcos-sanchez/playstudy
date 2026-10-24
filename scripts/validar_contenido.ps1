$ErrorActionPreference = "Stop"

# Valida el contenido de todos los capítulos del catálogo:
# - Estructura de 6 casillas (2 minijuegos, 2 teorías, 2 quizzes).
# - Teoría como presentación narrada: cada tarjeta con imagen local y locución.
# - Rutas de imagen existentes y créditos completos.
# - Quizzes con la respuesta correcta en la opción 0.
#
# Uso: powershell -ExecutionPolicy Bypass -File "scripts/validar_contenido.ps1"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptDir

$errores = New-Object System.Collections.Generic.List[string]
$avisos = New-Object System.Collections.Generic.List[string]

function Leer-Json([string]$ruta) {
  $raw = [System.IO.File]::ReadAllText($ruta, [System.Text.Encoding]::UTF8)
  return $raw | ConvertFrom-Json
}

$catalogoPath = Join-Path $projectRoot "data\catalogo.json"
if (-not (Test-Path $catalogoPath)) {
  Write-Error "No se encontro data\catalogo.json"
  exit 1
}

$catalogo = Leer-Json $catalogoPath
$totalCapitulos = 0
$totalDiapositivas = 0

foreach ($curso in $catalogo.cursos) {
  foreach ($asig in $curso.asignaturas) {
    foreach ($tema in $asig.temas) {
      foreach ($cap in $tema.capitulos) {
        $totalCapitulos++
        $capPath = Join-Path $projectRoot ($cap.archivo -replace '/', '\')
        if (-not (Test-Path $capPath)) {
          $errores.Add("$($cap.id): no existe el archivo $($cap.archivo)")
          continue
        }
        $capDir = Split-Path -Parent $capPath
        $contenido = Leer-Json $capPath
        $donde = $cap.id

        if ($contenido.casillas.Count -ne 6) {
          $errores.Add("$($donde): tiene $($contenido.casillas.Count) casillas (se esperan 6)")
        }

        $juegosTema = @($tema.juegos)
        if ($juegosTema.Count -ne 2) {
          $errores.Add("$($donde): el tema $($tema.id) debe tener exactamente dos juegos")
        }
        if ($contenido.juegos) {
          foreach ($juego in $juegosTema) {
            if (-not $contenido.juegos.$juego) {
              $avisos.Add("$($donde): el tema pide el juego '$juego' y el capítulo no guarda su material en 'juegos'")
            }
          }
        }

        $imagenesUsadas = New-Object System.Collections.Generic.List[string]

        foreach ($casilla in $contenido.casillas) {
          if ($casilla.tipo -ne 'teoria') { continue }
          if (-not $casilla.fichas -or $casilla.fichas.Count -eq 0) {
            $errores.Add("$($donde) · casilla $($casilla.id): no tiene fichas")
            continue
          }
          foreach ($ficha in $casilla.fichas) {
            $clavesProhibidas = @('destacado', 'secciones', 'puntos')
            foreach ($clave in $clavesProhibidas) {
              if ($ficha.PSObject.Properties.Name -contains $clave) {
                $errores.Add("$($donde) · casilla $($casilla.id): la ficha no debe usar '$clave'; añade una diapositiva con imagen y locución")
              }
            }
            if (-not $ficha.tarjetas -or $ficha.tarjetas.Count -eq 0) {
              $errores.Add("$($donde) · casilla $($casilla.id): la ficha no tiene tarjetas")
              continue
            }
            foreach ($t in $ficha.tarjetas) {
              $totalDiapositivas++
              $etiqueta = "$($donde) · casilla $($casilla.id) · «$($t.nombre)»"
              if (-not $t.imagen) {
                $errores.Add("$etiqueta no tiene 'imagen'")
              } else {
                $rutaImagen = Join-Path $projectRoot ($t.imagen -replace '/', '\')
                if (-not (Test-Path $rutaImagen)) {
                  $errores.Add("${etiqueta}: no existe la imagen $($t.imagen)")
                } else {
                  $imagenesUsadas.Add((Split-Path $rutaImagen -Leaf))
                }
              }
              if (-not $t.locucion -or $t.locucion.Trim().Length -lt 40) {
                $errores.Add("$etiqueta no tiene una 'locucion' completa")
              }
              if (-not $t.texto) {
                $avisos.Add("$etiqueta no tiene rótulo ('texto')")
              } elseif (($t.texto -split '\s+').Count -gt 6) {
                $avisos.Add("${etiqueta}: el rótulo supera las 6 palabras")
              }
              if ($t.ajuste_imagen -and $t.ajuste_imagen -notin @('recorte', 'completo')) {
                $errores.Add("${etiqueta}: 'ajuste_imagen' debe ser 'recorte' o 'completo'")
              }
            }
          }
        }

        foreach ($casilla in $contenido.casillas) {
          if ($casilla.tipo -ne 'quiz') { continue }
          foreach ($p in $casilla.preguntas) {
            if ($p.correcta -ne 0) {
              $errores.Add("$($donde) · casilla $($casilla.id): la respuesta correcta debe estar en opciones[0]")
            }
            if ($p.opciones.Count -lt 2) {
              $errores.Add("$($donde) · casilla $($casilla.id): una pregunta tiene menos de dos opciones")
            }
          }
        }

        # Créditos: cada imagen usada debe tener su entrada
        $assetsDir = Join-Path $capDir "assets"
        $creditosPath = Join-Path $assetsDir "creditos_imagenes.json"
        if (Test-Path $creditosPath) {
          $creditos = Leer-Json $creditosPath
          $archivosAcreditados = @($creditos.creditos | ForEach-Object { $_.archivo })
          foreach ($img in ($imagenesUsadas | Sort-Object -Unique)) {
            if ($archivosAcreditados -notcontains $img) {
              $errores.Add("$($donde): falta la entrada de '$img' en assets/creditos_imagenes.json")
            }
          }
        } else {
          $avisos.Add("$($donde): no hay assets/creditos_imagenes.json")
        }
      }
    }
  }
}

Write-Host "Capitulos revisados: $totalCapitulos | Diapositivas de teoria: $totalDiapositivas" -ForegroundColor Cyan
foreach ($aviso in $avisos) { Write-Host "  [AVISO] $aviso" -ForegroundColor Yellow }
foreach ($errorItem in $errores) { Write-Host "  [ERROR] $errorItem" -ForegroundColor Red }

if ($errores.Count -gt 0) {
  Write-Host "Validacion con $($errores.Count) errores." -ForegroundColor Red
  exit 1
}

Write-Host "Validacion correcta: todo el contenido usa el formato de diapositivas narradas." -ForegroundColor Green
