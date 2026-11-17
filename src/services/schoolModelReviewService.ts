import {
  collection,
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
  NewSchoolModelReview,
  SchoolModelReviewStatus,
  SchoolModelReviewSubmission,
  PublicSchoolModelReview,
} from '../types/schoolModelReview';
import { calculateSchoolModelReviewStats } from '../utils/schoolModelReviewStats';

const submissionsRef = collection(db, COLLECTIONS.schoolModelReviewSubmissions);
const publicReviewsRef = collection(db, COLLECTIONS.schoolModelReviews);

function submissionId(userId: string, schoolModelId: string): string {
  return userId + '_' + schoolModelId;
}

function toSubmission(id: string, data: DocumentData): SchoolModelReviewSubmission {
  return {
    id,
    schoolModelId: typeof data.schoolModelId === 'string' ? data.schoolModelId : '',
    userId: typeof data.userId === 'string' ? data.userId : '',
    username: typeof data.username === 'string' ? data.username : 'Customer',
    isAnonymous: data.isAnonymous === true,
    rating: Number.isInteger(data.rating) ? data.rating : 0,
    comment: typeof data.comment === 'string' ? data.comment : '',
    images: Array.isArray(data.images) ? data.images.filter((value: unknown): value is string => typeof value === 'string') : [],
    status: (['pending', 'approved', 'rejected', 'unpublished'].includes(data.status)
      ? data.status : 'pending') as SchoolModelReviewStatus,
    verificationStatus: data.verificationStatus === 'verified' ? 'verified' : 'unverified',
    moderationNote: typeof data.moderationNote === 'string' ? data.moderationNote : null,
    createdAt: data.createdAt ?? null,
    updatedAt: data.updatedAt ?? null,
    reviewedAt: data.reviewedAt ?? null,
    reviewedBy: typeof data.reviewedBy === 'string' ? data.reviewedBy : null,
    publishedAt: data.publishedAt ?? null,
  };
}

function toPublicReview(snapshot: QueryDocumentSnapshot<DocumentData>): PublicSchoolModelReview {
  const data = snapshot.data();
  return {
    id: snapshot.id,
    schoolModelId: typeof data.schoolModelId === 'string' ? data.schoolModelId : '',
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

async function getSubmission(id: string): Promise<SchoolModelReviewSubmission> {
  const snapshot = await getDoc(doc(submissionsRef, id));
  if (!snapshot.exists()) throw new Error('This review submission no longer exists.');
  return toSubmission(snapshot.id, snapshot.data());
}

async function getCurrentPublished(schoolModelId: string): Promise<PublicSchoolModelReview[]> {
  const snapshot = await getDocs(query(
    publicReviewsRef,
    where('schoolModelId', '==', schoolModelId),
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
  const eventRef = doc(collection(db, 'schoolModelReviewModeration', reviewId, 'events'));
  batch.set(eventRef, {
    action,
    actorUid,
    note: note.slice(0, 1000),
    createdAt: serverTimestamp(),
  });
}

async function addSchoolModelStats(
  batch: ReturnType<typeof writeBatch>,
  schoolModelId: string,
  reviews: PublicSchoolModelReview[],
): Promise<void> {
  const modelRef = doc(db, 'schoolModels', schoolModelId);
  const modelSnapshot = await getDoc(modelRef);
  if (modelSnapshot.exists()) {
    batch.update(modelRef, { reviewStats: calculateSchoolModelReviewStats(reviews) });
  }
}

export const schoolModelReviewService = {
  async getOwnSubmission(schoolModelId: string, userId: string): Promise<SchoolModelReviewSubmission | null> {
    const snapshot = await getDoc(doc(submissionsRef, submissionId(userId, schoolModelId)));
    return snapshot.exists() ? toSubmission(snapshot.id, snapshot.data()) : null;
  },

  async getPublishedForSchoolModel(schoolModelId: string): Promise<PublicSchoolModelReview[]> {
    const snapshot = await getDocs(query(
      publicReviewsRef,
      where('schoolModelId', '==', schoolModelId),
      where('published', '==', true),
      orderBy('publishedAt', 'desc'),
      limit(12),
    ));
    return snapshot.docs.map(toPublicReview);
  },

  async getAllSubmissions(): Promise<SchoolModelReviewSubmission[]> {
    const snapshot = await getDocs(query(submissionsRef, orderBy('createdAt', 'desc')));
    return snapshot.docs.map((item) => toSubmission(item.id, item.data()));
  },

  async submit(input: NewSchoolModelReview): Promise<void> {
    const comment = input.comment.trim();
    if (comment.length < 10 || comment.length > 2000) {
      throw new Error('Your review must be between 10 and 2,000 characters.');
    }
    if (!Number.isInteger(input.rating) || input.rating < 1 || input.rating > 5) {
      throw new Error('Choose a rating from 1 to 5 stars.');
    }
    if (input.images.length > 4) throw new Error('You can attach up to four images.');
    const id = submissionId(input.userId, input.schoolModelId);
    await setDoc(doc(submissionsRef, id), {
      schoolModelId: input.schoolModelId,
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
      throw new Error('Verify that the customer received this school model before approving the review.');
    }
    if (submission.status === 'rejected') {
      throw new Error('Rejected reviews cannot be republished. Delete the submission if a fresh review is required.');
    }
    const modelSnapshot = await getDoc(doc(db, 'schoolModels', submission.schoolModelId));
    if (!modelSnapshot.exists() || modelSnapshot.data().published !== true) {
      throw new Error('This school model is not currently published. Publish the model before approving its review.');
    }
    const current = (await getCurrentPublished(submission.schoolModelId)).filter((review) => review.id !== id);
    const publishedAt = serverTimestamp();
    const publicData = {
      schoolModelId: submission.schoolModelId,
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
      id, schoolModelId: submission.schoolModelId,
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
    await addSchoolModelStats(batch, submission.schoolModelId, projected);
    await addModerationEvent(batch, id, adminUid, 'approved', note);
    await batch.commit();
  },

  async reject(id: string, adminUid: string, note = ''): Promise<void> {
    const submission = await getSubmission(id);
    const current = (await getCurrentPublished(submission.schoolModelId)).filter((review) => review.id !== id);
    const batch = writeBatch(db);
    batch.delete(doc(publicReviewsRef, id));
    batch.update(doc(submissionsRef, id), {
      status: 'rejected',
      reviewedAt: serverTimestamp(),
      reviewedBy: adminUid,
      moderationNote: note.trim() || null,
      updatedAt: serverTimestamp(),
    });
    await addSchoolModelStats(batch, submission.schoolModelId, current);
    await addModerationEvent(batch, id, adminUid, 'rejected', note);
    await batch.commit();
  },

  async unpublish(id: string, adminUid: string, note = ''): Promise<void> {
    const submission = await getSubmission(id);
    const current = (await getCurrentPublished(submission.schoolModelId)).filter((review) => review.id !== id);
    const batch = writeBatch(db);
    batch.delete(doc(publicReviewsRef, id));
    batch.update(doc(submissionsRef, id), {
      status: 'unpublished',
      reviewedAt: serverTimestamp(),
      reviewedBy: adminUid,
      moderationNote: note.trim() || null,
      updatedAt: serverTimestamp(),
    });
    await addSchoolModelStats(batch, submission.schoolModelId, current);
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
      const current = await getCurrentPublished(submission.schoolModelId);
      const updated = current.map((review) => review.id === id ? { ...review, rating, comment } : review);
      batch.update(doc(publicReviewsRef, id), { rating, comment });
      await addSchoolModelStats(batch, submission.schoolModelId, updated);
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
    const current = (await getCurrentPublished(submission.schoolModelId)).filter((review) => review.id !== id);
    const batch = writeBatch(db);
    batch.delete(doc(submissionsRef, id));
    batch.delete(doc(publicReviewsRef, id));
    await addSchoolModelStats(batch, submission.schoolModelId, current);
    await addModerationEvent(batch, id, adminUid, 'deleted');
    await batch.commit();
  },
};
