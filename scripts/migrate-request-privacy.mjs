/**
 * One-off migration for the security hardening release.
 *
 *  1. Moves the inline `admin` block (internal notes, quote, assignee) off every
 *     projectRequests document into the admin-only requestPrivate/{id}
 *     document, then removes it from the request so customers can no longer
 *     read it.
 *  2. Replaces plain-text emails in public requestStatusLookup records (created
 *     by the school-model form) with the same SHA-256 emailHash the main form
 *     uses.
 *
 * It is safe to re-run: requests already migrated are skipped, and an existing
 * requestPrivate document is never overwritten.
 *
 * Usage (admin account; dry run by default):
 *   SEED_EMAIL=you@example.com SEED_PASSWORD=secret node scripts/migrate-request-privacy.mjs
 *   SEED_EMAIL=you@example.com SEED_PASSWORD=secret node scripts/migrate-request-privacy.mjs --apply
 *
 * Run it AFTER deploying the new firestore.rules and BEFORE deploying the new
 * site. See SECURITY-MIGRATION.md.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { adminPayloadFrom, emailHash, needsEmailHash } from './lib/requestMigration.mjs';

function loadEnv() {
  const env = {};
  const raw = readFileSync(resolve(process.cwd(), '.env'), 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const index = trimmed.indexOf('=');
    if (index === -1) continue;
    env[trimmed.slice(0, index)] = trimmed.slice(index + 1).replace(/^['"]|['"]$/g, '');
  }
  return env;
}

const apply = process.argv.includes('--apply');
const email = process.env.SEED_EMAIL;
const password = process.env.SEED_PASSWORD;

if (!email || !password) {
  console.error('Set SEED_EMAIL and SEED_PASSWORD to an admin account.');
  process.exit(1);
}

const env = loadEnv();
const app = initializeApp({
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
});
const auth = getAuth(app);
const db = getFirestore(app);

const stats = {
  requests: 0,
  adminMoved: 0,
  adminAlreadyMigrated: 0,
  lookupsHashed: 0,
  failures: [],
};

console.log(apply ? 'APPLYING changes.' : 'DRY RUN: no data will be changed. Re-run with --apply.');
await signInWithEmailAndPassword(auth, email, password);

const snapshot = await getDocs(collection(db, 'projectRequests'));
stats.requests = snapshot.size;

for (const requestDoc of snapshot.docs) {
  const id = requestDoc.id;
  const data = requestDoc.data();

  try {
    // --- 1. admin block -> requestPrivate/{id} ---------------------------
    const payload = adminPayloadFrom(data);
    if (payload) {
      const privateRef = doc(db, 'requestPrivate', id);
      const existing = await getDoc(privateRef);

      if (apply) {
        if (!existing.exists()) {
          await setDoc(privateRef, { ...payload, updatedAt: serverTimestamp() });
        }
        // Confirm the copy exists before deleting the original.
        const verified = await getDoc(privateRef);
        if (!verified.exists()) throw new Error('requestPrivate copy was not created');
        await updateDoc(requestDoc.ref, { admin: deleteField() });
      }
      stats.adminMoved += 1;
      console.log(`${apply ? 'moved' : 'would move'} admin data: ${data.requestNumber ?? id}`);
    } else {
      stats.adminAlreadyMigrated += 1;
    }

    // --- 2. plain email in public lookup record -> emailHash --------------
    if (typeof data.requestNumber === 'string' && data.requestNumber) {
      const lookupRef = doc(db, 'requestStatusLookup', data.requestNumber);
      const lookup = await getDoc(lookupRef);
      if (lookup.exists() && needsEmailHash(lookup.data())) {
        if (apply) {
          await updateDoc(lookupRef, {
            emailHash: await emailHash(lookup.data().email),
            email: deleteField(),
          });
        }
        stats.lookupsHashed += 1;
        console.log(`${apply ? 'hashed' : 'would hash'} lookup email: ${data.requestNumber}`);
      }
    }
  } catch (error) {
    stats.failures.push({ id, requestNumber: data.requestNumber ?? null, error: String(error?.message ?? error) });
    console.error(`FAILED ${data.requestNumber ?? id}: ${error?.message ?? error}`);
  }
}

console.log('\nSummary');
console.log(`  requests scanned:           ${stats.requests}`);
console.log(`  admin data ${apply ? 'moved' : 'to move'}:        ${stats.adminMoved}`);
console.log(`  already migrated:           ${stats.adminAlreadyMigrated}`);
console.log(`  lookup emails ${apply ? 'hashed' : 'to hash'}:     ${stats.lookupsHashed}`);
console.log(`  failures:                   ${stats.failures.length}`);

process.exit(stats.failures.length ? 1 : 0);
