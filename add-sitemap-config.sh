#!/bin/bash

# Backup current Nginx config
cp /etc/nginx/sites-enabled/freetoolz /etc/nginx/sites-enabled/freetoolz.backup_sitemap

# Add sitemap configuration after the root directive
sed -i '/root \/var\/www\/freetoolz;/a\
\
    # Sitemap XML Configuration for Google Search Console\
    location = /sitemap.xml {\
        default_type application/xml;\
        add_header Content-Type "application/xml; charset=UTF-8";\
        add_header Cache-Control "public, max-age=3600";\
    }\
\
    location ~* \\.xml$ {\
        default_type application/xml;\
        add_header Content-Type "application/xml; charset=UTF-8";\
    }' /etc/nginx/sites-enabled/freetoolz

# Test Nginx configuration
echo "Testing Nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Configuration test passed!"
    echo "Reloading Nginx..."
    systemctl reload nginx
    echo "✅ Nginx reloaded successfully!"
else
    echo "❌ Configuration test failed! Restoring backup..."
    cp /etc/nginx/sites-enabled/freetoolz.backup_sitemap /etc/nginx/sites-enabled/freetoolz
fi
