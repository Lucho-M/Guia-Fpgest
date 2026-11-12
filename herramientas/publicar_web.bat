@echo off
REM Publica la guia en internet (GitHub Pages).
REM Copia SOLO la carpeta web\ al repositorio publico "guia-fpgest-web", que tiene que estar
REM clonado al lado de este proyecto. No copia videos ni propuestas.
set DESTINO=%~dp0..\..\guia-fpgest-web
if not exist "%DESTINO%\.git" (
  echo No encuentro el repositorio publico en %DESTINO%
  echo Clonalo primero al lado de esta carpeta. Ver README, "Publicar en internet".
  pause
  exit /b 1
)
robocopy "%~dp0..\web" "%DESTINO%" /MIR /XD .git propuestas videos
cd /d "%DESTINO%"
git add -A
git commit -m "Actualiza la guia %date%"
git push
echo.
echo Listo. La pagina se actualiza en uno o dos minutos.
pause
