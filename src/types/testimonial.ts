import type { Timestamp } from 'firebase/firestore';

export interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  quote: string;
  /** 1-5, optional — omitted entirely from display when null. */
  rating: number | null;
  published: boolean;
  createdAt: Timestamp | null;
}

export type TestimonialDraft = Omit<Testimonial, 'id' | 'createdAt'>;
