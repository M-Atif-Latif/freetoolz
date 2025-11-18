import { useEffect } from 'react';
import { FAQEntry, MarketTarget } from '../types';
import { marketTargets as defaultMarketTargets } from '../data/seo/marketTargets';
import {
  generateToolSchema,
  generateBreadcrumbSchema,
  generateOrganizationSchema,
  generateFAQSchema
} from './seoSchemas';
import { applyMarketTargetMeta } from './marketSEO';

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
  faqs?: FAQEntry[];
  marketTargets?: MarketTarget[];
}

export const useSEO = (config: SEOConfig) => {
  useEffect(() => {
    const targets = config.marketTargets?.length ? config.marketTargets : defaultMarketTargets;
    const canonicalHref = config.canonical || window.location.href;

    // Update title
    document.title = config.title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', config.description);
    if (config.keywords) {
      updateMetaTag('keywords', config.keywords);
    }
    if (config.author) {
      updateMetaTag('author', config.author);
    }
    updateMetaTag('robots', config.robots || 'index, follow, max-snippet:-1, max-image-preview:large');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalHref;

    // Open Graph tags
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:title', config.ogTitle || config.title, 'property');
    updateMetaTag('og:description', config.ogDescription || config.description, 'property');
    updateMetaTag('og:url', config.ogUrl || canonicalHref, 'property');
    updateMetaTag('og:site_name', 'FreeToolz', 'property');
    updateMetaTag('og:locale', targets[0]?.ogLocale || 'en_US', 'property');
    
    if (config.ogImage) {
      updateMetaTag('og:image', config.ogImage, 'property');
      updateMetaTag('og:image:width', '1200', 'property');
      updateMetaTag('og:image:height', '630', 'property');
      updateMetaTag('og:image:alt', config.ogTitle || config.title, 'property');
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', 'property');
    updateMetaTag('twitter:title', config.twitterTitle || config.ogTitle || config.title, 'property');
    updateMetaTag('twitter:description', config.twitterDescription || config.ogDescription || config.description, 'property');
    updateMetaTag('twitter:url', canonicalHref, 'property');
    
    if (config.twitterImage || config.ogImage) {
      updateMetaTag('twitter:image', config.twitterImage || config.ogImage || '', 'property');
    }

    applyMarketTargetMeta(targets, canonicalHref);

    // Structured Data (JSON-LD)
    const removeOldSchemas = () => {
      const oldSchemas = document.querySelectorAll('script[type="application/ld+json"]');
      oldSchemas.forEach(schema => schema.remove());
    };

    const addSchema = (schemaData: any) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schemaData);
      document.head.appendChild(script);
    };

    removeOldSchemas();

    // Add Organization Schema (global)
    addSchema(generateOrganizationSchema());

    // Add Tool-specific Schema
    if (config.toolName && config.toolCategory) {
      const resolvedToolUrl = config.toolUrl || canonicalHref;
      const toolSchema = generateToolSchema(
        config.toolName,
        resolvedToolUrl,
        config.description,
        config.toolCategory,
        targets
      );
      addSchema(toolSchema);

      // Add Breadcrumb Schema
      const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://freetoolz.com' },
        { name: 'Tools', url: 'https://freetoolz.com/#tools' },
        { name: config.toolName, url: resolvedToolUrl }
      ]);
      addSchema(breadcrumbSchema);

      // Add FAQ Schema if available
      if (config.faqs?.length) {
        addSchema(generateFAQSchema(config.faqs));
      }
    } else if (config.faqs?.length) {
      addSchema(generateFAQSchema(config.faqs));
    }

    // Cleanup function
    return () => {
      // Optional: Remove dynamic schemas on unmount
      // This prevents accumulation if navigating between tools
    };
  }, [config]);
};

// Helper function to generate SEO config for tools
export const generateToolSEO = (
  toolName: string,
  toolDescription: string,
  toolCategory: string,
  toolPath: string,
  keywords: string[],
  options?: {
    title?: string;
    description?: string;
    ogImage?: string;
    twitterImage?: string;
    faqs?: FAQEntry[];
    marketTargets?: MarketTarget[];
  }
): SEOConfig => {
  const targets = options?.marketTargets?.length ? options.marketTargets : defaultMarketTargets;
  const baseUrl = 'https://freetoolz.com';
  const fullUrl = `${baseUrl}${toolPath}`;
  const keywordSet = new Set<string>([...keywords, 'free online tool', 'no signup', 'browser based', 'freetoolz']);
  targets.forEach(target => {
    keywordSet.add(`${toolName} ${target.regionName}`);
    keywordSet.add(`${toolName} ${target.currency}`);
  });
  
  return {
    title: options?.title || `${toolName} | Free Online Tool - FreeToolz`,
    description:
      options?.description || `${toolDescription} Free, secure, and no registration required. ${toolName} by FreeToolz for the US & India.`,
    keywords: Array.from(keywordSet).join(', '),
    canonical: fullUrl,
    ogTitle: options?.title || `${toolName} - Free & Secure Online Tool`,
    ogDescription: options?.description || `${toolDescription} Works directly in your browser. 100% free, no ads, no registration.`,
    ogUrl: fullUrl,
    ogImage: options?.ogImage || `${baseUrl}/og-images/${toolName.toLowerCase().replace(/\s+/g, '-')}.jpg`,
    twitterTitle: options?.title || `${toolName} | FreeToolz`,
    twitterDescription: options?.description || toolDescription,
    twitterImage: options?.twitterImage || options?.ogImage || `${baseUrl}/og-images/${toolName.toLowerCase().replace(/\s+/g, '-')}.jpg`,
    author: 'Muhammad Atif Latif',
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    toolName,
    toolCategory,
    toolUrl: fullUrl,
    faqs: options?.faqs,
    marketTargets: targets
  };
};

// Home page SEO
export const homeSEO: SEOConfig = {
  title: 'Free Online Tools - 120+ Best Free Tools for PDF, Text & Images',
  description: 'Best free online tools for PDF conversion, word counting, image compression, password generation & more. 120+ utilities with no download or signup required.',
  keywords: 'free online tools, pdf converter, word counter, image compressor, password generator, qr code generator, json formatter, free tools, online converter, free pdf tools, text tools, image tools, calculator online, free utilities, no signup tools',
  canonical: 'https://freetoolz.com',
  ogTitle: 'Free Online Tools - 120+ Best Free Tools',
  ogDescription: '120+ best free online tools - PDF converter, word counter, image compressor, password generator, QR code maker & more. No download or signup required.',
  ogUrl: 'https://freetoolz.com',
  ogImage: 'https://freetoolz.com/og-image.jpg',
  author: 'Muhammad Atif Latif',
  robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  marketTargets: defaultMarketTargets,
  twitterTitle: 'Free Online Tools - 120+ Best Free Tools',
  twitterDescription: 'Best free online PDF, text & image tools. Word counter, image compressor, password generator & 120+ utilities. No signup needed.',
};

// About page SEO
export const aboutSEO: SEOConfig = {
  title: 'About FreeToolz - Our Mission & Story',
  description: 'Learn how FreeToolz builds privacy-first browser utilities for US revenue teams and India growth teams. Built by Muhammad Atif Latif.',
  canonical: 'https://freetoolz.com/about',
  keywords: 'about freetoolz, free tools mission, muhammad atif latif, online tools platform, usa india tools',
  author: 'Muhammad Atif Latif',
  marketTargets: defaultMarketTargets
};

// Blog page SEO
export const blogSEO: SEOConfig = {
  title: 'FreeToolz Blog - Tips, Guides & Tool Tutorials',
  description: 'Guides that show US and Indian teams how to automate work with free PDF, image, and developer utilities from FreeToolz.',
  canonical: 'https://freetoolz.com/blog',
  keywords: 'online tools blog, productivity tips, tool tutorials, free software guides, usa seo tips, india automation tips',
  author: 'Muhammad Atif Latif',
  marketTargets: defaultMarketTargets
};

// Contact page SEO
export const contactSEO: SEOConfig = {
  title: 'Contact Us - FreeToolz Support',
  description: 'Reach the FreeToolz team for support, partnerships, or feedback from anywhere in the US or India.',
  canonical: 'https://freetoolz.com/contact',
  keywords: 'contact freetoolz, support, feedback, tool requests, usa support, india support',
  author: 'Muhammad Atif Latif',
  marketTargets: defaultMarketTargets
};
