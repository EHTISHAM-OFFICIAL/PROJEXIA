import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { COLLECTIONS, db } from '../firebase/firestore';
import type { ProjectLibraryDraft, ProjectLibraryItem, ProjectLibraryKind } from '../types/projectLibrary';

const libraryRef = collection(db, COLLECTIONS.projectLibrary);

function normalizeName(value: string) {
  return value.trim().toLocaleLowerCase().replace(/\s+/g, ' ');
}

function toItem(id: string, data: Record<string, unknown>): ProjectLibraryItem {
  return {
    id,
    name: typeof data.name === 'string' ? data.name : '',
    kind: data.kind as ProjectLibraryKind,
    category: typeof data.category === 'string' ? data.category : '',
    description: typeof data.description === 'string' ? data.description : '',
    unit: typeof data.unit === 'string' ? data.unit : '',
    defaultValue: typeof data.defaultValue === 'string' ? data.defaultValue : '',
    active: data.active !== false,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

export const projectLibraryService = {
  async list(includeInactive = false): Promise<ProjectLibraryItem[]> {
    const snapshot = await getDocs(query(libraryRef, orderBy('name', 'asc')));
    return snapshot.docs
      .map((entry) => toItem(entry.id, entry.data()))
      .filter((item) => includeInactive || item.active);
  },

  async listByKind(kind: ProjectLibraryKind, includeInactive = false): Promise<ProjectLibraryItem[]> {
    const snapshot = await getDocs(query(libraryRef, where('kind', '==', kind), orderBy('name', 'asc')));
    return snapshot.docs
      .map((entry) => toItem(entry.id, entry.data()))
      .filter((item) => includeInactive || item.active);
  },

  async save(draft: ProjectLibraryDraft, id?: string): Promise<void> {
    const name = draft.name.trim();
    if (!name) throw new Error('Enter a name for this library item.');
    const existing = await getDocs(query(libraryRef, where('kind', '==', draft.kind)));
    const duplicate = existing.docs.some((entry) =>
      entry.id !== id && normalizeName(String(entry.data().name ?? '')) === normalizeName(name)
    );
    if (duplicate) throw new Error('An item with this name already exists in this category.');
    const payload = {
      ...draft,
      name,
      category: draft.category.trim(),
      description: draft.description.trim(),
      unit: draft.unit.trim(),
      defaultValue: draft.defaultValue.trim(),
      updatedAt: serverTimestamp(),
    };
    if (id) {
      await updateDoc(doc(db, COLLECTIONS.projectLibrary, id), payload);
    } else {
      await addDoc(libraryRef, { ...payload, createdAt: serverTimestamp() });
    }
  },

  async setActive(id: string, active: boolean): Promise<void> {
    await updateDoc(doc(db, COLLECTIONS.projectLibrary, id), { active, updatedAt: serverTimestamp() });
  },

  async remove(id: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTIONS.projectLibrary, id));
  },
};
