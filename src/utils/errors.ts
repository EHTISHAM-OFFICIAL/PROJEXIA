import { FirebaseError } from 'firebase/app';

/**
 * Turns any thrown value into a message safe to show a user.
 * Full error detail still goes to the console for development.
 */
export function toUserMessage(error: unknown, fallback = 'Something went wrong. Please try again.'): string {
  if (import.meta.env.DEV) console.error(error);

  if (error instanceof FirebaseError) {
    const mapped = FIREBASE_ERROR_MESSAGES[error.code];
    if (mapped) return mapped;
    return `${fallback} (${error.code})`;
  }

  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

const FIREBASE_ERROR_MESSAGES: Record<string, string> = {
  'permission-denied': 'You do not have permission to do that.',
  unauthenticated: 'Please sign in and try again.',
  unavailable: 'Cannot reach the server. Check your connection and try again.',
  'not-found': 'That item no longer exists.',
  'resource-exhausted': 'Too many requests right now. Please wait a moment and try again.',
  'auth/invalid-credential': 'Incorrect email or password.',
  'auth/invalid-email': 'That email address is not valid.',
  'auth/user-not-found': 'Incorrect email or password.',
  'auth/wrong-password': 'Incorrect email or password.',
  'auth/too-many-requests': 'Too many sign-in attempts. Please wait a few minutes.',
  'auth/network-request-failed': 'Cannot reach the server. Check your connection.',
  'storage/unauthorized': 'You do not have permission to upload that file.',
  'storage/canceled': 'Upload cancelled.',
  'storage/retry-limit-exceeded': 'Upload timed out. Check your connection and try again.',
};
