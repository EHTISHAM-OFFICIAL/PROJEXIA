import { useEffect, useMemo, useState } from 'react';
import { PageIntro } from '../../components/ui/PageIntro';
import { useSearchParams } from 'react-router-dom';
import { FolderSearch } from 'lucide-react';
import { Container } from '../../components/ui/Container';
import { Seo } from '../../components/ui/Seo';
import { Button, ButtonLink } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { ErrorState } from '../../components/ui/ErrorState';
import { ProjectGridSkeleton } from '../../components/ui/Skeleton';
import { ProjectFilters } from '../../components/projects/ProjectFilters';
import { ProjectGrid } from '../../components/projects/ProjectGrid';
import {
  EMPTY_FILTERS,
  useCategoryCounts,
  useFilteredProjects,
  usePublishedProjects,
  useTechnologyOptions,
} from '../../hooks/useProjects';
import { useDebounce } from '../../hooks/useDebounce';
import { PROJECTS_PER_PAGE } from '../../constants/projectOptions';
import type { ProjectFilters as Filters } from '../../types/project';
import { useSiteSettings } from '../../contexts/SiteSettingsContext';
import { schoolModelService, DEFAULT_SCHOOL_SETTINGS } from '../../services/schoolModelService';
import type { SchoolSettings } from '../../services/schoolModelService';

export default function Projects() {
  const { settings } = useSiteSettings();
  const [catalogSettings, setCatalogSettings] = useState<SchoolSettings>(DEFAULT_SCHOOL_SETTINGS);
  useEffect(() => { let live = true; void schoolModelService.getSettings().then(s => { if (live) setCatalogSettings(s); }).catch(() => {}); return () => { live = false; }; }, []);
  const electronicsDisabled = !catalogSettings.electronicsEnabled;
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, loading, error, reload } = usePublishedProjects();

  const [filters, setFilters] = useState<Filters>({
    ...EMPTY_FILTERS,
    category: searchParams.get('category') ?? '',
  });
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);

  const debouncedSearch = useDebounce(filters.search, 250);
  const effectiveFilters = useMemo(
    () => ({ ...filters, search: debouncedSearch }),
    [filters, debouncedSearch]
  );

  const filtered = useFilteredProjects(data, effectiveFilters);
  const technologies = useTechnologyOptions(data);
  const categoryCounts = useCategoryCounts(data);
  const difficulties = [...new Set((data ?? []).map((project) => project.difficulty))];
  const statuses = [...new Set((data ?? []).map((project) => project.status))];
  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  // Reset paging whenever the result set changes, so "load more" never leaves a gap.
  useEffect(() => setVisibleCount(PROJECTS_PER_PAGE), [effectiveFilters]);

  // Keep the category filter in the URL so a filtered view can be linked or bookmarked.
  useEffect(() => {
    const next = new URLSearchParams();
    if (filters.category) next.set('category', filters.category);
    setSearchParams(next, { replace: true });
  }, [filters.category, setSearchParams]);

  if (electronicsDisabled) return <Container className="py-20"><Seo title="Electronics projects unavailable" noIndex /><h1 className="text-2xl font-semibold">The electronics project catalog is temporarily unavailable.</h1><p className="mt-3 text-content-secondary">You can still explore our school charts and educational models.</p><ButtonLink to="/school-projects" className="mt-5">Browse school models</ButtonLink></Container>;

  return (
    <>
      <Seo
        title="Electronics Projects & Prototypes"
        description={`Electronics projects built by ${settings.name} — embedded systems, IoT devices, automation and robotics, documented as case studies.`}
        path="/projects"
      />

      <PageIntro
        eyebrow="Project library"
        title="Projects"
        description="Every build is written up as a case study: the problem, the approach, the components and what the finished system does. Filter by platform, difficulty or status."
      />

      <Container className="py-8 sm:py-12">
        <ProjectFilters
          filters={filters}
          onChange={setFilters}
          technologies={technologies}
          difficulties={difficulties}
          statuses={statuses}
          categoryCounts={categoryCounts}
          totalCount={data?.length ?? 0}
          resultCount={filtered.length}
        />

        <div className="mt-7 sm:mt-10">
          {loading && <ProjectGridSkeleton count={6} />}

          {!loading && error && <ErrorState message={error} onRetry={reload} />}

          {!loading && !error && data?.length === 0 && (
            <EmptyState
              title="No projects published yet"
              description="Projects appear here once they are published from the admin dashboard."
              icon={<FolderSearch size={20} aria-hidden="true" />}
              action={
                <ButtonLink to="/request-project" size="sm">
                  Request a project
                </ButtonLink>
              }
            />
          )}

          {!loading && !error && data && data.length > 0 && filtered.length === 0 && (
            <EmptyState
              title="Nothing matches those filters"
              description="Try a different category or clear the filters to see everything."
              icon={<FolderSearch size={20} aria-hidden="true" />}
              action={
                <Button variant="secondary" size="sm" onClick={() => setFilters(EMPTY_FILTERS)}>
                  Clear filters
                </Button>
              }
            />
          )}

          {!loading && !error && visible.length > 0 && (
            <>
              <ProjectGrid projects={visible} />
              {hasMore && (
                <div className="mt-8 flex justify-center sm:mt-12">
                  <Button
                    variant="secondary"
                    className="w-full sm:w-auto"
                    onClick={() => setVisibleCount((count) => count + PROJECTS_PER_PAGE)}
                  >
                    Show more projects
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </Container>
    </>
  );
}
