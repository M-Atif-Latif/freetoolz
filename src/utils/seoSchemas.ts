// SEO Schema Markup Generator for FreeToolz Cloud
import { FAQEntry } from '../types';

interface SchemaOrganization {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
  contactPoint: {
    '@type': string;
    email: string;
    contactType: string;
    availableLanguage: string[];
  };
}

interface SchemaWebApplication {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  description: string;
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    '@type': string;
    price: string;
    priceCurrency: string;
  };
  aggregateRating?: {
    '@type': string;
    ratingValue: string;
    reviewCount: string;
  };
  screenshot?: string;
  softwareVersion?: string;
  datePublished?: string;
  author?: {
    '@type': string;
    name: string;
  };
}

interface SchemaFAQ {
  '@context': string;
  '@type': string;
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }>;
}

interface SchemaBreadcrumb {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

export const generateOrganizationSchema = (): SchemaOrganization => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FreeToolz Cloud',
    url: 'https://freetoolz.cloud',
    logo: 'https://freetoolz.cloud/logo.png',
    description: '120+ free online tools for text processing, PDF manipulation, image editing, calculations, conversions, SEO testing, and security analysis. No registration required.',
    sameAs: [
      'https://discord.gg/R2WnXtm9A',
      'https://whatsapp.com/channel/0029VbBw4mg11ulYLNdJuk0v',
      'https://www.linkedin.com/company/freetoolz/',
      'https://www.facebook.com/share/14PseuM8Yb9/',
      'https://x.com/MuhammadAtif67?t=A6SSAB3Ii2nZEqV2zJbQpw&s=09'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'muhammadatiflatif67@gmail.com',
      contactType: 'Customer Support',
      availableLanguage: ['English']
    }
  };
};

export const generateToolSchema = (
  toolName: string,
  toolUrl: string,
  description: string,
  category: string
): SchemaWebApplication => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: toolName,
    url: toolUrl,
    description: description,
    applicationCategory: category,
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '2580'
    },
    screenshot: `${toolUrl}/screenshot.png`,
    softwareVersion: '2.0',
    datePublished: '2024-01-01',
    author: {
      '@type': 'Person',
      name: 'Muhammad Atif Latif'
    }
  };
};

export const generateFAQSchema = (faqs: FAQEntry[]): SchemaFAQ => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

export const generateBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
): SchemaBreadcrumb => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
};

// SEO-optimized descriptions for each tool category
export const categoryDescriptions: Record<string, string> = {
  text: 'Professional text processing tools for writers, editors, and content creators. Count words, convert cases, analyze readability, and format text instantly.',
  calculator: 'Free online calculators for everyday math, finance, health, and conversions. Calculate BMI, loan payments, percentages, and more without ads or registration.',
  generator: 'Secure generators for passwords, QR codes, UUIDs, and placeholder data. All generation happens locally in your browser for maximum privacy.',
  converter: 'Universal converters for units, currencies, colors, and file formats. Convert between any format instantly with accurate, real-time results.',
  developer: 'Essential developer tools for code formatting, debugging, and testing. Format JSON, minify CSS/JS, test regex, and more professional utilities.',
  pdf: 'Complete PDF toolkit for merging, splitting, compressing, and rotating PDF files. All processing happens in your browser—no uploads, complete privacy.',
  image: 'Professional image editing tools for compression, resizing, format conversion, and optimization. Process images locally without quality loss.',
  utility: 'Essential utility tools for everyday tasks. Generate random data, flip coins, pick winners, manage time, and boost your productivity.',
  security: 'Security and SEO testing tools for web developers. Check passwords, inspect cookies, validate meta tags, test structured data, and analyze sitemaps.'
};
