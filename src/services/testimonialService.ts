import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase/firestore';
import type { Testimonial, TestimonialDraft } from '../types/testimonial';

const testimonialsRef = collection(db, 'testimonials');

function toTestimonial(snapshot: QueryDocumentSnapshot<DocumentData>): Testimonial {
  const data = snapshot.data();
  return {
    id: snapshot.id,
    name: data.name ?? '',
    role: data.role ?? null,
    company: data.company ?? null,
    quote: data.quote ?? '',
    rating: data.rating ?? null,
    published: data.published ?? false,
    createdAt: data.createdAt ?? null,
  };
}

export const testimonialService = {
  async getPublished(): Promise<Testimonial[]> {
    const snapshot = await getDocs(
      query(testimonialsRef, where('published', '==', true), orderBy('createdAt', 'desc'))
    );
    return snapshot.docs.map(toTestimonial);
  },

  async getAll(): Promise<Testimonial[]> {
    const snapshot = await getDocs(query(testimonialsRef, orderBy('createdAt', 'desc')));
    return snapshot.docs.map(toTestimonial);
  },

  async getById(id: string): Promise<Testimonial | null> {
    const snapshot = await getDoc(doc(db, 'testimonials', id));
    if (!snapshot.exists()) return null;
    return toTestimonial(snapshot as QueryDocumentSnapshot<DocumentData>);
  },

  async create(draft: TestimonialDraft): Promise<string> {
    const created = await addDoc(testimonialsRef, { ...draft, createdAt: serverTimestamp() });
    return created.id;
  },

  async update(id: string, updates: Partial<TestimonialDraft>): Promise<void> {
    await updateDoc(doc(db, 'testimonials', id), updates);
  },

  async remove(id: string): Promise<void> {
    await deleteDoc(doc(db, 'testimonials', id));
  },
};
