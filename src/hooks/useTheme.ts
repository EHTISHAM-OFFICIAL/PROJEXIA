import { useEffect, useState, useSyncExternalStore } from "react";
import { themeService } from "../services/themeService";
import { DEFAULT_THEME, ELECTRIC_THEME, toolbarColorFor } from "../constants/themes";
import { isThemeName, THEME_NAMES, type SiteTheme, type ThemeColors, type ThemeName } from "../types/theme";
import { hexToRgb } from "../utils/color";

export type Theme = ThemeName;

const STORAGE_KEY = "mectec-theme";

/** The colours for a theme: Electric is fixed, dark and light come from site settings. */
export function colorsFor(theme: ThemeName, siteTheme: SiteTheme): ThemeColors {
  if (theme === "electric") return ELECTRIC_THEME;
  return siteTheme[theme];
}

function applyThemeColors(colors: ThemeColors) {
  const root = document.documentElement;

  root.style.setProperty("--color-bg", hexToRgb(colors.bg));
  root.style.setProperty("--color-surface", hexToRgb(colors.surface));
  root.style.setProperty("--color-surface-raised", hexToRgb(colors.surfaceRaised));

  root.style.setProperty("--color-line", hexToRgb(colors.line));
  root.style.setProperty("--color-line-strong", hexToRgb(colors.lineStrong));

  root.style.setProperty("--color-accent", hexToRgb(colors.accent));
  root.style.setProperty("--color-accent-hover", hexToRgb(colors.accentHover));
  root.style.setProperty("--color-accent-subtle", colors.accentSubtle);
  root.style.setProperty("--color-accent2", hexToRgb(colors.accent2));
  root.style.setProperty("--color-on-accent", hexToRgb(colors.onAccent));

  root.style.setProperty("--color-content", hexToRgb(colors.content));
  root.style.setProperty("--color-content-secondary", hexToRgb(colors.contentSecondary));
  root.style.setProperty("--color-content-muted", hexToRgb(colors.contentMuted));

  root.style.setProperty("--color-state-success", hexToRgb(colors.stateSuccess));
  root.style.setProperty("--color-state-warning", hexToRgb(colors.stateWarning));
  root.style.setProperty("--color-state-danger", hexToRgb(colors.stateDanger));
  root.style.setProperty("--color-state-info", hexToRgb(colors.stateInfo));
}

// ---- shared theme store ----------------------------------------------------
// The attribute on <html> is the source of truth (the inline script in
// index.html sets it before first paint). Every component that shows the theme
// reads it through this store, so the desktop and mobile toggles never disagree.

const listeners = new Set<() => void>();
let siteThemeCache: SiteTheme | null = null;
let siteThemeRequest: Promise<SiteTheme> | null = null;
let observer: MutationObserver | null = null;

function readTheme(): ThemeName {
  if (typeof document === "undefined") return "dark";
  const attribute = document.documentElement.getAttribute("data-theme");
  return isThemeName(attribute) ? attribute : "dark";
}

function notify() {
  listeners.forEach((listener) => listener());
}

function ensureObserver() {
  if (observer || typeof MutationObserver === "undefined" || typeof document === "undefined") return;
  // Also picks up changes made directly to the attribute (the admin theme preview).
  observer = new MutationObserver(notify);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
}

function syncToolbarColor(theme: ThemeName) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", toolbarColorFor(theme));
}

/** A brief flash of current when Electric is switched on. Skipped for reduced motion. */
function playPowerOn() {
  if (typeof window === "undefined" || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  const flash = document.createElement("div");
  flash.className = "electric-power-on";
  flash.setAttribute("aria-hidden", "true");
  document.body.appendChild(flash);
  window.setTimeout(() => flash.remove(), 700);
}

function writeTheme(next: ThemeName) {
  if (!isThemeName(next)) return;
  const previous = readTheme();
  const root = document.documentElement;

  if (next === "dark") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", next);

  // Apply colours right away so the old theme's inline values never linger.
  applyThemeColors(colorsFor(next, siteThemeCache ?? DEFAULT_THEME));
  syncToolbarColor(next);

  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Storage unavailable: the theme still applies for this page view.
  }

  if (next === "electric" && previous !== "electric") playPowerOn();
  notify();
}

export const themeStore = {
  getSnapshot: readTheme,
  getServerSnapshot: (): ThemeName => "dark",
  subscribe(listener: () => void) {
    listeners.add(listener);
    ensureObserver();
    return () => {
      listeners.delete(listener);
    };
  },
  set: writeTheme,
  /** dark -> light -> electric -> dark */
  next(): ThemeName {
    return THEME_NAMES[(THEME_NAMES.indexOf(readTheme()) + 1) % THEME_NAMES.length];
  },
};

/** One shared request for the site's dark/light colours, however many components ask. */
function loadSiteTheme(): Promise<SiteTheme> {
  siteThemeRequest ??= themeService
    .getTheme()
    .catch(() => DEFAULT_THEME)
    .then((loaded) => {
      siteThemeCache = loaded;
      return loaded;
    });
  return siteThemeRequest;
}

export function useTheme() {
  const theme = useSyncExternalStore(themeStore.subscribe, themeStore.getSnapshot, themeStore.getServerSnapshot);
  const [siteTheme, setSiteTheme] = useState<SiteTheme>(siteThemeCache ?? DEFAULT_THEME);

  useEffect(() => {
    let cancelled = false;
    loadSiteTheme().then((loaded) => {
      if (!cancelled) setSiteTheme(loaded);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    applyThemeColors(colorsFor(theme, siteTheme));
    syncToolbarColor(theme);
    if (theme === "dark") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", theme);
    // Not persisted here: only an explicit switch (writeTheme) saves a preference,
    // so the admin colour preview never overwrites a visitor's choice.
  }, [theme, siteTheme]);

  return {
    theme,
    setTheme: themeStore.set,
    /** Switches between dark and light (kept for existing callers). */
    toggleTheme: () => themeStore.set(readTheme() === "dark" ? "light" : "dark"),
    cycleTheme: () => themeStore.set(themeStore.next()),
    siteTheme,
    setSiteTheme,
    applyThemeColors,
  };
}
