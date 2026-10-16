import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, ExternalLink, Github, PlayCircle } from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Seo } from '../../components/ui/Seo';
import { Badge } from '../../components/ui/Badge';
import { ButtonLink } from '../../components/ui/Button';
import { Image } from '../../components/ui/Image';
import { ErrorState } from '../../components/ui/ErrorState';
import { Skeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import { ProjectGallery } from '../../components/projects/ProjectGallery';
import { ProjectGrid } from '../../components/projects/ProjectGrid';
import { BulletList, CaseStudySection, Prose } from '../../components/projects/CaseStudySection';
import { useProject, useRelatedProjects } from '../../hooks/useProject';
import { DIFFICULTY_LABEL, STATUS_LABEL, STATUS_TONE } from '../../constants/projectOptions';
import { formatCurrency, formatDate } from '../../utils/formatting';

export default function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, loading, error, reload } = useProject(slug);
  const { data: related } = useRelatedProjects(project ?? null);

  if (loading) {
    return (
      <Container className="py-16">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-6 h-12 w-3/4" />
        <Skeleton className="mt-4 h-5 w-1/2" />
        <Skeleton className="mt-10 aspect-[16/9] w-full" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-16">
        <ErrorState message={error} onRetry={reload} />
      </Container>
    );
  }

  if (!project) {
    return (
      <Container className="py-16">
        <Seo title="Project not found" noIndex />
        <EmptyState
          title="That project isn't here"
          description="It may have been unpublished or the link may be wrong."
          action={
            <ButtonLink to="/projects" size="sm">
              Browse all projects
            </ButtonLink>
          }
        />
      </Container>
    );
  }

  const { media, externalLinks, estimatedCost, seo } = project;
  const heroImage = media.heroImageUrl || media.thumbnailUrl;
  const hasLinks = Boolean(externalLinks.github || externalLinks.documentation || externalLinks.demo);

  return (
    <>
      <Seo
        title={seo.metaTitle || project.title}
        description={seo.metaDescription || project.shortDescription}
        path={`/projects/${project.slug}`}
        image={heroImage || null}
        imageAlt={project.title}
        type="article"
        keywords={seo.keywords.length > 0 ? seo.keywords : [...project.tags, ...project.technologies]}
        modifiedTime={project.updatedAt?.toDate().toISOString() ?? null}
      />

      <Container className="pt-10">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 rounded-md py-2 text-sm text-content-secondary transition-colors hover:text-content"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          All projects
        </Link>
      </Container>

      <Container className="pb-12 pt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={STATUS_TONE[project.status]}>{STATUS_LABEL[project.status]}</Badge>
          <Badge tone="accent">{project.category}</Badge>
          <Badge>{DIFFICULTY_LABEL[project.difficulty]}</Badge>
          {project.subcategory && <Badge>{project.subcategory}</Badge>}
        </div>

        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
          {project.title}
        </h1>

        {project.shortDescription && (
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-content-secondary">
            {project.shortDescription}
          </p>
        )}

        {project.technologies.length > 0 && (
          <ul className="mt-7 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
          </ul>
        )}

        {hasLinks && (
          <div className="mt-8 flex flex-wrap gap-3">
            {externalLinks.github && (
              <ButtonLink to={externalLinks.github} external variant="secondary" size="sm">
                <Github size={15} aria-hidden="true" />
                Source code
              </ButtonLink>
            )}
            {externalLinks.documentation && (
              <ButtonLink to={externalLinks.documentation} external variant="secondary" size="sm">
                <BookOpen size={15} aria-hidden="true" />
                Documentation
              </ButtonLink>
            )}
            {externalLinks.demo && (
              <ButtonLink to={externalLinks.demo} external variant="secondary" size="sm">
                <ExternalLink size={15} aria-hidden="true" />
                Live demo
              </ButtonLink>
            )}
          </div>
        )}
      </Container>

      {heroImage && (
        <Container className="pb-14">
          <div className="overflow-hidden rounded-card border border-line bg-surface-raised">
            <Image
              src={heroImage}
              alt={`${project.title} — completed build`}
              eager
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        </Container>
      )}

      <Container className="pb-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
          <div className="flex min-w-0 flex-col gap-10">
            <CaseStudySection title="Overview" empty={!project.description}>
              <Prose text={project.description} />
            </CaseStudySection>

            <CaseStudySection title="The problem" empty={!project.problemStatement}>
              <Prose text={project.problemStatement} />
            </CaseStudySection>

            <CaseStudySection title="Objectives" empty={project.objectives.length === 0}>
              <BulletList items={project.objectives} />
            </CaseStudySection>

            <CaseStudySection title="The solution" empty={!project.solutionOverview}>
              <Prose text={project.solutionOverview} />
            </CaseStudySection>

            <CaseStudySection title="How it works" empty={!project.howItWorks}>
              <Prose text={project.howItWorks} />
            </CaseStudySection>

            <CaseStudySection title="Features" empty={project.features.length === 0}>
              <BulletList items={project.features} />
            </CaseStudySection>

            <CaseStudySection title="Components used" empty={project.components.length === 0}>
              <div className="overflow-x-auto rounded-card border border-line">
                <table className="w-full min-w-[520px] text-sm">
                  <thead>
                    <tr className="border-b border-line bg-surface text-left">
                      <th scope="col" className="px-4 py-3 font-medium">Component</th>
                      <th scope="col" className="px-4 py-3 font-medium">Type</th>
                      <th scope="col" className="px-4 py-3 font-medium">Qty</th>
                      <th scope="col" className="px-4 py-3 font-medium">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.components.map((component, index) => (
                      <tr key={index} className="border-b border-line last:border-0">
                        <td className="px-4 py-3 text-content">{component.name}</td>
                        <td className="px-4 py-3 text-content-secondary">{component.category || '—'}</td>
                        <td className="px-4 py-3 font-mono text-content-secondary">{component.quantity}</td>
                        <td className="px-4 py-3 text-content-secondary">{component.notes || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CaseStudySection>

            <CaseStudySection title="Challenges" empty={project.challenges.length === 0}>
              <BulletList items={project.challenges} />
            </CaseStudySection>

            <CaseStudySection title="Results" empty={!project.results}>
              <Prose text={project.results} />
            </CaseStudySection>

            <CaseStudySection title="Gallery" empty={media.gallery.length === 0}>
              <ProjectGallery images={media.gallery} />
            </CaseStudySection>

            <CaseStudySection title="Demo video" empty={!media.videoUrl}>
              <ButtonLink to={media.videoUrl ?? '#'} external variant="secondary">
                <PlayCircle size={16} aria-hidden="true" />
                Watch the demo
              </ButtonLink>
            </CaseStudySection>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card p-5">
              <h2 className="text-sm font-medium text-content">Project details</h2>
              <dl className="mt-4 flex flex-col gap-3.5 text-sm">
                <DetailRow label="Status" value={STATUS_LABEL[project.status]} />
                <DetailRow label="Category" value={project.category} />
                <DetailRow label="Difficulty" value={DIFFICULTY_LABEL[project.difficulty]} />
                {project.completedAt && (
                  <DetailRow label="Completed" value={formatDate(project.completedAt)} />
                )}
                {estimatedCost.amount !== null && (
                  <DetailRow
                    label="Approx. cost"
                    value={formatCurrency(estimatedCost.amount, estimatedCost.currency)}
                  />
                )}
                {project.specifications.map((spec) => (
                  <DetailRow key={spec.label} label={spec.label} value={spec.value} />
                ))}
              </dl>
            </div>

            <div className="card mt-5 p-5">
              <h2 className="text-base font-semibold tracking-tight">Want something like this?</h2>
              <p className="mt-2 text-sm leading-relaxed text-content-secondary">
                ProjexiaHub can adapt this build to your requirements, or design something new.
              </p>
              <ButtonLink to="/request-project" size="sm" className="mt-4 w-full">
                Request a similar project
              </ButtonLink>
            </div>

            {project.tags.length > 0 && (
              <div className="mt-5">
                <h2 className="sr-only">Tags</h2>
                <ul className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <Badge>{tag}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        {related && related.length > 0 && (
          <section className="mt-20 border-t border-line pt-14">
            <h2 className="text-2xl font-semibold tracking-tight">Related projects</h2>
            <div className="mt-8">
              <ProjectGrid projects={related} />
            </div>
          </section>
        )}
      </Container>
    </>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0">
      <dt className="shrink-0 text-content-muted">{label}</dt>
      <dd className="text-right text-content">{value}</dd>
    </div>
  );
}
