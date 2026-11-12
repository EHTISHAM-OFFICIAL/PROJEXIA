/**
 * SHA-256 (hex) of the trimmed, lower-cased email.
 *
 * The public tracking record stores this instead of the address, so a visitor
 * who only knows a request number cannot read the customer's email. The
 * algorithm must stay stable: existing lookup records were written with it.
 */
export async function hashEmail(email: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(email.trim().toLowerCase()),
  );
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('');
}
