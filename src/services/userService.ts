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
import { getGatewayUrl } from './imgbbService';

const USERS_COLLECTION = 'users';
const USERNAME_LOOKUP_COLLECTION = 'usernameLookup';
const INTERNAL_EMAIL_DOMAIN = 'users.mectec.local';
const usernamePattern = /^[a-z0-9_-]{3,30}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INVALID_LOGIN = 'Invalid username or password.';

export function normalizeUsername(value: string): string {
  return value.trim().toLowerCase();
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

/**
 * Asks the Worker to resolve a username to its sign-in email. The Worker checks
 * the password first and only then returns the email, so usernames cannot be
 * turned into email addresses by anyone who does not hold the password. The
 * username -> email mapping is no longer readable from the browser.
 */
async function resolveUsernameSignIn(
  username: string,
  password: string,
): Promise<{ email: string; lookupMissing: boolean }> {
  const workerUrl = await getGatewayUrl();
  if (!workerUrl) {
    throw new Error('Username sign-in is unavailable right now. Sign in with your email address instead.');
  }

  let response: Response;
  try {
    response = await fetch(`${workerUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  } catch {
    throw new Error('Could not reach the sign-in service. Sign in with your email address instead.');
  }

  const payload = (await response.json().catch(() => null)) as {
    ok?: boolean;
    email?: unknown;
    lookupMissing?: unknown;
    error?: unknown;
  } | null;

  if (response.ok && payload?.ok && typeof payload.email === 'string') {
    return { email: payload.email, lookupMissing: payload.lookupMissing === true };
  }
  if (response.status === 401) throw new Error(INVALID_LOGIN);

  throw new Error(
    typeof payload?.error === 'string' && payload.error
      ? payload.error
      : 'Sign-in is temporarily unavailable. Try again, or sign in with your email address.',
  );
}

/**
 * Signs a customer in with a username or an email address.
 *
 * An email goes straight to Firebase. A username goes through the Worker (see
 * resolveUsernameSignIn). Firebase's own failure messages are collapsed into one
 * generic error so the form never reveals which half of a login was wrong.
 */
export async function signInWithUsername(identifierInput: string, password: string): Promise<User> {
  const identifier = identifierInput.trim();
  if (!identifier || !password) throw new Error(INVALID_LOGIN);

  let authEmail: string;
  let username: string | null = null;
  let lookupMissing = false;

  if (identifier.includes('@')) {
    if (!emailPattern.test(identifier)) throw new Error(INVALID_LOGIN);
    authEmail = identifier.toLowerCase();
  } else {
    username = normalizeUsername(identifier);
    if (validateUsername(username)) throw new Error(INVALID_LOGIN);
    ({ email: authEmail, lookupMissing } = await resolveUsernameSignIn(username, password));
  }

  try {
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

    // The Worker reports when this username has no lookup record yet. Create it
    // (the owner may write their own) so the record reflects the final email.
    if (username && lookupMissing && credential.user.email) {
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
    throw new Error(INVALID_LOGIN);
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
