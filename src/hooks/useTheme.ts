import { useEffect, useState } from "react";
import { themeService, DEFAULT_THEME } from "../services/themeService";
import type { SiteTheme, ThemeColors } from "../types/theme";

export type Theme = "dark" | "light";

const STORAGE_KEY = "mectec-theme";

function getInitialTheme(): Theme {
  if (typeof document === "undefined") {
    return "dark";
  }

  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

function hexToRgb(hex: string): string {
  const normalized = hex.replace("#", "").trim();

  if (normalized.length !== 6) {
    return "0 0 0";
  }

  const red = parseInt(normalized.slice(0, 2), 16);
  const green = parseInt(normalized.slice(2, 4), 16);
  const blue = parseInt(normalized.slice(4, 6), 16);

  if ([red, green, blue].some((value) => Number.isNaN(value))) {
    return "0 0 0";
  }

  return `${red} ${green} ${blue}`;
}

function applyThemeColors(colors: ThemeColors) {
  const root = document.documentElement;

  root.style.setProperty("--color-bg", hexToRgb(colors.bg));
  root.style.setProperty("--color-surface", hexToRgb(colors.surface));
  root.style.setProperty(
    "--color-surface-raised",
    hexToRgb(colors.surfaceRaised),
  );

  root.style.setProperty("--color-line", hexToRgb(colors.line));
  root.style.setProperty("--color-line-strong", hexToRgb(colors.lineStrong));

  root.style.setProperty("--color-accent", hexToRgb(colors.accent));
  root.style.setProperty("--color-accent-hover", hexToRgb(colors.accentHover));

  root.style.setProperty("--color-accent-subtle", colors.accentSubtle);

  root.style.setProperty("--color-accent2", hexToRgb(colors.accent2));
  root.style.setProperty("--color-on-accent", hexToRgb(colors.onAccent));

  root.style.setProperty("--color-content", hexToRgb(colors.content));
  root.style.setProperty(
    "--color-content-secondary",
    hexToRgb(colors.contentSecondary),
  );
  root.style.setProperty(
    "--color-content-muted",
    hexToRgb(colors.contentMuted),
  );

  root.style.setProperty(
    "--color-state-success",
    hexToRgb(colors.stateSuccess),
  );
  root.style.setProperty(
    "--color-state-warning",
    hexToRgb(colors.stateWarning),
  );
  root.style.setProperty("--color-state-danger", hexToRgb(colors.stateDanger));
  root.style.setProperty("--color-state-info", hexToRgb(colors.stateInfo));
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [siteTheme, setSiteTheme] = useState<SiteTheme>(DEFAULT_THEME);

  useEffect(() => {
    let cancelled = false;

    themeService
      .getTheme()
      .then((loadedTheme) => {
        if (cancelled) {
          return;
        }

        setSiteTheme(loadedTheme);
      })
      .catch(() => {
        if (!cancelled) {
          setSiteTheme(DEFAULT_THEME);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const colors = siteTheme[theme];

    applyThemeColors(colors);

    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage unavailable — theme still applies for this page view.
    }
  }, [theme, siteTheme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    siteTheme,
    setSiteTheme,
    applyThemeColors,
  };
}
