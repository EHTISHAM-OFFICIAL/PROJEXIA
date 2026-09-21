import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { Seo } from '../../components/ui/Seo';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';
import { ErrorState } from '../../components/ui/ErrorState';
import { Skeleton } from '../../components/ui/Skeleton';
import { Select, TextInput } from '../../components/forms/Inputs';
import { useProjectRequests } from '../../hooks/useProjectRequests';
import { requestService } from '../../services/requestService';
import {
  REQUEST_PRIORITIES,
  REQUEST_PRIORITY_TONE,
  REQUEST_STATUSES,
  REQUEST_STATUS_TONE,
} from '../../constants/requestOptions';
import { formatDateTime } from '../../utils/formatting';
import { toUserMessage } from '../../utils/errors';
import type { RequestStatus } from '../../types/projectRequest';

export default function RequestsList() {
  const { data, loading, error, reload } = useProjectRequests();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!data) return [];
    const term = search.trim().toLowerCase();
    return data.filter((request) => {
      if (status && request.status !== status) return false;
      if (priority && request.priority !== priority) return false;
      if (!term) return true;
      return [
        request.requestNumber,
        request.project.title,
        request.contact.fullName,
        request.contact.email,
      ]
        .join(' ')
        .toLowerCase()
        .includes(term);
    });
  }, [data, search, status, priority]);

  const handleStatusChange = async (id: string, nextStatus: RequestStatus) => {
    setUpdatingId(id);
    setUpdateError(null);
    try {
      // This also keeps requestStatusLookup in sync, which is what the
      // visitor's "track my request" page reads — see requestService.
      await requestService.updateRequestStatus(id, nextStatus);
      reload();
    } catch (caught) {
      setUpdateError(toUserMessage(caught, 'Could not update the status.'));
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <>
      <Seo title="Requests" noIndex />

      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Project requests</h1>
        <p className="mt-1.5 max-w-prose text-sm text-content-secondary">
          {data ? `${data.length} total` : 'Loading…'} — change status here for a quick update, or
          open a request for full details and internal notes.
        </p>
      </header>

      {updateError && (
        <div className="mt-6">
          <ErrorState message={updateError} />
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <TextInput
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by reference, name, email or project"
          aria-label="Search requests"
          className="min-w-0 flex-1"
        />
        <Select
          options={REQUEST_STATUSES}
          placeholder="All statuses"
          value={status}
          aria-label="Filter by status"
          onChange={(event) => setStatus(event.target.value)}
        />
        <Select
          options={REQUEST_PRIORITIES}
          placeholder="All priorities"
          value={priority}
          aria-label="Filter by priority"
          onChange={(event) => setPriority(event.target.value)}
        />
        <Link
          to="/admin/requests/trash"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-line bg-surface-raised px-4 text-sm font-medium transition-colors hover:border-line-strong hover:bg-surface"
        >
          <Trash2 size={16} aria-hidden="true" />
          Trash
        </Link>
      </div>
      <div className="mt-6">
        {loading && (
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }, (_, index) => (
              <Skeleton key={index} className="h-20 w-full" />
            ))}
          </div>
        )}

        {!loading && error && <ErrorState message={error} onRetry={reload} />}

        {!loading && !error && data?.length === 0 && (
          <EmptyState
            title="No requests yet"
            description="Project requests submitted through the website will appear here."
          />
        )}

        {!loading && !error && data && data.length > 0 && filtered.length === 0 && (
          <EmptyState title="Nothing matches those filters" />
        )}

        {!loading && filtered.length > 0 && (
          <ul className="flex flex-col gap-2">
            {filtered.map((request) => (
              <li
                key={request.id}
                className="flex flex-wrap items-center gap-4 rounded-lg border border-line bg-surface p-4"
              >
                <Link
                  to={`/admin/requests/${request.id}`}
                  className="min-w-0 flex-1 rounded-md"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="truncate text-sm font-medium text-content transition-colors hover:text-accent">
                      {request.project.title}
                    </span>
                    {request.priority !== 'normal' && (
                      <Badge tone={REQUEST_PRIORITY_TONE[request.priority]}>
                        {request.priority}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 truncate text-xs text-content-muted">
                    {request.contact.fullName} · {request.contact.email} ·{' '}
                    {request.project.category}
                  </p>
                  <p className="mt-1 font-mono text-xs text-content-muted">
                    {request.requestNumber} · {formatDateTime(request.createdAt as never)}
                  </p>
                </Link>

                <div className="flex shrink-0 items-center gap-2">
                  <Badge tone={REQUEST_STATUS_TONE[request.status]}>{request.status}</Badge>
                  <Select
                    options={REQUEST_STATUSES}
                    value={request.status}
                    disabled={updatingId === request.id}
                    aria-label={`Change status for ${request.project.title}`}
                    onChange={(event) =>
                      handleStatusChange(request.id, event.target.value as RequestStatus)
                    }
                    className="h-9 w-40 text-xs"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
