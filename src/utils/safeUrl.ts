/**
 * Customers control reference links and attachment URLs, and administrators
 * click them. React does not block `javascript:` or `data:` URLs in `href`, so
 * every customer-supplied URL must pass through here before it is rendered as
 * a link. Firestore rules cannot validate items inside a list, which makes this
 * check the only enforcement point.
 *
 * Returns the normalised URL when it is http(s), otherwise null. Parsing first
 * means tricks such as "JaVaScRiPt:" or embedded tabs/newlines are judged by
 * the browser's own interpretation of the scheme.
 */
export function safeHttpUrl(
  value: unknown,
  options: { httpsOnly?: boolean } = {},
): string | null {
  if (typeof value !== 'string') return null;

  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 2048) return null;

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return null;
  }

  if (url.protocol === 'https:') return url.toString();
  if (url.protocol === 'http:' && !options.httpsOnly) return url.toString();
  return null;
}
