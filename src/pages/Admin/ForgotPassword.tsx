import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { Seo } from '../../components/ui/Seo';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { Field } from '../../components/forms/Field';
import { TextInput } from '../../components/forms/Inputs';
import { Wordmark } from '../../components/layout/Wordmark';
import { authService } from '../../services/authService';
import { toUserMessage } from '../../utils/errors';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      setError('Enter your admin email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      await authService.sendPasswordReset(normalizedEmail);
      setSent(true);
    } catch (caught) {
      setError(toUserMessage(caught, 'Could not send the reset email. Check the email address and try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Seo title="Reset admin password" noIndex />
      <Container className="flex min-h-screen items-center justify-center py-16">
        <div className="w-full max-w-sm">
          <div className="flex justify-center">
            <Wordmark />
          </div>

          <h1 className="mt-8 text-center text-xl font-semibold tracking-tight">Reset admin password</h1>
          <p className="mt-2 text-center text-sm text-content-secondary">
            Enter the email address used for your MECTEC admin account.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-5 rounded-card border border-line bg-surface p-6">
            {error && <Alert tone="danger">{error}</Alert>}

            {sent ? (
              <Alert tone="success">
                If an account exists for this email, a password reset link has been sent. Check your inbox and spam folder.
              </Alert>
            ) : (
              <>
                <Field label="Admin email" htmlFor="reset-email" required>
                  <TextInput
                    id="reset-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Field>

                <Button type="submit" loading={isSubmitting} className="w-full">
                  {isSubmitting ? 'Sending…' : 'Send reset link'}
                </Button>
              </>
            )}

            <div className="text-center text-sm">
              <Link to="/admin/login" className="font-medium text-content-secondary underline-offset-4 transition-colors hover:text-content-primary hover:underline">
                Back to admin sign in
              </Link>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
