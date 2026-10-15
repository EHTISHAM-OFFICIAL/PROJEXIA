export type ProjectLibraryKind =
  | 'component'
  | 'specification'
  | 'tag'
  | 'feature'
  | 'technology'
  | 'tool'
  | 'objective'
  | 'challenge'
  | 'category'
  | 'subcategory'
  | 'protocol'
  | 'application';

export interface ProjectLibraryItem {
  id: string;
  name: string;
  kind: ProjectLibraryKind;
  category: string;
  description: string;
  unit: string;
  defaultValue: string;
  active: boolean;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export type ProjectLibraryDraft = Omit<ProjectLibraryItem, 'id' | 'createdAt' | 'updatedAt'>;
