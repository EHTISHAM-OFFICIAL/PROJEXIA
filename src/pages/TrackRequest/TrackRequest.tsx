import { useEffect, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
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
import { getTrackedRequest } from '../../utils/trackedRequest';
import { useAuth } from '../../hooks/useAuth';
import { DEFAULT_REQUEST_STATUS_MESSAGES, getRequestStatusMessages, type RequestStatusMessages } from '../../services/requestStatusService';

export default function TrackRequest() {
  const [searchParams] = useSearchParams();
  const tracked = getTrackedRequest();
  const refFromUrl = searchParams.get('ref');
  const { user } = useAuth();

  const trackedMatchesUrl = !refFromUrl || refFromUrl === tracked?.requestNumber;

  const [requestNumber, setRequestNumber] = useState(refFromUrl ?? tracked?.requestNumber ?? '');
  const [email, setEmail] = useState(trackedMatchesUrl ? tracked?.email ?? '' : '');
  const [result, setResult] = useState<PublicRequestStatus | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<RequestStatusMessages>(DEFAULT_REQUEST_STATUS_MESSAGES);

  useEffect(() => {
    getRequestStatusMessages().then(setStatusMessages).catch(() => undefined);
  }, []);

  // When a signed-in customer opens the status button from their account,
  // resolve the request directly from their own account instead of depending
  // on the browser's local tracked-request storage.
  useEffect(() => {
    if (!user || !refFromUrl) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    requestService
      .getMyRequests(user.uid)
      .then((requests) => {
        if (cancelled) return;
        const request = requests.find(
          (item) => item.requestNumber === refFromUrl.trim().toUpperCase(),
        );

        if (!request) {
          setResult(null);
          setSearched(true);
          return;
        }

        setRequestNumber(request.requestNumber);
        setResult({
          requestNumber: request.requestNumber,
          status: request.status,
          projectTitle: request.project.title,
          createdAt: request.createdAt,
          updatedAt: request.updatedAt,
          customerUpdate: request.customerUpdate,
          customerUpdateAt: request.customerUpdateAt,
        });
        setSearched(true);
      })
      .catch((caught) => {
        if (!cancelled) {
          setError(toUserMessage(caught, 'Could not check that right now. Please try again.'));
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user, refFromUrl]);

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
        description="Check the status of a project request you submitted to ProjexiaHub."
        path="/track-request"
        noIndex
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
                placeholder="PROJEXIA-2026-K4T9RQ"
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
                <Badge tone={REQUEST_STATUS_TONE[result.status]}>{statusMessages[result.status].title}</Badge>
              </div>
              <h2 className="mt-3 text-lg font-semibold tracking-tight">{result.projectTitle}</h2>
              <div className="mt-5 space-y-4 border-t border-line pt-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-content-muted">What this means</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-content-secondary">{statusMessages[result.status].description}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-content-muted">Next step</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-content-secondary">{statusMessages[result.status].nextStep}</p>
                </div>
              </div>
              <div className="mt-5 border-t border-line pt-4">
                <p className="text-xs font-medium uppercase tracking-wide text-content-muted">Latest update</p>
                <p className="mt-1.5 text-sm leading-relaxed text-content-secondary">{result.customerUpdate || 'No additional update has been posted yet.'}</p>
                {result.customerUpdateAt && <p className="mt-1.5 text-xs text-content-muted">Updated {formatDate(result.customerUpdateAt)}</p>}
              </div>
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
