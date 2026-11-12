import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  REQUEST_ALPHABET,
  generateProjectToken,
  generateRequestNumber,
  isValidRequestNumber,
  normalizeRequestNumber,
  randomFromAlphabet,
} from './requestNumber';

afterEach(() => vi.restoreAllMocks());

describe('generateRequestNumber', () => {
  it('uses the PROJEXIA-<year>-<10 chars> format', () => {
    const value = generateRequestNumber(new Date('2026-11-11T00:00:00Z'));
    expect(value).toMatch(/^PROJEXIA-2026-[A-Z2-9]{10}$/);
  });

  it('only uses the unambiguous alphabet', () => {
    for (let i = 0; i < 200; i += 1) {
      const suffix = generateRequestNumber().split('-')[2];
      for (const char of suffix) expect(REQUEST_ALPHABET).toContain(char);
    }
    expect(REQUEST_ALPHABET).not.toMatch(/[01OIL]/);
    expect(REQUEST_ALPHABET).toHaveLength(31);
  });

  it('does not repeat across many calls', () => {
    const seen = new Set(Array.from({ length: 5000 }, () => generateRequestNumber()));
    expect(seen.size).toBe(5000);
  });

  it('passes its own validity check', () => {
    expect(isValidRequestNumber(generateRequestNumber())).toBe(true);
  });
});

describe('generateProjectToken', () => {
  it('keeps the short admin-confirmation format', () => {
    expect(generateProjectToken(new Date('2026-01-01T00:00:00Z'))).toMatch(
      /^PROJEXIA-2026-[A-Z2-9]{6}$/,
    );
  });
});

describe('randomFromAlphabet', () => {
  it('discards bytes that would cause modulo bias', () => {
    // 256 % 31 = 8, so bytes 248..255 must be rejected.
    const biased = new Uint8Array(2).fill(255);
    const clean = Uint8Array.from([0, 1]);
    const spy = vi
      .spyOn(crypto, 'getRandomValues')
      .mockImplementationOnce((array) => {
        (array as Uint8Array).set(new Uint8Array((array as Uint8Array).length).fill(255));
        return array;
      })
      .mockImplementationOnce((array) => {
        (array as Uint8Array).set(
          Uint8Array.from({ length: (array as Uint8Array).length }, (_, i) => i % 2),
        );
        return array;
      });

    const value = randomFromAlphabet(2);
    expect(value).toBe('AB');
    expect(spy).toHaveBeenCalledTimes(2);
    expect(biased.every((b) => b >= 248)).toBe(true);
    expect(clean).toHaveLength(2);
  });

  it('is close to uniform across the alphabet', () => {
    const counts = new Map<string, number>();
    const total = 31 * 2000;
    for (const char of randomFromAlphabet(total)) {
      counts.set(char, (counts.get(char) ?? 0) + 1);
    }
    expect(counts.size).toBe(31);
    for (const count of counts.values()) {
      // Expected 2000 per symbol; +/-15% is ~7 standard deviations wide.
      expect(count).toBeGreaterThan(1700);
      expect(count).toBeLessThan(2300);
    }
  });

  it('rejects invalid arguments', () => {
    expect(() => randomFromAlphabet(0)).toThrow(RangeError);
    expect(() => randomFromAlphabet(5, 'A')).toThrow(RangeError);
  });
});

describe('request number validation', () => {
  it('accepts legacy 6-character numbers so existing requests keep working', () => {
    expect(isValidRequestNumber('PROJEXIA-2025-K4T9RQ')).toBe(true);
  });

  it('normalises case and whitespace', () => {
    expect(normalizeRequestNumber('  projexia-2026-abc234  ')).toBe('PROJEXIA-2026-ABC234');
  });

  it('rejects malformed values', () => {
    expect(isValidRequestNumber('')).toBe(false);
    expect(isValidRequestNumber('PROJEXIA-26-ABCDEF')).toBe(false);
    expect(isValidRequestNumber('OTHER-2026-ABCDEF')).toBe(false);
    expect(isValidRequestNumber('PROJEXIA-2026-ABC')).toBe(false);
    expect(isValidRequestNumber('../projectRequests/abc')).toBe(false);
  });
});
