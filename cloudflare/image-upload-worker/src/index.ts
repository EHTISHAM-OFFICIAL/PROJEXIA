/** Cloudflare Workers rate-limiting binding (see wrangler.toml [[ratelimits]]). */
export interface RateLimiter {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

export interface Env {
  FIREBASE_PROJECT_ID: string;
  ALLOWED_ORIGINS: string;
  IMGBB_API_KEY: string;
  FREEIMAGE_API_KEY: string;

  // Username sign-in (/auth/login). All three are Worker secrets.
  FIREBASE_WEB_API_KEY?: string;
  RESOLVER_EMAIL?: string;
  RESOLVER_PASSWORD?: string;

  // Throttles. Optional so an older deployment keeps working; /health reports
  // whether each one is bound.
  UPLOAD_LIMITER_USER?: RateLimiter;
  UPLOAD_LIMITER_IP?: RateLimiter;
  LOGIN_LIMITER_USER?: RateLimiter;
  LOGIN_LIMITER_IP?: RateLimiter;
}

type Provider = "imgbb" | "freeimage";
type Purpose = "admin" | "request";
const DEFAULT_MAX_FILE_SIZE_MB = 10;
const MIN_MAX_FILE_SIZE_MB = 1;
const MAX_MAX_FILE_SIZE_MB = 10;

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
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...headers,
    },
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
    vary: "Origin",
  };
}

function decodeBase64Url(value: string): Uint8Array<ArrayBuffer> {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(
    normalized + "=".repeat((4 - (normalized.length % 4)) % 4),
  );
  return new Uint8Array(
    Array.from(binary, (character) => character.charCodeAt(0)),
  );
}

function decodeJsonSegment(value: string): Record<string, unknown> {
  return JSON.parse(new TextDecoder().decode(decodeBase64Url(value))) as Record<
    string,
    unknown
  >;
}

async function getGoogleSigningKeys(): Promise<JsonWebKey[]> {
  if (cachedJwks && cachedJwks.expiresAt > Date.now()) return cachedJwks.keys;
  const response = await fetch(
    "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com",
  );
  if (!response.ok) throw new Error("Could not verify Firebase sign-in.");
  const payload = (await response.json()) as { keys?: JsonWebKey[] };
  if (!Array.isArray(payload.keys))
    throw new Error("Firebase signing keys are unavailable.");
  cachedJwks = { keys: payload.keys, expiresAt: Date.now() + 45 * 60 * 1000 };
  return payload.keys;
}

async function verifyFirebaseToken(
  token: string,
  projectId: string,
): Promise<Record<string, unknown>> {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Sign in again before uploading.");
  const header = decodeJsonSegment(parts[0]);
  const claims = decodeJsonSegment(parts[1]);
  if (header.alg !== "RS256" || typeof header.kid !== "string")
    throw new Error("Invalid sign-in token.");
  const jwk = (await getGoogleSigningKeys()).find(
    (key) => (key as JsonWebKey & { kid?: string }).kid === header.kid,
  );
  if (!jwk) {
    cachedJwks = null;
    throw new Error("Could not verify the sign-in token. Try again.");
  }
  const key = await crypto.subtle.importKey(
    "jwk",
    jwk,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"],
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
    typeof claims.sub !== "string" ||
    !claims.sub ||
    typeof claims.exp !== "number" ||
    claims.exp <= now ||
    typeof claims.iat !== "number" ||
    claims.iat > now + 60 ||
    typeof claims.auth_time !== "number" ||
    claims.auth_time > now + 60
  ) {
    throw new Error("Your sign-in has expired or is invalid. Sign in again.");
  }
  return claims;
}

async function requireAdmin(
  token: string,
  env: Env,
): Promise<Record<string, unknown>> {
  const claims = await verifyFirebaseToken(token, env.FIREBASE_PROJECT_ID);
  const uid = String(claims.sub);
  const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(env.FIREBASE_PROJECT_ID)}/databases/(default)/documents/admins/${encodeURIComponent(uid)}`;
  const response = await fetch(url, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (!response.ok)
    throw new Error("Administrator access is required for this upload.");
  return claims;
}

async function getMaxFileSizeMb(token: string, env: Env): Promise<number> {
  const url =
    "https://firestore.googleapis.com/v1/projects/" +
    encodeURIComponent(env.FIREBASE_PROJECT_ID) +
    "/databases/(default)/documents/settings/imageHosting";
  const response = await fetch(url, {
    headers: { authorization: "Bearer " + token },
  });
  if (response.status === 404) return DEFAULT_MAX_FILE_SIZE_MB;
  if (!response.ok)
    throw new Error(
      "Could not read the image upload limit from website settings.",
    );
  const payload = (await response.json()) as {
    fields?: { maxFileSizeMb?: { integerValue?: string } };
  };
  const configured = Number(payload.fields?.maxFileSizeMb?.integerValue);
  if (
    !Number.isInteger(configured) ||
    configured < MIN_MAX_FILE_SIZE_MB ||
    configured > MAX_MAX_FILE_SIZE_MB
  )
    return DEFAULT_MAX_FILE_SIZE_MB;
  return configured;
}

async function hasValidImageSignature(file: File): Promise<boolean> {
  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const startsWith = (...signature: number[]) =>
    signature.every((value, index) => bytes[index] === value);

  switch (file.type.toLowerCase()) {
    case "image/jpeg":
      return startsWith(0xff, 0xd8, 0xff);
    case "image/png":
      return startsWith(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a);
    case "image/gif":
      return (
        (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 &&
          bytes[3] === 0x38 && (bytes[4] === 0x37 || bytes[4] === 0x39) &&
          bytes[5] === 0x61)
      );
    case "image/webp":
      return (
        bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 &&
        bytes[3] === 0x46 && bytes[8] === 0x57 && bytes[9] === 0x45 &&
        bytes[10] === 0x42 && bytes[11] === 0x50
      );
    case "image/bmp":
      return bytes[0] === 0x42 && bytes[1] === 0x4d;
    default:
      return false;
  }
}

function readBearer(request: Request): string {
  const authorization = request.headers.get("authorization") || "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  if (!match) throw new Error("Sign in before uploading an image.");
  return match[1];
}

async function uploadToImgBB(file: File, env: Env): Promise<ProviderResult> {
  if (!env.IMGBB_API_KEY)
    return {
      ok: false,
      error: "ImgBB API key is not configured in Cloudflare.",
    };
  try {
    const form = new FormData();
    form.append("image", file, file.name || "upload");
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${encodeURIComponent(env.IMGBB_API_KEY)}`,
      {
        method: "POST",
        body: form,
      },
    );
    const payload = (await response.json()) as {
      success?: boolean;
      data?: { url?: string; delete_url?: string; id?: string };
      error?: { message?: string };
    };
    const url = payload.data?.url;
    if (
      !response.ok ||
      payload.success !== true ||
      !url ||
      new URL(url).protocol !== "https:"
    ) {
      return {
        ok: false,
        error: payload.error?.message || "ImgBB rejected the upload.",
      };
    }
    return {
      ok: true,
      url,
      id: payload.data?.id,
      deleteUrl: payload.data?.delete_url,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "ImgBB upload failed.",
    };
  }
}

async function uploadToFreeimage(
  file: File,
  env: Env,
): Promise<ProviderResult> {
  if (!env.FREEIMAGE_API_KEY)
    return {
      ok: false,
      error: "Freeimage.host API key is not configured in Cloudflare.",
    };

  try {
    // Freeimage.host API v1: local files must be sent as multipart POST.
    const form = new FormData();
    form.append("key", env.FREEIMAGE_API_KEY);
    form.append("action", "upload");
    form.append("source", file, file.name || "upload");
    form.append("format", "json");

    // Do not silently follow a website/security redirect: it can turn an API
    // JSON response into the provider's HTML homepage or challenge page.
    const response = await fetch("https://freeimage.host/api/1/upload", {
      method: "POST",
      headers: { accept: "application/json" },
      body: form,
      redirect: "manual",
      signal: AbortSignal.timeout(45_000),
    });

    const contentType = response.headers.get("content-type") || "unknown";
    const location = response.headers.get("location");
    const responseText = await response.text();

    // A redirect from an API endpoint is not a successful JSON upload.
    if (response.status >= 300 && response.status < 400) {
      return {
        ok: false,
        error:
          `Freeimage.host API redirected the upload (HTTP ${response.status}, content-type: ${contentType})` +
          (location ? `, location: ${location.slice(0, 250)}` : "."),
      };
    }

    let payload: {
      status_code?: number;
      success?: { code?: number; message?: string };
      image?: { url?: string; id_encoded?: string };
      error?: { message?: string };
    } | null = null;
    try {
      payload = JSON.parse(responseText);
    } catch {
      payload = null;
    }

    if (!response.ok) {
      const detail =
        payload?.error?.message ||
        payload?.success?.message ||
        responseText.replace(/\s+/g, " ").slice(0, 180);
      return {
        ok: false,
        error:
          `Freeimage.host API returned HTTP ${response.status} (content-type: ${contentType})` +
          (detail ? `: ${detail}` : "."),
      };
    }

    if (!payload) {
      return {
        ok: false,
        error:
          `Freeimage.host returned non-JSON content (HTTP ${response.status}, content-type: ${contentType})` +
          (location ? `, location: ${location.slice(0, 250)}` : "") +
          `: ${responseText.replace(/\s+/g, " ").slice(0, 180)}`,
      };
    }

    const rawUrl = payload.image?.url;
    if (
      payload.status_code !== 200 ||
      payload.success?.code !== 200 ||
      !rawUrl
    ) {
      return {
        ok: false,
        error:
          payload.error?.message ||
          payload.success?.message ||
          "Freeimage.host did not return a successful image upload.",
      };
    }

    // The API documentation examples may return HTTP URLs. Accept only
    // Freeimage.host image URLs and normalize them to HTTPS.
    let imageUrl: URL;
    try {
      imageUrl = new URL(rawUrl);
    } catch {
      return { ok: false, error: "Freeimage.host returned an invalid image URL." };
    }
    const host = imageUrl.hostname.toLowerCase();
    if (
      (imageUrl.protocol !== "http:" && imageUrl.protocol !== "https:") ||
      !(host === "freeimage.host" || host.endsWith(".freeimage.host"))
    ) {
      return {
        ok: false,
        error: "Freeimage.host returned an unexpected image URL host.",
      };
    }
    imageUrl.protocol = "https:";

    return {
      ok: true,
      url: imageUrl.toString(),
      idEncoded: payload.image?.id_encoded,
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.name === "TimeoutError"
            ? "Freeimage.host upload timed out after 45 seconds."
            : error.message
          : "Freeimage.host upload failed.",
    };
  }
}

async function uploadProvider(
  provider: Provider,
  file: File,
  env: Env,
): Promise<ProviderResult> {
  return provider === "imgbb"
    ? uploadToImgBB(file, env)
    : uploadToFreeimage(file, env);
}

const USERNAME_PATTERN = /^[a-z0-9_-]{3,30}$/;
/** Accounts created before email became mandatory used this internal domain. */
const LEGACY_EMAIL_DOMAIN = "users.mectec.local";

/** Errors Identity Toolkit returns for a plain wrong username/password. */
const BAD_CREDENTIAL_ERRORS = new Set([
  "INVALID_PASSWORD",
  "EMAIL_NOT_FOUND",
  "INVALID_LOGIN_CREDENTIALS",
  "INVALID_EMAIL",
  "USER_DISABLED",
  "MISSING_PASSWORD",
  "MISSING_EMAIL",
]);

let cachedResolverToken: { token: string; expiresAt: number } | null = null;

function clientIp(request: Request): string {
  return request.headers.get("cf-connecting-ip") || "unknown";
}

/**
 * Returns true when ANY of the given limiters rejects the key. A limiter that is
 * not bound, or that errors, never blocks: these are speed bumps against abuse,
 * and a Cloudflare hiccup must not lock real customers out.
 *
 * The binding is per Cloudflare location and eventually consistent, so it slows
 * a flood down rather than enforcing an exact quota.
 */
async function isThrottled(
  checks: Array<[RateLimiter | undefined, string]>,
): Promise<boolean> {
  for (const [limiter, key] of checks) {
    if (!limiter) continue;
    try {
      const { success } = await limiter.limit({ key });
      if (!success) return true;
    } catch {
      // Fail open.
    }
  }
  return false;
}

function tooManyRequests(message: string, cors: HeadersInit): Response {
  return json({ ok: false, error: message }, 429, { ...cors, "retry-after": "60" });
}

function invalidCredentials(cors: HeadersInit): Response {
  return json({ ok: false, error: "Invalid username or password." }, 401, cors);
}

function googleApiHeaders(env: Env): HeadersInit {
  // Browser API keys are often restricted by HTTP referrer. Server-side calls
  // carry no referrer, so present the site's own origin.
  const referer = allowedOrigins(env).find((origin) => origin.startsWith("https://"));
  return {
    "content-type": "application/json",
    ...(referer ? { referer: referer + "/" } : {}),
  };
}

function identityToolkitSignInUrl(env: Env): string {
  return (
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
    encodeURIComponent(env.FIREBASE_WEB_API_KEY || "")
  );
}

/**
 * Signs in as the dedicated resolver account. Its only privilege (granted by
 * firestore.rules via resolvers/{uid}) is reading usernameLookup documents, so
 * leaking these credentials exposes nothing the old public rule did not.
 */
async function getResolverToken(env: Env): Promise<string> {
  if (cachedResolverToken && cachedResolverToken.expiresAt > Date.now() + 60_000) {
    return cachedResolverToken.token;
  }
  if (!env.FIREBASE_WEB_API_KEY || !env.RESOLVER_EMAIL || !env.RESOLVER_PASSWORD) {
    throw new Error("Username sign-in is not configured on the Worker.");
  }
  const response = await fetch(identityToolkitSignInUrl(env), {
    method: "POST",
    headers: googleApiHeaders(env),
    body: JSON.stringify({
      email: env.RESOLVER_EMAIL,
      password: env.RESOLVER_PASSWORD,
      returnSecureToken: true,
    }),
  });
  if (!response.ok) throw new Error("The resolver account could not sign in.");
  const payload = (await response.json()) as { idToken?: string; expiresIn?: string };
  if (!payload.idToken) throw new Error("The resolver account returned no token.");
  cachedResolverToken = {
    token: payload.idToken,
    expiresAt: Date.now() + Number(payload.expiresIn || 3600) * 1000,
  };
  return payload.idToken;
}

async function lookupAuthEmail(
  username: string,
  env: Env,
): Promise<{ email: string | null; lookupMissing: boolean }> {
  const token = await getResolverToken(env);
  const url =
    "https://firestore.googleapis.com/v1/projects/" +
    encodeURIComponent(env.FIREBASE_PROJECT_ID) +
    "/databases/(default)/documents/usernameLookup/" +
    encodeURIComponent(username);
  const response = await fetch(url, { headers: { authorization: "Bearer " + token } });

  // No lookup record: an account created before lookups existed, whose sign-in
  // email is derived from the username.
  if (response.status === 404) {
    return { email: `${username}@${LEGACY_EMAIL_DOMAIN}`, lookupMissing: true };
  }
  if (response.status === 401 || response.status === 403) {
    cachedResolverToken = null;
    throw new Error("The resolver account is not allowed to read usernameLookup.");
  }
  if (!response.ok) throw new Error("Could not read the username record.");

  const payload = (await response.json()) as {
    fields?: { authEmail?: { stringValue?: string } };
  };
  return { email: payload.fields?.authEmail?.stringValue || null, lookupMissing: false };
}

async function verifyPassword(
  email: string,
  password: string,
  env: Env,
): Promise<"ok" | "invalid" | "throttled"> {
  const response = await fetch(identityToolkitSignInUrl(env), {
    method: "POST",
    headers: googleApiHeaders(env),
    body: JSON.stringify({ email, password, returnSecureToken: false }),
  });
  if (response.ok) return "ok";

  const payload = (await response.json().catch(() => null)) as {
    error?: { message?: string };
  } | null;
  const code = String(payload?.error?.message || "").split(" ")[0];
  if (code.startsWith("TOO_MANY_ATTEMPTS")) return "throttled";
  if (BAD_CREDENTIAL_ERRORS.has(code)) return "invalid";

  // Anything else (bad API key, referrer blocked, project misconfigured, 5xx)
  // is a setup problem, not a wrong password. Surface it as unavailable.
  throw new Error("Identity service rejected the request: " + (code || response.status));
}

/**
 * Username sign-in without a public username -> email mapping.
 *
 * The browser sends username + password. The Worker resolves the username with
 * the resolver account, checks the password against Firebase, and only then
 * returns the sign-in email, so someone who merely knows a username learns
 * nothing. Unknown user and wrong password are indistinguishable. The browser
 * then signs in normally with the email, so Firebase still issues the session.
 */
async function handleLogin(
  request: Request,
  env: Env,
  cors: HeadersInit,
): Promise<Response> {
  let body: { username?: unknown; password?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400, cors);
  }

  const username =
    typeof body.username === "string" ? body.username.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!USERNAME_PATTERN.test(username) || !password || password.length > 4096) {
    return invalidCredentials(cors);
  }

  if (
    await isThrottled([
      [env.LOGIN_LIMITER_IP, "ip:" + clientIp(request)],
      [env.LOGIN_LIMITER_USER, "user:" + username],
    ])
  ) {
    return tooManyRequests("Too many sign-in attempts. Wait a minute and try again.", cors);
  }

  try {
    const { email, lookupMissing } = await lookupAuthEmail(username, env);
    if (!email) return invalidCredentials(cors);

    const result = await verifyPassword(email, password, env);
    if (result === "throttled") {
      return tooManyRequests("Too many sign-in attempts. Wait a minute and try again.", cors);
    }
    if (result !== "ok") return invalidCredentials(cors);

    return json({ ok: true, email, lookupMissing }, 200, cors);
  } catch (error) {
    // Log the reason for the operator (never the password); tell the browser
    // only that the service is unavailable.
    console.error("auth/login failed:", error instanceof Error ? error.message : error);
    return json(
      {
        ok: false,
        error:
          "Username sign-in is temporarily unavailable. You can sign in with your email address instead.",
      },
      503,
      cors,
    );
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = (request.headers.get("origin") || "").replace(/\/$/, "");
    const allowed = allowedOrigins(env);
    const cors =
      origin && allowed.includes(origin) ? corsHeaders(origin, env) : {};
    if (origin && !allowed.includes(origin))
      return json(
        { ok: false, error: "This website origin is not allowed." },
        403,
      );
    if (request.method === "OPTIONS") {
      if (!origin || !allowed.includes(origin))
        return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: cors });
    }

    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname.endsWith("/health")) {
      return json(
        {
          ok: true,
          service: "projexiahub-image-gateway",
          firebaseProjectConfigured: Boolean(
            env.FIREBASE_PROJECT_ID &&
            !env.FIREBASE_PROJECT_ID.includes("REPLACE_WITH"),
          ),
          providers: {
            imgbb: Boolean(env.IMGBB_API_KEY),
            freeimage: Boolean(env.FREEIMAGE_API_KEY),
          },
          usernameSignIn: Boolean(
            env.FIREBASE_WEB_API_KEY && env.RESOLVER_EMAIL && env.RESOLVER_PASSWORD,
          ),
          rateLimiting: {
            upload: Boolean(env.UPLOAD_LIMITER_USER && env.UPLOAD_LIMITER_IP),
            login: Boolean(env.LOGIN_LIMITER_USER && env.LOGIN_LIMITER_IP),
          },
        },
        200,
        cors,
      );
    }
    if (request.method === "POST" && url.pathname.endsWith("/auth/login")) {
      return handleLogin(request, env, cors);
    }
    if (request.method !== "POST" || !url.pathname.endsWith("/upload")) {
      return json({ ok: false, error: "Not found." }, 404, cors);
    }

    try {
      const token = readBearer(request);
      // Authenticate and read the configured limit before parsing the multipart body.
      const claims = await verifyFirebaseToken(token, env.FIREBASE_PROJECT_ID);
      // Throttle before doing any Firestore or provider work. Registration is
      // open, so a valid token alone is not proof of a legitimate customer.
      if (
        await isThrottled([
          [env.UPLOAD_LIMITER_USER, "uid:" + String(claims.sub)],
          [env.UPLOAD_LIMITER_IP, "ip:" + clientIp(request)],
        ])
      ) {
        return tooManyRequests("Too many uploads. Wait a minute and try again.", cors);
      }
      const maxFileSizeMb = await getMaxFileSizeMb(token, env);
      const maxFileSizeBytes = maxFileSizeMb * 1024 * 1024;
      const contentLength = Number(request.headers.get("content-length") || 0);
      // Allow multipart boundaries and form fields, but reject clearly oversized bodies early.
      if (contentLength > maxFileSizeBytes + 512 * 1024) {
        return json(
          { ok: false, error: `The upload request exceeds the configured ${maxFileSizeMb} MB image limit.` },
          413,
          cors,
        );
      }
      const form = await request.formData();
      const file = form.get("file");
      if (!(file instanceof File))
        return json({ ok: false, error: "Choose an image file." }, 400, cors);
      const purpose = String(form.get("purpose") || "admin") as Purpose;
      if (purpose !== "admin" && purpose !== "request")
        return json({ ok: false, error: "Invalid upload purpose." }, 400, cors);
      if (purpose === "admin") await requireAdmin(token, env);
      if (file.size <= 0 || file.size > maxFileSizeBytes) {
        return json(
          {
            ok: false,
            error:
              "Images must be between 1 byte and " +
              maxFileSizeMb +
              " MB. The current limit is configured in Admin → Settings → Image hosting.",
          },
          413,
          cors,
        );
      }
      const allowedTypes = new Set([
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
        "image/bmp",
      ]);
      if (!allowedTypes.has(file.type.toLowerCase())) {
        return json(
          { ok: false, error: "Use a JPG, PNG, WebP, GIF, or BMP image." },
          415,
          cors,
        );
      }
      if (!(await hasValidImageSignature(file))) {
        return json(
          { ok: false, error: "The file contents do not match a supported image format." },
          415,
          cors,
        );
      }

      const onlyProvider = form.get("onlyProvider");
      if (
        purpose === "admin" &&
        (onlyProvider === "imgbb" || onlyProvider === "freeimage")
      ) {
        const uploaded = await uploadProvider(onlyProvider, file, env);
        if (!uploaded.ok || !uploaded.url)
          return json(
            {
              ok: false,
              provider: onlyProvider,
              error: uploaded.error || "Backup retry failed.",
            },
            502,
            cors,
          );
        return json(
          {
            ok: true,
            uploaded: {
              provider: onlyProvider,
              url: uploaded.url,
              id: uploaded.id || null,
              idEncoded: uploaded.idEncoded || null,
              deleteUrl: uploaded.deleteUrl || null,
            },
          },
          200,
          cors,
        );
      }

      if (purpose === "request") {
        const uploaded = await uploadToImgBB(file, env);
        if (!uploaded.ok || !uploaded.url)
          return json(
            {
              ok: false,
              error: uploaded.error || "Request attachment upload failed.",
            },
            502,
            cors,
          );
        return json(
          {
            ok: true,
            purpose,
            primary: {
              provider: "imgbb",
              url: uploaded.url,
              id: uploaded.id || null,
              idEncoded: uploaded.idEncoded || null,
              deleteUrl: uploaded.deleteUrl || null,
            },
            backup: null,
            providers: {
              imgbb: { ok: true, url: uploaded.url },
              freeimage: { ok: false, skipped: true },
            },
            partialSuccess: false,
            missingProvider: null,
          },
          200,
          cors,
        );
      }

      const preferred =
        form.get("preferredProvider") === "freeimage" ? "freeimage" : "imgbb";
      const [imgbb, freeimage] = await Promise.all([
        uploadToImgBB(file, env),
        uploadToFreeimage(file, env),
      ]);
      const results: Record<Provider, ProviderResult> = { imgbb, freeimage };
      const available = (Object.keys(results) as Provider[]).filter(
        (provider) => results[provider].ok && results[provider].url,
      );
      if (available.length === 0) {
        return json(
          { ok: false, error: "Both image hosts failed.", providers: results },
          502,
          cors,
        );
      }
      const primaryProvider = available.includes(preferred)
        ? preferred
        : available[0];
      const backupProvider =
        available.find((provider) => provider !== primaryProvider) || null;
      const primary = results[primaryProvider];
      const backup = backupProvider ? results[backupProvider] : null;
      const missingProvider = backupProvider
        ? null
        : primaryProvider === "imgbb"
          ? "freeimage"
          : "imgbb";
      return json(
        {
          ok: true,
          purpose,
          primary: {
            provider: primaryProvider,
            url: primary.url,
            id: primary.id || null,
            idEncoded: primary.idEncoded || null,
            deleteUrl: primary.deleteUrl || null,
          },
          backup: backup
            ? {
                provider: backupProvider,
                url: backup.url,
                id: backup.id || null,
                idEncoded: backup.idEncoded || null,
              }
            : null,
          providers: results,
          partialSuccess: !backup,
          missingProvider,
        },
        200,
        cors,
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Image upload failed.";
      const status = /administrator access/i.test(message)
        ? 403
        : /sign in|token|firebase/i.test(message)
          ? 401
          : 400;
      return json({ ok: false, error: message }, status, cors);
    }
  },
};
