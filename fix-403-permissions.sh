#!/bin/bash
# Fix 403 Forbidden Error - Permission Issues
# Run this script on your VPS server

echo "🔧 Fixing 403 Forbidden Error..."
echo "================================"

# Step 1: Check if directory exists
if [ ! -d "/var/www/freetoolz" ]; then
    echo "❌ Directory /var/www/freetoolz does not exist!"
    echo "Creating directory..."
    sudo mkdir -p /var/www/freetoolz
fi

# Step 2: Set correct ownership
echo "Setting correct ownership..."
sudo chown -R www-data:www-data /var/www/freetoolz

# Step 3: Set correct permissions
echo "Setting correct permissions..."
sudo chmod -R 755 /var/www/freetoolz

# Step 4: Fix nginx user
echo "Checking nginx user..."
NGINX_USER=$(grep "^user" /etc/nginx/nginx.conf | awk '{print $2}' | sed 's/;//')
echo "Nginx is running as: $NGINX_USER"

# Step 5: Verify index.html exists
if [ -f "/var/www/freetoolz/index.html" ]; then
    echo "✅ index.html found"
else
    echo "❌ index.html NOT found - you need to upload your dist files!"
    echo "Run: scp -r dist/* user@server:/var/www/freetoolz/"
fi

# Step 6: Test nginx configuration
echo "Testing nginx configuration..."
sudo nginx -t

# Step 7: Reload nginx
echo "Reloading nginx..."
sudo systemctl reload nginx

# Step 8: Check nginx status
echo "Checking nginx status..."
sudo systemctl status nginx --no-pager

echo ""
echo "✅ Permission fixes applied!"
echo ""
echo "If still getting 403, check:"
echo "1. SELinux (if enabled): sudo setenforce 0"
echo "2. Nginx error log: sudo tail -50 /var/log/nginx/error.log"
echo "3. File permissions: ls -la /var/www/freetoolz/"
