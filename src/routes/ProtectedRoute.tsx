import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Loader2, ShieldAlert } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Container } from '../components/ui/Container';
import { Button, ButtonLink } from '../components/ui/Button';

/**
 * Gates the /admin subtree.
 *
 * This is a usability layer, not a security boundary — anyone can read the
 * bundled JavaScript. Actual authorisation lives in firestore.rules and
 * storage.rules, which reject reads and writes from non-admin accounts.
 */
export function ProtectedRoute() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 size={22} className="animate-spin text-content-muted" aria-hidden="true" />
        <span className="sr-only">Checking your session</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  if (!isAdmin) {
    return (
      <Container className="py-24">
        <div className="mx-auto max-w-md rounded-card border border-line bg-surface p-8 text-center">
          <ShieldAlert size={24} className="mx-auto text-state-warning" aria-hidden="true" />
          <h1 className="mt-4 text-xl font-semibold tracking-tight">No admin access</h1>
          <p className="mt-3 text-sm leading-relaxed text-content-secondary">
            You're signed in as {user.email}, but that account isn't registered as a ProjexiaHub admin.
            Add a document at <span className="font-mono text-content">admins/{user.uid}</span> in
            Firestore to grant access — see the README.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button variant="secondary" size="sm" onClick={() => void signOut()}>
              Sign out
            </Button>
            <ButtonLink to="/" size="sm">
              Back to site
            </ButtonLink>
          </div>
        </div>
      </Container>
    );
  }

  return <Outlet />;
}
