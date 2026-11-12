/**
 * Pure helpers for scripts/migrate-request-privacy.mjs, kept separate so they
 * can be unit tested without touching Firestore.
 */

const MAX_NOTES_LENGTH = 20000; // must match firestore.rules (requestPrivate)

/**
 * Returns the document to store in requestPrivate/{id} for a request that
 * still carries the old inline `admin` block, or null when there is nothing to
 * move.
 */
export function adminPayloadFrom(requestData) {
  const admin = requestData?.admin;
  if (!admin || typeof admin !== 'object') return null;

  const notes = typeof admin.notes === 'string' ? admin.notes : null;
  if (notes !== null && notes.length > MAX_NOTES_LENGTH) {
    throw new Error(
      `admin.notes is ${notes.length} characters; requestPrivate allows ${MAX_NOTES_LENGTH}. ` +
        'Shorten the note in the Firebase Console, then re-run.',
    );
  }

  return {
    notes,
    quotedAmount: typeof admin.quotedAmount === 'number' ? admin.quotedAmount : null,
    currency:
      typeof admin.currency === 'string' && admin.currency.trim()
        ? admin.currency.trim().slice(0, 10)
        : 'PKR',
    assignedTo: typeof admin.assignedTo === 'string' ? admin.assignedTo : null,
  };
}

/** True for public status records that still hold a plain-text email. */
export function needsEmailHash(lookupData) {
  return (
    !!lookupData &&
    typeof lookupData.email === 'string' &&
    lookupData.email.length > 0 &&
    typeof lookupData.emailHash !== 'string'
  );
}

/**
 * SHA-256 hex of the trimmed, lower-cased email. Identical to
 * src/utils/emailHash.ts (a test asserts they agree).
 */
export async function emailHash(email) {
  const digest = await globalThis.crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(email.trim().toLowerCase()),
  );
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
}
