import { useEffect, useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import { Seo } from '../../components/ui/Seo';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { Field } from '../../components/forms/Field';
import { Select, TextArea, TextInput } from '../../components/forms/Inputs';
import { Checkbox } from '../../components/forms/Choice';
import { useBanner } from '../../hooks/useBanner';
import { bannerService } from '../../services/bannerService';
import { isBannerLive } from '../../utils/banner';
import { toDateInputValue } from '../../utils/formatting';
import { toUserMessage } from '../../utils/errors';
import type { BannerSize, BannerTone } from '../../types/banner';

const TONE_OPTIONS: { value: BannerTone; label: string }[] = [
  { value: 'accent', label: 'Offer — copper accent' },
  { value: 'success', label: 'Success — green' },
  { value: 'info', label: 'Info — blue' },
  { value: 'warning', label: 'Warning — amber' },
  { value: 'danger', label: 'Urgent — red' },
];

const SIZE_OPTIONS: { value: BannerSize; label: string }[] = [
  { value: 'large', label: 'Large — more noticeable' },
  { value: 'normal', label: 'Normal — compact' },
];

interface FormState {
  enabled: boolean;
  message: string;
  linkLabel: string;
  linkUrl: string;
  tone: BannerTone;
  size: BannerSize;
  dismissible: boolean;
  scrolling: boolean;
}

const EMPTY_FORM: FormState = {
  enabled: false,
  message: '',
  linkLabel: '',
  linkUrl: '',
  tone: 'accent',
  size: 'large',
  dismissible: false,
  scrolling: true,
};

export default function BannerSettings() {
  const { data, loading, reload } = useBanner();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!data) return;
    setForm({
      enabled: data.enabled,
      message: data.message,
      linkLabel: data.linkLabel ?? '',
      linkUrl: data.linkUrl ?? '',
      tone: data.tone,
      size: data.size,
      dismissible: data.dismissible,
      scrolling: data.scrolling,
    });
    setStartDate(toDateInputValue(data.startDate));
    setEndDate(toDateInputValue(data.endDate));
  }, [data]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      await bannerService.saveBanner({
        enabled: form.enabled,
        message: form.message.trim(),
        linkLabel: form.linkLabel.trim() || null,
        linkUrl: form.linkUrl.trim() || null,
        tone: form.tone,
        size: form.size,
        dismissible: form.dismissible,
        scrolling: form.scrolling,
        startDate: startDate ? Timestamp.fromDate(new Date(startDate)) : null,
        endDate: endDate ? Timestamp.fromDate(new Date(endDate)) : null,
      });
      setSaved(true);
      reload();
    } catch (caught) {
      setError(toUserMessage(caught, 'The banner could not be saved.'));
    } finally {
      setSaving(false);
    }
  };

  // Live preview of whether *this unsaved form* would currently show, so the
  // admin sees the effect of a date range before committing to it.
  const previewLive = isBannerLive({
    enabled: form.enabled,
    message: form.message,
    linkLabel: form.linkLabel || null,
    linkUrl: form.linkUrl || null,
    tone: form.tone,
    size: form.size,
    dismissible: form.dismissible,
    scrolling: form.scrolling,
    startDate: startDate ? Timestamp.fromDate(new Date(startDate)) : null,
    endDate: endDate ? Timestamp.fromDate(new Date(endDate)) : null,
    updatedAt: null,
  });

  if (loading) return null;

  return (
    <>
      <Seo title="Site banner" noIndex />

      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Site banner</h1>
          <p className="mt-1.5 max-w-prose text-sm text-content-secondary">
            One announcement bar shown above the navigation on every public page — an offer,
            availability notice, or anything else worth calling out.
          </p>
        </div>
        <Badge tone={previewLive ? 'success' : 'neutral'}>
          {previewLive ? 'Live now' : 'Not showing'}
        </Badge>
      </header>

      {error && (
        <div className="mt-6">
          <Alert tone="danger">{error}</Alert>
        </div>
      )}
      {saved && (
        <div className="mt-6">
          <Alert tone="success">Banner saved.</Alert>
        </div>
      )}

      <div className="mt-8 flex max-w-xl flex-col gap-5">
        <Checkbox
          id="enabled"
          label="Show the banner"
          description="Turn off any time to hide it immediately without losing your message."
          checked={form.enabled}
          onChange={(event) => update('enabled', event.target.checked)}
        />

        <Field
          label="Message"
          htmlFor="message"
          required
          hint="Keep it short — on a phone it's one line before it truncates."
        >
          <TextArea
            id="message"
            rows={2}
            value={form.message}
            onChange={(event) => update('message', event.target.value)}
          />
        </Field>

        <Field label="Tone" htmlFor="tone">
          <Select
            id="tone"
            options={TONE_OPTIONS}
            value={form.tone}
            onChange={(event) => update('tone', event.target.value as BannerTone)}
          />
        </Field>

        <Field label="Size" htmlFor="size">
          <Select
            id="size"
            options={SIZE_OPTIONS}
            value={form.size}
            onChange={(event) => update('size', event.target.value as BannerSize)}
          />
        </Field>

        <Checkbox
          id="scrolling"
          label="Scroll the message"
          description="Text moves across the bar continuously, like a ticker — harder to miss than static text."
          checked={form.scrolling}
          onChange={(event) => update('scrolling', event.target.checked)}
        />

        <Checkbox
          id="dismissible"
          label="Let visitors close it"
          description="Off by default, so it stays visible until you turn it off — not until someone clicks away."
          checked={form.dismissible}
          onChange={(event) => update('dismissible', event.target.checked)}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Link text"
            htmlFor="linkLabel"
            hint="e.g. “Learn more”. Leave blank for no link."
          >
            <TextInput
              id="linkLabel"
              value={form.linkLabel}
              onChange={(event) => update('linkLabel', event.target.value)}
            />
          </Field>
          <Field
            label="Link URL"
            htmlFor="linkUrl"
            hint="/request-project, or a full https:// address"
          >
            <TextInput
              id="linkUrl"
              value={form.linkUrl}
              onChange={(event) => update('linkUrl', event.target.value)}
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Starts" htmlFor="startDate" hint="Leave blank to start immediately.">
            <TextInput
              id="startDate"
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </Field>
          <Field label="Ends" htmlFor="endDate" hint="Leave blank to run indefinitely.">
            <TextInput
              id="endDate"
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </Field>
        </div>

        <div>
          <Button onClick={() => void handleSave()} loading={saving}>
            {saving ? 'Saving…' : 'Save banner'}
          </Button>
        </div>
      </div>
    </>
  );
}
