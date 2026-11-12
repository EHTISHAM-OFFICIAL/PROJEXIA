/**
 * Security-rules tests. They run against the Firestore emulator, so they are
 * excluded from `npm test` and run with `npm run test:rules` (needs Java).
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import {
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  collection,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest';

let env: RulesTestEnvironment;

const ALICE = 'alice';
const BOB = 'bob';
const ADMIN = 'admin1';
const RESOLVER = 'resolver1';
const REQUEST_ID = 'req1';
const REQUEST_NUMBER = 'PROJEXIA-2026-K4T9RQ2MWH';
const HASH = 'a'.repeat(64);

const as = (uid: string, email = `${uid}@example.com`) =>
  env.authenticatedContext(uid, { email }).firestore();
const anon = () => env.unauthenticatedContext().firestore();

/** Mirrors the document requestService.createRequest writes. */
function newRequest(overrides: Record<string, unknown> = {}) {
  return {
    requestNumber: REQUEST_NUMBER,
    ownerUid: ALICE,
    status: 'new',
    priority: 'normal',
    contact: {
      fullName: 'Alice', email: 'alice@example.com', phone: null, whatsapp: null,
      country: 'PK', city: 'Rawalpindi', preferredContactMethod: 'Email',
    },
    project: { title: 'Weather station', category: 'IoT', type: 'Prototype', purpose: 'Learning', description: 'A small station.' },
    technical: { preferredPlatforms: [], connectivity: [], sensors: [], outputs: [], powerSource: null, powerRequirements: null },
    software: { requiresMobileApp: false, requiresWebDashboard: false, requiresCloudDatabase: false, requiresNotifications: false, requiresRemoteControl: false, notes: null, languages: [] },
    scale: { complexity: 'Simple', prototypeQuantity: 1, estimatedQuantity: null, deploymentEnvironment: null },
    budget: { range: null, notes: null },
    timeline: { desiredStartDate: null, desiredDeadline: null, flexibility: null, urgency: null },
    references: { links: [], description: null },
    attachments: [],
    additionalRequirements: {
      specialRequirements: null, additionalNotes: null, consultationRequired: false,
      hasExistingHardware: false, existingHardwareDescription: null, hasExistingCode: false, existingCodeDescription: null,
    },
    consent: { agreeToTerms: true, allowContact: true },
    customerUpdate: null,
    customerUpdateAt: null,
    metadata: { source: 'web', userAgent: 'test', createdFrom: 'request-form' },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    ...overrides,
  };
}

function newLookup(overrides: Record<string, unknown> = {}) {
  return {
    requestNumber: REQUEST_NUMBER, requestId: REQUEST_ID, status: 'new', projectTitle: 'Weather station',
    emailHash: HASH, createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
    customerUpdate: null, customerUpdateAt: null, deletedAt: null,
    ...overrides,
  };
}

beforeAll(async () => {
  env = await initializeTestEnvironment({
    projectId: 'demo-projexia',
    firestore: { rules: readFileSync(resolve(process.cwd(), 'firestore.rules'), 'utf8') },
  });
});
afterAll(async () => env.cleanup());

beforeEach(async () => {
  await env.clearFirestore();
  await env.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();
    await setDoc(doc(db, 'admins', ADMIN), { role: 'admin' });
    await setDoc(doc(db, 'resolvers', RESOLVER), { purpose: 'worker' });
    await setDoc(doc(db, 'projectRequests', REQUEST_ID), {
      requestNumber: REQUEST_NUMBER, ownerUid: ALICE, status: 'new', priority: 'normal',
      project: { title: 'Weather station' }, deletedAt: null,
    });
    await setDoc(doc(db, 'requestPrivate', REQUEST_ID), { notes: 'internal', quotedAmount: 5000, currency: 'PKR', assignedTo: null });
    await setDoc(doc(db, 'requestStatusLookup', REQUEST_NUMBER), { requestNumber: REQUEST_NUMBER, requestId: REQUEST_ID, status: 'new', projectTitle: 'Weather station', emailHash: HASH });
    await setDoc(doc(db, 'usernameLookup', 'alice'), { uid: ALICE, authEmail: 'alice@example.com' });
  });
});

describe('internal request data (requestPrivate)', () => {
  it('is not readable by the customer who owns the request', async () => {
    await assertFails(getDoc(doc(as(ALICE), 'requestPrivate', REQUEST_ID)));
  });
  it('is not readable by other customers or visitors', async () => {
    await assertFails(getDoc(doc(as(BOB), 'requestPrivate', REQUEST_ID)));
    await assertFails(getDoc(doc(anon(), 'requestPrivate', REQUEST_ID)));
  });
  it('is readable and writable by an admin', async () => {
    await assertSucceeds(getDoc(doc(as(ADMIN), 'requestPrivate', REQUEST_ID)));
    await assertSucceeds(setDoc(doc(as(ADMIN), 'requestPrivate', REQUEST_ID), { notes: 'x', quotedAmount: 10, currency: 'PKR', assignedTo: null, updatedAt: serverTimestamp() }, { merge: true }));
  });
  it('rejects unknown fields and oversized notes from an admin', async () => {
    await assertFails(setDoc(doc(as(ADMIN), 'requestPrivate', 'r2'), { notes: 'x', secret: 1 }));
    await assertFails(setDoc(doc(as(ADMIN), 'requestPrivate', 'r2'), { notes: 'x'.repeat(20001) }));
  });
  it('cannot be written by a customer', async () => {
    await assertFails(setDoc(doc(as(ALICE), 'requestPrivate', REQUEST_ID), { notes: 'mine' }));
  });
  it('can be deleted by the owner only together with their own customer-deleted request', async () => {
    await env.withSecurityRulesDisabled((c) =>
      updateDoc(doc(c.firestore(), 'projectRequests', REQUEST_ID), { deletedAt: new Date(), deletedBy: 'customer' }),
    );
    const db = as(ALICE);
    await assertFails(deleteDoc(doc(db, 'requestPrivate', REQUEST_ID))); // on its own: no
    const batch = writeBatch(db);
    batch.delete(doc(db, 'projectRequests', REQUEST_ID));
    batch.delete(doc(db, 'requestPrivate', REQUEST_ID));
    await assertSucceeds(batch.commit());
  });
  it('cannot be deleted by a different customer', async () => {
    const db = as(BOB);
    const batch = writeBatch(db);
    batch.delete(doc(db, 'requestPrivate', REQUEST_ID));
    await assertFails(batch.commit());
  });
});

describe('projectRequests', () => {
  it('lets the owner read their request but not another customer', async () => {
    await assertSucceeds(getDoc(doc(as(ALICE), 'projectRequests', REQUEST_ID)));
    await assertFails(getDoc(doc(as(BOB), 'projectRequests', REQUEST_ID)));
    await assertFails(getDoc(doc(anon(), 'projectRequests', REQUEST_ID)));
  });
  it('accepts a well-formed new request', async () => {
    await assertSucceeds(setDoc(doc(as(ALICE), 'projectRequests', 'new1'), newRequest()));
  });
  it('rejects a request with an admin block or any unknown top-level field', async () => {
    await assertFails(setDoc(doc(as(ALICE), 'projectRequests', 'n2'), newRequest({ admin: { notes: 'x' } })));
    await assertFails(setDoc(doc(as(ALICE), 'projectRequests', 'n3'), newRequest({ junk: 'x'.repeat(1000) })));
  });
  it('rejects unknown keys inside nested maps', async () => {
    const base = newRequest();
    await assertFails(setDoc(doc(as(ALICE), 'projectRequests', 'n4'), newRequest({ contact: { ...(base.contact as object), extra: 1 } })));
    await assertFails(setDoc(doc(as(ALICE), 'projectRequests', 'n5'), newRequest({ metadata: { source: 'web', evil: 'x' } })));
  });
  it('rejects a pre-reviewed status, a pre-filled customer update, or missing consent', async () => {
    await assertFails(setDoc(doc(as(ALICE), 'projectRequests', 'n6'), newRequest({ status: 'completed' })));
    await assertFails(setDoc(doc(as(ALICE), 'projectRequests', 'n7'), newRequest({ customerUpdate: 'Approved' })));
    await assertFails(setDoc(doc(as(ALICE), 'projectRequests', 'n8'), newRequest({ consent: { agreeToTerms: false, allowContact: true } })));
  });
  it('rejects creating a request for someone else or without signing in', async () => {
    await assertFails(setDoc(doc(as(BOB), 'projectRequests', 'n9'), newRequest()));
    await assertFails(setDoc(doc(anon(), 'projectRequests', 'n10'), newRequest()));
  });
  it('rejects oversized free text and too many reference links', async () => {
    await assertFails(setDoc(doc(as(ALICE), 'projectRequests', 'n11'), newRequest({ project: { title: 't', category: 'c', type: 't', purpose: 'p', description: 'x'.repeat(10001) } })));
    await assertFails(setDoc(doc(as(ALICE), 'projectRequests', 'n12'), newRequest({ references: { links: Array.from({ length: 21 }, (_, i) => `https://e.co/${i}`), description: null } })));
  });
  it('accepts the school-model variant', async () => {
    await assertSucceeds(
      setDoc(doc(as(ALICE), 'projectRequests', 'school1'), newRequest({
        serviceType: 'school-model', projectToken: 'PROJEXIA-2026-ABC234',
        schoolModel: { itemId: 'i', slug: 's', category: 'c', modelFormat: 'f', interaction: 'i' },
      })),
    );
  });
});

describe('requestStatusLookup', () => {
  it('can be read by anyone who knows the request number, but never listed', async () => {
    await assertSucceeds(getDoc(doc(anon(), 'requestStatusLookup', REQUEST_NUMBER)));
    await assertFails(getDocs(collection(anon(), 'requestStatusLookup')));
  });
  it('can be created by the owner of the matching request', async () => {
    await env.withSecurityRulesDisabled((c) => setDoc(doc(c.firestore(), 'projectRequests', 'r5'), { requestNumber: 'PROJEXIA-2026-ZZZZZZZZZZ', ownerUid: ALICE }));
    await assertSucceeds(setDoc(doc(as(ALICE), 'requestStatusLookup', 'PROJEXIA-2026-ZZZZZZZZZZ'), newLookup({ requestNumber: 'PROJEXIA-2026-ZZZZZZZZZZ', requestId: 'r5' })));
  });
  it('cannot be created anonymously', async () => {
    await assertFails(setDoc(doc(anon(), 'requestStatusLookup', 'PROJEXIA-2026-AAAAAAAAAA'), newLookup({ requestNumber: 'PROJEXIA-2026-AAAAAAAAAA' })));
  });
  it("cannot be created for someone else's request or under a different number", async () => {
    await assertFails(setDoc(doc(as(BOB), 'requestStatusLookup', 'PROJEXIA-2026-BBBBBBBBBB'), newLookup({ requestNumber: 'PROJEXIA-2026-BBBBBBBBBB' })));
    await assertFails(setDoc(doc(as(ALICE), 'requestStatusLookup', 'PROJEXIA-2026-CCCCCCCCCC'), newLookup({ requestNumber: 'PROJEXIA-2026-CCCCCCCCCC' })));
  });
  it('cannot store a plain email or extra fields', async () => {
    await env.withSecurityRulesDisabled((c) => setDoc(doc(c.firestore(), 'projectRequests', 'r6'), { requestNumber: 'PROJEXIA-2026-DDDDDDDDDD', ownerUid: ALICE }));
    await assertFails(setDoc(doc(as(ALICE), 'requestStatusLookup', 'PROJEXIA-2026-DDDDDDDDDD'), newLookup({ requestNumber: 'PROJEXIA-2026-DDDDDDDDDD', requestId: 'r6', email: 'alice@example.com' })));
  });
});

describe('usernameLookup', () => {
  it('is not readable by visitors or by customers (including its own owner)', async () => {
    await assertFails(getDoc(doc(anon(), 'usernameLookup', 'alice')));
    await assertFails(getDoc(doc(as(ALICE), 'usernameLookup', 'alice')));
    await assertFails(getDoc(doc(as(BOB), 'usernameLookup', 'alice')));
  });
  it('is readable by the resolver account, but the collection cannot be listed', async () => {
    await assertSucceeds(getDoc(doc(as(RESOLVER), 'usernameLookup', 'alice')));
    await assertFails(getDocs(collection(as(RESOLVER), 'usernameLookup')));
  });
  it('can still be created for yourself with your own email', async () => {
    await assertSucceeds(setDoc(doc(as(BOB), 'usernameLookup', 'bob'), { uid: BOB, authEmail: 'bob@example.com', createdAt: serverTimestamp() }));
    await assertFails(setDoc(doc(as(BOB), 'usernameLookup', 'mallory'), { uid: BOB, authEmail: 'someone-else@example.com', createdAt: serverTimestamp() }));
  });
  it('cannot be overwritten by another user', async () => {
    await assertFails(setDoc(doc(as(BOB), 'usernameLookup', 'alice'), { uid: BOB, authEmail: 'bob@example.com', createdAt: serverTimestamp() }));
  });
  it('resolvers cannot be edited or read from a client', async () => {
    await assertFails(getDoc(doc(as(RESOLVER), 'resolvers', RESOLVER)));
    await assertFails(setDoc(doc(as(BOB), 'resolvers', BOB), { purpose: 'x' }));
  });
});

describe('contactMessages', () => {
  const message = (overrides: Record<string, unknown> = {}) => ({
    name: 'Visitor', email: 'v@example.com', subject: 'Hi', message: 'Hello there', read: false, createdAt: serverTimestamp(), ...overrides,
  });
  it('accepts a normal anonymous message', async () => {
    await assertSucceeds(setDoc(doc(anon(), 'contactMessages', 'm1'), message()));
  });
  it('rejects extra fields and a pre-marked read flag', async () => {
    await assertFails(setDoc(doc(anon(), 'contactMessages', 'm2'), message({ payload: 'x'.repeat(5000) })));
    await assertFails(setDoc(doc(anon(), 'contactMessages', 'm3'), message({ read: true })));
  });
  it('cannot be read by visitors', async () => {
    await assertFails(getDoc(doc(anon(), 'contactMessages', 'm1')));
  });
});

describe('settings', () => {
  it('exposes the public status-message copy to visitors only', async () => {
    await env.withSecurityRulesDisabled(async (c) => {
      await setDoc(doc(c.firestore(), 'settings', 'requestStatusMessages'), { new: 'Received' });
      await setDoc(doc(c.firestore(), 'settings', 'private'), { x: 1 });
    });
    await assertSucceeds(getDoc(doc(anon(), 'settings', 'requestStatusMessages')));
    await assertFails(getDoc(doc(anon(), 'settings', 'private')));
  });
});
