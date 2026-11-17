import { schoolModelReviewService } from '../services/schoolModelReviewService';
import type { SchoolModelReviewSubmission, PublicSchoolModelReview } from '../types/schoolModelReview';
import { useAsync } from './useAsync';

export function usePublishedSchoolModelReviews(schoolModelId: string) {
  return useAsync<PublicSchoolModelReview[]>(() => schoolModelReviewService.getPublishedForSchoolModel(schoolModelId), [schoolModelId]);
}

export function useOwnSchoolModelReview(schoolModelId: string, userId: string | undefined) {
  return useAsync<SchoolModelReviewSubmission | null>(() => userId ? schoolModelReviewService.getOwnSubmission(schoolModelId, userId) : Promise.resolve(null), [schoolModelId, userId]);
}

export function useAllSchoolModelReviewSubmissions() {
  return useAsync<SchoolModelReviewSubmission[]>(() => schoolModelReviewService.getAllSubmissions(), []);
}
