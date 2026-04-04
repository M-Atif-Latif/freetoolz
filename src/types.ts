export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  path: string;
  indexable?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}
