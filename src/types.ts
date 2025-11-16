export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  path: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface FAQEntry {
  question: string;
  answer: string;
}

export interface ToolSEOEntry {
  id: string;
  title: string;
  metaDescription: string;
  heroDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  longTailKeywords: string[];
  cta: string;
  benefits: string[];
  faqs: FAQEntry[];
}
