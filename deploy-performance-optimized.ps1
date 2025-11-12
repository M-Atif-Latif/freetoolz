# Performance Optimized Deployment Script (PowerShell)
# Last Updated: November 12, 2025

$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting Performance-Optimized Deployment..." -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Clean previous builds
Write-Host "Step 1: Cleaning previous builds..." -ForegroundColor Blue
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
}
Write-Host "✓ Clean complete" -ForegroundColor Green
Write-Host ""

# Step 2: Check dependencies
Write-Host "Step 2: Checking dependencies..." -ForegroundColor Blue
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "Dependencies already installed" -ForegroundColor Gray
}
Write-Host "✓ Dependencies ready" -ForegroundColor Green
Write-Host ""

# Step 2.5: Copy public files
Write-Host "Step 2.5: Copying public files (favicons, etc.)..." -ForegroundColor Blue
if (Test-Path "copy-public-files.ps1") {
    & .\copy-public-files.ps1
} else {
    Write-Host "  Manually copying critical files..." -ForegroundColor Yellow
    $publicFiles = @("favicon.ico", "favicon-16x16.png", "favicon-32x32.png", "favicon-48x48.png", 
                     "apple-touch-icon.png", "android-chrome-192x192.png", "android-chrome-512x512.png",
                     "manifest.json", "robots.txt", "sitemap.xml", "_headers")
    
    if (-not (Test-Path "public")) {
        New-Item -ItemType Directory -Path "public" | Out-Null
    }
    
    foreach ($file in $publicFiles) {
        if (Test-Path $file) {
            Copy-Item $file "public\" -Force
            Write-Host "  ✓ Copied $file" -ForegroundColor Green
        }
    }
}
Write-Host "✓ Public files ready" -ForegroundColor Green
Write-Host ""

# Step 3: Run TypeScript type checking
Write-Host "Step 3: Running TypeScript type checking..." -ForegroundColor Blue
try {
    npm run typecheck
    Write-Host "✓ Type checking passed" -ForegroundColor Green
} catch {
    Write-Host "✗ TypeScript errors found. Please fix before deploying." -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 4: Build optimized production bundle
Write-Host "Step 4: Building optimized production bundle..." -ForegroundColor Blue
Write-Host "Building with optimizations:" -ForegroundColor Gray
Write-Host "  - Code splitting enabled" -ForegroundColor Gray
Write-Host "  - Terser minification with 2 passes" -ForegroundColor Gray
Write-Host "  - Source maps (hidden)" -ForegroundColor Gray
Write-Host "  - CSS code splitting" -ForegroundColor Gray
Write-Host "  - Module preloading" -ForegroundColor Gray
Write-Host ""

try {
    npm run build
    Write-Host "✓ Build complete" -ForegroundColor Green
} catch {
    Write-Host "✗ Build failed. Please check errors above." -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 5: Analyze bundle size
Write-Host "Step 5: Analyzing bundle..." -ForegroundColor Blue
Write-Host "Bundle contents:" -ForegroundColor Gray

$jsFiles = Get-ChildItem -Path "dist\assets\*.js" -File
$cssFiles = Get-ChildItem -Path "dist\assets\*.css" -File

foreach ($file in $jsFiles) {
    $size = "{0:N2} KB" -f ($file.Length / 1KB)
    Write-Host "  $($file.Name) - $size" -ForegroundColor Gray
}

foreach ($file in $cssFiles) {
    $size = "{0:N2} KB" -f ($file.Length / 1KB)
    Write-Host "  $($file.Name) - $size" -ForegroundColor Gray
}

$totalJsSize = ($jsFiles | Measure-Object -Property Length -Sum).Sum / 1KB
$totalCssSize = ($cssFiles | Measure-Object -Property Length -Sum).Sum / 1KB

Write-Host ""
Write-Host "Total JavaScript: $("{0:N2}" -f $totalJsSize) KB" -ForegroundColor Yellow
Write-Host "Total CSS: $("{0:N2}" -f $totalCssSize) KB" -ForegroundColor Yellow
Write-Host "✓ Bundle analysis complete" -ForegroundColor Green
Write-Host ""

# Step 6: Verify critical files
Write-Host "Step 6: Verifying critical files..." -ForegroundColor Blue
$criticalFiles = @(
    "dist\index.html",
    "dist\_headers",
    "dist\robots.txt",
    "dist\sitemap.xml"
)

foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        Write-Host "  ✓ $file exists" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ $file missing" -ForegroundColor Yellow
    }
}
Write-Host ""

# Step 7: Copy additional files if needed
Write-Host "Step 7: Copying additional configuration files..." -ForegroundColor Blue
if (-not (Test-Path "dist\_headers")) {
    Copy-Item "_headers" "dist\_headers"
    Write-Host "  Copied _headers" -ForegroundColor Gray
}
if (-not (Test-Path "dist\robots.txt")) {
    Copy-Item "robots.txt" "dist\robots.txt"
    Write-Host "  Copied robots.txt" -ForegroundColor Gray
}
if (-not (Test-Path "dist\sitemap.xml")) {
    Copy-Item "sitemap.xml" "dist\sitemap.xml"
    Write-Host "  Copied sitemap.xml" -ForegroundColor Gray
}
Write-Host "✓ Configuration files ready" -ForegroundColor Green
Write-Host ""

# Step 8: Performance checklist
Write-Host "Step 8: Pre-deployment Performance Checklist" -ForegroundColor Blue
Write-Host "Optimizations applied:" -ForegroundColor Gray
Write-Host "  ✓ Fixed CSP violations (removed inline event handlers)" -ForegroundColor Green
Write-Host "  ✓ GPU-accelerated gradient animations" -ForegroundColor Green
Write-Host "  ✓ Hidden source maps generated" -ForegroundColor Green
Write-Host "  ✓ Accessible button labels (aria-label)" -ForegroundColor Green
Write-Host "  ✓ Proper heading hierarchy (sr-only h2)" -ForegroundColor Green
Write-Host "  ✓ Descriptive link text" -ForegroundColor Green
Write-Host "  ✓ Enhanced resource hints (preconnect, modulepreload)" -ForegroundColor Green
Write-Host "  ✓ Optimized code splitting (React, tools, pages)" -ForegroundColor Green
Write-Host "  ✓ Aggressive cache headers for static assets" -ForegroundColor Green
Write-Host "  ✓ Terser compression with 2 passes" -ForegroundColor Green
Write-Host ""

# Step 9: Deployment instructions
Write-Host "Step 9: Ready for Deployment" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "The optimized build is ready in the 'dist' folder." -ForegroundColor White
Write-Host ""
Write-Host "To deploy, choose your method:" -ForegroundColor White
Write-Host ""
Write-Host "📦 Option 1 - Deploy to Hostinger VPS:" -ForegroundColor Cyan
Write-Host "   scp -r dist/* user@your-server:/var/www/freetoolz.cloud/" -ForegroundColor Gray
Write-Host ""
Write-Host "📦 Option 2 - Deploy to Netlify:" -ForegroundColor Cyan
Write-Host "   netlify deploy --prod --dir=dist" -ForegroundColor Gray
Write-Host ""
Write-Host "📦 Option 3 - Deploy to Vercel:" -ForegroundColor Cyan
Write-Host "   vercel --prod" -ForegroundColor Gray
Write-Host ""
Write-Host "📦 Option 4 - Deploy using Git:" -ForegroundColor Cyan
Write-Host "   git add ." -ForegroundColor Gray
Write-Host "   git commit -m ""Deploy performance optimizations""" -ForegroundColor Gray
Write-Host "   git push origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Step 10: Post-deployment verification checklist
Write-Host "Step 10: Post-Deployment Verification Checklist" -ForegroundColor Blue
Write-Host "After deploying, verify the following:" -ForegroundColor Gray
Write-Host ""
Write-Host "1. 🌐 Test URL: https://freetoolz.cloud/" -ForegroundColor White
Write-Host "   - [ ] Site loads correctly" -ForegroundColor Gray
Write-Host "   - [ ] No console errors" -ForegroundColor Gray
Write-Host "   - [ ] Dark mode works" -ForegroundColor Gray
Write-Host "   - [ ] Navigation works" -ForegroundColor Gray
Write-Host ""
Write-Host "2. 📊 Run PageSpeed Insights:" -ForegroundColor White
Write-Host "   URL: https://pagespeed.web.dev/" -ForegroundColor Cyan
Write-Host "   Expected scores:" -ForegroundColor Gray
Write-Host "   - [ ] Performance: 90+ (Mobile), 95+ (Desktop)" -ForegroundColor Gray
Write-Host "   - [ ] Accessibility: 98+" -ForegroundColor Gray
Write-Host "   - [ ] Best Practices: 98+" -ForegroundColor Gray
Write-Host "   - [ ] SEO: 96+" -ForegroundColor Gray
Write-Host ""
Write-Host "3. 🔍 Browser DevTools Checks:" -ForegroundColor White
Write-Host "   - [ ] No CSP violations in console" -ForegroundColor Gray
Write-Host "   - [ ] _headers file applied (check Network > Response Headers)" -ForegroundColor Gray
Write-Host "   - [ ] Cache-Control headers correct for JS/CSS (1 year)" -ForegroundColor Gray
Write-Host "   - [ ] Source maps not exposed (check .map files)" -ForegroundColor Gray
Write-Host "   - [ ] Animations are smooth (60fps)" -ForegroundColor Gray
Write-Host ""
Write-Host "4. ♿ Accessibility Testing:" -ForegroundColor White
Write-Host "   - [ ] Screen reader can read menu button" -ForegroundColor Gray
Write-Host "   - [ ] Heading hierarchy is correct (h1 > h2 > h3)" -ForegroundColor Gray
Write-Host "   - [ ] All links have descriptive text" -ForegroundColor Gray
Write-Host "   - [ ] Keyboard navigation works" -ForegroundColor Gray
Write-Host ""
Write-Host "5. 📱 Mobile Testing:" -ForegroundColor White
Write-Host "   - [ ] Site is responsive" -ForegroundColor Gray
Write-Host "   - [ ] Touch targets are large enough" -ForegroundColor Gray
Write-Host "   - [ ] No horizontal scroll" -ForegroundColor Gray
Write-Host "   - [ ] Fast loading on 4G" -ForegroundColor Gray
Write-Host ""
Write-Host "6. 🚀 Performance Metrics (Core Web Vitals):" -ForegroundColor White
Write-Host "   - [ ] LCP < 2.5s" -ForegroundColor Gray
Write-Host "   - [ ] FID < 100ms" -ForegroundColor Gray
Write-Host "   - [ ] CLS < 0.1" -ForegroundColor Gray
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✨ Build Complete! Ready to Deploy! ✨" -ForegroundColor Green
Write-Host ""
Write-Host "Run this script with: .\deploy-performance-optimized.ps1" -ForegroundColor Yellow
Write-Host ""
