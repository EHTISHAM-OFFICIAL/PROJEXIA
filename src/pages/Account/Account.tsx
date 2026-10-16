import { Link } from 'react-router-dom';
import { LogOut, RefreshCw, UserRound } from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { ButtonLink } from '../../components/ui/Button';
import { Seo } from '../../components/ui/Seo';
import { useAuth } from '../../hooks/useAuth';
import { useSiteSettings } from '../../contexts/SiteSettingsContext';

export default function Account() {
  const { settings } = useSiteSettings();
  const { user, profile, signOut, refreshAccount, refreshingAccount, accountError } = useAuth();

  if (!user) return null;

  return (
    <>
      <Seo title="My account" noIndex />
      <Container className="py-14 sm:py-20">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-accent">{settings.name} account</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              {profile?.username || user.displayName || 'My account'}
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
                <dd className="min-w-0 max-w-[65%] break-words text-right font-medium text-content">{profile?.username || user.displayName || '—'}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-content-secondary">Account email</dt>
                <dd className="min-w-0 max-w-[65%] break-all text-right font-medium text-content">{profile?.recoveryEmail || user.email || '—'}</dd>
              </div>
            </dl>
            <div className="mt-5 border-t border-line pt-4">
              <p className="text-xs leading-relaxed text-content-secondary">
                Username or email missing? Refresh your account details to reload them.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  disabled={refreshingAccount}
                  onClick={() => void refreshAccount()}
                >
                  <span className="flex items-center gap-2">
                    <RefreshCw size={14} className={refreshingAccount ? 'animate-spin' : ''} />
                    {refreshingAccount ? 'Refreshing…' : 'Refresh account'}
                  </span>
                </Button>
                {accountError && <p role="status" className="text-xs text-content-secondary">{accountError}</p>}
              </div>
            </div>
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
