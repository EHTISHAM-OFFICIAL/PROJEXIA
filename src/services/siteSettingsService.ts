import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase/firestore";

export interface SiteSettings {
  name: string;
  description: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  showEmail: boolean;
  showPhone: boolean;
  showWhatsapp: boolean;
  showAddress: boolean;
  siteLogoUrl: string;
  faviconUrl: string;
  showSiteLogo: boolean;
  showFavicon: boolean;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  name: "ProjexiaHub",
  description:
    "ProjexiaHub designs and builds custom electronics in Pakistan, including embedded systems, IoT devices, automation, robotics, and working prototypes.",
  email: "ehtishamofficial28@gmail.com",
  phone: "03015168091",
  whatsapp: "03015168091",
  address: "Pakistan",
  showEmail: true,
  showPhone: true,
  showWhatsapp: true,
  showAddress: true,
  siteLogoUrl: "/icons/logo-mark.svg?v=2",
  faviconUrl: "/favicon.svg?v=2",
  showSiteLogo: true,
  showFavicon: true,
};

const SITE_SETTINGS_DOC = doc(db, "settings", "siteProfile");

export function normalizeSiteSettings(value: unknown): SiteSettings {
  const source =
    value && typeof value === "object"
      ? (value as Record<string, unknown>)
      : {};

  const savedName = typeof source.name === "string" ? source.name.trim() : "";
  const name =
    !savedName || /^(mectec|mectec electronics)$/i.test(savedName)
      ? DEFAULT_SITE_SETTINGS.name
      : savedName;
  const savedDescription =
    typeof source.description === "string" ? source.description.trim() : "";
  const description = savedDescription
    ? savedDescription.replace(/mectec/gi, name)
    : DEFAULT_SITE_SETTINGS.description;

  return {
    name,
    description,
    email: typeof source.email === "string" ? source.email : DEFAULT_SITE_SETTINGS.email,
    phone: typeof source.phone === "string" ? source.phone : DEFAULT_SITE_SETTINGS.phone,
    whatsapp: typeof source.whatsapp === "string" ? source.whatsapp : DEFAULT_SITE_SETTINGS.whatsapp,
    address: typeof source.address === "string" ? source.address : DEFAULT_SITE_SETTINGS.address,
    showEmail: typeof source.showEmail === "boolean" ? source.showEmail : DEFAULT_SITE_SETTINGS.showEmail,
    showPhone: typeof source.showPhone === "boolean" ? source.showPhone : DEFAULT_SITE_SETTINGS.showPhone,
    showWhatsapp: typeof source.showWhatsapp === "boolean" ? source.showWhatsapp : DEFAULT_SITE_SETTINGS.showWhatsapp,
    showAddress: typeof source.showAddress === "boolean" ? source.showAddress : DEFAULT_SITE_SETTINGS.showAddress,
    siteLogoUrl: typeof source.siteLogoUrl === "string" && source.siteLogoUrl.trim() ? source.siteLogoUrl.trim() : DEFAULT_SITE_SETTINGS.siteLogoUrl,
    faviconUrl: typeof source.faviconUrl === "string" && source.faviconUrl.trim() ? source.faviconUrl.trim() : DEFAULT_SITE_SETTINGS.faviconUrl,
    showSiteLogo: typeof source.showSiteLogo === "boolean" ? source.showSiteLogo : DEFAULT_SITE_SETTINGS.showSiteLogo,
    showFavicon: typeof source.showFavicon === "boolean" ? source.showFavicon : DEFAULT_SITE_SETTINGS.showFavicon,
  };
}

export function subscribeToSiteSettings(
  onChange: (settings: SiteSettings) => void,
  onError?: (error: Error) => void,
) {
  return onSnapshot(
    SITE_SETTINGS_DOC,
    (snapshot) => {
      onChange(snapshot.exists() ? normalizeSiteSettings(snapshot.data()) : DEFAULT_SITE_SETTINGS);
    },
    (error) => onError?.(error),
  );
}

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  await setDoc(
    SITE_SETTINGS_DOC,
    { ...settings, updatedAt: serverTimestamp() },
    { merge: true },
  );
}
