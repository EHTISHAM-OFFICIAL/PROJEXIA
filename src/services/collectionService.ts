import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase/firestore";
import type {
  CollectionItem,
  CollectionItemDraft,
  CollectionSettings,
} from "../types/collection";
import { DEFAULT_COLLECTION_CATEGORIES } from "../types/collection";

const itemsRef = collection(db, "collections");
const settingsRef = doc(db, "settings", "collections");

function cleanCategories(value: unknown): string[] {
  if (!Array.isArray(value)) return [...DEFAULT_COLLECTION_CATEGORIES];
  const seen = new Set<string>();
  const result = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter((item) => {
      const key = item.toLocaleLowerCase();
      if (!item || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  return result.length ? result : [...DEFAULT_COLLECTION_CATEGORIES];
}

function normalizeItem(snapshot: { id: string; data: () => Record<string, unknown> }): CollectionItem {
  const data = snapshot.data();
  const images = Array.isArray(data.images)
    ? data.images
        .filter((image): image is Record<string, unknown> => Boolean(image) && typeof image === "object")
        .filter((image) => typeof image.url === "string" && image.url.startsWith("https://"))
        .map((image) => ({
          url: image.url as string,
          alt: typeof image.alt === "string" ? image.alt : "",
        }))
    : [];
  const additionalDetails = Array.isArray(data.additionalDetails)
    ? data.additionalDetails
        .filter((detail): detail is Record<string, unknown> => Boolean(detail) && typeof detail === "object")
        .filter((detail) => typeof detail.label === "string" && typeof detail.value === "string")
        .map((detail) => ({ label: detail.label as string, value: detail.value as string }))
    : [];

  return {
    id: snapshot.id,
    title: typeof data.title === "string" ? data.title : "Untitled item",
    category: typeof data.category === "string" ? data.category : "Others",
    shortDescription: typeof data.shortDescription === "string" ? data.shortDescription : "",
    description: typeof data.description === "string" ? data.description : "",
    images,
    material: typeof data.material === "string" ? data.material : "",
    dimensions: typeof data.dimensions === "string" ? data.dimensions : "",
    color: typeof data.color === "string" ? data.color : "",
    tags: Array.isArray(data.tags) ? data.tags.filter((tag): tag is string => typeof tag === "string").map((tag) => tag.trim()).filter(Boolean) : [],
    additionalDetails,
    enquiryEnabled: data.enquiryEnabled === true,
    published: data.published === true,
    displayOrder: Number.isFinite(Number(data.displayOrder)) ? Number(data.displayOrder) : 0,
    createdAt: (data.createdAt as CollectionItem["createdAt"]) ?? null,
    updatedAt: (data.updatedAt as CollectionItem["updatedAt"]) ?? null,
  };
}

function timestampValue(value: CollectionItem["updatedAt"] | CollectionItem["createdAt"]): number {
  if (!value) return 0;
  return typeof value.toMillis === "function" ? value.toMillis() : 0;
}

function normalizeDraft(value: CollectionItemDraft): CollectionItemDraft {
  return {
    ...value,
    title: value.title.trim(),
    category: value.category.trim(),
    shortDescription: value.shortDescription.trim(),
    description: value.description.trim(),
    images: value.images
      .filter((image) => image.url.trim())
      .map((image) => ({ url: image.url.trim(), alt: image.alt.trim() })),
    material: value.material.trim(),
    dimensions: value.dimensions.trim(),
    color: value.color.trim(),
    tags: Array.from(new Set((value.tags ?? []).map((tag) => tag.trim()).filter(Boolean))),
    additionalDetails: value.additionalDetails
      .map((detail) => ({ label: detail.label.trim(), value: detail.value.trim() }))
      .filter((detail) => detail.label && detail.value),
    displayOrder: Number.isFinite(value.displayOrder) ? value.displayOrder : 0,
  };
}

export const collectionService = {
  async getSettings(): Promise<CollectionSettings> {
    const snapshot = await getDoc(settingsRef);
    const data = snapshot.exists() ? snapshot.data() : {};
    return { categories: cleanCategories(data.categories), updatedAt: (data.updatedAt as CollectionSettings["updatedAt"]) ?? null };
  },

  async saveSettings(value: CollectionSettings): Promise<void> {
    await setDoc(settingsRef, {
      categories: cleanCategories(value.categories),
      updatedAt: serverTimestamp(),
    }, { merge: true });
  },

  async getPublished(): Promise<CollectionItem[]> {
    const snapshot = await getDocs(query(itemsRef, where("published", "==", true)));
    return snapshot.docs
      .map(normalizeItem)
      .sort((a, b) => a.displayOrder - b.displayOrder || a.title.localeCompare(b.title));
  },

  async getAll(): Promise<CollectionItem[]> {
    const snapshot = await getDocs(itemsRef);
    return snapshot.docs
      .map(normalizeItem)
      .sort((a, b) => timestampValue(b.updatedAt) - timestampValue(a.updatedAt) || a.title.localeCompare(b.title));
  },

  async getById(id: string): Promise<CollectionItem | null> {
    const snapshot = await getDoc(doc(db, "collections", id));
    return snapshot.exists() ? normalizeItem(snapshot) : null;
  },

  async save(value: CollectionItemDraft, id?: string): Promise<void> {
    const payload = normalizeDraft(value);
    if (!payload.title) throw new Error("Enter an item name before saving.");
    if (!payload.category) throw new Error("Choose a category before saving.");
    if (!payload.images.length) throw new Error("Upload at least one image before saving.");
    if (payload.images.length > 10) throw new Error("A collection item can have up to 10 images.");

    const record = { ...payload, updatedAt: serverTimestamp() };
    if (id) {
      await updateDoc(doc(db, "collections", id), record);
      return;
    }
    await addDoc(itemsRef, { ...record, createdAt: serverTimestamp() });
  },

  async setPublished(id: string, published: boolean): Promise<void> {
    await updateDoc(doc(db, "collections", id), { published, updatedAt: serverTimestamp() });
  },

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, "collections", id));
  },

  async renameCategory(oldName: string, newName: string): Promise<void> {
    const matching = await getDocs(query(itemsRef, where("category", "==", oldName)));
    const documents = matching.docs;
    for (let offset = 0; offset < documents.length; offset += 450) {
      const batch = writeBatch(db);
      documents.slice(offset, offset + 450).forEach((item) => {
        batch.update(item.ref, { category: newName, updatedAt: serverTimestamp() });
      });
      await batch.commit();
    }
  },
};