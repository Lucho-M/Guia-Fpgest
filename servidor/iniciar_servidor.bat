@echo off
REM Inicia el servidor de la Guía FPGEST. Dejar esta ventana abierta (o programarlo en el Programador de tareas).
python "%~dp0servidor_guia.py" --web "F:\Emmegisoft\FPGEST_DATA\Guia_FPGEST" --puerto 8080
pause
