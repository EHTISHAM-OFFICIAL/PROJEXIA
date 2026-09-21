import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  updatePassword,
  type User,
} from 'firebase/auth';
import { auth } from '../firebase/auth';
import { db } from '../firebase/firestore';
import type { UserProfile } from '../types/user';

const USERS_COLLECTION = 'users';
const INTERNAL_EMAIL_DOMAIN = 'users.mectec.local';
const usernamePattern = /^[a-z0-9_-]{3,30}$/;

export function normalizeUsername(value: string): string {
  return value.trim().toLowerCase();
}

function authEmailForUsername(username: string): string {
  return `${normalizeUsername(username)}@${INTERNAL_EMAIL_DOMAIN}`;
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
  recoveryEmail?: string,
): Promise<User> {
  const username = normalizeUsername(usernameInput);
  const usernameError = validateUsername(username);
  if (usernameError) throw new Error(usernameError);

  const normalizedRecoveryEmail = recoveryEmail?.trim().toLowerCase() || null;
  const credential = await createUserWithEmailAndPassword(
    auth,
    authEmailForUsername(username),
    password,
  );

  try {
    await setDoc(doc(db, USERS_COLLECTION, credential.user.uid), {
      uid: credential.user.uid,
      username,
      recoveryEmail: normalizedRecoveryEmail,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return credential.user;
  } catch (error) {
    try {
      await deleteUser(credential.user);
    } catch {
      // Best-effort cleanup if the profile write fails.
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
    const credential = await signInWithEmailAndPassword(
      auth,
      authEmailForUsername(username),
      password,
    );
    return credential.user;
  } catch {
    // Keep the same message for unknown usernames and wrong passwords.
    // Firebase Auth can additionally provide email-enumeration protection.
    throw new Error('Invalid username or password.');
  }
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
