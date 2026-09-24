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
import { useAllPosts } from '../../hooks/useBlog';
import { blogService } from '../../services/blogService';
import { formatShortDate } from '../../utils/formatting';
import { toUserMessage } from '../../utils/errors';
import type { BlogPost } from '../../types/blog';

export default function BlogList() {
  const { data, loading, error, reload } = useAllPosts();
  const [pendingDelete, setPendingDelete] = useState<BlogPost | null>(null);
  const [working, setWorking] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const runAction = async (id: string, action: () => Promise<void>) => {
    setWorking(id);
    setActionError(null);
    try {
      await action();
      reload();
    } catch (caught) {
      setActionError(toUserMessage(caught));
    } finally {
      setWorking(null);
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    await runAction(pendingDelete.id, () => blogService.deletePost(pendingDelete.id));
    setPendingDelete(null);
  };

  return (
    <>
      <Seo title="Blog" noIndex />

      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
          <p className="mt-1.5 text-sm text-content-secondary">
            {data ? `${data.length} total` : 'Loading…'}
          </p>
        </div>
        <ButtonLink to="/admin/blog/new" size="sm">
          New post
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
              <Skeleton key={index} className="h-16 w-full" />
            ))}
          </div>
        )}

        {!loading && error && <ErrorState message={error} onRetry={reload} />}

        {!loading && !error && data?.length === 0 && (
          <EmptyState
            title="No posts yet"
            action={
              <ButtonLink to="/admin/blog/new" size="sm">
                Write the first post
              </ButtonLink>
            }
          />
        )}

        {!loading && data && data.length > 0 && (
          <ul className="flex flex-col gap-2">
            {data.map((post) => (
              <li
                key={post.id}
                className="flex flex-wrap items-center gap-4 rounded-lg border border-line bg-surface p-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      to={`/admin/blog/${post.id}/edit`}
                      className="truncate text-sm font-medium text-content transition-colors hover:text-accent"
                    >
                      {post.title}
                    </Link>
                    <Badge tone={post.published ? 'success' : 'neutral'}>
                      {post.published ? 'Published' : 'Draft'}
                    </Badge>
                    {post.featured && <Badge tone="accent">Featured</Badge>}
                    {post.category && <Badge tone="info">{post.category}</Badge>}
                  </div>
                  <p className="mt-1 truncate font-mono text-xs text-content-muted">
                    /blog/{post.slug} · {formatShortDate(post.createdAt)}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      runAction(post.id, () =>
                        blogService.updatePost(post.id, { published: !post.published })
                      )
                    }
                    disabled={working === post.id}
                    aria-label={post.published ? 'Unpublish' : 'Publish'}
                    title={post.published ? 'Unpublish' : 'Publish'}
                    className="rounded-md p-2 text-content-muted transition-colors hover:bg-surface-raised hover:text-content disabled:opacity-40"
                  >
                    {post.published ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>

                  <Link
                    to={`/admin/blog/${post.id}/edit`}
                    aria-label={`Edit ${post.title}`}
                    className="rounded-md p-2 text-content-muted transition-colors hover:bg-surface-raised hover:text-content"
                  >
                    <Pencil size={16} />
                  </Link>

                  <button
                    type="button"
                    onClick={() => setPendingDelete(post)}
                    disabled={working === post.id}
                    aria-label={`Delete ${post.title}`}
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
        title="Delete this post?"
        description={`"${pendingDelete?.title}" will be removed permanently.`}
        confirmLabel="Delete post"
        loading={working === pendingDelete?.id}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  );
}
