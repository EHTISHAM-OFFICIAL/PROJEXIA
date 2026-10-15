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
