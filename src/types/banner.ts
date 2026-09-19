import type { Timestamp } from 'firebase/firestore';

export type BannerTone = 'accent' | 'success' | 'warning' | 'info' | 'danger';
export type BannerSize = 'normal' | 'large';

/** A single document at settings/banner. One banner site-wide, not a list. */
export interface SiteBanner {
  enabled: boolean;
  message: string;
  linkLabel: string | null;
  linkUrl: string | null;
  tone: BannerTone;
  size: BannerSize;
  /** Whether visitors can close it. Defaults to false — a banner an admin
   *  turned on stays visible until they turn it off, unless they explicitly
   *  opt in to letting people dismiss it. */
  dismissible: boolean;
  /** Scrolls the message as a marquee instead of static truncated text. */
  scrolling: boolean;
  /** Optional scheduling. Null means "no limit" on that side. */
  startDate: Timestamp | null;
  endDate: Timestamp | null;
  updatedAt: Timestamp | null;
}
