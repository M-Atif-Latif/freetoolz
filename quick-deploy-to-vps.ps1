# Quick Deploy to VPS - PowerShell Script
# Fixes 403 error and deploys fresh build

param(
    [Parameter(Mandatory=$true)]
    [string]$ServerIP,
    
    [Parameter(Mandatory=$true)]
    [string]$Username = "root"
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 Quick Deploy to VPS" -ForegroundColor Cyan
Write-Host "======================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Build locally
Write-Host "Step 1: Building application..." -ForegroundColor Blue
npm run build
Write-Host "✅ Build complete" -ForegroundColor Green
Write-Host ""

# Step 2: Upload files
Write-Host "Step 2: Uploading files to VPS..." -ForegroundColor Blue
Write-Host "Uploading to $Username@${ServerIP}:/var/www/freetoolz/" -ForegroundColor Gray

# Create directory on server first
Write-Host "Creating directory on server..." -ForegroundColor Gray
ssh ${Username}@${ServerIP} "sudo mkdir -p /var/www/freetoolz && sudo chown -R www-data:www-data /var/www/freetoolz && sudo chmod -R 755 /var/www/freetoolz"

# Upload all files from dist
Write-Host "Uploading files..." -ForegroundColor Gray
scp -r dist/* ${Username}@${ServerIP}:/tmp/freetoolz_upload/
ssh ${Username}@${ServerIP} "sudo mv /tmp/freetoolz_upload/* /var/www/freetoolz/ && sudo rm -rf /tmp/freetoolz_upload"

Write-Host "✅ Files uploaded" -ForegroundColor Green
Write-Host ""

# Step 3: Fix permissions on server
Write-Host "Step 3: Fixing permissions on server..." -ForegroundColor Blue
ssh ${Username}@${ServerIP} @"
sudo chown -R www-data:www-data /var/www/freetoolz
sudo chmod -R 755 /var/www/freetoolz
sudo chmod 644 /var/www/freetoolz/index.html
"@
Write-Host "✅ Permissions fixed" -ForegroundColor Green
Write-Host ""

# Step 4: Reload nginx
Write-Host "Step 4: Reloading nginx..." -ForegroundColor Blue
ssh ${Username}@${ServerIP} "sudo nginx -t && sudo systemctl reload nginx"
Write-Host "✅ Nginx reloaded" -ForegroundColor Green
Write-Host ""

Write-Host "✨ Deployment Complete! ✨" -ForegroundColor Green
Write-Host ""
Write-Host "Visit your site: https://freetoolz.cloud" -ForegroundColor Cyan
Write-Host ""
Write-Host "If you still see 403, run this on your VPS:" -ForegroundColor Yellow
Write-Host "sudo tail -50 /var/log/nginx/error.log" -ForegroundColor Gray
Write-Host ""
