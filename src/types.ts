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

export type SearchIntent = 'transactional' | 'commercial' | 'informational' | 'navigational';

export interface MarketTarget {
  id: string;
  locale: string;
  hreflang: string;
  ogLocale: string;
  regionName: string;
  countryCode: string;
  currency: string;
  positioning: string;
}

export interface MarketKeywordPackage {
  marketId: string;
  marketName: string;
  searchIntent: SearchIntent;
  primaryKeywords: string[];
  secondaryKeywords: string[];
}

export interface BlogIdea {
  toolId: string;
  title: string;
  targetMarket: string;
  audienceIntent: SearchIntent;
  outline: string[];
}

export interface BacklinkTarget {
  name: string;
  url: string;
  type: 'forum' | 'edu' | 'review';
  regionFocus: string;
  pitchAngle: string;
  submissionNotes: string[];
}

export interface BlogCluster {
  id: string;
  market: string;
  theme: string;
  goal: string;
  pillarHeadline: string;
  spokes: BlogIdea[];
  backlinkTargets: BacklinkTarget[];
  successMetrics: string[];
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
