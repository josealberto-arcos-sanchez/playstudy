@echo off
echo ====================================================
echo   Iniciando "PlayStudy"
echo ====================================================
echo Sincronizando catalogo y capitulos...
powershell -ExecutionPolicy Bypass -File "%~dp0scripts\actualizar_datos.ps1" >nul 2>&1
echo Abriendo en tu navegador predeterminado...
start "" "%~dp0index.html"
exit
