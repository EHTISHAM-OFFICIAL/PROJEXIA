import type { SchoolModelReviewStats } from '../types/project';

export function calculateSchoolModelReviewStats(
  reviews: Array<{ rating: number }>,
): SchoolModelReviewStats {
  const distribution: SchoolModelReviewStats['distribution'] = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0,
  };
  let total = 0;
  let reviewCount = 0;

  for (const review of reviews) {
    if (!Number.isInteger(review.rating) || review.rating < 1 || review.rating > 5) continue;
    distribution[review.rating as 1 | 2 | 3 | 4 | 5] += 1;
    total += review.rating;
    reviewCount += 1;
  }

  return {
    averageRating: reviewCount ? Math.round((total / reviewCount) * 10) / 10 : null,
    reviewCount,
    distribution,
  };
}
