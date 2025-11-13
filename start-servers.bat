@echo off
echo Starting AdCraft AI Backend and Frontend...
echo.

start "AdCraft Backend" cmd /k "cd /d C:\Users\DELL\OneDrive\Desktop\PROJECT\backend && npm run dev"
timeout /t 3 /nobreak > nul

start "AdCraft Frontend" cmd /k "cd /d C:\Users\DELL\OneDrive\Desktop\PROJECT\frontend && npm run dev"

echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Both servers are starting in separate windows...
echo Do NOT close those windows!
pause
