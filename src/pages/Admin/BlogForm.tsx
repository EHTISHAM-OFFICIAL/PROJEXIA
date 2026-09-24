import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Eye } from 'lucide-react';
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
import { Prose } from '../../components/projects/CaseStudySection';
import type { BlogPostDraft } from '../../types/blog';

const EMPTY_DRAFT: BlogPostDraft = {
  title: '',
  slug: '',
  excerpt: '',
  body: '',
  coverImageUrl: null,
  coverImageAlt: null,
  seoTitle: null,
  metaDescription: null,
  keywords: [],
  category: null,
  featured: false,
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
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (!isEdit || !existing.data) return;
    const { id: _ignored, createdAt: _c, updatedAt: _u, ...rest } = existing.data;
    setDraft({
      ...EMPTY_DRAFT,
      ...rest,
      keywords: rest.keywords ?? [],
    });
    setSlugTouched(true);
  }, [isEdit, existing.data]);

  const update = <K extends keyof BlogPostDraft>(key: K, value: BlogPostDraft[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));

  const updateTitle = (title: string) => {
    setDraft((current) => ({
      ...current,
      title,
      slug: slugTouched ? current.slug : slugify(title),
      seoTitle: current.seoTitle ?? title,
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
      const keywords = Array.from(
        new Set(
          (draft.keywords ?? [])
            .map((keyword) => keyword.trim().toLowerCase())
            .filter(Boolean),
        ),
      );

      const payload: BlogPostDraft = {
        ...draft,
        title: draft.title.trim(),
        slug: slugify(draft.slug || draft.title),
        excerpt: draft.excerpt.trim(),
        body: draft.body.trim(),
        seoTitle: draft.seoTitle?.trim() || null,
        metaDescription: draft.metaDescription?.trim() || draft.excerpt.trim(),
        coverImageAlt: draft.coverImageAlt?.trim() || null,
        category: draft.category?.trim() || null,
        keywords,
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
        <p className="mt-1.5 max-w-2xl text-sm text-content-secondary">
          Write for people first. Use headings, short paragraphs, bullets and bold emphasis where they genuinely improve the explanation. SEO fields should describe the article accurately, not repeat keywords.
        </p>
      </header>

      {error && (
        <div className="mt-6">
          <Alert tone="danger">{error}</Alert>
        </div>
      )}

      <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex min-w-0 flex-col gap-5">
          <Field label="Title" htmlFor="title" required>
            <TextInput id="title" value={draft.title} onChange={(e) => updateTitle(e.target.value)} />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
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

            <Field label="Category" htmlFor="category" hint="Examples: Embedded Systems, IoT, PCB, Troubleshooting.">
              <TextInput id="category" value={draft.category ?? ''} onChange={(e) => update('category', e.target.value)} />
            </Field>
          </div>

          <Field label="Excerpt" htmlFor="excerpt" required hint="A concise summary used on the blog index and as the default meta description.">
            <TextArea id="excerpt" rows={3} value={draft.excerpt} onChange={(e) => update('excerpt', e.target.value)} />
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

          <Field label="Cover image alt text" htmlFor="coverImageAlt" hint="Describe the actual image for accessibility and image search.">
            <TextInput id="coverImageAlt" value={draft.coverImageAlt ?? ''} onChange={(e) => update('coverImageAlt', e.target.value)} />
          </Field>

          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-medium">Article body</h2>
              <p className="mt-1 text-xs text-content-muted">Supports #, ##, ### headings, - bullets, **bold**, *italic*, links and &gt; callouts.</p>
            </div>
            <Button variant="secondary" size="sm" onClick={() => setPreview((value) => !value)}>
              <span className="flex items-center gap-2"><Eye size={15} />{preview ? 'Edit body' : 'Preview body'}</span>
            </Button>
          </div>

          {preview ? (
            <div className="rounded-card border border-line bg-surface p-6 sm:p-8">
              <Prose text={draft.body || 'Start writing to see the preview.'} />
            </div>
          ) : (
            <Field label="Body" htmlFor="body" required hint="Use formatting only where it helps the reader scan and understand the article.">
              <TextArea id="body" rows={24} value={draft.body} onChange={(e) => update('body', e.target.value)} className="font-mono text-sm" />
            </Field>
          )}
        </div>

        <aside className="flex min-w-0 flex-col gap-5">
          <div className="card p-5">
            <h2 className="text-sm font-semibold">SEO controls</h2>
            <p className="mt-1 text-xs leading-relaxed text-content-muted">
              These fields customize search metadata without changing the visible article.
            </p>

            <div className="mt-5 flex flex-col gap-4">
              <Field label="SEO title" htmlFor="seoTitle" hint="Leave blank to use the article title.">
                <TextInput id="seoTitle" value={draft.seoTitle ?? ''} onChange={(e) => update('seoTitle', e.target.value)} />
              </Field>

              <Field label="Meta description" htmlFor="metaDescription" hint="Aim for a clear, useful summary rather than keyword stuffing.">
                <TextArea id="metaDescription" rows={4} value={draft.metaDescription ?? ''} onChange={(e) => update('metaDescription', e.target.value)} />
              </Field>

              <Field label="Keywords" htmlFor="keywords" hint="Comma-separated topic terms. Use only terms genuinely covered by the article.">
                <TextInput
                  id="keywords"
                  value={(draft.keywords ?? []).join(', ')}
                  onChange={(e) => update('keywords', e.target.value.split(','))}
                />
              </Field>

              <Checkbox
                id="featured"
                label="Featured article"
                checked={Boolean(draft.featured)}
                onChange={(e) => update('featured', e.target.checked)}
              />
            </div>
          </div>

          <div className="card p-5">
            <h2 className="text-sm font-semibold">Publishing</h2>
            <p className="mt-1 text-xs leading-relaxed text-content-muted">
              Keep drafts unpublished while you review the article, links, image and SEO fields.
            </p>
            <div className="mt-4">
              <Checkbox
                id="published"
                label="Published"
                checked={draft.published}
                onChange={(e) => update('published', e.target.checked)}
              />
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
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
    </>
  );
}
