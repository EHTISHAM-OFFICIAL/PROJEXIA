import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Trash2 } from 'lucide-react';
import { Seo } from '../../components/ui/Seo';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { ErrorState } from '../../components/ui/ErrorState';
import { Skeleton } from '../../components/ui/Skeleton';
import { requestService } from '../../services/requestService';
import type { ProjectRequest } from '../../types/projectRequest';
import { formatDateTime } from '../../utils/formatting';
import { toUserMessage } from '../../utils/errors';

export default function RequestTrash() {
  const [requests, setRequests] = useState<ProjectRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [restoringId, setRestoringId] = useState<string | null>(null);

  const load = async () => {
    setError(null);
    try {
      setRequests(await requestService.getTrashedRequests());
    } catch (caught) {
      setError(toUserMessage(caught, 'Could not load the request trash.'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const restore = async (request: ProjectRequest) => {
    if (!window.confirm(`Restore “${request.project.title}” to active requests?`)) return;

    setRestoringId(request.id);
    setError(null);
    try {
      await requestService.restoreRequest(request.id);
      await load();
    } catch (caught) {
      setError(toUserMessage(caught, 'Could not restore this request.'));
    } finally {
      setRestoringId(null);
    }
  };

  return (
    <>
      <Seo title="Request trash" noIndex />

      <Link
        to="/admin/requests"
        className="inline-flex items-center gap-2 rounded-md py-2 text-sm text-content-secondary transition-colors hover:text-content"
      >
        <ArrowLeft size={15} aria-hidden="true" />
        Active requests
      </Link>

      <header className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Request trash</h1>
          <p className="mt-1.5 max-w-prose text-sm text-content-secondary">
            Deleted requests are kept here as recoverable records. Admins can review them and restore them; customer and admin trash actions remain subject to the request protection rules.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-content-secondary">
          <Trash2 size={14} aria-hidden="true" />
          {requests.length} in trash
        </span>
      </header>

      {error && <div className="mt-6"><ErrorState message={error} onRetry={load} /></div>}

      <div className="mt-8">
        {loading && (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }, (_, index) => (
              <Skeleton key={index} className="h-24 w-full" />
            ))}
          </div>
        )}

        {!loading && !error && requests.length === 0 && (
          <EmptyState
            title="Trash is empty"
            description="Requests moved out of the active list will appear here until restored."
          />
        )}

        {!loading && !error && requests.length > 0 && (
          <ul className="flex flex-col gap-3">
            {requests.map((request) => (
              <li
                key={request.id}
                className="flex flex-col gap-4 rounded-card border border-line bg-surface p-5 sm:flex-row sm:items-center"
              >
                <Link to={`/admin/requests/${request.id}`} className="min-w-0 flex-1">
                  <p className="truncate font-medium">{request.project.title}</p>
                  <p className="mt-1 text-sm text-content-secondary">
                    {request.contact.fullName} · {request.contact.email}
                  </p>
                  <p className="mt-1 font-mono text-xs text-content-muted">
                    {request.requestNumber} · Deleted {formatDateTime(request.deletedAt as never)}
                  </p>
                </Link>

                <Button
                  variant="secondary"
                  size="sm"
                  loading={restoringId === request.id}
                  onClick={() => void restore(request)}
                >
                  <span className="flex items-center gap-2">
                    <RotateCcw size={15} aria-hidden="true" />
                    Restore
                  </span>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
