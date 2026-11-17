import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase/firestore";

const AUTH_CONFIG_ID = "usernameSignIn";
const LEGACY_CONFIG_ID = "imageHosting";

function normalizeWorkerUrl(value: unknown): string {
  if (typeof value !== "string") return "";
  const normalized = value.trim().replace(/\\/+$/, "");
  if (!normalized) return "";
  try {
    const parsed = new URL(normalized);
    return parsed.protocol === "https:" || parsed.hostname === "localhost" ? normalized : "";
  } catch {
    return "";
  }
}

export interface UsernameAuthGatewayConfig {
  workerUrl: string;
  source: "dedicated" | "legacy" | "missing";
}

/**
 * Username authentication owns its own settings document. The legacy image
 * hosting URL is read only as a backwards-compatible migration fallback until
 * an administrator saves the dedicated username sign-in setting.
 */
export async function getUsernameAuthGatewayConfig(): Promise<UsernameAuthGatewayConfig> {
  try {
    const authSnapshot = await getDoc(doc(db, "settings", AUTH_CONFIG_ID));
    const authUrl = authSnapshot.exists()
      ? normalizeWorkerUrl(authSnapshot.data().workerUrl)
      : "";
    if (authUrl) return { workerUrl: authUrl, source: "dedicated" };

    const legacySnapshot = await getDoc(doc(db, "settings", LEGACY_CONFIG_ID));
    const legacyUrl = legacySnapshot.exists()
      ? normalizeWorkerUrl(legacySnapshot.data().workerUrl)
      : "";
    return legacyUrl
      ? { workerUrl: legacyUrl, source: "legacy" }
      : { workerUrl: "", source: "missing" };
  } catch {
    return { workerUrl: "", source: "missing" };
  }
}

export async function getUsernameAuthGatewayUrl(): Promise<string | null> {
  const config = await getUsernameAuthGatewayConfig();
  return config.workerUrl || null;
}

export async function saveUsernameAuthGatewayUrl(value: string): Promise<void> {
  const workerUrl = normalizeWorkerUrl(value);
  if (!workerUrl) {
    throw new Error("Enter a valid HTTPS Cloudflare Worker URL.");
  }
  await setDoc(doc(db, "settings", AUTH_CONFIG_ID), {
    workerUrl,
    updatedAt: serverTimestamp(),
  });
}
