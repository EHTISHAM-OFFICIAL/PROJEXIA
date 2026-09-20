import type { Timestamp } from 'firebase/firestore';

type MaybeTimestamp = Timestamp | Date | null | undefined;

function toDate(value: MaybeTimestamp): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof (value as Timestamp).toDate === 'function') return (value as Timestamp).toDate();
  return null;
}

/** "12 March 2026" — used everywhere a date is shown, so formats never drift. */
export function formatDate(value: MaybeTimestamp): string {
  const date = toDate(value);
  if (!date) return '—';
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/** "Mar 2026" — compact variant for cards and tables. */
export function formatShortDate(value: MaybeTimestamp): string {
  const date = toDate(value);
  if (!date) return '—';
  return new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' }).format(date);
}

export function formatDateTime(value: MaybeTimestamp): string {
  const date = toDate(value);
  if (!date) return '—';
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/** ISO date string for <input type="date"> values. */
export function toDateInputValue(value: MaybeTimestamp): string {
  const date = toDate(value);
  if (!date) return '';
  return date.toISOString().slice(0, 10);
}

export function formatCurrency(amount: number | null, currency = 'PKR'): string {
  if (amount === null || Number.isNaN(amount)) return '—';
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** "1.2k" for large counts, otherwise the plain number. */
export function formatCompactNumber(value: number): string {
  if (value < 1000) return String(value);
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(
    value
  );
}

export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}
