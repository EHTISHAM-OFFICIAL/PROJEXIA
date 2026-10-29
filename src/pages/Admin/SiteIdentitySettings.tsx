import { useEffect, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  DollarSign,
  Eye,
  Globe2,
  ImageIcon,
  Save,
  Plus,
  Trash2,
  Share2,
} from "lucide-react";
import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Field } from "../../components/forms/Field";
import { TextInput } from "../../components/forms/Inputs";
import { ImageProcessingDialog } from "../../components/forms/ImageProcessingDialog";
import { Image } from "../../components/ui/Image";
import { useSiteSettings } from "../../contexts/SiteSettingsContext";
import {
  DEFAULT_SITE_SETTINGS,
  type SiteSettings,
} from "../../services/siteSettingsService";
import { toUserMessage } from "../../utils/errors";
import { imgbbService, type UploadedImage } from "../../services/imgbbService";
import { useToast } from "../../contexts/ToastContext";

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
    <label
      htmlFor={id}
      className="flex items-center gap-2 text-sm text-content-secondary"
    >
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
  const { notify } = useToast();
  const [draft, setDraft] = useState<SiteSettings>(settings);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [logoUploading, setLogoUploading] = useState<"site" | "favicon" | null>(
    null,
  );
  const [logoError, setLogoError] = useState<string | null>(null);
  const [partialBackup, setPartialBackup] = useState<{ file: File; upload: UploadedImage } | null>(null);
  const [retryingBackup, setRetryingBackup] = useState(false);
  const [pendingImage, setPendingImage] = useState<{ kind: "site" | "favicon"; file: File } | null>(null);

  useEffect(() => {
    setDraft(settings);
  }, [settings]);

  const update = <K extends keyof SiteSettings>(
    key: K,
    value: SiteSettings[K],
  ) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };

  const handleLogoUpload = (kind: "site" | "favicon", file?: File) => {
    if (!file) return;
    setLogoError(null);
    setSaved(false);
    if (!file.type.startsWith("image/")) {
      setLogoError("Choose a PNG, JPG, or WebP image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setLogoError("Logo files must be 5 MB or smaller.");
      return;
    }
    setPendingImage({ kind, file });
  };

  const uploadPreparedLogo = async (file: File) => {
    if (!pendingImage) return;
    if (!file.type.startsWith("image/")) throw new Error("Choose an image file.");
    if (file.size > 5 * 1024 * 1024) throw new Error("Prepared logo files must be 5 MB or smaller. Try a smaller crop or keep the original.");
    const kind = pendingImage.kind;
    setLogoUploading(kind);
    setLogoError(null);
    try {
      const uploaded = await imgbbService.upload(file);
      update(kind === "site" ? "siteLogoUrl" : "faviconUrl", uploaded.url);
      setPartialBackup(uploaded.missingProvider ? { file, upload: uploaded } : null);
      if (uploaded.fallbackSaved === false) setLogoError("Both hosts received the image, but fallback metadata could not be saved. Check Firestore rules and upload again.");
      setPendingImage(null);
    } catch (caught) {
      const message = toUserMessage(caught, "Could not upload the image. Check the imgBB configuration in Admin Settings.");
      setLogoError(message);
      throw new Error(message);
    } finally {
      setLogoUploading(null);
    }
  };

  const retryLogoBackup = async () => {
    if (!partialBackup?.upload.missingProvider) return;
    setRetryingBackup(true);
    setLogoError(null);
    try {
      const result = await imgbbService.retryMissingProvider(
        partialBackup.file,
        partialBackup.upload.missingProvider,
        partialBackup.upload.url,
        partialBackup.upload.primaryProvider,
        { id: partialBackup.upload.primaryId, idEncoded: partialBackup.upload.primaryIdEncoded },
      );
      if (result.fallbackSaved === false) {
        setLogoError("The backup upload succeeded, but fallback metadata could not be saved. Check Firestore rules.");
      } else {
        setPartialBackup(null);
        notify({ title: "Image backup completed", message: "The missing provider now has a copy of this image.", tone: "success" });
      }
    } catch (caught) {
      setLogoError(toUserMessage(caught, "Could not retry the missing image backup."));
    } finally {
      setRetryingBackup(false);
    }
  };

  const handleSave = async () => {
    const name = draft.name.trim();
    if (!name) {
      setError("Enter a website name.");
      return;
    }
    if (
      draft.showEmail &&
      draft.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())
    ) {
      setError(
        "Enter a valid public contact email, or turn off its public visibility.",
      );
      return;
    }

    const socialLinks = draft.socialLinks.map((link) => ({ ...link, label: link.label.trim(), url: link.url.trim() }));
    if (socialLinks.some((link) => link.url && (!link.label || !/^https?:\/\//i.test(link.url)))) {
      setError("Each social link needs a label and a full URL starting with https:// or http://.");
      return;
    }

    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      await saveSettings({
        ...draft,
        socialLinks: socialLinks.filter((link) => link.label && link.url),
        name,
        description: (
          draft.description.trim() || DEFAULT_SITE_SETTINGS.description
        ).replace(/MECTEC|ProjexiaHub/gi, name),
        email: draft.email.trim(),
        phone: draft.phone.trim(),
        whatsapp: draft.whatsapp.trim(),
        address: draft.address.trim(),
      });
      setSaved(true);
      notify({ title: "Website settings saved", message: "Brand identity, public contact details, social links and project card display settings are updated.", tone: "success" });
    } catch (caught) {
      const message = toUserMessage(caught, "Could not save the website identity settings.");
      setError(message);
      notify({ title: "Could not save website settings", message, tone: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <section id="identity-settings" className="mt-8 scroll-mt-28 max-w-6xl">
      <div className="flex items-center gap-2.5">
        <Globe2 size={17} className="text-content-muted" aria-hidden="true" />
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            Website identity & public contact
          </h2>
          <p className="mt-0.5 text-xs text-content-muted">
            Change the brand and contact details centrally. Public changes
            update the wordmark, footer, contact page and SEO metadata.
          </p>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-content-secondary">
        Visibility switches control whether each contact detail is shown to
        visitors. Hidden details remain saved and can be enabled again at any
        time.
      </p>


      <div className="mt-5 rounded-2xl border border-line bg-surface p-5 sm:p-6">
        <div className="flex items-center gap-2.5">
          <Share2 size={17} className="text-content-muted" aria-hidden="true" />
          <div>
            <h3 className="text-base font-semibold tracking-tight">Social media & external links</h3>
            <p className="mt-0.5 text-xs leading-relaxed text-content-muted">Manage the profiles visitors can open from the footer and Contact page. Only enabled links with a label and URL are shown.</p>
          </div>
        </div>
        <div className="mt-5 space-y-3">
          {draft.socialLinks.map((link, index) => (
            <div key={link.id} className="grid gap-3 rounded-xl border border-line p-4 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)_auto_auto] sm:items-end">
              <Field label="Platform / label" htmlFor={`social-label-${link.id}`}>
                <TextInput id={`social-label-${link.id}`} value={link.label} placeholder="Instagram" onChange={(event) => update("socialLinks", draft.socialLinks.map((item, i) => i === index ? { ...item, label: event.target.value } : item))} maxLength={40} />
              </Field>
              <Field label="Profile URL" htmlFor={`social-url-${link.id}`}>
                <TextInput id={`social-url-${link.id}`} type="url" value={link.url} placeholder="https://instagram.com/yourprofile" onChange={(event) => update("socialLinks", draft.socialLinks.map((item, i) => i === index ? { ...item, url: event.target.value } : item))} />
              </Field>
              <VisibilityToggle id={`social-enabled-${link.id}`} checked={link.enabled} onChange={(checked) => update("socialLinks", draft.socialLinks.map((item, i) => i === index ? { ...item, enabled: checked } : item))} label="Show" />
              <button type="button" aria-label={`Remove ${link.label || "social link"}`} onClick={() => update("socialLinks", draft.socialLinks.filter((item) => item.id !== link.id))} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-line px-3 text-sm text-content-secondary transition-colors hover:border-state-danger/40 hover:text-state-danger">
                <Trash2 size={15} aria-hidden="true" /><span className="sm:hidden">Remove</span>
              </button>
            </div>
          ))}
          {draft.socialLinks.length === 0 && <p className="rounded-xl border border-dashed border-line px-4 py-6 text-center text-sm text-content-muted">No social links added yet. Add the profiles you want visitors to find.</p>}
          <div className="flex flex-wrap gap-2">
            {["Instagram", "Facebook", "LinkedIn", "YouTube", "GitHub", "TikTok", "X", "Pinterest", "Discord", "Custom link"].map((label) => (
              <button key={label} type="button" onClick={() => update("socialLinks", [...draft.socialLinks, { id: `social-${Date.now()}-${draft.socialLinks.length}`, label: label === "Custom link" ? "" : label, url: "", enabled: true }])} className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-3 text-xs font-medium text-content-secondary transition-colors hover:border-line-strong hover:text-content">
                <Plus size={14} aria-hidden="true" />{label}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-4 text-xs text-content-muted">Add a profile, paste its full public URL, and save website settings below. Links open in a new tab. Disable a profile to keep it saved without displaying it publicly.</p>
      </div>

      <div className="mt-5 rounded-2xl border border-line bg-surface p-5 sm:p-6">
        <div className="flex items-center gap-2.5">
          <ImageIcon
            size={17}
            className="text-content-muted"
            aria-hidden="true"
          />
          <div>
            <h3 className="text-base font-semibold tracking-tight">
              Website logos
            </h3>
            <p className="mt-0.5 text-xs text-content-muted">
              Upload the logo mark used on the website and a separate favicon
              for the browser tab. Save the settings below to publish your
              changes.
            </p>
          </div>
        </div>

        {logoError && (
          <div className="mt-4">
            <Alert tone="danger">{logoError}</Alert>
          </div>
        )}
        {partialBackup?.upload.missingProvider && (
          <div className="mt-4 rounded-xl border border-line bg-surface p-4">
            <p className="text-sm text-content-secondary">
              The image was uploaded to {partialBackup.upload.primaryProvider === "imgbb" ? "ImgBB" : "Freeimage.host"}, but {partialBackup.upload.missingProvider === "imgbb" ? "ImgBB" : "Freeimage.host"} did not finish. You can retry only the missing backup without uploading to the working host again.
            </p>
            <div className="mt-3">
              <Button variant="secondary" onClick={() => void retryLogoBackup()} loading={retryingBackup} disabled={retryingBackup}>
                {retryingBackup ? "Retrying backup…" : "Retry missing backup"}
              </Button>
            </div>
          </div>
        )}

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="min-w-0 rounded-xl border border-line p-4">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-sm font-semibold">Website logo</h4>
              <VisibilityToggle
                id="showSiteLogo"
                checked={draft.showSiteLogo}
                onChange={(checked) => update("showSiteLogo", checked)}
                label="Enable logo"
              />
            </div>
            <div className="mt-4 flex min-h-24 items-center justify-center rounded-lg border border-dashed border-line bg-surface-raised p-4">
              {draft.showSiteLogo && draft.siteLogoUrl ? (
                <Image
                  src={draft.siteLogoUrl}
                  alt="Website logo preview"
                  className="max-h-20 max-w-full object-contain"
                />
              ) : (
                <span className="text-xs text-content-muted">
                  {draft.showSiteLogo
                    ? "No logo selected"
                    : "Website logo disabled"}
                </span>
              )}
            </div>
            <label
              className="mt-4 block text-xs font-medium text-content-secondary"
              htmlFor="siteLogoFile"
            >
              Upload website logo
            </label>
            <input id="siteLogoFile" type="file" accept="image/png,image/jpeg,image/webp" disabled={logoUploading !== null} onChange={(event) => { handleLogoUpload("site", event.target.files?.[0]); event.currentTarget.value = ""; }} className="mt-2 block w-full text-xs text-content-secondary file:mr-3 file:rounded-lg file:border-0 file:bg-surface-raised file:px-3 file:py-2 file:text-content hover:file:bg-surface" />
            <p className="mt-2 text-xs text-content-muted">
              {logoUploading === "site"
                ? "Uploading logo…"
                : "Recommended: transparent PNG or WebP, square or near-square."}
            </p>
            <Field
              label="Logo image URL"
              htmlFor="siteLogoUrl"
              hint="You can also paste a publicly accessible image URL."
            >
              <TextInput
                id="siteLogoUrl"
                type="url"
                value={draft.siteLogoUrl}
                onChange={(event) => update("siteLogoUrl", event.target.value)}
              />
            </Field>
          </div>

          <div className="min-w-0 rounded-xl border border-line p-4">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-sm font-semibold">Browser tab favicon</h4>
              <VisibilityToggle
                id="showFavicon"
                checked={draft.showFavicon}
                onChange={(checked) => update("showFavicon", checked)}
                label="Enable favicon"
              />
            </div>
            <div className="mt-4 flex min-h-24 items-center justify-center rounded-lg border border-dashed border-line bg-surface-raised p-4">
              {draft.showFavicon && draft.faviconUrl ? (
                <Image
                  src={draft.faviconUrl}
                  alt="Favicon preview"
                  className="h-12 w-12 rounded-lg object-contain"
                />
              ) : (
                <span className="text-xs text-content-muted">
                  {draft.showFavicon
                    ? "No favicon selected"
                    : "Custom favicon disabled"}
                </span>
              )}
            </div>
            <label
              className="mt-4 block text-xs font-medium text-content-secondary"
              htmlFor="faviconFile"
            >
              Upload favicon
            </label>
            <input id="faviconFile" type="file" accept="image/png,image/jpeg,image/webp" disabled={logoUploading !== null} onChange={(event) => { handleLogoUpload("favicon", event.target.files?.[0]); event.currentTarget.value = ""; }} className="mt-2 block w-full text-xs text-content-secondary file:mr-3 file:rounded-lg file:border-0 file:bg-surface-raised file:px-3 file:py-2 file:text-content hover:file:bg-surface" />
            <p className="mt-2 text-xs text-content-muted">
              {logoUploading === "favicon"
                ? "Uploading favicon…"
                : "Recommended: square PNG or SVG, ideally 48 × 48 or larger."}
            </p>
            <Field
              label="Favicon image URL"
              htmlFor="faviconUrl"
              hint="Must be a publicly accessible image URL."
            >
              <TextInput
                id="faviconUrl"
                type="url"
                value={draft.faviconUrl}
                onChange={(event) => update("faviconUrl", event.target.value)}
              />
            </Field>
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-content-muted">
          Uploads use the existing imgBB integration. Browser tabs update after
          settings are saved and the site reloads. Google Search may keep its
          previously crawled favicon; its favicon guidelines generally favor an
          icon hosted on the same website domain.
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-line bg-surface p-5 sm:p-6">
        <div className="flex items-start gap-2.5">
          <Eye
            size={17}
            className="mt-0.5 shrink-0 text-content-muted"
            aria-hidden="true"
          />
          <div>
            <h3 className="text-base font-semibold tracking-tight">
              Project card display
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-content-secondary">
              Choose which extra details appear on project cards across the
              public project library and featured project sections. These
              switches do not change the project data itself.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="flex min-w-0 items-start justify-between gap-4 rounded-xl border border-line p-4">
            <div className="flex min-w-0 items-start gap-3">
              <CalendarDays
                size={17}
                className="mt-0.5 shrink-0 text-content-muted"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-medium text-content">
                  Completion / date label
                </p>
                <p className="mt-1 text-xs leading-relaxed text-content-muted">
                  Show the completion date, falling back to the project creation
                  date when no completion date is set.
                </p>
              </div>
            </div>
            <VisibilityToggle
              id="showProjectCardDate"
              checked={draft.showProjectCardDate}
              onChange={(checked) => update("showProjectCardDate", checked)}
              label="Show"
            />
          </div>

          <div className="flex min-w-0 items-start justify-between gap-4 rounded-xl border border-line p-4">
            <div className="flex min-w-0 items-start gap-3">
              <Eye
                size={17}
                className="mt-0.5 shrink-0 text-content-muted"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-medium text-content">
                  Project view count
                </p>
                <p className="mt-1 text-xs leading-relaxed text-content-muted">
                  Show the eye icon and view count when a project has at least
                  one recorded view.
                </p>
              </div>
            </div>
            <VisibilityToggle
              id="showProjectCardViews"
              checked={draft.showProjectCardViews}
              onChange={(checked) => update("showProjectCardViews", checked)}
              label="Show"
            />
          </div>

          <div className="flex min-w-0 items-start justify-between gap-4 rounded-xl border border-line p-4">
            <div className="flex min-w-0 items-start gap-3">
              <DollarSign
                size={17}
                className="mt-0.5 shrink-0 text-content-muted"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-medium text-content">
                  Project price
                </p>
                <p className="mt-1 text-xs leading-relaxed text-content-muted">
                  Show or hide the saved estimated price on project cards. This
                  does not change the price or hide it from the project detail page.
                </p>
              </div>
            </div>
            <VisibilityToggle
              id="showProjectCardPrice"
              checked={draft.showProjectCardPrice}
              onChange={(checked) => update("showProjectCardPrice", checked)}
              label="Show"
            />
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-line p-4">
          <Field
            label="Project card image ratio"
            htmlFor="projectCardImageRatio"
            hint="Controls the thumbnail frame on public project cards. The full image stays visible; wider or taller images may leave empty space inside the frame."
          >
            <select
              id="projectCardImageRatio"
              value={draft.projectCardImageRatio}
              onChange={(event) => update("projectCardImageRatio", event.target.value as SiteSettings["projectCardImageRatio"])}
              className="w-full rounded-lg border border-line bg-surface-raised px-3 py-2.5 text-sm text-content outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
            >
              <option value="16/10">16:10 — Standard project card (default)</option>
              <option value="1/1">1:1 — Square</option>
              <option value="4/3">4:3 — Classic landscape</option>
              <option value="3/2">3:2 — Photo landscape</option>
              <option value="16/9">16:9 — Widescreen</option>
            </select>
          </Field>
        </div>
        <p className="mt-4 text-xs text-content-muted">
          Save website settings below to publish these changes. Date, view-count and price visibility stay enabled by default.
        </p>
      </div>

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
              Website identity settings saved.
            </span>
          </Alert>
        </div>
      )}

      <div className="mt-5 grid gap-5 rounded-2xl border border-line bg-surface p-5 sm:grid-cols-2 sm:p-6">
        <Field
          label="Website name"
          htmlFor="siteName"
          hint="Used in the wordmark, page titles and structured SEO data."
        >
          <TextInput
            id="siteName"
            value={draft.name}
            onChange={(event) => update("name", event.target.value)}
            maxLength={80}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field
            label="SEO description"
            htmlFor="siteDescription"
            hint="A concise description for search engines and social previews."
          >
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
            <TextInput
              id="siteEmail"
              type="email"
              value={draft.email}
              onChange={(event) => update("email", event.target.value)}
            />
          </Field>
          <VisibilityToggle
            id="showSiteEmail"
            checked={draft.showEmail}
            onChange={(checked) => update("showEmail", checked)}
          />
        </div>

        <div className="space-y-2">
          <Field label="Phone number" htmlFor="sitePhone">
            <TextInput
              id="sitePhone"
              type="tel"
              value={draft.phone}
              onChange={(event) => update("phone", event.target.value)}
            />
          </Field>
          <VisibilityToggle
            id="showSitePhone"
            checked={draft.showPhone}
            onChange={(checked) => update("showPhone", checked)}
          />
        </div>

        <div className="space-y-2">
          <Field
            label="WhatsApp number"
            htmlFor="siteWhatsapp"
            hint="Use the international format for the wa.me link, e.g. 923001234567."
          >
            <TextInput
              id="siteWhatsapp"
              type="tel"
              value={draft.whatsapp}
              onChange={(event) => update("whatsapp", event.target.value)}
            />
          </Field>
          <VisibilityToggle
            id="showSiteWhatsapp"
            checked={draft.showWhatsapp}
            onChange={(checked) => update("showWhatsapp", checked)}
          />
        </div>

        <div className="space-y-2">
          <Field label="Address / location" htmlFor="siteAddress">
            <TextInput
              id="siteAddress"
              value={draft.address}
              onChange={(event) => update("address", event.target.value)}
              maxLength={180}
            />
          </Field>
          <VisibilityToggle
            id="showSiteAddress"
            checked={draft.showAddress}
            onChange={(checked) => update("showAddress", checked)}
          />
        </div>

        <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
          <p className="text-xs text-content-muted">
            These are public business details. Do not enter private addresses or
            personal contact information you do not want published.
          </p>
          <Button onClick={() => void handleSave()} loading={saving}>
            <span className="flex items-center gap-2">
              <Save size={15} aria-hidden="true" />
              {saving ? "Saving…" : "Save website settings"}
            </span>
          </Button>
        </div>
      </div>
      {pendingImage && <ImageProcessingDialog key={pendingImage.kind + pendingImage.file.name + pendingImage.file.lastModified} file={pendingImage.file} title={pendingImage.kind === "site" ? "Prepare website logo" : "Prepare favicon"} onCancel={() => setPendingImage(null)} onUse={uploadPreparedLogo} />}
    </section>
  );
}
