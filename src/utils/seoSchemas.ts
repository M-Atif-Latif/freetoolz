// SEO Schema Markup Generator for FreeToolz Cloud

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
      'https://github.com/M-Atif-Latif',
      'https://www.linkedin.com/company/freetoolz/',
      'https://www.facebook.com/NextGenIntelligence',
      'https://discord.gg/R2WnXtm9A',
      'https://whatsapp.com/channel/0029VbBw4mg11ulYLNdJuk0v'
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

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>): SchemaFAQ => {
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

// Tool-specific FAQ data
export const toolFAQs: Record<string, Array<{ question: string; answer: string }>> = {
  'word-counter': [
    {
      question: 'Is the Word Counter tool free to use?',
      answer: 'Yes, FreeToolz Cloud offers a completely free Word Counter without registration, ads, or limitations.'
    },
    {
      question: 'Does the Word Counter save my text?',
      answer: 'No, all processing happens in your browser. Your text never leaves your device, ensuring complete privacy.'
    },
    {
      question: 'What does the Word Counter measure?',
      answer: 'It counts words, characters, sentences, paragraphs, and reading time. Perfect for writers, students, and content creators.'
    }
  ],
  'password-generator': [
    {
      question: 'Is the Password Generator secure?',
      answer: 'Yes, all passwords are generated locally in your browser using cryptographically secure random number generation. Nothing is sent to any server.'
    },
    {
      question: 'Can I customize password requirements?',
      answer: 'Absolutely! You can set length, include/exclude uppercase, lowercase, numbers, and special characters to meet any password policy.'
    }
  ],
  'pdf-merger': [
    {
      question: 'Is there a file size limit for PDF merging?',
      answer: 'Processing happens in your browser, so limits depend on your device memory. Most modern devices can handle PDFs up to 50-100MB total.'
    },
    {
      question: 'Are my PDFs uploaded to a server?',
      answer: 'No, all PDF processing happens locally in your browser. Your files never leave your device, ensuring complete privacy and security.'
    }
  ],
  'image-compressor': [
    {
      question: 'What image formats are supported?',
      answer: 'The Image Compressor supports JPEG, PNG, WebP, and GIF formats. You can compress multiple images at once.'
    },
    {
      question: 'Will compression reduce image quality?',
      answer: 'You control the compression level. Our tool optimizes file size while maintaining visual quality, with adjustable quality settings from 1-100%.'
    }
  ],
  'json-formatter': [
    {
      question: 'Does the JSON Formatter validate syntax?',
      answer: 'Yes! It automatically detects and highlights JSON syntax errors, helping you quickly fix formatting issues in your data.'
    },
    {
      question: 'Can I minify JSON as well?',
      answer: 'Absolutely. You can both beautify (format with indentation) and minify (compress) JSON with a single click.'
    }
  ]
};

// Generate schema for common tools
export const getToolFAQSchema = (toolId: string): SchemaFAQ | null => {
  const faqs = toolFAQs[toolId];
  return faqs ? generateFAQSchema(faqs) : null;
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
