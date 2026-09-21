import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Pencil, LockKeyhole, Activity, Trash2, Clock3 } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { Alert } from '../../components/ui/Alert';
import { Button, ButtonLink } from '../../components/ui/Button';
import { Seo } from '../../components/ui/Seo';
import { useAuth } from '../../hooks/useAuth';
import { requestService } from '../../services/requestService';
import { requestSettingsService } from '../../services/requestSettingsService';
import type { ProjectRequest } from '../../types/projectRequest';
import { toUserMessage } from '../../utils/errors';

function formatDate(timestamp: ProjectRequest['createdAt']) {
  return timestamp ? timestamp.toDate().toLocaleString() : '—';
}

export default function RequestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [request, setRequest] = useState<ProjectRequest | null>(null);
  const [hours, setHours] = useState(24);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!user || !id) return;

    Promise.all([
      requestService.getMyRequestById(id, user.uid),
      requestSettingsService.getSecuritySettings(),
    ])
      .then(([nextRequest, settings]) => {
        setRequest(nextRequest);
        setHours(settings.customerRequestEditWindowHours);
      })
      .catch((caught) => setError(toUserMessage(caught, 'Could not load this request.')))
      .finally(() => setLoading(false));
  }, [user, id]);

  const editUntil = useMemo(() => {
    if (!request?.createdAt) return null;
    return request.createdAt.toMillis() + hours * 60 * 60 * 1000;
  }, [request, hours]);

  const isTrashed = Boolean(request?.deletedAt);
  const canEdit = !isTrashed && editUntil !== null && Date.now() < editUntil;
  const editDeadlineLabel = editUntil
    ? new Date(editUntil).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
    : null;

  const handleDelete = async () => {
    if (!user || !id || !canEdit) return;
    const confirmed = window.confirm(
      'Delete this project request? It will move to Deleted Requests inside My Requests and become read-only. Important: if an administrator later permanently deletes this request from the admin trash, it will be removed completely and will never appear in your Deleted Requests section again. This cannot be undone. Continue?'
    );
    if (!confirmed) return;

    setDeleting(true);
    setError(null);
    try {
      await requestService.deleteMyRequest(id, user.uid);
      navigate('/account/requests', { replace: true });
    } catch (caught) {
      setError(toUserMessage(caught, 'Could not delete this request.'));
      setDeleting(false);
    }
  };

  return (
    <>
      <Seo title={request ? request.project.title : 'Request'} noIndex />
      <Container className="py-14 sm:py-20">
        <Link to="/account/requests" className="inline-flex items-center gap-2 text-sm text-content-secondary hover:text-content">
          <ArrowLeft size={15} /> My requests
        </Link>

        {loading ? (
          <p className="mt-10 text-sm text-content-muted">Loading request…</p>
        ) : error ? (
          <div className="mt-8"><Alert tone="danger">{error}</Alert></div>
        ) : !request ? (
          <div className="mt-8"><Alert tone="danger">This request could not be found.</Alert></div>
        ) : (
          <>
            <div className="mt-8 flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-xs text-content-muted">{request.requestNumber}</p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight">{request.project.title}</h1>
                <p className="mt-3 text-sm text-content-secondary">{request.project.category} · {request.project.type}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {isTrashed ? (
                  <Button
                    variant="secondary"
                    disabled
                    className="cursor-not-allowed opacity-50"
                    title="Status tracking is unavailable for deleted requests."
                  >
                    <span className="flex items-center gap-2">
                      <Activity size={16} /> View request status
                    </span>
                  </Button>
                ) : (
                  <ButtonLink
                    to={`/track-request?ref=${encodeURIComponent(request.requestNumber)}`}
                    variant="secondary"
                  >
                    <span className="flex items-center gap-2">
                      <Activity size={16} /> View request status
                    </span>
                  </ButtonLink>
                )}
                {canEdit ? (
                  <>
                    <ButtonLink to={`/account/requests/${request.id}/edit`}>
                      <span className="flex items-center gap-2">
                        <Pencil size={16} /> Edit request
                      </span>
                    </ButtonLink>
                    <Button
                      variant="danger"
                      onClick={() => void handleDelete()}
                      loading={deleting}
                    >
                      <span className="flex items-center gap-2">
                        <Trash2 size={16} aria-hidden="true" />
                        {deleting ? 'Deleting…' : 'Delete request'}
                      </span>
                    </Button>
                  </>
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm text-content-muted">
                    <LockKeyhole size={15} /> {isTrashed ? 'Request is deleted' : 'Editing window closed'}
                  </div>
                )}
                {request.deletedAt && request.deletedBy === 'customer' && (
                  <Button
                    variant="danger"
                    onClick={async () => {
                      if (!window.confirm('Permanently delete this request? This cannot be undone.')) return;
                      setDeleting(true);
                      setError(null);
                      try {
                        await requestService.permanentlyDeleteMyRequest(request.id, user!.uid);
                        navigate('/account/requests', { replace: true });
                      } catch (caught) {
                        setError(toUserMessage(caught, 'Could not permanently delete this request.'));
                        setDeleting(false);
                      }
                    }}
                    loading={deleting}
                  >
                    Permanently delete
                  </Button>
                )}
              </div>
            </div>

            {isTrashed && (
              <div className="mt-6 rounded-card border border-state-warning/30 bg-state-warning/5 p-4">
                <p className="text-sm font-semibold">Deleted request</p>
                <p className="mt-1 text-sm leading-relaxed text-content-secondary">
                  This request is deleted and read-only. It will remain in Deleted Requests while it exists. If an administrator permanently deletes it from the admin trash, it will be removed completely and will never appear in your Deleted Requests again.
                </p>
              </div>
            )}

            {canEdit && editDeadlineLabel && (
              <div className="mt-6 flex items-start gap-3 rounded-card border border-state-warning/30 bg-state-warning/5 p-4">
                <Clock3 size={18} className="mt-0.5 shrink-0 text-state-warning" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold">Editing and deletion window is still open</p>
                  <p className="mt-1 text-sm leading-relaxed text-content-secondary">
                    You can edit or delete this request until <span className="font-medium text-content">{editDeadlineLabel}</span> (your local time).
                    After that deadline, the request becomes read-only.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              <div className="rounded-card border border-line bg-surface p-5">
                <p className="text-xs text-content-muted">Status</p>
                <p className="mt-2 font-medium capitalize">{request.status.replace('-', ' ')}</p>
              </div>
              <div className="rounded-card border border-line bg-surface p-5">
                <p className="text-xs text-content-muted">Submitted</p>
                <p className="mt-2 text-sm">{formatDate(request.createdAt)}</p>
              </div>
              <div className="rounded-card border border-line bg-surface p-5">
                <p className="text-xs text-content-muted">Last updated</p>
                <p className="mt-2 text-sm">{formatDate(request.updatedAt)}</p>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              <section className="rounded-card border border-line bg-surface p-6">
                <h2 className="text-lg font-semibold">Project</h2>
                <dl className="mt-5 space-y-4 text-sm">
                  <div><dt className="text-content-muted">Purpose</dt><dd className="mt-1 whitespace-pre-wrap">{request.project.purpose || 'Not provided'}</dd></div>
                  <div><dt className="text-content-muted">Description</dt><dd className="mt-1 whitespace-pre-wrap leading-relaxed">{request.project.description}</dd></div>
                </dl>
              </section>

              <section className="rounded-card border border-line bg-surface p-6">
                <h2 className="text-lg font-semibold">Contact</h2>
                <p className="mt-4 text-sm">{request.contact.fullName}</p>
                <p className="mt-1 text-sm text-content-secondary">{request.contact.email}</p>
              </section>
            </div>
          </>
        )}
      </Container>
    </>
  );
}
