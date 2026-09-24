import type { Timestamp } from 'firebase/firestore';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImageUrl: string | null;
  coverImageAlt?: string | null;
  seoTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string[];
  category?: string | null;
  featured?: boolean;
  published: boolean;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

export type BlogPostDraft = Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>;
