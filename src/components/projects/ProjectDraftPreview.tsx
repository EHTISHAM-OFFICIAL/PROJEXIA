import { ExternalLink, X } from 'lucide-react';
import type { ProjectDraft } from '../../types/project';
import { Image } from '../ui/Image';
import { InlineText, Prose, BulletList } from './CaseStudySection';

export function ProjectDraftPreview({
  draft,
  onClose,
}: {
  draft: ProjectDraft;
  onClose: () => void;
}) {
  const hasImage = Boolean(draft.media.heroImageUrl || draft.media.thumbnailUrl);
  const image = draft.media.heroImageUrl || draft.media.thumbnailUrl;

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-black/70 p-3 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-preview-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="mx-auto my-3 max-w-5xl overflow-hidden rounded-2xl border border-line bg-bg shadow-2xl sm:my-8">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-bg/95 px-4 py-3 backdrop-blur sm:px-6">
          <div>
            <p className="text-sm font-semibold">Draft preview</p>
            <p className="text-xs text-content-muted">An approximate preview of the public content. Nothing is saved or published.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-content-secondary transition-colors hover:bg-surface-raised hover:text-content"
            aria-label="Close project preview"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <article>
          {hasImage ? (
            <div className="relative aspect-[16/7] overflow-hidden bg-surface">
              <Image src={image!} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-9">
                <p className="mb-3 text-sm text-white/80">{draft.category}{draft.subcategory ? ` · ${draft.subcategory}` : ''}</p>
                <h1 id="project-preview-title" className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
                  {draft.title || 'Untitled project'}
                </h1>
              </div>
            </div>
          ) : (
            <div className="border-b border-line bg-surface px-5 py-12 sm:px-9">
              <p className="mb-3 text-sm text-content-muted">{draft.category}{draft.subcategory ? ` · ${draft.subcategory}` : ''}</p>
              <h1 id="project-preview-title" className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
                {draft.title || 'Untitled project'}
              </h1>
              <p className="mt-3 text-sm text-content-muted">Add a thumbnail or hero image in Media to give this page a visual header.</p>
            </div>
          )}

          <div className="mx-auto max-w-4xl px-5 py-7 sm:px-9 sm:py-10">
            <div className="flex flex-wrap gap-2 text-xs">
              {[draft.status, draft.difficulty].filter(Boolean).map((item) => (
                <span key={item} className="rounded-full border border-line px-3 py-1.5 capitalize text-content-secondary">{item.replace('-', ' ')}</span>
              ))}
              {(draft.estimatedCost.label?.trim() || (draft.estimatedCost.amount !== null && draft.estimatedCost.amount > 0)) && (
                <span className="rounded-full border border-line px-3 py-1.5 text-content-secondary">
                  Approx. {draft.estimatedCost.label?.trim() && !/^\s*[\d,]+(?:\.\d+)?\s*$/.test(draft.estimatedCost.label)
                    ? draft.estimatedCost.label
                    : `${draft.estimatedCost.currency} ${Number(draft.estimatedCost.amount).toLocaleString()}`}
                </span>
              )}
            </div>

            {draft.shortDescription && (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-content-secondary sm:text-xl">{draft.shortDescription}</p>
            )}

            {draft.technologies.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {draft.technologies.map((item) => <span key={item} className="rounded-md bg-surface-raised px-3 py-1.5 text-sm text-content-secondary">{item}</span>)}
              </div>
            )}

            {draft.media.gallery.length > 0 && (
              <section className="mt-10">
                <h2 className="text-xl font-semibold">Gallery</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {draft.media.gallery.map((item, index) => (
                    <figure key={item.url} className="overflow-hidden rounded-xl border border-line">
                      <img src={item.url} alt={item.alt} className="aspect-[4/3] w-full object-cover" />
                      {item.caption && <figcaption className="px-3 py-2 text-sm text-content-secondary">{item.caption}</figcaption>}
                      {!item.caption && <figcaption className="px-3 py-2 text-xs text-content-muted">Gallery image {index + 1}</figcaption>}
                    </figure>
                  ))}
                </div>
              </section>
            )}

            {draft.description.trim() && <PreviewSection title="Overview"><Prose text={draft.description} /></PreviewSection>}
            {draft.problemStatement.trim() && <PreviewSection title="The Problem"><Prose text={draft.problemStatement} /></PreviewSection>}
            {draft.objectives.filter(Boolean).length > 0 && <PreviewSection title="Objectives"><BulletList items={draft.objectives.filter(Boolean)} /></PreviewSection>}
            {draft.solutionOverview.trim() && <PreviewSection title="The Solution"><Prose text={draft.solutionOverview} /></PreviewSection>}
            {draft.howItWorks.trim() && <PreviewSection title="How It Works"><Prose text={draft.howItWorks} /></PreviewSection>}
            {draft.features.filter(Boolean).length > 0 && <PreviewSection title="Key Features"><BulletList items={draft.features.filter(Boolean)} /></PreviewSection>}
            {draft.challenges.filter(Boolean).length > 0 && <PreviewSection title="Challenges"><BulletList items={draft.challenges.filter(Boolean)} /></PreviewSection>}
            {draft.results.trim() && <PreviewSection title="Results"><Prose text={draft.results} /></PreviewSection>}

            {draft.components.filter((item) => item.name.trim()).length > 0 && (
              <PreviewSection title="Components">
                <div className="overflow-x-auto rounded-xl border border-line">
                  <table className="w-full min-w-[520px] text-left text-sm">
                    <thead className="bg-surface-raised text-content-secondary"><tr><th className="px-3 py-3 font-semibold">Name</th><th className="px-3 py-3 font-semibold">Type</th><th className="px-3 py-3 font-semibold">Quantity</th><th className="px-3 py-3 font-semibold">Notes</th></tr></thead>
                    <tbody>{draft.components.filter((item) => item.name.trim()).map((item, index) => (
                      <tr key={`${item.name}-${index}`} className="border-t border-line">
                        <td className="px-3 py-3 font-medium">{item.name}{item.optional && <span className="ml-2 rounded bg-surface-raised px-1.5 py-0.5 text-xs text-content-muted">Optional</span>}</td>
                        <td className="px-3 py-3 text-content-secondary">{item.category || '—'}</td>
                        <td className="px-3 py-3 text-content-secondary">{item.quantity || '—'}</td>
                        <td className="px-3 py-3 text-content-secondary"><InlineText text={item.notes || '—'} /></td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              </PreviewSection>
            )}

            {draft.specifications.filter((item) => item.label.trim()).length > 0 && (
              <PreviewSection title="Specifications">
                <div className="overflow-hidden rounded-xl border border-line">
                  {draft.specifications.filter((item) => item.label.trim()).map((item, index) => (
                    <div key={`${item.label}-${index}`} className="grid gap-1 border-b border-line px-4 py-3 last:border-b-0 sm:grid-cols-2">
                      <span className="font-medium">{item.label}</span><span className="text-content-secondary"><InlineText text={item.value || '—'} /></span>
                    </div>
                  ))}
                </div>
              </PreviewSection>
            )}

            {draft.tags.filter(Boolean).length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2 border-t border-line pt-6">
                {draft.tags.filter(Boolean).map((item) => <span key={item} className="text-xs text-content-muted">#{item.replace(/\s+/g, '')}</span>)}
              </div>
            )}

            <div className="mt-10 border-t border-line pt-5 text-xs text-content-muted">
              <ExternalLink size={13} className="mr-1 inline" aria-hidden="true" />
              This preview is for content checking. The final public layout may differ slightly.
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

function PreviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 border-t border-line pt-7">
      <h2 className="mb-4 text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
      {children}
    </section>
  );
}
