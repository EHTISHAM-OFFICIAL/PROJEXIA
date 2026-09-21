const STORAGE_KEY = 'mectec-tracked-request';

export interface TrackedRequest {
  requestNumber: string;
  email: string;
  projectTitle: string;
  savedAt: string;
}

/**
 * Deliberately local-only (never sent anywhere) — this just lets a visitor's
 * own browser remember their own reference number, so "track my request"
 * can show up for them specifically after they submit one, rather than
 * being advertised in the footer to every visitor regardless of whether
 * they've ever submitted anything.
 */
export function saveTrackedRequest(input: Omit<TrackedRequest, 'savedAt'>): void {
  try {
    const record: TrackedRequest = { ...input, savedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage unavailable — the confirmation screen's own link still works.
  }
}

export function getTrackedRequest(): TrackedRequest | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TrackedRequest) : null;
  } catch {
    return null;
  }
}

export function clearTrackedRequest(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to do if storage is unavailable.
  }
}
