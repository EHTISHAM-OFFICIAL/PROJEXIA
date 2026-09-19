import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit as fsLimit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase/firestore';
import type { BlogPost, BlogPostDraft } from '../types/blog';
import { slugify, withSlugSuffix } from '../utils/slug';

const postsRef = collection(db, 'posts');

function toPost(snapshot: QueryDocumentSnapshot<DocumentData>): BlogPost {
  const data = snapshot.data();
  return {
    id: snapshot.id,
    title: data.title ?? 'Untitled post',
    slug: data.slug ?? snapshot.id,
    excerpt: data.excerpt ?? '',
    body: data.body ?? '',
    coverImageUrl: data.coverImageUrl ?? null,
    published: data.published ?? false,
    createdAt: data.createdAt ?? null,
    updatedAt: data.updatedAt ?? null,
  };
}

export const blogService = {
  async getPublishedPosts(): Promise<BlogPost[]> {
    const snapshot = await getDocs(
      query(postsRef, where('published', '==', true), orderBy('createdAt', 'desc'))
    );
    return snapshot.docs.map(toPost);
  },

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const snapshot = await getDocs(
      query(postsRef, where('slug', '==', slug), where('published', '==', true), fsLimit(1))
    );
    return snapshot.empty ? null : toPost(snapshot.docs[0]);
  },

  async getAllPosts(): Promise<BlogPost[]> {
    const snapshot = await getDocs(query(postsRef, orderBy('createdAt', 'desc')));
    return snapshot.docs.map(toPost);
  },

  async getPostById(id: string): Promise<BlogPost | null> {
    const snapshot = await getDoc(doc(db, 'posts', id));
    if (!snapshot.exists()) return null;
    return toPost(snapshot as QueryDocumentSnapshot<DocumentData>);
  },

  async isSlugAvailable(slug: string, ignoreId?: string): Promise<boolean> {
    const snapshot = await getDocs(query(postsRef, where('slug', '==', slug), fsLimit(2)));
    return snapshot.docs.every((document) => document.id === ignoreId);
  },

  async generateUniqueSlug(title: string, ignoreId?: string): Promise<string> {
    const base = slugify(title) || 'post';
    if (await blogService.isSlugAvailable(base, ignoreId)) return base;
    return withSlugSuffix(base);
  },

  async createPost(draft: BlogPostDraft): Promise<string> {
    const slug = await blogService.generateUniqueSlug(draft.slug || draft.title);
    const created = await addDoc(postsRef, {
      ...draft,
      slug,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return created.id;
  },

  async updatePost(id: string, updates: Partial<BlogPostDraft>): Promise<void> {
    await updateDoc(doc(db, 'posts', id), { ...updates, updatedAt: serverTimestamp() });
  },

  async deletePost(id: string): Promise<void> {
    await deleteDoc(doc(db, 'posts', id));
  },
};
