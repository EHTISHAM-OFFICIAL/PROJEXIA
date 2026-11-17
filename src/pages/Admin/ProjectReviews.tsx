import { useMemo, useState } from 'react';
import { CheckCircle2, EyeOff, ShieldCheck, Trash2, XCircle } from 'lucide-react';
import { Seo } from '../../components/ui/Seo';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { ErrorState } from '../../components/ui/ErrorState';
import { Skeleton } from '../../components/ui/Skeleton';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Select, TextInput } from '../../components/forms/Inputs';
import { useAllProjectReviewSubmissions } from '../../hooks/useProjectReviews';
import { useAllProjects } from '../../hooks/useProjects';
import { useAuth } from '../../hooks/useAuth';
import { projectReviewService } from '../../services/projectReviewService';
import { useToast } from '../../contexts/ToastContext';
import { toUserMessage } from '../../utils/errors';
import type { ProjectReviewStatus, ProjectReviewSubmission } from '../../types/projectReview';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All reviews' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'unpublished', label: 'Unpublished' },
  { value: 'verified', label: 'Verified customers' },
  { value: 'unverified', label: 'Unverified customers' },
];

function statusTone(status: ProjectReviewStatus): 'success' | 'warning' | 'danger' | 'neutral' {
  if (status === 'approved') return 'success';
  if (status === 'pending') return 'warning';
  if (status === 'rejected') return 'danger';
  return 'neutral';
}

function statusLabel(status: ProjectReviewStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function ProjectReviews() {
  const { user } = useAuth();
  const { notify } = useToast();
  const reviews = useAllProjectReviewSubmissions();
  const projects = useAllProjects();
  const [filter, setFilter] = useState('pending');
  const [working, setWorking] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<ProjectReviewSubmission | null>(null);
  const [drafts, setDrafts] = useState<Record<string, { rating: string; comment: string; note: string }>>({});

  const projectNames = useMemo(
    () => new Map((projects.data ?? []).map((project) => [project.id, project.title])),
    [projects.data],
  );
  const filtered = (reviews.data ?? []).filter((review) => {
    if (filter === 'verified') return review.verificationStatus === 'verified';
    if (filter === 'unverified') return review.verificationStatus !== 'verified';
    return filter === 'all' || review.status === filter;
  });

  const valuesFor = (review: ProjectReviewSubmission) => drafts[review.id] ?? {
    rating: String(review.rating),
    comment: review.comment,
    note: review.moderationNote ?? '',
  };

  const updateDraft = (
    review: ProjectReviewSubmission,
    key: 'rating' | 'comment' | 'note',
    value: string,
  ) => {
    const current = valuesFor(review);
    setDrafts((state) => ({ ...state, [review.id]: { ...current, [key]: value } }));
  };

  const runAction = async (id: string, action: () => Promise<void>, successMessage: string) => {
    if (!user) return;
    setWorking(id);
    try {
      await action();
      notify({ title: 'Review updated', message: successMessage, tone: 'success' });
      reviews.reload();
    } catch (caught) {
      const message = toUserMessage(caught);
      notify({ title: 'Review action failed', message, tone: 'error' });
    } finally {
      setWorking(null);
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete || !user) return;
    await runAction(
      pendingDelete.id,
      () => projectReviewService.remove(pendingDelete.id, user.uid),
      'The review submission was deleted. Its moderation history is retained.',
    );
    setPendingDelete(null);
  };

  return (
    <>
      <Seo title="Project reviews" noIndex />
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.14em] text-content-muted">Customer activity</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Project reviews</h1>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-content-secondary">
            Review customer feedback, verify project receipt and decide what is published on the public website.
          </p>
        </div>
        <Badge tone="warning">{(reviews.data ?? []).filter((review) => review.status === 'pending').length} pending</Badge>
      </header>

      <div className="mt-7 max-w-xs">
        <Select
          options={STATUS_OPTIONS}
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          aria-label="Filter project reviews"
        />
      </div>

      <div className="mt-6 space-y-4">
        {reviews.loading && (
          <div className="space-y-3">
            <Skeleton className="h-44 w-full" />
            <Skeleton className="h-44 w-full" />
          </div>
        )}
        {!reviews.loading && reviews.error && <ErrorState message={reviews.error} onRetry={reviews.reload} />}
        {!reviews.loading && !reviews.error && filtered.length === 0 && (
          <EmptyState
            title="No reviews in this view"
            description={filter === 'pending' ? 'New customer submissions will appear here when they arrive.' : 'Try another filter to see other review submissions.'}
          />
        )}

        {!reviews.loading && filtered.map((review) => {
          const values = valuesFor(review);
          const projectName = projectNames.get(review.projectId) ?? 'Project no longer available';
          const verified = review.verificationStatus === 'verified';
          return (
            <article key={review.id} className="overflow-hidden rounded-2xl border border-line bg-surface">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line p-4 sm:p-5">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-semibold text-content">{projectName}</h2>
                    <Badge tone={statusTone(review.status)}>{statusLabel(review.status)}</Badge>
                    <Badge tone={verified ? 'success' : 'warning'}>
                      {verified ? 'Receipt verified' : 'Not verified'}
                    </Badge>
                    {review.isAnonymous && <Badge>Anonymous publicly</Badge>}
                  </div>
                  <p className="mt-1.5 text-xs text-content-muted">
                    Submitted {review.createdAt?.toDate?.().toLocaleString() ?? 'date unavailable'}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-content">
                  <span aria-label={`${review.rating} out of 5 stars`}>{review.rating}/5</span>
                  <span className="text-accent" aria-hidden="true">★</span>
                </div>
              </div>

              <div className="grid gap-5 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_minmax(250px,.7fr)]">
                <div className="min-w-0 space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-content-muted">Customer account</p>
                    <p className="mt-1 text-sm font-medium text-content">@{review.username}</p>
                    <p className="mt-1 break-all font-mono text-[11px] text-content-muted">UID: {review.userId}</p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor={`review-rating-${review.id}`} className="mb-1.5 block text-xs font-medium text-content-secondary">Rating (1–5)</label>
                      <TextInput
                        id={`review-rating-${review.id}`}
                        type="number"
                        min={1}
                        max={5}
                        step={1}
                        value={values.rating}
                        onChange={(event) => updateDraft(review, 'rating', event.target.value)}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        size="sm"
                        variant="secondary"
                        disabled={working === review.id || review.status === 'approved'}
                        onClick={() => runAction(
                          review.id,
                          () => projectReviewService.setVerificationStatus(review.id, !verified, user!.uid),
                          verified ? 'Customer verification removed.' : 'Customer receipt marked as verified.',
                        )}
                      >
                        <ShieldCheck size={15} />
                        {verified ? 'Remove verification' : 'Verify receipt'}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`review-comment-${review.id}`} className="mb-1.5 block text-xs font-medium text-content-secondary">Customer review</label>
                    <textarea
                      id={`review-comment-${review.id}`}
                      rows={4}
                      maxLength={2000}
                      value={values.comment}
                      onChange={(event) => updateDraft(review, 'comment', event.target.value)}
                      className="w-full resize-y rounded-lg border border-line bg-bg px-3 py-2.5 text-sm leading-relaxed text-content outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
                    />
                    <Button
                      size="sm"
                      variant="secondary"
                      className="mt-2"
                      disabled={working === review.id}
                      onClick={() => runAction(
                        review.id,
                        () => projectReviewService.updateContent(review.id, Number(values.rating), values.comment, user!.uid),
                        'The moderated review content was saved.',
                      )}
                    >
                      Save review edits
                    </Button>
                  </div>

                  {review.images.length > 0 && (
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-content-muted">Submitted project photos</p>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {review.images.map((url, index) => (
                          <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="overflow-hidden rounded-lg border border-line bg-surface-raised">
                            <img src={url} alt={`Customer submitted image ${index + 1}`} loading="lazy" className="aspect-square w-full object-cover" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <aside className="space-y-4 rounded-xl border border-line bg-surface-raised p-4">
                  <div>
                    <label htmlFor={`review-note-${review.id}`} className="mb-1.5 block text-xs font-medium text-content-secondary">Private moderation note</label>
                    <textarea
                      id={`review-note-${review.id}`}
                      rows={4}
                      maxLength={1000}
                      value={values.note}
                      onChange={(event) => updateDraft(review, 'note', event.target.value)}
                      placeholder="Internal note for the admin team..."
                      className="w-full resize-y rounded-lg border border-line bg-bg px-3 py-2.5 text-sm text-content outline-none focus:border-accent focus:ring-2 focus:ring-accent/15"
                    />
                    <Button
                      size="sm"
                      variant="secondary"
                      className="mt-2 w-full"
                      disabled={working === review.id}
                      onClick={() => runAction(
                        review.id,
                        () => projectReviewService.updateModerationNote(review.id, values.note, user!.uid),
                        'The private moderation note was saved.',
                      )}
                    >
                      Save private note
                    </Button>
                  </div>

                  <div className="border-t border-line pt-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-content-muted">Publication controls</p>
                    <div className="grid gap-2">
                      {(review.status === 'pending' || review.status === 'unpublished') && (
                        <Button
                          size="sm"
                          disabled={!verified || working === review.id}
                          loading={working === review.id}
                          onClick={() => runAction(
                            review.id,
                            () => projectReviewService.approve(review.id, user!.uid, values.note),
                            'The verified review is now published.',
                          )}
                        >
                          <CheckCircle2 size={15} /> Approve & publish
                        </Button>
                      )}
                      {review.status === 'pending' && (
                        <Button
                          size="sm"
                          variant="danger"
                          disabled={working === review.id}
                          onClick={() => runAction(
                            review.id,
                            () => projectReviewService.reject(review.id, user!.uid, values.note),
                            'The review was rejected and remains private.',
                          )}
                        >
                          <XCircle size={15} /> Reject review
                        </Button>
                      )}
                      {review.status === 'approved' && (
                        <Button
                          size="sm"
                          variant="secondary"
                          disabled={working === review.id}
                          onClick={() => runAction(
                            review.id,
                            () => projectReviewService.unpublish(review.id, user!.uid, values.note),
                            'The review is now hidden from the public website.',
                          )}
                        >
                          <EyeOff size={15} /> Unpublish review
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={working === review.id}
                        onClick={() => setPendingDelete(review)}
                      >
                        <Trash2 size={15} /> Delete submission
                      </Button>
                    </div>
                    {!verified && (review.status === 'pending' || review.status === 'unpublished') && (
                      <p className="mt-3 text-xs leading-relaxed text-state-warning">
                        Verify that the customer received this project before publishing the review.
                      </p>
                    )}
                  </div>
                </aside>
              </div>
            </article>
          );
        })}
      </div>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this review submission?"
        description="The private submission and any public review will be removed. The moderation event history is retained."
        confirmLabel="Delete review"
        loading={working === pendingDelete?.id}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  );
}
