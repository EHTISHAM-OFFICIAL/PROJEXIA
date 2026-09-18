import { useMemo } from 'react';
import { projectService } from '../services/projectService';
import type { Project, ProjectFilters } from '../types/project';
import { useAsync } from './useAsync';

export function usePublishedProjects() {
  return useAsync<Project[]>(() => projectService.getPublishedProjects(), []);
}

export function useFeaturedProjects(limitCount = 3) {
  return useAsync<Project[]>(() => projectService.getFeaturedProjects(limitCount), [limitCount]);
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
    switch (filters.sort) {
      case 'oldest':
        sorted.reverse();
        break;
      case 'title-asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break; // already newest-first from Firestore
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
