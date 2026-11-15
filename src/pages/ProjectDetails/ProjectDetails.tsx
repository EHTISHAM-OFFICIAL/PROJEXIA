import { useParams } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { Seo } from '../../components/ui/Seo';
import { ButtonLink } from '../../components/ui/Button';
import { ErrorState } from '../../components/ui/ErrorState';
import { Skeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import { ProjectDetailView } from '../../components/projects/ProjectDetailView';
import { useProject, useRelatedProjects } from '../../hooks/useProject';

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

  const { media, seo } = project;
  const heroImage = media.heroImageUrl || media.thumbnailUrl;

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
      <ProjectDetailView project={project} related={related ?? []} />
    </>
  );
}
