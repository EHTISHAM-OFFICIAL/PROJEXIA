/**
 * Built-in project categories. Custom categories are stored in Firestore's
 * projectLibrary collection; this list provides reliable defaults/fallbacks.
 */
export const PROJECT_CATEGORIES = [
  'Arduino',
  'Automation',
  'Electronics',
  'Embedded Systems',
  'ESP32',
  'IoT',
  'Robotics',
  'Sensors',
  'Smart Home',
  'Other',
] as const;

/** Sort alphabetically, while keeping the catch-all category at the end. */
export function sortProjectCategories(categories: Iterable<string>): string[] {
  const unique = new Map<string, string>();
  for (const rawCategory of categories) {
    const category = rawCategory.trim();
    if (!category) continue;
    const key = category.toLocaleLowerCase();
    if (!unique.has(key)) unique.set(key, category);
  }

  return [...unique.values()].sort((a, b) => {
    const aOther = /^(other|others)$/i.test(a);
    const bOther = /^(other|others)$/i.test(b);
    if (aOther !== bOther) return aOther ? 1 : -1;
    return a.localeCompare(b, undefined, { sensitivity: 'base' });
  });
}

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
