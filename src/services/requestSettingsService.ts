import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { COLLECTIONS, db } from '../firebase/firestore';

export const DEFAULT_CUSTOMER_REQUEST_EDIT_WINDOW_HOURS = 24;
export const MIN_CUSTOMER_REQUEST_EDIT_WINDOW_HOURS = 1;
export const MAX_CUSTOMER_REQUEST_EDIT_WINDOW_HOURS = 720;

const settingsRef = doc(db, COLLECTIONS.settings, 'requestSecurity');

export interface RequestSecuritySettings {
  customerRequestEditWindowHours: number;
}

function normalizeHours(value: unknown): number {
  if (typeof value !== 'number' || !Number.isInteger(value)) {
    return DEFAULT_CUSTOMER_REQUEST_EDIT_WINDOW_HOURS;
  }

  return Math.min(
    MAX_CUSTOMER_REQUEST_EDIT_WINDOW_HOURS,
    Math.max(MIN_CUSTOMER_REQUEST_EDIT_WINDOW_HOURS, value),
  );
}

export const requestSettingsService = {
  async getSecuritySettings(): Promise<RequestSecuritySettings> {
    try {
      const snapshot = await getDoc(settingsRef);
      if (!snapshot.exists()) {
        return { customerRequestEditWindowHours: DEFAULT_CUSTOMER_REQUEST_EDIT_WINDOW_HOURS };
      }

      return {
        customerRequestEditWindowHours: normalizeHours(
          snapshot.data().customerRequestEditWindowHours,
        ),
      };
    } catch {
      return { customerRequestEditWindowHours: DEFAULT_CUSTOMER_REQUEST_EDIT_WINDOW_HOURS };
    }
  },

  async saveSecuritySettings(settings: RequestSecuritySettings): Promise<void> {
    const hours = normalizeHours(settings.customerRequestEditWindowHours);

    await setDoc(
      settingsRef,
      {
        customerRequestEditWindowHours: hours,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  },
};
