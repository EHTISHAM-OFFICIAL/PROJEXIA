import { useEffect, useState } from 'react';
import { CheckCircle2, ImageIcon } from 'lucide-react';
import { Seo } from '../../components/ui/Seo';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { Field } from '../../components/forms/Field';
import { TextInput } from '../../components/forms/Inputs';
import { imgbbService } from '../../services/imgbbService';
import { toUserMessage } from '../../utils/errors';

export default function Settings() {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    imgbbService
      .getApiKeyOverride()
      .then((override) => setApiKey(override ?? ''))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      await imgbbService.saveApiKeyOverride(apiKey || null);
      setSaved(true);
    } catch (caught) {
      setError(toUserMessage(caught, 'Could not save the API key.'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return null;

  return (
    <>
      <Seo title="Settings" noIndex />

      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1.5 max-w-prose text-sm text-content-secondary">
          Site-wide configuration that doesn't belong to a single project or request.
        </p>
      </header>

      <section className="mt-8 max-w-xl">
        <div className="flex items-center gap-2.5">
          <ImageIcon size={17} className="text-content-muted" aria-hidden="true" />
          <h2 className="text-lg font-semibold tracking-tight">Image hosting — imgBB</h2>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-content-secondary">
          Every image uploaded through the admin panel and the request form goes to imgBB
          (free, no Firebase Storage / Blaze plan needed). A key from{' '}
          <a
            href="https://api.imgbb.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-2 hover:text-accent-hover"
          >
            api.imgbb.com
          </a>{' '}
          is already set as a default in this project's environment. Set one here only if you
          want to change it — for example, to rotate the key or use a different account —
          without a redeploy.
        </p>

        {error && (
          <div className="mt-5">
            <Alert tone="danger">{error}</Alert>
          </div>
        )}
        {saved && (
          <div className="mt-5">
            <Alert tone="success">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={15} aria-hidden="true" />
                Saved. New uploads will use this key immediately.
              </span>
            </Alert>
          </div>
        )}

        <div className="mt-5 flex flex-col gap-5">
          <Field
            label="imgBB API key override"
            htmlFor="imgbbKey"
            hint={
              imgbbService.hasEnvDefault()
                ? 'Leave blank to use the default key already configured for this project.'
                : 'No default key is set in this project — an override here is required for uploads to work.'
            }
          >
            <TextInput
              id="imgbbKey"
              value={apiKey}
              onChange={(event) => setApiKey(event.target.value)}
              placeholder="Paste a key from api.imgbb.com"
            />
          </Field>

          <div>
            <Button onClick={() => void handleSave()} loading={saving}>
              {saving ? 'Saving…' : 'Save'}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
