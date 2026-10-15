import { useEffect, useState } from "react";
import { CheckCircle2, Globe2, Save } from "lucide-react";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Field } from "../../components/forms/Field";
import { TextInput } from "../../components/forms/Inputs";
import { useSiteSettings } from "../../contexts/SiteSettingsContext";
import { DEFAULT_SITE_SETTINGS, type SiteSettings } from "../../services/siteSettingsService";
import { toUserMessage } from "../../utils/errors";

function VisibilityToggle({
  id,
  checked,
  onChange,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label htmlFor={id} className="flex items-center gap-2 text-sm text-content-secondary">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded border-line accent-accent"
      />
      Show publicly
    </label>
  );
}

export function SiteIdentitySettings() {
  const { settings, saveSettings } = useSiteSettings();
  const [draft, setDraft] = useState<SiteSettings>(settings);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setDraft(settings);
  }, [settings]);

  const update = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    const name = draft.name.trim();
    if (!name) {
      setError("Enter a website name.");
      return;
    }
    if (draft.showEmail && draft.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) {
      setError("Enter a valid public contact email, or turn off its public visibility.");
      return;
    }

    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      await saveSettings({
        ...draft,
        name,
        description: draft.description.trim() || DEFAULT_SITE_SETTINGS.description,
        email: draft.email.trim(),
        phone: draft.phone.trim(),
        whatsapp: draft.whatsapp.trim(),
        address: draft.address.trim(),
      });
      setSaved(true);
    } catch (caught) {
      setError(toUserMessage(caught, "Could not save the website identity settings."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="mt-10 max-w-4xl">
      <div className="flex items-center gap-2.5">
        <Globe2 size={17} className="text-content-muted" aria-hidden="true" />
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Website identity & public contact</h2>
          <p className="mt-0.5 text-xs text-content-muted">
            Change the brand and contact details centrally. Public changes update the wordmark, footer, contact page and SEO metadata.
          </p>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-content-secondary">
        Visibility switches control whether each contact detail is shown to visitors. Hidden details remain saved and can be enabled again at any time.
      </p>

      {error && <div className="mt-5"><Alert tone="danger">{error}</Alert></div>}
      {saved && (
        <div className="mt-5">
          <Alert tone="success">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={15} aria-hidden="true" />
              Website identity settings saved.
            </span>
          </Alert>
        </div>
      )}

      <div className="mt-5 grid gap-5 rounded-2xl border border-line bg-surface p-5 sm:grid-cols-2 sm:p-6">
        <Field label="Website name" htmlFor="siteName" hint="Used in the wordmark, page titles and structured SEO data.">
          <TextInput id="siteName" value={draft.name} onChange={(event) => update("name", event.target.value)} maxLength={80} />
        </Field>

        <div className="sm:col-span-2">
          <Field label="SEO description" htmlFor="siteDescription" hint="A concise description for search engines and social previews.">
            <textarea
              id="siteDescription"
              value={draft.description}
              onChange={(event) => update("description", event.target.value)}
              rows={3}
              maxLength={320}
              className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2.5 text-sm text-content outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </Field>
        </div>

        <div className="space-y-2">
          <Field label="Public contact email" htmlFor="siteEmail">
            <TextInput id="siteEmail" type="email" value={draft.email} onChange={(event) => update("email", event.target.value)} />
          </Field>
          <VisibilityToggle id="showSiteEmail" checked={draft.showEmail} onChange={(checked) => update("showEmail", checked)} />
        </div>

        <div className="space-y-2">
          <Field label="Phone number" htmlFor="sitePhone">
            <TextInput id="sitePhone" type="tel" value={draft.phone} onChange={(event) => update("phone", event.target.value)} />
          </Field>
          <VisibilityToggle id="showSitePhone" checked={draft.showPhone} onChange={(checked) => update("showPhone", checked)} />
        </div>

        <div className="space-y-2">
          <Field label="WhatsApp number" htmlFor="siteWhatsapp" hint="Use the international format for the wa.me link, e.g. 923001234567.">
            <TextInput id="siteWhatsapp" type="tel" value={draft.whatsapp} onChange={(event) => update("whatsapp", event.target.value)} />
          </Field>
          <VisibilityToggle id="showSiteWhatsapp" checked={draft.showWhatsapp} onChange={(checked) => update("showWhatsapp", checked)} />
        </div>

        <div className="space-y-2">
          <Field label="Address / location" htmlFor="siteAddress">
            <TextInput id="siteAddress" value={draft.address} onChange={(event) => update("address", event.target.value)} maxLength={180} />
          </Field>
          <VisibilityToggle id="showSiteAddress" checked={draft.showAddress} onChange={(checked) => update("showAddress", checked)} />
        </div>

        <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
          <p className="text-xs text-content-muted">
            These are public business details. Do not enter private addresses or personal contact information you do not want published.
          </p>
          <Button onClick={() => void handleSave()} loading={saving}>
            <span className="flex items-center gap-2">
              <Save size={15} aria-hidden="true" />
              {saving ? "Saving…" : "Save website settings"}
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}
