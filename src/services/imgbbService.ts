import { deleteDoc, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth } from "../firebase/auth";
import { db } from "../firebase/firestore";

export type ImageProvider = "imgbb" | "freeimage";
export type UploadPurpose = "admin" | "request";

export interface UploadedImage {
  url: string;
  /** ImgBB's provider delete link, retained only for the existing request-attachment workflow. */
  deleteUrl: string;
  primaryProvider: ImageProvider;
  primaryId?: string;
  primaryIdEncoded?: string;
  backupUrl?: string;
  backupProvider?: ImageProvider;
  backupId?: string;
  backupIdEncoded?: string;
  missingProvider?: ImageProvider | null;
  partialSuccess?: boolean;
  fallbackSaved?: boolean;
}

interface HostingConfig {
  workerUrl: string;
  preferredProvider: ImageProvider;
  maxFileSizeMb: number;
}

interface WorkerUploadResponse {
  ok?: boolean;
  error?: string;
  primary?: { provider: ImageProvider; url: string; id?: string | null; idEncoded?: string | null; deleteUrl?: string | null };
  backup?: { provider: ImageProvider; url: string; id?: string | null; idEncoded?: string | null } | null;
  providers?: Record<string, { ok?: boolean; error?: string; url?: string }>;
  partialSuccess?: boolean;
  missingProvider?: ImageProvider | null;
  uploaded?: { provider: ImageProvider; url: string; id?: string | null; idEncoded?: string | null; deleteUrl?: string | null };
}

const configRef = doc(db, "settings", "imageHosting");
const legacyImgBbRef = doc(db, "settings", "imgbb");
const assetCollection = "imageHostingAssets";

function normalizeMaxFileSizeMb(value: unknown): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= 10 ? parsed : 10;
}

function normalizeWorkerUrl(value: string): string {
  return value.trim().replace(/\/+$/, "");
}

async function readConfig(): Promise<HostingConfig> {
  const snapshot = await getDoc(configRef);
  const data = snapshot.exists() ? snapshot.data() : {};
  const workerUrl = typeof data.workerUrl === "string" ? normalizeWorkerUrl(data.workerUrl) : "";
  if (!workerUrl) {
    throw new Error("Image uploads are not configured yet. Open Admin → Settings → Image hosting and save your Cloudflare Worker URL.");
  }
  let parsed: URL;
  try {
    parsed = new URL(workerUrl);
  } catch {
    throw new Error("The Cloudflare Worker URL is invalid. Check Admin → Settings → Image hosting.");
  }
  if (parsed.protocol !== "https:" && parsed.hostname !== "localhost") {
    throw new Error("The Cloudflare Worker URL must use HTTPS.");
  }
  return {
    workerUrl,
    preferredProvider: data.preferredProvider === "freeimage" ? "freeimage" : "imgbb",
    maxFileSizeMb: normalizeMaxFileSizeMb(data.maxFileSizeMb),
  };
}

async function currentToken(): Promise<string> {
  const user = auth.currentUser;
  if (!user) throw new Error("Sign in before uploading an image.");
  return user.getIdToken();
}

async function imageHash(url: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(url));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function saveFallback(primaryUrl: string, backupUrl: string, primaryProvider: ImageProvider, backupProvider: ImageProvider, identifiers: { primaryId?: string; primaryIdEncoded?: string; backupId?: string; backupIdEncoded?: string } = {}): Promise<boolean> {
  try {
    const id = await imageHash(primaryUrl);
    await setDoc(doc(db, assetCollection, id), {
      primaryUrl,
      backupUrl,
      primaryProvider,
      backupProvider,
      primaryId: identifiers.primaryId ?? null,
      primaryIdEncoded: identifiers.primaryIdEncoded ?? null,
      backupId: identifiers.backupId ?? null,
      backupIdEncoded: identifiers.backupIdEncoded ?? null,
      updatedAt: serverTimestamp(),
    });
    return true;
  } catch {
    // The image upload itself has succeeded; don't pretend the provider upload failed.
    return false;
  }
}

async function postUpload(
  file: File,
  purpose: UploadPurpose,
  config: HostingConfig,
  options: { onlyProvider?: ImageProvider } = {},
): Promise<WorkerUploadResponse> {
  const token = await currentToken();
  const maxBytes = config.maxFileSizeMb * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error("This image is " + (file.size / (1024 * 1024)).toFixed(2) + " MB. The current upload limit is " + config.maxFileSizeMb + " MB per file. You can change it in Admin → Settings → Image hosting.");
  }
  const form = new FormData();
  form.append("file", file, file.name || "image-upload");
  form.append("purpose", purpose);
  form.append("preferredProvider", config.preferredProvider);
  if (options.onlyProvider) form.append("onlyProvider", options.onlyProvider);

  let response: Response;
  try {
    response = await fetch(`${config.workerUrl}/upload`, {
      method: "POST",
      headers: { authorization: `Bearer ${token}` },
      body: form,
    });
  } catch {
    throw new Error("Could not reach the Cloudflare image gateway. Check its URL and allowed website origins in Cloudflare.");
  }
  const payload = await response.json().catch(() => ({})) as WorkerUploadResponse;
  if (!response.ok || payload.ok !== true) {
    throw new Error(payload.error || "The image gateway could not upload this image.");
  }
  return payload;
}

function toUploadedImage(payload: WorkerUploadResponse): UploadedImage {
  if (!payload.primary?.url || !payload.primary.provider) {
    throw new Error("The image gateway returned an incomplete upload result.");
  }
  return {
    url: payload.primary.url,
    deleteUrl: payload.primary.deleteUrl || "",
    primaryProvider: payload.primary.provider,
    primaryId: payload.primary.id ?? undefined,
    primaryIdEncoded: payload.primary.idEncoded ?? undefined,
    backupUrl: payload.backup?.url,
    backupProvider: payload.backup?.provider,
    backupId: payload.backup?.id ?? undefined,
    backupIdEncoded: payload.backup?.idEncoded ?? undefined,
    missingProvider: payload.missingProvider ?? null,
    partialSuccess: payload.partialSuccess === true,
  };
}

export const imgbbService = {
  /** Admin uploads go to both hosts. The request form uses uploadMany() to preserve its existing ImgBB-only behavior. */
  async upload(file: File): Promise<UploadedImage> {
    const config = await readConfig();
    const payload = await postUpload(file, "admin", config);
    const uploaded = toUploadedImage(payload);
    if (uploaded.backupUrl && uploaded.backupProvider) {
      uploaded.fallbackSaved = await saveFallback(uploaded.url, uploaded.backupUrl, uploaded.primaryProvider, uploaded.backupProvider, { primaryId: uploaded.primaryId, primaryIdEncoded: uploaded.primaryIdEncoded, backupId: uploaded.backupId, backupIdEncoded: uploaded.backupIdEncoded });
    }
    return uploaded;
  },

  async uploadMany(files: File[]): Promise<UploadedImage[]> {
    const config = await readConfig();
    return Promise.all(files.map(async (file) => {
      const payload = await postUpload(file, "request", config);
      return toUploadedImage(payload);
    }));
  },

  /** Retry only the provider that failed, without re-uploading to the host that already succeeded. */
  async retryMissingProvider(
    file: File,
    missingProvider: ImageProvider,
    primaryUrl: string,
    primaryProvider: ImageProvider,
    primaryIdentifiers: { id?: string; idEncoded?: string } = {},
  ): Promise<UploadedImage> {
    const config = await readConfig();
    const payload = await postUpload(file, "admin", config, { onlyProvider: missingProvider });
    const uploaded = payload.uploaded;
    if (!uploaded?.url || uploaded.provider !== missingProvider) {
      throw new Error("The backup host did not return a valid image URL.");
    }
    const fallbackSaved = await saveFallback(primaryUrl, uploaded.url, primaryProvider, missingProvider, { primaryId: primaryIdentifiers.id, primaryIdEncoded: primaryIdentifiers.idEncoded, backupId: uploaded.id ?? undefined, backupIdEncoded: uploaded.idEncoded ?? undefined });
    return {
      url: primaryUrl,
      deleteUrl: "",
      primaryProvider,
      backupUrl: uploaded.url,
      backupProvider: missingProvider,
      backupId: uploaded.id ?? undefined,
      backupIdEncoded: uploaded.idEncoded ?? undefined,
      missingProvider: null,
      partialSuccess: false,
      fallbackSaved,
    };
  },

  /** Called only after the preferred image URL fails to load. */
  async getBackupImageUrl(primaryUrl: string): Promise<string | null> {
    try {
      const id = await imageHash(primaryUrl);
      const snapshot = await getDoc(doc(db, assetCollection, id));
      if (!snapshot.exists()) return null;
      const data = snapshot.data();
      return data.primaryUrl === primaryUrl && typeof data.backupUrl === "string" && data.backupUrl.startsWith("https://")
        ? data.backupUrl
        : null;
    } catch {
      return null;
    }
  },

  /** Saves the non-secret Worker URL and preference; provider keys stay in Cloudflare encrypted secrets. */
  async saveHostingConfig(workerUrl: string, preferredProvider: ImageProvider, maxFileSizeMb: number): Promise<void> {
    const normalized = normalizeWorkerUrl(workerUrl);
    if (normalized) {
      const parsed = new URL(normalized);
      if (parsed.protocol !== "https:" && parsed.hostname !== "localhost") {
        throw new Error("The Cloudflare Worker URL must use HTTPS.");
      }
    }
    const safeMaxFileSizeMb = normalizeMaxFileSizeMb(maxFileSizeMb);
    await setDoc(configRef, {
      workerUrl: normalized,
      preferredProvider,
      maxFileSizeMb: safeMaxFileSizeMb,
      updatedAt: serverTimestamp(),
    }, { merge: true });

    // Remove the old client-configured ImgBB key document if it exists.
    await deleteDoc(legacyImgBbRef).catch(() => undefined);
  },

  async getHostingConfig(): Promise<HostingConfig> {
    const snapshot = await getDoc(configRef);
    const data = snapshot.exists() ? snapshot.data() : {};
    return {
      workerUrl: typeof data.workerUrl === "string" ? data.workerUrl : "",
      preferredProvider: data.preferredProvider === "freeimage" ? "freeimage" : "imgbb",
      maxFileSizeMb: normalizeMaxFileSizeMb(data.maxFileSizeMb),
    };
  },

  async checkWorker(workerUrl: string): Promise<{
    ok: boolean;
    providers: { imgbb: boolean; freeimage: boolean };
    firebaseProjectConfigured: boolean;
  }> {
    const normalized = normalizeWorkerUrl(workerUrl);
    if (!normalized) throw new Error("Enter your deployed Cloudflare Worker URL first.");
    let response: Response;
    try {
      response = await fetch(`${normalized}/health`, { cache: "no-store" });
    } catch {
      throw new Error("Could not reach the Worker. Check its URL and ALLOWED_ORIGINS setting.");
    }
    if (!response.ok) throw new Error("The Worker health check failed. Check the deployment and allowed website origins.");
    const data = await response.json() as {
      ok?: boolean;
      providers?: { imgbb?: boolean; freeimage?: boolean };
      firebaseProjectConfigured?: boolean;
    };
    return {
      ok: data.ok === true,
      providers: { imgbb: data.providers?.imgbb === true, freeimage: data.providers?.freeimage === true },
      firebaseProjectConfigured: data.firebaseProjectConfigured === true,
    };
  },
};
