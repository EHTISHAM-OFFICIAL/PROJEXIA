import type { Timestamp } from 'firebase/firestore';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImageUrl: string | null;
  published: boolean;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

export type BlogPostDraft = Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>;
