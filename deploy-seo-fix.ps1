# SEO Fix Deployment for FreeToolz
# PowerShell script for Windows

Write-Host "🚀 Starting SEO Fix Deployment..." -ForegroundColor Green

# Step 1: Upload robots.txt and sitemap.xml
Write-Host "`n📤 Uploading robots.txt and sitemap.xml..." -ForegroundColor Cyan
scp robots.txt, sitemap.xml root@72.61.113.236:/var/www/freetoolz/

# Step 2: Set permissions via SSH
Write-Host "`n🔐 Setting permissions on server..." -ForegroundColor Cyan
ssh root@72.61.113.236 @"
cd /var/www/freetoolz/
chmod 644 robots.txt sitemap.xml google62c9704afeeaac9f.html BingSiteAuth.xml
chown www-data:www-data robots.txt sitemap.xml google62c9704afeeaac9f.html BingSiteAuth.xml
ls -lah | grep -E 'robots|sitemap|google|Bing'
sudo nginx -t
sudo systemctl reload nginx
"@

# Step 3: Verify files
Write-Host "`n🔍 Verifying files are accessible..." -ForegroundColor Cyan
Write-Host "Testing robots.txt..."
$robotsStatus = (Invoke-WebRequest -Uri "https://freetoolz.cloud/robots.txt" -UseBasicParsing).StatusCode
Write-Host "Status: $robotsStatus" -ForegroundColor $(if ($robotsStatus -eq 200) { "Green" } else { "Red" })

Write-Host "Testing sitemap.xml..."
$sitemapStatus = (Invoke-WebRequest -Uri "https://freetoolz.cloud/sitemap.xml" -UseBasicParsing).StatusCode
Write-Host "Status: $sitemapStatus" -ForegroundColor $(if ($sitemapStatus -eq 200) { "Green" } else { "Red" })

Write-Host "Testing Google verification..."
$googleStatus = (Invoke-WebRequest -Uri "https://freetoolz.cloud/google62c9704afeeaac9f.html" -UseBasicParsing).StatusCode
Write-Host "Status: $googleStatus" -ForegroundColor $(if ($googleStatus -eq 200) { "Green" } else { "Red" })

Write-Host "Testing Bing verification..."
$bingStatus = (Invoke-WebRequest -Uri "https://freetoolz.cloud/BingSiteAuth.xml" -UseBasicParsing).StatusCode
Write-Host "Status: $bingStatus" -ForegroundColor $(if ($bingStatus -eq 200) { "Green" } else { "Red" })

Write-Host "`n✅ SEO Fix Deployment Complete!" -ForegroundColor Green
Write-Host "`n📋 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Go to Google Search Console: https://search.google.com/search-console"
Write-Host "2. Submit sitemap: https://freetoolz.cloud/sitemap.xml"
Write-Host "3. Use URL Inspection tool to request indexing"
Write-Host "4. Wait 24-48 hours for Google to recrawl"
Write-Host "`n🔗 Test URLs:" -ForegroundColor Cyan
Write-Host "   https://freetoolz.cloud/robots.txt"
Write-Host "   https://freetoolz.cloud/sitemap.xml"
Write-Host "   https://freetoolz.cloud/google62c9704afeeaac9f.html"
Write-Host "   https://freetoolz.cloud/BingSiteAuth.xml"
