import { projectReviewService } from '../services/projectReviewService';
import type { ProjectReviewSubmission, PublicProjectReview } from '../types/projectReview';
import { useAsync } from './useAsync';

export function usePublishedProjectReviews(projectId: string) {
  return useAsync<PublicProjectReview[]>(
    () => projectReviewService.getPublishedForProject(projectId),
    [projectId],
  );
}

export function useOwnProjectReview(projectId: string, userId: string | undefined) {
  return useAsync<ProjectReviewSubmission | null>(
    () => userId
      ? projectReviewService.getOwnSubmission(projectId, userId)
      : Promise.resolve(null),
    [projectId, userId],
  );
}

export function useAllProjectReviewSubmissions() {
  return useAsync<ProjectReviewSubmission[]>(
    () => projectReviewService.getAllSubmissions(),
    [],
  );
}
