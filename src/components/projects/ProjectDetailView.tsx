import { ArrowRight, BookOpen, ExternalLink, Github, PlayCircle } from 'lucide-react';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { ButtonLink } from '../ui/Button';
import { DetailHeader } from '../detail/DetailHeader';
import { FactGrid } from '../detail/FactGrid';
import { SectionChips, SectionList } from '../detail/SectionNav';
import { CtaPanel } from '../detail/CtaPanel';
import { SpecList } from '../detail/SpecList';
import { ComponentList } from '../detail/ComponentList';
import { buildNavGroups, numberSections } from '../detail/sections';
import { SectionHeading } from '../detail/SectionHeading';
import { ProjectGallery } from './ProjectGallery';
import { ProjectGrid } from './ProjectGrid';
import { BulletList, CaseStudySection, InlineText, Prose } from './CaseStudySection';
import { DIFFICULTY_LABEL, STATUS_LABEL, STATUS_TONE } from '../../constants/projectOptions';
import { formatCurrency, formatDate } from '../../utils/formatting';
import { safeHttpUrl } from '../../utils/safeUrl';
import type { Project } from '../../types/project';

/** The visible price text: an admin-entered label wins unless it is just a number. */
function costText(project: Project): string | null {
  const { estimatedCost } = project;
  const label = estimatedCost.label?.trim();
  if (label && !/^\s*[\d,]+(?:\.\d+)?\s*$/.test(label)) return label;
  if (estimatedCost.amount !== null && estimatedCost.amount !== undefined) {
    return formatCurrency(Number(estimatedCost.amount), estimatedCost.currency);
  }
  return label || null;
}

export function ProjectDetailView({ project, related }: { project: Project; related: Project[] }) {
  const { media, externalLinks } = project;
  const heroImage = media.heroImageUrl || media.thumbnailUrl;
  const github = safeHttpUrl(externalLinks.github);
  const documentation = safeHttpUrl(externalLinks.documentation);
  const demo = safeHttpUrl(externalLinks.demo);
  const video = safeHttpUrl(media.videoUrl);
  const hasGallery = media.gallery.length > 0;
  const hasSpecs = project.specifications.some((spec) => spec.label.trim() && spec.value.trim());

  // Numbers follow the sections that are actually shown, in page order.
  const numbers = numberSections([
    { id: 'overview', present: Boolean(project.description) },
    { id: 'problem', present: Boolean(project.problemStatement) },
    { id: 'objectives', present: project.objectives.length > 0 },
    { id: 'solution', present: Boolean(project.solutionOverview) },
    { id: 'how-it-works', present: Boolean(project.howItWorks) },
    { id: 'features', present: project.features.length > 0 },
    { id: 'components', present: project.components.length > 0 },
    { id: 'challenges', present: project.challenges.length > 0 },
    { id: 'results', present: Boolean(project.results) },
    { id: 'project-gallery', present: hasGallery },
    { id: 'demo-video', present: Boolean(video) },
    { id: 'specifications', present: hasSpecs },
  ]);

  const groups = buildNavGroups([
    {
      label: 'Overview',
      sections: [
        { id: 'overview', present: Boolean(project.description) },
        { id: 'problem', present: Boolean(project.problemStatement) },
        { id: 'objectives', present: project.objectives.length > 0 },
      ],
    },
    {
      label: 'Solution',
      sections: [
        { id: 'solution', present: Boolean(project.solutionOverview) },
        { id: 'how-it-works', present: Boolean(project.howItWorks) },
        { id: 'features', present: project.features.length > 0 },
      ],
    },
    { label: 'Components', sections: [{ id: 'components', present: project.components.length > 0 }] },
    {
      label: 'Results',
      sections: [
        { id: 'challenges', present: project.challenges.length > 0 },
        { id: 'results', present: Boolean(project.results) },
      ],
    },
    {
      label: 'Photos',
      sections: [
        { id: 'project-gallery', present: hasGallery },
        { id: 'demo-video', present: Boolean(video) },
      ],
    },
    { label: 'Specifications', sections: [{ id: 'specifications', present: hasSpecs }] },
  ]);

  const secondaryLinks = [
    github && { href: github, label: 'Source code', icon: Github },
    documentation && { href: documentation, label: 'Documentation', icon: BookOpen },
    demo && { href: demo, label: 'Live demo', icon: ExternalLink },
  ].filter((link): link is { href: string; label: string; icon: typeof Github } => Boolean(link));

  return (
    <>
      <DetailHeader
        backTo="/projects"
        backLabel="All projects"
        badges={
          <>
            <Badge tone={STATUS_TONE[project.status] ?? 'neutral'} className="px-2.5 py-1 text-[13px]">
              {STATUS_LABEL[project.status] ?? project.status}
            </Badge>
            <Badge tone="accent" className="px-2.5 py-1 text-[13px]">{project.category}</Badge>
            {project.subcategory && <Badge className="px-2.5 py-1 text-[13px]">{project.subcategory}</Badge>}
          </>
        }
        title={project.title}
        summary={project.shortDescription}
        image={{
          src: heroImage,
          alt: `${project.title}, illustrative project image`,
          galleryHref: hasGallery ? '#project-gallery' : undefined,
          note: hasGallery
            ? 'This preview image may be illustrative. The gallery contains photographs of the project build.'
            : undefined,
        }}
        actions={
          <>
            <ButtonLink to="/request-project" size="lg" className="w-full sm:w-auto">
              Request a similar project
              <ArrowRight size={17} aria-hidden="true" />
            </ButtonLink>
            {secondaryLinks.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
                {secondaryLinks.map((link) => (
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
            { label: 'Status', value: STATUS_LABEL[project.status] ?? project.status },
            { label: 'Difficulty', value: DIFFICULTY_LABEL[project.difficulty] ?? project.difficulty },
            { label: 'Completed', value: project.completedAt ? formatDate(project.completedAt) : null },
            { label: 'Approx. cost', value: costText(project) },
          ]}
        />
        {project.technologies.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm text-content-muted">Built with</span>
            {project.technologies.map((tech) => (
              <Badge key={tech} className="px-2.5 py-1 text-[13px]">
                <InlineText text={tech} allowLinks={false} />
              </Badge>
            ))}
          </div>
        )}
      </DetailHeader>

      {/* The chip bar is sticky only within this wrapper, so it releases when the content ends. */}
      <div>
      <SectionChips groups={groups} />

      <Container className="pt-4 sm:pt-6">
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
          <div className="flex min-w-0 flex-col gap-14 sm:gap-20">
            <CaseStudySection id="overview" number={numbers['overview']} title="Overview" empty={!project.description}>
              <Prose text={project.description} size="reading" />
            </CaseStudySection>

            <CaseStudySection id="problem" number={numbers['problem']} title="The problem" empty={!project.problemStatement}>
              <Prose text={project.problemStatement} size="reading" />
            </CaseStudySection>

            <CaseStudySection id="objectives" number={numbers['objectives']} title="Objectives" empty={project.objectives.length === 0}>
              <BulletList items={project.objectives} variant="check" />
            </CaseStudySection>

            <CaseStudySection id="solution" number={numbers['solution']} title="The solution" empty={!project.solutionOverview}>
              <Prose text={project.solutionOverview} size="reading" />
            </CaseStudySection>

            <CaseStudySection id="how-it-works" number={numbers['how-it-works']} title="How it works" empty={!project.howItWorks}>
              <Prose text={project.howItWorks} size="reading" />
            </CaseStudySection>

            <CaseStudySection id="features" number={numbers['features']} title="Features" empty={project.features.length === 0}>
              <BulletList items={project.features} />
            </CaseStudySection>

            <CaseStudySection id="components" number={numbers['components']} title="Components used" empty={project.components.length === 0}>
              <ComponentList components={project.components} />
            </CaseStudySection>

            <CaseStudySection id="challenges" number={numbers['challenges']} title="Challenges" empty={project.challenges.length === 0}>
              <BulletList items={project.challenges} />
            </CaseStudySection>

            <CaseStudySection id="results" number={numbers['results']} title="Results" empty={!project.results}>
              <Prose text={project.results} size="reading" />
            </CaseStudySection>

            <CaseStudySection id="project-gallery" number={numbers['project-gallery']} title="Project gallery" empty={!hasGallery}>
              <ProjectGallery images={media.gallery} />
            </CaseStudySection>

            <CaseStudySection id="demo-video" number={numbers['demo-video']} title="Demo video" empty={!video}>
              <ButtonLink to={video ?? '#'} external variant="secondary" size="lg" className="w-full sm:w-auto">
                <PlayCircle size={18} aria-hidden="true" />
                Watch the demo
              </ButtonLink>
            </CaseStudySection>

            <CaseStudySection id="specifications" number={numbers['specifications']} title="Specifications" empty={!hasSpecs}>
              <SpecList
                items={project.specifications
                  .filter((spec) => spec.label.trim() && spec.value.trim())
                  .map((spec) => ({
                    label: spec.label,
                    value: <InlineText text={spec.value} allowLinks={false} />,
                  }))}
              />
            </CaseStudySection>

            {project.tags.length > 0 && (
              <section aria-label="Tags" className="border-t border-line pt-8">
                <ul className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <Badge className="px-2.5 py-1 text-[13px]">
                        <InlineText text={tag} allowLinks={false} />
                      </Badge>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="hidden min-w-0 lg:block">
            <div className="sticky top-28 flex flex-col gap-8">
              <SectionList groups={groups} />
              <div className="card p-5">
                <h2 className="text-base font-semibold tracking-tight">Want something like this?</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-content-secondary">
                  ProjexiaHub can adapt this build to your requirements, or design something new.
                </p>
                <ButtonLink to="/request-project" className="mt-4 w-full">
                  Request a similar project
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
            title="Want something like this built?"
            description="Tell ProjexiaHub what you need. We can adapt this project to your requirements or design something new from scratch."
            primary={{ to: '/request-project', label: 'Request a similar project' }}
            secondary={{ to: '/contact', label: 'Ask a question first' }}
          />
        </div>

        {related.length > 0 && (
          <section className="mt-16 border-t border-line pt-10 sm:mt-20 sm:pt-14">
            <SectionHeading>Related projects</SectionHeading>
            <div className="mt-6 sm:mt-8">
              <ProjectGrid projects={related} />
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
