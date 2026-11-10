import { ArrowRight } from 'lucide-react';
import { Section, SectionHeading } from '../ui/Section';
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
      <SectionHeading
        title="Selected work"
        description="A few builds that show the range — from a single sensor loop to a connected system."
      >
        <ButtonLink to="/projects" variant="primary" size="lg" className="w-full font-semibold shadow-md hover:shadow-lg sm:w-auto">
          View all electronics projects
          <ArrowRight size={15} aria-hidden="true" />
        </ButtonLink>
      </SectionHeading>

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
