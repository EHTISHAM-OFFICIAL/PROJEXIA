import { useEffect, useState } from "react";
import {
  CheckCircle2,
  ImageIcon,
  Mail,
  Palette,
  RotateCcw,
  Save,
  Sun,
  Moon,
  Monitor,
  Clock3,
  ShieldCheck,
} from "lucide-react";

import { Seo } from "../../components/ui/Seo";
import { Button } from "../../components/ui/Button";
import { Alert } from "../../components/ui/Alert";
import { Badge } from "../../components/ui/Badge";
import { Field } from "../../components/forms/Field";
import { TextInput } from "../../components/forms/Inputs";

import { imgbbService } from "../../services/imgbbService";
import { emailNotificationService } from "../../services/emailNotificationService";
import { themeService, DEFAULT_THEME } from "../../services/themeService";
import { useTheme } from "../../hooks/useTheme";
import { requestSettingsService, DEFAULT_CUSTOMER_REQUEST_EDIT_WINDOW_HOURS, MIN_CUSTOMER_REQUEST_EDIT_WINDOW_HOURS, MAX_CUSTOMER_REQUEST_EDIT_WINDOW_HOURS } from "../../services/requestSettingsService";

import type { ThemeColors } from "../../types/theme";
import { toUserMessage } from "../../utils/errors";
import { SiteIdentitySettings } from "./SiteIdentitySettings";
import { useToast } from "../../contexts/ToastContext";

/* ================================================================
   COLOR GROUPS
   ================================================================= */

const COLOR_GROUPS: {
  title: string;
  description: string;
  fields: {
    key: keyof ThemeColors;
    label: string;
    description: string;
  }[];
}[] = [
  {
    title: "Surfaces",
    description: "Main backgrounds, cards and elevated interface areas.",
    fields: [
      {
        key: "bg",
        label: "Background",
        description: "Main website background",
      },
      {
        key: "surface",
        label: "Surface",
        description: "Cards and primary panels",
      },
      {
        key: "surfaceRaised",
        label: "Raised surface",
        description: "Inputs, dropdowns and elevated areas",
      },
    ],
  },
  {
    title: "Borders",
    description: "Lines used to separate and define interface elements.",
    fields: [
      {
        key: "line",
        label: "Border",
        description: "Standard borders and dividers",
      },
      {
        key: "lineStrong",
        label: "Strong border",
        description: "Higher-contrast borders",
      },
    ],
  },
  {
    title: "Brand",
    description: "Your main site identity and interactive accent colors.",
    fields: [
      {
        key: "accent",
        label: "Primary accent",
        description: "Buttons, links and primary actions",
      },
      {
        key: "accentHover",
        label: "Accent hover",
        description: "Hover and active accent state",
      },
      {
        key: "accent2",
        label: "Secondary accent",
        description: "Secondary highlights and details",
      },
    ],
  },
  {
    title: "Typography",
    description: "Text hierarchy throughout the website.",
    fields: [
      {
        key: "content",
        label: "Main text",
        description: "Primary headings and important text",
      },
      {
        key: "contentSecondary",
        label: "Secondary text",
        description: "Descriptions and supporting content",
      },
      {
        key: "contentMuted",
        label: "Muted text",
        description: "Subtle labels and metadata",
      },
    ],
  },
  {
    title: "Status colors",
    description:
      "Colors used for success, warning, error and information states.",
    fields: [
      {
        key: "stateSuccess",
        label: "Success",
        description: "Successful actions and confirmations",
      },
      {
        key: "stateWarning",
        label: "Warning",
        description: "Warnings and attention states",
      },
      {
        key: "stateDanger",
        label: "Danger",
        description: "Errors and destructive actions",
      },
      {
        key: "stateInfo",
        label: "Info",
        description: "Informational messages",
      },
    ],
  },
];

/* ================================================================
   COLOR CONTROL
   ================================================================= */

function ColorControl({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const isHex = /^#[0-9A-Fa-f]{6}$/.test(value);

  return (
    <div className="rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong">
      <div className="flex items-center gap-4">
        {/* Color preview */}
        <div className="shrink-0">
          <label
            className="relative block h-12 w-12 cursor-pointer overflow-hidden rounded-lg border border-line-strong"
            title={`Choose ${label}`}
          >
            <input
              type="color"
              value={isHex ? value : "#000000"}
              onChange={(event) => onChange(event.target.value)}
              aria-label={`${label} color`}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />

            <span
              className="absolute inset-1 rounded-md"
              style={{
                backgroundColor: isHex ? value : "#000000",
              }}
            />
          </label>
        </div>

        {/* Label */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-content">{label}</p>

          <p className="mt-0.5 text-xs leading-relaxed text-content-muted">
            {description}
          </p>
        </div>

        {/* Hex value */}
        <div className="shrink-0">
          <input
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            aria-label={`${label} hex value`}
            spellCheck={false}
            className="w-[112px] rounded-lg border border-line bg-surface-raised px-3 py-2.5 font-mono text-xs text-content outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
            placeholder="#000000"
          />
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   COLOR EDITOR
   ================================================================= */

function ColorEditor({
  colors,
  onChange,
}: {
  colors: ThemeColors;
  onChange: (colors: ThemeColors) => void;
}) {
  return (
    <div className="space-y-7">
      {COLOR_GROUPS.map((group) => (
        <section key={group.title}>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-content">
              {group.title}
            </h3>

            <p className="mt-1 text-xs text-content-muted">
              {group.description}
            </p>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            {group.fields.map((field) => (
              <ColorControl
                key={field.key}
                label={field.label}
                description={field.description}
                value={colors[field.key]}
                onChange={(value) =>
                  onChange({
                    ...colors,
                    [field.key]: value,
                  })
                }
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

/* ================================================================
   SETTINGS
   ================================================================= */

export default function Settings() {
  const { theme, siteTheme, setSiteTheme, applyThemeColors } = useTheme();
  const { notify } = useToast();

  /* ================================================================
     IMGBB STATE
     ================================================================= */

  const [apiKey, setApiKey] = useState("");
  const [imgbbSaving, setImgbbSaving] = useState(false);
  const [imgbbError, setImgbbError] = useState<string | null>(null);
  const [imgbbSaved, setImgbbSaved] = useState(false);

  /* ================================================================
     EMAIL STATE
     ================================================================= */

  const [emailConfig, setEmailConfig] = useState({
    serviceId: "",
    templateId: "",
    publicKey: "",
    toEmail: "",
  });

  const [emailSaving, setEmailSaving] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailSaved, setEmailSaved] = useState(false);
  const [emailTesting, setEmailTesting] = useState(false);
  const [projectEmailTesting, setProjectEmailTesting] = useState(false);

  /* ================================================================
     CUSTOMER ACCOUNT / REQUEST SECURITY STATE
     ================================================================= */
  const [requestEditHours, setRequestEditHours] = useState(DEFAULT_CUSTOMER_REQUEST_EDIT_WINDOW_HOURS);
  const [requestSecuritySaving, setRequestSecuritySaving] = useState(false);
  const [requestSecurityError, setRequestSecurityError] = useState<string | null>(null);
  const [requestSecuritySaved, setRequestSecuritySaved] = useState(false);

  /* ================================================================
     THEME STATE
     ================================================================= */

  const [themeSaving, setThemeSaving] = useState(false);
  const [themeError, setThemeError] = useState<string | null>(null);
  const [themeSaved, setThemeSaved] = useState(false);

  const [editingTheme, setEditingTheme] = useState<"dark" | "light">(theme);

  /* ================================================================
     GLOBAL LOADING
     ================================================================= */

  const [loading, setLoading] = useState(true);

  /* ================================================================
     SYNC CURRENT THEME
     ================================================================= */

  useEffect(() => {
    setEditingTheme(theme);
  }, [theme]);

  /* ================================================================
     LOAD ALL SETTINGS
     ================================================================= */

  useEffect(() => {
    Promise.all([
      imgbbService.getApiKeyOverride(),
      emailNotificationService.getConfigOverride(),
      requestSettingsService.getSecuritySettings(),
    ])
      .then(([imgbbOverride, emailOverride, requestSecurity]) => {
        setApiKey(imgbbOverride ?? "");

        setEmailConfig({
          serviceId: emailOverride.serviceId ?? "",
          templateId: emailOverride.templateId ?? "",
          publicKey: emailOverride.publicKey ?? "",
          toEmail: emailOverride.toEmail ?? "",
        });

        // Migrate an existing admin-only EmailJS configuration into the
        // browser-safe public settings document. Older installations already
        // have the private document, but the customer request flow cannot read
        // that document by design. This keeps the migration automatic: opening
        // Admin Settings once is enough; no customer data is copied.
        if (
          emailOverride.serviceId &&
          emailOverride.templateId &&
          emailOverride.publicKey &&
          emailOverride.toEmail
        ) {
          void emailNotificationService
            .saveConfigOverride({
              serviceId: emailOverride.serviceId,
              templateId: emailOverride.templateId,
              publicKey: emailOverride.publicKey,
              toEmail: emailOverride.toEmail,
            })
            .catch((error) => {
              if (import.meta.env.DEV) {
                console.warn(
                  "Could not migrate the EmailJS configuration to the public settings document.",
                  error,
                );
              }
            });
        }

        setRequestEditHours(requestSecurity.customerRequestEditWindowHours);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /* ================================================================
     IMGBB
     ================================================================= */

  const handleSaveImgbb = async () => {
    setImgbbSaving(true);
    setImgbbError(null);
    setImgbbSaved(false);

    try {
      await imgbbService.saveApiKeyOverride(apiKey || null);
      setImgbbSaved(true);
      notify({ title: "Image hosting settings saved", message: "New uploads will use the updated configuration.", tone: "success" });
    } catch (caught) {
      const message = toUserMessage(caught, "Could not save the API key.");
      setImgbbError(message);
      notify({ title: "Could not save image hosting settings", message, tone: "error" });
    } finally {
      setImgbbSaving(false);
    }
  };

  /* ================================================================
     EMAIL
     ================================================================= */

  const handleTestEmail = async () => {
    setEmailTesting(true);
    setEmailError(null);
    setEmailSaved(false);

    try {
      await emailNotificationService.sendTestEmail();
      setEmailSaved(true);
      notify({ title: "Test email sent", message: "The EmailJS test completed successfully.", tone: "success" });
    } catch (caught) {
      const message = toUserMessage(caught, "The test email could not be sent. Check your EmailJS settings and template.");
      setEmailError(message);
      notify({ title: "Test email failed", message, tone: "error" });
    } finally {
      setEmailTesting(false);
    }
  };

  const handleProjectEmailTest = async () => {
    setProjectEmailTesting(true);
    setEmailError(null);
    setEmailSaved(false);

    try {
      await emailNotificationService.sendProjectRequestTestEmail();
      setEmailSaved(true);
      notify({ title: "Project request test sent", message: "The project-request email test completed successfully.", tone: "success" });
    } catch (caught) {
      const message = toUserMessage(caught, "The project-request test email could not be sent. Check EmailJS History for the exact failure.");
      setEmailError(message);
      notify({ title: "Project request test failed", message, tone: "error" });
    } finally {
      setProjectEmailTesting(false);
    }
  };

  const handleSaveEmail = async () => {
    setEmailSaving(true);
    setEmailError(null);
    setEmailSaved(false);

    try {
      await emailNotificationService.saveConfigOverride(emailConfig);
      setEmailSaved(true);
      notify({ title: "Email notification settings saved", message: "Your updated configuration is now active.", tone: "success" });
    } catch (caught) {
      const message = toUserMessage(caught, "Could not save the email settings.");
      setEmailError(message);
      notify({ title: "Could not save email settings", message, tone: "error" });
    } finally {
      setEmailSaving(false);
    }
  };

  const emailIsConfigured = Boolean(
    emailConfig.serviceId &&
      emailConfig.templateId &&
      emailConfig.publicKey &&
      emailConfig.toEmail,
  ) || emailNotificationService.isConfiguredViaEnv();

  /* ================================================================
     CUSTOMER ACCOUNT / REQUEST SECURITY
     ================================================================= */

  const handleSaveRequestSecurity = async () => {
    const hours = Number(requestEditHours);

    if (!Number.isInteger(hours) || hours < MIN_CUSTOMER_REQUEST_EDIT_WINDOW_HOURS || hours > MAX_CUSTOMER_REQUEST_EDIT_WINDOW_HOURS) {
      setRequestSecurityError(`Enter a whole number from ${MIN_CUSTOMER_REQUEST_EDIT_WINDOW_HOURS} to ${MAX_CUSTOMER_REQUEST_EDIT_WINDOW_HOURS} hours.`);
      return;
    }

    setRequestSecuritySaving(true);
    setRequestSecurityError(null);
    setRequestSecuritySaved(false);

    try {
      await requestSettingsService.saveSecuritySettings({
        customerRequestEditWindowHours: hours,
      });
      setRequestEditHours(hours);
      setRequestSecuritySaved(true);
      notify({ title: "Request security settings saved", message: "The customer editing window has been updated.", tone: "success" });
    } catch (caught) {
      const message = toUserMessage(caught, "Could not save the customer request settings.");
      setRequestSecurityError(message);
      notify({ title: "Could not save request security", message, tone: "error" });
    } finally {
      setRequestSecuritySaving(false);
    }
  };

  /* ================================================================
     THEME
     ================================================================= */

  const handleThemeChange = (mode: "dark" | "light", colors: ThemeColors) => {
    const nextTheme = {
      ...siteTheme,
      [mode]: colors,
    };

    setSiteTheme(nextTheme);

    /*
     * Only preview the theme currently being edited.
     */
    if (mode === theme) {
      applyThemeColors(colors);
    }
  };

  const handleThemeModeChange = (mode: "dark" | "light") => {
    setEditingTheme(mode);

    /*
     * Apply the selected theme immediately so the admin editor
     * itself becomes a proper live preview.
     */
    applyThemeColors(siteTheme[mode]);

    document.documentElement.setAttribute("data-theme", mode);
  };

  const handleSaveTheme = async () => {
    setThemeSaving(true);
    setThemeError(null);
    setThemeSaved(false);

    try {
      await themeService.saveTheme({
        dark: siteTheme.dark,
        light: siteTheme.light,
      });

      setThemeSaved(true);
      notify({ title: "Appearance settings saved", message: "Your website color theme has been updated.", tone: "success" });
    } catch (caught) {
      const message = toUserMessage(caught, "Could not save the theme.");
      setThemeError(message);
      notify({ title: "Could not save appearance settings", message, tone: "error" });
    } finally {
      setThemeSaving(false);
    }
  };

  const handleResetTheme = () => {
    const resetTheme = {
      ...DEFAULT_THEME,
      updatedAt: null,
    };

    setSiteTheme(resetTheme);

    applyThemeColors(resetTheme[editingTheme]);

    document.documentElement.setAttribute("data-theme", editingTheme);

    setThemeError(null);
    setThemeSaved(false);
  };

  /* ================================================================
     LOADING
     ================================================================= */

  if (loading) {
    return null;
  }

  /* ================================================================
     RENDER
     ================================================================= */

  return (
    <>
      <Seo title="Settings" noIndex />

      {/* ============================================================
          PAGE HEADER
          ============================================================ */}

      <header className="rounded-2xl border border-line bg-surface p-5 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Admin workspace</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Settings</h1>

        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-content-secondary">
          Site-wide configuration that doesn't belong to a single project or
          request.
        </p>
      </header>


      <nav aria-label="Settings sections" className="sticky top-2 z-20 mt-5 rounded-2xl border border-line bg-bg/90 p-2 shadow-sm backdrop-blur-lg">
        <div className="flex gap-2 overflow-x-auto pb-0.5">
          {[
            ["#identity-settings", "Website & social"],
            ["#image-hosting", "Image uploads"],
            ["#email-notifications", "Email alerts"],
            ["#account-security", "Account security"],
            ["#appearance-settings", "Appearance"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="shrink-0 rounded-xl px-3 py-2 text-xs font-medium text-content-secondary transition-colors hover:bg-surface-raised hover:text-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              {label}
            </a>
          ))}
        </div>
      </nav>

      <SiteIdentitySettings />

      {/* ============================================================
          IMGBB
          ============================================================ */}

      <section id="image-hosting" className="mt-10 scroll-mt-28 max-w-4xl rounded-2xl border border-line bg-surface/40 p-5 sm:p-7">
        <div className="flex items-center gap-2.5">
          <ImageIcon
            size={17}
            className="text-content-muted"
            aria-hidden="true"
          />

          <h2 className="text-lg font-semibold tracking-tight">
            Image hosting — imgBB
          </h2>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-content-secondary">
          Every image uploaded through the admin panel and the request form goes
          to imgBB (free, no Firebase Storage / Blaze plan needed). A key from{" "}
          <a
            href="https://api.imgbb.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-2 hover:text-accent-hover"
          >
            api.imgbb.com
          </a>{" "}
          is already set as a default in this project's environment. Set one
          here only if you want to change it — for example, to rotate the key or
          use a different account — without a redeploy.
        </p>

        {imgbbError && (
          <div className="mt-5">
            <Alert tone="danger">{imgbbError}</Alert>
          </div>
        )}

        {imgbbSaved && (
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
                ? "Leave blank to use the default key already configured for this project."
                : "No default key is set in this project — an override here is required for uploads to work."
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
            <Button
              onClick={() => void handleSaveImgbb()}
              loading={imgbbSaving}
            >
              {imgbbSaving ? "Saving…" : "Save"}
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================
          EMAIL NOTIFICATIONS
          ============================================================ */}

      <section id="email-notifications" className="mt-8 scroll-mt-28 max-w-4xl rounded-2xl border border-line bg-surface/40 p-5 sm:p-7">
        <div className="flex items-center gap-2.5">
          <Mail size={17} className="text-content-muted" aria-hidden="true" />

          <h2 className="text-lg font-semibold tracking-tight">
            Email notifications
          </h2>

          <Badge tone={emailIsConfigured ? "success" : "neutral"}>
            {emailIsConfigured ? "Configured" : "Not set up"}
          </Badge>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-content-secondary">
          Get an email the moment someone submits a project request or a contact
          message, using{" "}
          <a
            href="https://www.emailjs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-2 hover:text-accent-hover"
          >
            EmailJS
          </a>{" "}
          (free tier, sends straight from the browser — no backend, same idea as
          imgBB).
        </p>

        <ol className="mt-4 flex flex-col gap-2 text-sm leading-relaxed text-content-secondary">
          <li>
            1. Create a free account at emailjs.com and connect an email
            provider (Gmail, Outlook, etc.).
          </li>

          <li>
            2. Create an Email Service and an Email Template. In the template,
            use these variable names so this integration fills them in:{" "}
            <code className="text-content">{"{{subject}}"}</code>,{" "}
            <code className="text-content">{"{{message}}"}</code>,{" "}
            <code className="text-content">{"{{reply_to}}"}</code>,{" "}
            <code className="text-content">{"{{to_email}}"}</code>.
          </li>

          <li>
            3. Copy the Service ID, Template ID and Public Key from your EmailJS
            dashboard into the fields below.
          </li>
        </ol>

        {emailError && (
          <div className="mt-5">
            <Alert tone="danger">{emailError}</Alert>
          </div>
        )}

        {emailSaved && (
          <div className="mt-5">
            <Alert tone="success">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={15} aria-hidden="true" />
                Saved. New submissions will trigger an email from now on.
              </span>
            </Alert>
          </div>
        )}

        <div className="mt-5 flex flex-col gap-5">
          <Field label="Notify this email address" htmlFor="toEmail">
            <TextInput
              id="toEmail"
              type="email"
              value={emailConfig.toEmail}
              onChange={(event) =>
                setEmailConfig((current) => ({
                  ...current,
                  toEmail: event.target.value,
                }))
              }
              placeholder="you@example.com"
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Service ID" htmlFor="serviceId">
              <TextInput
                id="serviceId"
                value={emailConfig.serviceId}
                onChange={(event) =>
                  setEmailConfig((current) => ({
                    ...current,
                    serviceId: event.target.value,
                  }))
                }
              />
            </Field>

            <Field label="Template ID" htmlFor="templateId">
              <TextInput
                id="templateId"
                value={emailConfig.templateId}
                onChange={(event) =>
                  setEmailConfig((current) => ({
                    ...current,
                    templateId: event.target.value,
                  }))
                }
              />
            </Field>
          </div>

          <Field label="Public Key" htmlFor="publicKey">
            <TextInput
              id="publicKey"
              value={emailConfig.publicKey}
              onChange={(event) =>
                setEmailConfig((current) => ({
                  ...current,
                  publicKey: event.target.value,
                }))
              }
            />
          </Field>

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => void handleSaveEmail()}
              loading={emailSaving}
            >
              {emailSaving ? "Saving…" : "Save"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => void handleTestEmail()}
              loading={emailTesting}
              disabled={emailSaving}
            >
              {emailTesting ? "Sending test…" : "Send test email"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => void handleProjectEmailTest()}
              loading={projectEmailTesting}
              disabled={emailSaving || emailTesting}
            >
              {projectEmailTesting
                ? "Sending project test…"
                : "Test project request email"}
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================
          CUSTOMER ACCOUNTS & REQUEST SECURITY
          ============================================================ */}

      <section id="account-security" className="mt-8 scroll-mt-28 max-w-4xl rounded-2xl border border-line bg-surface/40 p-5 sm:p-7">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
            <ShieldCheck size={17} className="text-accent" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Customer accounts & request security</h2>
            <p className="mt-0.5 text-xs text-content-muted">Authentication and customer request editing rules</p>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-content-secondary">
          Customer accounts are optional for normal browsing, but required to submit project requests.
          The editing window below is also enforced by Firestore Security Rules using server time, so changing
          the browser cannot bypass it.
        </p>

        {requestSecurityError && (
          <div className="mt-5">
            <Alert tone="danger">{requestSecurityError}</Alert>
          </div>
        )}

        {requestSecuritySaved && (
          <div className="mt-5">
            <Alert tone="success">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={15} aria-hidden="true" />
                Saved. The new editing window applies to customer edits immediately.
              </span>
            </Alert>
          </div>
        )}

        <div className="mt-6 rounded-2xl border border-line bg-surface p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <Clock3 size={19} className="mt-0.5 shrink-0 text-content-muted" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <Field
                label="Customer request editing window"
                htmlFor="requestEditHours"
                hint={`How long after submission a customer can edit their own request. Default: ${DEFAULT_CUSTOMER_REQUEST_EDIT_WINDOW_HOURS} hours. Allowed range: ${MIN_CUSTOMER_REQUEST_EDIT_WINDOW_HOURS}–${MAX_CUSTOMER_REQUEST_EDIT_WINDOW_HOURS} hours.`}
              >
                <div className="flex max-w-xs items-center gap-3">
                  <TextInput
                    id="requestEditHours"
                    type="number"
                    min={MIN_CUSTOMER_REQUEST_EDIT_WINDOW_HOURS}
                    max={MAX_CUSTOMER_REQUEST_EDIT_WINDOW_HOURS}
                    step={1}
                    value={requestEditHours}
                    onChange={(event) => setRequestEditHours(Number(event.target.value))}
                  />
                  <span className="text-sm text-content-secondary">hours</span>
                </div>
              </Field>

              <div className="mt-5">
                <Button onClick={() => void handleSaveRequestSecurity()} loading={requestSecuritySaving}>
                  {requestSecuritySaving ? "Saving…" : "Save request security"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          APPEARANCE
          ============================================================ */}

      <section id="appearance-settings" className="mt-8 scroll-mt-28 max-w-6xl rounded-2xl border border-line bg-surface/40 p-5 sm:p-7">
        {/* Section heading */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
            <Palette size={17} className="text-accent" aria-hidden="true" />
          </div>

          <div>
            <h2 className="text-lg font-semibold tracking-tight">Appearance</h2>

            <p className="mt-0.5 text-xs text-content-muted">
              Global website colors and visual identity
            </p>
          </div>
        </div>

        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-content-secondary">
          Customize the colors used across the website. Changes are
          previewed immediately and saved to Firebase, so you can manage the
          visual theme without editing CSS manually.
        </p>

        {/* Alerts */}
        {themeError && (
          <div className="mt-5 max-w-3xl">
            <Alert tone="danger">{themeError}</Alert>
          </div>
        )}

        {themeSaved && (
          <div className="mt-5 max-w-3xl">
            <Alert tone="success">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={15} aria-hidden="true" />
                Theme saved successfully.
              </span>
            </Alert>
          </div>
        )}

        {/* ============================================================
            THEME SWITCHER
            ============================================================ */}

        <div className="mt-7 rounded-2xl border border-line bg-surface p-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleThemeModeChange("dark")}
              className={`flex items-center justify-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                editingTheme === "dark"
                  ? "bg-accent text-on-accent shadow-sm"
                  : "text-content-secondary hover:bg-surface-raised hover:text-content"
              }`}
            >
              <Moon size={17} aria-hidden="true" />
              Dark theme
            </button>

            <button
              type="button"
              onClick={() => handleThemeModeChange("light")}
              className={`flex items-center justify-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                editingTheme === "light"
                  ? "bg-accent text-on-accent shadow-sm"
                  : "text-content-secondary hover:bg-surface-raised hover:text-content"
              }`}
            >
              <Sun size={17} aria-hidden="true" />
              Light theme
            </button>
          </div>
        </div>

        {/* ============================================================
            CURRENT THEME HEADER
            ============================================================ */}

        <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-xl border border-line-strong"
              style={{
                background:
                  editingTheme === "dark"
                    ? siteTheme.dark.accent
                    : siteTheme.light.accent,
              }}
            />

            <div>
              <h3 className="text-sm font-semibold">
                {editingTheme === "dark" ? "Dark theme" : "Light theme"}
              </h3>

              <p className="mt-0.5 text-xs text-content-muted">
                Editing the {editingTheme} color palette
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-content-muted">
            <Monitor size={14} aria-hidden="true" />
            Live preview enabled
          </div>
        </div>

        {/* ============================================================
            COLOR EDITOR
            ============================================================ */}

        <div className="mt-5 rounded-2xl border border-line bg-surface p-5 sm:p-6 lg:p-7">
          <ColorEditor
            colors={siteTheme[editingTheme]}
            onChange={(colors) => handleThemeChange(editingTheme, colors)}
          />
        </div>

        {/* ============================================================
            THEME ACTIONS
            ============================================================ */}

        <div className="mt-5 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-content-muted">
            Changes are only permanent after you save the theme.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={handleResetTheme}>
              <span className="flex items-center gap-2">
                <RotateCcw size={15} aria-hidden="true" />
                Reset defaults
              </span>
            </Button>

            <Button
              onClick={() => void handleSaveTheme()}
              loading={themeSaving}
            >
              <span className="flex items-center gap-2">
                <Save size={15} aria-hidden="true" />
                {themeSaving ? "Saving…" : "Save theme"}
              </span>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
