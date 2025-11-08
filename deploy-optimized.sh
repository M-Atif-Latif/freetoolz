#!/bin/bash

echo "Ì∫Ä Optimized Deployment Script for FreeToo lz"
echo "=============================================="

# Step 1: Backup old config
echo "Ì≥¶ Backing up old vite.config.ts..."
cp vite.config.ts vite.config.backup.ts

# Step 2: Use optimized config
echo "‚öôÔ∏è  Applying optimized configuration..."
cp vite.config.optimized.ts vite.config.ts

# Step 3: Clean and reinstall
echo "Ì∑π Cleaning old builds..."
rm -rf dist node_modules/.vite

# Step 4: Rebuild
echo "Ì¥® Building with optimizations..."
npm run build

# Step 5: Move files
echo "Ì≥Å Moving files to root..."
rm -rf assets
cp -r dist/* .
rm -rf dist

# Step 6: Commit
echo "Ì≤æ Committing changes..."
git add .
git commit -m "Performance optimization: reduce bundle size, enable compression"

# Step 7: Push
echo "‚¨ÜÔ∏è  Pushing to GitHub..."
git push origin main

echo "‚úÖ Local deployment complete!"
echo ""
echo "Ì≥ã Next steps on VPS:"
echo "   ssh root@72.61.113.236"
echo "   cd /var/www/freetoolz"
echo "   git pull origin main"
echo "   sudo nano /etc/nginx/sites-available/freetoolz"
echo "   # Paste config from nginx-config.txt"
echo "   sudo nginx -t && sudo systemctl reload nginx"
