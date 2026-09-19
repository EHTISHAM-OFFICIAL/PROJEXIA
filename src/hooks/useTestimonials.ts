import { testimonialService } from '../services/testimonialService';
import type { Testimonial } from '../types/testimonial';
import { useAsync } from './useAsync';

export function usePublishedTestimonials() {
  return useAsync<Testimonial[]>(() => testimonialService.getPublished(), []);
}

export function useAllTestimonials() {
  return useAsync<Testimonial[]>(() => testimonialService.getAll(), []);
}

export function useTestimonial(id: string | undefined) {
  return useAsync<Testimonial | null>(
    () => (id ? testimonialService.getById(id) : Promise.resolve(null)),
    [id]
  );
}
