import { ArrowRight } from 'lucide-react';
import { Section } from '../ui/Section';
import { HomeHeading } from './HomeHeading';
import { ButtonLink } from '../ui/Button';
import { EmptyState } from '../ui/EmptyState';
import { ErrorState } from '../ui/ErrorState';
import { ProjectGrid } from '../projects/ProjectGrid';
import { ProjectGridSkeleton } from '../ui/Skeleton';
import { useFeaturedProjects } from '../../hooks/useProjects';

export function FeaturedProjects() {
  const { data, loading, error, reload } = useFeaturedProjects();

  return (
    <Section className="border-b border-line">
      <HomeHeading
        title="Selected work"
        description="Explore the electronics and mechanical builds currently featured by ProjexiaHub."
      >
        <ButtonLink to="/projects" variant="primary" size="lg" className="w-full font-semibold shadow-md hover:shadow-lg sm:w-auto">
          View all electronics projects
          <ArrowRight size={15} aria-hidden="true" />
        </ButtonLink>
      </HomeHeading>

      <div className="mt-12">
        {loading && <ProjectGridSkeleton count={3} />}
        {!loading && error && <ErrorState message={error} onRetry={reload} />}
        {!loading && !error && data && data.length === 0 && (
          <EmptyState
            title="No featured projects yet"
            description="Projects marked as featured in the admin dashboard appear here."
            action={
              <ButtonLink to="/projects" variant="secondary" size="sm">
                Browse all projects
              </ButtonLink>
            }
          />
        )}
        {!loading && !error && data && data.length > 0 && <ProjectGrid projects={data} />}
      </div>
    </Section>
  );
}
