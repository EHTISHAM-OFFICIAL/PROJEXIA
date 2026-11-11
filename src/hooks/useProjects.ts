import { useMemo } from 'react';
import { projectService } from '../services/projectService';
import type { Project, ProjectFilters } from '../types/project';
import { useAsync } from './useAsync';

export function usePublishedProjects() {
  return useAsync<Project[]>(() => projectService.getPublishedProjects(), []);
}

export function useFeaturedProjects() {
  return useAsync<Project[]>(() => projectService.getFeaturedProjects(), []);
}

export function useAllProjects() {
  return useAsync<Project[]>(() => projectService.getAllProjects(), []);
}

export const EMPTY_FILTERS: ProjectFilters = {
  search: '',
  category: '',
  technology: '',
  difficulty: '',
  status: '',
  sort: 'newest',
};

/** Applies search, filters and sorting to an already-fetched list. */
export function useFilteredProjects(projects: Project[] | null, filters: ProjectFilters): Project[] {
  return useMemo(() => {
    if (!projects) return [];
    const term = filters.search.trim().toLowerCase();

    const matched = projects.filter((project) => {
      if (filters.category && project.category !== filters.category) return false;
      if (filters.difficulty && project.difficulty !== filters.difficulty) return false;
      if (filters.status && project.status !== filters.status) return false;
      if (filters.technology && !project.technologies.includes(filters.technology)) return false;

      if (!term) return true;
      const haystack = [
        project.title,
        project.shortDescription,
        project.category,
        ...project.technologies,
        ...project.tags,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(term);
    });

    const sorted = [...matched];
    const time = (value: Project['createdAt'] | Project['updatedAt'] | Project['completedAt']) => value?.toMillis?.() ?? (value?.seconds ? value.seconds * 1000 : 0);
    switch (filters.sort) {
      case 'oldest':
        sorted.sort((a, b) => time(a.createdAt) - time(b.createdAt));
        break;
      case 'updated':
        sorted.sort((a, b) => time(b.updatedAt) - time(a.updatedAt));
        break;
      case 'release':
        sorted.sort((a, b) => time(b.completedAt || b.createdAt) - time(a.completedAt || a.createdAt));
        break;
      case 'popular':
        sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || b.viewCount - a.viewCount);
        break;
      case 'views':
        sorted.sort((a, b) => b.viewCount - a.viewCount);
        break;
      case 'title-asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'newest':
      default:
        sorted.sort((a, b) => time(b.createdAt) - time(a.createdAt));
        break;
    }
    return sorted;
  }, [projects, filters]);
}

/** Every technology present in the current project set, for the filter dropdown. */
export function useTechnologyOptions(projects: Project[] | null): string[] {
  return useMemo(() => {
    if (!projects) return [];
    const set = new Set<string>();
    projects.forEach((project) => project.technologies.forEach((tech) => set.add(tech)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [projects]);
}

/** How many published projects fall in each category, for the filter chips. */
export function useCategoryCounts(projects: Project[] | null): Record<string, number> {
  return useMemo(() => {
    const counts: Record<string, number> = {};
    if (!projects) return counts;
    for (const project of projects) {
      counts[project.category] = (counts[project.category] ?? 0) + 1;
    }
    return counts;
  }, [projects]);
}
