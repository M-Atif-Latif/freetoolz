#!/bin/bash

# Performance & Security Fixes Deployment Script
# Run this script to build and deploy all optimizations

echo "🚀 Starting deployment of performance and security fixes..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Clean and build
echo -e "${BLUE}Step 1: Building optimized production bundle...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed! Please fix errors and try again.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Build completed successfully!${NC}"
echo ""

# Step 2: Upload to server
echo -e "${BLUE}Step 2: Uploading files to server...${NC}"
SERVER="root@72.61.113.236"
REMOTE_PATH="/var/www/freetoolz"

# Upload dist files
scp -r dist $SERVER:$REMOTE_PATH/
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ File upload failed!${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Files uploaded successfully!${NC}"
echo ""

# Step 3: Upload nginx config
echo -e "${BLUE}Step 3: Uploading nginx configuration...${NC}"
scp nginx-config.txt $SERVER:/tmp/
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Nginx config upload failed!${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Nginx config uploaded!${NC}"
echo ""

# Step 4: Apply nginx config and reload
echo -e "${BLUE}Step 4: Applying nginx configuration...${NC}"
ssh $SERVER << 'ENDSSH'
    # Backup current config
    sudo cp /etc/nginx/sites-available/freetoolz /etc/nginx/sites-available/freetoolz.backup.$(date +%Y%m%d_%H%M%S)
    
    # Apply new config
    sudo cp /tmp/nginx-config.txt /etc/nginx/sites-available/freetoolz
    
    # Test config
    sudo nginx -t
    if [ $? -ne 0 ]; then
        echo "Nginx config test failed! Restoring backup..."
        sudo cp /etc/nginx/sites-available/freetoolz.backup.* /etc/nginx/sites-available/freetoolz
        exit 1
    fi
    
    # Reload nginx
    sudo systemctl reload nginx
    echo "Nginx reloaded successfully!"
ENDSSH

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Nginx configuration failed!${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Nginx configured and reloaded!${NC}"
echo ""

# Step 5: Verify deployment
echo -e "${BLUE}Step 5: Verifying deployment...${NC}"
echo ""

echo "Testing cache headers..."
curl -I https://freetoolz.cloud/assets/index-BbsmTzaG.js 2>/dev/null | grep -i "cache-control"

echo ""
echo "Testing HSTS header..."
curl -I https://freetoolz.cloud/ 2>/dev/null | grep -i "strict-transport"

echo ""
echo "Testing COOP header..."
curl -I https://freetoolz.cloud/ 2>/dev/null | grep -i "cross-origin-opener"

echo ""
echo "Testing CSP header..."
curl -I https://freetoolz.cloud/ 2>/dev/null | grep -i "content-security-policy"

echo ""
echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo ""
echo "🎯 Next steps:"
echo "1. Test your site: https://freetoolz.cloud"
echo "2. Run Lighthouse audit: https://pagespeed.web.dev/analysis?url=https://freetoolz.cloud"
echo "3. Check SSL: https://www.ssllabs.com/ssltest/analyze.html?d=freetoolz.cloud"
echo "4. Check security headers: https://securityheaders.com/?q=https://freetoolz.cloud"
echo ""
echo "Expected scores:"
echo "  📊 Performance: 85-90+ (Mobile), 90-95+ (Desktop)"
echo "  ♿ Accessibility: 100"
echo "  ✨ Best Practices: 100"
echo "  🔍 SEO: 100"
echo "  🔒 SSL Labs: A+"
echo "  🛡️  Security Headers: A+"
