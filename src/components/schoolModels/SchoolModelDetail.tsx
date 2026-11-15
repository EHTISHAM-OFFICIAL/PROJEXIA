import type { ReactNode } from 'react';
import { ArrowRight, BookOpen, PlayCircle, ShieldAlert } from 'lucide-react';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { ButtonLink } from '../ui/Button';
import { DetailHeader } from '../detail/DetailHeader';
import { FactGrid } from '../detail/FactGrid';
import { SectionChips, SectionList } from '../detail/SectionNav';
import { CtaPanel } from '../detail/CtaPanel';
import { SpecList } from '../detail/SpecList';
import { ComponentList } from '../detail/ComponentList';
import { buildNavGroups } from '../detail/sections';
import { ProjectGallery } from '../projects/ProjectGallery';
import { BulletList, CaseStudySection, InlineText, Prose } from '../projects/CaseStudySection';
import { SchoolModelCard } from './SchoolModelCard';
import { safeHttpUrl } from '../../utils/safeUrl';
import type { SchoolModel } from '../../services/schoolModelService';

function Subsection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <h3 className="text-lg font-semibold leading-snug tracking-tight sm:text-xl">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export function SchoolModelDetail({ model, related }: { model: SchoolModel; related: SchoolModel[] }) {
  const quoteTo = '/request-school-model?slug=' + encodeURIComponent(model.slug);
  const video = safeHttpUrl(model.videoUrl);
  const lesson = safeHttpUrl(model.documentationUrl);

  const galleryImages = model.galleryUrls.filter((url, index, urls) => Boolean(url) && urls.indexOf(url) === index);
  const parts = (model.components ?? []).filter((part) => part.name.trim());
  const specs = (model.specifications ?? []).filter((spec) => spec.label.trim());
  const features = model.features ?? [];
  const customization = model.customizationOptions ?? [];
  const tags = model.tags ?? [];

  const hasAbout = Boolean(model.description || model.problemStatement || model.objectives.length > 0);
  const hasUse = Boolean(model.workingPrinciple || model.howToUse || model.setupInstructions || model.safetyNotes);
  const hasParts = parts.length > 0 || model.materials.length > 0 || features.length > 0 || customization.length > 0;
  const hasDetails = specs.length > 0 || Boolean(model.maintenanceNotes) || tags.length > 0;

  const groups = buildNavGroups([
    { label: 'About', sections: [{ id: 'about', present: hasAbout }] },
    { label: 'Photos', sections: [{ id: 'photos', present: galleryImages.length > 0 }] },
    { label: 'How to use', sections: [{ id: 'use', present: hasUse }] },
    { label: "What's included", sections: [{ id: 'parts', present: hasParts }] },
    { label: 'Details', sections: [{ id: 'details', present: hasDetails }] },
  ]);

  const secondary = [
    video && { href: video, label: 'Watch demo', icon: PlayCircle },
    lesson && { href: lesson, label: 'Resources', icon: BookOpen },
  ].filter((link): link is { href: string; label: string; icon: typeof PlayCircle } => Boolean(link));

  return (
    <>
      <DetailHeader
        backTo="/school-projects"
        backLabel="All school models"
        badges={
          <>
            <Badge tone="accent" className="px-2.5 py-1 text-[13px]">{model.category}</Badge>
            {model.subcategory && <Badge className="px-2.5 py-1 text-[13px]">{model.subcategory}</Badge>}
            {model.status && <Badge className="px-2.5 py-1 text-[13px]">{model.status}</Badge>}
          </>
        }
        title={model.title}
        summary={model.shortDescription}
        image={{
          src: model.heroImageUrl || model.thumbnailUrl,
          alt: model.title,
          fit: 'contain',
        }}
        actions={
          <>
            <ButtonLink to={quoteTo} size="lg" className="w-full sm:w-auto">
              Request a quote
              <ArrowRight size={17} aria-hidden="true" />
            </ButtonLink>
            {secondary.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
                {secondary.map((link) => (
                  <ButtonLink key={link.label} to={link.href} external variant="secondary" size="lg" className="w-full sm:w-auto">
                    <link.icon size={16} aria-hidden="true" />
                    {link.label}
                  </ButtonLink>
                ))}
              </div>
            )}
          </>
        }
      >
        <FactGrid
          facts={[
            { label: 'Subject', value: model.subject },
            { label: 'Suitable for', value: model.gradeRange },
            { label: 'Format', value: model.modelType },
            { label: 'Difficulty', value: model.difficulty },
            { label: 'Dimensions', value: model.dimensions },
            { label: 'Preparation time', value: model.estimatedBuildTime },
          ]}
        />
      </DetailHeader>

      {/* The chip bar is sticky only within this wrapper, so it releases when the content ends. */}
      <div>
      <SectionChips groups={groups} />

      <Container className="pt-4 sm:pt-6">
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
          <div className="flex min-w-0 flex-col gap-8 sm:gap-10">
            <CaseStudySection id="about" title="About this model" empty={!hasAbout}>
              <div className="flex flex-col gap-9">
                {model.description && <Prose text={model.description} size="reading" />}
                {model.problemStatement && (
                  <Subsection title="Why it helps">
                    <Prose text={model.problemStatement} size="reading" />
                  </Subsection>
                )}
                {model.objectives.length > 0 && (
                  <Subsection title="Learning objectives">
                    <BulletList items={model.objectives} variant="check" />
                  </Subsection>
                )}
              </div>
            </CaseStudySection>

            <CaseStudySection id="photos" title="Photos" empty={galleryImages.length === 0}>
              <ProjectGallery
                images={galleryImages.map((url, index) => ({
                  url,
                  alt: `${model.title}, view ${index + 1}`,
                  caption: null,
                  order: index,
                }))}
              />
            </CaseStudySection>

            <CaseStudySection id="use" title="How it works and how to use it" empty={!hasUse}>
              <div className="flex flex-col gap-9">
                {model.workingPrinciple && (
                  <Subsection title="How it works">
                    <Prose text={model.workingPrinciple} size="reading" />
                  </Subsection>
                )}
                {model.howToUse && (
                  <Subsection title="How to use it">
                    <Prose text={model.howToUse} size="reading" />
                  </Subsection>
                )}
                {model.setupInstructions && (
                  <Subsection title="Setup and demonstration">
                    <Prose text={model.setupInstructions} size="reading" />
                  </Subsection>
                )}
                {model.safetyNotes && (
                  <aside className="rounded-card border border-state-warning/30 bg-state-warning/5 p-5 sm:p-6">
                    <h3 className="flex items-center gap-2.5 text-lg font-semibold leading-snug tracking-tight">
                      <ShieldAlert size={20} className="shrink-0 text-state-warning" aria-hidden="true" />
                      Handling and safety
                    </h3>
                    <div className="mt-3">
                      <Prose text={model.safetyNotes} size="reading" />
                    </div>
                  </aside>
                )}
              </div>
            </CaseStudySection>

            <CaseStudySection id="parts" title="What's included" empty={!hasParts}>
              <div className="flex flex-col gap-9">
                {parts.length > 0 && (
                  <Subsection title="Included parts">
                    <ComponentList components={parts} />
                  </Subsection>
                )}
                {model.materials.length > 0 && (
                  <Subsection title="Materials">
                    <BulletList items={model.materials} />
                  </Subsection>
                )}
                {features.length > 0 && (
                  <Subsection title="Key features">
                    <BulletList items={features} />
                  </Subsection>
                )}
                {customization.length > 0 && (
                  <Subsection title="Customization options">
                    <BulletList items={customization} />
                  </Subsection>
                )}
              </div>
            </CaseStudySection>

            <CaseStudySection id="details" title="Specifications and care" empty={!hasDetails}>
              <div className="flex flex-col gap-9">
                {specs.length > 0 && (
                  <SpecList
                    items={specs.map((spec) => ({
                      label: spec.label,
                      value: <InlineText text={spec.value} allowLinks={false} />,
                    }))}
                  />
                )}
                {model.maintenanceNotes && (
                  <Subsection title="Care and storage">
                    <Prose text={model.maintenanceNotes} size="reading" />
                  </Subsection>
                )}
                {tags.length > 0 && (
                  <ul className="flex flex-wrap gap-2" aria-label="Topics">
                    {tags.map((tag, index) => (
                      <li key={`${tag}-${index}`}>
                        <Badge className="px-2.5 py-1 text-[13px]">{tag}</Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </CaseStudySection>
          </div>

          <aside className="hidden min-w-0 lg:block">
            <div className="sticky top-28 flex flex-col gap-8">
              <SectionList groups={groups} />
              <div className="card p-5">
                <h2 className="text-base font-semibold tracking-tight">Need this model for your school?</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-content-secondary">
                  Request a quote based on your quantity, size and requirements.
                </p>
                <ButtonLink to={quoteTo} className="mt-4 w-full">
                  Request a quote
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </Container>
      </div>

      <Container className="pb-14 pt-14 sm:pb-20 sm:pt-20">
        <div>
          <CtaPanel
            title="Need this model for your school?"
            description="Request a quote based on your quantity, size and requirements. No fixed price is assumed, so the quote fits what you actually need."
            primary={{ to: quoteTo, label: 'Request a quote' }}
            secondary={{ to: '/contact', label: 'Ask a question first' }}
          />
        </div>

        {related.length > 0 && (
          <section className="mt-16 border-t border-line pt-10 sm:mt-20 sm:pt-14">
            <h2 className="text-[1.5rem] font-semibold tracking-tight sm:text-3xl">More school models</h2>
            <div className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <SchoolModelCard key={item.id} model={item} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
