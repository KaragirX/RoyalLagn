# RoyalLagn - one-command local Android build (PowerShell)
# No manual steps required. Run from the project root.
$ErrorActionPreference = "Stop"

Write-Host "==> Installing dependencies..." -ForegroundColor Cyan
npm install --legacy-peer-deps
if ($LASTEXITCODE -ne 0) { throw "npm install failed" }

Write-Host "==> Generating native Android project..." -ForegroundColor Cyan
# Suppress interactive Git prompts that expo prebuild may trigger
$env:GIT_AUTHOR_NAME    = "build"
$env:GIT_AUTHOR_EMAIL   = "build@local"
$env:GIT_COMMITTER_NAME = "build"
$env:GIT_COMMITTER_EMAIL = "build@local"
npx expo prebuild --platform android --clean --no-install --non-interactive
if ($LASTEXITCODE -ne 0) { throw "expo prebuild failed" }

Write-Host "==> Building release APK..." -ForegroundColor Cyan
Set-Location android
.\gradlew assembleRelease --no-daemon
if ($LASTEXITCODE -ne 0) { Set-Location ..; throw "Gradle build failed" }
Set-Location ..

Write-Host ""
Write-Host "==> BUILD SUCCESSFUL!" -ForegroundColor Green
Write-Host "==> APK path:" -ForegroundColor Green
Write-Host "    android\app\build\outputs\apk\release\app-release.apk"
