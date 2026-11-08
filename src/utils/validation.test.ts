import { describe, expect, it } from 'vitest';
import {
  contactSchema,
  loginSchema,
  nullable,
  nullableNumber,
  projectRequestSchema,
} from './validation';
import {
  COMPLEXITY_OPTIONS,
  CONTACT_METHODS,
  PROJECT_TYPES,
  URGENCY_OPTIONS,
} from '../constants/requestOptions';
import { PROJECT_CATEGORIES } from '../constants/categories';

/** A request that satisfies every rule; each test changes one thing. */
const validRequest = () => ({
  fullName: 'Ali Khan',
  email: 'ali@example.com',
  preferredContactMethod: CONTACT_METHODS[0],
  projectTitle: 'Smart dustbin',
  projectCategory: PROJECT_CATEGORIES[0],
  projectType: PROJECT_TYPES[0],
  projectDescription: 'A dustbin that opens its lid when a hand is near it.',
  complexity: COMPLEXITY_OPTIONS[0],
  urgency: URGENCY_OPTIONS[0],
  agreeToTerms: true,
  allowContact: true,
});

function errorsFor(input: unknown): Record<string, string> {
  const result = projectRequestSchema.safeParse(input);
  if (result.success) return {};
  const out: Record<string, string> = {};
  for (const issue of result.error.issues) out[issue.path.join('.')] = issue.message;
  return out;
}

describe('projectRequestSchema', () => {
  it('accepts a complete valid request and fills defaults', () => {
    const result = projectRequestSchema.safeParse(validRequest());
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.sensors).toEqual([]);
      expect(result.data.requiresMobileApp).toBe(false);
      expect(result.data.referenceLinks).toEqual([]);
    }
  });

  it('requires both consent boxes with a helpful message', () => {
    const errors = errorsFor({ ...validRequest(), agreeToTerms: false, allowContact: false });
    expect(errors.agreeToTerms).toBe('Please accept the terms before submitting.');
    expect(errors.allowContact).toBe('We need your permission to reply to this request.');
  });

  it('rejects a bad email and a too-short description', () => {
    const errors = errorsFor({ ...validRequest(), email: 'nope', projectDescription: 'short' });
    expect(errors.email).toBe('Enter a valid email address.');
    expect(errors.projectDescription).toMatch(/at least 30/);
  });

  it('rejects the honeypot when it is filled in', () => {
    expect(errorsFor({ ...validRequest(), website: 'http://spam.example' }).website).toBeDefined();
    expect(errorsFor({ ...validRequest(), website: '' }).website).toBeUndefined();
  });

  it('needs a WhatsApp or phone number when that contact method is chosen', () => {
    expect(
      errorsFor({ ...validRequest(), preferredContactMethod: 'WhatsApp' }).whatsapp,
    ).toMatch(/WhatsApp number/);
    expect(errorsFor({ ...validRequest(), preferredContactMethod: 'Phone' }).phone).toMatch(
      /phone number/,
    );
    expect(
      errorsFor({ ...validRequest(), preferredContactMethod: 'Phone', phone: '+92 301 5168091' })
        .phone,
    ).toBeUndefined();
  });

  it('rejects a deadline before the start date', () => {
    const errors = errorsFor({
      ...validRequest(),
      desiredStartDate: '2026-12-10',
      desiredDeadline: '2026-12-01',
    });
    expect(errors.desiredDeadline).toBe('The deadline cannot be before the start date.');
  });

  it('asks what hardware/code exists when the box is ticked', () => {
    const errors = errorsFor({
      ...validRequest(),
      hasExistingHardware: true,
      hasExistingCode: true,
    });
    expect(errors.existingHardwareDescription).toBeDefined();
    expect(errors.existingCodeDescription).toBeDefined();
  });

  it('validates reference links but allows blanks', () => {
    expect(errorsFor({ ...validRequest(), referenceLinks: ['', 'https://example.com/x'] })).toEqual({});
    expect(
      Object.keys(errorsFor({ ...validRequest(), referenceLinks: ['not a url'] })).some((key) =>
        key.startsWith('referenceLinks'),
      ),
    ).toBe(true);
  });

  it('accepts quantities as numbers, numeric strings or blank, and rejects zero', () => {
    expect(errorsFor({ ...validRequest(), prototypeQuantity: 3 })).toEqual({});
    expect(errorsFor({ ...validRequest(), prototypeQuantity: '3' })).toEqual({});
    expect(errorsFor({ ...validRequest(), prototypeQuantity: '' })).toEqual({});
    expect(errorsFor({ ...validRequest(), prototypeQuantity: 0 }).prototypeQuantity).toBeDefined();
  });

  it('rejects an option that is not in the list', () => {
    expect(errorsFor({ ...validRequest(), urgency: 'Yesterday' }).urgency).toBeDefined();
  });
});

describe('contactSchema and loginSchema', () => {
  it('accepts a valid contact message and rejects a short one', () => {
    const ok = {
      name: 'Sara',
      email: 'sara@example.com',
      subject: 'Question',
      message: 'I would like to know more about your RFID projects.',
    };
    expect(contactSchema.safeParse(ok).success).toBe(true);
    expect(contactSchema.safeParse({ ...ok, message: 'too short' }).success).toBe(false);
  });

  it('checks login email and password length', () => {
    expect(loginSchema.safeParse({ email: 'a@b.co', password: '123456' }).success).toBe(true);
    expect(loginSchema.safeParse({ email: 'a@b.co', password: '123' }).success).toBe(false);
    expect(loginSchema.safeParse({ email: '', password: '123456' }).success).toBe(false);
  });
});

describe('nullable helpers', () => {
  it('turns blank text into null and trims the rest', () => {
    expect(nullable('')).toBeNull();
    expect(nullable('   ')).toBeNull();
    expect(nullable(undefined)).toBeNull();
    expect(nullable('  hi  ')).toBe('hi');
  });

  it('turns blank or invalid numbers into null', () => {
    expect(nullableNumber('')).toBeNull();
    expect(nullableNumber(undefined)).toBeNull();
    expect(nullableNumber('abc')).toBeNull();
    expect(nullableNumber('5')).toBe(5);
    expect(nullableNumber(7)).toBe(7);
  });
});
