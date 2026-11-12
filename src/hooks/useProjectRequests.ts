import { requestService } from '../services/requestService';
import type { AdminProjectRequest } from '../types/projectRequest';
import { useAsync } from './useAsync';

/** Admin screens only: includes the admin-only record for each request. */
export function useProjectRequests() {
  return useAsync<AdminProjectRequest[]>(() => requestService.getRequests(), []);
}

export function useProjectRequest(id: string | undefined) {
  return useAsync<AdminProjectRequest | null>(
    () => (id ? requestService.getRequestById(id) : Promise.resolve(null)),
    [id]
  );
}
