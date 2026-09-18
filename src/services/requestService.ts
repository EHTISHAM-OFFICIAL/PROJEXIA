import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
} from 'firebase/firestore';
import { COLLECTIONS, db } from '../firebase/firestore';
import { storageService, type UploadedFile } from './storageService';
import type {
  ProjectRequest,
  RequestAttachment,
  RequestPriority,
  RequestStatus,
} from '../types/projectRequest';
import type { ProjectRequestFormOutput } from '../utils/validation';
import { nullable, nullableNumber } from '../utils/validation';

const requestsRef = collection(db, COLLECTIONS.projectRequests);

/**
 * Human-readable reference, e.g. MECTEC-2026-K4T9RQ.
 *
 * Deliberately random rather than sequential. A truly sequential counter needs a
 * shared document that the public can write to, which is an abuse target, or a
 * Cloud Function. Six random base-32 characters give ~1 billion combinations per
 * year — collisions are not a practical concern, and the value is unguessable,
 * which is a small privacy win. See README for the Cloud Function upgrade path.
 */
function generateRequestNumber(): string {
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // no look-alike characters
  const random = crypto.getRandomValues(new Uint8Array(6));
  const suffix = Array.from(random, (byte) => alphabet[byte % alphabet.length]).join('');
  return `MECTEC-${new Date().getFullYear()}-${suffix}`;
}

function dateToTimestamp(value: string | undefined): Timestamp | null {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : Timestamp.fromDate(parsed);
}

function toAttachment(file: UploadedFile): RequestAttachment {
  return {
    name: file.name,
    url: file.url,
    storagePath: file.storagePath,
    contentType: file.contentType,
    size: file.size,
  };
}

function toRequest(snapshot: QueryDocumentSnapshot<DocumentData>): ProjectRequest {
  const data = snapshot.data();
  return {
    id: snapshot.id,
    requestNumber: data.requestNumber ?? snapshot.id,
    status: data.status ?? 'new',
    priority: data.priority ?? 'normal',
    contact: data.contact ?? {},
    project: data.project ?? {},
    technical: data.technical ?? {},
    software: data.software ?? {},
    scale: data.scale ?? {},
    budget: data.budget ?? { range: null, notes: null },
    timeline: data.timeline ?? {},
    references: data.references ?? { links: [], description: null },
    attachments: data.attachments ?? [],
    additionalRequirements: data.additionalRequirements ?? {},
    consent: data.consent ?? { agreeToTerms: false, allowContact: false },
    admin: data.admin ?? { notes: null, quotedAmount: null, currency: 'PKR', assignedTo: null },
    metadata: data.metadata ?? { source: 'unknown', userAgent: null, createdFrom: 'unknown' },
    createdAt: data.createdAt ?? null,
    updatedAt: data.updatedAt ?? null,
  };
}

export interface CreateRequestResult {
  id: string;
  requestNumber: string;
}

export const requestService = {
  /**
   * Creates one request document.
   *
   * The document id is generated client-side first so attachments can be uploaded
   * to their final path before the document is written. That keeps it to a single
   * create — the public has no permission to update a request afterwards.
   */
  async createRequest(
    values: ProjectRequestFormOutput,
    files: File[] = []
  ): Promise<CreateRequestResult> {
    const requestRef = doc(requestsRef);
    const requestNumber = generateRequestNumber();

    const uploads = files.length
      ? await storageService.uploadRequestAttachments(requestRef.id, files)
      : [];

    await setDoc(requestRef, {
      requestNumber,
      status: 'new' satisfies RequestStatus,
      priority: (values.urgency === 'Urgent' ? 'high' : 'normal') satisfies RequestPriority,

      contact: {
        fullName: values.fullName,
        email: values.email,
        phone: nullable(values.phone),
        whatsapp: nullable(values.whatsapp),
        country: nullable(values.country),
        city: nullable(values.city),
        preferredContactMethod: values.preferredContactMethod,
      },

      project: {
        title: values.projectTitle,
        category: values.projectCategory,
        type: values.projectType,
        purpose: nullable(values.projectPurpose) ?? '',
        description: values.projectDescription,
      },

      technical: {
        preferredPlatforms: values.preferredPlatform,
        connectivity: values.connectivity,
        sensors: values.sensors,
        outputs: values.outputs,
        powerSource: nullable(values.powerSource),
        powerRequirements: nullable(values.powerRequirements),
      },

      software: {
        requiresMobileApp: values.requiresMobileApp,
        requiresWebDashboard: values.requiresWebDashboard,
        requiresCloudDatabase: values.requiresCloudDatabase,
        requiresNotifications: values.requiresNotifications,
        requiresRemoteControl: values.requiresRemoteControl,
        notes: nullable(values.softwareNotes),
        languages: values.possibleLanguages,
      },

      scale: {
        complexity: values.complexity,
        prototypeQuantity: nullableNumber(values.prototypeQuantity),
        estimatedQuantity: nullableNumber(values.estimatedQuantity),
        deploymentEnvironment: nullable(values.deploymentEnvironment),
      },

      budget: {
        range: nullable(values.budgetRange),
        notes: nullable(values.budgetNotes),
      },

      timeline: {
        desiredStartDate: dateToTimestamp(values.desiredStartDate),
        desiredDeadline: dateToTimestamp(values.desiredDeadline),
        flexibility: nullable(values.timelineFlexibility),
        urgency: values.urgency,
      },

      references: {
        links: values.referenceLinks.filter((link): link is string => Boolean(link && link.trim())),
        description: nullable(values.referenceDescription),
      },

      attachments: uploads.map(toAttachment),

      additionalRequirements: {
        specialRequirements: nullable(values.specialRequirements),
        additionalNotes: nullable(values.additionalNotes),
        consultationRequired: values.consultationRequired,
        hasExistingHardware: values.hasExistingHardware,
        existingHardwareDescription: nullable(values.existingHardwareDescription),
        hasExistingCode: values.hasExistingCode,
        existingCodeDescription: nullable(values.existingCodeDescription),
      },

      consent: {
        agreeToTerms: values.agreeToTerms,
        allowContact: values.allowContact,
      },

      // Written empty on create; security rules block the public from setting these.
      admin: { notes: null, quotedAmount: null, currency: 'PKR', assignedTo: null },

      metadata: {
        source: 'website',
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 300) : null,
        createdFrom: '/request-project',
      },

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return { id: requestRef.id, requestNumber };
  },

  /** Admin only — security rules reject unauthenticated reads. */
  async getRequests(status?: RequestStatus): Promise<ProjectRequest[]> {
    const constraints = status
      ? [where('status', '==', status), orderBy('createdAt', 'desc')]
      : [orderBy('createdAt', 'desc')];
    const snapshot = await getDocs(query(requestsRef, ...constraints));
    return snapshot.docs.map(toRequest);
  },

  async getRecentRequests(limitCount = 5): Promise<ProjectRequest[]> {
    const all = await requestService.getRequests();
    return all.slice(0, limitCount);
  },

  async getRequestById(id: string): Promise<ProjectRequest | null> {
    const snapshot = await getDoc(doc(db, COLLECTIONS.projectRequests, id));
    if (!snapshot.exists()) return null;
    return toRequest(snapshot as QueryDocumentSnapshot<DocumentData>);
  },

  async updateRequestStatus(id: string, status: RequestStatus): Promise<void> {
    await updateDoc(doc(db, COLLECTIONS.projectRequests, id), {
      status,
      updatedAt: serverTimestamp(),
    });
  },

  async updateRequestPriority(id: string, priority: RequestPriority): Promise<void> {
    await updateDoc(doc(db, COLLECTIONS.projectRequests, id), {
      priority,
      updatedAt: serverTimestamp(),
    });
  },

  async updateAdminFields(
    id: string,
    fields: { notes?: string | null; quotedAmount?: number | null; assignedTo?: string | null }
  ): Promise<void> {
    const updates: Record<string, unknown> = { updatedAt: serverTimestamp() };
    if (fields.notes !== undefined) updates['admin.notes'] = fields.notes;
    if (fields.quotedAmount !== undefined) updates['admin.quotedAmount'] = fields.quotedAmount;
    if (fields.assignedTo !== undefined) updates['admin.assignedTo'] = fields.assignedTo;
    await updateDoc(doc(db, COLLECTIONS.projectRequests, id), updates);
  },
};
