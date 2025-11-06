/**
 * SEO Utilities and Meta Tag Management
 */

export interface MetaTags {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  canonical?: string;
}

/**
 * Update page meta tags for SEO
 */
export const updateMetaTags = (tags: MetaTags): void => {
  // Update title
  document.title = tags.title;

  // Helper function to set or update meta tag
  const setMetaTag = (selector: string, content: string, property?: boolean) => {
    const attribute = property ? 'property' : 'name';
    let meta = document.querySelector(`meta[${attribute}="${selector}"]`) as HTMLMetaElement;
    
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, selector);
      document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', content);
  };

  // Standard meta tags
  setMetaTag('description', tags.description);
  if (tags.keywords) {
    setMetaTag('keywords', tags.keywords);
  }

  // Open Graph tags
  setMetaTag('og:title', tags.ogTitle || tags.title, true);
  setMetaTag('og:description', tags.ogDescription || tags.description, true);
  if (tags.ogUrl) {
    setMetaTag('og:url', tags.ogUrl, true);
  }
  if (tags.ogImage) {
    setMetaTag('og:image', tags.ogImage, true);
  }
  setMetaTag('og:type', 'website', true);

  // Twitter tags
  setMetaTag('twitter:card', tags.twitterCard || 'summary_large_image');
  setMetaTag('twitter:title', tags.ogTitle || tags.title);
  setMetaTag('twitter:description', tags.ogDescription || tags.description);
  if (tags.ogImage) {
    setMetaTag('twitter:image', tags.ogImage);
  }

  // Canonical URL
  if (tags.canonical) {
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = tags.canonical;
  }
};

/**
 * Generate structured data for SEO (JSON-LD)
 */
export const generateStructuredData = (type: 'WebSite' | 'WebPage' | 'Tool', data: Record<string, unknown>): void => {
  const scriptId = 'structured-data';
  let script = document.getElementById(scriptId) as HTMLScriptElement;
  
  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  script.textContent = JSON.stringify(structuredData);
};

/**
 * Generate WebApplication structured data for tool pages
 */
export const generateToolStructuredData = (toolData: {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
  aggregateRating?: {
    ratingValue: string;
    reviewCount: string;
  };
  author?: {
    name: string;
    url: string;
  };
}): void => {
  const scriptId = 'tool-structured-data';
  let script = document.getElementById(scriptId) as HTMLScriptElement;
  
  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: toolData.name,
    description: toolData.description,
    url: toolData.url,
    applicationCategory: toolData.applicationCategory,
    operatingSystem: toolData.operatingSystem || 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: toolData.offers || {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: toolData.author || {
      '@type': 'Organization',
      name: 'FreeToolz',
      url: 'https://freetoolz.com',
    },
    ...(toolData.aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: toolData.aggregateRating.ratingValue,
        reviewCount: toolData.aggregateRating.reviewCount,
      },
    }),
  };

  script.textContent = JSON.stringify(structuredData);
};

/**
 * Generate HowTo structured data for tool instructions
 */
export const generateHowToStructuredData = (howToData: {
  name: string;
  description: string;
  steps: string[];
  totalTime?: string;
  tool?: string;
}): void => {
  const scriptId = 'howto-structured-data';
  let script = document.getElementById(scriptId) as HTMLScriptElement;
  
  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howToData.name,
    description: howToData.description,
    ...(howToData.totalTime && { totalTime: howToData.totalTime }),
    ...(howToData.tool && {
      tool: {
        '@type': 'HowToTool',
        name: howToData.tool,
      },
    }),
    step: howToData.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: `Step ${index + 1}`,
      text: step,
    })),
  };

  script.textContent = JSON.stringify(structuredData);
};

/**
 * Generate FAQPage structured data
 */
export const generateFAQStructuredData = (faqs: { question: string; answer: string }[]): void => {
  const scriptId = 'faq-structured-data';
  let script = document.getElementById(scriptId) as HTMLScriptElement;
  
  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  script.textContent = JSON.stringify(structuredData);
};

/**
 * Generate breadcrumb structured data
 */
export const generateBreadcrumbs = (items: { name: string; url: string }[]): void => {
  const scriptId = 'breadcrumb-data';
  let script = document.getElementById(scriptId) as HTMLScriptElement;
  
  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  script.textContent = JSON.stringify(breadcrumbList);
};

/**
 * Create XML sitemap data
 */
export const generateSitemapXML = (pages: { url: string; lastmod?: string; priority?: number; changefreq?: string }[]): string => {
  const urlSet = pages.map(page => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq || 'weekly'}</changefreq>
    <priority>${page.priority || 0.8}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlSet}
</urlset>`;
};

/**
 * Track page view (placeholder for analytics integration)
 */
export const trackPageView = (path: string, title: string): void => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: path,
      page_title: title,
    });
  }

  // Console log for debugging
  if (import.meta.env.DEV) {
    console.log('Page view:', { path, title });
  }
};

/**
 * Create robots.txt content
 */
export const generateRobotsTxt = (sitemapUrl: string): string => {
  return `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: ${sitemapUrl}

# Google bots
User-agent: Googlebot
Allow: /

# Bing bots
User-agent: Bingbot
Allow: /

# Crawl-delay for all bots
Crawl-delay: 1
`;
};
