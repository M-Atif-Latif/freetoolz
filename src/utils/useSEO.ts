import { useEffect } from 'react';
import {
  generateToolSchema,
  generateBreadcrumbSchema,
  getToolFAQSchema,
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateWebPageSchema,
  generateDefaultToolFAQSchema,
} from './seoSchemas';

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  author?: string;
  robots?: string;
  toolName?: string;
  toolCategory?: string;
  toolUrl?: string;
}

const BASE_URL = 'https://freetoolz.cloud';
const DEFAULT_SOCIAL_IMAGE = `${BASE_URL}/logo.png`;

const cleanDescription = (description: string): string =>
  description.replace(/^Use Case:\s*/i, '').trim();

export const useSEO = (config: SEOConfig) => {
  useEffect(() => {
    document.title = config.title;

    // ============================================================
    // CRITICAL FIX FOR GOOGLE SEARCH CONSOLE ISSUE
    // ============================================================
    // Problem: Google showed "?ref=steemhunt" as alternate page
    // Solution: Always use pathname ONLY (strips ?ref=, ?utm_*, #hash)
    // Result: All parameterized URLs resolve to same canonical
    // 
    // This combined with:
    // - robots.txt Clean-param directives
    // - Early canonical injection in index.html
    // - Nginx Link headers
    // Ensures Google treats all variants as one page
    // ============================================================
    const canonicalUrl = config.canonical || `${window.location.origin}${window.location.pathname}`;
    const pageName = config.toolName ?? config.title.split('|')[0].trim();
    const normalizedDescription = cleanDescription(config.description);
    const ogImage = config.ogImage || DEFAULT_SOCIAL_IMAGE;
    const twitterImage = config.twitterImage || ogImage;

    const updateMetaTag = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMetaTag('description', normalizedDescription);
    if (config.keywords) {
      updateMetaTag('keywords', config.keywords);
    }
    if (config.author) {
      updateMetaTag('author', config.author);
    }
    updateMetaTag('robots', config.robots || 'index, follow, max-snippet:-1, max-image-preview:large');

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:title', config.ogTitle || config.title, 'property');
    updateMetaTag('og:description', config.ogDescription || normalizedDescription, 'property');
    updateMetaTag('og:url', config.ogUrl || canonicalUrl, 'property');
    updateMetaTag('og:site_name', 'Free Tools', 'property');
    updateMetaTag('og:locale', 'en_US', 'property');
    updateMetaTag('og:image', ogImage, 'property');
    updateMetaTag('og:image:width', '1200', 'property');
    updateMetaTag('og:image:height', '630', 'property');
    updateMetaTag('og:image:alt', config.ogTitle || config.title, 'property');

    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', config.twitterTitle || config.ogTitle || config.title);
    updateMetaTag('twitter:description', config.twitterDescription || config.ogDescription || normalizedDescription);
    updateMetaTag('twitter:url', canonicalUrl);
    updateMetaTag('twitter:image', twitterImage);
    updateMetaTag('twitter:site', '@FreeToolzCloud');
    updateMetaTag('twitter:image:alt', config.twitterTitle || config.title);

    const removeOldSchemas = () => {
      const oldSchemas = document.querySelectorAll('script[type="application/ld+json"]');
      oldSchemas.forEach(schema => schema.remove());
    };

    const addSchema = (schemaData: unknown, schemaKey: string) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-schema', 'dynamic');
      script.setAttribute('data-schema-key', schemaKey);
      script.text = JSON.stringify(schemaData);
      document.head.appendChild(script);
    };

    removeOldSchemas();

    addSchema(generateOrganizationSchema(), 'organization');
    addSchema(generateWebSiteSchema(), 'website');
    addSchema(generateWebPageSchema(pageName, canonicalUrl, normalizedDescription), 'webpage');

    if (config.toolName && config.toolUrl && config.toolCategory) {
      const toolSchema = generateToolSchema(
        config.toolName,
        config.toolUrl,
        normalizedDescription,
        config.toolCategory
      );
      addSchema(toolSchema, 'tool');

      const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: BASE_URL },
        { name: 'Tools', url: `${BASE_URL}/sitemap` },
        { name: config.toolName, url: config.toolUrl }
      ]);
      addSchema(breadcrumbSchema, 'breadcrumb-tool');

      const toolSlug = canonicalUrl.split('/').filter(Boolean).pop() || '';
      const faqSchema = getToolFAQSchema(toolSlug) ?? generateDefaultToolFAQSchema(config.toolName, config.toolCategory);
      addSchema(faqSchema, 'faq-tool');
    } else if (canonicalUrl !== BASE_URL && canonicalUrl !== `${BASE_URL}/`) {
      const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: BASE_URL },
        { name: pageName, url: canonicalUrl }
      ]);
      addSchema(breadcrumbSchema, 'breadcrumb-page');
    }
  }, [config]);
};

// Helper function to generate SEO config for tools
export const generateToolSEO = (
  toolName: string,
  toolDescription: string,
  toolCategory: string,
  toolPath: string,
  keywords: string[]
): SEOConfig => {
  const baseUrl = BASE_URL;
  const fullUrl = `${baseUrl}${toolPath}`;
  const normalizedDescription = cleanDescription(toolDescription);
  
  return {
    title: `${toolName} - Free Online ${toolCategory} Tool | FreeToolz`,
    description: `${normalizedDescription}. Use ${toolName} online for free with privacy-first browser processing and no signup required.`,
    keywords: [...keywords, 'free online tool', 'no signup', 'browser based', 'free tools'].join(', '),
    canonical: fullUrl,
    ogTitle: `${toolName} - Free & Secure Online Tool`,
    ogDescription: `${normalizedDescription}. Works directly in your browser. 100% free and private.`,
    ogUrl: fullUrl,
    ogImage: `${baseUrl}/logo.png`,
    twitterTitle: `${toolName} | Free Tools`,
    twitterDescription: normalizedDescription,
    twitterImage: `${baseUrl}/logo.png`,
    author: 'Muhammad Atif Latif',
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    toolName,
    toolCategory,
    toolUrl: fullUrl
  };
};

// Home page SEO
export const homeSEO: SEOConfig = {
  title: 'Free Tools - 140+ Free Online Tools | No Signup Required',
  description: 'Access 140+ free online tools for text processing, PDF manipulation, image editing, calculations, conversions, SEO testing, and security analysis. No registration, no ads, completely free forever.',
  keywords: 'free online tools, word counter, password generator, pdf merger, image compressor, json formatter, qr code generator, bmi calculator, currency converter, text tools, developer tools, no signup, free forever',
  canonical: 'https://freetoolz.cloud',
  ogTitle: 'Free Tools - 140+ Free Professional Online Tools',
  ogDescription: 'Complete suite of 140+ free online utilities. Text, PDF, image, calculator, converter, and developer tools. All free, secure, and privacy-focused.',
  ogUrl: 'https://freetoolz.cloud',
  ogImage: 'https://freetoolz.cloud/og-image.jpg',
  author: 'Muhammad Atif Latif',
  robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
};

// About page SEO
export const aboutSEO: SEOConfig = {
  title: 'About Free Tools - Our Mission & Story',
  description: 'Learn about Free Tools and our mission to provide 140+ free professional-grade online tools accessible to everyone. Built by Muhammad Atif Latif, Data Scientist & ML Engineer.',
  canonical: 'https://freetoolz.cloud/about',
  keywords: 'about freetoolz, free tools mission, muhammad atif latif, online tools platform',
  author: 'Muhammad Atif Latif'
};

// Blog page SEO
export const blogSEO: SEOConfig = {
  title: 'Free Tools Blog - Tips, Guides & Tool Tutorials',
  description: 'Discover tips, guides, and tutorials on using free online tools effectively. Learn productivity hacks, best practices, and expert advice from Free Tools.',
  canonical: 'https://freetoolz.cloud/blog',
  keywords: 'online tools blog, productivity tips, tool tutorials, free software guides',
  author: 'Muhammad Atif Latif'
};

// Contact page SEO
export const contactSEO: SEOConfig = {
  title: 'Contact Us - Free Tools Support',
  description: 'Get in touch with the Free Tools team. We value your feedback, questions, and suggestions for improving our 140+ free online tools.',
  canonical: 'https://freetoolz.cloud/contact',
  keywords: 'contact freetoolz, support, feedback, tool requests',
  author: 'Muhammad Atif Latif'
};
