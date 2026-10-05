import { getFirestore } from 'firebase/firestore';
import { app } from './config';

export const db = getFirestore(app);

/** Collection names live here so no string literal is repeated across services. */
export const COLLECTIONS = {
  projects: 'projects',
  projectRequests: 'projectRequests',
  contactMessages: 'contactMessages',
  meetingRequests: 'meetingRequests',
  admins: 'admins',
  settings: 'settings',
} as const;
