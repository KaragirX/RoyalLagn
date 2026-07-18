@echo off
REM RoyalLagn - one-command local Android build (CMD)
REM No manual steps required. Run from the project root.
setlocal

echo ==> Installing dependencies...
call npm install --legacy-peer-deps
if errorlevel 1 goto :error

echo ==> Generating native Android project...
REM Suppress interactive Git prompts that expo prebuild may trigger
set GIT_AUTHOR_NAME=build
set GIT_AUTHOR_EMAIL=build@local
set GIT_COMMITTER_NAME=build
set GIT_COMMITTER_EMAIL=build@local
call npx expo prebuild --platform android --clean --no-install --non-interactive
if errorlevel 1 goto :error

echo ==> Building release APK...
cd android
call gradlew assembleRelease --no-daemon
if errorlevel 1 (cd .. & goto :error)
cd ..

echo.
echo ==> BUILD SUCCESSFUL!
echo ==> APK path:
echo     android\app\build\outputs\apk\release\app-release.apk
goto :eof

:error
echo.
echo BUILD FAILED - see output above.
exit /b 1
