import { bannerService } from '../services/bannerService';
import type { SiteBanner } from '../types/banner';
import { useAsync } from './useAsync';

export function useBanner() {
  return useAsync<SiteBanner>(() => bannerService.getBanner(), []);
}
