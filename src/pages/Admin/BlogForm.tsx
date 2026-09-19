import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Seo } from '../../components/ui/Seo';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { Skeleton } from '../../components/ui/Skeleton';
import { ErrorState } from '../../components/ui/ErrorState';
import { Field } from '../../components/forms/Field';
import { TextArea, TextInput } from '../../components/forms/Inputs';
import { Checkbox } from '../../components/forms/Choice';
import { ImageUploadField } from '../../components/forms/ImageUploadField';
import { usePostById } from '../../hooks/useBlog';
import { blogService } from '../../services/blogService';
import { imgbbService } from '../../services/imgbbService';
import { slugify } from '../../utils/slug';
import { toUserMessage } from '../../utils/errors';
import type { BlogPostDraft } from '../../types/blog';

const EMPTY_DRAFT: BlogPostDraft = {
  title: '',
  slug: '',
  excerpt: '',
  body: '',
  coverImageUrl: null,
  published: false,
};

export default function BlogForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const existing = usePostById(id);

  const [draft, setDraft] = useState<BlogPostDraft>(EMPTY_DRAFT);
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isEdit || !existing.data) return;
    const { id: _ignored, createdAt: _c, updatedAt: _u, ...rest } = existing.data;
    setDraft(rest);
    setSlugTouched(true);
  }, [isEdit, existing.data]);

  const update = <K extends keyof BlogPostDraft>(key: K, value: BlogPostDraft[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));

  const updateTitle = (title: string) => {
    setDraft((current) => ({
      ...current,
      title,
      slug: slugTouched ? current.slug : slugify(title),
    }));
  };

  const handleSave = async (publish?: boolean) => {
    setError(null);
    if (!draft.title.trim() || !draft.excerpt.trim() || !draft.body.trim()) {
      setError('Title, excerpt and body are all required.');
      return;
    }

    setSaving(true);
    try {
      const payload: BlogPostDraft = {
        ...draft,
        title: draft.title.trim(),
        slug: slugify(draft.slug || draft.title),
        published: publish ?? draft.published,
      };

      if (isEdit && id) await blogService.updatePost(id, payload);
      else await blogService.createPost(payload);

      navigate('/admin/blog');
    } catch (caught) {
      setError(toUserMessage(caught, 'The post could not be saved.'));
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

  if (isEdit && existing.error) {
    return <ErrorState message={existing.error} onRetry={existing.reload} />;
  }

  return (
    <>
      <Seo title={isEdit ? 'Edit post' : 'New post'} noIndex />

      <Link
        to="/admin/blog"
        className="inline-flex items-center gap-2 rounded-md py-2 text-sm text-content-secondary transition-colors hover:text-content"
      >
        <ArrowLeft size={15} aria-hidden="true" />
        All posts
      </Link>

      <header className="mt-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          {isEdit ? 'Edit post' : 'New post'}
        </h1>
      </header>

      {error && (
        <div className="mt-6">
          <Alert tone="danger">{error}</Alert>
        </div>
      )}

      <div className="mt-8 flex max-w-2xl flex-col gap-5">
        <Field label="Title" htmlFor="title" required>
          <TextInput id="title" value={draft.title} onChange={(e) => updateTitle(e.target.value)} />
        </Field>

        <Field
          label="URL slug"
          htmlFor="slug"
          required
          hint={`Public address: /blog/${draft.slug || 'your-post'}`}
        >
          <TextInput
            id="slug"
            value={draft.slug}
            onChange={(e) => {
              setSlugTouched(true);
              update('slug', e.target.value);
            }}
            onBlur={(e) => update('slug', slugify(e.target.value))}
          />
        </Field>

        <Field label="Excerpt" htmlFor="excerpt" required hint="Shown on the blog index card.">
          <TextArea id="excerpt" rows={2} value={draft.excerpt} onChange={(e) => update('excerpt', e.target.value)} />
        </Field>

        <Field label="Cover image" htmlFor="coverImage">
          <ImageUploadField
            label="Cover image"
            value={draft.coverImageUrl}
            onUpload={async (file) => {
              const uploaded = await imgbbService.upload(file);
              update('coverImageUrl', uploaded.url);
            }}
            onClear={() => update('coverImageUrl', null)}
          />
        </Field>

        <Field label="Body" htmlFor="body" required hint="Blank lines create new paragraphs.">
          <TextArea id="body" rows={12} value={draft.body} onChange={(e) => update('body', e.target.value)} />
        </Field>

        <Checkbox
          id="published"
          label="Published"
          checked={draft.published}
          onChange={(e) => update('published', e.target.checked)}
        />

        <div className="flex flex-wrap gap-3">
          <Button onClick={() => void handleSave()} loading={saving}>
            {saving ? 'Saving…' : 'Save post'}
          </Button>
          {!draft.published && (
            <Button variant="secondary" onClick={() => void handleSave(true)} disabled={saving}>
              Save and publish
            </Button>
          )}
          <Button variant="ghost" onClick={() => navigate('/admin/blog')} disabled={saving}>
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
}
