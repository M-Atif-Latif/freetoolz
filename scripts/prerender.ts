/**
 * Pre-rendering Script for SEO
 * Generates static HTML files for Google crawlers
 * This solves "Discovered - currently not indexed" and "Crawled - currently not indexed" issues
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { toolMasterList } from '../src/data/tools.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

const BASE_URL = 'https://freetoolz.cloud';

// Static pages configuration
const staticPages = [
  { path: '/', title: 'Free Tools - 140+ Free Online Tools | No Sign Up Required', description: 'Access 140+ free online tools for text processing, PDF manipulation, image editing, calculations, conversions, and more. Completely free, secure, and privacy-focused.' },
  { path: '/about', title: 'About Us - Free Tools', description: 'Learn about Free Tools mission to provide free, professional-grade online tools for everyone. Our story and commitment to free tools.' },
  { path: '/contact', title: 'Contact Us - Free Tools', description: 'Get in touch with Free Tools. We value your feedback, questions, and suggestions.' },
  { path: '/privacy', title: 'Privacy Policy - Free Tools', description: 'Read our privacy policy. We are committed to protecting your data and respecting your privacy.' },
  { path: '/terms', title: 'Terms of Service - Free Tools', description: 'Review the terms and conditions for using Free Tools services.' },
  { path: '/disclaimer', title: 'Disclaimer - Free Tools', description: 'Important information and disclaimers about using Free Tools services.' },
  { path: '/blog', title: 'Blog - Free Tools', description: 'Read our latest articles, guides, and insights on productivity, privacy, and online tools.' },
  { path: '/faq', title: 'FAQ - Free Tools', description: 'Find answers to common questions about Free Tools, our tools, privacy, security, and more.' },
  { path: '/sitemap', title: 'Sitemap - All Pages | Free Tools', description: 'Browse all pages and tools available on Free Tools. Complete site navigation and tool directory.' },
];

const toolCanonicalPaths = new Set(toolMasterList.map(tool => `/${tool.slug ?? tool.id}`));

// Generate tool pages from canonical slug routes
const toolPages = toolMasterList.map(tool => ({
  path: `/${tool.slug ?? tool.id}`,
  title: `${tool.name} - Free Online Tool | Free Tools`,
  description: `${tool.description} Free, secure, no signup required. Use ${tool.name} online instantly.`,
  keywords: [tool.keyword ?? tool.name.toLowerCase(), 'free online tool', 'no signup', tool.category],
  category: tool.category,
  indexable: tool.indexable !== false,
}));

const allPages = [...staticPages, ...toolPages];

type ToolPageConfig = {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  category?: string;
  indexable?: boolean;
};

function getRelatedTools(pagePath: string, category?: string, limit = 8) {
  return toolMasterList
    .filter(tool => `/${tool.slug ?? tool.id}` !== pagePath && tool.indexable !== false && (!category || tool.category === category))
    .slice(0, limit);
}

function getCategoryIntent(category?: string) {
  const intents: Record<string, { intro: string; useCases: string[] }> = {
    text: {
      intro: 'Process, clean, and transform text in seconds for writing, editing, and publishing workflows.',
      useCases: ['Content editing and proofreading', 'SEO text cleanup and formatting', 'Document preparation and automation'],
    },
    calculator: {
      intro: 'Run fast and accurate calculations for personal, academic, and business tasks.',
      useCases: ['Financial planning and budgeting', 'Health and lifestyle calculations', 'Academic and productivity math'],
    },
    generator: {
      intro: 'Generate secure, reusable, and structured outputs instantly in your browser.',
      useCases: ['Security and identity generation', 'Design and development placeholders', 'Quick content and code utilities'],
    },
    converter: {
      intro: 'Convert data, formats, units, and values quickly without installing software.',
      useCases: ['File and data format conversion', 'Unit and value conversion', 'Developer and workflow compatibility'],
    },
    developer: {
      intro: 'Debug, validate, and optimize code and data with practical developer-focused utilities.',
      useCases: ['Data validation and formatting', 'Code optimization and debugging', 'API and web development checks'],
    },
    pdf: {
      intro: 'Manage PDF files online with fast browser-based processing for common document tasks.',
      useCases: ['Document merging and splitting', 'Compression and optimization', 'Quick file preparation and sharing'],
    },
    image: {
      intro: 'Edit and optimize images for web, social, and productivity workflows in one place.',
      useCases: ['Image size and format optimization', 'Visual asset preparation', 'Accessibility and visual quality checks'],
    },
    utility: {
      intro: 'Handle practical day-to-day digital tasks with simple and fast browser utilities.',
      useCases: ['Quick workflow automation', 'Productivity and organization tasks', 'General-purpose online utilities'],
    },
    security: {
      intro: 'Test, verify, and strengthen privacy, SEO, and security signals with focused utility tools.',
      useCases: ['SEO validation and audits', 'Security checks and analysis', 'Browser and metadata inspection'],
    },
  };

  return intents[category || 'utility'] || intents.utility;
}

function escapeJsonString(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function getBuildAssetTags() {
  const indexPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexPath)) {
    return { styles: '', scripts: '' };
  }

  const indexHtml = fs.readFileSync(indexPath, 'utf8');
  const styleLinks = Array.from(indexHtml.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/g))
    .map(match => `<link rel="stylesheet" href="${match[1]}">`)
    .join('\n  ');

  const scriptTags = Array.from(indexHtml.matchAll(/<script[^>]+type="module"[^>]+src="([^"]+)"[^>]*><\/script>/g))
    .map(match => `<script type="module" src="${match[1]}"></script>`)
    .join('\n  ');

  return { styles: styleLinks, scripts: scriptTags };
}

const buildAssets = getBuildAssetTags();

/**
 * Generate HTML template with proper meta tags for SEO
 */
function generateHTML(page: ToolPageConfig): string {
  const canonicalUrl = `${BASE_URL}${page.path === '/' ? '' : page.path}`;
  const keywords = page.keywords ? page.keywords.join(', ') : 'free online tools, no signup, browser tools';
  const robotsContent = page.indexable === false
    ? 'noindex, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
  const pageName = page.title.split(' - ')[0];
  const isToolPage = toolCanonicalPaths.has(page.path);
  const categoryIntent = getCategoryIntent(page.category);
  const relatedTools = isToolPage ? getRelatedTools(page.path, page.category) : [];
  const relatedFallback = isToolPage && relatedTools.length === 0
    ? toolMasterList.filter(tool => `/${tool.slug ?? tool.id}` !== page.path && tool.indexable !== false).slice(0, 8)
    : relatedTools;

  const faqItems = isToolPage
    ? [
        {
          question: `Is ${pageName} free to use?`,
          answer: `Yes. ${pageName} is available free on Free Tools with no signup required.`,
        },
        {
          question: `Does ${pageName} upload my data to a server?`,
          answer: `${pageName} is designed for privacy-focused browser usage, and core processing is performed on-device whenever possible.`,
        },
        {
          question: `How do I use ${pageName}?`,
          answer: `Open the tool page, provide your input, and get instant output directly in your browser.`,
        },
      ]
    : [];

  const faqSchema = isToolPage
    ? `
  <!-- FAQPage Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      ${faqItems
        .map(
          item => `{
        "@type": "Question",
        "name": "${escapeJsonString(item.question)}",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "${escapeJsonString(item.answer)}"
        }
      }`
        )
        .join(',\n      ')}
    ]
  }
  </script>

  <!-- HowTo Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to use ${escapeJsonString(pageName)}",
    "description": "${escapeJsonString(page.description)}",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Open tool",
        "text": "Open ${escapeJsonString(pageName)} on Free Tools."
      },
      {
        "@type": "HowToStep",
        "name": "Add input",
        "text": "Enter or paste the required input in the tool interface."
      },
      {
        "@type": "HowToStep",
        "name": "Configure options",
        "text": "Choose any relevant settings based on your use case."
      },
      {
        "@type": "HowToStep",
        "name": "Get result",
        "text": "Run the tool and copy or export the result instantly."
      }
    ]
  }
  </script>

  <!-- ItemList Schema: Related Tools -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Related tools for ${escapeJsonString(pageName)}",
    "itemListElement": [
      ${relatedFallback
        .map(
          (tool, index) => `{
        "@type": "ListItem",
        "position": ${index + 1},
        "name": "${escapeJsonString(tool.name)}",
        "url": "${BASE_URL}/${tool.slug ?? tool.id}"
      }`
        )
        .join(',\n      ')}
    ]
  }
  </script>`
    : '';
  
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
  <meta name="robots" content="${robotsContent}">
  <meta name="googlebot" content="${robotsContent}">
  <meta name="bingbot" content="${robotsContent}">
  
  <!-- Canonical URL - CRITICAL FOR SEO -->
  <link rel="canonical" href="${canonicalUrl}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:image" content="${BASE_URL}/logo.png">
  <meta property="og:site_name" content="Free Tools">
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
  ${buildAssets.styles}
  
  <!-- Preconnect -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "${isToolPage ? 'WebApplication' : 'WebPage'}",
    "name": "${pageName}",
    "description": "${page.description}",
    "url": "${canonicalUrl}",
    ${isToolPage ? `
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
      "name": "Free Tools",
      "url": "${BASE_URL}"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Free Tools",
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
        "name": "${isToolPage ? 'Tools' : pageName}",
        "item": "${isToolPage ? BASE_URL + '/#tools' : canonicalUrl}"
      }` : ''}${isToolPage ? `,
      {
        "@type": "ListItem",
        "position": 3,
        "name": "${pageName}",
        "item": "${canonicalUrl}"
      }` : ''}
    ]
  }
  </script>
  ${faqSchema}
  
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
  <div id="root">
    <nav>
      <a href="/">🛠️ Free Tools</a>
    <a href="/#tools">Tools</a>
    <a href="/about">About</a>
    <a href="/blog">Blog</a>
    <a href="/contact">Contact</a>
  </nav>
  
  <main class="seo-content">
    <h1>${pageName}</h1>
    <p>${page.description}</p>
    
    ${page.path === '/' ? `
    <section>
      <h2>140+ Free Online Tools - No Signup Required</h2>
      <p>Free Tools offers a comprehensive suite of free online utilities designed for everyday tasks. From text processing and PDF manipulation to image editing and calculations - all tools work directly in your browser with zero downloads required.</p>
      
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
        ${toolMasterList.map(tool => `<li><a href="/${tool.slug ?? tool.id}">${tool.name}</a></li>`).join('\n        ')}
      </ul>
    </section>
    ` : ''}
    
    ${isToolPage ? `
    <section>
      <h2>What This Tool Helps You Do</h2>
      <p>${categoryIntent.intro}</p>
      <p>${pageName} is optimized for quick results, clean output, and everyday productivity without account creation.</p>

      <h2>Common Use Cases</h2>
      <ul>
        ${categoryIntent.useCases.map(useCase => `<li>${useCase}</li>`).join('\n        ')}
      </ul>

      <h2>How to Use ${pageName}</h2>
      <ol>
        <li>Open the tool and add your input.</li>
        <li>Adjust available options based on your goal.</li>
        <li>Generate output and copy or export your result.</li>
      </ol>

      <h2>Why Use Free Tools</h2>
      <p>Our tools are built for speed and privacy with a browser-first workflow. You can complete tasks instantly without installs or signups.</p>
      
      <div class="features">
        <div class="feature">
          <h3>✅ 100% Free</h3>
          <p>No hidden costs, no premium tiers, no limitations.</p>
        </div>
        <div class="feature">
          <h3>🔒 Privacy First</h3>
          <p>Core processing is designed for local browser execution whenever possible.</p>
        </div>
        <div class="feature">
          <h3>⚡ Instant Results</h3>
          <p>Get results immediately with real-time processing.</p>
        </div>
      </div>

      <h2>Related Tools</h2>
      <ul class="tool-list">
        ${relatedFallback.map(tool => `<li><a href="/${tool.slug ?? tool.id}">${tool.name}</a></li>`).join('\n        ')}
      </ul>

      <h2>FAQ</h2>
      ${faqItems
        .map(
          item => `<h3>${item.question}</h3>
      <p>${item.answer}</p>`
        )
        .join('\n      ')}
      
      <a href="/" class="cta">← Back to All Tools</a>
    </section>
    ` : ''}
    
    <div class="loading">
      <div class="loading-spinner"></div>
      <p>Loading interactive tool...</p>
    </div>
  </main>
  
  <footer>
    <p>&copy; ${new Date().getFullYear()} Free Tools. All rights reserved.</p>
    <p>
      <a href="/privacy">Privacy Policy</a> • 
      <a href="/terms">Terms of Service</a> • 
      <a href="/sitemap">Sitemap</a>
    </p>
  </footer>
  </div>
  
  ${buildAssets.scripts}
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
      const cleanPath = page.path.replace(/^\/+/, '');
      const dirPath = path.join(distDir, cleanPath);
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

prerender().catch((error) => {
  console.error(error);
  process.exit(1);
});
