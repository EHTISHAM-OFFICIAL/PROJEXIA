import { Link } from 'react-router-dom';
import { CalendarDays, FolderKanban, Inbox, Send, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { meetingService } from '../../services/meetingService';
import type { MeetingRequest } from '../../types/meeting';
import { Seo } from '../../components/ui/Seo';
import { Badge } from '../../components/ui/Badge';
import { ButtonLink } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { ErrorState } from '../../components/ui/ErrorState';
import { Skeleton } from '../../components/ui/Skeleton';
import { useAllProjects } from '../../hooks/useProjects';
import { useProjectRequests } from '../../hooks/useProjectRequests';
import { REQUEST_STATUS_TONE } from '../../constants/requestOptions';
import { formatDateTime } from '../../utils/formatting';

export default function Dashboard() {
  const projects = useAllProjects();
  const requests = useProjectRequests();
  const [meetings, setMeetings] = useState<MeetingRequest[] | null>(null);
  useEffect(() => { void meetingService.listMeetings().then(setMeetings).catch(() => setMeetings([])); }, []);

  const totalProjects = projects.data?.length ?? 0;
  const publishedProjects = projects.data?.filter((project) => project.published).length ?? 0;
  const featuredProjects = projects.data?.filter((project) => project.featured).length ?? 0;
  const totalRequests = requests.data?.length ?? 0;
  const newRequests = requests.data?.filter((request) => request.status === 'new').length ?? 0;
  const pendingMeetings = meetings?.filter((meeting) => meeting.status === 'pending').length ?? 0;
  const recent = requests.data?.slice(0, 5) ?? [];

  const loading = projects.loading || requests.loading;

  return (
    <>
      <Seo title="Dashboard" noIndex />

      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-1.5 text-sm text-content-secondary">
            Everything currently in the ProjexiaHub system.
          </p>
        </div>
        <ButtonLink to="/admin/projects/new" size="sm">
          New project
        </ButtonLink>
      </header>

      {requests.error && (
        <div className="mt-8">
          <ErrorState message={requests.error} onRetry={requests.reload} />
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          label="Projects"
          value={totalProjects}
          hint={`${publishedProjects} published`}
          icon={FolderKanban}
          to="/admin/projects"
          loading={loading}
        />
        <StatCard
          label="Featured"
          value={featuredProjects}
          hint="Shown on the homepage"
          icon={Sparkles}
          to="/admin/projects"
          loading={loading}
        />
        <StatCard
          label="Requests"
          value={totalRequests}
          hint="All time"
          icon={Inbox}
          to="/admin/requests"
          loading={loading}
        />
        <StatCard
          label="Meetings"
          value={meetings?.length ?? 0}
          hint={`${pendingMeetings} pending`}
          icon={CalendarDays}
          to="/admin/meetings"
          loading={meetings === null}
          highlight={pendingMeetings > 0}
        />
        <StatCard
          label="New requests"
          value={newRequests}
          hint="Not yet reviewed"
          icon={Send}
          to="/admin/requests"
          loading={loading}
          highlight={newRequests > 0}
        />
      </div>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-lg font-semibold tracking-tight">Recent requests</h2>
          <Link
            to="/admin/requests"
            className="rounded-md px-1 py-1 text-sm text-accent transition-colors hover:text-accent-hover"
          >
            View all
          </Link>
        </div>

        <div className="mt-5">
          {loading && (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 3 }, (_, index) => (
                <Skeleton key={index} className="h-16 w-full" />
              ))}
            </div>
          )}

          {!loading && !requests.error && recent.length === 0 && (
            <EmptyState
              title="No requests yet"
              description="Project requests submitted through the website will appear here."
            />
          )}

          {!loading && recent.length > 0 && (
            <ul className="flex flex-col gap-2">
              {recent.map((request) => (
                <li key={request.id}>
                  <Link
                    to={`/admin/requests/${request.id}`}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-surface px-4 py-3.5 transition-colors hover:border-line-strong"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-content">
                        {request.project.title}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-content-muted">
                        {request.contact.fullName} · {request.requestNumber}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="font-mono text-xs text-content-muted">
                        {formatDateTime(request.createdAt as never)}
                      </span>
                      <Badge tone={REQUEST_STATUS_TONE[request.status]}>{request.status}</Badge>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  to,
  loading,
  highlight = false,
}: {
  label: string;
  value: number;
  hint: string;
  icon: typeof FolderKanban;
  to: string;
  loading: boolean;
  highlight?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`card p-5 transition-colors hover:border-line-strong ${
        highlight ? 'border-accent/30' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-content-secondary">{label}</span>
        <Icon size={16} className="text-content-muted" aria-hidden="true" />
      </div>
      {loading ? (
        <Skeleton className="mt-3 h-8 w-12" />
      ) : (
        <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
      )}
      <p className="mt-1 text-xs text-content-muted">{hint}</p>
    </Link>
  );
}
