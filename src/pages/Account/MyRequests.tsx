import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock3, Trash2 } from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Alert } from '../../components/ui/Alert';
import { ButtonLink } from '../../components/ui/Button';
import { Seo } from '../../components/ui/Seo';
import { useAuth } from '../../hooks/useAuth';
import { requestService } from '../../services/requestService';
import type { ProjectRequest } from '../../types/projectRequest';
import { toUserMessage } from '../../utils/errors';

function RequestSection({
  title,
  requests,
  emptyTitle,
  emptyDescription,
  deleted = false,
}: {
  title: string;
  requests: ProjectRequest[];
  emptyTitle: string;
  emptyDescription: string;
  deleted?: boolean;
}) {
  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-1 text-sm text-content-secondary">{emptyDescription}</p>
        </div>
        <span className="shrink-0 rounded-full border border-line px-3 py-1 text-xs text-content-muted">
          {requests.length}
        </span>
      </div>

      {requests.length === 0 ? (
        <div className="mt-4 rounded-card border border-line bg-surface p-6">
          <p className="text-sm font-medium">{emptyTitle}</p>
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          {requests.map((request) => (
            <Link
              key={request.id}
              to={`/account/requests/${request.id}`}
              className={`block rounded-card border border-line bg-surface p-6 transition-colors ${
                deleted ? 'opacity-60 grayscale' : 'hover:border-line-strong'
              }`}
              aria-label={deleted ? `Deleted request: ${request.project.title}` : request.project.title}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-mono text-xs text-content-muted">{request.requestNumber}</p>
                  <h3 className="mt-2 text-lg font-semibold">{request.project.title}</h3>
                  <p className="mt-1 text-sm text-content-secondary">{request.project.category} · {request.project.type}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-line px-3 py-1 text-xs font-medium text-content-secondary">
                    {request.status}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs font-medium text-content-muted">
                    <Trash2 size={13} aria-hidden="true" />
                    {deleted ? 'Deleted' : 'Active'}
                  </span>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-2 text-xs text-content-muted">
                <Clock3 size={14} />
                Submitted {request.createdAt ? request.createdAt.toDate().toLocaleString() : '—'}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default function MyRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<ProjectRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    requestService.getMyRequests(user.uid)
      .then(setRequests)
      .catch((caught) => setError(toUserMessage(caught, 'Could not load your requests.')))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <>
      <Seo title="My requests" noIndex />
      <Container className="py-14 sm:py-20">
        <Link to="/account" className="inline-flex items-center gap-2 text-sm text-content-secondary hover:text-content">
          <ArrowLeft size={15} /> Account
        </Link>

        <div className="mt-8">
          <h1 className="text-3xl font-semibold tracking-tight">My project requests</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-content-secondary">
            Your requests are private to your account. Editing is available only during the configured window after submission.
          </p>
        </div>

        {error && <div className="mt-8"><Alert tone="danger">{error}</Alert></div>}

        {loading ? (
          <p className="mt-10 text-sm text-content-muted">Loading your requests…</p>
        ) : requests.length === 0 ? (
          <div className="mt-10 rounded-card border border-line bg-surface p-8">
            <h2 className="text-lg font-semibold">No requests yet</h2>
            <p className="mt-2 text-sm text-content-secondary">When you submit a project request, it will appear here.</p>
            <ButtonLink to="/request-project" className="mt-5">Request a project</ButtonLink>
          </div>
        ) : (
          <div className="mt-10 space-y-10">
            <RequestSection
              title="Active requests"
              requests={requests.filter((request) => !request.deletedAt)}
              emptyTitle="No active requests"
              emptyDescription="Your submitted requests that have not been deleted will appear here."
            />
            <RequestSection
              title="Deleted requests"
              requests={requests.filter((request) => Boolean(request.deletedAt))}
              emptyTitle="No deleted requests"
              emptyDescription="Requests you delete are kept here separately as read-only records."
              deleted
            />
          </div>
        )}
      </Container>
    </>
  );
}
