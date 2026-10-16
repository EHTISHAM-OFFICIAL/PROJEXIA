import { useEffect, useState } from "react";
import { CheckCircle2, Globe2, ImageIcon, Save, Upload } from "lucide-react";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Field } from "../../components/forms/Field";
import { TextInput } from "../../components/forms/Inputs";
import { useSiteSettings } from "../../contexts/SiteSettingsContext";
import { DEFAULT_SITE_SETTINGS, type SiteSettings } from "../../services/siteSettingsService";
import { toUserMessage } from "../../utils/errors";
import { imgbbService } from "../../services/imgbbService";

function VisibilityToggle({
  id,
  checked,
  onChange,
  label = "Show publicly",
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
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
      {label}
    </label>
  );
}

export function SiteIdentitySettings() {
  const { settings, saveSettings } = useSiteSettings();
  const [draft, setDraft] = useState<SiteSettings>(settings);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [logoUploading, setLogoUploading] = useState<"site" | "favicon" | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);

  useEffect(() => {
    setDraft(settings);
  }, [settings]);

  const update = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };

  const handleLogoUpload = async (kind: "site" | "favicon", file?: File) => {
    if (!file) return;
    setLogoError(null);
    setSaved(false);

    if (!file.type.startsWith("image/")) {
      setLogoError("Choose an image file (PNG, JPG, WebP, or SVG if supported by the image host).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setLogoError("Logo files must be 5 MB or smaller.");
      return;
    }

    setLogoUploading(kind);
    try {
      const uploaded = await imgbbService.upload(file);
      update(kind === "site" ? "siteLogoUrl" : "faviconUrl", uploaded.url);
    } catch (caught) {
      setLogoError(toUserMessage(caught, "Could not upload the logo. Check the imgBB configuration in Admin Settings."));
    } finally {
      setLogoUploading(null);
    }
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
        description: (draft.description.trim() || DEFAULT_SITE_SETTINGS.description).replace(/MECTEC|ProjexiaHub/gi, name),
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

      <div className="mt-5 rounded-2xl border border-line bg-surface p-5 sm:p-6">
        <div className="flex items-center gap-2.5">
          <ImageIcon size={17} className="text-content-muted" aria-hidden="true" />
          <div>
            <h3 className="text-base font-semibold tracking-tight">Website logos</h3>
            <p className="mt-0.5 text-xs text-content-muted">Upload the logo mark used on the website and a separate favicon for the browser tab. Save the settings below to publish your changes.</p>
          </div>
        </div>

        {logoError && <div className="mt-4"><Alert tone="danger">{logoError}</Alert></div>}

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="min-w-0 rounded-xl border border-line p-4">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-sm font-semibold">Website logo</h4>
              <VisibilityToggle id="showSiteLogo" checked={draft.showSiteLogo} onChange={(checked) => update("showSiteLogo", checked)} label="Enable logo" />
            </div>
            <div className="mt-4 flex min-h-24 items-center justify-center rounded-lg border border-dashed border-line bg-surface-raised p-4">
              {draft.showSiteLogo && draft.siteLogoUrl ? (
                <img src={draft.siteLogoUrl} alt="Website logo preview" className="max-h-20 max-w-full object-contain" />
              ) : (
                <span className="text-xs text-content-muted">{draft.showSiteLogo ? "No logo selected" : "Website logo disabled"}</span>
              )}
            </div>
            <label className="mt-4 block text-xs font-medium text-content-secondary" htmlFor="siteLogoFile">Upload website logo</label>
            <input id="siteLogoFile" type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" disabled={logoUploading !== null} onChange={(event) => { void handleLogoUpload("site", event.target.files?.[0]); event.currentTarget.value = ""; }} className="mt-2 block w-full text-xs text-content-secondary file:mr-3 file:rounded-lg file:border-0 file:bg-surface-raised file:px-3 file:py-2 file:text-content hover:file:bg-surface" />
            <p className="mt-2 text-xs text-content-muted">{logoUploading === "site" ? "Uploading logo…" : "Recommended: transparent PNG or SVG, square or near-square."}</p>
            <Field label="Logo image URL" htmlFor="siteLogoUrl" hint="You can also paste a publicly accessible image URL.">
              <TextInput id="siteLogoUrl" type="url" value={draft.siteLogoUrl} onChange={(event) => update("siteLogoUrl", event.target.value)} />
            </Field>
          </div>

          <div className="min-w-0 rounded-xl border border-line p-4">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-sm font-semibold">Browser tab favicon</h4>
              <VisibilityToggle id="showFavicon" checked={draft.showFavicon} onChange={(checked) => update("showFavicon", checked)} label="Enable favicon" />
            </div>
            <div className="mt-4 flex min-h-24 items-center justify-center rounded-lg border border-dashed border-line bg-surface-raised p-4">
              {draft.showFavicon && draft.faviconUrl ? (
                <img src={draft.faviconUrl} alt="Favicon preview" className="h-12 w-12 rounded-lg object-contain" />
              ) : (
                <span className="text-xs text-content-muted">{draft.showFavicon ? "No favicon selected" : "Custom favicon disabled"}</span>
              )}
            </div>
            <label className="mt-4 block text-xs font-medium text-content-secondary" htmlFor="faviconFile">Upload favicon</label>
            <input id="faviconFile" type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml,.ico" disabled={logoUploading !== null} onChange={(event) => { void handleLogoUpload("favicon", event.target.files?.[0]); event.currentTarget.value = ""; }} className="mt-2 block w-full text-xs text-content-secondary file:mr-3 file:rounded-lg file:border-0 file:bg-surface-raised file:px-3 file:py-2 file:text-content hover:file:bg-surface" />
            <p className="mt-2 text-xs text-content-muted">{logoUploading === "favicon" ? "Uploading favicon…" : "Recommended: square PNG or SVG, ideally 48 × 48 or larger."}</p>
            <Field label="Favicon image URL" htmlFor="faviconUrl" hint="Must be a publicly accessible image URL.">
              <TextInput id="faviconUrl" type="url" value={draft.faviconUrl} onChange={(event) => update("faviconUrl", event.target.value)} />
            </Field>
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-content-muted">Uploads use the existing imgBB integration. Browser tabs update after settings are saved and the site reloads. Google Search may keep its previously crawled favicon; its favicon guidelines generally favor an icon hosted on the same website domain.</p>
      </div>

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
