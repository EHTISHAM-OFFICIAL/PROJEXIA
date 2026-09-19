import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { COLLECTIONS, db } from '../firebase/firestore';

const settingsRef = doc(db, COLLECTIONS.settings, 'imgbb');

export interface UploadedImage {
  url: string;
  /** imgBB's own delete link. There is no API-based delete without visiting
   *  this URL in a browser — that's a real limitation of the free tier, kept
   *  here so an admin can manually remove an image later if they need to. */
  deleteUrl: string;
}

/**
 * Resolves which API key to use: an admin-set override in Firestore takes
 * priority, falling back to the build-time env var. This is what makes the
 * key "customizable through the admin panel" without needing a redeploy.
 */
async function resolveApiKey(): Promise<string> {
  try {
    const snapshot = await getDoc(settingsRef);
    const override = snapshot.exists() ? (snapshot.data().apiKey as string | undefined) : undefined;
    if (override && override.trim()) return override.trim();
  } catch {
    // Firestore unreachable — fall through to the env default rather than fail outright.
  }

  const envKey = import.meta.env.VITE_IMGBB_API_KEY as string | undefined;
  if (!envKey) {
    throw new Error(
      'No imgBB API key configured. Set VITE_IMGBB_API_KEY in .env, or add one in Admin → Settings.'
    );
  }
  return envKey;
}

export const imgbbService = {
  /** Uploads one image to imgBB and returns its permanent hosted URL. */
  async upload(file: File): Promise<UploadedImage> {
    const apiKey = await resolveApiKey();

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });

    const json = await response.json();

    if (!response.ok || !json?.success) {
      const message = json?.error?.message ?? 'Image upload failed.';
      throw new Error(message);
    }

    return {
      url: json.data.url as string,
      deleteUrl: json.data.delete_url as string,
    };
  },

  async uploadMany(files: File[]): Promise<UploadedImage[]> {
    return Promise.all(files.map((file) => imgbbService.upload(file)));
  },

  /** Admin-only, enforced by firestore.rules — see settings/{docId}. */
  async saveApiKeyOverride(apiKey: string | null): Promise<void> {
    await setDoc(settingsRef, { apiKey: apiKey?.trim() || null, updatedAt: serverTimestamp() });
  },

  async getApiKeyOverride(): Promise<string | null> {
    const snapshot = await getDoc(settingsRef);
    if (!snapshot.exists()) return null;
    return (snapshot.data().apiKey as string | null) ?? null;
  },

  /** Whether an env default exists at all, shown in the admin UI. */
  hasEnvDefault(): boolean {
    return Boolean(import.meta.env.VITE_IMGBB_API_KEY);
  },
};
