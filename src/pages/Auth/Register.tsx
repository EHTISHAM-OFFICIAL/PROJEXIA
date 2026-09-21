import { useState, type FormEvent } from 'react';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { Field } from '../../components/forms/Field';
import { TextInput } from '../../components/forms/Inputs';
import { Wordmark } from '../../components/layout/Wordmark';
import { Seo } from '../../components/ui/Seo';
import { useAuth } from '../../hooks/useAuth';
import { registerUser, validateUsername } from '../../services/userService';
import { toUserMessage } from '../../utils/errors';

export default function Register() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [accountEmail, setAccountEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const from = new URLSearchParams(location.search).get('next') || '/account';

  if (user) return <Navigate to="/account" replace />;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    const usernameError = validateUsername(username);
    if (usernameError) {
      setError(usernameError);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmation) {
      setError('Passwords do not match.');
      return;
    }

    if (!accountEmail.trim()) {
      setError('Email is required because it is used to reset your password if you forget it.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(accountEmail.trim())) {
      setError('Enter a valid email address.');
      return;
    }

    setSubmitting(true);

    try {
      await registerUser(username, password, accountEmail);
      navigate(from.startsWith('/') ? from : '/account', { replace: true });
    } catch (caught) {
      setError(toUserMessage(caught, 'Could not create your account.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Seo title="Create account" noIndex />
      <div className="min-h-[calc(100vh-4rem)] border-b border-line">
        <Container className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-16">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <Link to="/" className="inline-flex rounded-md">
                <Wordmark />
              </Link>
              <h1 className="mt-8 text-3xl font-semibold tracking-tight">Create your account</h1>
              <p className="mt-3 text-sm leading-relaxed text-content-secondary">
                One account for your MECTEC project requests.
              </p>
            </div>

            <div className="rounded-card border border-line bg-surface p-6 sm:p-8">
              {error && <Alert tone="danger" className="mb-6">{error}</Alert>}

              <form onSubmit={submit} className="space-y-5">
                <Field label="Username" htmlFor="username" required hint="3–30 characters: letters, numbers, hyphens or underscores.">
                  <TextInput
                    id="username"
                    autoComplete="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    autoFocus
                  />
                </Field>

                <Field label="Password" htmlFor="password" required hint="Use at least 8 characters. A longer, unique password is recommended.">
                  <div className="relative">
                    <TextInput
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
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

                <Field label="Confirm password" htmlFor="confirmation" required>
                  <div className="relative">
                    <TextInput
                      id="confirmation"
                      type={showConfirmation ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={confirmation}
                      onChange={(event) => setConfirmation(event.target.value)}
                      className="pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmation((visible) => !visible)}
                      className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-content-muted hover:text-content"
                      aria-label={showConfirmation ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmation ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </Field>

                <Field label="Password" htmlFor="password" required hint="Use at least 8 characters. A longer, unique password is recommended.">
                  <div className="relative">
                    <TextInput
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
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

                <Field
                  label="Account email"
                  htmlFor="accountEmail"
                  required
                  hint="Required. This email is used for password recovery and account security."
                >
                  <TextInput
                    id="accountEmail"
                    type="email"
                    autoComplete="email"
                    value={accountEmail}
                    onChange={(event) => setAccountEmail(event.target.value)}
                    placeholder="you@example.com"
                  />
                </Field>

                <Field label="Confirm password" htmlFor="confirmation" required>
                  <div className="relative">
                    <TextInput
                      id="confirmation"
                      type={showConfirmation ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={confirmation}
                      onChange={(event) => setConfirmation(event.target.value)}
                      className="pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmation((visible) => !visible)}
                      className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-content-muted hover:text-content"
                      aria-label={showConfirmation ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmation ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </Field>

                <Button type="submit" size="lg" loading={submitting} className="w-full">
                  <span className="flex items-center justify-center gap-2">
                    <UserPlus size={17} aria-hidden="true" />
                    {submitting ? 'Creating account…' : 'Create account'}
                  </span>
                </Button>
              </form>

              <div className="mt-6 border-t border-line pt-6 text-center text-sm text-content-secondary">
                Already have an account?{' '}
                <Link to={`/login?next=${encodeURIComponent(from)}`} className="font-medium text-accent hover:text-accent-hover">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
