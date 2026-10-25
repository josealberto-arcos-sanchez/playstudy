@echo off
setlocal
echo ====================================================
echo   Iniciando "PlayStudy"
echo ====================================================
echo Validando y sincronizando catalogo y capitulos...
set "NODE_EXE="
where node >nul 2>&1 && set "NODE_EXE=node"
if not defined NODE_EXE if exist "%~dp0tools\node\node.exe" set "NODE_EXE=%~dp0tools\node\node.exe"
if defined NODE_EXE (
  "%NODE_EXE%" "%~dp0scripts\datos.mjs"
  if errorlevel 1 (
    echo.
    echo Hay errores en el contenido: no se ha sincronizado data\catalogo_data.js.
    echo Corrige los errores marcados con [ERROR] y vuelve a ejecutar jugar.bat.
    pause
    exit /b 1
  )
) else (
  echo [AVISO] No se ha encontrado Node.js: se usara el catalogo ya sincronizado.
  echo         Para validar o sincronizar contenido, instala Node.js o usa tools\node.
)
echo Versionando la cache del Service Worker...
powershell -ExecutionPolicy Bypass -File "%~dp0scripts\versionar.ps1" >nul 2>&1
echo Abriendo en tu navegador predeterminado...
start "" "%~dp0index.html"
exit /b 0
