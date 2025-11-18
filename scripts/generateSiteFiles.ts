/// <reference types="node" />
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { tools } from '../src/data/tools.ts';

const baseUrl = 'https://freetoolz.com';
const today = new Date().toISOString().split('T')[0];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticPages = [
  { loc: `${baseUrl}/`, changefreq: 'daily', priority: 1.0 },
  { loc: `${baseUrl}/about`, changefreq: 'monthly', priority: 0.8 },
  { loc: `${baseUrl}/blog`, changefreq: 'weekly', priority: 0.7 },
  { loc: `${baseUrl}/contact`, changefreq: 'monthly', priority: 0.7 },
  { loc: `${baseUrl}/privacy`, changefreq: 'yearly', priority: 0.6 },
  { loc: `${baseUrl}/terms`, changefreq: 'yearly', priority: 0.6 },
  { loc: `${baseUrl}/faq`, changefreq: 'monthly', priority: 0.7 },
  { loc: `${baseUrl}/sitemap`, changefreq: 'monthly', priority: 0.5 }
];

const toolEntries = tools.map(tool => ({
  loc: `${baseUrl}${tool.path}`,
  changefreq: tool.category === 'pdf' ? 'daily' : 'weekly',
  priority: tool.category === 'pdf' ? 0.92 : 0.85
}));

const urlEntries = [...staticPages, ...toolEntries]
  .map(
    entry => `  <url>\n    <loc>${entry.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority.toFixed(2)}</priority>\n  </url>`
  )
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

const robots = `# FreeToolz robots configuration\nUser-agent: *\nAllow: /\nCrawl-delay: 1\n\nUser-agent: GPTBot\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nUser-agent: Claude-Web\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`;

const sitemapPath = path.resolve(__dirname, '../sitemap.xml');
const robotsPath = path.resolve(__dirname, '../robots.txt');

fs.writeFileSync(sitemapPath, sitemap, 'utf8');
fs.writeFileSync(robotsPath, robots, 'utf8');

console.log(`Updated sitemap.xml (${urlEntries.split('</url>').length - 1} URLs).`);
console.log('Updated robots.txt with AI crawler allowances.');
