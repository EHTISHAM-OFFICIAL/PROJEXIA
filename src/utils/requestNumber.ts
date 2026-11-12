/**
 * Public request references and project tokens.
 *
 * The request number doubles as the lookup key for the public "track my
 * request" page, so it is effectively a bearer secret: anyone holding it can
 * read the narrow `requestStatusLookup` record. It must therefore be
 * unguessable, which is why the random part is 10 characters.
 *
 *   31 symbols ^ 10 characters = 8.2e14 combinations (~49.5 bits)
 *
 * The earlier 6-character format had only ~8.9e8 combinations (~29.7 bits) and
 * mapped random bytes with `byte % 31`, which slightly favours the first
 * symbols. Characters are now drawn with rejection sampling so every symbol is
 * equally likely.
 *
 * Numbers issued in the old format (6 characters) stay valid: see
 * REQUEST_NUMBER_PATTERN.
 */

/** 31 symbols; no 0/O, 1/I/L look-alikes. */
export const REQUEST_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

export const REQUEST_SUFFIX_LENGTH = 10;
export const PROJECT_TOKEN_SUFFIX_LENGTH = 6;

/** Accepts both the legacy 6-character and the current 10-character format. */
export const REQUEST_NUMBER_PATTERN = /^PROJEXIA-\d{4}-[A-Z0-9]{6,12}$/;

/**
 * Returns `length` characters from `alphabet`, each chosen uniformly using the
 * browser CSPRNG. Bytes at or above the largest multiple of the alphabet size
 * are discarded, which removes modulo bias.
 */
export function randomFromAlphabet(
  length: number,
  alphabet: string = REQUEST_ALPHABET,
): string {
  if (!Number.isInteger(length) || length < 1) {
    throw new RangeError('length must be a positive integer');
  }
  if (alphabet.length < 2 || alphabet.length > 256) {
    throw new RangeError('alphabet must contain between 2 and 256 symbols');
  }

  const limit = 256 - (256 % alphabet.length);
  let result = '';

  while (result.length < length) {
    // Over-request so a rejection rarely forces another round trip. The Web
    // Crypto API refuses more than 65,536 bytes per call, so cap the chunk.
    const bytes = crypto.getRandomValues(
      new Uint8Array(Math.min((length - result.length) * 2, 65_536)),
    );
    for (const byte of bytes) {
      if (byte >= limit) continue;
      result += alphabet[byte % alphabet.length];
      if (result.length === length) break;
    }
  }

  return result;
}

/** e.g. PROJEXIA-2026-K4T9RQ2MWH */
export function generateRequestNumber(now: Date = new Date()): string {
  return `PROJEXIA-${now.getFullYear()}-${randomFromAlphabet(REQUEST_SUFFIX_LENGTH)}`;
}

/**
 * Short code the customer keeps and the admin types to confirm a trash action.
 * It is a deliberate human check, not a secret, so it stays short.
 */
export function generateProjectToken(now: Date = new Date()): string {
  return `PROJEXIA-${now.getFullYear()}-${randomFromAlphabet(PROJECT_TOKEN_SUFFIX_LENGTH)}`;
}

export function normalizeRequestNumber(value: string): string {
  return value.trim().toUpperCase();
}

export function isValidRequestNumber(value: string): boolean {
  return REQUEST_NUMBER_PATTERN.test(normalizeRequestNumber(value));
}
