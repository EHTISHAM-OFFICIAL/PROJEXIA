import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { CheckCircle2, ImagePlus, LockKeyhole, Star, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import { Button, ButtonLink } from '../ui/Button';
import { Image } from '../ui/Image';
import { useAuth } from '../../hooks/useAuth';
import { useOwnProjectReview, usePublishedProjectReviews } from '../../hooks/useProjectReviews';
import { projectReviewService } from '../../services/projectReviewService';
import { imgbbService } from '../../services/imgbbService';
import type { Project } from '../../types/project';
import type { ProjectReviewSubmission } from '../../types/projectReview';

const IMAGE_LIMIT = 4;
const CLIENT_IMAGE_LIMIT = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = new Set([
  'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp',
]);

function Stars({ rating, size = 15 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          size={size}
          className={value <= Math.round(rating) ? 'fill-current text-accent' : 'text-content-muted/35'}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

function submissionMessage(review: ProjectReviewSubmission): { title: string; detail: string; tone: 'success' | 'warning' | 'danger' | 'neutral' } {
  switch (review.status) {
    case 'approved':
      return { title: 'Your review is published', detail: 'Thank you for sharing your experience with the PROJEXIAHUB community.', tone: 'success' };
    case 'rejected':
      return { title: 'Your review was not approved', detail: 'It is not visible on the website. Contact PROJEXIAHUB if you need clarification.', tone: 'danger' };
    case 'unpublished':
      return { title: 'Your review is currently hidden', detail: 'The admin team has unpublished this review. It is not visible to the public.', tone: 'neutral' };
    default:
      return { title: 'Your review is awaiting admin review', detail: 'It has been received privately and will appear on the website only if approved.', tone: 'warning' };
  }
}

export function ProjectReviewsSection({ project }: { project: Project }) {
  const { user, profile, loading: authLoading } = useAuth();
  const location = useLocation();
  const reviews = usePublishedProjectReviews(project.id);
  const ownReview = useOwnProjectReview(project.id, user?.uid);
  const [formOpen, setFormOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);

  const actualStats = project.reviewStats ?? {
    averageRating: null,
    reviewCount: 0,
    distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  };
  const displayedRating = project.ratingOverrideEnabled && project.ratingOverride !== null
    ? project.ratingOverride : actualStats.averageRating;
  const displayedCount = project.reviewCountOverrideEnabled && project.reviewCountOverride !== null
    ? project.reviewCountOverride : actualStats.reviewCount;
  const signInUrl = `/login?next=${encodeURIComponent(location.pathname)}`;
  const ownMessage = ownReview.data ? submissionMessage(ownReview.data) : null;

  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const incoming = Array.from(event.target.files ?? []);
    if (files.length + incoming.length > IMAGE_LIMIT) {
      setError(`You can attach up to ${IMAGE_LIMIT} images.`);
      event.target.value = '';
      return;
    }
    const invalid = incoming.find((file) =>
      !ACCEPTED_IMAGE_TYPES.has(file.type.toLowerCase()) || file.size <= 0 || file.size > CLIENT_IMAGE_LIMIT
    );
    if (invalid) {
      setError('Use JPG, PNG, WebP, GIF or BMP images up to 10 MB each.');
      event.target.value = '';
      return;
    }
    setFiles((current) => [...current, ...incoming]);
    event.target.value = '';
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    if (!user) {
      setError('Sign in before submitting a review.');
      return;
    }
    if (!profile?.username) {
      setError('Your account profile is not available yet. Refresh your account and try again.');
      return;
    }
    if (comment.trim().length < 10 || comment.trim().length > 2000) {
      setError('Your review must be between 10 and 2,000 characters.');
      return;
    }

    setSubmitting(true);
    try {
      const uploaded = files.length ? await imgbbService.uploadMany(files) : [];
      await projectReviewService.submit({
        projectId: project.id,
        userId: user.uid,
        username: profile.username,
        isAnonymous: anonymous,
        rating,
        comment,
        images: uploaded.map((image) => image.url),
      });
      setSubmitted(true);
      setFormOpen(false);
      setComment('');
      setRating(5);
      setAnonymous(false);
      setFiles([]);
      ownReview.reload();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Your review could not be submitted. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-7">
      <div className="grid gap-5 rounded-2xl border border-line bg-surface-raised p-5 sm:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] sm:p-7">
        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[.14em] text-content-muted">Customer rating</p>
          {displayedRating !== null ? (
            <>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-4xl font-semibold tracking-tight tabular-nums text-content">{displayedRating.toFixed(1)}</span>
                <span className="pb-1 text-sm text-content-muted">/ 5</span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Stars rating={displayedRating} size={17} />
                <span className="text-xs text-content-secondary">
                  {displayedCount.toLocaleString()} {displayedCount === 1 ? 'review' : 'reviews'}
                </span>
              </div>
            </>
          ) : (
            <>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-content">No ratings yet</p>
              <p className="mt-1 text-sm text-content-secondary">Be the first customer to share feedback.</p>
            </>
          )}
        </div>

        <div className="space-y-2.5 border-t border-line pt-5 sm:border-l sm:border-t-0 sm:pl-7 sm:pt-0">
          {[5, 4, 3, 2, 1].map((value) => {
            const count = actualStats.distribution[value as 1 | 2 | 3 | 4 | 5] ?? 0;
            const percentage = actualStats.reviewCount ? (count / actualStats.reviewCount) * 100 : 0;
            return (
              <div key={value} className="flex items-center gap-3 text-xs text-content-muted">
                <span className="w-3 shrink-0 tabular-nums">{value}</span>
                <Star size={12} className="shrink-0 fill-current text-accent" aria-hidden="true" />
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-bg">
                  <div className="h-full rounded-full bg-accent transition-[width] duration-300" style={{ width: `${percentage}%` }} />
                </div>
                <span className="w-6 text-right tabular-nums">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-content">What customers say</h3>
          <p className="mt-1 text-sm text-content-secondary">Feedback is published only after admin moderation.</p>
        </div>
        {!authLoading && !ownReview.loading && !ownReview.data && user && (
          <Button size="sm" onClick={() => { setFormOpen((open) => !open); setError(null); }}>
            {formOpen ? 'Close review form' : 'Write a review'}
          </Button>
        )}
        {!authLoading && !user && (
          <ButtonLink to={signInUrl} size="sm" variant="secondary">Sign in to review</ButtonLink>
        )}
      </div>

      {submitted && (
        <div className="flex gap-3 rounded-xl border border-state-success/25 bg-state-success/5 p-4 text-sm">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-state-success" aria-hidden="true" />
          <div>
            <p className="font-semibold text-content">Review submitted successfully</p>
            <p className="mt-1 leading-relaxed text-content-secondary">
              Your review has been sent to the PROJEXIAHUB admin team. It will appear here only after approval.
            </p>
          </div>
        </div>
      )}

      {ownMessage && ownReview.data && (
        <div className="rounded-xl border border-line bg-surface-raised p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={ownMessage.tone}>{ownMessage.title}</Badge>
            <span className="text-xs text-content-muted">Your submission</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-content-secondary">{ownMessage.detail}</p>
        </div>
      )}

      {formOpen && user && !ownReview.data && (
        <form onSubmit={submit} className="space-y-5 rounded-2xl border border-accent/25 bg-surface-raised p-5 sm:p-7">
          <div>
            <h3 className="text-lg font-semibold text-content">Share your experience</h3>
            <p className="mt-1 text-sm text-content-secondary">Your feedback helps other customers understand the project.</p>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-content">Your rating <span className="text-state-danger">*</span></p>
            <div className="flex flex-wrap items-center gap-1" role="group" aria-label="Choose a rating from one to five stars">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  aria-label={`${value} star${value === 1 ? '' : 's'}`}
                  aria-pressed={rating === value}
                  className="rounded-lg p-2 text-accent transition-colors hover:bg-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Star size={27} className={value <= rating ? 'fill-current' : 'text-content-muted/40'} />
                </button>
              ))}
              <span className="ml-2 text-sm font-medium text-content-secondary">{rating}/5</span>
            </div>
          </div>

          <div>
            <label htmlFor={`review-comment-${project.id}`} className="mb-2 block text-sm font-medium text-content">
              Your review <span className="text-state-danger">*</span>
            </label>
            <textarea
              id={`review-comment-${project.id}`}
              rows={5}
              maxLength={2000}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Tell others about the project you received, its quality and your experience..."
              className="w-full resize-y rounded-xl border border-line bg-bg px-4 py-3 text-sm leading-relaxed text-content outline-none transition-colors placeholder:text-content-muted focus:border-accent focus:ring-2 focus:ring-accent/15"
              required
            />
            <p className="mt-1 text-right text-xs text-content-muted">{comment.length}/2,000</p>
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-bg p-4">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(event) => setAnonymous(event.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[rgb(var(--color-accent))]"
            />
            <span>
              <span className="block text-sm font-medium text-content">Hide my name publicly</span>
              <span className="mt-1 block text-xs leading-relaxed text-content-secondary">
                Your username remains visible to the admin team for verification, but the website will show “Anonymous Customer”.
              </span>
            </span>
          </label>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label htmlFor={`review-images-${project.id}`} className="text-sm font-medium text-content">Project photos <span className="font-normal text-content-muted">(optional)</span></label>
              <span className="text-xs text-content-muted">{files.length}/{IMAGE_LIMIT} images</span>
            </div>
            <label
              htmlFor={`review-images-${project.id}`}
              className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-line-strong bg-bg px-4 py-5 text-sm text-content-secondary transition-colors hover:border-accent hover:text-accent"
            >
              <ImagePlus size={18} aria-hidden="true" />
              Choose project photos
            </label>
            <input
              id={`review-images-${project.id}`}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/bmp"
              multiple
              onChange={handleFiles}
              className="sr-only"
            />
            {previewUrls.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {previewUrls.map((url, index) => (
                  <div key={url} className="relative aspect-square overflow-hidden rounded-lg border border-line bg-bg">
                    <img src={url} alt={`Selected project photo ${index + 1}`} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index))}
                      aria-label={`Remove selected image ${index + 1}`}
                      className="absolute right-2 top-2 rounded-full bg-black/70 p-1.5 text-white hover:bg-black"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-2 text-xs leading-relaxed text-content-muted">
              JPG, PNG, WebP, GIF or BMP; up to 10 MB each. Photos appear on the website only if your review is approved.
            </p>
          </div>

          <div className="rounded-xl border border-state-warning/25 bg-state-warning/5 p-4">
            <div className="flex gap-2">
              <LockKeyhole size={17} className="mt-0.5 shrink-0 text-state-warning" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-content-secondary">
                Your review will first be sent to the PROJEXIAHUB admin team for moderation. It will only appear publicly after it has been reviewed and approved. We may verify that you received this project before publishing it.
              </p>
            </div>
          </div>

          {error && <p role="alert" className="text-sm text-state-danger">{error}</p>}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button type="button" variant="ghost" onClick={() => setFormOpen(false)} disabled={submitting}>Cancel</Button>
            <Button type="submit" loading={submitting} disabled={submitting || !comment.trim()}>
              {submitting ? 'Sending for review…' : 'Submit review'}
            </Button>
          </div>
        </form>
      )}

      {ownReview.error && <p role="alert" className="text-sm text-state-danger">{ownReview.error}</p>}

      {reviews.loading && (
        <div className="space-y-3" aria-label="Loading customer reviews">
          <div className="h-28 animate-pulse rounded-xl bg-surface-raised" />
          <div className="h-28 animate-pulse rounded-xl bg-surface-raised" />
        </div>
      )}
      {reviews.error && <p role="alert" className="text-sm text-content-muted">Customer reviews could not be loaded right now.</p>}

      {!reviews.loading && !reviews.error && reviews.data?.length === 0 && (
        <div className="rounded-xl border border-dashed border-line-strong px-5 py-8 text-center">
          <p className="font-medium text-content">No published reviews yet</p>
          <p className="mt-1 text-sm text-content-secondary">Once a customer review is approved, it will appear here.</p>
        </div>
      )}

      {!reviews.loading && reviews.data && reviews.data.length > 0 && (
        <div className="space-y-3">
          {reviews.data.map((review) => (
            <article key={review.id} className="rounded-xl border border-line bg-surface p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-content">{review.displayName}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <Stars rating={review.rating} />
                    {review.verifiedCustomer && <Badge tone="success">Verified customer</Badge>}
                  </div>
                </div>
                <time className="text-xs text-content-muted">
                  {review.publishedAt?.toDate?.().toLocaleDateString() ?? ''}
                </time>
              </div>
              <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-relaxed text-content-secondary">{review.comment}</p>
              {review.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {review.images.map((url, index) => (
                    <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg border border-line bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                      <Image src={url} alt={`Photo shared by ${review.displayName}, image ${index + 1}`} className="aspect-square w-full object-cover" />
                    </a>
                  ))}
                </div>
              )}
            </article>
          ))}
          {reviews.data.length === 12 && <p className="text-center text-xs text-content-muted">Showing the 12 most recent published reviews.</p>}
        </div>
      )}
    </div>
  );
}
