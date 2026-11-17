import type { Timestamp } from 'firebase/firestore';

export type SchoolModelReviewStatus = 'pending' | 'approved' | 'rejected' | 'unpublished';
export type ReviewVerificationStatus = 'unverified' | 'verified';

export interface SchoolModelReviewSubmission {
  id: string;
  schoolModelId: string;
  userId: string;
  username: string;
  isAnonymous: boolean;
  rating: number;
  comment: string;
  images: string[];
  status: SchoolModelReviewStatus;
  verificationStatus: ReviewVerificationStatus;
  moderationNote: string | null;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  reviewedAt: Timestamp | null;
  reviewedBy: string | null;
  publishedAt: Timestamp | null;
}

export interface PublicSchoolModelReview {
  id: string;
  schoolModelId: string;
  displayName: string;
  isAnonymous: boolean;
  rating: number;
  comment: string;
  images: string[];
  verifiedCustomer: boolean;
  createdAt: Timestamp | null;
  publishedAt: Timestamp | null;
}

export interface NewSchoolModelReview {
  schoolModelId: string;
  userId: string;
  username: string;
  isAnonymous: boolean;
  rating: number;
  comment: string;
  images: string[];
}

export interface SchoolModelReviewStats {
  averageRating: number | null;
  reviewCount: number;
  distribution: { 1: number; 2: number; 3: number; 4: number; 5: number };
}
