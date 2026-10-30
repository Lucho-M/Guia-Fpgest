@echo off
REM Copia la guía a la carpeta compartida. Ajustá DESTINO si hace falta.
set DESTINO=F:\Emmegisoft\FPGEST_DATA\Guia_FPGEST
robocopy "%~dp0..\web" "%DESTINO%" /E /XD .git
robocopy "%~dp0..\plantillas" "%DESTINO%\plantillas" /E /XF .gitkeep
echo Listo. Abrir %DESTINO%\index.html
pause
