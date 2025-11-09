#!/bin/bash

# SEO Fix Deployment Script for FreeToolz
# This fixes the "No page information" Google issue

echo "🚀 Starting SEO Fix Deployment..."

# Step 1: Upload robots.txt and sitemap.xml
echo "📤 Uploading robots.txt and sitemap.xml..."
scp robots.txt sitemap.xml root@72.61.113.236:/var/www/freetoolz/

# Step 2: SSH into server and set permissions
echo "🔐 Setting correct permissions on server..."
ssh root@72.61.113.236 << 'ENDSSH'

cd /var/www/freetoolz/

# Set permissions
chmod 644 robots.txt
chmod 644 sitemap.xml
chmod 644 google62c9704afeeaac9f.html
chmod 644 BingSiteAuth.xml

# Set ownership
chown www-data:www-data robots.txt
chown www-data:www-data sitemap.xml
chown www-data:www-data google62c9704afeeaac9f.html
chown www-data:www-data BingSiteAuth.xml

# Verify files exist
echo "✅ Files in /var/www/freetoolz/:"
ls -lah | grep -E "robots|sitemap|google|Bing"

# Test nginx config
echo "🔧 Testing nginx configuration..."
sudo nginx -t

# Reload nginx
echo "🔄 Reloading nginx..."
sudo systemctl reload nginx

echo "✅ Server configuration complete!"

ENDSSH

# Step 3: Verify files are accessible
echo "🔍 Verifying files are accessible..."
echo ""
echo "Testing robots.txt..."
curl -s -o /dev/null -w "%{http_code}" https://freetoolz.cloud/robots.txt
echo ""
echo "Testing sitemap.xml..."
curl -s -o /dev/null -w "%{http_code}" https://freetoolz.cloud/sitemap.xml
echo ""
echo "Testing Google verification..."
curl -s -o /dev/null -w "%{http_code}" https://freetoolz.cloud/google62c9704afeeaac9f.html
echo ""
echo "Testing Bing verification..."
curl -s -o /dev/null -w "%{http_code}" https://freetoolz.cloud/BingSiteAuth.xml

echo ""
echo "✅ SEO Fix Deployment Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to Google Search Console: https://search.google.com/search-console"
echo "2. Submit sitemap: https://freetoolz.cloud/sitemap.xml"
echo "3. Use URL Inspection tool to request indexing for your homepage"
echo "4. Wait 24-48 hours for Google to recrawl"
echo ""
echo "🔗 Test URLs:"
echo "   https://freetoolz.cloud/robots.txt"
echo "   https://freetoolz.cloud/sitemap.xml"
echo "   https://freetoolz.cloud/google62c9704afeeaac9f.html"
echo "   https://freetoolz.cloud/BingSiteAuth.xml"
