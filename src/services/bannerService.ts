import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { COLLECTIONS, db } from '../firebase/firestore';
import type { SiteBanner } from '../types/banner';

// Singleton document — there is exactly one banner site-wide, not a
// collection of them, so it lives at a fixed path rather than an auto-id.
const bannerRef = doc(db, COLLECTIONS.settings, 'banner');

const DEFAULT_BANNER: SiteBanner = {
  enabled: false,
  message: '',
  linkLabel: null,
  linkUrl: null,
  tone: 'accent',
  startDate: null,
  endDate: null,
  updatedAt: null,
};

export const bannerService = {
  /** Returns a safe default if no banner has ever been configured. */
  async getBanner(): Promise<SiteBanner> {
    const snapshot = await getDoc(bannerRef);
    if (!snapshot.exists()) return DEFAULT_BANNER;

    const data = snapshot.data();
    return {
      enabled: data.enabled ?? false,
      message: data.message ?? '',
      linkLabel: data.linkLabel ?? null,
      linkUrl: data.linkUrl ?? null,
      tone: data.tone ?? 'accent',
      startDate: data.startDate ?? null,
      endDate: data.endDate ?? null,
      updatedAt: data.updatedAt ?? null,
    };
  },

  async saveBanner(input: Omit<SiteBanner, 'updatedAt'>): Promise<void> {
    await setDoc(bannerRef, { ...input, updatedAt: serverTimestamp() });
  },
};
