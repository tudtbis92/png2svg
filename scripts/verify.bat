@echo off
REM Verify: tests + build. Red = stop, fix, re-run.
call npm test || exit /b 1
call npm run build || exit /b 1
echo VERIFY OK
