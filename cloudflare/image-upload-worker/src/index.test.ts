import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import worker, { type Env, type RateLimiter } from './index';

const ORIGIN = 'https://projexiahub.web.app';
const PROJECT = 'demo-project';

const baseEnv: Env = {
  FIREBASE_PROJECT_ID: PROJECT,
  ALLOWED_ORIGINS: `${ORIGIN},http://localhost:5173`,
  IMGBB_API_KEY: 'imgbb',
  FREEIMAGE_API_KEY: 'freeimage',
  FIREBASE_WEB_API_KEY: 'web-key',
  RESOLVER_EMAIL: 'resolver@example.com',
  RESOLVER_PASSWORD: 'resolver-pass',
};

const limiter = (allow: boolean): RateLimiter & { limit: ReturnType<typeof vi.fn> } => ({
  limit: vi.fn().mockResolvedValue({ success: allow }),
});

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

interface Calls {
  resolverSignIns: number;
  passwordChecks: Array<{ email: string; password: string }>;
  lookups: string[];
}

/** Fake Google endpoints. `users` maps username -> auth email; absent = no lookup doc. */
function mockGoogle(options: {
  users?: Record<string, string>;
  accounts?: Record<string, string>; // email -> password
  identityError?: string;
}) {
  const calls: Calls = { resolverSignIns: 0, passwordChecks: [], lookups: [] };
  const { users = {}, accounts = {}, identityError } = options;

  vi.stubGlobal(
    'fetch',
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);

      if (url.startsWith('https://identitytoolkit.googleapis.com')) {
        const body = JSON.parse(String(init?.body));
        if (body.email === baseEnv.RESOLVER_EMAIL) {
          calls.resolverSignIns += 1;
          return jsonResponse({ idToken: 'resolver-token', expiresIn: '3600' });
        }
        calls.passwordChecks.push({ email: body.email, password: body.password });
        if (identityError) return jsonResponse({ error: { message: identityError } }, 400);
        if (accounts[body.email] === body.password) return jsonResponse({ localId: 'uid' });
        return jsonResponse({ error: { message: 'INVALID_LOGIN_CREDENTIALS' } }, 400);
      }

      if (url.includes('/documents/usernameLookup/')) {
        expect((init?.headers as Record<string, string>).authorization).toBe('Bearer resolver-token');
        const username = decodeURIComponent(url.split('/usernameLookup/')[1]);
        calls.lookups.push(username);
        if (!users[username]) return new Response('{}', { status: 404 });
        return jsonResponse({ fields: { authEmail: { stringValue: users[username] } } });
      }

      throw new Error('Unexpected fetch: ' + url);
    }),
  );
  return calls;
}

function login(body: unknown, env: Partial<Env> = {}, headers: Record<string, string> = {}) {
  return worker.fetch(
    new Request('https://worker.example/auth/login', {
      method: 'POST',
      headers: { origin: ORIGIN, 'content-type': 'application/json', ...headers },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    }),
    { ...baseEnv, ...env },
  );
}

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('POST /auth/login', () => {
  it('returns the sign-in email only after the password is verified', async () => {
    const calls = mockGoogle({
      users: { sam: 'sam@example.com' },
      accounts: { 'sam@example.com': 'correct horse' },
    });
    const response = await login({ username: 'Sam', password: 'correct horse' });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true, email: 'sam@example.com', lookupMissing: false });
    expect(calls.passwordChecks).toEqual([{ email: 'sam@example.com', password: 'correct horse' }]);
    expect(calls.lookups).toEqual(['sam']); // username is normalised
  });

  it('never reveals the email for a wrong password', async () => {
    mockGoogle({ users: { sam: 'sam@example.com' }, accounts: { 'sam@example.com': 'right' } });
    const response = await login({ username: 'sam', password: 'wrong' });
    const text = await response.text();

    expect(response.status).toBe(401);
    expect(text).not.toContain('sam@example.com');
    expect(JSON.parse(text)).toEqual({ ok: false, error: 'Invalid username or password.' });
  });

  it('answers identically for an unknown user and a wrong password', async () => {
    mockGoogle({ users: { sam: 'sam@example.com' }, accounts: { 'sam@example.com': 'right' } });
    const wrongPassword = await login({ username: 'sam', password: 'wrong' });
    const unknownUser = await login({ username: 'nobody', password: 'whatever' });

    expect(unknownUser.status).toBe(wrongPassword.status);
    expect(await unknownUser.text()).toBe(await wrongPassword.text());
  });

  it('falls back to the legacy internal email when no lookup record exists', async () => {
    mockGoogle({ accounts: { 'old@users.mectec.local': 'pw' } });
    const response = await login({ username: 'old', password: 'pw' });

    expect(await response.json()).toEqual({
      ok: true,
      email: 'old@users.mectec.local',
      lookupMissing: true,
    });
  });

  it('rejects malformed usernames without calling Google', async () => {
    const calls = mockGoogle({});
    for (const username of ['', 'a', 'has space', '../admins/x', 'x'.repeat(31), 'a@b.co', 5]) {
      expect((await login({ username, password: 'pw' })).status).toBe(401);
    }
    expect((await login({ username: 'sam', password: '' })).status).toBe(401);
    expect(calls.lookups).toHaveLength(0);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('rejects unparseable bodies', async () => {
    mockGoogle({});
    expect((await login('not json')).status).toBe(400);
  });

  it('is throttled per IP and per username before touching Google', async () => {
    mockGoogle({});
    const blocked = await login(
      { username: 'sam', password: 'pw' },
      { LOGIN_LIMITER_IP: limiter(true), LOGIN_LIMITER_USER: limiter(false) },
      { 'cf-connecting-ip': '203.0.113.9' },
    );
    expect(blocked.status).toBe(429);
    expect(blocked.headers.get('retry-after')).toBe('60');
    expect(fetch).not.toHaveBeenCalled();

    const ipLimiter = limiter(false);
    const byIp = await login(
      { username: 'sam', password: 'pw' },
      { LOGIN_LIMITER_IP: ipLimiter },
      { 'cf-connecting-ip': '203.0.113.9' },
    );
    expect(byIp.status).toBe(429);
    expect(ipLimiter.limit).toHaveBeenCalledWith({ key: 'ip:203.0.113.9' });
  });

  it('fails open if a limiter itself errors', async () => {
    mockGoogle({ accounts: { 'xyz@users.mectec.local': 'pw' } });
    const broken: RateLimiter = { limit: vi.fn().mockRejectedValue(new Error('down')) };
    const response = await login({ username: 'xyz', password: 'pw' }, { LOGIN_LIMITER_USER: broken });
    expect(response.status).toBe(200);
  });

  it('passes Firebase throttling through as 429', async () => {
    mockGoogle({ users: { sam: 'sam@example.com' }, identityError: 'TOO_MANY_ATTEMPTS_TRY_LATER' });
    expect((await login({ username: 'sam', password: 'pw' })).status).toBe(429);
  });

  it('reports a setup problem as unavailable, not as a wrong password', async () => {
    mockGoogle({ users: { sam: 'sam@example.com' }, identityError: 'API_KEY_INVALID' });
    const response = await login({ username: 'sam', password: 'pw' });
    expect(response.status).toBe(503);
    expect((await response.json()).error).toMatch(/email address/);
  });

  it('is unavailable (not open) when the resolver is not configured', async () => {
    // Fresh module so no resolver token cached by earlier tests is reused.
    vi.resetModules();
    const { default: freshWorker } = await import('./index');
    mockGoogle({});
    const response = await freshWorker.fetch(
      new Request('https://worker.example/auth/login', {
        method: 'POST',
        headers: { origin: ORIGIN, 'content-type': 'application/json' },
        body: JSON.stringify({ username: 'sam', password: 'pw' }),
      }),
      { ...baseEnv, RESOLVER_PASSWORD: undefined },
    );
    expect(response.status).toBe(503);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('reuses the resolver session instead of signing in on every request', async () => {
    const calls = mockGoogle({ users: { sam: 'sam@example.com' }, accounts: { 'sam@example.com': 'pw' } });
    // Module-level cache may already hold a token from an earlier test.
    await login({ username: 'sam', password: 'pw' });
    const before = calls.resolverSignIns;
    await login({ username: 'sam', password: 'pw' });
    await login({ username: 'sam', password: 'pw' });
    expect(calls.resolverSignIns).toBe(before);
  });

  it('refuses requests from origins that are not allow-listed', async () => {
    mockGoogle({});
    const response = await login({ username: 'sam', password: 'pw' }, {}, { origin: 'https://evil.example' });
    expect(response.status).toBe(403);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('never logs the password', async () => {
    mockGoogle({ users: { sam: 'sam@example.com' }, identityError: 'API_KEY_INVALID' });
    await login({ username: 'sam', password: 'super-secret-pw' });
    expect(JSON.stringify((console.error as unknown as ReturnType<typeof vi.fn>).mock.calls)).not.toContain(
      'super-secret-pw',
    );
  });
});

describe('GET /health', () => {
  it('reports whether username sign-in and throttles are configured', async () => {
    const response = await worker.fetch(
      new Request('https://worker.example/health', { headers: { origin: ORIGIN } }),
      { ...baseEnv, UPLOAD_LIMITER_USER: limiter(true), UPLOAD_LIMITER_IP: limiter(true) },
    );
    const body = await response.json();
    expect(body.usernameSignIn).toBe(true);
    expect(body.rateLimiting).toEqual({ upload: true, login: false });
  });
});

describe('POST /upload throttling', () => {
  async function signedToken() {
    const pair = await crypto.subtle.generateKey(
      { name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
      true,
      ['sign', 'verify'],
    );
    const jwk = { ...(await crypto.subtle.exportKey('jwk', pair.publicKey)), kid: 'test-kid' };
    const b64 = (value: unknown) =>
      btoa(JSON.stringify(value)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
    const now = Math.floor(Date.now() / 1000);
    const signingInput =
      b64({ alg: 'RS256', kid: 'test-kid', typ: 'JWT' }) +
      '.' +
      b64({
        aud: PROJECT,
        iss: `https://securetoken.google.com/${PROJECT}`,
        sub: 'customer-1',
        exp: now + 3600,
        iat: now,
        auth_time: now,
      });
    const signature = new Uint8Array(
      await crypto.subtle.sign('RSASSA-PKCS1-v1_5', pair.privateKey, new TextEncoder().encode(signingInput)),
    );
    const sig = btoa(String.fromCharCode(...signature)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
    return { token: `${signingInput}.${sig}`, jwk };
  }

  it('returns 429 for a valid user over the limit, before any provider work', async () => {
    const { token, jwk } = await signedToken();
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      if (String(input).includes('securetoken@system.gserviceaccount.com')) return jsonResponse({ keys: [jwk] });
      throw new Error('Unexpected fetch: ' + String(input));
    });
    vi.stubGlobal('fetch', fetchMock);

    const userLimiter = limiter(false);
    const form = new FormData();
    form.set('purpose', 'request');
    form.set('file', new File([new Uint8Array([0xff, 0xd8, 0xff])], 'a.jpg', { type: 'image/jpeg' }));

    const response = await worker.fetch(
      new Request('https://worker.example/upload', {
        method: 'POST',
        headers: { origin: ORIGIN, authorization: `Bearer ${token}` },
        body: form,
      }),
      { ...baseEnv, UPLOAD_LIMITER_USER: userLimiter, UPLOAD_LIMITER_IP: limiter(true) },
    );

    expect(response.status).toBe(429);
    expect(userLimiter.limit).toHaveBeenCalledWith({ key: 'uid:customer-1' });
    // Only the JWKS lookup happened: no Firestore settings read, no image host call.
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
