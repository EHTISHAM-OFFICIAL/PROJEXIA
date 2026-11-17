import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
  writeBatch,
  type DocumentData,
  type QueryDocumentSnapshot,
} from 'firebase/firestore';
import { COLLECTIONS, db } from '../firebase/firestore';
import type {
  NewProjectReview,
  ProjectReviewStatus,
  ProjectReviewSubmission,
  PublicProjectReview,
  ReviewVerificationStatus,
} from '../types/projectReview';
import { calculateProjectReviewStats } from '../utils/projectReviewStats';

const submissionsRef = collection(db, COLLECTIONS.projectReviewSubmissions);
const publicReviewsRef = collection(db, COLLECTIONS.projectReviews);

function submissionId(userId: string, projectId: string): string {
  return userId + '_' + projectId;
}

function toSubmission(id: string, data: DocumentData): ProjectReviewSubmission {
  return {
    id,
    projectId: typeof data.projectId === 'string' ? data.projectId : '',
    userId: typeof data.userId === 'string' ? data.userId : '',
    username: typeof data.username === 'string' ? data.username : 'Customer',
    isAnonymous: data.isAnonymous === true,
    rating: Number.isInteger(data.rating) ? data.rating : 0,
    comment: typeof data.comment === 'string' ? data.comment : '',
    images: Array.isArray(data.images) ? data.images.filter((value: unknown): value is string => typeof value === 'string') : [],
    status: (['pending', 'approved', 'rejected', 'unpublished'].includes(data.status)
      ? data.status : 'pending') as ProjectReviewStatus,
    verificationStatus: data.verificationStatus === 'verified' ? 'verified' : 'unverified',
    moderationNote: typeof data.moderationNote === 'string' ? data.moderationNote : null,
    createdAt: data.createdAt ?? null,
    updatedAt: data.updatedAt ?? null,
    reviewedAt: data.reviewedAt ?? null,
    reviewedBy: typeof data.reviewedBy === 'string' ? data.reviewedBy : null,
    publishedAt: data.publishedAt ?? null,
  };
}

function toPublicReview(snapshot: QueryDocumentSnapshot<DocumentData>): PublicProjectReview {
  const data = snapshot.data();
  return {
    id: snapshot.id,
    projectId: typeof data.projectId === 'string' ? data.projectId : '',
    displayName: typeof data.displayName === 'string' ? data.displayName : 'Customer',
    isAnonymous: data.isAnonymous === true,
    rating: Number.isInteger(data.rating) ? data.rating : 0,
    comment: typeof data.comment === 'string' ? data.comment : '',
    images: Array.isArray(data.images) ? data.images.filter((value: unknown): value is string => typeof value === 'string') : [],
    verifiedCustomer: data.verifiedCustomer === true,
    createdAt: data.createdAt ?? null,
    publishedAt: data.publishedAt ?? null,
  };
}

async function getSubmission(id: string): Promise<ProjectReviewSubmission> {
  const snapshot = await getDoc(doc(submissionsRef, id));
  if (!snapshot.exists()) throw new Error('This review submission no longer exists.');
  return toSubmission(snapshot.id, snapshot.data());
}

async function getCurrentPublished(projectId: string): Promise<PublicProjectReview[]> {
  const snapshot = await getDocs(query(
    publicReviewsRef,
    where('projectId', '==', projectId),
    where('published', '==', true),
  ));
  return snapshot.docs.map(toPublicReview);
}

async function addModerationEvent(
  batch: ReturnType<typeof writeBatch>,
  reviewId: string,
  actorUid: string,
  action: string,
  note = '',
): Promise<void> {
  const eventRef = doc(collection(db, 'projectReviewModeration', reviewId, 'events'));
  batch.set(eventRef, {
    action,
    actorUid,
    note: note.slice(0, 1000),
    createdAt: serverTimestamp(),
  });
}

async function addProjectStats(
  batch: ReturnType<typeof writeBatch>,
  projectId: string,
  reviews: PublicProjectReview[],
): Promise<void> {
  const projectRef = doc(db, COLLECTIONS.projects, projectId);
  const projectSnapshot = await getDoc(projectRef);
  if (projectSnapshot.exists()) {
    batch.update(projectRef, { reviewStats: calculateProjectReviewStats(reviews) });
  }
}

export const projectReviewService = {
  async getOwnSubmission(projectId: string, userId: string): Promise<ProjectReviewSubmission | null> {
    const snapshot = await getDoc(doc(submissionsRef, submissionId(userId, projectId)));
    return snapshot.exists() ? toSubmission(snapshot.id, snapshot.data()) : null;
  },

  async getPublishedForProject(projectId: string): Promise<PublicProjectReview[]> {
    const snapshot = await getDocs(query(
      publicReviewsRef,
      where('projectId', '==', projectId),
      where('published', '==', true),
      orderBy('publishedAt', 'desc'),
      limit(12),
    ));
    return snapshot.docs.map(toPublicReview);
  },

  async getAllSubmissions(): Promise<ProjectReviewSubmission[]> {
    const snapshot = await getDocs(query(submissionsRef, orderBy('createdAt', 'desc')));
    return snapshot.docs.map((item) => toSubmission(item.id, item.data()));
  },

  async submit(input: NewProjectReview): Promise<void> {
    const comment = input.comment.trim();
    if (comment.length < 10 || comment.length > 2000) {
      throw new Error('Your review must be between 10 and 2,000 characters.');
    }
    if (!Number.isInteger(input.rating) || input.rating < 1 || input.rating > 5) {
      throw new Error('Choose a rating from 1 to 5 stars.');
    }
    if (input.images.length > 4) throw new Error('You can attach up to four images.');
    const id = submissionId(input.userId, input.projectId);
    await setDoc(doc(submissionsRef, id), {
      projectId: input.projectId,
      userId: input.userId,
      username: input.username,
      isAnonymous: input.isAnonymous,
      rating: input.rating,
      comment,
      images: input.images,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  },

  async setVerificationStatus(
    id: string,
    verified: boolean,
    adminUid: string,
  ): Promise<void> {
    const submission = await getSubmission(id);
    if (submission.status === 'approved' && !verified) {
      throw new Error('Unpublish this review before removing its customer verification.');
    }
    const batch = writeBatch(db);
    batch.update(doc(submissionsRef, id), {
      verificationStatus: verified ? 'verified' : 'unverified',
      updatedAt: serverTimestamp(),
    });
    await addModerationEvent(batch, id, adminUid, verified ? 'customer-verified' : 'verification-removed');
    await batch.commit();
  },

  async approve(id: string, adminUid: string, note = ''): Promise<void> {
    const submission = await getSubmission(id);
    if (submission.verificationStatus !== 'verified') {
      throw new Error('Verify that the customer received this project before approving the review.');
    }
    if (submission.status === 'rejected') {
      throw new Error('Rejected reviews cannot be republished. Delete the submission if a fresh review is required.');
    }
    const current = (await getCurrentPublished(submission.projectId)).filter((review) => review.id !== id);
    const publishedAt = serverTimestamp();
    const publicData = {
      projectId: submission.projectId,
      displayName: submission.isAnonymous ? 'Anonymous Customer' : submission.username,
      isAnonymous: submission.isAnonymous,
      rating: submission.rating,
      comment: submission.comment,
      images: submission.images,
      verifiedCustomer: true,
      published: true,
      createdAt: submission.createdAt ?? serverTimestamp(),
      publishedAt,
    };
    const projected = [...current, {
      id, projectId: submission.projectId,
      displayName: publicData.displayName, isAnonymous: publicData.isAnonymous,
      rating: publicData.rating, comment: publicData.comment, images: publicData.images,
      verifiedCustomer: true, createdAt: submission.createdAt, publishedAt: null,
    }];
    const batch = writeBatch(db);
    batch.set(doc(publicReviewsRef, id), publicData);
    batch.update(doc(submissionsRef, id), {
      status: 'approved',
      reviewedAt: serverTimestamp(),
      reviewedBy: adminUid,
      publishedAt,
      moderationNote: note.trim() || null,
      updatedAt: serverTimestamp(),
    });
    await addProjectStats(batch, submission.projectId, projected);
    await addModerationEvent(batch, id, adminUid, 'approved', note);
    await batch.commit();
  },

  async reject(id: string, adminUid: string, note = ''): Promise<void> {
    const submission = await getSubmission(id);
    const current = (await getCurrentPublished(submission.projectId)).filter((review) => review.id !== id);
    const batch = writeBatch(db);
    batch.delete(doc(publicReviewsRef, id));
    batch.update(doc(submissionsRef, id), {
      status: 'rejected',
      reviewedAt: serverTimestamp(),
      reviewedBy: adminUid,
      moderationNote: note.trim() || null,
      updatedAt: serverTimestamp(),
    });
    await addProjectStats(batch, submission.projectId, current);
    await addModerationEvent(batch, id, adminUid, 'rejected', note);
    await batch.commit();
  },

  async unpublish(id: string, adminUid: string, note = ''): Promise<void> {
    const submission = await getSubmission(id);
    const current = (await getCurrentPublished(submission.projectId)).filter((review) => review.id !== id);
    const batch = writeBatch(db);
    batch.delete(doc(publicReviewsRef, id));
    batch.update(doc(submissionsRef, id), {
      status: 'unpublished',
      reviewedAt: serverTimestamp(),
      reviewedBy: adminUid,
      moderationNote: note.trim() || null,
      updatedAt: serverTimestamp(),
    });
    await addProjectStats(batch, submission.projectId, current);
    await addModerationEvent(batch, id, adminUid, 'unpublished', note);
    await batch.commit();
  },

  async updateContent(
    id: string,
    rating: number,
    commentInput: string,
    adminUid: string,
  ): Promise<void> {
    const submission = await getSubmission(id);
    const comment = commentInput.trim();
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5.');
    }
    if (comment.length < 10 || comment.length > 2000) {
      throw new Error('Review text must be between 10 and 2,000 characters.');
    }
    const batch = writeBatch(db);
    batch.update(doc(submissionsRef, id), {
      rating, comment, updatedAt: serverTimestamp(),
    });
    if (submission.status === 'approved') {
      const current = await getCurrentPublished(submission.projectId);
      const updated = current.map((review) => review.id === id ? { ...review, rating, comment } : review);
      batch.update(doc(publicReviewsRef, id), { rating, comment });
      await addProjectStats(batch, submission.projectId, updated);
    }
    await addModerationEvent(batch, id, adminUid, 'content-edited');
    await batch.commit();
  },

  async updateModerationNote(id: string, note: string, adminUid: string): Promise<void> {
    const batch = writeBatch(db);
    batch.update(doc(submissionsRef, id), {
      moderationNote: note.trim().slice(0, 1000) || null,
      updatedAt: serverTimestamp(),
    });
    await addModerationEvent(batch, id, adminUid, 'moderation-note-updated', note);
    await batch.commit();
  },

  async remove(id: string, adminUid: string): Promise<void> {
    const submission = await getSubmission(id);
    const current = (await getCurrentPublished(submission.projectId)).filter((review) => review.id !== id);
    const batch = writeBatch(db);
    batch.delete(doc(submissionsRef, id));
    batch.delete(doc(publicReviewsRef, id));
    await addProjectStats(batch, submission.projectId, current);
    await addModerationEvent(batch, id, adminUid, 'deleted');
    await batch.commit();
  },
};
