import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Seo } from '../../components/ui/Seo';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { Skeleton } from '../../components/ui/Skeleton';
import { Field } from '../../components/forms/Field';
import { TextArea, TextInput } from '../../components/forms/Inputs';
import { Checkbox } from '../../components/forms/Choice';
import { useTestimonial } from '../../hooks/useTestimonials';
import { testimonialService } from '../../services/testimonialService';
import { toUserMessage } from '../../utils/errors';
import type { TestimonialDraft } from '../../types/testimonial';

const EMPTY_DRAFT: TestimonialDraft = {
  name: '',
  role: '',
  company: '',
  quote: '',
  rating: null,
  published: false,
};

export default function TestimonialForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const existing = useTestimonial(id);

  const [draft, setDraft] = useState<TestimonialDraft>(EMPTY_DRAFT);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit || !existing.data) return;
    const { id: _ignored, createdAt: _c, ...rest } = existing.data;
    setDraft({ ...rest, role: rest.role ?? '', company: rest.company ?? '' });
  }, [isEdit, existing.data]);

  const update = <K extends keyof TestimonialDraft>(key: K, value: TestimonialDraft[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));

  const handleSave = async () => {
    setError(null);
    if (!draft.name.trim() || !draft.quote.trim()) {
      setError('A name and a quote are both required.');
      return;
    }

    setSaving(true);
    try {
      const payload: TestimonialDraft = {
        ...draft,
        name: draft.name.trim(),
        role: draft.role?.trim() || null,
        company: draft.company?.trim() || null,
        quote: draft.quote.trim(),
      };

      if (isEdit && id) await testimonialService.update(id, payload);
      else await testimonialService.create(payload);

      navigate('/admin/testimonials');
    } catch (caught) {
      setError(toUserMessage(caught, 'The testimonial could not be saved.'));
    } finally {
      setSaving(false);
    }
  };

  if (isEdit && existing.loading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <>
      <Seo title={isEdit ? 'Edit testimonial' : 'New testimonial'} noIndex />

      <Link
        to="/admin/testimonials"
        className="inline-flex items-center gap-2 rounded-md py-2 text-sm text-content-secondary transition-colors hover:text-content"
      >
        <ArrowLeft size={15} aria-hidden="true" />
        All testimonials
      </Link>

      <header className="mt-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          {isEdit ? 'Edit testimonial' : 'New testimonial'}
        </h1>
      </header>

      {error && (
        <div className="mt-6">
          <Alert tone="danger">{error}</Alert>
        </div>
      )}

      <div className="mt-8 flex max-w-xl flex-col gap-5">
        <Field label="Name" htmlFor="name" required>
          <TextInput id="name" value={draft.name} onChange={(e) => update('name', e.target.value)} />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Role" htmlFor="role" hint="e.g. Owner">
            <TextInput
              id="role"
              value={draft.role ?? ''}
              onChange={(e) => update('role', e.target.value)}
            />
          </Field>
          <Field label="Company" htmlFor="company" hint="Optional">
            <TextInput
              id="company"
              value={draft.company ?? ''}
              onChange={(e) => update('company', e.target.value)}
            />
          </Field>
        </div>

        <Field label="Quote" htmlFor="quote" required>
          <TextArea
            id="quote"
            rows={5}
            value={draft.quote}
            onChange={(e) => update('quote', e.target.value)}
          />
        </Field>

        <Field label="Rating" htmlFor="rating" hint="1–5, or leave blank to hide stars entirely.">
          <TextInput
            id="rating"
            type="number"
            min={1}
            max={5}
            value={draft.rating ?? ''}
            onChange={(e) =>
              update('rating', e.target.value === '' ? null : Math.min(5, Math.max(1, Number(e.target.value))))
            }
          />
        </Field>

        <Checkbox
          id="published"
          label="Published"
          description="Visible on the homepage."
          checked={draft.published}
          onChange={(e) => update('published', e.target.checked)}
        />

        <div className="flex gap-3">
          <Button onClick={() => void handleSave()} loading={saving}>
            {saving ? 'Saving…' : 'Save testimonial'}
          </Button>
          <Button variant="ghost" onClick={() => navigate('/admin/testimonials')} disabled={saving}>
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
}
