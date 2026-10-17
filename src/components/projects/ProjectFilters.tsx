import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Select, TextInput } from '../forms/Inputs';
import { PROJECT_CATEGORIES, sortProjectCategories } from '../../constants/categories';
import {
  PROJECT_DIFFICULTIES,
  PROJECT_SORT_OPTIONS,
  PROJECT_STATUSES,
} from '../../constants/projectOptions';
import type { ProjectFilters as Filters, ProjectSortKey } from '../../types/project';
import { EMPTY_FILTERS } from '../../hooks/useProjects';
import { cn } from '../../utils/cn';

interface ProjectFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  technologies: string[];
  difficulties: string[];
  statuses: string[];
  /** Count of published projects per category, so chips can show "IoT (5)". */
  categoryCounts: Record<string, number>;
  totalCount: number;
  resultCount: number;
}

export function ProjectFilters({
  filters,
  onChange,
  technologies,
  difficulties,
  statuses,
  categoryCounts,
  totalCount,
  resultCount,
}: ProjectFiltersProps) {
  const update = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    onChange({ ...filters, [key]: value });

  const activeCount = [
    filters.category,
    filters.technology,
    filters.difficulty,
    filters.status,
  ].filter(Boolean).length;

  const hasAnyFilter = activeCount > 0 || filters.search !== '';
  const difficultyOptions = [
    ...PROJECT_DIFFICULTIES,
    ...difficulties.filter((value) => !PROJECT_DIFFICULTIES.some((option) => option.value === value)).map((value) => ({ value, label: value })),
  ];
  const statusOptions = [
    ...PROJECT_STATUSES,
    ...statuses.filter((value) => !PROJECT_STATUSES.some((option) => option.value === value)).map((value) => ({ value, label: value })),
  ];

  // Only categories that actually have a published project — no dead-end
  // chips pointing at an empty result.
  const availableCategories = sortProjectCategories([...PROJECT_CATEGORIES, ...Object.keys(categoryCounts)]).filter(
    (category) => (categoryCounts[category] ?? 0) > 0
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Search
          size={17}
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-content-muted"
        />
        <TextInput
          type="search"
          value={filters.search}
          onChange={(event) => update('search', event.target.value)}
          placeholder="Search projects by name, technology or tag"
          aria-label="Search projects"
          className="pl-11"
        />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        <button
          type="button"
          onClick={() => update('category', '')}
          className={cn(
            'rounded-lg border px-3.5 py-2 text-sm transition-colors',
            filters.category === ''
              ? 'border-accent bg-accent text-onAccent'
              : 'border-line bg-surface text-content-secondary hover:border-line-strong hover:text-content'
          )}
        >
          All <span className="opacity-70">({totalCount})</span>
        </button>
        {availableCategories.map((category) => {
          const active = filters.category === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => update('category', active ? '' : category)}
              aria-pressed={active}
              className={cn(
                'rounded-lg border px-3.5 py-2 text-sm transition-colors',
                active
                  ? 'border-accent bg-accent text-onAccent'
                  : 'border-line bg-surface text-content-secondary hover:border-line-strong hover:text-content'
              )}
            >
              {category} <span className="opacity-70">({categoryCounts[category]})</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Select
          options={technologies}
          placeholder="All technologies"
          value={filters.technology}
          aria-label="Filter by technology"
          onChange={(event) => update('technology', event.target.value)}
        />
        <Select
          options={difficultyOptions}
          placeholder="Any difficulty"
          value={filters.difficulty}
          aria-label="Filter by difficulty"
          onChange={(event) => update('difficulty', event.target.value)}
        />
        <Select
          options={statusOptions}
          placeholder="Any status"
          value={filters.status}
          aria-label="Filter by status"
          onChange={(event) => update('status', event.target.value)}
        />
        <Select
          options={PROJECT_SORT_OPTIONS}
          value={filters.sort}
          aria-label="Sort projects"
          onChange={(event) => update('sort', event.target.value as ProjectSortKey)}
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="flex items-center gap-2 text-sm text-content-secondary">
          <SlidersHorizontal size={15} aria-hidden="true" className="text-content-muted" />
          <span aria-live="polite">
            {resultCount} {resultCount === 1 ? 'project' : 'projects'}
            {activeCount > 0 && ` · ${activeCount} ${activeCount === 1 ? 'filter' : 'filters'}`}
          </span>
        </p>
        {hasAnyFilter && (
          <button
            type="button"
            onClick={() => onChange(EMPTY_FILTERS)}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-content-secondary transition-colors hover:text-content"
          >
            <X size={14} aria-hidden="true" />
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
