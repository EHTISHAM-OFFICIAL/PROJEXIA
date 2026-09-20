import { useState, type FormEvent } from 'react';
import { Search } from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Seo } from '../../components/ui/Seo';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { Badge } from '../../components/ui/Badge';
import { Field } from '../../components/forms/Field';
import { TextInput } from '../../components/forms/Inputs';
import { requestService, type PublicRequestStatus } from '../../services/requestService';
import { REQUEST_STATUS_TONE } from '../../constants/requestOptions';
import { formatDate } from '../../utils/formatting';
import { toUserMessage } from '../../utils/errors';

const STATUS_EXPLANATION: Record<string, string> = {
  new: "Submitted and waiting for review — you'll hear back soon.",
  reviewing: 'Being looked at now.',
  quoted: "A quote has been prepared — check your email or WhatsApp.",
  accepted: 'Accepted and about to start.',
  'in-progress': 'Work is underway.',
  completed: 'Finished.',
  rejected: "This request wasn't taken forward.",
  cancelled: 'Cancelled.',
};

export default function TrackRequest() {
  const [requestNumber, setRequestNumber] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<PublicRequestStatus | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSearched(false);
    try {
      const found = await requestService.lookupStatus(requestNumber, email);
      setResult(found);
      setSearched(true);
    } catch (caught) {
      setError(toUserMessage(caught, 'Could not check that right now. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo
        title="Track a request"
        description="Check the status of a project request you submitted to MECTEC."
        path="/track-request"
      />

      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-md">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Track a request</h1>
          <p className="mt-4 text-base leading-relaxed text-content-secondary">
            Enter the reference number from your confirmation and the email you submitted with.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-5">
            {error && <Alert tone="danger">{error}</Alert>}

            <Field label="Reference number" htmlFor="requestNumber" required>
              <TextInput
                id="requestNumber"
                value={requestNumber}
                onChange={(event) => setRequestNumber(event.target.value)}
                placeholder="MECTEC-2026-K4T9RQ"
                className="font-mono uppercase"
                required
              />
            </Field>

            <Field label="Email" htmlFor="email" required>
              <TextInput
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </Field>

            <Button type="submit" loading={loading}>
              <Search size={16} aria-hidden="true" />
              {loading ? 'Checking…' : 'Check status'}
            </Button>
          </form>

          {searched && !result && (
            <div className="mt-8">
              <Alert tone="danger">
                No matching request found. Double-check the reference number and the email you
                used when submitting it.
              </Alert>
            </div>
          )}

          {result && (
            <div className="card mt-8 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-sm text-content-secondary">{result.requestNumber}</p>
                <Badge tone={REQUEST_STATUS_TONE[result.status]}>{result.status}</Badge>
              </div>
              <h2 className="mt-3 text-lg font-semibold tracking-tight">{result.projectTitle}</h2>
              <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                {STATUS_EXPLANATION[result.status]}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-4 text-sm">
                <div>
                  <p className="text-xs text-content-muted">Submitted</p>
                  <p className="mt-0.5 text-content">{formatDate(result.createdAt)}</p>
                </div>
                <div>
                  <p className="text-xs text-content-muted">Last updated</p>
                  <p className="mt-0.5 text-content">{formatDate(result.updatedAt)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
