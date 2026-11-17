import {
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  type User,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth } from '../firebase/auth';
import { COLLECTIONS, db } from '../firebase/firestore';

export const authService = {
  signIn: (email: string, password: string) => signInWithEmailAndPassword(auth, email, password),

  signInWithGoogle: async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      return await signInWithPopup(auth, provider);
    } catch (error) {
      const code = error && typeof error === 'object' && 'code' in error ? String(error.code) : '';
      if (code === 'auth/popup-blocked' || code === 'auth/operation-not-supported-in-this-environment') {
        // Redirect is the supported fallback when a browser cannot open a popup.
        return signInWithRedirect(auth, provider);
      }
      throw error;
    }
  },

  sendPasswordReset: (email: string) => sendPasswordResetEmail(auth, email),

  signOut: () => signOut(auth),

  onAuthChange: (callback: (user: User | null) => void) => onAuthStateChanged(auth, callback),

  /**
   * Admin access is granted by the existence of admins/{uid} in Firestore.
   * This check drives the UI only. The same condition is enforced in
   * firestore.rules and storage.rules, which is where authorisation actually happens.
   */
  async isAdmin(uid: string): Promise<boolean> {
    try {
      const snapshot = await getDoc(doc(db, COLLECTIONS.admins, uid));
      return snapshot.exists();
    } catch {
      return false;
    }
  },
};
