import type { Timestamp } from 'firebase/firestore';

export type MeetingPurpose =
  | 'Project consultation'
  | 'Discuss an existing project request'
  | 'Technical discussion'
  | 'General inquiry';
export type MeetingMethod = 'Google Meet' | 'WhatsApp' | 'Phone call' | 'Face-to-face';
export type MeetingDuration = '15 minutes' | '30 minutes' | '60 minutes';
export type MeetingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface MeetingRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  whatsapp: string | null;
  country: string | null;
  city: string | null;
  purpose: MeetingPurpose;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  duration: MeetingDuration;
  method: MeetingMethod;
  discussion: string;
  projectReference: string | null;
  additionalNotes: string | null;
  status: MeetingStatus;
  adminNotes: string | null;
  confirmedDate: string | null;
  confirmedTime: string | null;
  meetingLink: string | null;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

export interface CreateMeetingInput {
  fullName: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  country?: string;
  city?: string;
  purpose: MeetingPurpose;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  duration: MeetingDuration;
  method: MeetingMethod;
  discussion: string;
  projectReference?: string;
  additionalNotes?: string;
}