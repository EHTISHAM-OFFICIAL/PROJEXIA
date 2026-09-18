/** Converts a title into a URL-safe slug: "Smart Water Monitor!" -> "smart-water-monitor" */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Appends a short suffix so a colliding slug can still be saved. */
export function withSlugSuffix(slug: string): string {
  return `${slug}-${Math.random().toString(36).slice(2, 6)}`;
}
