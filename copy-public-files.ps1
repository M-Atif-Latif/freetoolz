# Public asset sanity check before building
# Ensures every required static file exists inside /public

Write-Host "Validating public assets..." -ForegroundColor Cyan

$publicDir = "public"
if (-not (Test-Path $publicDir)) {
    New-Item -ItemType Directory -Path $publicDir | Out-Null
    Write-Host "  Created missing public directory" -ForegroundColor Yellow
}

$files = @(
    "favicon.ico",
    "favicon-16x16.png",
    "favicon-32x32.png",
    "favicon-48x48.png",
    "apple-touch-icon.png",
    "android-chrome-192x192.png",
    "android-chrome-512x512.png",
    "logo.png",
    "manifest.json",
    "robots.txt",
    "sitemap.xml",
    "_headers",
    "BingSiteAuth.xml",
    "browserconfig.xml",
    "google-verification.html",
    "google62c9704afeeaac9f.html"
)

$missing = @()
foreach ($file in $files) {
    $path = Join-Path $publicDir $file
    if (Test-Path $path) {
        Write-Host "  ✓ $file" -ForegroundColor Green
    } elseif (Test-Path $file) {
        Copy-Item $file $publicDir -Force
        Write-Host "  ↺ Moved legacy $file into /public" -ForegroundColor Yellow
    } else {
        $missing += $file
        Write-Host "  ⚠ Missing $file" -ForegroundColor Red
    }
}

if ($missing.Count -eq 0) {
    Write-Host "`nAll required assets are ready." -ForegroundColor Green
} else {
    Write-Host "`nPlease add the missing files listed above before building." -ForegroundColor Red
}
