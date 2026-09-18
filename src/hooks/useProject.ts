import { useEffect } from 'react';
import { projectService } from '../services/projectService';
import type { Project } from '../types/project';
import { useAsync } from './useAsync';

export function useProject(slug: string | undefined) {
  const state = useAsync<Project | null>(
    () => (slug ? projectService.getProjectBySlug(slug) : Promise.resolve(null)),
    [slug]
  );

  useEffect(() => {
    if (state.data?.id) projectService.incrementViewCount(state.data.id);
  }, [state.data?.id]);

  return state;
}

export function useProjectById(id: string | undefined) {
  return useAsync<Project | null>(
    () => (id ? projectService.getProjectById(id) : Promise.resolve(null)),
    [id]
  );
}

export function useRelatedProjects(project: Project | null) {
  return useAsync<Project[]>(
    () => (project ? projectService.getRelatedProjects(project) : Promise.resolve([])),
    [project?.id]
  );
}
