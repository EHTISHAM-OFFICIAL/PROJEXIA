import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  GoogleAuthProvider: vi.fn(),
  signInWithPopup: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  GoogleAuthProvider: mocks.GoogleAuthProvider,
  onAuthStateChanged: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  signInWithPopup: mocks.signInWithPopup,
  signOut: vi.fn(),
}));
vi.mock('firebase/firestore', () => ({ doc: vi.fn(), getDoc: vi.fn() }));
vi.mock('../firebase/auth', () => ({ auth: { current: true } }));
vi.mock('../firebase/firestore', () => ({ COLLECTIONS: { admins: 'admins' }, db: {} }));

import { authService } from './authService';

describe('authService.signInWithGoogle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.GoogleAuthProvider.mockImplementation(() => ({ setCustomParameters: vi.fn() }));
    mocks.signInWithPopup.mockResolvedValue({ user: { uid: 'google-user' } });
  });

  it('opens Firebase Google sign-in with an explicit account chooser', async () => {
    await authService.signInWithGoogle();

    const provider = mocks.GoogleAuthProvider.mock.results[0].value;
    expect(provider.setCustomParameters).toHaveBeenCalledWith({ prompt: 'select_account' });
    expect(mocks.signInWithPopup).toHaveBeenCalledWith({ current: true }, provider);
  });

  it('propagates Firebase popup errors so the UI can explain them', async () => {
    mocks.signInWithPopup.mockRejectedValue(Object.assign(new Error('blocked'), { code: 'auth/popup-blocked' }));
    await expect(authService.signInWithGoogle()).rejects.toMatchObject({ code: 'auth/popup-blocked' });
  });
});
