import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  limit as fsLimit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
} from 'firebase/firestore';
import { COLLECTIONS, db } from '../firebase/firestore';
import type { Project, ProjectDraft } from '../types/project';
import { slugify, withSlugSuffix } from '../utils/slug';

const projectsRef = collection(db, COLLECTIONS.projects);

/** Fills in defaults so a partially-seeded document never crashes the UI. */
function toProject(snapshot: QueryDocumentSnapshot<DocumentData>): Project {
  const data = snapshot.data();
  return {
    id: snapshot.id,
    title: data.title ?? 'Untitled project',
    slug: data.slug ?? snapshot.id,
    shortDescription: data.shortDescription ?? '',
    description: data.description ?? '',
    category: data.category ?? 'Other',
    subcategory: data.subcategory ?? null,
    status: data.status ?? 'completed',
    difficulty: data.difficulty ?? 'intermediate',
    technologies: data.technologies ?? [],
    tags: data.tags ?? [],
    objectives: data.objectives ?? [],
    features: data.features ?? [],
    problemStatement: data.problemStatement ?? '',
    solutionOverview: data.solutionOverview ?? '',
    howItWorks: data.howItWorks ?? '',
    challenges: data.challenges ?? [],
    results: data.results ?? '',
    components: data.components ?? [],
    specifications: data.specifications ?? [],
    estimatedCost: data.estimatedCost ?? { amount: null, currency: 'PKR' },
    media: {
      thumbnailUrl: data.media?.thumbnailUrl ?? '',
      heroImageUrl: data.media?.heroImageUrl ?? null,
      gallery: data.media?.gallery ?? [],
      videoUrl: data.media?.videoUrl ?? null,
    },
    externalLinks: {
      github: data.externalLinks?.github ?? null,
      documentation: data.externalLinks?.documentation ?? null,
      demo: data.externalLinks?.demo ?? null,
    },
    seo: {
      metaTitle: data.seo?.metaTitle ?? null,
      metaDescription: data.seo?.metaDescription ?? null,
      keywords: data.seo?.keywords ?? [],
    },
    featured: data.featured ?? false,
    published: data.published ?? false,
    viewCount: data.viewCount ?? 0,
    createdAt: data.createdAt ?? null,
    updatedAt: data.updatedAt ?? null,
    completedAt: data.completedAt ?? null,
  };
}

export const projectService = {
  /**
   * All published projects, newest first.
   * Search and filtering happen in memory on the client because Firestore has no
   * full-text search. This is intentional at this scale — see ARCHITECTURE.md
   * for the migration path if the catalogue grows past a few hundred projects.
   */
  async getPublishedProjects(limitCount?: number): Promise<Project[]> {
    const constraints = [
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      ...(limitCount ? [fsLimit(limitCount)] : []),
    ];
    const snapshot = await getDocs(query(projectsRef, ...constraints));
    return snapshot.docs.map(toProject);
  },

  async getFeaturedProjects(limitCount = 3): Promise<Project[]> {
    const snapshot = await getDocs(
      query(
        projectsRef,
        where('published', '==', true),
        where('featured', '==', true),
        orderBy('createdAt', 'desc'),
        fsLimit(limitCount)
      )
    );
    return snapshot.docs.map(toProject);
  },

  async getProjectBySlug(slug: string): Promise<Project | null> {
    const snapshot = await getDocs(
      query(projectsRef, where('slug', '==', slug), where('published', '==', true), fsLimit(1))
    );
    return snapshot.empty ? null : toProject(snapshot.docs[0]);
  },

  /** Projects in the same category, excluding the current one. */
  async getRelatedProjects(project: Project, limitCount = 3): Promise<Project[]> {
    const snapshot = await getDocs(
      query(
        projectsRef,
        where('published', '==', true),
        where('category', '==', project.category),
        orderBy('createdAt', 'desc'),
        fsLimit(limitCount + 1)
      )
    );
    return snapshot.docs
      .map(toProject)
      .filter((candidate) => candidate.id !== project.id)
      .slice(0, limitCount);
  },

  /** Admin view: includes unpublished and archived projects. */
  async getAllProjects(): Promise<Project[]> {
    const snapshot = await getDocs(query(projectsRef, orderBy('createdAt', 'desc')));
    return snapshot.docs.map(toProject);
  },

  async getProjectById(id: string): Promise<Project | null> {
    const snapshot = await getDoc(doc(db, COLLECTIONS.projects, id));
    if (!snapshot.exists()) return null;
    return toProject(snapshot as QueryDocumentSnapshot<DocumentData>);
  },

  /** Firestore cannot enforce uniqueness, so slugs are checked before writing. */
  async isSlugAvailable(slug: string, ignoreId?: string): Promise<boolean> {
    const snapshot = await getDocs(query(projectsRef, where('slug', '==', slug), fsLimit(2)));
    return snapshot.docs.every((document) => document.id === ignoreId);
  },

  async generateUniqueSlug(title: string, ignoreId?: string): Promise<string> {
    const base = slugify(title) || 'project';
    if (await projectService.isSlugAvailable(base, ignoreId)) return base;
    return withSlugSuffix(base);
  },

  async createProject(draft: ProjectDraft): Promise<string> {
    const slug = await projectService.generateUniqueSlug(draft.slug || draft.title);
    const created = await addDoc(projectsRef, {
      ...draft,
      slug,
      viewCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return created.id;
  },

  async updateProject(id: string, updates: Partial<ProjectDraft>): Promise<void> {
    await updateDoc(doc(db, COLLECTIONS.projects, id), {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  },

  async deleteProject(id: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTIONS.projects, id));
  },

  setPublished: (id: string, published: boolean) =>
    projectService.updateProject(id, { published }),

  setFeatured: (id: string, featured: boolean) => projectService.updateProject(id, { featured }),

  archive: (id: string) => projectService.updateProject(id, { status: 'archived', published: false }),

  /**
   * Fire-and-forget view counter. Failure is silent by design: a blocked
   * increment must never stop a visitor from reading the project.
   */
  incrementViewCount(id: string): void {
    void updateDoc(doc(db, COLLECTIONS.projects, id), { viewCount: increment(1) }).catch(() => {});
  },
};
