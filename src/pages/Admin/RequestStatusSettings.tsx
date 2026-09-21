import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { Seo } from '../../components/ui/Seo';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { Field } from '../../components/forms/Field';
import { TextInput, TextArea } from '../../components/forms/Inputs';
import { DEFAULT_REQUEST_STATUS_MESSAGES, getRequestStatusMessages, requestStatusService, type RequestStatusMessages } from '../../services/requestStatusService';
import type { RequestStatus } from '../../types/projectRequest';
import { toUserMessage } from '../../utils/errors';
import { REQUEST_STATUSES } from '../../constants/requestOptions';

const STATUS_ORDER: RequestStatus[] = REQUEST_STATUSES.map((option) => option.value as RequestStatus);

export default function RequestStatusSettings() {
  const [messages, setMessages] = useState<RequestStatusMessages>(DEFAULT_REQUEST_STATUS_MESSAGES);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getRequestStatusMessages()
      .then(setMessages)
      .catch((caught) => setError(toUserMessage(caught, 'Could not load request status messages.')))
      .finally(() => setLoading(false));
  }, []);

  const update = (status: RequestStatus, field: 'title' | 'description' | 'nextStep', value: string) => {
    setMessages((current) => ({ ...current, [status]: { ...current[status], [field]: value } }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true); setSaved(false); setError(null);
    try { await requestStatusService.saveRequestStatusMessages(messages); setSaved(true); }
    catch (caught) { setError(toUserMessage(caught, 'Could not save request status messages.')); }
    finally { setSaving(false); }
  };

  if (loading) return null;

  return (
    <>
      <Seo title="Request Status" noIndex />
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Request Status</h1>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-content-secondary">
          Manage the customer-facing information shown on the Track Request page for each project status.
        </p>
      </header>

      <div className="mt-6">
        {error && <Alert tone="danger">{error}</Alert>}
        {saved && <Alert tone="success">Request status messages saved.</Alert>}
      </div>

      <div className="mt-8 flex flex-col gap-6">
        {STATUS_ORDER.map((status) => {
          const message = messages[status];
          const label = REQUEST_STATUSES.find((option) => option.value === status)?.label ?? status;
          return (
            <section key={status} className="card p-5 sm:p-6">
              <div className="mb-5">
                <h2 className="text-lg font-semibold tracking-tight">{label}</h2>
                <p className="mt-1 text-xs text-content-muted">
                  Customers see this information when their request is <span className="font-mono">{status}</span>.
                </p>
              </div>
              <div className="grid gap-5">
                <Field label="Display title" htmlFor={`status-title-${status}`} required>
                  <TextInput id={`status-title-${status}`} value={message.title} onChange={(event) => update(status, 'title', event.target.value)} maxLength={120} />
                </Field>
                <Field label="Description" htmlFor={`status-description-${status}`} required>
                  <TextArea id={`status-description-${status}`} rows={3} value={message.description} onChange={(event) => update(status, 'description', event.target.value)} maxLength={500} />
                </Field>
                <Field label="Next step" htmlFor={`status-next-step-${status}`} required>
                  <TextArea id={`status-next-step-${status}`} rows={3} value={message.nextStep} onChange={(event) => update(status, 'nextStep', event.target.value)} maxLength={500} />
                </Field>
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={() => void handleSave()} loading={saving}>
          <Save size={16} aria-hidden="true" />
          {saving ? 'Saving…' : 'Save status messages'}
        </Button>
      </div>
    </>
  );
}
