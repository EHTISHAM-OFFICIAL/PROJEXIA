import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { COLLECTIONS, db } from '../firebase/firestore';
import { emailNotificationService } from './emailNotificationService';
import type { CreateMeetingInput, MeetingRequest, MeetingStatus } from '../types/meeting';

const meetingsRef = collection(db, COLLECTIONS.meetingRequests);

function toMeeting(snapshot: any): MeetingRequest {
  const d = snapshot.data();
  return {
    id: snapshot.id, fullName: d.fullName ?? '', email: d.email ?? '', phone: d.phone ?? null,
    whatsapp: d.whatsapp ?? null, country: d.country ?? null, city: d.city ?? null,
    purpose: d.purpose ?? 'General inquiry', preferredDate: d.preferredDate ?? '',
    preferredTime: d.preferredTime ?? '', timezone: d.timezone ?? 'Asia/Karachi',
    duration: d.duration ?? '30 minutes', method: d.method ?? 'Google Meet',
    discussion: d.discussion ?? '', projectReference: d.projectReference ?? null,
    additionalNotes: d.additionalNotes ?? null, status: d.status ?? 'pending',
    adminNotes: d.adminNotes ?? null, confirmedDate: d.confirmedDate ?? null,
    confirmedTime: d.confirmedTime ?? null, meetingLink: d.meetingLink ?? null,
    createdAt: d.createdAt ?? null, updatedAt: d.updatedAt ?? null,
  };
}

export const meetingService = {
  async createMeeting(values: CreateMeetingInput): Promise<string> {
    const ref = doc(meetingsRef);
    await setDoc(ref, {
      fullName: values.fullName.trim(), email: values.email.trim().toLowerCase(),
      phone: values.phone?.trim() || null, whatsapp: values.whatsapp?.trim() || null,
      country: values.country?.trim() || null, city: values.city?.trim() || null,
      purpose: values.purpose, preferredDate: values.preferredDate,
      preferredTime: values.preferredTime, timezone: values.timezone,
      duration: values.duration, method: values.method, discussion: values.discussion.trim(),
      projectReference: values.projectReference?.trim() || null,
      additionalNotes: values.additionalNotes?.trim() || null,
      status: 'pending' satisfies MeetingStatus, adminNotes: null,
      confirmedDate: null, confirmedTime: null, meetingLink: null,
      createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
    });

    const message = [
      'NEW ProjexiaHub MEETING REQUEST', '',
      'Name: ' + values.fullName, 'Email: ' + values.email,
      'Phone: ' + (values.phone?.trim() || 'Not provided'),
      'WhatsApp: ' + (values.whatsapp?.trim() || 'Not provided'),
      'Country: ' + (values.country?.trim() || 'Not provided'),
      'City: ' + (values.city?.trim() || 'Not provided'), '',
      '--- Meeting ---', 'Purpose: ' + values.purpose,
      'Preferred date: ' + values.preferredDate, 'Preferred time: ' + values.preferredTime,
      'Timezone: ' + values.timezone, 'Duration: ' + values.duration,
      'Method: ' + values.method,
      'Project reference: ' + (values.projectReference?.trim() || 'Not provided'), '',
      '--- Discussion ---', values.discussion, '',
      '--- Additional notes ---', values.additionalNotes?.trim() || 'None',
    ].join('\n');

    await emailNotificationService.notify({
      subject: 'New meeting request — ' + values.fullName,
      message, replyTo: values.email, name: values.fullName, email: values.email,
      title: 'ProjexiaHub Meeting Request', throwOnError: false,
    });
    return ref.id;
  },

  async listMeetings(): Promise<MeetingRequest[]> {
    const snapshot = await getDocs(query(meetingsRef, orderBy('createdAt', 'desc')));
    return snapshot.docs.map(toMeeting);
  },

  async getMeeting(id: string): Promise<MeetingRequest | null> {
    const snapshot = await getDoc(doc(meetingsRef, id));
    return snapshot.exists() ? toMeeting(snapshot) : null;
  },

  async updateMeeting(id: string, values: {
    status: MeetingStatus;
    adminNotes?: string | null;
    confirmedDate?: string | null;
    confirmedTime?: string | null;
    meetingLink?: string | null;
  }): Promise<void> {
    await updateDoc(doc(meetingsRef, id), {
      status: values.status, adminNotes: values.adminNotes?.trim() || null,
      confirmedDate: values.confirmedDate || null, confirmedTime: values.confirmedTime || null,
      meetingLink: values.meetingLink?.trim() || null, updatedAt: serverTimestamp(),
    });
  },

  async deleteMeeting(id: string): Promise<void> {
    await deleteDoc(doc(meetingsRef, id));
  },
};
