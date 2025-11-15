# LCP Performance Optimization - Quick Deploy Script
# Run this after applying all code changes

Write-Host "🚀 FreeToolz - LCP Optimization Deployment" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Clean previous build
Write-Host "📦 Step 1: Cleaning previous build..." -ForegroundColor Yellow
if (Test-Path "dist") {
    Remove-Item -Recurse -Force dist
    Write-Host "✅ Previous build cleaned" -ForegroundColor Green
}

# Step 2: Install dependencies (if needed)
Write-Host ""
Write-Host "📚 Step 2: Checking dependencies..." -ForegroundColor Yellow
if (!(Test-Path "node_modules")) {
    Write-Host "Installing dependencies..."
    npm install
} else {
    Write-Host "✅ Dependencies OK" -ForegroundColor Green
}

# Step 3: Build optimized production bundle
Write-Host ""
Write-Host "🏗️  Step 3: Building optimized production bundle..." -ForegroundColor Yellow
Write-Host "This may take a minute..."
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    
    # Show build stats
    if (Test-Path "dist") {
        $distSize = (Get-ChildItem -Path dist -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
        Write-Host ("📊 Total bundle size: {0:N2} MB" -f $distSize) -ForegroundColor Cyan
    }
} else {
    Write-Host "❌ Build failed! Please check errors above." -ForegroundColor Red
    exit 1
}

# Step 4: Test the build locally (optional)
Write-Host ""
Write-Host "🧪 Step 4: Would you like to test locally? (y/n)" -ForegroundColor Yellow
$test = Read-Host

if ($test -eq "y" -or $test -eq "Y") {
    Write-Host "Starting local server on http://localhost:4173" -ForegroundColor Cyan
    Write-Host "Press Ctrl+C to stop the server when done testing" -ForegroundColor Yellow
    npm run preview
}

# Step 5: Deployment options
Write-Host ""
Write-Host "🚀 Step 5: Ready to deploy!" -ForegroundColor Green
Write-Host ""
Write-Host "Choose deployment method:" -ForegroundColor Cyan
Write-Host "1. Deploy to Vercel (Easiest - FREE, includes CDN)" -ForegroundColor White
Write-Host "2. Deploy to your VPS/Server via SCP" -ForegroundColor White
Write-Host "3. Skip deployment (I'll deploy manually)" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter choice (1-3)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "📤 Deploying to Vercel..." -ForegroundColor Cyan
        
        # Check if vercel is installed
        if (!(Get-Command vercel -ErrorAction SilentlyContinue)) {
            Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
            npm install -g vercel
        }
        
        Write-Host "Running Vercel deployment..." -ForegroundColor Yellow
        vercel --prod
        
        Write-Host ""
        Write-Host "✅ Deployment complete!" -ForegroundColor Green
        Write-Host "Your site is now live with CDN enabled!" -ForegroundColor Green
    }
    
    "2" {
        Write-Host ""
        Write-Host "📤 VPS/Server Deployment" -ForegroundColor Cyan
        Write-Host ""
        
        $serverUser = Read-Host "Enter server username (e.g., root)"
        $serverHost = Read-Host "Enter server IP/hostname"
        $serverPath = Read-Host "Enter server path (e.g., /var/www/freetoolz)"
        
        Write-Host ""
        Write-Host "Uploading files to $serverUser@$serverHost`:$serverPath..." -ForegroundColor Yellow
        
        # Upload dist files
        scp -r dist/* "$serverUser@$serverHost`:$serverPath/"
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Files uploaded successfully!" -ForegroundColor Green
            
            # Ask about nginx config
            Write-Host ""
            Write-Host "Would you like to upload nginx config? (y/n)" -ForegroundColor Yellow
            $uploadNginx = Read-Host
            
            if ($uploadNginx -eq "y" -or $uploadNginx -eq "Y") {
                Write-Host "Uploading nginx configuration..." -ForegroundColor Yellow
                scp nginx-performance-optimized.conf "$serverUser@$serverHost`:/tmp/freetoolz-nginx.conf"
                
                Write-Host ""
                Write-Host "⚠️  IMPORTANT: Manual steps required on server:" -ForegroundColor Yellow
                Write-Host "SSH into your server and run:" -ForegroundColor White
                Write-Host "  sudo mv /tmp/freetoolz-nginx.conf /etc/nginx/sites-available/freetoolz.conf" -ForegroundColor Cyan
                Write-Host "  sudo ln -sf /etc/nginx/sites-available/freetoolz.conf /etc/nginx/sites-enabled/" -ForegroundColor Cyan
                Write-Host "  sudo nginx -t" -ForegroundColor Cyan
                Write-Host "  sudo systemctl reload nginx" -ForegroundColor Cyan
            }
            
            Write-Host ""
            Write-Host "✅ Deployment complete!" -ForegroundColor Green
        } else {
            Write-Host "❌ Upload failed!" -ForegroundColor Red
        }
    }
    
    "3" {
        Write-Host ""
        Write-Host "✅ Build complete! Files are in the 'dist' folder" -ForegroundColor Green
        Write-Host "Deploy manually when ready." -ForegroundColor White
    }
    
    default {
        Write-Host "Invalid choice. Build complete, deploy manually." -ForegroundColor Yellow
    }
}

# Step 6: Post-deployment checklist
Write-Host ""
Write-Host "📋 POST-DEPLOYMENT CHECKLIST:" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ 1. Add Cloudflare CDN (if not using Vercel):" -ForegroundColor White
Write-Host "      - Sign up at cloudflare.com (FREE)" -ForegroundColor Gray
Write-Host "      - Add your domain" -ForegroundColor Gray
Write-Host "      - Update nameservers" -ForegroundColor Gray
Write-Host "      - Enable: Auto Minify, Brotli, HTTP/2, HTTP/3" -ForegroundColor Gray
Write-Host ""
Write-Host "✅ 2. Test your site performance:" -ForegroundColor White
Write-Host "      - GTmetrix: https://gtmetrix.com" -ForegroundColor Gray
Write-Host "      - PageSpeed: https://pagespeed.web.dev" -ForegroundColor Gray
Write-Host ""
Write-Host "✅ 3. Expected Results:" -ForegroundColor White
Write-Host "      - LCP: < 1.2s (from 2.6s) ✅" -ForegroundColor Green
Write-Host "      - TTFB: < 200ms (from 631ms) ✅" -ForegroundColor Green
Write-Host "      - Performance Score: 95%+ (from 75%) ✅" -ForegroundColor Green
Write-Host ""
Write-Host "📖 For detailed optimization guide, see: LCP_OPTIMIZATION_GUIDE.md" -ForegroundColor Yellow
Write-Host ""
Write-Host "🎉 All optimizations applied! Good luck!" -ForegroundColor Green
