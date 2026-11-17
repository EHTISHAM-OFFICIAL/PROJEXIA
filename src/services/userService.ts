import { doc, getDoc, serverTimestamp, setDoc, writeBatch } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  type User,
} from 'firebase/auth';
import { auth } from '../firebase/auth';
import { db } from '../firebase/firestore';
import type { UserProfile } from '../types/user';
import { getUsernameAuthGatewayUrl } from './usernameAuthService';

const USERS_COLLECTION = 'users';
const USERNAME_LOOKUP_COLLECTION = 'usernameLookup';
const INTERNAL_EMAIL_DOMAIN = 'users.mectec.local';
const USERNAME_CHANGE_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;
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

function timestampDate(value: UserProfile['usernameChange1At']): Date | null {
  if (!value || typeof value.toDate !== 'function') return null;
  return value.toDate();
}

/** The UI status is advisory; Firestore rules enforce the same rolling 30-day quota. */
export function getUsernameChangeStatus(
  profile: Pick<UserProfile, 'usernameChange1At' | 'usernameChange2At'> | null,
  now = Date.now(),
): { used: number; remaining: number; availableAt: Date | null } {
  if (!profile) return { used: 0, remaining: 2, availableAt: null };
  const cutoff = now - USERNAME_CHANGE_WINDOW_MS;
  const activeChanges = [
    timestampDate(profile.usernameChange1At),
    timestampDate(profile.usernameChange2At),
  ]
    .filter((value): value is Date => Boolean(value && value.getTime() > cutoff))
    .sort((a, b) => a.getTime() - b.getTime());

  return {
    used: activeChanges.length,
    remaining: Math.max(0, 2 - activeChanges.length),
    availableAt:
      activeChanges.length >= 2
        ? new Date(activeChanges[0].getTime() + USERNAME_CHANGE_WINDOW_MS)
        : null,
  };
}

export async function changeUsername(user: User, usernameInput: string): Promise<void> {
  const username = normalizeUsername(usernameInput);
  const usernameError = validateUsername(username);
  if (usernameError) throw new Error(usernameError);

  const profileRef = doc(db, USERS_COLLECTION, user.uid);
  const quotaRef = doc(db, 'usernameChangeLimits', user.uid);
  const profileSnapshot = await getDoc(profileRef);
  if (!profileSnapshot.exists()) {
    throw new Error('Your account profile could not be found. Refresh your account details and try again.');
  }

  const data = profileSnapshot.data();
  const currentUsername = typeof data.username === 'string' ? data.username : '';
  if (!currentUsername) throw new Error('Your current username is missing. Please contact support before changing it.');
  if (username === currentUsername.toLowerCase()) throw new Error('That is already your current username.');

  const quotaSnapshot = await getDoc(quotaRef);
  const quota = quotaSnapshot.exists() ? quotaSnapshot.data() : null;
  const history = {
    usernameChange1At: quota?.change1At ?? null,
    usernameChange2At: quota?.change2At ?? null,
  };
  const status = getUsernameChangeStatus(history);
  if (status.remaining <= 0) {
    throw new Error(
      status.availableAt
        ? 'You can change your username only twice in a 30-day period. Your next change is available on ' +
            status.availableAt.toLocaleDateString() +
            '.'
        : 'You can change your username only twice in a 30-day period.',
    );
  }

  const firstDate = timestampDate(history.usernameChange1At);
  const secondDate = timestampDate(history.usernameChange2At);
  const cutoff = Date.now() - USERNAME_CHANGE_WINDOW_MS;
  const firstIsActive = Boolean(firstDate && firstDate.getTime() > cutoff);
  const secondIsActive = Boolean(secondDate && secondDate.getTime() > cutoff);

  const batch = writeBatch(db);
  batch.delete(usernameLookupRef(currentUsername));
  batch.set(usernameLookupRef(username), {
    uid: user.uid,
    authEmail: user.email,
    createdAt: serverTimestamp(),
  });

  if (!quotaSnapshot.exists()) {
    // Legacy accounts get their first quota record atomically with their first
    // username change. The security rules require this to accompany a real rename.
    batch.set(quotaRef, {
      uid: user.uid,
      change1At: serverTimestamp(),
      change2At: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } else {
    let nextFirst: unknown;
    let nextSecond: unknown;
    if (!firstIsActive) {
      if (secondIsActive && history.usernameChange2At) {
        nextFirst = history.usernameChange2At;
        nextSecond = serverTimestamp();
      } else {
        nextFirst = serverTimestamp();
        nextSecond = null;
      }
    } else {
      nextFirst = history.usernameChange1At;
      nextSecond = serverTimestamp();
    }
    batch.update(quotaRef, {
      change1At: nextFirst,
      change2At: nextSecond,
      updatedAt: serverTimestamp(),
    });
  }

  batch.update(profileRef, { username, updatedAt: serverTimestamp() });

  try {
    await batch.commit();
  } catch (error) {
    const code = error && typeof error === 'object' && 'code' in error ? String(error.code) : '';
    if (code.includes('permission-denied')) {
      throw new Error('This username is unavailable, or your account has reached its 30-day change limit. Check the username and try again.');
    }
    throw new Error('Your username could not be changed. It may already be in use, or your account details may have changed. Please try again.');
  }
}

export async function deleteCustomerAccount(user: User, password: string): Promise<void> {
  if (!user.email) throw new Error('This account has no sign-in email. Please contact support to complete account deletion.');

  // Firebase requires a recent sign-in for permanent account deletion.
  const credential = EmailAuthProvider.credential(user.email, password);
  try {
    await reauthenticateWithCredential(user, credential);
  } catch {
    throw new Error('Your password could not be verified. Check it and try again.');
  }

  const profileRef = doc(db, USERS_COLLECTION, user.uid);
  const quotaRef = doc(db, 'usernameChangeLimits', user.uid);
  const profileSnapshot = await getDoc(profileRef);
  if (!profileSnapshot.exists()) {
    throw new Error('Your account profile could not be found. Please contact support so the account can be removed safely.');
  }

  const profileData = profileSnapshot.data();
  const username = typeof profileData.username === 'string' ? profileData.username : '';
  if (!username) throw new Error('Your username record is missing. Please contact support so the account can be removed safely.');

  // Keep only the minimal uid + timestamps quota record so deleting/recreating
  // a profile cannot reset the 30-day username-change limit. It contains no
  // username or email. Project requests and status history are left untouched.
  const quotaSnapshot = await getDoc(quotaRef);
  const cleanup = writeBatch(db);
  cleanup.delete(profileRef);
  cleanup.delete(usernameLookupRef(username));
  if (!quotaSnapshot.exists()) {
    // Legacy accounts receive an empty quota record in the same batch as deletion.
    cleanup.set(quotaRef, {
      uid: user.uid,
      change1At: null,
      change2At: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
  await cleanup.commit();

  try {
    await deleteUser(user);
  } catch (error) {
    // If Firebase Auth deletion fails, restore the profile and lookup so the
    // customer is not left with a working login but no username/profile.
    try {
      const restore = writeBatch(db);
      restore.set(profileRef, profileData);
      restore.set(usernameLookupRef(username), {
        uid: user.uid,
        authEmail: user.email,
        createdAt: serverTimestamp(),
      });
      await restore.commit();
    } catch {
      throw new Error('Firebase could not finish deleting the sign-in account, and the profile could not be restored automatically. Please contact PROJEXIAHUB support.');
    }
    const code = error && typeof error === 'object' && 'code' in error ? String(error.code) : '';
    if (code.includes('requires-recent-login')) {
      throw new Error('For security, sign in again and repeat the account deletion.');
    }
    throw new Error('Your account could not be deleted right now. Your profile has been restored; please try again.');
  }
}

/**
 * Creates the standard customer records for a first-time Google sign-in.
 * The initial username is derived from the Firebase UID, making collisions
 * exceptionally unlikely while keeping the normal username-change flow intact.
 */
export async function ensureGoogleUserProfile(user: User): Promise<void> {
  const profileRef = doc(db, USERS_COLLECTION, user.uid);
  const existing = await getDoc(profileRef);
  if (existing.exists()) return;

  const authEmail = user.email?.trim();
  const recoveryEmail = authEmail?.toLowerCase();
  if (!authEmail || !recoveryEmail || !emailPattern.test(recoveryEmail)) {
    throw new Error('Google did not provide a usable email address. Check your Google account settings and try again.');
  }

  const uidPart = user.uid.toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 23);
  const username = `google_${uidPart}`;
  const batch = writeBatch(db);
  batch.set(profileRef, {
    uid: user.uid,
    username,
    recoveryEmail,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  batch.set(doc(db, 'usernameChangeLimits', user.uid), {
    uid: user.uid,
    change1At: null,
    change2At: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  batch.set(usernameLookupRef(username), {
    uid: user.uid,
    authEmail,
    createdAt: serverTimestamp(),
  });
  await batch.commit();
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
  if (!accountEmail || !emailPattern.test(accountEmail)) {
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
    batch.set(doc(db, 'usernameChangeLimits', credential.user.uid), {
      uid: credential.user.uid,
      change1At: null,
      change2At: null,
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
  const workerUrl = await getUsernameAuthGatewayUrl();
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
  if (!accountEmail || !emailPattern.test(accountEmail)) {
    throw new Error('Enter a valid email address.');
  }

  await sendPasswordResetEmail(auth, accountEmail);
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const [snapshot, quotaSnapshot] = await Promise.all([
    getDoc(doc(db, USERS_COLLECTION, uid)),
    getDoc(doc(db, 'usernameChangeLimits', uid)),
  ]);
  if (!snapshot.exists()) return null;

  const data = snapshot.data();
  const quota = quotaSnapshot.exists() ? quotaSnapshot.data() : null;

  return {
    uid,
    username: typeof data.username === 'string' ? data.username : '',
    recoveryEmail: typeof data.recoveryEmail === 'string' ? data.recoveryEmail : null,
    createdAt: data.createdAt ?? null,
    updatedAt: data.updatedAt ?? null,
    usernameChange1At: quota?.change1At ?? null,
    usernameChange2At: quota?.change2At ?? null,
  };
}

export async function changePassword(user: User, password: string): Promise<void> {
  await updatePassword(user, password);
}
