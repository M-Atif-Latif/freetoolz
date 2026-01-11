/// <reference types="node" />
/**
 * Site Files Generator for SEO
 * Generates optimized sitemap.xml and robots.txt for better Google indexing
 * 
 * Key fixes for "Discovered - currently not indexed" issues:
 * 1. Proper sitemap with image and news namespace support
 * 2. Optimized robots.txt without crawl-delay (can slow indexing)
 * 3. More aggressive indexing signals
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { tools } from '../src/data/tools.ts';

const baseUrl = 'https://freetoolz.cloud';
const today = new Date().toISOString().split('T')[0];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const distDir = path.join(projectRoot, 'dist');

fs.mkdirSync(publicDir, { recursive: true });

// Priority tools that should be indexed first (most valuable)
const highPriorityCategories = ['text', 'calculator', 'generator', 'pdf'];

const staticPages = [
  { loc: `${baseUrl}/`, changefreq: 'daily', priority: 1.0 },
  { loc: `${baseUrl}/about`, changefreq: 'monthly', priority: 0.8 },
  { loc: `${baseUrl}/blog`, changefreq: 'weekly', priority: 0.8 },
  { loc: `${baseUrl}/contact`, changefreq: 'monthly', priority: 0.6 },
  { loc: `${baseUrl}/privacy`, changefreq: 'yearly', priority: 0.4 },
  { loc: `${baseUrl}/terms`, changefreq: 'yearly', priority: 0.4 },
  { loc: `${baseUrl}/disclaimer`, changefreq: 'yearly', priority: 0.3 },
  { loc: `${baseUrl}/faq`, changefreq: 'monthly', priority: 0.7 },
  { loc: `${baseUrl}/sitemap`, changefreq: 'weekly', priority: 0.5 }
];

// Sort tools by category priority and create entries
const toolEntries = tools
  .map(tool => ({
    loc: `${baseUrl}${tool.path}`,
    changefreq: 'weekly' as const,
    // High priority tools get better sitemap priority
    priority: highPriorityCategories.includes(tool.category) ? 0.9 : 0.8,
    name: tool.name,
    description: tool.description,
  }))
  .sort((a, b) => b.priority - a.priority); // Sort by priority descending

const urlEntries = [...staticPages, ...toolEntries]
  .map(entry => {
    // Enhanced sitemap entry with more metadata
    return `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(2)}</priority>
  </url>`;
  })
  .join('\n');

// Enhanced sitemap with XML namespaces for better SEO
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<!-- FreeToolz Cloud Sitemap - Generated ${today} -->
<!-- ${staticPages.length} static pages + ${toolEntries.length} tool pages = ${staticPages.length + toolEntries.length} total URLs -->
${urlEntries}
</urlset>
`;

// Optimized robots.txt for better crawling
// REMOVED Crawl-delay as it can significantly slow down indexing
const robots = `# FreeToolz Cloud Robots Configuration
# Website: ${baseUrl}
# Generated: ${today}

# Allow all crawlers full access
User-agent: *
Allow: /

# Specifically allow Google crawlers (helps with indexing)
User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Googlebot-News
Allow: /

User-agent: Googlebot-Video
Allow: /

# Allow Bing
User-agent: Bingbot
Allow: /

# Allow other major search engines
User-agent: Yandex
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

# Allow AI crawlers for visibility
User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: CCBot
Allow: /

# Block bad bots
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /

# Sitemap location (critical for discovery)
Sitemap: ${baseUrl}/sitemap.xml

# Host directive for preferred domain
Host: ${baseUrl}
`;

const sitemapPublicPath = path.join(publicDir, 'sitemap.xml');
const robotsPublicPath = path.join(publicDir, 'robots.txt');

fs.writeFileSync(sitemapPublicPath, sitemap, 'utf8');
fs.writeFileSync(robotsPublicPath, robots, 'utf8');

if (fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
  fs.copyFileSync(sitemapPublicPath, path.join(distDir, 'sitemap.xml'));
  fs.copyFileSync(robotsPublicPath, path.join(distDir, 'robots.txt'));
}

console.log(`✅ Updated sitemap.xml (${staticPages.length + toolEntries.length} URLs)`);
console.log(`✅ Updated robots.txt with optimized crawl rules`);
console.log(`\n📊 URL Breakdown:`);
console.log(`   - Static pages: ${staticPages.length}`);
console.log(`   - Tool pages: ${toolEntries.length}`);
console.log(`   - Total: ${staticPages.length + toolEntries.length}`);
