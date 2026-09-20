export interface ThemeColors {
  bg: string;
  surface: string;
  surfaceRaised: string;

  line: string;
  lineStrong: string;

  accent: string;
  accentHover: string;
  accentSubtle: string;
  accent2: string;
  onAccent: string;

  content: string;
  contentSecondary: string;
  contentMuted: string;

  stateSuccess: string;
  stateWarning: string;
  stateDanger: string;
  stateInfo: string;
}

export interface SiteTheme {
  dark: ThemeColors;
  light: ThemeColors;
  updatedAt: unknown | null;
}
