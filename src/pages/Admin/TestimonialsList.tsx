import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Pencil, Trash2 } from 'lucide-react';
import { Seo } from '../../components/ui/Seo';
import { Badge } from '../../components/ui/Badge';
import { ButtonLink } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { ErrorState } from '../../components/ui/ErrorState';
import { Skeleton } from '../../components/ui/Skeleton';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { useAllTestimonials } from '../../hooks/useTestimonials';
import { testimonialService } from '../../services/testimonialService';
import { toUserMessage } from '../../utils/errors';
import { useToast } from '../../contexts/ToastContext';
import type { Testimonial } from '../../types/testimonial';

export default function TestimonialsList() {
  const { notify } = useToast();
  const { data, loading, error, reload } = useAllTestimonials();
  const [pendingDelete, setPendingDelete] = useState<Testimonial | null>(null);
  const [working, setWorking] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const runAction = async (id: string, action: () => Promise<void>) => {
    setWorking(id);
    setActionError(null);
    try {
      await action();
      notify({ title: 'Testimonial action completed', message: 'The change was saved successfully.', tone: 'success' });
      reload();
    } catch (caught) {
      const message = toUserMessage(caught);
      setActionError(message);
      notify({ title: 'Testimonial action failed', message, tone: 'error' });
    } finally {
      setWorking(null);
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    await runAction(pendingDelete.id, () => testimonialService.remove(pendingDelete.id));
    setPendingDelete(null);
  };

  return (
    <>
      <Seo title="Testimonials" noIndex />

      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Testimonials</h1>
          <p className="mt-1.5 max-w-prose text-sm text-content-secondary">
            Shown on the homepage once published. The section itself is hidden entirely when
            there are none — no placeholder quotes.
          </p>
        </div>
        <ButtonLink to="/admin/testimonials/new" size="sm">
          New testimonial
        </ButtonLink>
      </header>

      {actionError && (
        <div className="mt-6">
          <ErrorState message={actionError} />
        </div>
      )}

      <div className="mt-8">
        {loading && (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }, (_, index) => (
              <Skeleton key={index} className="h-20 w-full" />
            ))}
          </div>
        )}

        {!loading && error && <ErrorState message={error} onRetry={reload} />}

        {!loading && !error && data?.length === 0 && (
          <EmptyState
            title="No testimonials yet"
            description="Add a real client quote once you have one — this only shows once you publish something."
            action={
              <ButtonLink to="/admin/testimonials/new" size="sm">
                Add a testimonial
              </ButtonLink>
            }
          />
        )}

        {!loading && data && data.length > 0 && (
          <ul className="flex flex-col gap-2">
            {data.map((testimonial) => (
              <li
                key={testimonial.id}
                className="flex flex-wrap items-center gap-4 rounded-lg border border-line bg-surface p-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      to={`/admin/testimonials/${testimonial.id}/edit`}
                      className="truncate text-sm font-medium text-content transition-colors hover:text-accent"
                    >
                      {testimonial.name}
                    </Link>
                    <Badge tone={testimonial.published ? 'success' : 'neutral'}>
                      {testimonial.published ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                  <p className="mt-1 truncate text-xs text-content-muted">{testimonial.quote}</p>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      runAction(testimonial.id, () =>
                        testimonialService.update(testimonial.id, {
                          published: !testimonial.published,
                        })
                      )
                    }
                    disabled={working === testimonial.id}
                    aria-label={testimonial.published ? 'Unpublish' : 'Publish'}
                    title={testimonial.published ? 'Unpublish' : 'Publish'}
                    className="rounded-md p-2 text-content-muted transition-colors hover:bg-surface-raised hover:text-content disabled:opacity-40"
                  >
                    {testimonial.published ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>

                  <Link
                    to={`/admin/testimonials/${testimonial.id}/edit`}
                    aria-label={`Edit ${testimonial.name}`}
                    className="rounded-md p-2 text-content-muted transition-colors hover:bg-surface-raised hover:text-content"
                  >
                    <Pencil size={16} />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setPendingDelete(testimonial)}
                    disabled={working === testimonial.id}
                    aria-label={`Delete ${testimonial.name}`}
                    className="rounded-md p-2 text-content-muted transition-colors hover:bg-state-danger/10 hover:text-state-danger disabled:opacity-40"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this testimonial?"
        description={`The quote from "${pendingDelete?.name}" will be removed permanently.`}
        confirmLabel="Delete testimonial"
        loading={working === pendingDelete?.id}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  );
}
