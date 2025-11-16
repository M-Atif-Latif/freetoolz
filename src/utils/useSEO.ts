import { useEffect } from 'react';
import { FAQEntry } from '../types';
import {
  generateToolSchema,
  generateBreadcrumbSchema,
  generateOrganizationSchema,
  generateFAQSchema
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
  faqs?: FAQEntry[];
}

export const useSEO = (config: SEOConfig) => {
  useEffect(() => {
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
    canonical.href = config.canonical || window.location.href;

    // Open Graph tags
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:title', config.ogTitle || config.title, 'property');
    updateMetaTag('og:description', config.ogDescription || config.description, 'property');
    updateMetaTag('og:url', config.ogUrl || window.location.href, 'property');
    updateMetaTag('og:site_name', 'FreeToolz Cloud', 'property');
    updateMetaTag('og:locale', 'en_US', 'property');
    
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
    updateMetaTag('twitter:url', window.location.href, 'property');
    
    if (config.twitterImage || config.ogImage) {
      updateMetaTag('twitter:image', config.twitterImage || config.ogImage || '', 'property');
    }

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
    if (config.toolName && config.toolUrl && config.toolCategory) {
      const toolSchema = generateToolSchema(
        config.toolName,
        config.toolUrl,
        config.description,
        config.toolCategory
      );
      addSchema(toolSchema);

      // Add Breadcrumb Schema
      const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://freetoolz.cloud' },
        { name: 'Tools', url: 'https://freetoolz.cloud/#tools' },
        { name: config.toolName, url: config.toolUrl }
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
  }
): SEOConfig => {
  const baseUrl = 'https://freetoolz.cloud';
  const fullUrl = `${baseUrl}${toolPath}`;
  
  return {
    title: options?.title || `${toolName} | Free Online Tool - FreeToolz Cloud`,
    description:
      options?.description || `${toolDescription} Free, secure, and no registration required. ${toolName} tool by FreeToolz Cloud.`,
    keywords: [...keywords, 'free online tool', 'no signup', 'browser based', 'freetoolz cloud'].join(', '),
    canonical: fullUrl,
    ogTitle: options?.title || `${toolName} - Free & Secure Online Tool`,
    ogDescription: options?.description || `${toolDescription} Works directly in your browser. 100% free, no ads, no registration.`,
    ogUrl: fullUrl,
    ogImage: options?.ogImage || `${baseUrl}/og-image-tool.jpg`,
    twitterTitle: options?.title || `${toolName} | FreeToolz Cloud`,
    twitterDescription: options?.description || toolDescription,
    twitterImage: options?.twitterImage || options?.ogImage || `${baseUrl}/twitter-card-tool.jpg`,
    author: 'Muhammad Atif Latif',
    robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    toolName,
    toolCategory,
    toolUrl: fullUrl,
    faqs: options?.faqs
  };
};

// Home page SEO
export const homeSEO: SEOConfig = {
  title: 'FreeToolz Cloud - 120+ Free Online Tools | No Signup Required',
  description: 'Access 120+ free online tools for text processing, PDF manipulation, image editing, calculations, conversions, SEO testing, and security analysis. No registration, no ads, completely free forever.',
  keywords: 'free online tools, word counter, password generator, pdf merger, image compressor, json formatter, qr code generator, bmi calculator, currency converter, text tools, developer tools, no signup, free forever',
  canonical: 'https://freetoolz.cloud',
  ogTitle: 'FreeToolz Cloud - 120+ Free Professional Online Tools',
  ogDescription: 'Complete suite of 120+ free online utilities. Text, PDF, image, calculator, converter, and developer tools. All free, secure, and privacy-focused.',
  ogUrl: 'https://freetoolz.cloud',
  ogImage: 'https://freetoolz.cloud/og-image.jpg',
  author: 'Muhammad Atif Latif',
  robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
};

// About page SEO
export const aboutSEO: SEOConfig = {
  title: 'About FreeToolz Cloud - Our Mission & Story',
  description: 'Learn about FreeToolz Cloud and our mission to provide 120+ free professional-grade online tools accessible to everyone. Built by Muhammad Atif Latif, Data Scientist & ML Engineer.',
  canonical: 'https://freetoolz.cloud/about',
  keywords: 'about freetoolz, free tools mission, muhammad atif latif, online tools platform',
  author: 'Muhammad Atif Latif'
};

// Blog page SEO
export const blogSEO: SEOConfig = {
  title: 'FreeToolz Cloud Blog - Tips, Guides & Tool Tutorials',
  description: 'Discover tips, guides, and tutorials on using free online tools effectively. Learn productivity hacks, best practices, and expert advice from FreeToolz Cloud.',
  canonical: 'https://freetoolz.cloud/blog',
  keywords: 'online tools blog, productivity tips, tool tutorials, free software guides',
  author: 'Muhammad Atif Latif'
};

// Contact page SEO
export const contactSEO: SEOConfig = {
  title: 'Contact Us - FreeToolz Cloud Support',
  description: 'Get in touch with the FreeToolz Cloud team. We value your feedback, questions, and suggestions for improving our 120+ free online tools.',
  canonical: 'https://freetoolz.cloud/contact',
  keywords: 'contact freetoolz, support, feedback, tool requests',
  author: 'Muhammad Atif Latif'
};
