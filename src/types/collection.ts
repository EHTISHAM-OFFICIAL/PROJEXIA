import type { Timestamp } from "firebase/firestore";

export interface CollectionImage {
  url: string;
  alt: string;
}

export interface CollectionDetail {
  label: string;
  value: string;
}

export interface CollectionItem {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  images: CollectionImage[];
  material: string;
  dimensions: string;
  color: string;
  additionalDetails: CollectionDetail[];
  enquiryEnabled: boolean;
  published: boolean;
  displayOrder: number;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

export type CollectionItemDraft = Omit<
  CollectionItem,
  "id" | "createdAt" | "updatedAt"
>;

export interface CollectionSettings {
  categories: string[];
  updatedAt?: Timestamp | null;
}

export const DEFAULT_COLLECTION_CATEGORIES = [
  "Acrylic Products",
  "Project Accessories",
  "Educational Accessories",
  "Electronics Components",
  "Custom Products",
  "Others",
];

export const EMPTY_COLLECTION_DRAFT: CollectionItemDraft = {
  title: "",
  category: DEFAULT_COLLECTION_CATEGORIES[0],
  shortDescription: "",
  description: "",
  images: [],
  material: "",
  dimensions: "",
  color: "",
  additionalDetails: [],
  enquiryEnabled: false,
  published: false,
  displayOrder: 0,
};