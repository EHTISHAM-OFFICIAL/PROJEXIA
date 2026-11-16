describe('customer username and account lifecycle', () => {
  async function seedAliceProfile() {
    const db = as(ALICE);
    const batch = writeBatch(db);
    batch.set(doc(db, 'users', ALICE), {
      uid: ALICE,
      username: 'alice',
      recoveryEmail: 'alice@example.com',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    batch.set(doc(db, 'usernameChangeLimits', ALICE), {
      uid: ALICE,
      change1At: null,
      change2At: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    await assertSucceeds(batch.commit());
  }

  async function renameAlice(nextUsername: string) {
    const db = as(ALICE);
    const batch = writeBatch(db);
    batch.delete(doc(db, 'usernameLookup', 'alice'));
    batch.set(doc(db, 'usernameLookup', nextUsername), {
      uid: ALICE,
      authEmail: 'alice@example.com',
      createdAt: serverTimestamp(),
    });
    batch.update(doc(db, 'users', ALICE), {
      username: nextUsername,
      updatedAt: serverTimestamp(),
    });
    batch.update(doc(db, 'usernameChangeLimits', ALICE), {
      change1At: serverTimestamp(),
      change2At: null,
      updatedAt: serverTimestamp(),
    });
    await batch.commit();
  }

  it('creates the customer profile, lookup and empty quota record together', async () => {
    await seedAliceProfile();
    await assertSucceeds(getDoc(doc(as(ALICE), 'users', ALICE)));
    await assertSucceeds(getDoc(doc(as(ALICE), 'usernameChangeLimits', ALICE)));
    await assertFails(getDoc(doc(as(BOB), 'usernameChangeLimits', ALICE)));
    await assertFails(getDocs(collection(as(ALICE), 'usernameChangeLimits')));
  });

  it('allows two username changes in the rolling 30-day window and rejects a third', async () => {
    await seedAliceProfile();

    await renameAlice('alice-one');
    // The second rename uses the current username mapping and keeps the first
    // timestamp in slot one while writing the second timestamp in slot two.
    const db = as(ALICE);
    const second = writeBatch(db);
    second.delete(doc(db, 'usernameLookup', 'alice-one'));
    second.set(doc(db, 'usernameLookup', 'alice-two'), {
      uid: ALICE, authEmail: 'alice@example.com', createdAt: serverTimestamp(),
    });
    second.update(doc(db, 'users', ALICE), {
      username: 'alice-two', updatedAt: serverTimestamp(),
    });
    const quota = await getDoc(doc(db, 'usernameChangeLimits', ALICE));
    second.update(doc(db, 'usernameChangeLimits', ALICE), {
      change1At: quota.data()?.change1At,
      change2At: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    await assertSucceeds(second.commit());

    const third = writeBatch(db);
    third.delete(doc(db, 'usernameLookup', 'alice-two'));
    third.set(doc(db, 'usernameLookup', 'alice-three'), {
      uid: ALICE, authEmail: 'alice@example.com', createdAt: serverTimestamp(),
    });
    third.update(doc(db, 'users', ALICE), {
      username: 'alice-three', updatedAt: serverTimestamp(),
    });
    third.update(doc(db, 'usernameChangeLimits', ALICE), {
      change1At: quota.data()?.change1At,
      change2At: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    await assertFails(third.commit());
  });

  it('does not allow a quota timestamp to be changed without a matching username change', async () => {
    await seedAliceProfile();
    await assertFails(updateDoc(doc(as(ALICE), 'usernameChangeLimits', ALICE), {
      change1At: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }));
  });

  it('allows profile and username cleanup while preserving quota and request history', async () => {
    await seedAliceProfile();
    const db = as(ALICE);
    const batch = writeBatch(db);
    batch.delete(doc(db, 'users', ALICE));
    batch.delete(doc(db, 'usernameLookup', 'alice'));
    await assertSucceeds(batch.commit());

    await assertSucceeds(getDoc(doc(as(ALICE), 'usernameChangeLimits', ALICE)));
    await assertFails(deleteDoc(doc(as(ALICE), 'usernameChangeLimits', ALICE)));
    await assertSucceeds(getDoc(doc(as(ADMIN), 'projectRequests', REQUEST_ID)));
    await assertSucceeds(getDoc(doc(anon(), 'requestStatusLookup', REQUEST_NUMBER)));
  });
});

