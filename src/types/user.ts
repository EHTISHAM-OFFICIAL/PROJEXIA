import type { Timestamp } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  username: string;
  recoveryEmail: string | null;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}
