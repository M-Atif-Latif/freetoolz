export interface Tool {
  id: string;
  slug?: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  path: string;
  metaTitle?: string;
  metaDescription?: string;
  keyword?: string;
  indexable?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}
