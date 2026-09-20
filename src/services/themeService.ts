import { initializeApp } from "firebase/app";
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
});

const db = getFirestore(firebaseApp);
import type { SiteTheme } from "../types/theme";

const THEME_DOC_PATH = "settings/theme";

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

function normalizeColors(
  value: unknown,
  fallback: SiteTheme["dark"],
): SiteTheme["dark"] {
  if (!value || typeof value !== "object") {
    return fallback;
  }

  const source = value as Record<string, unknown>;

  return {
    bg: typeof source.bg === "string" ? source.bg : fallback.bg,
    surface:
      typeof source.surface === "string" ? source.surface : fallback.surface,
    surfaceRaised:
      typeof source.surfaceRaised === "string"
        ? source.surfaceRaised
        : fallback.surfaceRaised,

    line: typeof source.line === "string" ? source.line : fallback.line,
    lineStrong:
      typeof source.lineStrong === "string"
        ? source.lineStrong
        : fallback.lineStrong,

    accent: typeof source.accent === "string" ? source.accent : fallback.accent,
    accentHover:
      typeof source.accentHover === "string"
        ? source.accentHover
        : fallback.accentHover,
    accentSubtle:
      typeof source.accentSubtle === "string"
        ? source.accentSubtle
        : fallback.accentSubtle,
    accent2:
      typeof source.accent2 === "string" ? source.accent2 : fallback.accent2,
    onAccent:
      typeof source.onAccent === "string" ? source.onAccent : fallback.onAccent,

    content:
      typeof source.content === "string" ? source.content : fallback.content,
    contentSecondary:
      typeof source.contentSecondary === "string"
        ? source.contentSecondary
        : fallback.contentSecondary,
    contentMuted:
      typeof source.contentMuted === "string"
        ? source.contentMuted
        : fallback.contentMuted,

    stateSuccess:
      typeof source.stateSuccess === "string"
        ? source.stateSuccess
        : fallback.stateSuccess,
    stateWarning:
      typeof source.stateWarning === "string"
        ? source.stateWarning
        : fallback.stateWarning,
    stateDanger:
      typeof source.stateDanger === "string"
        ? source.stateDanger
        : fallback.stateDanger,
    stateInfo:
      typeof source.stateInfo === "string"
        ? source.stateInfo
        : fallback.stateInfo,
  };
}

async function getTheme(): Promise<SiteTheme> {
  const snapshot = await getDoc(doc(db, THEME_DOC_PATH));

  if (!snapshot.exists()) {
    return DEFAULT_THEME;
  }

  const data = snapshot.data();

  return {
    dark: normalizeColors(data.dark, DEFAULT_THEME.dark),
    light: normalizeColors(data.light, DEFAULT_THEME.light),
    updatedAt: data.updatedAt ?? null,
  };
}

async function saveTheme(theme: Omit<SiteTheme, "updatedAt">): Promise<void> {
  await setDoc(
    doc(db, THEME_DOC_PATH),
    {
      dark: theme.dark,
      light: theme.light,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export const themeService = {
  getTheme,
  saveTheme,
};
