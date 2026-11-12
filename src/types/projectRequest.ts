import type { Timestamp } from 'firebase/firestore';

export type RequestStatus =
  | 'new'
  | 'reviewing'
  | 'quoted'
  | 'accepted'
  | 'in-progress'
  | 'completed'
  | 'rejected'
  | 'cancelled';

export type RequestPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface RequestAttachment {
  name: string;
  url: string;
  storagePath: string;
  contentType: string;
  size: number;
}

export interface RequestContact {
  fullName: string;
  email: string;
  phone: string | null;
  whatsapp: string | null;
  country: string | null;
  city: string | null;
  preferredContactMethod: string;
}

export interface RequestProjectInfo {
  title: string;
  category: string;
  type: string;
  purpose: string;
  description: string;
}

export interface RequestTechnical {
  preferredPlatforms: string[];
  connectivity: string[];
  sensors: string[];
  outputs: string[];
  powerSource: string | null;
  powerRequirements: string | null;
}

export interface RequestSoftware {
  requiresMobileApp: boolean;
  requiresWebDashboard: boolean;
  requiresCloudDatabase: boolean;
  requiresNotifications: boolean;
  requiresRemoteControl: boolean;
  notes: string | null;
  languages: string[];
}

export interface RequestScale {
  complexity: string;
  prototypeQuantity: number | null;
  estimatedQuantity: number | null;
  deploymentEnvironment: string | null;
}

export interface RequestBudget {
  range: string | null;
  notes: string | null;
}

export interface RequestTimeline {
  desiredStartDate: Timestamp | null;
  desiredDeadline: Timestamp | null;
  flexibility: string | null;
  urgency: string;
}

export interface RequestReferences {
  links: string[];
  description: string | null;
}

export interface RequestAdditional {
  specialRequirements: string | null;
  additionalNotes: string | null;
  consultationRequired: boolean;
  hasExistingHardware: boolean;
  existingHardwareDescription: string | null;
  hasExistingCode: boolean;
  existingCodeDescription: string | null;
}

export interface RequestConsent {
  agreeToTerms: boolean;
  allowContact: boolean;
}

/**
 * Internal, admin-only data (notes, quoted price, assignee).
 *
 * This is stored in its own document, `requestPrivate/{requestId}`, and NOT on
 * the request itself. The request owner is allowed to read their own request
 * document, so anything stored on it is visible to the customer through the
 * network tab regardless of what the UI renders.
 */
export interface RequestAdmin {
  notes: string | null;
  quotedAmount: number | null;
  currency: string;
  assignedTo: string | null;
}

export interface RequestMetadata {
  source: string;
  userAgent: string | null;
  createdFrom: string;
}

export interface ProjectRequest {
  id: string;
  ownerUid: string;
  requestNumber: string;
  /** Per-request token required for administrator trash actions. */
  projectToken?: string;
  serviceType?: string;
  schoolModel?: { itemId: string; slug: string; category: string };
  status: RequestStatus;
  priority: RequestPriority;
  contact: RequestContact;
  project: RequestProjectInfo;
  technical: RequestTechnical;
  software: RequestSoftware;
  scale: RequestScale;
  budget: RequestBudget;
  timeline: RequestTimeline;
  references: RequestReferences;
  attachments: RequestAttachment[];
  additionalRequirements: RequestAdditional;
  consent: RequestConsent;
  /** Latest customer-facing update, separate from internal admin notes. */
  customerUpdate: string | null;
  customerUpdateAt: Timestamp | null;
  metadata: RequestMetadata;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  deletedAt?: Timestamp | null;
  deletedBy?: 'customer' | 'admin' | null;
}

/** A request together with its admin-only data. Only admin screens may use this. */
export type AdminProjectRequest = ProjectRequest & { admin: RequestAdmin };
