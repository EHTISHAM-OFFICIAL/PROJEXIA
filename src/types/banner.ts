import type { Timestamp } from 'firebase/firestore';

export type BannerTone = 'accent' | 'success' | 'warning' | 'info' | 'danger';

/** A single document at settings/banner. One banner site-wide, not a list. */
export interface SiteBanner {
  enabled: boolean;
  message: string;
  linkLabel: string | null;
  linkUrl: string | null;
  tone: BannerTone;
  /** Optional scheduling. Null means "no limit" on that side. */
  startDate: Timestamp | null;
  endDate: Timestamp | null;
  updatedAt: Timestamp | null;
}
