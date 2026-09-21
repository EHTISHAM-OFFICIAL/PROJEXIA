import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container } from '../../components/ui/Container';
import { Seo } from '../../components/ui/Seo';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { Field } from '../../components/forms/Field';
import { TextInput } from '../../components/forms/Inputs';
import { Wordmark } from '../../components/layout/Wordmark';
import { useAuth } from '../../hooks/useAuth';
import { loginSchema, type LoginFormValues } from '../../utils/validation';
import { toUserMessage } from '../../utils/errors';

export default function Login() {
  const { user, isAdmin, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  if (!loading && user && isAdmin) {
    const from = (location.state as { from?: string } | null)?.from ?? '/admin';
    return <Navigate to={from} replace />;
  }

  const onSubmit = async (values: LoginFormValues) => {
    setError(null);
    try {
      await signIn(values.email, values.password);
      navigate('/admin', { replace: true });
    } catch (caught) {
      setError(toUserMessage(caught, 'Could not sign in. Check your details and try again.'));
    }
  };

  return (
    <>
      <Seo title="Admin sign in" noIndex />
      <Container className="flex min-h-screen items-center justify-center py-16">
        <div className="w-full max-w-sm">
          <div className="flex justify-center">
            <Wordmark />
          </div>
          <h1 className="mt-8 text-center text-xl font-semibold tracking-tight">Admin sign in</h1>
          <p className="mt-2 text-center text-sm text-content-secondary">
            This area is for managing MECTEC projects and requests.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-8 flex flex-col gap-5 rounded-card border border-line bg-surface p-6"
          >
            {error && <Alert tone="danger">{error}</Alert>}

            <Field label="Email" htmlFor="email" required error={errors.email?.message}>
              <TextInput
                id="email"
                type="email"
                inputMode="email"
                autoComplete="username"
                autoFocus
                hasError={Boolean(errors.email)}
                {...register('email')}
              />
            </Field>

            <Field label="Password" htmlFor="password" required error={errors.password?.message}>
              <div className="relative">
                <TextInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  hasError={Boolean(errors.password)}
                  className="pr-11"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-content-muted transition-colors hover:text-content-secondary"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                </button>
              </div>
            </Field>

            <Button type="submit" loading={isSubmitting} className="w-full">
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </Button>

            <div className="text-center">
              <a
                href="/admin/forgot-password"
                className="text-sm font-medium text-content-secondary underline-offset-4 transition-colors hover:text-content-primary hover:underline"
              >
                Forgot or reset password?
              </a>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
