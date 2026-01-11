/**
 * IndexNow Submission Script
 * Submits URLs to search engines for faster indexing
 * 
 * This helps solve "Discovered - currently not indexed" issues by
 * proactively notifying search engines about your pages
 */

import { tools } from '../src/data/tools.ts';

const BASE_URL = 'https://freetoolz.cloud';

// IndexNow endpoints
const INDEXNOW_ENDPOINTS = [
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
  // Google doesn't support IndexNow yet, but uses the Indexing API
];

// Generate all URLs
const staticPages = [
  '/',
  '/about',
  '/blog',
  '/contact',
  '/privacy',
  '/terms',
  '/disclaimer',
  '/faq',
  '/sitemap',
];

const toolPaths = tools.map(tool => tool.path);
const allUrls = [...staticPages, ...toolPaths].map(path => `${BASE_URL}${path}`);

/**
 * You need to generate an IndexNow key and place it at:
 * https://freetoolz.cloud/{key}.txt
 * 
 * The key should be a random string like: a1b2c3d4e5f6g7h8
 */
const INDEXNOW_KEY = 'YOUR_INDEXNOW_KEY_HERE';

interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

async function submitToIndexNow() {
  console.log('🚀 Starting IndexNow URL submission...\n');
  
  if (INDEXNOW_KEY === 'YOUR_INDEXNOW_KEY_HERE') {
    console.log('⚠️  Please set your IndexNow key first!');
    console.log('   1. Generate a random key (e.g., using UUID generator)');
    console.log('   2. Create a file at public/{key}.txt with the key as content');
    console.log('   3. Update INDEXNOW_KEY in this script');
    console.log('\n   Example: If your key is "abc123xyz"');
    console.log('   - Create file: public/abc123xyz.txt');
    console.log('   - Content of file: abc123xyz');
    console.log('   - Set INDEXNOW_KEY = "abc123xyz"');
    return;
  }
  
  const payload: IndexNowPayload = {
    host: 'freetoolz.cloud',
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: allUrls,
  };
  
  console.log(`📊 Submitting ${allUrls.length} URLs to IndexNow endpoints...\n`);
  
  for (const endpoint of INDEXNOW_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payload),
      });
      
      if (response.ok || response.status === 202) {
        console.log(`✅ ${endpoint} - Success (${response.status})`);
      } else {
        console.log(`❌ ${endpoint} - Failed (${response.status}: ${response.statusText})`);
      }
    } catch (error) {
      console.log(`❌ ${endpoint} - Error: ${error}`);
    }
  }
  
  console.log('\n📝 Next Steps:');
  console.log('   1. Verify your IndexNow key file is accessible');
  console.log('   2. Check Bing Webmaster Tools for indexing status');
  console.log('   3. Run this script whenever you add new pages');
}

// Google Search Console URL Inspection API setup guide
console.log(`
╔═══════════════════════════════════════════════════════════════════╗
║           FreeToolz URL Indexing Helper                           ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  This script helps submit URLs to search engines.                 ║
║                                                                   ║
║  GOOGLE SEARCH CONSOLE (Manual Steps):                            ║
║  1. Go to https://search.google.com/search-console                ║
║  2. Select your property: freetoolz.cloud                         ║
║  3. Go to "URL Inspection" in the left menu                       ║
║  4. Paste each problem URL and click "Request Indexing"           ║
║                                                                   ║
║  Priority URLs to submit:                                         ║
║  - https://freetoolz.cloud/tools/time-calculator                  ║
║  - https://freetoolz.cloud/tools/dice-roller                      ║
║  - https://freetoolz.cloud/tools/yaml-json-converter              ║
║  - https://freetoolz.cloud/tools/weight-converter                 ║
║                                                                   ║
║  BING WEBMASTER TOOLS:                                            ║
║  1. Go to https://www.bing.com/webmasters                         ║
║  2. Use "Submit URLs" feature                                     ║
║  3. Submit your sitemap: ${BASE_URL}/sitemap.xml
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
`);

console.log('\n📋 All URLs to index:');
console.log('─'.repeat(60));
allUrls.forEach((url, i) => {
  console.log(`${(i + 1).toString().padStart(3)}. ${url}`);
});
console.log('─'.repeat(60));
console.log(`Total: ${allUrls.length} URLs\n`);

// Submit to IndexNow
submitToIndexNow();
