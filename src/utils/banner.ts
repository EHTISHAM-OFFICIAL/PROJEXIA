import type { SiteBanner } from '../types/banner';

/**
 * Whether the banner should be showing right now — enabled, has a message,
 * and (if scheduled) falls within its date range. Shared by the public
 * component and the admin "Live now" preview badge, so the two can never
 * disagree about what counts as live.
 */
export function isBannerLive(banner: SiteBanner, now: Date = new Date()): boolean {
  if (!banner.enabled) return false;
  if (!banner.message.trim()) return false;

  const time = now.getTime();
  if (banner.startDate && time < banner.startDate.toMillis()) return false;
  if (banner.endDate && time > banner.endDate.toMillis()) return false;

  return true;
}
