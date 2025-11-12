#!/bin/bash

# Performance Optimized Deployment Script
# Last Updated: November 12, 2025

set -e # Exit on any error

echo "🚀 Starting Performance-Optimized Deployment..."
echo "================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Clean previous builds
echo -e "${BLUE}Step 1: Cleaning previous builds...${NC}"
rm -rf dist/
echo -e "${GREEN}✓ Clean complete${NC}"
echo ""

# Step 2: Install dependencies (if needed)
echo -e "${BLUE}Step 2: Checking dependencies...${NC}"
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
else
    echo "Dependencies already installed"
fi
echo -e "${GREEN}✓ Dependencies ready${NC}"
echo ""

# Step 3: Run TypeScript type checking
echo -e "${BLUE}Step 3: Running TypeScript type checking...${NC}"
npm run typecheck || {
    echo -e "${RED}✗ TypeScript errors found. Please fix before deploying.${NC}"
    exit 1
}
echo -e "${GREEN}✓ Type checking passed${NC}"
echo ""

# Step 4: Build optimized production bundle
echo -e "${BLUE}Step 4: Building optimized production bundle...${NC}"
echo "Building with optimizations:"
echo "  - Code splitting enabled"
echo "  - Terser minification with 2 passes"
echo "  - Source maps (hidden)"
echo "  - CSS code splitting"
echo "  - Module preloading"
echo ""
npm run build || {
    echo -e "${RED}✗ Build failed. Please check errors above.${NC}"
    exit 1
}
echo -e "${GREEN}✓ Build complete${NC}"
echo ""

# Step 5: Analyze bundle size
echo -e "${BLUE}Step 5: Analyzing bundle...${NC}"
echo "Bundle contents:"
ls -lh dist/assets/ | grep -E '\.(js|css)$' | awk '{print "  " $9 " - " $5}'
echo ""

TOTAL_JS_SIZE=$(find dist/assets -name "*.js" -exec du -ch {} + | grep total$ | cut -f1)
TOTAL_CSS_SIZE=$(find dist/assets -name "*.css" -exec du -ch {} + | grep total$ | cut -f1)
echo "Total JavaScript: $TOTAL_JS_SIZE"
echo "Total CSS: $TOTAL_CSS_SIZE"
echo -e "${GREEN}✓ Bundle analysis complete${NC}"
echo ""

# Step 6: Verify critical files
echo -e "${BLUE}Step 6: Verifying critical files...${NC}"
CRITICAL_FILES=(
    "dist/index.html"
    "dist/_headers"
    "dist/robots.txt"
    "dist/sitemap.xml"
)

for file in "${CRITICAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "  ${GREEN}✓${NC} $file exists"
    else
        echo -e "  ${YELLOW}⚠${NC} $file missing"
    fi
done
echo ""

# Step 7: Copy additional files if needed
echo -e "${BLUE}Step 7: Copying additional configuration files...${NC}"
if [ ! -f "dist/_headers" ]; then
    cp _headers dist/_headers
    echo "  Copied _headers"
fi
if [ ! -f "dist/robots.txt" ]; then
    cp robots.txt dist/robots.txt
    echo "  Copied robots.txt"
fi
if [ ! -f "dist/sitemap.xml" ]; then
    cp sitemap.xml dist/sitemap.xml
    echo "  Copied sitemap.xml"
fi
echo -e "${GREEN}✓ Configuration files ready${NC}"
echo ""

# Step 8: Performance checklist
echo -e "${BLUE}Step 8: Pre-deployment Performance Checklist${NC}"
echo "Optimizations applied:"
echo -e "  ${GREEN}✓${NC} Fixed CSP violations (removed inline event handlers)"
echo -e "  ${GREEN}✓${NC} GPU-accelerated gradient animations"
echo -e "  ${GREEN}✓${NC} Hidden source maps generated"
echo -e "  ${GREEN}✓${NC} Accessible button labels (aria-label)"
echo -e "  ${GREEN}✓${NC} Proper heading hierarchy (sr-only h2)"
echo -e "  ${GREEN}✓${NC} Descriptive link text"
echo -e "  ${GREEN}✓${NC} Enhanced resource hints (preconnect, modulepreload)"
echo -e "  ${GREEN}✓${NC} Optimized code splitting (React, tools, pages)"
echo -e "  ${GREEN}✓${NC} Aggressive cache headers for static assets"
echo -e "  ${GREEN}✓${NC} Terser compression with 2 passes"
echo ""

# Step 9: Deployment instructions
echo -e "${YELLOW}Step 9: Ready for Deployment${NC}"
echo "================================================"
echo ""
echo "The optimized build is ready in the 'dist' folder."
echo ""
echo "To deploy, choose your method:"
echo ""
echo "📦 Option 1 - Deploy to Hostinger VPS:"
echo "   scp -r dist/* user@your-server:/var/www/freetoolz.cloud/"
echo ""
echo "📦 Option 2 - Deploy to Netlify:"
echo "   netlify deploy --prod --dir=dist"
echo ""
echo "📦 Option 3 - Deploy to Vercel:"
echo "   vercel --prod"
echo ""
echo "📦 Option 4 - Deploy to GitHub Pages:"
echo "   npm run deploy"
echo ""
echo "================================================"
echo ""

# Step 10: Post-deployment verification checklist
echo -e "${BLUE}Step 10: Post-Deployment Verification Checklist${NC}"
echo "After deploying, verify the following:"
echo ""
echo "1. 🌐 Test URL: https://freetoolz.cloud/"
echo "   - [ ] Site loads correctly"
echo "   - [ ] No console errors"
echo "   - [ ] Dark mode works"
echo "   - [ ] Navigation works"
echo ""
echo "2. 📊 Run PageSpeed Insights:"
echo "   URL: https://pagespeed.web.dev/"
echo "   Expected scores:"
echo "   - [ ] Performance: 90+ (Mobile), 95+ (Desktop)"
echo "   - [ ] Accessibility: 98+"
echo "   - [ ] Best Practices: 98+"
echo "   - [ ] SEO: 96+"
echo ""
echo "3. 🔍 Browser DevTools Checks:"
echo "   - [ ] No CSP violations in console"
echo "   - [ ] _headers file applied (check Network > Response Headers)"
echo "   - [ ] Cache-Control headers correct for JS/CSS (1 year)"
echo "   - [ ] Source maps not exposed (check .map files)"
echo "   - [ ] Animations are smooth (60fps)"
echo ""
echo "4. ♿ Accessibility Testing:"
echo "   - [ ] Screen reader can read menu button"
echo "   - [ ] Heading hierarchy is correct (h1 > h2 > h3)"
echo "   - [ ] All links have descriptive text"
echo "   - [ ] Keyboard navigation works"
echo ""
echo "5. 📱 Mobile Testing:"
echo "   - [ ] Site is responsive"
echo "   - [ ] Touch targets are large enough"
echo "   - [ ] No horizontal scroll"
echo "   - [ ] Fast loading on 4G"
echo ""
echo "6. 🚀 Performance Metrics (Core Web Vitals):"
echo "   - [ ] LCP < 2.5s"
echo "   - [ ] FID < 100ms"
echo "   - [ ] CLS < 0.1"
echo ""
echo "================================================"
echo ""
echo -e "${GREEN}✨ Build Complete! Ready to Deploy! ✨${NC}"
echo ""
echo "Run this script with: ./deploy-performance-optimized.sh"
echo ""
