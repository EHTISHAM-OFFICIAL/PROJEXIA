import {
  collection,
  deleteDoc,
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
  writeBatch,
  type DocumentData,
  type DocumentSnapshot,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { COLLECTIONS, db } from "../firebase/firestore";
import { auth } from "../firebase/auth";
import { imgbbService, type UploadedImage } from "./imgbbService";
import { emailNotificationService } from "./emailNotificationService";
import type {
  AdminProjectRequest,
  ProjectRequest,
  RequestAdmin,
  RequestAttachment,
  RequestPriority,
  RequestStatus,
} from "../types/projectRequest";
import type { ProjectRequestFormOutput } from "../utils/validation";
import { nullable, nullableNumber } from "../utils/validation";
import { requestSettingsService } from "./requestSettingsService";
import { hashEmail } from "../utils/emailHash";
import {
  generateProjectToken,
  generateRequestNumber,
  normalizeRequestNumber,
} from "../utils/requestNumber";

const requestsRef = collection(db, COLLECTIONS.projectRequests);

/**
 * Admin-only data for each request (notes, quote, assignee), keyed by the
 * request id. Kept out of `projectRequests` because the customer who owns a
 * request may read that whole document. See RequestAdmin.
 */
const privateRef = collection(db, COLLECTIONS.requestPrivate);
const privateDocRef = (requestId: string) =>
  doc(db, COLLECTIONS.requestPrivate, requestId);

const DEFAULT_ADMIN: RequestAdmin = {
  notes: null,
  quotedAmount: null,
  currency: "PKR",
  assignedTo: null,
};

/**
 * A separate, deliberately narrow collection for the public "track my
 * request" page. It holds only what a visitor is allowed to see — never the
 * full request document, which contains internal admin notes and quoted
 * amounts. Document id = the human-readable requestNumber, so a visitor can
 * look it up directly without a query (and without Firestore ever needing to
 * expose a list of requests to the public).
 */
const statusLookupRef = (requestNumber: string) =>
  doc(db, "requestStatusLookup", requestNumber);

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

function toRequest(
  snapshot: QueryDocumentSnapshot<DocumentData>,
): ProjectRequest {
  const data = snapshot.data();
  return {
    id: snapshot.id,
    ownerUid: data.ownerUid ?? "",
    requestNumber: data.requestNumber ?? snapshot.id,
    projectToken: data.projectToken ?? undefined,
    serviceType: data.serviceType ?? "electronics",
    schoolModel: data.schoolModel ?? undefined,
    status: data.status ?? "new",
    priority: data.priority ?? "normal",
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
    customerUpdate: data.customerUpdate ?? null,
    customerUpdateAt: data.customerUpdateAt ?? null,
    metadata: data.metadata ?? {
      source: "unknown",
      userAgent: null,
      createdFrom: "unknown",
    },
    createdAt: data.createdAt ?? null,
    updatedAt: data.updatedAt ?? null,
    deletedAt: data.deletedAt ?? null,
    deletedBy: data.deletedBy ?? null,
  };
}

function toRequestAdmin(
  snapshot: DocumentSnapshot<DocumentData> | undefined,
): RequestAdmin {
  const data = snapshot?.exists() ? snapshot.data() : undefined;
  if (!data) return { ...DEFAULT_ADMIN };
  return {
    notes: typeof data.notes === "string" ? data.notes : null,
    quotedAmount:
      typeof data.quotedAmount === "number" ? data.quotedAmount : null,
    currency:
      typeof data.currency === "string" && data.currency
        ? data.currency
        : DEFAULT_ADMIN.currency,
    assignedTo: typeof data.assignedTo === "string" ? data.assignedTo : null,
  };
}

export interface CreateRequestResult {
  id: string;
  requestNumber: string;
  projectToken: string;
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

type AdminDataById = Map<string, RequestAdmin>;

/** One query for every admin-only record, instead of one read per request. */
async function getAdminDataById(): Promise<AdminDataById> {
  const snapshot = await getDocs(privateRef);
  return new Map(
    snapshot.docs.map((document) => [document.id, toRequestAdmin(document)]),
  );
}

function withAdmin(
  request: ProjectRequest,
  adminData: AdminDataById,
): AdminProjectRequest {
  return { ...request, admin: adminData.get(request.id) ?? { ...DEFAULT_ADMIN } };
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
    files: File[] = [],
  ): Promise<CreateRequestResult> {
    const ownerUid = auth.currentUser?.uid;
    if (!ownerUid)
      throw new Error("You must be signed in to submit a project request.");

    const requestRef = doc(requestsRef);
    const requestNumber = generateRequestNumber();
    const projectToken = generateProjectToken();

    const uploads = files.length ? await imgbbService.uploadMany(files) : [];
    const attachments = uploads.map((uploaded, index) =>
      toAttachment(files[index], uploaded),
    );

    await setDoc(requestRef, {
      requestNumber,
      ownerUid,
      status: "new" satisfies RequestStatus,
      priority: (values.urgency === "Urgent"
        ? "high"
        : "normal") satisfies RequestPriority,

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
        purpose: nullable(values.projectPurpose) ?? "",
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
        links: values.referenceLinks.filter((link): link is string =>
          Boolean(link && link.trim()),
        ),
        description: nullable(values.referenceDescription),
      },

      attachments,

      additionalRequirements: {
        specialRequirements: nullable(values.specialRequirements),
        additionalNotes: nullable(values.additionalNotes),
        consultationRequired: values.consultationRequired,
        hasExistingHardware: values.hasExistingHardware,
        existingHardwareDescription: nullable(
          values.existingHardwareDescription,
        ),
        hasExistingCode: values.hasExistingCode,
        existingCodeDescription: nullable(values.existingCodeDescription),
      },

      consent: {
        agreeToTerms: values.agreeToTerms,
        allowContact: values.allowContact,
      },

      // Admin-only data lives in requestPrivate/{id}; it is never written here.
      customerUpdate: null,
      customerUpdateAt: null,

      metadata: {
        source: "website",
        userAgent:
          typeof navigator !== "undefined"
            ? navigator.userAgent.slice(0, 300)
            : null,
        createdFrom: "/request-project",
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
        status: "new" satisfies RequestStatus,
        projectTitle: values.projectTitle,
        emailHash: await hashEmail(values.email),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        customerUpdate: null,
        customerUpdateAt: null,
        deletedAt: null,
      });
    } catch (error) {
      if (import.meta.env.DEV)
        console.warn("Could not create status-lookup record", error);
    }

    // Send after the request is safely stored. The email path is retried by
    // emailNotificationService so a transient EmailJS/rate-limit failure does
    // not disappear when the visitor immediately leaves the page.
    try {
      await emailNotificationService.notify({
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
        name: values.fullName,
        email: values.email,
        title: values.projectTitle,
        requestNumber,
        throwOnError: true,
        maxAttempts: 3,
      });
    } catch (error) {
      // The request itself is already safely stored. Never tell the customer
      // that submission failed just because a secondary email notification did.
      if (import.meta.env.DEV) {
        console.warn("Project request was saved, but the notification email failed.", error);
      }
    }

    return { id: requestRef.id, requestNumber, projectToken };
  },

  /** Admin only — security rules reject unauthenticated reads. */
  async getRequests(status?: RequestStatus): Promise<AdminProjectRequest[]> {
    const constraints = status
      ? [where("status", "==", status), orderBy("createdAt", "desc")]
      : [orderBy("createdAt", "desc")];
    const [snapshot, adminData] = await Promise.all([
      getDocs(query(requestsRef, ...constraints)),
      getAdminDataById(),
    ]);
    return snapshot.docs
      .map((document) => withAdmin(toRequest(document), adminData))
      .filter((request) => !request.deletedAt);
  },

  async getMyRequests(uid: string): Promise<ProjectRequest[]> {
    if (!uid) return [];

    const snapshot = await getDocs(
      query(requestsRef, where("ownerUid", "==", uid)),
    );

    return snapshot.docs
      .map(toRequest)
      .sort((a, b) => {
        const aTime = a.createdAt?.toMillis() ?? 0;
        const bTime = b.createdAt?.toMillis() ?? 0;
        return bTime - aTime;
      });
  },

  async getMyRequestById(
    id: string,
    uid: string,
  ): Promise<ProjectRequest | null> {
    if (!uid) return null;

    const snapshot = await getDoc(doc(db, COLLECTIONS.projectRequests, id));
    if (!snapshot.exists()) return null;

    const data = snapshot.data();
    if (data.ownerUid !== uid) return null;

    return toRequest(snapshot as QueryDocumentSnapshot<DocumentData>);
  },

  async updateMyRequest(
    id: string,
    uid: string,
    values: ProjectRequestFormOutput,
    files: File[] = [],
  ): Promise<void> {
    if (!uid) throw new Error("You must be signed in.");

    const snapshot = await getDoc(doc(db, COLLECTIONS.projectRequests, id));
    if (!snapshot.exists()) throw new Error("Request not found.");

    const current = snapshot.data();
    if (current.ownerUid !== uid)
      throw new Error("You are not allowed to edit this request.");

    const createdAt = current.createdAt as Timestamp | undefined;
    if (!createdAt) throw new Error("This request cannot be edited.");

    const settings = await requestSettingsService.getSecuritySettings();
    const editDeadline =
      createdAt.toMillis() +
      settings.customerRequestEditWindowHours * 60 * 60 * 1000;
    if (Date.now() >= editDeadline) {
      throw new Error("The editing window for this request has ended.");
    }

    // New attachments are uploaded to the same imgBB flow used by the
    // original request. Existing attachments are intentionally preserved.
    const newUploads = files.length ? await imgbbService.uploadMany(files) : [];
    const newAttachments = newUploads.map((uploaded, index) =>
      toAttachment(files[index], uploaded),
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
        purpose: nullable(values.projectPurpose) ?? "",
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
        links: values.referenceLinks.filter((link): link is string =>
          Boolean(link && link.trim()),
        ),
        description: nullable(values.referenceDescription),
      },
      additionalRequirements: {
        specialRequirements: nullable(values.specialRequirements),
        additionalNotes: nullable(values.additionalNotes),
        consultationRequired: values.consultationRequired,
        hasExistingHardware: values.hasExistingHardware,
        existingHardwareDescription: nullable(
          values.existingHardwareDescription,
        ),
        hasExistingCode: values.hasExistingCode,
        existingCodeDescription: nullable(values.existingCodeDescription),
      },
      updatedAt: serverTimestamp(),
    });
  },

  async deleteMyRequest(id: string, uid: string): Promise<void> {
    if (!uid) throw new Error("You must be signed in.");

    const requestRef = doc(db, COLLECTIONS.projectRequests, id);
    const snapshot = await getDoc(requestRef);
    if (!snapshot.exists()) throw new Error("Request not found.");

    const current = snapshot.data();
    if (current.ownerUid !== uid)
      throw new Error("You are not allowed to delete this request.");
    if (current.deletedAt)
      throw new Error("This request is already in the trash.");

    const createdAt = current.createdAt as Timestamp | undefined;
    if (!createdAt) throw new Error("This request cannot be deleted.");

    const settings = await requestSettingsService.getSecuritySettings();
    const deadline =
      createdAt.toMillis() +
      settings.customerRequestEditWindowHours * 60 * 60 * 1000;
    if (Date.now() >= deadline) {
      throw new Error("The deletion window for this request has ended.");
    }

    await updateDoc(requestRef, {
      deletedAt: serverTimestamp(),
      deletedBy: "customer",
      updatedAt: serverTimestamp(),
    });

    const requestNumber = current.requestNumber as string | undefined;
    if (requestNumber) {
      try {
        await setDoc(
          statusLookupRef(requestNumber),
          { deletedAt: serverTimestamp(), updatedAt: serverTimestamp() },
          { merge: true },
        );
      } catch (error) {
        if (import.meta.env.DEV)
          console.warn("Could not mark status lookup as trashed", error);
      }
    }
  },

  /**
   * Backfills a project token for requests created before the token system
   * existed. This keeps older requests manageable without weakening the
   * administrator authentication boundary.
   */
  async ensureProjectToken(id: string): Promise<string> {
    const requestRef = doc(db, COLLECTIONS.projectRequests, id);
    const snapshot = await getDoc(requestRef);
    if (!snapshot.exists()) throw new Error("Request not found.");

    const current = snapshot.data();
    if (typeof current.projectToken === "string" && current.projectToken.trim()) {
      return current.projectToken.trim().toUpperCase();
    }

    const projectToken = generateProjectToken();
    await updateDoc(requestRef, { projectToken, updatedAt: serverTimestamp() });
    return projectToken;
  },

  async getTrashedRequests(): Promise<AdminProjectRequest[]> {
    const [snapshot, adminData] = await Promise.all([
      getDocs(query(requestsRef, orderBy("createdAt", "desc"))),
      getAdminDataById(),
    ]);
    return snapshot.docs
      .map((document) => withAdmin(toRequest(document), adminData))
      .filter((request) => Boolean(request.deletedAt));
  },

  async trashRequest(id: string, projectToken: string): Promise<void> {
    const requestRef = doc(db, COLLECTIONS.projectRequests, id);
    const snapshot = await getDoc(requestRef);
    if (!snapshot.exists()) throw new Error("Request not found.");

    const current = snapshot.data();
    if (current.deletedAt) throw new Error("This request is already in the trash.");

    const enteredToken = projectToken.trim().toUpperCase();
    const storedToken =
      typeof current.projectToken === "string"
        ? current.projectToken.trim().toUpperCase()
        : "";

    if (!enteredToken || !storedToken || enteredToken !== storedToken) {
      throw new Error("The project token is incorrect. Copy the token exactly from the request.");
    }

    const requestNumber = current.requestNumber as string | undefined;
    await updateDoc(requestRef, {
      deletedAt: serverTimestamp(),
      deletedBy: "admin",
      updatedAt: serverTimestamp(),
    });

    if (requestNumber) {
      try {
        await setDoc(
          statusLookupRef(requestNumber),
          { deletedAt: serverTimestamp(), updatedAt: serverTimestamp() },
          { merge: true },
        );
      } catch (error) {
        if (import.meta.env.DEV)
          console.warn("Could not mark status lookup as trashed", error);
      }
    }
  },

  async permanentlyDeleteMyRequest(id: string, uid: string): Promise<void> {
    if (!uid) throw new Error("You must be signed in.");

    const requestRef = doc(db, COLLECTIONS.projectRequests, id);
    const snapshot = await getDoc(requestRef);
    if (!snapshot.exists()) throw new Error("Request not found.");

    const current = snapshot.data();
    if (current.ownerUid !== uid)
      throw new Error("You are not allowed to delete this request.");
    if (!current.deletedAt || current.deletedBy !== "customer") {
      throw new Error("This request is not in your trash.");
    }

    // One batch: the rules only let a customer remove the admin-only record
    // together with the request it belongs to.
    const batch = writeBatch(db);
    batch.delete(requestRef);
    batch.delete(privateDocRef(id));
    await batch.commit();

    const requestNumber = current.requestNumber as string | undefined;
    if (requestNumber) {
      try {
        await deleteDoc(statusLookupRef(requestNumber));
      } catch (error) {
        if (import.meta.env.DEV)
          console.warn("Could not remove status lookup record", error);
      }
    }
  },

  /** Admin only — permanently removes an already-trashed request. */
  async permanentlyDeleteTrashedRequest(id: string): Promise<void> {
    const requestRef = doc(db, COLLECTIONS.projectRequests, id);
    const snapshot = await getDoc(requestRef);
    if (!snapshot.exists()) throw new Error("Request not found.");

    const current = snapshot.data();
    if (!current.deletedAt) {
      throw new Error("Only requests already in the trash can be permanently deleted.");
    }

    const batch = writeBatch(db);
    batch.delete(requestRef);
    batch.delete(privateDocRef(id));
    await batch.commit();

    const requestNumber = current.requestNumber as string | undefined;
    if (requestNumber) {
      try {
        await deleteDoc(statusLookupRef(requestNumber));
      } catch (error) {
        if (import.meta.env.DEV)
          console.warn("Could not remove status lookup record", error);
      }
    }
  },

  async restoreRequest(id: string): Promise<void> {
    const requestRef = doc(db, COLLECTIONS.projectRequests, id);
    const snapshot = await getDoc(requestRef);
    if (!snapshot.exists()) throw new Error("Request not found.");

    const requestNumber = snapshot.data().requestNumber as string | undefined;
    await updateDoc(requestRef, {
      deletedAt: null,
      deletedBy: null,
      updatedAt: serverTimestamp(),
    });

    if (requestNumber) {
      try {
        await setDoc(
          statusLookupRef(requestNumber),
          { deletedAt: null, updatedAt: serverTimestamp() },
          { merge: true },
        );
      } catch (error) {
        if (import.meta.env.DEV)
          console.warn("Could not restore status lookup record", error);
      }
    }
  },

  async getRecentRequests(limitCount = 5): Promise<AdminProjectRequest[]> {
    const all = await requestService.getRequests();
    return all.slice(0, limitCount);
  },

  /** Admin only. */
  async getRequestById(id: string): Promise<AdminProjectRequest | null> {
    const [snapshot, adminSnapshot] = await Promise.all([
      getDoc(doc(db, COLLECTIONS.projectRequests, id)),
      getDoc(privateDocRef(id)),
    ]);
    if (!snapshot.exists()) return null;
    return {
      ...toRequest(snapshot as QueryDocumentSnapshot<DocumentData>),
      admin: toRequestAdmin(adminSnapshot),
    };
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
      const requestNumber = snapshot.data()?.requestNumber as
        | string
        | undefined;
      if (requestNumber) {
        await setDoc(
          statusLookupRef(requestNumber),
          { status, updatedAt: serverTimestamp() },
          { merge: true },
        );
      }
    } catch (error) {
      if (import.meta.env.DEV)
        console.warn("Could not sync status-lookup record", error);
    }
  },

  async updateRequestPriority(
    id: string,
    priority: RequestPriority,
  ): Promise<void> {
    await updateDoc(doc(db, COLLECTIONS.projectRequests, id), {
      priority,
      updatedAt: serverTimestamp(),
    });
  },

  async updateCustomerUpdate(
    id: string,
    customerUpdate: string | null,
  ): Promise<void> {
    const requestSnapshot = await getDoc(
      doc(db, COLLECTIONS.projectRequests, id),
    );
    if (!requestSnapshot.exists()) throw new Error("Request not found.");
    const requestNumber = requestSnapshot.data()?.requestNumber as
      | string
      | undefined;
    if (!requestNumber) throw new Error("Request reference is missing.");

    const updateText = customerUpdate?.trim() || null;
    const updateTimestamp = updateText ? serverTimestamp() : null;

    await updateDoc(doc(db, COLLECTIONS.projectRequests, id), {
      customerUpdate: updateText,
      customerUpdateAt: updateTimestamp,
      updatedAt: serverTimestamp(),
    });

    await setDoc(
      statusLookupRef(requestNumber),
      {
        customerUpdate: updateText,
        customerUpdateAt: updateTimestamp,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  },

  /**
   * Writes the admin-only fields to requestPrivate/{id} and bumps the request's
   * updatedAt in the same batch, so the two can never disagree.
   */
  async updateAdminFields(
    id: string,
    fields: {
      notes?: string | null;
      quotedAmount?: number | null;
      assignedTo?: string | null;
    },
  ): Promise<void> {
    const updates: Record<string, unknown> = { updatedAt: serverTimestamp() };
    if (fields.notes !== undefined) updates.notes = fields.notes;
    if (fields.quotedAmount !== undefined)
      updates.quotedAmount = fields.quotedAmount;
    if (fields.assignedTo !== undefined)
      updates.assignedTo = fields.assignedTo;

    const batch = writeBatch(db);
    batch.set(privateDocRef(id), updates, { merge: true });
    batch.update(doc(db, COLLECTIONS.projectRequests, id), {
      updatedAt: serverTimestamp(),
    });
    await batch.commit();
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
   * itself, an unguessable bearer token (10 random characters, ~8e14
   * combinations; see utils/requestNumber.ts). The email match is a privacy
   * courtesy on top of that, not an additional security boundary.
   */
  async lookupStatus(
    requestNumber: string,
    email: string,
  ): Promise<PublicRequestStatus | null> {
    const normalizedNumber = normalizeRequestNumber(requestNumber);
    const snapshot = await getDoc(statusLookupRef(normalizedNumber));
    if (!snapshot.exists()) return null;

    const data = snapshot.data();
    if (data.deletedAt) return null;
    // Records store a hash. The plain-email branch only serves records created
    // before scripts/migrate-request-privacy.mjs has been run; remove it after.
    const matches =
      typeof data.emailHash === "string"
        ? data.emailHash === (await hashEmail(email))
        : (data.email as string | undefined)?.toLowerCase() ===
          email.trim().toLowerCase();
    if (!matches) return null;

    return {
      requestNumber: data.requestNumber ?? normalizedNumber,
      status: data.status ?? "new",
      projectTitle: data.projectTitle ?? "",
      createdAt: data.createdAt ?? null,
      updatedAt: data.updatedAt ?? null,
      customerUpdate: data.customerUpdate ?? null,
      customerUpdateAt: data.customerUpdateAt ?? null,
    };
  },
};
