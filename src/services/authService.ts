import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth } from '../firebase/auth';
import { COLLECTIONS, db } from '../firebase/firestore';

export const authService = {
  signIn: (email: string, password: string) => signInWithEmailAndPassword(auth, email, password),

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
