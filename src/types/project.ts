import type { Timestamp } from 'firebase/firestore';

export type ProjectStatus = 'completed' | 'in-progress' | 'planned' | 'archived';
export type ProjectDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface ProjectComponent {
  name: string;
  category: string;
  quantity: number;
  notes: string;
}

export interface ProjectSpecification {
  label: string;
  value: string;
}

export interface GalleryImage {
  url: string;
  alt: string;
  caption: string | null;
  order: number;
  storagePath?: string;
}

export interface ProjectMedia {
  thumbnailUrl: string;
  heroImageUrl: string | null;
  gallery: GalleryImage[];
  videoUrl: string | null;
}

export interface ProjectExternalLinks {
  github: string | null;
  documentation: string | null;
  demo: string | null;
}

export interface ProjectSeo {
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string[];
}

export interface ProjectEstimatedCost {
  amount: number | null;
  currency: string;
}

/** A project document as stored in Firestore, plus its document id. */
export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  subcategory: string | null;
  status: ProjectStatus;
  difficulty: ProjectDifficulty;
  technologies: string[];
  tags: string[];
  objectives: string[];
  features: string[];
  problemStatement: string;
  solutionOverview: string;
  howItWorks: string;
  challenges: string[];
  results: string;
  components: ProjectComponent[];
  specifications: ProjectSpecification[];
  estimatedCost: ProjectEstimatedCost;
  media: ProjectMedia;
  externalLinks: ProjectExternalLinks;
  seo: ProjectSeo;
  featured: boolean;
  published: boolean;
  viewCount: number;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  completedAt: Timestamp | null;
}

/** Shape used by the admin editor before it is written to Firestore. */
export type ProjectDraft = Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'viewCount'>;

export interface ProjectFilters {
  search: string;
  category: string;
  technology: string;
  difficulty: string;
  status: string;
  sort: ProjectSortKey;
}

export type ProjectSortKey = 'newest' | 'oldest' | 'title-asc' | 'title-desc';
