import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// All 120 tool paths
const toolPaths = [
  '/tools/word-counter',
  '/tools/case-converter',
  '/tools/text-reverser',
  '/tools/remove-spaces',
  '/tools/lorem-ipsum',
  '/tools/age-calculator',
  '/tools/bmi-calculator',
  '/tools/percentage-calculator',
  '/tools/password-generator',
  '/tools/qr-code-generator',
  '/tools/uuid-generator',
  '/tools/random-number',
  '/tools/base64-encoder',
  '/tools/url-encoder',
  '/tools/color-converter',
  '/tools/json-formatter',
  '/tools/html-encoder',
  '/tools/character-counter',
  '/tools/text-to-slug',
  '/tools/markdown-to-html',
  '/tools/duplicate-line-remover',
  '/tools/line-sorter',
  '/tools/find-and-replace',
  '/tools/word-frequency',
  '/tools/letter-counter',
  '/tools/discount-calculator',
  '/tools/loan-calculator',
  '/tools/tip-calculator',
  '/tools/date-calculator',
  '/tools/time-calculator',
  '/tools/unit-converter',
  '/tools/temperature-converter',
  '/tools/currency-converter',
  '/tools/length-converter',
  '/tools/weight-converter',
  '/tools/area-converter',
  '/tools/volume-converter',
  '/tools/speed-converter',
  '/tools/css-minifier',
  '/tools/js-minifier',
  '/tools/sql-formatter',
  '/tools/regex-tester',
  '/tools/code-beautifier',
  '/tools/diff-checker',
  '/tools/string-utilities',
  '/tools/binary-converter',
  '/tools/hex-converter',
  '/tools/morse-code',
  '/tools/pdf-merge',
  '/tools/pdf-split',
  '/tools/pdf-compress',
  '/tools/pdf-to-image',
  '/tools/image-to-pdf',
  '/tools/password-strength',
  '/tools/hash-generator',
  '/tools/encryption-tool',
  '/tools/image-compressor',
  '/tools/image-resizer',
  '/tools/image-converter',
  '/tools/image-crop',
  '/tools/color-picker',
  '/tools/gradient-generator',
  '/tools/invoice-generator',
  '/tools/stopwatch',
  '/tools/timer',
  '/tools/clock',
  '/tools/barcode-generator',
  '/tools/dice-roller',
  '/tools/coin-flip',
  '/tools/fuel-cost-calculator',
  '/tools/gpa-calculator',
  '/tools/compound-interest-calculator',
  '/tools/binary-calculator',
  '/tools/hex-calculator',
  '/tools/grayscale-converter',
  '/tools/image-base64',
  '/tools/compress-pdf',
  '/tools/merge-pdf',
  '/tools/smart-sentence-splitter',
  '/tools/contraction-expander',
  '/tools/read-aloud-caption-generator',
  '/tools/title-headline-analyzer',
  '/tools/text-randomizer',
  '/tools/csv-column-splitter',
  '/tools/yaml-json-converter',
  '/tools/css-tailwind-classifier',
  '/tools/http-status-tester',
  '/tools/cors-header-checker',
  '/tools/power-energy-converter',
  '/tools/file-encoding-detector',
  '/tools/image-dpi-calculator',
  '/tools/hash-identifier',
  '/tools/permutation-combination-calculator',
  '/tools/color-blindness-simulator',
  '/tools/business-days-calculator',
  '/tools/ascii-art-generator',
  '/tools/working-hours-timezone-converter',
  '/tools/csv-duplicate-finder',
  '/tools/regex-bulk-replace',
  '/tools/bulk-url-shortener',
  '/tools/clipboard-history',
  '/tools/dataset-sampler',
  '/tools/zip-file-inspector',
  '/tools/console-log-formatter',
  '/tools/svg-optimizer',
  '/tools/favicon-generator',
  '/tools/color-contrast-checker',
  '/tools/password-strength-analyzer',
  '/tools/cookie-inspector',
  '/tools/meta-robots-tester',
  '/tools/structured-data-validator',
  '/tools/sitemap-url-extractor',
  '/tools/pdf-page-extractor'
];

// Static pages
const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.7', changefreq: 'weekly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.5', changefreq: 'yearly' },
  { path: '/disclaimer', priority: '0.5', changefreq: 'yearly' },
  { path: '/faq', priority: '0.7', changefreq: 'monthly' }
];

const baseUrl = 'https://freetoolz.cloud';
const today = new Date().toISOString().split('T')[0];

// Generate XML
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// Add static pages
staticPages.forEach(page => {
  xml += '  <url>\n';
  xml += `    <loc>${baseUrl}${page.path}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
  xml += `    <priority>${page.priority}</priority>\n`;
  xml += '  </url>\n';
});

// Add all 120 tool pages
toolPaths.forEach(toolPath => {
  xml += '  <url>\n';
  xml += `    <loc>${baseUrl}${toolPath}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>0.9</priority>\n`;
  xml += '  </url>\n';
});

xml += '</urlset>';

// Write to public/sitemap.xml
const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, xml, 'utf-8');

console.log(`✅ Sitemap generated successfully with ${staticPages.length + toolPaths.length} URLs`);
console.log(`   📝 ${staticPages.length} static pages`);
console.log(`   🔧 ${toolPaths.length} tool pages`);
console.log(`   📍 Output: ${outputPath}`);
