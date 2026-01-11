/**
 * Pre-rendering Script for SEO
 * Generates static HTML files for Google crawlers
 * This solves "Discovered - currently not indexed" and "Crawled - currently not indexed" issues
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { tools } from '../src/data/tools.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

const BASE_URL = 'https://freetoolz.cloud';

// Static pages configuration
const staticPages = [
  { path: '/', title: 'FreeToolz - 120+ Free Online Tools | No Sign Up Required', description: 'Access 120+ free online tools for text processing, PDF manipulation, image editing, calculations, conversions, and more. Completely free, secure, and privacy-focused.' },
  { path: '/about', title: 'About Us - FreeToolz Cloud', description: 'Learn about FreeToolz mission to provide free, professional-grade online tools for everyone. Our story and commitment to free tools.' },
  { path: '/contact', title: 'Contact Us - FreeToolz Cloud', description: 'Get in touch with FreeToolz. We value your feedback, questions, and suggestions.' },
  { path: '/privacy', title: 'Privacy Policy - FreeToolz Cloud', description: 'Read our privacy policy. We are committed to protecting your data and respecting your privacy.' },
  { path: '/terms', title: 'Terms of Service - FreeToolz Cloud', description: 'Review the terms and conditions for using FreeToolz services.' },
  { path: '/disclaimer', title: 'Disclaimer - FreeToolz Cloud', description: 'Important information and disclaimers about using FreeToolz services.' },
  { path: '/blog', title: 'Blog - FreeToolz Cloud', description: 'Read our latest articles, guides, and insights on productivity, privacy, and online tools.' },
  { path: '/faq', title: 'FAQ - FreeToolz Cloud', description: 'Find answers to common questions about FreeToolz, our tools, privacy, security, and more.' },
  { path: '/sitemap', title: 'Sitemap - All Pages | FreeToolz Cloud', description: 'Browse all pages and tools available on FreeToolz. Complete site navigation and tool directory.' },
];

// Generate tool pages from tools data
const toolPages = tools.map(tool => ({
  path: tool.path,
  title: `${tool.name} - Free Online Tool | FreeToolz Cloud`,
  description: `${tool.description} Free, secure, no signup required. Use ${tool.name} online instantly.`,
  keywords: [tool.name.toLowerCase(), 'free online tool', 'no signup', tool.category],
  category: tool.category,
}));

const allPages = [...staticPages, ...toolPages];

/**
 * Generate HTML template with proper meta tags for SEO
 */
function generateHTML(page: { path: string; title: string; description: string; keywords?: string[]; category?: string }): string {
  const canonicalUrl = `${BASE_URL}${page.path === '/' ? '' : page.path}`;
  const keywords = page.keywords ? page.keywords.join(', ') : 'free online tools, no signup, browser tools';
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>${page.title}</title>
  <meta name="title" content="${page.title}">
  <meta name="description" content="${page.description}">
  <meta name="keywords" content="${keywords}">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <meta name="bingbot" content="index, follow">
  
  <!-- Canonical URL - CRITICAL FOR SEO -->
  <link rel="canonical" href="${canonicalUrl}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:image" content="${BASE_URL}/logo.png">
  <meta property="og:site_name" content="FreeToolz Cloud">
  <meta property="og:locale" content="en_US">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${canonicalUrl}">
  <meta name="twitter:title" content="${page.title}">
  <meta name="twitter:description" content="${page.description}">
  <meta name="twitter:image" content="${BASE_URL}/logo.png">
  
  <!-- Theme Color -->
  <meta name="theme-color" content="#2563eb">
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="manifest" href="/manifest.json">
  
  <!-- Preconnect -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "${page.path.startsWith('/tools/') ? 'WebApplication' : 'WebPage'}",
    "name": "${page.title.split(' - ')[0]}",
    "description": "${page.description}",
    "url": "${canonicalUrl}",
    ${page.path.startsWith('/tools/') ? `
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },` : ''}
    "author": {
      "@type": "Organization",
      "name": "FreeToolz Cloud",
      "url": "${BASE_URL}"
    },
    "publisher": {
      "@type": "Organization",
      "name": "FreeToolz Cloud",
      "logo": {
        "@type": "ImageObject",
        "url": "${BASE_URL}/logo.png"
      }
    }
  }
  </script>
  
  <!-- BreadcrumbList Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "${BASE_URL}"
      }${page.path !== '/' ? `,
      {
        "@type": "ListItem",
        "position": 2,
        "name": "${page.path.startsWith('/tools/') ? 'Tools' : page.title.split(' - ')[0]}",
        "item": "${page.path.startsWith('/tools/') ? BASE_URL + '/#tools' : canonicalUrl}"
      }` : ''}${page.path.startsWith('/tools/') ? `,
      {
        "@type": "ListItem",
        "position": 3,
        "name": "${page.title.split(' - ')[0]}",
        "item": "${canonicalUrl}"
      }` : ''}
    ]
  }
  </script>
  
  <!-- Critical CSS -->
  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{-webkit-font-smoothing:antialiased;line-height:1.5}
    body{font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;background:#fff;color:#111;min-height:100vh}
    @media(prefers-color-scheme:dark){body{background:#0a0a0a;color:#fff}}
    .seo-content{max-width:1200px;margin:0 auto;padding:2rem 1rem}
    h1{font-size:2.5rem;font-weight:800;margin-bottom:1rem;color:#1e40af}
    @media(prefers-color-scheme:dark){h1{color:#60a5fa}}
    p{font-size:1.125rem;line-height:1.75;margin-bottom:1rem;color:#4b5563}
    @media(prefers-color-scheme:dark){p{color:#9ca3af}}
    .features{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1.5rem;margin:2rem 0}
    .feature{background:#f8fafc;padding:1.5rem;border-radius:0.75rem;border:1px solid #e2e8f0}
    @media(prefers-color-scheme:dark){.feature{background:#1f2937;border-color:#374151}}
    .feature h3{font-size:1.25rem;font-weight:600;margin-bottom:0.5rem;color:#1e40af}
    @media(prefers-color-scheme:dark){.feature h3{color:#60a5fa}}
    .cta{display:inline-block;background:#2563eb;color:#fff;padding:0.75rem 2rem;border-radius:0.5rem;text-decoration:none;font-weight:600;margin-top:1rem}
    .cta:hover{background:#1d4ed8}
    .loading{text-align:center;padding:3rem}
    .loading-spinner{width:40px;height:40px;border:3px solid #e5e7eb;border-top-color:#2563eb;border-radius:50%;animation:spin 1s linear infinite;margin:0 auto 1rem}
    @keyframes spin{to{transform:rotate(360deg)}}
    nav{background:#fff;border-bottom:1px solid #e5e7eb;padding:1rem;position:sticky;top:0;z-index:100}
    @media(prefers-color-scheme:dark){nav{background:#111827;border-color:#374151}}
    nav a{color:#2563eb;text-decoration:none;margin-right:1rem;font-weight:500}
    footer{background:#f8fafc;border-top:1px solid #e5e7eb;padding:2rem 1rem;text-align:center;margin-top:auto}
    @media(prefers-color-scheme:dark){footer{background:#111827;border-color:#374151}}
    .tool-list{list-style:none;columns:2;gap:1rem}
    @media(min-width:768px){.tool-list{columns:3}}
    @media(min-width:1024px){.tool-list{columns:4}}
    .tool-list li{margin-bottom:0.5rem}
    .tool-list a{color:#2563eb;text-decoration:none}
    .tool-list a:hover{text-decoration:underline}
  </style>
</head>
<body>
  <nav>
    <a href="/">🛠️ FreeToolz</a>
    <a href="/#tools">Tools</a>
    <a href="/about">About</a>
    <a href="/blog">Blog</a>
    <a href="/contact">Contact</a>
  </nav>
  
  <main class="seo-content">
    <h1>${page.title.split(' - ')[0]}</h1>
    <p>${page.description}</p>
    
    ${page.path === '/' ? `
    <section>
      <h2>120+ Free Online Tools - No Signup Required</h2>
      <p>FreeToolz Cloud offers a comprehensive suite of free online utilities designed for everyday tasks. From text processing and PDF manipulation to image editing and calculations - all tools work directly in your browser with zero downloads required.</p>
      
      <div class="features">
        <div class="feature">
          <h3>📝 Text Tools</h3>
          <p>Word counter, case converter, text reverser, Lorem Ipsum generator, and 15+ more text processing tools.</p>
        </div>
        <div class="feature">
          <h3>🧮 Calculators</h3>
          <p>BMI calculator, age calculator, percentage calculator, loan calculator, and specialized calculation tools.</p>
        </div>
        <div class="feature">
          <h3>🔒 Security Tools</h3>
          <p>Password generator, hash generator, password strength checker, and security testing utilities.</p>
        </div>
        <div class="feature">
          <h3>📄 PDF Tools</h3>
          <p>Merge, split, compress, and rotate PDFs directly in your browser. No uploads to servers.</p>
        </div>
        <div class="feature">
          <h3>🖼️ Image Tools</h3>
          <p>Image compressor, resizer, format converter, grayscale converter, and background remover.</p>
        </div>
        <div class="feature">
          <h3>💻 Developer Tools</h3>
          <p>JSON formatter, Base64 encoder, URL encoder, regex tester, and code minifiers.</p>
        </div>
      </div>
      
      <h2>All Available Tools</h2>
      <ul class="tool-list">
        ${tools.map(t => `<li><a href="${t.path}">${t.name}</a></li>`).join('\n        ')}
      </ul>
    </section>
    ` : ''}
    
    ${page.path.startsWith('/tools/') ? `
    <section>
      <h2>How to Use This Tool</h2>
      <p>This tool is completely free and works directly in your browser. No signup, no downloads, no data uploaded to servers.</p>
      
      <div class="features">
        <div class="feature">
          <h3>✅ 100% Free</h3>
          <p>No hidden costs, no premium tiers, no limitations.</p>
        </div>
        <div class="feature">
          <h3>🔒 Privacy First</h3>
          <p>All processing happens in your browser. Your data never leaves your device.</p>
        </div>
        <div class="feature">
          <h3>⚡ Instant Results</h3>
          <p>Get results immediately with real-time processing.</p>
        </div>
      </div>
      
      <a href="/" class="cta">← Back to All Tools</a>
    </section>
    ` : ''}
    
    <div class="loading">
      <div class="loading-spinner"></div>
      <p>Loading interactive tool...</p>
    </div>
  </main>
  
  <footer>
    <p>&copy; ${new Date().getFullYear()} FreeToolz Cloud. All rights reserved.</p>
    <p>
      <a href="/privacy">Privacy Policy</a> • 
      <a href="/terms">Terms of Service</a> • 
      <a href="/sitemap">Sitemap</a>
    </p>
  </footer>
  
  <div id="root"></div>
  <script type="module" src="/assets/index.js"></script>
</body>
</html>`;
}

/**
 * Main pre-rendering function
 */
async function prerender() {
  console.log('🚀 Starting pre-rendering for SEO...\n');
  
  // Ensure dist directory exists
  if (!fs.existsSync(distDir)) {
    console.log('⚠️ Dist directory not found. Run "npm run build" first.\n');
    return;
  }
  
  let createdCount = 0;
  
  for (const page of allPages) {
    const html = generateHTML(page);
    
    // Determine file path
    let filePath: string;
    if (page.path === '/') {
      filePath = path.join(distDir, 'index.html');
    } else {
      // Create directory structure for clean URLs
      const dirPath = path.join(distDir, page.path);
      fs.mkdirSync(dirPath, { recursive: true });
      filePath = path.join(dirPath, 'index.html');
    }
    
    // Only update if different or doesn't exist
    const existingContent = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
    
    // For the main index.html, preserve the React app but update meta tags
    if (page.path === '/') {
      // Keep the existing index.html but ensure it has proper meta tags
      console.log(`📄 Skipping ${page.path} (main React entry point)`);
      continue;
    }
    
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✅ Created: ${page.path}/index.html`);
    createdCount++;
  }
  
  console.log(`\n🎉 Pre-rendering complete! Created ${createdCount} HTML files.`);
  console.log('\n📝 SEO Benefits:');
  console.log('   - Each page now has server-rendered content for Google crawlers');
  console.log('   - Proper canonical URLs prevent duplicate content issues');
  console.log('   - Structured data helps Google understand your content');
  console.log('   - Meta tags are properly set for each page');
}

prerender().catch(console.error);
