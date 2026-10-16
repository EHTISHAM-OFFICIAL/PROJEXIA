import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_SITE_SETTINGS,
  saveSiteSettings,
  subscribeToSiteSettings,
  type SiteSettings,
} from "../services/siteSettingsService";

interface SiteSettingsContextValue {
  settings: SiteSettings;
  loading: boolean;
  saveSettings: (settings: SiteSettings) => Promise<void>;
}

const SiteSettingsContext = createContext<SiteSettingsContextValue | null>(null);

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return subscribeToSiteSettings(
      (nextSettings) => {
        setSettings(nextSettings);
        setLoading(false);
      },
      () => {
        setSettings(DEFAULT_SITE_SETTINGS);
        setLoading(false);
      },
    );
  }, []);

  useEffect(() => {
    const iconHref = settings.showFavicon
      ? settings.faviconUrl
      : "/favicon.ico";
    const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    const nextIcon = icon ?? document.createElement("link");
    nextIcon.rel = "icon";
    const iconPath = iconHref.split("?")[0].toLowerCase();
    const iconType = iconPath.endsWith(".svg")
      ? "image/svg+xml"
      : iconPath.endsWith(".ico")
        ? "image/x-icon"
        : iconPath.endsWith(".webp")
          ? "image/webp"
          : iconPath.endsWith(".jpg") || iconPath.endsWith(".jpeg")
            ? "image/jpeg"
            : iconPath.endsWith(".png")
              ? "image/png"
              : "";
    if (iconType) nextIcon.type = iconType;
    else nextIcon.removeAttribute("type");
    nextIcon.href = iconHref;
    if (!icon) document.head.appendChild(nextIcon);

  }, [settings.faviconUrl, settings.showFavicon]);

  const saveSettings = useCallback(async (nextSettings: SiteSettings) => {
    await saveSiteSettings(nextSettings);
    setSettings(nextSettings);
  }, []);

  const value = useMemo(
    () => ({ settings, loading, saveSettings }),
    [settings, loading, saveSettings],
  );

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const value = useContext(SiteSettingsContext);
  if (!value) {
    throw new Error("useSiteSettings must be used within SiteSettingsProvider.");
  }
  return value;
}
