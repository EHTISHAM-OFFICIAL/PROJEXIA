import { z } from 'zod';
import {
  BUDGET_RANGES,
  COMPLEXITY_OPTIONS,
  CONTACT_METHODS,
  DEPLOYMENT_ENVIRONMENTS,
  POWER_SOURCES,
  PROJECT_TYPES,
  TIMELINE_FLEXIBILITY,
  URGENCY_OPTIONS,
} from '../constants/requestOptions';
import { PROJECT_CATEGORIES } from '../constants/categories';

/** Optional text: empty string is allowed and later normalised to null. */
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Please keep this under ${max} characters.`)
    .optional()
    .or(z.literal(''));

const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .refine((value) => value === '' || /^https?:\/\/.+\..+/.test(value), {
    message: 'Enter a full URL starting with http:// or https://',
  })
  .optional()
  .or(z.literal(''));

/** Deliberately permissive: international numbers vary a lot. */
const optionalPhone = z
  .string()
  .trim()
  .refine((value) => value === '' || /^[+]?[\d\s()-]{7,20}$/.test(value), {
    message: 'Enter a valid phone number.',
  })
  .optional()
  .or(z.literal(''));

const optionalNumber = z
  .union([z.coerce.number().int().min(1).max(1_000_000), z.literal('')])
  .optional();

export const projectRequestSchema = z
  .object({
    // Section A — contact
    fullName: z.string().trim().min(2, 'Please enter your name.').max(100),
    email: z.string().trim().min(1, 'Please enter your email.').email('Enter a valid email address.'),
    phone: optionalPhone,
    whatsapp: optionalPhone,
    country: optionalText(60),
    city: optionalText(60),
    preferredContactMethod: z.enum(CONTACT_METHODS),

    // Section B — project basics
    projectTitle: z.string().trim().min(3, 'Give your project a short title.').max(120),
    projectCategory: z.enum(PROJECT_CATEGORIES),
    projectType: z.enum(PROJECT_TYPES),
    projectPurpose: optionalText(1000),
    projectDescription: z
      .string()
      .trim()
      .min(30, 'Please describe your project in at least 30 characters.')
      .max(5000),

    // Section C — technical
    preferredPlatform: z.array(z.string()).default([]),
    connectivity: z.array(z.string()).default([]),
    sensors: z.array(z.string()).default([]),
    outputs: z.array(z.string()).default([]),
    powerSource: z.enum(POWER_SOURCES).optional().or(z.literal('')),
    powerRequirements: optionalText(500),

    // Section D — software
    requiresMobileApp: z.boolean().default(false),
    requiresWebDashboard: z.boolean().default(false),
    requiresCloudDatabase: z.boolean().default(false),
    requiresNotifications: z.boolean().default(false),
    requiresRemoteControl: z.boolean().default(false),
    softwareNotes: optionalText(1500),
    possibleLanguages: z.array(z.string()).default([]),

    // Section E — scale
    complexity: z.enum(COMPLEXITY_OPTIONS),
    prototypeQuantity: optionalNumber,
    estimatedQuantity: optionalNumber,
    deploymentEnvironment: z.enum(DEPLOYMENT_ENVIRONMENTS).optional().or(z.literal('')),

    // Section F — budget
    budgetRange: z.enum(BUDGET_RANGES).optional().or(z.literal('')),
    budgetNotes: optionalText(1000),

    // Section G — timeline
    desiredStartDate: z.string().optional().or(z.literal('')),
    desiredDeadline: z.string().optional().or(z.literal('')),
    timelineFlexibility: z.enum(TIMELINE_FLEXIBILITY).optional().or(z.literal('')),
    urgency: z.enum(URGENCY_OPTIONS),

    // Section H — references
    referenceLinks: z.array(optionalUrl).default([]),
    referenceDescription: optionalText(1500),

    // Section I — additional
    specialRequirements: optionalText(1500),
    additionalNotes: optionalText(1500),
    consultationRequired: z.boolean().default(false),
    hasExistingHardware: z.boolean().default(false),
    existingHardwareDescription: optionalText(1000),
    hasExistingCode: z.boolean().default(false),
    existingCodeDescription: optionalText(1000),

    // Section J — consent
    agreeToTerms: z.literal(true, {
      errorMap: () => ({ message: 'Please accept the terms before submitting.' }),
    }),
    allowContact: z.literal(true, {
      errorMap: () => ({ message: 'We need your permission to reply to this request.' }),
    }),

    /** Honeypot. Bots fill hidden fields; people never see this one. */
    website: z.string().max(0).optional().or(z.literal('')),
  })
  .superRefine((values, ctx) => {
    if (values.preferredContactMethod === 'WhatsApp' && !values.whatsapp) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['whatsapp'],
        message: 'Add your WhatsApp number, or choose a different contact method.',
      });
    }
    if (values.preferredContactMethod === 'Phone' && !values.phone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['phone'],
        message: 'Add your phone number, or choose a different contact method.',
      });
    }
    if (values.desiredStartDate && values.desiredDeadline) {
      if (new Date(values.desiredDeadline) < new Date(values.desiredStartDate)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['desiredDeadline'],
          message: 'The deadline cannot be before the start date.',
        });
      }
    }
    if (values.hasExistingHardware && !values.existingHardwareDescription) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['existingHardwareDescription'],
        message: 'Tell us what hardware you already have.',
      });
    }
    if (values.hasExistingCode && !values.existingCodeDescription) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['existingCodeDescription'],
        message: 'Tell us what code you already have.',
      });
    }
  });

export type ProjectRequestFormValues = z.input<typeof projectRequestSchema>;
export type ProjectRequestFormOutput = z.output<typeof projectRequestSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100),
  email: z.string().trim().min(1, 'Please enter your email.').email('Enter a valid email address.'),
  subject: z.string().trim().min(3, 'Please add a subject.').max(150),
  message: z.string().trim().min(20, 'Please write at least 20 characters.').max(3000),
  website: z.string().max(0).optional().or(z.literal('')),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Enter your email.').email('Enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

/** Normalises an optional form value to `string | null` for Firestore. */
export const nullable = (value: string | undefined | null): string | null => {
  const trimmed = (value ?? '').trim();
  return trimmed === '' ? null : trimmed;
};

export const nullableNumber = (value: number | string | undefined | null): number | null => {
  if (value === '' || value === undefined || value === null) return null;
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};
