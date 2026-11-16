import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  LogOut,
  Pencil,
  RefreshCw,
  ShieldAlert,
  Trash2,
  UserRound,
  X,
} from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { ButtonLink } from '../../components/ui/Button';
import { Seo } from '../../components/ui/Seo';
import { useAuth } from '../../hooks/useAuth';
import { useSiteSettings } from '../../contexts/SiteSettingsContext';
import {
  changeUsername,
  deleteCustomerAccount,
  getUsernameChangeStatus,
  validateUsername,
} from '../../services/userService';

const inputClass =
  'h-11 w-full rounded-xl border border-line bg-surface-raised px-3.5 text-sm text-content outline-none transition-colors placeholder:text-content-muted focus:border-accent focus:ring-2 focus:ring-accent/15';

function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error && error.message ? error.message : fallback;
}

export default function Account() {
  const { settings } = useSiteSettings();
  const { user, profile, signOut, refreshAccount, refreshingAccount, accountError } = useAuth();
  const [editingUsername, setEditingUsername] = useState(false);
  const [usernameInput, setUsernameInput] = useState(profile?.username ?? '');
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [usernameSuccess, setUsernameSuccess] = useState(false);
  const [savingUsername, setSavingUsername] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deletingAccount, setDeletingAccount] = useState(false);

  useEffect(() => {
    setUsernameInput(profile?.username ?? '');
  }, [profile?.username]);

  if (!user) return null;

  const usernameStatus = getUsernameChangeStatus(profile);
  const currentUsername = profile?.username || user.displayName || '—';

  const submitUsername = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUsernameError(null);
    setUsernameSuccess(false);

    const validationError = validateUsername(usernameInput);
    if (validationError) {
      setUsernameError(validationError);
      return;
    }
    if (usernameInput.trim().toLowerCase() === profile?.username?.toLowerCase()) {
      setUsernameError('That is already your current username.');
      return;
    }
    if (usernameStatus.remaining <= 0) {
      setUsernameError(
        usernameStatus.availableAt
          ? 'You have used both username changes in the last 30 days. Your next change is available on ' +
              usernameStatus.availableAt.toLocaleDateString() +
              '.'
          : 'You have used both username changes available in a 30-day period.',
      );
      return;
    }

    setSavingUsername(true);
    try {
      await changeUsername(user, usernameInput);
      await refreshAccount();
      setUsernameSuccess(true);
      setEditingUsername(false);
    } catch (error) {
      setUsernameError(errorMessage(error, 'Your username could not be changed. Please try again.'));
    } finally {
      setSavingUsername(false);
    }
  };

  const closeDeleteDialog = () => {
    if (deletingAccount) return;
    setShowDeleteDialog(false);
    setDeletePassword('');
    setDeleteConfirmation('');
    setDeleteError(null);
  };

  const submitDeleteAccount = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDeleteError(null);
    if (deleteConfirmation !== 'DELETE') {
      setDeleteError('Type DELETE exactly as shown to confirm permanent account deletion.');
      return;
    }
    if (!deletePassword) {
      setDeleteError('Enter your account password to continue.');
      return;
    }

    setDeletingAccount(true);
    try {
      await deleteCustomerAccount(user, deletePassword);
      // Firebase's auth-state listener will clear the session and leave this route.
    } catch (error) {
      setDeleteError(errorMessage(error, 'We could not delete your account. Please try again.'));
      setDeletingAccount(false);
    }
  };

  return (
    <>
      <Seo title="My account" noIndex />
      <Container className="py-14 sm:py-20">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-accent">{settings.name} account</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              {currentUsername}
            </h1>
            <p className="mt-3 text-sm text-content-secondary">
              Manage your profile, project requests and account access.
            </p>
          </div>
          <Button variant="secondary" onClick={() => void signOut()}>
            <span className="flex items-center gap-2"><LogOut size={16} /> Sign out</span>
          </Button>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <Link to="/account/requests" className="group rounded-card border border-line bg-surface p-6 transition-colors hover:border-line-strong sm:p-7">
            <UserRound size={20} className="text-accent" aria-hidden="true" />
            <h2 className="mt-5 text-lg font-semibold">My project requests</h2>
            <p className="mt-2 text-sm leading-relaxed text-content-secondary">
              View your submitted requests, status updates and available editing windows.
            </p>
            <span className="mt-5 inline-block text-sm font-medium text-accent group-hover:text-accent-hover">
              View requests →
            </span>
          </Link>

          <section className="rounded-card border border-line bg-surface p-6 sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-medium uppercase tracking-wider text-content-muted">Account details</p>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-state-success/25 bg-state-success/5 px-2.5 py-1 text-[11px] font-medium text-state-success">
                <CheckCircle2 size={12} /> Active
              </span>
            </div>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex items-start justify-between gap-4">
                <dt className="text-content-secondary">Username</dt>
                <dd className="min-w-0 max-w-[65%] break-words text-right font-semibold text-content">{currentUsername}</dd>
              </div>
              <div className="flex items-start justify-between gap-4">
                <dt className="text-content-secondary">Account email</dt>
                <dd className="min-w-0 max-w-[65%] break-all text-right font-medium text-content">{profile?.recoveryEmail || user.email || '—'}</dd>
              </div>
            </dl>
            <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-4">
              <Button type="button" size="sm" variant="secondary" onClick={() => {
                setUsernameInput(profile?.username ?? '');
                setUsernameError(null);
                setUsernameSuccess(false);
                setEditingUsername((open) => !open);
              }}>
                <span className="flex items-center gap-2"><Pencil size={14} /> {editingUsername ? 'Close editor' : 'Edit username'}</span>
              </Button>
              <Button type="button" size="sm" variant="ghost" disabled={refreshingAccount} onClick={() => void refreshAccount()}>
                <span className="flex items-center gap-2">
                  <RefreshCw size={14} className={refreshingAccount ? 'animate-spin' : ''} />
                  {refreshingAccount ? 'Refreshing…' : 'Refresh details'}
                </span>
              </Button>
            </div>
            {accountError && <p role="status" className="mt-3 text-xs text-content-secondary">{accountError}</p>}
          </section>
        </div>

        {usernameSuccess && (
          <div role="status" className="mt-6 flex items-start gap-3 rounded-2xl border border-state-success/25 bg-state-success/5 p-4 text-sm text-content">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-state-success" />
            <p>Your username has been updated successfully. You can now sign in using your new username.</p>
          </div>
        )}

        {editingUsername && (
          <section className="mt-6 rounded-card border border-line bg-surface p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">Change your username</h2>
                <p className="mt-1 text-sm text-content-secondary">Choose a username that is easy to remember.</p>
              </div>
              <button type="button" onClick={() => setEditingUsername(false)} aria-label="Close username editor" className="rounded-lg p-2 text-content-muted transition-colors hover:bg-surface-raised hover:text-content">
                <X size={17} />
              </button>
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-xl border border-state-info/25 bg-state-info/5 p-4">
              <Clock3 size={18} className="mt-0.5 shrink-0 text-state-info" />
              <div className="text-sm leading-relaxed text-content">
                <p className="font-semibold">Username change limit</p>
                <p className="mt-1 text-content-secondary">
                  You can change your username only twice in any 30-day period. You have used {usernameStatus.used} of 2 changes in the current period.
                </p>
                {usernameStatus.remaining <= 0 && usernameStatus.availableAt && (
                  <p className="mt-2 font-medium text-content">
                    Your next change becomes available on {usernameStatus.availableAt.toLocaleDateString()}.
                  </p>
                )}
              </div>
            </div>

            <form onSubmit={submitUsername} className="mt-5 max-w-xl">
              <label htmlFor="new-username" className="mb-2 block text-sm font-medium text-content">New username</label>
              <input
                id="new-username"
                name="username"
                type="text"
                autoComplete="username"
                maxLength={30}
                value={usernameInput}
                onChange={(event) => setUsernameInput(event.target.value)}
                placeholder="e.g. your_name"
                className={inputClass}
                aria-describedby="username-hint"
                disabled={savingUsername || usernameStatus.remaining <= 0}
              />
              <p id="username-hint" className="mt-2 text-xs leading-relaxed text-content-muted">
                3–30 characters. Use lowercase letters, numbers, hyphens or underscores. Your account email and project requests will not change.
              </p>
              {usernameError && <p role="alert" className="mt-3 text-sm text-state-danger">{usernameError}</p>}
              <div className="mt-5 flex flex-wrap gap-3">
                <Button type="submit" loading={savingUsername} disabled={savingUsername || usernameStatus.remaining <= 0}>
                  {savingUsername ? 'Saving username…' : 'Save new username'}
                </Button>
                <Button type="button" variant="secondary" disabled={savingUsername} onClick={() => {
                  setUsernameInput(profile?.username ?? '');
                  setUsernameError(null);
                  setEditingUsername(false);
                }}>Cancel</Button>
              </div>
            </form>
          </section>
        )}

        <div className="mt-8">
          <ButtonLink to="/request-project" size="lg">Request a project</ButtonLink>
        </div>

        <section className="mt-14 rounded-card border border-state-danger/25 bg-surface p-6 sm:p-7">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-state-danger/10 text-state-danger">
              <ShieldAlert size={19} />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold">Delete account permanently</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-content-secondary">
                Permanently remove your sign-in account, profile and username. This action cannot be undone. Your submitted project requests will remain in PROJEXIAHUB's records for administrator history and service reference; they will not be deleted with your account.
              </p>
              <Button type="button" variant="danger" className="mt-5" onClick={() => {
                setDeleteError(null);
                setShowDeleteDialog(true);
              }}>
                <span className="flex items-center gap-2"><Trash2 size={15} /> Delete my account</span>
              </Button>
            </div>
          </div>
        </section>
      </Container>

      {showDeleteDialog && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeDeleteDialog();
        }}>
          <section role="alertdialog" aria-modal="true" aria-labelledby="delete-account-title" aria-describedby="delete-account-description" className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-line bg-surface p-6 shadow-2xl sm:rounded-3xl sm:p-7">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-state-danger/10 text-state-danger">
                <AlertTriangle size={21} />
              </span>
              <div className="min-w-0 flex-1">
                <h2 id="delete-account-title" className="text-xl font-semibold">Permanently delete your account?</h2>
                <p id="delete-account-description" className="mt-2 text-sm leading-relaxed text-content-secondary">
                  Your sign-in and profile will be deleted. You will no longer be able to access this account.
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-state-info/25 bg-state-info/5 p-4">
              <p className="text-sm font-semibold text-content">Your project requests will be kept</p>
              <p className="mt-1 text-xs leading-relaxed text-content-secondary">
                All submitted project requests and their history will remain available to PROJEXIAHUB administrators. They will not be erased when your account is deleted.
              </p>
              <p className="mt-2 text-xs leading-relaxed text-content-muted">
                A minimal security record containing your account ID and username-change timestamps may be retained to prevent the change limit from being reset. It does not contain your username or email.
              </p>
            </div>

            <form onSubmit={submitDeleteAccount} className="mt-5 space-y-4">
              <div>
                <label htmlFor="delete-account-password" className="mb-2 block text-sm font-medium text-content">Confirm your password</label>
                <input
                  id="delete-account-password"
                  type="password"
                  autoComplete="current-password"
                  value={deletePassword}
                  onChange={(event) => setDeletePassword(event.target.value)}
                  className={inputClass}
                  required
                  disabled={deletingAccount}
                />
                <p className="mt-1.5 text-xs text-content-muted">For security, Firebase will verify your password before deletion.</p>
              </div>
              <div>
                <label htmlFor="delete-account-confirmation" className="mb-2 block text-sm font-medium text-content">Type DELETE to confirm</label>
                <input
                  id="delete-account-confirmation"
                  type="text"
                  autoComplete="off"
                  value={deleteConfirmation}
                  onChange={(event) => setDeleteConfirmation(event.target.value)}
                  className={inputClass}
                  placeholder="DELETE"
                  disabled={deletingAccount}
                  required
                />
              </div>
              {deleteError && <p role="alert" className="text-sm text-state-danger">{deleteError}</p>}
              <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
                <Button type="button" variant="secondary" disabled={deletingAccount} onClick={closeDeleteDialog}>Keep my account</Button>
                <Button type="submit" variant="danger" loading={deletingAccount} disabled={deletingAccount || deleteConfirmation !== 'DELETE' || !deletePassword}>
                  {deletingAccount ? 'Deleting account…' : 'Permanently delete account'}
                </Button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
