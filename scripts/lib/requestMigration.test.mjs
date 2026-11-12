import { describe, expect, it } from 'vitest';
import { hashEmail } from '../../src/utils/emailHash';
import { adminPayloadFrom, emailHash, needsEmailHash } from './requestMigration.mjs';

describe('adminPayloadFrom', () => {
  it('returns null when the request has no inline admin block', () => {
    expect(adminPayloadFrom({})).toBeNull();
    expect(adminPayloadFrom({ admin: null })).toBeNull();
    expect(adminPayloadFrom(undefined)).toBeNull();
  });

  it('copies the known fields and defaults the rest', () => {
    expect(
      adminPayloadFrom({
        admin: { notes: 'call back', quotedAmount: 4500, currency: 'USD', assignedTo: 'sam' },
      }),
    ).toEqual({ notes: 'call back', quotedAmount: 4500, currency: 'USD', assignedTo: 'sam' });

    expect(adminPayloadFrom({ admin: {} })).toEqual({
      notes: null,
      quotedAmount: null,
      currency: 'PKR',
      assignedTo: null,
    });
  });

  it('ignores values of the wrong type instead of copying them', () => {
    expect(
      adminPayloadFrom({ admin: { notes: 5, quotedAmount: '100', currency: '', assignedTo: {} } }),
    ).toEqual({ notes: null, quotedAmount: null, currency: 'PKR', assignedTo: null });
  });

  it('refuses notes the new rules would reject, rather than truncating them', () => {
    expect(() => adminPayloadFrom({ admin: { notes: 'x'.repeat(20001) } })).toThrow(/20000/);
  });
});

describe('needsEmailHash', () => {
  it('flags legacy plain-email lookup records only', () => {
    expect(needsEmailHash({ email: 'a@b.co' })).toBe(true);
    expect(needsEmailHash({ email: 'a@b.co', emailHash: 'x'.repeat(64) })).toBe(false);
    expect(needsEmailHash({ emailHash: 'x'.repeat(64) })).toBe(false);
    expect(needsEmailHash({})).toBe(false);
    expect(needsEmailHash(undefined)).toBe(false);
  });
});

describe('emailHash', () => {
  it('matches the application implementation exactly', async () => {
    for (const value of ['Customer@Example.com', '  spaced@example.com ', 'ünï@example.pk']) {
      expect(await emailHash(value)).toBe(await hashEmail(value));
    }
  });

  it('is a 64-character hex digest', async () => {
    expect(await emailHash('a@b.co')).toMatch(/^[0-9a-f]{64}$/);
  });
});
