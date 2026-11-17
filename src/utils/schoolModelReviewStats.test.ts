import { describe, expect, it } from 'vitest';
import { calculateSchoolModelReviewStats } from './schoolModelReviewStats';

describe('calculateSchoolModelReviewStats', () => {
  it('returns an empty summary when there are no published reviews', () => {
    expect(calculateSchoolModelReviewStats([])).toEqual({
      averageRating: null,
      reviewCount: 0,
      distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    });
  });

  it('calculates the average and full rating distribution', () => {
    expect(calculateSchoolModelReviewStats([
      { rating: 5 }, { rating: 5 }, { rating: 4 }, { rating: 3 },
    ])).toEqual({
      averageRating: 4.3,
      reviewCount: 4,
      distribution: { 1: 0, 2: 0, 3: 1, 4: 1, 5: 2 },
    });
  });

  it('ignores invalid rating values rather than corrupting the aggregate', () => {
    expect(calculateSchoolModelReviewStats([
      { rating: 5 }, { rating: 0 }, { rating: 6 }, { rating: 2.5 },
    ])).toEqual({
      averageRating: 5,
      reviewCount: 1,
      distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 1 },
    });
  });
});
