import { requestService } from '../services/requestService';
import type { ProjectRequest } from '../types/projectRequest';
import { useAsync } from './useAsync';

export function useProjectRequests() {
  return useAsync<ProjectRequest[]>(() => requestService.getRequests(), []);
}

export function useProjectRequest(id: string | undefined) {
  return useAsync<ProjectRequest | null>(
    () => (id ? requestService.getRequestById(id) : Promise.resolve(null)),
    [id]
  );
}
