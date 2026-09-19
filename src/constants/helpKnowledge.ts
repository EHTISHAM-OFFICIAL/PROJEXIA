import { SITE } from './site';
import { PROJECT_CATEGORIES } from './categories';

export interface HelpEntry {
  /** Words/phrases that trigger this answer if they appear in the question. */
  keywords: string[];
  answer: string;
}

/**
 * The entire "brain" of the Help Assistant. It never generates free text —
 * it only ever returns one of these answers (matched by keyword) or the
 * fallback in HelpChatWidget. That's what makes it structurally incapable of
 * answering off-topic questions: there's no path to it doing anything else.
 */
export const HELP_KNOWLEDGE: HelpEntry[] = [
  {
    keywords: ['request', 'start', 'begin', 'how do i', 'get a project', 'commission'],
    answer:
      'Fill in the request form — it asks about your idea, platform preferences, budget and timeline. MECTEC replies with a real scope, not just more questions.',
  },
  {
    keywords: ['how long', 'reply', 'response time', 'when will', 'get back'],
    answer: `MECTEC typically replies ${SITE.responseTime} to a submitted request.`,
  },
  {
    keywords: ['source code', 'schematic', 'own the', 'get the code', 'firmware'],
    answer:
      'Yes — source code, firmware and any schematics are always handed over with the finished build. Nothing is kept back.',
  },
  {
    keywords: ['category', 'categories', 'what kind', 'what type', 'what do you build', 'services'],
    answer: `MECTEC works across: ${PROJECT_CATEGORIES.join(', ')}.`,
  },
  {
    keywords: ['budget', 'cost', 'price', 'how much', 'expensive', 'cheap'],
    answer:
      'Budget ranges are optional on the request form, and "not decided yet" is a valid answer — it just helps suggest components that actually fit.',
  },
  {
    keywords: ['timeline', 'deadline', 'how fast', 'how quickly', 'urgent'],
    answer:
      'It depends on scope — a single-sensor build can take days, a connected system weeks. The request form has a field for deadlines if you have one.',
  },
  {
    keywords: ['contact', 'email', 'whatsapp', 'phone', 'reach', 'talk to'],
    answer: SITE.whatsapp
      ? `You can reach MECTEC by email at ${SITE.email} or via WhatsApp using the button in the corner of this page.`
      : `You can reach MECTEC by email at ${SITE.email}, or through the contact page.`,
  },
  {
    keywords: ['existing', 'already have', 'broken', 'sketch', 'prototype i made'],
    answer:
      'That\u2019s fine — the request form has a section for hardware or code you already have, including photo attachments.',
  },
  {
    keywords: ['platform', 'arduino', 'esp32', 'raspberry', 'microcontroller', "don't know what"],
    answer:
      'Not knowing your platform is completely normal — most of the request form is optional for exactly that reason. Describe what the system should do, and platform choice can be worked out together.',
  },
  {
    keywords: ['project', 'portfolio', 'examples', 'past work', 'built before'],
    answer:
      'The Projects page has case studies of completed builds — what the problem was, how it was solved, and what the finished system does.',
  },
];
