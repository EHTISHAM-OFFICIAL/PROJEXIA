import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  signInWithEmailAndPassword: vi.fn(),
  updateEmail: vi.fn(),
  getDoc: vi.fn(),
  setDoc: vi.fn(),
  getGatewayUrl: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: vi.fn(),
  deleteUser: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
  signInWithEmailAndPassword: mocks.signInWithEmailAndPassword,
  updateEmail: mocks.updateEmail,
  updatePassword: vi.fn(),
}));
vi.mock('firebase/firestore', () => ({
  doc: vi.fn((_db: unknown, ...path: string[]) => ({ path: path.join('/') })),
  getDoc: mocks.getDoc,
  serverTimestamp: vi.fn(() => 'SERVER_TS'),
  setDoc: mocks.setDoc,
  writeBatch: vi.fn(),
}));
vi.mock('../firebase/auth', () => ({ auth: {} }));
vi.mock('../firebase/firestore', () => ({ db: {} }));
vi.mock('./imgbbService', () => ({ getGatewayUrl: mocks.getGatewayUrl }));

import { signInWithUsername } from './userService';

const user = { uid: 'u1', email: 'sam@example.com' };

function workerReplies(status: number, body: unknown) {
  const fetchMock = vi.fn().mockResolvedValue(
    new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } }),
  );
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

beforeEach(() => {
  vi.unstubAllGlobals();
  Object.values(mocks).forEach((mock) => mock.mockReset());
  mocks.getGatewayUrl.mockResolvedValue('https://gateway.example');
  mocks.signInWithEmailAndPassword.mockResolvedValue({ user });
  mocks.getDoc.mockResolvedValue({ exists: () => false });
});

describe('signInWithUsername', () => {
  it('signs in with an email address directly, without calling the Worker', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    await signInWithUsername('  Sam@Example.com ', 'pw');

    expect(fetchMock).not.toHaveBeenCalled();
    expect(mocks.signInWithEmailAndPassword).toHaveBeenCalledWith({}, 'sam@example.com', 'pw');
  });

  it('never reads the usernameLookup collection from the browser', async () => {
    workerReplies(200, { ok: true, email: 'sam@example.com', lookupMissing: false });
    await signInWithUsername('sam', 'pw');

    const paths = mocks.getDoc.mock.calls.map(([ref]) => (ref as { path: string }).path);
    expect(paths.some((path) => path.startsWith('usernameLookup'))).toBe(false);
  });

  it('sends the username and password to the Worker, then signs in with the email it returns', async () => {
    const fetchMock = workerReplies(200, { ok: true, email: 'sam@example.com', lookupMissing: false });

    await signInWithUsername(' Sam ', 'pw');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://gateway.example/auth/login',
      expect.objectContaining({ method: 'POST', body: JSON.stringify({ username: 'sam', password: 'pw' }) }),
    );
    expect(mocks.signInWithEmailAndPassword).toHaveBeenCalledWith({}, 'sam@example.com', 'pw');
  });

  it('creates the lookup record when the Worker says it is missing', async () => {
    workerReplies(200, { ok: true, email: 'old@users.mectec.local', lookupMissing: true });
    mocks.signInWithEmailAndPassword.mockResolvedValue({ user: { uid: 'u1', email: 'sam@example.com' } });

    await signInWithUsername('sam', 'pw');

    expect(mocks.setDoc).toHaveBeenCalledWith(
      { path: 'usernameLookup/sam' },
      { uid: 'u1', authEmail: 'sam@example.com', createdAt: 'SERVER_TS' },
    );
  });

  it('does not rewrite the lookup record on a normal login', async () => {
    workerReplies(200, { ok: true, email: 'sam@example.com', lookupMissing: false });
    await signInWithUsername('sam', 'pw');
    expect(mocks.setDoc).not.toHaveBeenCalled();
  });

  it('maps a 401 to the generic invalid-credentials message', async () => {
    workerReplies(401, { ok: false, error: 'Invalid username or password.' });
    await expect(signInWithUsername('sam', 'bad')).rejects.toThrow('Invalid username or password.');
    expect(mocks.signInWithEmailAndPassword).not.toHaveBeenCalled();
  });

  it('shows the Worker message for throttling and outages', async () => {
    workerReplies(429, { ok: false, error: 'Too many sign-in attempts. Wait a minute and try again.' });
    await expect(signInWithUsername('sam', 'pw')).rejects.toThrow(/Too many sign-in attempts/);

    workerReplies(503, { ok: false, error: 'Username sign-in is temporarily unavailable.' });
    await expect(signInWithUsername('sam', 'pw')).rejects.toThrow(/temporarily unavailable/);
  });

  it('points to email sign-in when the Worker is unreachable or not configured', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('network')));
    await expect(signInWithUsername('sam', 'pw')).rejects.toThrow(/email address/);

    mocks.getGatewayUrl.mockResolvedValue(null);
    await expect(signInWithUsername('sam', 'pw')).rejects.toThrow(/email address/);
  });

  it('rejects malformed input without any network call', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    for (const [identifier, password] of [['', 'pw'], ['sam', ''], ['a', 'pw'], ['not an email@', 'pw'], ['../x', 'pw']]) {
      await expect(signInWithUsername(identifier, password)).rejects.toThrow('Invalid username or password.');
    }
    expect(fetchMock).not.toHaveBeenCalled();
    expect(mocks.signInWithEmailAndPassword).not.toHaveBeenCalled();
  });

  it('collapses Firebase sign-in failures into the generic message', async () => {
    mocks.signInWithEmailAndPassword.mockRejectedValue(Object.assign(new Error('x'), { code: 'auth/wrong-password' }));
    await expect(signInWithUsername('sam@example.com', 'pw')).rejects.toThrow('Invalid username or password.');
  });
});
