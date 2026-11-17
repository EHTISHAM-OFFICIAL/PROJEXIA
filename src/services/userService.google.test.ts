import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  getDoc: vi.fn(),
  doc: vi.fn((_db: unknown, ...path: string[]) => ({ path: path.join('/') })),
  set: vi.fn(),
  commit: vi.fn(),
  writeBatch: vi.fn(),
  serverTimestamp: vi.fn(() => 'SERVER_TIMESTAMP'),
}));

vi.mock('firebase/firestore', () => ({
  doc: mocks.doc,
  getDoc: mocks.getDoc,
  serverTimestamp: mocks.serverTimestamp,
  writeBatch: mocks.writeBatch,
  setDoc: vi.fn(),
}));
vi.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: vi.fn(),
  deleteUser: vi.fn(),
  EmailAuthProvider: { credential: vi.fn() },
  reauthenticateWithCredential: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  updateEmail: vi.fn(),
  updatePassword: vi.fn(),
}));
vi.mock('../firebase/auth', () => ({ auth: {} }));
vi.mock('../firebase/firestore', () => ({ db: {} }));
vi.mock('./usernameAuthService', () => ({ getUsernameAuthGatewayUrl: vi.fn() }));

import { ensureGoogleUserProfile } from './userService';

describe('ensureGoogleUserProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getDoc.mockResolvedValue({ exists: () => false });
    mocks.writeBatch.mockReturnValue({ set: mocks.set, commit: mocks.commit });
    mocks.commit.mockResolvedValue(undefined);
  });

  it('creates the standard profile, username lookup and quota records for a Google user', async () => {
    await ensureGoogleUserProfile({ uid: 'AbCdEf123456789012345678', email: 'Person@Example.com' } as never);

    expect(mocks.set).toHaveBeenCalledTimes(3);
    expect(mocks.set).toHaveBeenCalledWith(
      { path: 'users/AbCdEf123456789012345678' },
      expect.objectContaining({
        uid: 'AbCdEf123456789012345678',
        username: 'google_abcdef12345678901234567',
        recoveryEmail: 'person@example.com',
      }),
    );
    expect(mocks.set).toHaveBeenCalledWith(
      { path: 'usernameLookup/google_abcdef12345678901234567' },
      expect.objectContaining({ uid: 'AbCdEf123456789012345678', authEmail: 'person@example.com' }),
    );
    expect(mocks.set).toHaveBeenCalledWith(
      { path: 'usernameChangeLimits/AbCdEf123456789012345678' },
      expect.objectContaining({ uid: 'AbCdEf123456789012345678', change1At: null, change2At: null }),
    );
    expect(mocks.commit).toHaveBeenCalledOnce();
  });

  it('does not overwrite an existing customer profile', async () => {
    mocks.getDoc.mockResolvedValue({ exists: () => true });

    await ensureGoogleUserProfile({ uid: 'existing-user', email: 'person@example.com' } as never);

    expect(mocks.writeBatch).not.toHaveBeenCalled();
  });

  it('refuses to create an incomplete profile when Google provides no valid email', async () => {
    await expect(ensureGoogleUserProfile({ uid: 'new-user', email: null } as never))
      .rejects.toThrow(/usable email address/);
    expect(mocks.writeBatch).not.toHaveBeenCalled();
  });
});
