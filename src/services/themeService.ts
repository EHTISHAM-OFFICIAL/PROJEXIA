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
import { DEFAULT_THEME } from "../constants/themes";

// Re-exported so existing imports keep working.
export { DEFAULT_THEME };

const THEME_DOC_PATH = "settings/theme";

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
