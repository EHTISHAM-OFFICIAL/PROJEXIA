import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../../components/ui/Seo';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';
import { ErrorState } from '../../components/ui/ErrorState';
import { Skeleton } from '../../components/ui/Skeleton';
import { Select, TextInput } from '../../components/forms/Inputs';
import { useProjectRequests } from '../../hooks/useProjectRequests';
import {
  REQUEST_PRIORITIES,
  REQUEST_PRIORITY_TONE,
  REQUEST_STATUSES,
  REQUEST_STATUS_TONE,
} from '../../constants/requestOptions';
import { formatDateTime } from '../../utils/formatting';

export default function RequestsList() {
  const { data, loading, error, reload } = useProjectRequests();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

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

  return (
    <>
      <Seo title="Requests" noIndex />

      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Project requests</h1>
        <p className="mt-1.5 text-sm text-content-secondary">
          {data ? `${data.length} total` : 'Loading…'}
        </p>
      </header>

      <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <TextInput
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by reference, name, email or project"
          aria-label="Search requests"
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
              <li key={request.id}>
                <Link
                  to={`/admin/requests/${request.id}`}
                  className="flex flex-wrap items-center gap-4 rounded-lg border border-line bg-surface p-4 transition-colors hover:border-line-strong"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="truncate text-sm font-medium text-content">
                        {request.project.title}
                      </span>
                      <Badge tone={REQUEST_STATUS_TONE[request.status]}>{request.status}</Badge>
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
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-mono text-xs text-content-secondary">
                      {request.requestNumber}
                    </p>
                    <p className="mt-1 font-mono text-xs text-content-muted">
                      {formatDateTime(request.createdAt as never)}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
