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
  writeBatch,
} from 'firebase/firestore';
import { COLLECTIONS, db } from '../firebase/firestore';
import type { ProjectLibraryDraft, ProjectLibraryItem, ProjectLibraryKind } from '../types/projectLibrary';
import { PROJECT_LIBRARY_STARTER } from '../constants/projectLibraryStarter';

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
    const snapshot = await getDocs(query(libraryRef, where('kind', '==', kind)));
    const starterByName = new Map(
      PROJECT_LIBRARY_STARTER
        .filter((item) => item.kind === kind)
        .map((item) => [normalizeName(item.name), item])
    );
    const stored = snapshot.docs.map((entry) => {
      const item = toItem(entry.id, entry.data());
      const starter = starterByName.get(normalizeName(item.name));
      // Older seeded records may have blank notes/units because those fields
      // were added later. Fill only blank metadata; keep all custom values.
      if (!starter) return item;
      return {
        ...item,
        category: item.category || starter.category,
        description: item.description || starter.description,
        unit: item.unit || starter.unit,
        defaultValue: item.defaultValue || starter.defaultValue,
      };
    });
    const storedNames = new Set(stored.map((item) => normalizeName(item.name)));
    const starter = PROJECT_LIBRARY_STARTER
      .filter((item) => item.kind === kind && !storedNames.has(normalizeName(item.name)))
      .map((item, index) => ({
        ...item,
        id: `starter-${kind}-${index}`,
      }));
    return [...stored, ...starter]
      .filter((item) => includeInactive || item.active)
      .sort((a, b) => a.name.localeCompare(b.name));
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

  /** Adds only missing starter entries; existing/custom records are never overwritten. */
  async seedStarterCatalog(): Promise<number> {
    const existing = await getDocs(libraryRef);
    const keys = new Set(existing.docs.map((entry) => `${String(entry.data().kind ?? '')}::${normalizeName(String(entry.data().name ?? ''))}`));
    const missing = PROJECT_LIBRARY_STARTER.filter((item) => {
      const key = `${item.kind}::${normalizeName(item.name)}`;
      if (keys.has(key)) return false;
      keys.add(key);
      return true;
    });
    if (!missing.length) return 0;
    // Firestore limits each batch to 500 writes. Chunk the expanded catalog
    // so a first-time seed can safely contain well over 500 entries.
    const batchSize = 450;
    for (let start = 0; start < missing.length; start += batchSize) {
      const batch = writeBatch(db);
      for (const item of missing.slice(start, start + batchSize)) {
        const ref = doc(libraryRef);
        batch.set(ref, { ...item, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
      }
      await batch.commit();
    }
    return missing.length;
  },
};
