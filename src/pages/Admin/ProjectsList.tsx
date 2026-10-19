import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Pencil, Star, Trash2 } from 'lucide-react';
import { Seo } from '../../components/ui/Seo';
import { Badge } from '../../components/ui/Badge';
import { ButtonLink } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { ErrorState } from '../../components/ui/ErrorState';
import { Skeleton } from '../../components/ui/Skeleton';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Select, TextInput } from '../../components/forms/Inputs';
import { useAllProjects } from '../../hooks/useProjects';
import { projectService } from '../../services/projectService';
import { PROJECT_CATEGORIES } from '../../constants/categories';
import { STATUS_LABEL, STATUS_TONE } from '../../constants/projectOptions';
import { formatShortDate } from '../../utils/formatting';
import { toUserMessage } from '../../utils/errors';
import { useToast } from '../../contexts/ToastContext';
import type { Project } from '../../types/project';

const VISIBILITY_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

export default function ProjectsList() {
  const { notify } = useToast();
  const { data, loading, error, reload } = useAllProjects();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [visibility, setVisibility] = useState('');
  const [pendingDelete, setPendingDelete] = useState<Project | null>(null);
  const [working, setWorking] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!data) return [];
    const term = search.trim().toLowerCase();
    return data.filter((project) => {
      if (category && project.category !== category) return false;
      if (visibility === 'published' && !project.published) return false;
      if (visibility === 'draft' && project.published) return false;
      if (!term) return true;
      return `${project.title} ${project.slug} ${project.category}`.toLowerCase().includes(term);
    });
  }, [data, search, category, visibility]);

  const runAction = async (id: string, action: () => Promise<void>) => {
    setWorking(id);
    setActionError(null);
    try {
      await action();
      notify({ title: 'Project action completed', message: 'The project change was saved successfully.', tone: 'success' });
      reload();
    } catch (caught) {
      const message = toUserMessage(caught);
      setActionError(message);
      notify({ title: 'Project action failed', message, tone: 'error' });
    } finally {
      setWorking(null);
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    await runAction(pendingDelete.id, () => projectService.deleteProject(pendingDelete.id));
    setPendingDelete(null);
  };

  return (
    <>
      <Seo title="Projects" noIndex />

      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
          <p className="mt-1.5 text-sm text-content-secondary">
            {data ? `${data.length} total` : 'Loading…'}
          </p>
        </div>
        <ButtonLink to="/admin/projects/new" size="sm">
          New project
        </ButtonLink>
      </header>

      {actionError && (
        <div className="mt-6">
          <ErrorState message={actionError} />
        </div>
      )}

      <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <TextInput
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by title or slug"
          aria-label="Search projects"
        />
        <Select
          options={PROJECT_CATEGORIES}
          placeholder="All categories"
          value={category}
          aria-label="Filter by category"
          onChange={(event) => setCategory(event.target.value)}
        />
        <Select
          options={VISIBILITY_OPTIONS}
          placeholder="All visibility"
          value={visibility}
          aria-label="Filter by visibility"
          onChange={(event) => setVisibility(event.target.value)}
        />
      </div>

      <div className="mt-6">
        {loading && (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="h-20 w-full" />
            ))}
          </div>
        )}

        {!loading && error && <ErrorState message={error} onRetry={reload} />}

        {!loading && !error && data?.length === 0 && (
          <EmptyState
            title="No projects yet"
            description="Create your first project to start building the public archive."
            action={
              <ButtonLink to="/admin/projects/new" size="sm">
                Create a project
              </ButtonLink>
            }
          />
        )}

        {!loading && !error && data && data.length > 0 && filtered.length === 0 && (
          <EmptyState title="Nothing matches those filters" />
        )}

        {!loading && filtered.length > 0 && (
          <ul className="flex flex-col gap-2">
            {filtered.map((project) => (
              <li
                key={project.id}
                className="flex flex-wrap items-center gap-4 rounded-lg border border-line bg-surface p-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      to={`/admin/projects/${project.id}/edit`}
                      className="truncate text-sm font-medium text-content transition-colors hover:text-accent"
                    >
                      {project.title}
                    </Link>
                    {project.featured && <Badge tone="accent">Featured</Badge>}
                    <Badge tone={project.published ? 'success' : 'neutral'}>
                      {project.published ? 'Published' : 'Draft'}
                    </Badge>
                    <Badge tone={STATUS_TONE[project.status] ?? 'neutral'}>{STATUS_LABEL[project.status] ?? project.status}</Badge>
                  </div>
                  <p className="mt-1 truncate font-mono text-xs text-content-muted">
                    /projects/{project.slug} · {project.category} ·{' '}
                    {formatShortDate(project.createdAt)}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <IconAction
                    label={project.published ? 'Unpublish' : 'Publish'}
                    disabled={working === project.id}
                    onClick={() =>
                      runAction(project.id, () =>
                        projectService.setPublished(project.id, !project.published)
                      )
                    }
                  >
                    {project.published ? <EyeOff size={16} /> : <Eye size={16} />}
                  </IconAction>

                  <IconAction
                    label={project.featured ? 'Remove from featured' : 'Mark as featured'}
                    active={project.featured}
                    disabled={working === project.id}
                    onClick={() =>
                      runAction(project.id, () =>
                        projectService.setFeatured(project.id, !project.featured)
                      )
                    }
                  >
                    <Star size={16} fill={project.featured ? 'currentColor' : 'none'} />
                  </IconAction>

                  <Link
                    to={`/admin/projects/${project.id}/edit`}
                    aria-label={`Edit ${project.title}`}
                    className="rounded-md p-2 text-content-muted transition-colors hover:bg-surface-raised hover:text-content"
                  >
                    <Pencil size={16} />
                  </Link>

                  <IconAction
                    label={`Delete ${project.title}`}
                    danger
                    disabled={working === project.id}
                    onClick={() => setPendingDelete(project)}
                  >
                    <Trash2 size={16} />
                  </IconAction>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this project?"
        description={`"${pendingDelete?.title}" will be removed permanently. Uploaded images stay in Storage and must be removed separately. This cannot be undone.`}
        confirmLabel="Delete project"
        loading={working === pendingDelete?.id}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </>
  );
}

function IconAction({
  label,
  children,
  onClick,
  disabled,
  danger = false,
  active = false,
}: {
  label: string;
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`rounded-md p-2 transition-colors disabled:opacity-40 ${
        danger
          ? 'text-content-muted hover:bg-state-danger/10 hover:text-state-danger'
          : active
            ? 'text-accent hover:bg-surface-raised'
            : 'text-content-muted hover:bg-surface-raised hover:text-content'
      }`}
    >
      {children}
    </button>
  );
}
