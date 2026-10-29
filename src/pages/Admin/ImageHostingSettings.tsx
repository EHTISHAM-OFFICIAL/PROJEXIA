import { useEffect, useState } from "react";
import { CheckCircle2, Cloud, ExternalLink, RefreshCw, Save, ShieldCheck } from "lucide-react";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Field } from "../../components/forms/Field";
import { TextInput } from "../../components/forms/Inputs";
import { imgbbService, type ImageProvider } from "../../services/imgbbService";
import { toUserMessage } from "../../utils/errors";
import { useToast } from "../../contexts/ToastContext";

type WorkerStatus = {
  ok: boolean;
  providers: { imgbb: boolean; freeimage: boolean };
  firebaseProjectConfigured: boolean;
};

export function ImageHostingSettings() {
  const { notify } = useToast();
  const [workerUrl, setWorkerUrl] = useState("");
  const [preferredProvider, setPreferredProvider] = useState<ImageProvider>("imgbb");
  const [maxFileSizeMb, setMaxFileSizeMb] = useState(10);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<WorkerStatus | null>(null);

  useEffect(() => {
    imgbbService.getHostingConfig()
      .then((config) => {
        setWorkerUrl(config.workerUrl);
        setPreferredProvider(config.preferredProvider);
        setMaxFileSizeMb(config.maxFileSizeMb);
      })
      .catch((caught) => setError(toUserMessage(caught, "Could not load image hosting settings.")))
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    if (!workerUrl.trim()) {
      setError("Deploy the Cloudflare Worker first, then paste its HTTPS URL here.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await imgbbService.saveHostingConfig(workerUrl, preferredProvider, maxFileSizeMb);
      setWorkerUrl(workerUrl.trim().replace(/\/+$/, ""));
      notify({
        title: "Image hosting settings saved",
        message: "New uploads will use both configured hosts with a " + maxFileSizeMb + " MB per-file limit. Provider API keys remain in Cloudflare.",
        tone: "success",
      });
    } catch (caught) {
      const message = toUserMessage(caught, "Could not save image hosting settings.");
      setError(message);
      notify({ title: "Could not save image hosting settings", message, tone: "error" });
    } finally {
      setSaving(false);
    }
  };

  const checkWorker = async () => {
    setChecking(true);
    setError(null);
    setStatus(null);
    try {
      const result = await imgbbService.checkWorker(workerUrl);
      setStatus(result);
      if (!result.ok || !result.firebaseProjectConfigured || !result.providers.imgbb || !result.providers.freeimage) {
        setError("The Worker responded, but one or more required settings/secrets are missing. Check the Cloudflare Worker variables and encrypted secrets.");
      }
    } catch (caught) {
      setError(toUserMessage(caught, "The Worker check failed."));
    } finally {
      setChecking(false);
    }
  };

  return (
    <section id="image-hosting" className="mt-10 scroll-mt-28 max-w-4xl rounded-2xl border border-line bg-surface/40 p-5 sm:p-7">
      <div className="flex items-center gap-2.5">
        <Cloud size={18} className="text-content-muted" aria-hidden="true" />
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Image hosting — ImgBB + Freeimage.host</h2>
          <p className="mt-1 text-sm text-content-secondary">Secure dual uploads with automatic image fallback.</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-line bg-surface p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck size={19} className="mt-0.5 shrink-0 text-state-success" aria-hidden="true" />
          <div className="min-w-0">
            <h3 className="text-sm font-semibold">API keys stay private</h3>
            <p className="mt-1 text-sm leading-relaxed text-content-secondary">
              Both provider keys must be saved as encrypted Cloudflare Worker secrets. They are never entered here, saved to Firestore, or bundled into the public website. This panel manages the non-secret Worker URL and preferred primary host.
            </p>
            <a href="https://developers.cloudflare.com/workers/configuration/secrets/" target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-sm text-accent underline underline-offset-2">
              Cloudflare secret setup guide <ExternalLink size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {error && <div className="mt-4"><Alert tone="danger">{error}</Alert></div>}

      {status && (
        <div className="mt-4 space-y-2">
          <Alert tone={status.ok && status.firebaseProjectConfigured && status.providers.imgbb && status.providers.freeimage ? "success" : "info"}>
            <div className="space-y-1">
              <p className="flex items-center gap-2 font-medium"><CheckCircle2 size={15} /> Worker is reachable.</p>
              <p>Firebase project ID: {status.firebaseProjectConfigured ? "configured" : "missing"}</p>
              <p>ImgBB secret: {status.providers.imgbb ? "present" : "missing"}</p>
              <p>Freeimage.host secret: {status.providers.freeimage ? "present" : "missing"}</p>
              <p className="mt-1 text-xs">This checks configuration only; a real upload verifies that the API keys are valid.</p>
            </div>
          </Alert>
        </div>
      )}

      <div className="mt-5 space-y-5">
        <Field label="Cloudflare Worker HTTPS URL" htmlFor="image-worker-url" hint="Example: https://projexiahub-image-gateway.your-account.workers.dev — paste your actual deployed URL.">
          <TextInput
            id="image-worker-url"
            type="url"
            value={workerUrl}
            onChange={(event) => { setWorkerUrl(event.target.value); setStatus(null); }}
            placeholder="https://your-worker.your-account.workers.dev"
            disabled={loading || saving}
          />
        </Field>

        <Field label="Preferred primary host" htmlFor="image-primary-provider" hint="The other successful host is stored as a fallback. If this host fails to upload, the working host becomes primary.">
          <select
            id="image-primary-provider"
            value={preferredProvider}
            onChange={(event) => setPreferredProvider(event.target.value as ImageProvider)}
            disabled={loading || saving}
            className="min-h-11 w-full rounded-lg border border-line bg-surface-raised px-3 py-2.5 text-sm text-content outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option value="imgbb">ImgBB</option>
            <option value="freeimage">Freeimage.host</option>
          </select>
        </Field>

        <Field
          label="Maximum image size per file"
          htmlFor="image-max-file-size"
          hint="Choose 1–10 MB. The Cloudflare Worker enforces this limit for admin uploads and customer request attachments."
        >
          <div className="flex items-center gap-3">
            <input
              id="image-max-file-size"
              type="number"
              min={1}
              max={10}
              step={1}
              value={maxFileSizeMb}
              onChange={(event) => {
                const value = Number(event.target.value);
                if (Number.isFinite(value)) setMaxFileSizeMb(Math.min(10, Math.max(1, Math.trunc(value))));
              }}
              disabled={loading || saving}
              className="min-h-11 w-28 rounded-lg border border-line bg-surface-raised px-3 py-2.5 text-sm text-content outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
            <span className="text-sm text-content-secondary">MB per image</span>
          </div>
          <p className="mt-1 text-xs text-content-muted">Default: 10 MB. Maximum allowed setting: 10 MB per file.</p>
        </Field>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button onClick={() => void save()} loading={saving || loading} disabled={loading || saving}>
            <span className="inline-flex items-center gap-2"><Save size={15} /> {saving ? "Saving…" : "Save image hosting settings"}</span>
          </Button>
          <Button variant="secondary" onClick={() => void checkWorker()} loading={checking} disabled={loading || checking || !workerUrl.trim()}>
            <span className="inline-flex items-center gap-2"><RefreshCw size={15} /> {checking ? "Checking…" : "Check Worker"}</span>
          </Button>
        </div>
      </div>

      <div className="mt-6 border-t border-line pt-5">
        <h3 className="text-sm font-semibold">How the setup behaves</h3>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-content-secondary">
          <li>Admin uploads are sent to ImgBB and Freeimage.host independently, subject to the configured per-file size limit.</li>
          <li>If both succeed, the preferred host is primary and the second URL is saved for fallback.</li>
          <li>If one provider fails, the image can still be saved and the editor offers a retry for the missing backup.</li>
          <li>Existing ImgBB-only images remain compatible; fallback metadata is checked only if the primary image fails to load.</li>
          <li>Customer request attachments keep their existing ImgBB-only behavior, with the key held securely by the Worker.</li>
        </ul>
      </div>
    </section>
  );
}
