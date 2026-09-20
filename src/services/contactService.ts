import { addDoc, collection, orderBy, query, getDocs, serverTimestamp } from 'firebase/firestore';
import { COLLECTIONS, db } from '../firebase/firestore';
import { emailNotificationService } from './emailNotificationService';
import type { ContactFormValues } from '../utils/validation';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: unknown;
}

const messagesRef = collection(db, COLLECTIONS.contactMessages);

export const contactService = {
  async sendMessage(values: ContactFormValues): Promise<void> {
    await addDoc(messagesRef, {
      name: values.name,
      email: values.email,
      subject: values.subject,
      message: values.message,
      read: false,
      createdAt: serverTimestamp(),
    });

    void emailNotificationService.notify({
      subject: `New contact message — ${values.subject}`,
      message: `${values.name} (${values.email}) wrote:\n\n${values.message}`,
      replyTo: values.email,
    });
  },

  /** Admin only. */
  async getMessages(): Promise<ContactMessage[]> {
    const snapshot = await getDocs(query(messagesRef, orderBy('createdAt', 'desc')));
    return snapshot.docs.map((document) => ({
      id: document.id,
      ...(document.data() as Omit<ContactMessage, 'id'>),
    }));
  },
};
