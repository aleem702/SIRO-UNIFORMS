# FabricOS Unified Starter
# This script starts both the Django backend and the Vite frontend in separate windows.

Write-Host "Starting FabricOS Backend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; ..\venv\Scripts\activate; python manage.py runserver"

Write-Host "Starting FabricOS Frontend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm.cmd run dev"

Write-Host "Both servers are starting. You can find them in the newly opened terminal windows." -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:5173"
Write-Host "Backend API: http://localhost:8000/api/"
