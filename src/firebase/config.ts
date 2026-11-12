import { initializeApp, type FirebaseApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

const REQUIRED_KEYS = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
] as const;

const missing = REQUIRED_KEYS.filter((key) => !import.meta.env[key]);

if (missing.length > 0) {
  throw new Error(
    `Missing Firebase environment variables: ${missing.join(', ')}. ` +
      'Copy .env.example to .env, fill in your Firebase values, then restart the dev server.'
  );
}

export const app: FirebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
});

/**
 * Firebase App Check (optional). It proves requests come from this site rather
 * than a script, which is the control that limits abuse of the endpoints that
 * must stay open to anonymous visitors (the contact form, project view
 * counts). Firestore rules cannot rate-limit; App Check can.
 *
 * Set VITE_RECAPTCHA_SITE_KEY to turn it on, then enforce it for Cloud
 * Firestore in the Firebase Console once the site reports healthy traffic
 * (see SECURITY-MIGRATION.md). Without the key nothing changes.
 */
const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

if (recaptchaSiteKey) {
  if (import.meta.env.DEV) {
    // Prints a debug token to register in the console for local development.
    (self as unknown as { FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean }).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  }
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(recaptchaSiteKey),
    isTokenAutoRefreshEnabled: true,
  });
}
