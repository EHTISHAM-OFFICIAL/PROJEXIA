import type { SiteBanner } from "../types/banner";

export function isBannerLive(
  banner: SiteBanner,
  now: Date = new Date(),
): boolean {
  if (!banner.enabled) return false;
  if (!banner.message.trim()) return false;

  const time = now.getTime();

  if (banner.startDate && time < banner.startDate.toMillis()) {
    return false;
  }

  if (banner.endDate && time > banner.endDate.toMillis()) {
    return false;
  }

  return true;
}
