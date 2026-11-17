import type { Timestamp } from 'firebase/firestore';

export type ProjectReviewStatus = 'pending' | 'approved' | 'rejected' | 'unpublished';
export type ReviewVerificationStatus = 'unverified' | 'verified';

export interface ProjectReviewSubmission {
  id: string;
  projectId: string;
  userId: string;
  username: string;
  isAnonymous: boolean;
  rating: number;
  comment: string;
  images: string[];
  status: ProjectReviewStatus;
  verificationStatus: ReviewVerificationStatus;
  moderationNote: string | null;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  reviewedAt: Timestamp | null;
  reviewedBy: string | null;
  publishedAt: Timestamp | null;
}

export interface PublicProjectReview {
  id: string;
  projectId: string;
  displayName: string;
  isAnonymous: boolean;
  rating: number;
  comment: string;
  images: string[];
  verifiedCustomer: boolean;
  createdAt: Timestamp | null;
  publishedAt: Timestamp | null;
}

export interface NewProjectReview {
  projectId: string;
  userId: string;
  username: string;
  isAnonymous: boolean;
  rating: number;
  comment: string;
  images: string[];
}
