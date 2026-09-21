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
import { auth } from '../firebase/auth';
import { imgbbService, type UploadedImage } from './imgbbService';
import { emailNotificationService } from './emailNotificationService';
import type {
  ProjectRequest,
  RequestAttachment,
  RequestPriority,
  RequestStatus,
} from '../types/projectRequest';
import type { ProjectRequestFormOutput } from '../utils/validation';
import { nullable, nullableNumber } from '../utils/validation';
import { requestSettingsService } from './requestSettingsService';

const requestsRef = collection(db, COLLECTIONS.projectRequests);

/**
 * A separate, deliberately narrow collection for the public "track my
 * request" page. It holds only what a visitor is allowed to see — never the
 * full request document, which contains internal admin notes and quoted
 * amounts. Document id = the human-readable requestNumber, so a visitor can
 * look it up directly without a query (and without Firestore ever needing to
 * expose a list of requests to the public).
 */
const statusLookupRef = (requestNumber: string) => doc(db, 'requestStatusLookup', requestNumber);

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

function toAttachment(file: File, uploaded: UploadedImage): RequestAttachment {
  return {
    name: file.name,
    url: uploaded.url,
    storagePath: uploaded.deleteUrl, // imgBB's delete link, kept for admin reference
    contentType: file.type,
    size: file.size,
  };
}

function toRequest(snapshot: QueryDocumentSnapshot<DocumentData>): ProjectRequest {
  const data = snapshot.data();
  return {
    id: snapshot.id,
    ownerUid: data.ownerUid ?? '',
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
    customerUpdate: data.customerUpdate ?? null,
    customerUpdateAt: data.customerUpdateAt ?? null,
    metadata: data.metadata ?? { source: 'unknown', userAgent: null, createdFrom: 'unknown' },
    createdAt: data.createdAt ?? null,
    updatedAt: data.updatedAt ?? null,
    deletedAt: data.deletedAt ?? null,
    deletedBy: data.deletedBy ?? null,
  };
}

export interface CreateRequestResult {
  id: string;
  requestNumber: string;
}

/** Deliberately minimal — the only fields a visitor is allowed to see. */
export interface PublicRequestStatus {
  requestNumber: string;
  status: RequestStatus;
  projectTitle: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  customerUpdate: string | null;
  customerUpdateAt: Timestamp | null;
}

export const requestService = {
  /**
   * Creates one request document.
   *
   * Attachments upload to imgBB first (they don't need a Firestore id to
   * exist), then the request document is written once, with the resulting
   * URLs embedded. The public has no permission to update a request
   * afterwards, so this has to be a single create.
   */
  async createRequest(
    values: ProjectRequestFormOutput,
    files: File[] = []
  ): Promise<CreateRequestResult> {
    const ownerUid = auth.currentUser?.uid;
    if (!ownerUid) throw new Error('You must be signed in to submit a project request.');

    const requestRef = doc(requestsRef);
    const requestNumber = generateRequestNumber();

    const uploads = files.length ? await imgbbService.uploadMany(files) : [];
    const attachments = uploads.map((uploaded, index) => toAttachment(files[index], uploaded));

    await setDoc(requestRef, {
      requestNumber,
      ownerUid,
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

      attachments,

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
      customerUpdate: null,
      customerUpdateAt: null,

      metadata: {
        source: 'website',
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 300) : null,
        createdFrom: '/request-project',
      },

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // Best-effort: the confirmation to the visitor must not fail just
    // because this secondary, narrow record couldn't be written.
    try {
      await setDoc(statusLookupRef(requestNumber), {
        requestNumber,
        requestId: requestRef.id,
        status: 'new' satisfies RequestStatus,
        projectTitle: values.projectTitle,
        email: values.email.trim().toLowerCase(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        customerUpdate: null,
        customerUpdateAt: null,
        deletedAt: null,
      });
    } catch (error) {
      if (import.meta.env.DEV) console.warn('Could not create status-lookup record', error);
    }

    // Fire-and-forget: never await this in a way that could block or fail
    // the confirmation already shown to the visitor.
    void emailNotificationService.notify({
      subject: `New project request — ${values.projectTitle}`,
      message:
        `${values.fullName} (${values.email}) submitted a new request.\n\n` +
        `Reference: ${requestNumber}\n` +
        `Category: ${values.projectCategory}\n` +
        `Project type: ${values.projectType}\n` +
        `Urgency: ${values.urgency}\n\n` +
        `--- Project ---\n` +
        `Title: ${values.projectTitle}\n` +
        `Purpose: ${values.projectPurpose || "Not provided"}\n` +
        `Description:\n${values.projectDescription}\n\n` +
        `--- Technical ---\n` +
        `Preferred platform: ${values.preferredPlatform?.join(", ") || "Not specified"}\n` +
        `Connectivity: ${values.connectivity?.join(", ") || "Not specified"}\n` +
        `Sensors: ${values.sensors?.join(", ") || "Not specified"}\n` +
        `Outputs: ${values.outputs?.join(", ") || "Not specified"}\n\n` +
        `--- Budget & Timeline ---\n` +
        `Budget range: ${values.budgetRange || "Not specified"}\n` +
        `Start date: ${values.desiredStartDate || "Not specified"}\n` +
        `Deadline: ${values.desiredDeadline || "Not specified"}\n` +
        `Timeline flexibility: ${values.timelineFlexibility || "Not specified"}\n\n` +
        `--- Scale ---\n` +
        `Complexity: ${values.complexity}\n` +
        `Prototype quantity: ${values.prototypeQuantity || "Not specified"}\n` +
        `Estimated quantity: ${values.estimatedQuantity || "Not specified"}`,
      replyTo: values.email,
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

  async getMyRequests(uid: string): Promise<ProjectRequest[]> {
    if (!uid) return [];

    const snapshot = await getDocs(
      query(requestsRef, where('ownerUid', '==', uid)),
    );

    return snapshot.docs
      .map(toRequest)
      .filter((request) => !request.deletedAt)
      .sort((a, b) => {
        const aTime = a.createdAt?.toMillis() ?? 0;
        const bTime = b.createdAt?.toMillis() ?? 0;
        return bTime - aTime;
      });
  },

  async getMyRequestById(id: string, uid: string): Promise<ProjectRequest | null> {
    if (!uid) return null;

    const snapshot = await getDoc(doc(db, COLLECTIONS.projectRequests, id));
    if (!snapshot.exists()) return null;

    const data = snapshot.data();
    if (data.ownerUid !== uid || data.deletedAt) return null;

    return toRequest(snapshot as QueryDocumentSnapshot<DocumentData>);
  },

  async updateMyRequest(
    id: string,
    uid: string,
    values: ProjectRequestFormOutput,
    files: File[] = [],
  ): Promise<void> {
    if (!uid) throw new Error('You must be signed in.');

    const snapshot = await getDoc(doc(db, COLLECTIONS.projectRequests, id));
    if (!snapshot.exists()) throw new Error('Request not found.');

    const current = snapshot.data();
    if (current.ownerUid !== uid) throw new Error('You are not allowed to edit this request.');

    const createdAt = current.createdAt as Timestamp | undefined;
    if (!createdAt) throw new Error('This request cannot be edited.');

    const settings = await requestSettingsService.getSecuritySettings();
    const editDeadline = createdAt.toMillis() + settings.customerRequestEditWindowHours * 60 * 60 * 1000;
    if (Date.now() >= editDeadline) {
      throw new Error('The editing window for this request has ended.');
    }

    // New attachments are uploaded to the same imgBB flow used by the
    // original request. Existing attachments are intentionally preserved.
    const newUploads = files.length ? await imgbbService.uploadMany(files) : [];
    const newAttachments = newUploads.map((uploaded, index) =>
      toAttachment(files[index], uploaded)
    );

    await updateDoc(doc(db, COLLECTIONS.projectRequests, id), {
      attachments: [...(current.attachments ?? []), ...newAttachments],
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
      additionalRequirements: {
        specialRequirements: nullable(values.specialRequirements),
        additionalNotes: nullable(values.additionalNotes),
        consultationRequired: values.consultationRequired,
        hasExistingHardware: values.hasExistingHardware,
        existingHardwareDescription: nullable(values.existingHardwareDescription),
        hasExistingCode: values.hasExistingCode,
        existingCodeDescription: nullable(values.existingCodeDescription),
      },
      updatedAt: serverTimestamp(),
    });
  },

  async deleteMyRequest(id: string, uid: string): Promise<void> {
    if (!uid) throw new Error('You must be signed in.');

    const requestRef = doc(db, COLLECTIONS.projectRequests, id);
    const snapshot = await getDoc(requestRef);
    if (!snapshot.exists()) throw new Error('Request not found.');

    const current = snapshot.data();
    if (current.ownerUid !== uid) throw new Error('You are not allowed to delete this request.');
    if (current.deletedAt) throw new Error('This request is already in the trash.');

    const createdAt = current.createdAt as Timestamp | undefined;
    if (!createdAt) throw new Error('This request cannot be deleted.');

    const settings = await requestSettingsService.getSecuritySettings();
    const deadline = createdAt.toMillis() + settings.customerRequestEditWindowHours * 60 * 60 * 1000;
    if (Date.now() >= deadline) {
      throw new Error('The deletion window for this request has ended.');
    }

    await updateDoc(requestRef, {
      deletedAt: serverTimestamp(),
      deletedBy: 'customer',
      updatedAt: serverTimestamp(),
    });

    const requestNumber = current.requestNumber as string | undefined;
    if (requestNumber) {
      await setDoc(
        statusLookupRef(requestNumber),
        { deletedAt: serverTimestamp(), updatedAt: serverTimestamp() },
        { merge: true },
      );
    }
  },

  async getTrashedRequests(): Promise<ProjectRequest[]> {
    const snapshot = await getDocs(query(requestsRef, orderBy('createdAt', 'desc')));
    return snapshot.docs
      .map(toRequest)
      .filter((request) => Boolean(request.deletedAt));
  },

  async trashRequest(id: string): Promise<void> {
    const requestRef = doc(db, COLLECTIONS.projectRequests, id);
    const snapshot = await getDoc(requestRef);
    if (!snapshot.exists()) throw new Error('Request not found.');

    const requestNumber = snapshot.data().requestNumber as string | undefined;
    await updateDoc(requestRef, {
      deletedAt: serverTimestamp(),
      deletedBy: 'admin',
      updatedAt: serverTimestamp(),
    });

    if (requestNumber) {
      await setDoc(
        statusLookupRef(requestNumber),
        { deletedAt: serverTimestamp(), updatedAt: serverTimestamp() },
        { merge: true },
      );
    }
  },

  async restoreRequest(id: string): Promise<void> {
    const requestRef = doc(db, COLLECTIONS.projectRequests, id);
    const snapshot = await getDoc(requestRef);
    if (!snapshot.exists()) throw new Error('Request not found.');

    const requestNumber = snapshot.data().requestNumber as string | undefined;
    await updateDoc(requestRef, {
      deletedAt: null,
      deletedBy: null,
      updatedAt: serverTimestamp(),
    });

    if (requestNumber) {
      await setDoc(
        statusLookupRef(requestNumber),
        { deletedAt: null, updatedAt: serverTimestamp() },
        { merge: true },
      );
    }
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

    // Keep the public-facing status record in sync. Best-effort: a request
    // created before this feature existed has no lookup doc yet, so this
    // reads it first and just skips the sync if there's nothing to update.
    try {
      const snapshot = await getDoc(doc(db, COLLECTIONS.projectRequests, id));
      const requestNumber = snapshot.data()?.requestNumber as string | undefined;
      if (requestNumber) {
        await setDoc(
          statusLookupRef(requestNumber),
          { status, updatedAt: serverTimestamp() },
          { merge: true }
        );
      }
    } catch (error) {
      if (import.meta.env.DEV) console.warn('Could not sync status-lookup record', error);
    }
  },

  async updateRequestPriority(id: string, priority: RequestPriority): Promise<void> {
    await updateDoc(doc(db, COLLECTIONS.projectRequests, id), {
      priority,
      updatedAt: serverTimestamp(),
    });
  },

  async updateCustomerUpdate(id: string, customerUpdate: string | null): Promise<void> {
    const requestSnapshot = await getDoc(doc(db, COLLECTIONS.projectRequests, id));
    if (!requestSnapshot.exists()) throw new Error('Request not found.');
    const requestNumber = requestSnapshot.data()?.requestNumber as string | undefined;
    if (!requestNumber) throw new Error('Request reference is missing.');

    const updateText = customerUpdate?.trim() || null;
    const updateTimestamp = updateText ? serverTimestamp() : null;

    await updateDoc(doc(db, COLLECTIONS.projectRequests, id), {
      customerUpdate: updateText,
      customerUpdateAt: updateTimestamp,
      updatedAt: serverTimestamp(),
    });

    await setDoc(
      statusLookupRef(requestNumber),
      { customerUpdate: updateText, customerUpdateAt: updateTimestamp, updatedAt: serverTimestamp() },
      { merge: true },
    );
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

  /**
   * Public lookup for the "track my request" page. Only ever reads
   * requestStatusLookup — never the full request document — so there is no
   * way for this to leak internal admin notes or quoted amounts, even to
   * someone inspecting network traffic.
   *
   * The email check happens here, client-side, after the fetch: Firestore
   * `get` rules can't validate a second client-supplied value against the
   * document's own field, so the real access control is the requestNumber
   * itself (effectively an unguessable bearer token — ~27 billion
   * combinations). The email match is a privacy courtesy on top of that, not
   * an additional security boundary.
   */
  async lookupStatus(
    requestNumber: string,
    email: string
  ): Promise<PublicRequestStatus | null> {
    const normalizedNumber = requestNumber.trim().toUpperCase();
    const snapshot = await getDoc(statusLookupRef(normalizedNumber));
    if (!snapshot.exists()) return null;

    const data = snapshot.data();
    if (data.deletedAt) return null;
    if ((data.email as string)?.toLowerCase() !== email.trim().toLowerCase()) return null;

    return {
      requestNumber: data.requestNumber ?? normalizedNumber,
      status: data.status ?? 'new',
      projectTitle: data.projectTitle ?? '',
      createdAt: data.createdAt ?? null,
      updatedAt: data.updatedAt ?? null,
      customerUpdate: data.customerUpdate ?? null,
      customerUpdateAt: data.customerUpdateAt ?? null,
    };
  },
};
