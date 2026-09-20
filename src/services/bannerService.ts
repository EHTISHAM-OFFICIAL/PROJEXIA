import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
  type Timestamp,
} from "firebase/firestore";

import type { SiteBanner } from "../types/banner";

const db = getFirestore();

const BANNER_DOC_PATH = "settings/banner";

const DEFAULT_BANNER: SiteBanner = {
  enabled: false,
  message: "",
  linkLabel: null,
  linkUrl: null,
  tone: "accent",
  size: "large",
  dismissible: false,
  scrolling: true,
  scrollSpeed: 40,
  startDate: null,
  endDate: null,
  updatedAt: null,
};

async function getBanner(): Promise<SiteBanner> {
  const snapshot = await getDoc(doc(db, BANNER_DOC_PATH));

  if (!snapshot.exists()) {
    return DEFAULT_BANNER;
  }

  const data = snapshot.data();

  return {
    enabled: data.enabled ?? DEFAULT_BANNER.enabled,
    message: data.message ?? DEFAULT_BANNER.message,
    linkLabel: data.linkLabel ?? DEFAULT_BANNER.linkLabel,
    linkUrl: data.linkUrl ?? DEFAULT_BANNER.linkUrl,
    tone: data.tone ?? DEFAULT_BANNER.tone,
    size: data.size ?? DEFAULT_BANNER.size,
    dismissible: data.dismissible ?? DEFAULT_BANNER.dismissible,
    scrolling: data.scrolling ?? DEFAULT_BANNER.scrolling,

    // Existing banners without this field automatically use 40 seconds.
    scrollSpeed:
      typeof data.scrollSpeed === "number"
        ? Math.min(60, Math.max(20, data.scrollSpeed))
        : DEFAULT_BANNER.scrollSpeed,

    startDate: (data.startDate as Timestamp | null) ?? null,
    endDate: (data.endDate as Timestamp | null) ?? null,
    updatedAt: (data.updatedAt as Timestamp | null) ?? null,
  };
}

async function saveBanner(
  banner: Omit<SiteBanner, "updatedAt">,
): Promise<void> {
  await setDoc(
    doc(db, BANNER_DOC_PATH),
    {
      ...banner,
      updatedAt: serverTimestamp(),
    },
    {
      merge: true,
    },
  );
}

export const bannerService = {
  getBanner,
  saveBanner,
};
