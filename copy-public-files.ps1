# Copy Favicon Files to Public Directory
# Run this before building

Write-Host "Copying favicon files to public directory..." -ForegroundColor Cyan

$files = @(
    "favicon.ico",
    "favicon-16x16.png",
    "favicon-32x32.png",
    "favicon-48x48.png",
    "apple-touch-icon.png",
    "android-chrome-192x192.png",
    "android-chrome-512x512.png",
    "manifest.json",
    "robots.txt",
    "sitemap.xml",
    "_headers"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Copy-Item $file "public\" -Force
        Write-Host "  ✓ Copied $file" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ Missing $file" -ForegroundColor Yellow
    }
}

Write-Host "`nDone! All files copied to public directory." -ForegroundColor Green
