import type { SiteTheme, ThemeColors, ThemeName } from "../types/theme";

export const DEFAULT_THEME: SiteTheme = {
  dark: {
    bg: "#0A0C10",
    surface: "#111419",
    surfaceRaised: "#191D24",

    line: "#2A2E36",
    lineStrong: "#414650",

    accent: "#E87E36",
    accentHover: "#F89448",
    accentSubtle: "rgba(232, 126, 54, 0.14)",
    accent2: "#F5B452",
    onAccent: "#0F0C09",

    content: "#F5F6F8",
    contentSecondary: "#B2B7C1",
    contentMuted: "#707682",

    stateSuccess: "#27C98B",
    stateWarning: "#F5AE37",
    stateDanger: "#F4535C",
    stateInfo: "#42ADE8",
  },

  light: {
    bg: "#F8F7F4",
    surface: "#FFFFFF",
    surfaceRaised: "#F4F2EE",

    line: "#E0DDD7",
    lineStrong: "#C4BFB6",

    accent: "#C65B23",
    accentHover: "#AB4819",
    accentSubtle: "rgba(198, 91, 35, 0.10)",
    accent2: "#B77A2D",
    onAccent: "#FFFFFF",

    content: "#191B1F",
    contentSecondary: "#4C5058",
    contentMuted: "#7C8088",

    stateSuccess: "#149B67",
    stateWarning: "#CD8415",
    stateDanger: "#D33641",
    stateInfo: "#1589C4",
  },

  updatedAt: null,
};

/**
 * ProjexiaHub Electric: a signature theme that is not editable from the admin
 * settings. A midnight-navy ground, electric cyan as the live current, and
 * ProjexiaHub's copper as the hot wire, so it still reads as the same brand.
 *
 * These values are mirrored in `[data-theme="electric"]` in index.css so the
 * page paints correctly before JavaScript runs; a test keeps the two in sync.
 */
export const ELECTRIC_THEME: ThemeColors = {
  bg: "#04060E",
  surface: "#0A1020",
  surfaceRaised: "#111A33",

  line: "#1C2B52",
  lineStrong: "#2E4A8C",

  accent: "#22D3FF",
  accentHover: "#7DE8FF",
  accentSubtle: "rgba(34, 211, 255, 0.14)",
  accent2: "#FF9A3C",
  onAccent: "#021018",

  content: "#EAF4FF",
  contentSecondary: "#A9BCDB",
  contentMuted: "#7C92BD",

  stateSuccess: "#2BE6A0",
  stateWarning: "#FFC43D",
  stateDanger: "#FF5470",
  stateInfo: "#5AA9FF",
};

export interface ThemeOption {
  name: ThemeName;
  label: string;
  hint: string;
  /** Colour of the browser toolbar on mobile (<meta name="theme-color">). */
  toolbar: string;
  /** Three swatches for the picker: ground, surface, accent. */
  swatch: [string, string, string];
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    name: "dark",
    label: "Dark",
    hint: "Graphite and copper",
    toolbar: DEFAULT_THEME.dark.bg,
    swatch: [DEFAULT_THEME.dark.bg, DEFAULT_THEME.dark.surfaceRaised, DEFAULT_THEME.dark.accent],
  },
  {
    name: "light",
    label: "Light",
    hint: "Warm schematic paper",
    toolbar: DEFAULT_THEME.light.bg,
    swatch: [DEFAULT_THEME.light.bg, DEFAULT_THEME.light.surfaceRaised, DEFAULT_THEME.light.accent],
  },
  {
    name: "electric",
    label: "Electric",
    hint: "Midnight and live current",
    toolbar: ELECTRIC_THEME.bg,
    swatch: [ELECTRIC_THEME.bg, ELECTRIC_THEME.surfaceRaised, ELECTRIC_THEME.accent],
  },
];

export function toolbarColorFor(theme: ThemeName): string {
  return THEME_OPTIONS.find((option) => option.name === theme)?.toolbar ?? DEFAULT_THEME.dark.bg;
}
