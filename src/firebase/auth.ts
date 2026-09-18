import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth';
import { app } from './config';

export const auth = getAuth(app);

/** Keeps the admin signed in across browser restarts. */
void setPersistence(auth, browserLocalPersistence);
