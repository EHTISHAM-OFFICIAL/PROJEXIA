/**
 * Split pasted or typed multi-entry text into separate editor rows.
 * Newlines always separate entries; sentence punctuation separates entries
 * when the next sentence starts with a capital letter or digit.
 */
const ABBREVIATIONS = /\b(?:e\.g|i\.e|etc|Mr|Mrs|Ms|Dr|Prof|vs|No)\./gi;

export function splitEntries(value: string): string[] {
  const protectedValue = value
    .replace(/\r\n?/g, '\n')
    .replace(ABBREVIATIONS, (match) => match.replace(/\./g, '\uE000'));

  return protectedValue
    .split(/\n+|(?<=[.!?])\s+(?=[A-Z0-9])/)
    .map((entry) => entry
      .replace(/\uE000/g, '.')
      .replace(/^\s*(?:[-*•]|\d+[.)])\s+/, '')
      .trim())
    .filter(Boolean);
}
