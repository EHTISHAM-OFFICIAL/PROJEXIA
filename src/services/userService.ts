import { doc, getDoc, serverTimestamp, setDoc, writeBatch } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  deleteUser,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  type User,
} from 'firebase/auth';
import { auth } from '../firebase/auth';
import { db } from '../firebase/firestore';
import type { UserProfile } from '../types/user';

const USERS_COLLECTION = 'users';
const USERNAME_LOOKUP_COLLECTION = 'usernameLookup';
const INTERNAL_EMAIL_DOMAIN = 'users.mectec.local';
const usernamePattern = /^[a-z0-9_-]{3,30}$/;

export function normalizeUsername(value: string): string {
  return value.trim().toLowerCase();
}

function authEmailForLegacyUsername(username: string): string {
  return `${normalizeUsername(username)}@${INTERNAL_EMAIL_DOMAIN}`;
}

function usernameLookupRef(username: string) {
  return doc(db, USERNAME_LOOKUP_COLLECTION, normalizeUsername(username));
}

export function validateUsername(value: string): string | null {
  const username = normalizeUsername(value);

  if (!usernamePattern.test(username)) {
    return 'Username must be 3–30 characters and use only letters, numbers, hyphens, or underscores.';
  }

  return null;
}

export async function registerUser(
  usernameInput: string,
  password: string,
  accountEmailInput: string,
): Promise<User> {
  const username = normalizeUsername(usernameInput);
  const usernameError = validateUsername(username);
  if (usernameError) throw new Error(usernameError);

  const accountEmail = accountEmailInput.trim().toLowerCase();
  if (!accountEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(accountEmail)) {
    throw new Error('Enter a valid email address.');
  }

  const credential = await createUserWithEmailAndPassword(
    auth,
    accountEmail,
    password,
  );

  try {
    // One atomic write. The rules refuse the username lookup if it already
    // exists, so two people can never claim the same username, and a failure
    // cannot leave a profile without a lookup (or the reverse).
    const batch = writeBatch(db);
    batch.set(doc(db, USERS_COLLECTION, credential.user.uid), {
      uid: credential.user.uid,
      username,
      recoveryEmail: accountEmail,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    batch.set(usernameLookupRef(username), {
      uid: credential.user.uid,
      authEmail: accountEmail,
      createdAt: serverTimestamp(),
    });
    try {
      await batch.commit();
    } catch {
      throw new Error('Could not create your account. That username may already be in use. Please choose another username.');
    }

    return credential.user;
  } catch (error) {
    try {
      await deleteUser(credential.user);
    } catch {
      // Best-effort cleanup if a profile/username lookup write fails.
    }
    throw error;
  }
}

export async function signInWithUsername(usernameInput: string, password: string): Promise<User> {
  const username = normalizeUsername(usernameInput);
  if (validateUsername(username)) {
    throw new Error('Invalid username or password.');
  }

  try {
    const lookupSnapshot = await getDoc(usernameLookupRef(username));
    const authEmail = lookupSnapshot.exists()
      ? (lookupSnapshot.data().authEmail as string | undefined)
      : authEmailForLegacyUsername(username);

    if (!authEmail) throw new Error('Invalid username or password.');

    const credential = await signInWithEmailAndPassword(auth, authEmail, password);
    const profile = await getUserProfile(credential.user.uid);

    // Accounts created before email became mandatory used an internal Firebase
    // email. On a successful login, migrate that account to its real recovery
    // email so Firebase can provide native password-reset emails.
    if (
      credential.user.email?.endsWith(`@${INTERNAL_EMAIL_DOMAIN}`) &&
      profile?.recoveryEmail &&
      credential.user.email !== profile.recoveryEmail
    ) {
      try {
        await updateEmail(credential.user, profile.recoveryEmail);
      } catch {
        // Login remains valid; a later successful login can retry migration.
      }
    }

    if (!lookupSnapshot.exists() && credential.user.email) {
      try {
        await setDoc(usernameLookupRef(username), {
          uid: credential.user.uid,
          authEmail: credential.user.email,
          createdAt: serverTimestamp(),
        });
      } catch {
        // Lookup creation is an optimization for future username sign-ins.
      }
    }

    return credential.user;
  } catch {
    throw new Error('Invalid username or password.');
  }
}

export async function sendCustomerPasswordReset(accountEmailInput: string): Promise<void> {
  const accountEmail = accountEmailInput.trim().toLowerCase();
  if (!accountEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(accountEmail)) {
    throw new Error('Enter a valid email address.');
  }

  await sendPasswordResetEmail(auth, accountEmail);
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snapshot = await getDoc(doc(db, USERS_COLLECTION, uid));
  if (!snapshot.exists()) return null;

  const data = snapshot.data();

  return {
    uid,
    username: typeof data.username === 'string' ? data.username : '',
    recoveryEmail: typeof data.recoveryEmail === 'string' ? data.recoveryEmail : null,
    createdAt: data.createdAt ?? null,
    updatedAt: data.updatedAt ?? null,
  };
}

export async function changePassword(user: User, password: string): Promise<void> {
  await updatePassword(user, password);
}
