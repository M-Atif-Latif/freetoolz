#!/bin/bash
# Verification script for GSC Alternate Page Fix
# Run this after deployment to verify all fixes are in place

echo "=== FreeToolz GSC Alternate Page Fix Verification ==="
echo ""

# Check 1: robots.txt has Clean-param
echo "✓ Checking robots.txt for Clean-param directives..."
if grep -q "Clean-param: ref" robots.txt; then
    echo "  ✅ robots.txt has Clean-param directives"
    grep "Clean-param:" robots.txt | head -3
else
    echo "  ❌ robots.txt missing Clean-param directives"
fi
echo ""

# Check 2: index.html has early canonical script
echo "✓ Checking index.html for early canonical injection..."
if grep -q "EARLY CANONICAL INJECTION" index.html; then
    echo "  ✅ index.html has early canonical script"
else
    echo "  ❌ index.html missing early canonical script"
fi
echo ""

# Check 3: Nginx config has Link header
echo "✓ Checking nginx config for Link headers..."
if grep -q "add_header Link" nginx-config.txt; then
    echo "  ✅ nginx-config.txt has Link header"
else
    echo "  ❌ nginx-config.txt missing Link header"
fi
echo ""

# Check 4: useSEO.ts has comments
echo "✓ Checking useSEO.ts for fix comments..."
if grep -q "CRITICAL FIX FOR GOOGLE SEARCH CONSOLE" src/utils/useSEO.ts; then
    echo "  ✅ useSEO.ts has fix documentation"
else
    echo "  ❌ useSEO.ts missing fix documentation"
fi
echo ""

echo "=== Deployment Instructions ==="
echo ""
echo "1. Commit changes:"
echo "   git add robots.txt index.html nginx-config.txt src/utils/useSEO.ts"
echo "   git commit -m \"fix: GSC alternate page parameter handling\""
echo ""
echo "2. Push to GitHub:"
echo "   git push origin main"
echo ""
echo "3. Deploy via n8n or deploy script:"
echo "   /opt/freetoolz/scripts/deploy.sh"
echo ""
echo "4. Verify in Google Search Console (24-48 hours):"
echo "   - Go to Coverage report"
echo "   - Look for https://freetoolz.cloud/?ref=steemhunt"
echo "   - Should show as 'Indexed' or 'Excluded' (not alternate page)"
echo ""
echo "For full details, see: GSC_ALTERNATE_PAGE_FIX.md"
