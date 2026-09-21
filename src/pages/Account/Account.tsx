import { Link } from 'react-router-dom';
import { LogOut, UserRound } from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { ButtonLink } from '../../components/ui/Button';
import { Seo } from '../../components/ui/Seo';
import { useAuth } from '../../hooks/useAuth';

export default function Account() {
  const { user, profile, signOut } = useAuth();

  if (!user) return null;

  return (
    <>
      <Seo title="My account" noIndex />
      <Container className="py-14 sm:py-20">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-accent">MECTEC account</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              {profile?.username || 'My account'}
            </h1>
            <p className="mt-3 text-sm text-content-secondary">
              Manage your project requests and account access.
            </p>
          </div>
          <Button variant="secondary" onClick={() => void signOut()}>
            <span className="flex items-center gap-2"><LogOut size={16} /> Sign out</span>
          </Button>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Link to="/account/requests" className="group rounded-card border border-line bg-surface p-6 transition-colors hover:border-line-strong">
            <UserRound size={20} className="text-accent" aria-hidden="true" />
            <h2 className="mt-5 text-lg font-semibold">My project requests</h2>
            <p className="mt-2 text-sm leading-relaxed text-content-secondary">
              View your submitted requests, status updates and available editing windows.
            </p>
            <span className="mt-5 inline-block text-sm font-medium text-accent group-hover:text-accent-hover">
              View requests →
            </span>
          </Link>

          <div className="rounded-card border border-line bg-surface p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-content-muted">Account</p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-start justify-between gap-4">
                <dt className="text-content-secondary">Username</dt>
                <dd className="font-medium text-content">{profile?.username || '—'}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-content-secondary">Account email</dt>
                <dd className="font-medium text-content">{profile?.recoveryEmail || '—'}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-8">
          <ButtonLink to="/request-project" size="lg">
            Request a project
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
