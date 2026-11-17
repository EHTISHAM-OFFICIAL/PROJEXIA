import { useEffect, useState } from "react";
import { KeyRound, Save, ShieldCheck } from "lucide-react";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Field } from "../../components/forms/Field";
import { TextInput } from "../../components/forms/Inputs";
import { useToast } from "../../contexts/ToastContext";
import {
  getUsernameAuthGatewayConfig,
  saveUsernameAuthGatewayUrl,
} from "../../services/usernameAuthService";
import { toUserMessage } from "../../utils/errors";

export function UsernameSignInSettings() {
  const { notify } = useToast();
  const [workerUrl, setWorkerUrl] = useState("");
  const [usingLegacyConfig, setUsingLegacyConfig] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUsernameAuthGatewayConfig()
      .then((config) => {
        setWorkerUrl(config.workerUrl);
        setUsingLegacyConfig(config.source === "legacy");
      })
      .catch((caught) => setError(toUserMessage(caught, "Could not load username sign-in settings.")))
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      await saveUsernameAuthGatewayUrl(workerUrl);
      setWorkerUrl(workerUrl.trim().replace(/\/+$/, ""));
      setUsingLegacyConfig(false);
      notify({
        title: "Username sign-in settings saved",
        message: "Username authentication now uses its own Worker URL, independently of image hosting.",
        tone: "success",
      });
    } catch (caught) {
      const message = toUserMessage(caught, "Could not save username sign-in settings.");
      setError(message);
      notify({ title: "Could not save username sign-in settings", message, tone: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <section id="username-sign-in" className="mt-8 scroll-mt-28 max-w-4xl rounded-2xl border border-line bg-surface/40 p-5 sm:p-7">
      <div className="flex items-center gap-2.5">
        <KeyRound size={18} className="text-content-muted" aria-hidden="true" />
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Username sign-in service</h2>
          <p className="mt-1 text-sm text-content-secondary">Dedicated Cloudflare Worker configuration for customer username authentication.</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-line bg-surface p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck size={19} className="mt-0.5 shrink-0 text-state-success" aria-hidden="true" />
          <div>
            <h3 className="text-sm font-semibold">Independent from image hosting</h3>
            <p className="mt-1 text-sm leading-relaxed text-content-secondary">
              This URL is stored separately from Image hosting. Changing or removing the image-upload URL will no longer affect username sign-in.
            </p>
          </div>
        </div>
      </div>

      {usingLegacyConfig && (
        <div className="mt-4">
          <Alert tone="info">
            Username sign-in is currently using the previous Image hosting URL for compatibility. Save this setting to create its own independent configuration.
          </Alert>
        </div>
      )}
      {error && <div className="mt-4"><Alert tone="danger">{error}</Alert></div>}

      <div className="mt-5 space-y-4">
        <Field label="Username authentication Worker HTTPS URL" htmlFor="username-auth-worker-url" hint="Use the deployed PROJEXIAHUB gateway URL that serves POST /auth/login.">
          <TextInput
            id="username-auth-worker-url"
            type="url"
            value={workerUrl}
            onChange={(event) => setWorkerUrl(event.target.value)}
            placeholder="https://your-worker.your-account.workers.dev"
            disabled={loading || saving}
          />
        </Field>
        <Button onClick={() => void save()} loading={saving} disabled={loading || saving || !workerUrl.trim()}>
          <span className="inline-flex items-center gap-2"><Save size={15} /> {saving ? "Saving…" : "Save username sign-in settings"}</span>
        </Button>
      </div>
    </section>
  );
}
