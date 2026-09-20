import type { Timestamp } from "firebase/firestore";

export type BannerTone = "accent" | "success" | "warning" | "info" | "danger";

export type BannerSize = "normal" | "large";

export interface SiteBanner {
  enabled: boolean;

  message: string;

  linkLabel: string | null;
  linkUrl: string | null;

  tone: BannerTone;
  size: BannerSize;

  dismissible: boolean;
  scrolling: boolean;

  /**
   * Duration of one complete marquee cycle, in seconds.
   * Lower value = faster scrolling.
   */
  scrollSpeed: number;

  startDate: Timestamp | null;
  endDate: Timestamp | null;

  updatedAt: Timestamp | null;
}
