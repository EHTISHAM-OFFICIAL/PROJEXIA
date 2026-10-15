import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firestore';
import type { RequestStatus } from '../types/projectRequest';

export interface RequestStatusMessage {
  title: string;
  description: string;
  nextStep: string;
}

export type RequestStatusMessages = Record<RequestStatus, RequestStatusMessage>;

export const DEFAULT_REQUEST_STATUS_MESSAGES: RequestStatusMessages = {
  new: { title: 'Request Received', description: "We've received your project request and it is waiting for review.", nextStep: 'Your request will be reviewed by the team. We’ll update you when it progresses.' },
  reviewing: { title: 'Request Under Review', description: "We're currently reviewing your project requirements and request details.", nextStep: 'We’ll update your request when the review progresses.' },
  quoted: { title: 'Quote Ready', description: 'Your project request has been reviewed and pricing/details are available.', nextStep: 'Contact the team regarding the quotation and next steps.' },
  accepted: { title: 'Project Accepted', description: 'Your project request has been accepted and is ready to move forward.', nextStep: 'Work will proceed according to the agreed plan.' },
  'in-progress': { title: 'Project In Progress', description: 'Work on your project is currently underway.', nextStep: 'We’ll update your request as progress is made.' },
  completed: { title: 'Project Completed', description: 'Your project work has been completed.', nextStep: 'Contact the team if you need any additional assistance.' },
  rejected: { title: 'Request Closed', description: 'This project request could not be accepted.', nextStep: 'Contact the team if you have questions about the request.' },
  cancelled: { title: 'Request Cancelled', description: 'This project request has been cancelled and is no longer active.', nextStep: 'Contact the team if you would like to discuss the project again.' },
};

const DOC_PATH = 'settings/requestStatusMessages';

function normalizeMessage(value: unknown, fallback: RequestStatusMessage): RequestStatusMessage {
  if (!value || typeof value !== 'object') return fallback;
  const source = value as Record<string, unknown>;
  return {
    title: typeof source.title === 'string' && source.title.trim() ? source.title : fallback.title,
    description: typeof source.description === 'string' && source.description.trim() ? source.description : fallback.description,
    nextStep: typeof source.nextStep === 'string' && source.nextStep.trim() ? source.nextStep : fallback.nextStep,
  };
}

export async function getRequestStatusMessages(): Promise<RequestStatusMessages> {
  const snapshot = await getDoc(doc(db, DOC_PATH));
  if (!snapshot.exists()) return DEFAULT_REQUEST_STATUS_MESSAGES;
  const data = snapshot.data();
  return {
    new: normalizeMessage(data.new, DEFAULT_REQUEST_STATUS_MESSAGES.new),
    reviewing: normalizeMessage(data.reviewing, DEFAULT_REQUEST_STATUS_MESSAGES.reviewing),
    quoted: normalizeMessage(data.quoted, DEFAULT_REQUEST_STATUS_MESSAGES.quoted),
    accepted: normalizeMessage(data.accepted, DEFAULT_REQUEST_STATUS_MESSAGES.accepted),
    'in-progress': normalizeMessage(data['in-progress'], DEFAULT_REQUEST_STATUS_MESSAGES['in-progress']),
    completed: normalizeMessage(data.completed, DEFAULT_REQUEST_STATUS_MESSAGES.completed),
    rejected: normalizeMessage(data.rejected, DEFAULT_REQUEST_STATUS_MESSAGES.rejected),
    cancelled: normalizeMessage(data.cancelled, DEFAULT_REQUEST_STATUS_MESSAGES.cancelled),
  };
}

export async function saveRequestStatusMessages(messages: RequestStatusMessages): Promise<void> {
  await setDoc(doc(db, DOC_PATH), { ...messages, updatedAt: serverTimestamp() }, { merge: true });
}

export const requestStatusService = { getRequestStatusMessages, saveRequestStatusMessages };
