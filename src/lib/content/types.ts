export interface PostFrontmatter {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags?: string[];
  author?: string;
  cover?: string;
  coverAlt?: string;
  coverCredit?: string;
  coverCreditUrl?: string;
  featured?: boolean;
  draft?: boolean;
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  author: string;
  cover?: string;
  coverAlt?: string;
  coverCredit?: string;
  coverCreditUrl?: string;
  featured: boolean;
  draft: boolean;
  readingTimeMinutes: number;
  wordCount: number;
}

export interface Post extends PostMeta {
  content: string;
}
