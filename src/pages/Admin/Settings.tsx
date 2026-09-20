import { useEffect, useState } from "react";
import {
  CheckCircle2,
  ImageIcon,
  Palette,
  RotateCcw,
  Save,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";

import { Seo } from "../../components/ui/Seo";
import { Button } from "../../components/ui/Button";
import { Alert } from "../../components/ui/Alert";
import { Field } from "../../components/forms/Field";
import { TextInput } from "../../components/forms/Inputs";

import { imgbbService } from "../../services/imgbbService";
import { themeService, DEFAULT_THEME } from "../../services/themeService";
import { useTheme } from "../../hooks/useTheme";
import type { ThemeColors } from "../../types/theme";
import { toUserMessage } from "../../utils/errors";

/* ================================================================
   COLOR GROUPS
   ================================================================ */

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
    description: "Your main MECTEC identity and interactive accent colors.",
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
   ================================================================ */

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
   ================================================================ */

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
   ================================================================ */

export default function Settings() {
  const { theme, siteTheme, setSiteTheme, applyThemeColors } = useTheme();

  const [apiKey, setApiKey] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [themeSaving, setThemeSaving] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [themeError, setThemeError] = useState<string | null>(null);

  const [saved, setSaved] = useState(false);
  const [themeSaved, setThemeSaved] = useState(false);

  const [editingTheme, setEditingTheme] = useState<"dark" | "light">(theme);

  useEffect(() => {
    setEditingTheme(theme);
  }, [theme]);

  useEffect(() => {
    imgbbService
      .getApiKeyOverride()
      .then((override) => setApiKey(override ?? ""))
      .finally(() => setLoading(false));
  }, []);

  /* ================================================================
     IMGBB
     ================================================================ */

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSaved(false);

    try {
      await imgbbService.saveApiKeyOverride(apiKey || null);
      setSaved(true);
    } catch (caught) {
      setError(toUserMessage(caught, "Could not save the API key."));
    } finally {
      setSaving(false);
    }
  };

  /* ================================================================
     THEME
     ================================================================ */

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
    } catch (caught) {
      setThemeError(toUserMessage(caught, "Could not save the theme."));
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

  if (loading) {
    return null;
  }

  return (
    <>
      <Seo title="Settings" noIndex />

      {/* ============================================================
          PAGE HEADER
          ============================================================ */}

      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>

        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-content-secondary">
          Site-wide configuration that doesn't belong to a single project or
          request.
        </p>
      </header>

      {/* ============================================================
          IMGBB
          ============================================================ */}

      <section className="mt-14 max-w-2xl border-t border-line pt-10">
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
            <Button onClick={() => void handleSave()} loading={saving}>
              {saving ? "Saving…" : "Save"}
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================
          APPEARANCE
          ============================================================ */}

      <section className="mt-10 max-w-6xl">
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
          Customize the colors used across the MECTEC website. Changes are
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
