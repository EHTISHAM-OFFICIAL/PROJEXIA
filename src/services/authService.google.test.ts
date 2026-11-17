import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  setCustomParameters: vi.fn(),
  signInWithPopup: vi.fn(),
  signInWithRedirect: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  GoogleAuthProvider: class { setCustomParameters = mocks.setCustomParameters; },
  onAuthStateChanged: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  signInWithPopup: mocks.signInWithPopup,
  signInWithRedirect: mocks.signInWithRedirect,
  signOut: vi.fn(),
}));
vi.mock('firebase/firestore', () => ({ doc: vi.fn(), getDoc: vi.fn() }));
vi.mock('../firebase/auth', () => ({ auth: { current: true } }));
vi.mock('../firebase/firestore', () => ({ COLLECTIONS: { admins: 'admins' }, db: {} }));

import { authService } from './authService';

describe('authService.signInWithGoogle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.signInWithPopup.mockResolvedValue({ user: { uid: 'google-user' } });
    mocks.signInWithRedirect.mockResolvedValue(undefined);
  });

  it('opens Firebase Google sign-in with an explicit account chooser', async () => {
    await authService.signInWithGoogle();

    expect(mocks.setCustomParameters).toHaveBeenCalledWith({ prompt: 'select_account' });
    expect(mocks.signInWithPopup).toHaveBeenCalledWith({ current: true }, expect.any(Object));
  });

  it('falls back to redirect when the browser blocks popups', async () => {
    mocks.signInWithPopup.mockRejectedValue(Object.assign(new Error('blocked'), { code: 'auth/popup-blocked' }));

    await authService.signInWithGoogle();

    expect(mocks.signInWithRedirect).toHaveBeenCalledWith(
      { current: true },
      expect.any(Object),
    );
  });

  it('propagates other Firebase popup errors so the UI can explain them', async () => {
    mocks.signInWithPopup.mockRejectedValue(Object.assign(new Error('blocked'), { code: 'auth/popup-blocked' }));
    await expect(authService.signInWithGoogle()).rejects.toMatchObject({ code: 'auth/popup-blocked' });
  });
});
