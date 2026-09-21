import { useState, type FormEvent } from 'react';
import { Eye, EyeOff, KeyRound, LogIn } from 'lucide-react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { Field } from '../../components/forms/Field';
import { TextInput } from '../../components/forms/Inputs';
import { Wordmark } from '../../components/layout/Wordmark';
import { Seo } from '../../components/ui/Seo';
import { useAuth } from '../../hooks/useAuth';
import { sendCustomerPasswordReset } from '../../services/userService';
import { toUserMessage } from '../../utils/errors';

export default function Login() {
  const { user, signInWithUsername } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [resetSubmitting, setResetSubmitting] = useState(false);

  const from = new URLSearchParams(location.search).get('next') || '/account';

  if (user) return <Navigate to="/account" replace />;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await signInWithUsername(username, password);
      navigate(from.startsWith('/') ? from : '/account', { replace: true });
    } catch (caught) {
      setError(toUserMessage(caught, 'Invalid username or password.'));
    } finally {
      setSubmitting(false);
    }
  };

  const submitReset = async (event: FormEvent) => {
    event.preventDefault();
    setResetError(null);
    setResetSent(false);
    const normalizedEmail = resetEmail.trim().toLowerCase();

    if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setResetError('Enter the email address linked to your MECTEC account.');
      return;
    }

    setResetSubmitting(true);
    try {
      await sendCustomerPasswordReset(normalizedEmail);
      setResetSent(true);
    } catch (caught) {
      setResetError(toUserMessage(caught, 'Could not send the reset email. Check the email address and try again.'));
    } finally {
      setResetSubmitting(false);
    }
  };

  return (
    <>
      <Seo title="Log in" noIndex />
      <div className="min-h-[calc(100vh-4rem)] border-b border-line">
        <Container className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-16">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <Link to="/" className="inline-flex rounded-md">
                <Wordmark />
              </Link>
              <h1 className="mt-8 text-3xl font-semibold tracking-tight">Welcome back</h1>
              <p className="mt-3 text-sm leading-relaxed text-content-secondary">
                Sign in to manage your MECTEC project requests.
              </p>
            </div>

            <div className="rounded-card border border-line bg-surface p-6 sm:p-8">
              {error && <Alert tone="danger" className="mb-6">{error}</Alert>}

              <form onSubmit={submit} className="space-y-5">
                <Field label="Username" htmlFor="username" required>
                  <TextInput
                    id="username"
                    autoComplete="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    autoFocus
                  />
                </Field>

                <Field label="Password" htmlFor="password" required>
                  <div className="relative">
                    <TextInput
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-content-muted hover:text-content"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </Field>

                <Button type="submit" size="lg" loading={submitting} className="w-full">
                  <span className="flex items-center justify-center gap-2">
                    <LogIn size={17} aria-hidden="true" />
                    {submitting ? 'Signing in…' : 'Log in'}
                  </span>
                </Button>
              </form>

              <div className="mt-5 text-center">
              <button
                type="button"
                onClick={() => {
                  setShowReset((open) => !open);
                  setResetError(null);
                  setResetSent(false);
                }}
                className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover"
              >
                <KeyRound size={15} aria-hidden="true" />
                Forgot your password?
              </button>
            </div>

            {showReset && (
              <form onSubmit={submitReset} className="mt-5 rounded-lg border border-line bg-surface-raised p-4">
                <h2 className="text-sm font-semibold">Reset your password</h2>
                <p className="mt-1 text-xs leading-relaxed text-content-secondary">
                  Enter the account email you used when registering. You will still sign in with your username after resetting the password.
                </p>
                {resetError && <Alert tone="danger" className="mt-4">{resetError}</Alert>}
                {resetSent ? (
                  <Alert tone="success" className="mt-4">
                    Reset email sent. Check your inbox — and check your spam or junk folder too. The reset link will let you create a new password.
                  </Alert>
                ) : (
                  <div className="mt-4 space-y-3">
                    <Field label="Account email" htmlFor="reset-email" required>
                      <TextInput
                        id="reset-email"
                        type="email"
                        autoComplete="email"
                        value={resetEmail}
                        onChange={(event) => setResetEmail(event.target.value)}
                      />
                    </Field>
                    <Button type="submit" variant="secondary" loading={resetSubmitting} className="w-full">
                      {resetSubmitting ? 'Sending reset email…' : 'Send reset email'}
                    </Button>
                  </div>
                )}
              </form>
            )}

            <div className="mt-6 border-t border-line pt-6 text-center text-sm text-content-secondary">
                Don't have an account?{' '}
                <Link to={`/register?next=${encodeURIComponent(from)}`} className="font-medium text-accent hover:text-accent-hover">
                  Create one
                </Link>
              </div>
            </div>

            <p className="mt-5 text-center text-xs leading-relaxed text-content-muted">
              Your username and password are used to sign in. Your account email is used for password recovery.
            </p>
          </div>
        </Container>
      </div>
    </>
  );
}
