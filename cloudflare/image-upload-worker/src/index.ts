export interface Env {
  FIREBASE_PROJECT_ID: string;
  ALLOWED_ORIGINS: string;
  IMGBB_API_KEY: string;
  FREEIMAGE_API_KEY: string;
}

type Provider = "imgbb" | "freeimage";
type Purpose = "admin" | "request";
type ProviderResult = {
  ok: boolean;
  url?: string;
  deleteUrl?: string;
  id?: string;
  idEncoded?: string;
  error?: string;
};

let cachedJwks: { expiresAt: number; keys: JsonWebKey[] } | null = null;

function json(body: unknown, status = 200, headers: HeadersInit = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers },
  });
}

function allowedOrigins(env: Env): string[] {
  return (env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((value) => value.trim().replace(/\/$/, ""))
    .filter(Boolean);
}

function corsHeaders(origin: string, env: Env): HeadersInit {
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "GET, POST, OPTIONS",
    "access-control-allow-headers": "Authorization, Content-Type",
    "access-control-max-age": "86400",
    "vary": "Origin",
  };
}

function decodeBase64Url(value: string): Uint8Array {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(normalized + "=".repeat((4 - (normalized.length % 4)) % 4));
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function decodeJsonSegment(value: string): Record<string, unknown> {
  return JSON.parse(new TextDecoder().decode(decodeBase64Url(value))) as Record<string, unknown>;
}

async function getGoogleSigningKeys(): Promise<JsonWebKey[]> {
  if (cachedJwks && cachedJwks.expiresAt > Date.now()) return cachedJwks.keys;
  const response = await fetch("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com");
  if (!response.ok) throw new Error("Could not verify Firebase sign-in.");
  const payload = await response.json() as { keys?: JsonWebKey[] };
  if (!Array.isArray(payload.keys)) throw new Error("Firebase signing keys are unavailable.");
  cachedJwks = { keys: payload.keys, expiresAt: Date.now() + 45 * 60 * 1000 };
  return payload.keys;
}

async function verifyFirebaseToken(token: string, projectId: string): Promise<Record<string, unknown>> {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Sign in again before uploading.");
  const header = decodeJsonSegment(parts[0]);
  const claims = decodeJsonSegment(parts[1]);
  if (header.alg !== "RS256" || typeof header.kid !== "string") throw new Error("Invalid sign-in token.");
  const jwk = (await getGoogleSigningKeys()).find((key) => (key as JsonWebKey & { kid?: string }).kid === header.kid);
  if (!jwk) {
    cachedJwks = null;
    throw new Error("Could not verify the sign-in token. Try again.");
  }
  const key = await crypto.subtle.importKey(
    "jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"],
  );
  const signatureValid = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    key,
    decodeBase64Url(parts[2]),
    new TextEncoder().encode(parts[0] + "." + parts[1]),
  );
  const now = Math.floor(Date.now() / 1000);
  if (
    !signatureValid ||
    claims.aud !== projectId ||
    claims.iss !== `https://securetoken.google.com/${projectId}` ||
    typeof claims.sub !== "string" || !claims.sub ||
    typeof claims.exp !== "number" || claims.exp <= now ||
    typeof claims.iat !== "number" || claims.iat > now + 60 ||
    typeof claims.auth_time !== "number" || claims.auth_time > now + 60
  ) {
    throw new Error("Your sign-in has expired or is invalid. Sign in again.");
  }
  return claims;
}

async function requireAdmin(token: string, env: Env): Promise<Record<string, unknown>> {
  const claims = await verifyFirebaseToken(token, env.FIREBASE_PROJECT_ID);
  const uid = String(claims.sub);
  const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(env.FIREBASE_PROJECT_ID)}/databases/(default)/documents/admins/${encodeURIComponent(uid)}`;
  const response = await fetch(url, { headers: { authorization: `Bearer ${token}` } });
  if (!response.ok) throw new Error("Administrator access is required for this upload.");
  return claims;
}

function readBearer(request: Request): string {
  const authorization = request.headers.get("authorization") || "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  if (!match) throw new Error("Sign in before uploading an image.");
  return match[1];
}

async function uploadToImgBB(file: File, env: Env): Promise<ProviderResult> {
  if (!env.IMGBB_API_KEY) return { ok: false, error: "ImgBB API key is not configured in Cloudflare." };
  try {
    const form = new FormData();
    form.append("image", file, file.name || "upload");
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(env.IMGBB_API_KEY)}`, {
      method: "POST", body: form,
    });
    const payload = await response.json() as {
      success?: boolean;
      data?: { url?: string; delete_url?: string; id?: string };
      error?: { message?: string };
    };
    const url = payload.data?.url;
    if (!response.ok || payload.success !== true || !url || new URL(url).protocol !== "https:") {
      return { ok: false, error: payload.error?.message || "ImgBB rejected the upload." };
    }
    return { ok: true, url, id: payload.data?.id, deleteUrl: payload.data?.delete_url };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "ImgBB upload failed." };
  }
}

async function uploadToFreeimage(file: File, env: Env): Promise<ProviderResult> {
  if (!env.FREEIMAGE_API_KEY) return { ok: false, error: "Freeimage.host API key is not configured in Cloudflare." };
  try {
    const form = new FormData();
    form.append("key", env.FREEIMAGE_API_KEY);
    form.append("source", file, file.name || "upload");
    form.append("format", "json");
    const response = await fetch("https://freeimage.host/api/1/upload", { method: "POST", body: form });
    const payload = await response.json() as {
      status_code?: number;
      success?: { code?: number; message?: string };
      image?: { url?: string; id_encoded?: string };
      error?: { message?: string };
    };
    const url = payload.image?.url;
    if (!response.ok || payload.status_code !== 200 || payload.success?.code !== 200 || !url || new URL(url).protocol !== "https:") {
      return { ok: false, error: payload.error?.message || payload.success?.message || "Freeimage.host rejected the upload." };
    }
    return { ok: true, url, idEncoded: payload.image?.id_encoded };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Freeimage.host upload failed." };
  }
}

async function uploadProvider(provider: Provider, file: File, env: Env): Promise<ProviderResult> {
  return provider === "imgbb" ? uploadToImgBB(file, env) : uploadToFreeimage(file, env);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = (request.headers.get("origin") || "").replace(/\/$/, "");
    const allowed = allowedOrigins(env);
    const cors = origin && allowed.includes(origin) ? corsHeaders(origin, env) : {};
    if (origin && !allowed.includes(origin)) return json({ ok: false, error: "This website origin is not allowed." }, 403);
    if (request.method === "OPTIONS") {
      if (!origin || !allowed.includes(origin)) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: cors });
    }

    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname.endsWith("/health")) {
      return json({
        ok: true,
        service: "projexiahub-image-gateway",
        firebaseProjectConfigured: Boolean(env.FIREBASE_PROJECT_ID && !env.FIREBASE_PROJECT_ID.includes("REPLACE_WITH")),
        providers: { imgbb: Boolean(env.IMGBB_API_KEY), freeimage: Boolean(env.FREEIMAGE_API_KEY) },
      }, 200, cors);
    }
    if (request.method !== "POST" || !url.pathname.endsWith("/upload")) {
      return json({ ok: false, error: "Not found." }, 404, cors);
    }

    try {
      const token = readBearer(request);
      const form = await request.formData();
      const file = form.get("file");
      if (!(file instanceof File)) return json({ ok: false, error: "Choose an image file." }, 400, cors);
      if (file.size <= 0 || file.size > 5 * 1024 * 1024) {
        return json({ ok: false, error: "Images must be between 1 byte and 5 MB." }, 413, cors);
      }
      const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/bmp"]);
      if (!allowedTypes.has(file.type.toLowerCase())) {
        return json({ ok: false, error: "Use a JPG, PNG, WebP, GIF, or BMP image." }, 415, cors);
      }

      const purpose = String(form.get("purpose") || "admin") as Purpose;
      if (purpose !== "admin" && purpose !== "request") return json({ ok: false, error: "Invalid upload purpose." }, 400, cors);
      if (purpose === "admin") await requireAdmin(token, env);
      else await verifyFirebaseToken(token, env.FIREBASE_PROJECT_ID);

      const onlyProvider = form.get("onlyProvider");
      if (purpose === "admin" && (onlyProvider === "imgbb" || onlyProvider === "freeimage")) {
        const uploaded = await uploadProvider(onlyProvider, file, env);
        if (!uploaded.ok || !uploaded.url) return json({ ok: false, provider: onlyProvider, error: uploaded.error || "Backup retry failed." }, 502, cors);
        return json({ ok: true, uploaded: { provider: onlyProvider, url: uploaded.url, id: uploaded.id || null, idEncoded: uploaded.idEncoded || null, deleteUrl: uploaded.deleteUrl || null } }, 200, cors);
      }

      if (purpose === "request") {
        const uploaded = await uploadToImgBB(file, env);
        if (!uploaded.ok || !uploaded.url) return json({ ok: false, error: uploaded.error || "Request attachment upload failed." }, 502, cors);
        return json({
          ok: true, purpose, primary: { provider: "imgbb", url: uploaded.url, id: uploaded.id || null, idEncoded: uploaded.idEncoded || null, deleteUrl: uploaded.deleteUrl || null },
          backup: null, providers: { imgbb: { ok: true, url: uploaded.url }, freeimage: { ok: false, skipped: true } },
          partialSuccess: false, missingProvider: null,
        }, 200, cors);
      }

      const preferred = form.get("preferredProvider") === "freeimage" ? "freeimage" : "imgbb";
      const [imgbb, freeimage] = await Promise.all([
        uploadToImgBB(file, env),
        uploadToFreeimage(file, env),
      ]);
      const results: Record<Provider, ProviderResult> = { imgbb, freeimage };
      const available = (Object.keys(results) as Provider[]).filter((provider) => results[provider].ok && results[provider].url);
      if (available.length === 0) {
        return json({ ok: false, error: "Both image hosts failed.", providers: results }, 502, cors);
      }
      const primaryProvider = available.includes(preferred) ? preferred : available[0];
      const backupProvider = available.find((provider) => provider !== primaryProvider) || null;
      const primary = results[primaryProvider];
      const backup = backupProvider ? results[backupProvider] : null;
      const missingProvider = backupProvider ? null : (primaryProvider === "imgbb" ? "freeimage" : "imgbb");
      return json({
        ok: true, purpose, primary: { provider: primaryProvider, url: primary.url, id: primary.id || null, idEncoded: primary.idEncoded || null, deleteUrl: primary.deleteUrl || null },
        backup: backup ? { provider: backupProvider, url: backup.url, id: backup.id || null, idEncoded: backup.idEncoded || null } : null,
        providers: results, partialSuccess: !backup, missingProvider,
      }, 200, cors);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Image upload failed.";
      const status = /administrator access/i.test(message) ? 403 : /sign in|token|firebase/i.test(message) ? 401 : 400;
      return json({ ok: false, error: message }, status, cors);
    }
  },
} satisfies ExportedHandler<Env>;
