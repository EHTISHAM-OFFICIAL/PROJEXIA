import { blogService } from '../services/blogService';
import type { BlogPost } from '../types/blog';
import { useAsync } from './useAsync';

export function usePublishedPosts() {
  return useAsync<BlogPost[]>(() => blogService.getPublishedPosts(), []);
}

export function useAllPosts() {
  return useAsync<BlogPost[]>(() => blogService.getAllPosts(), []);
}

export function usePost(slug: string | undefined) {
  return useAsync<BlogPost | null>(
    () => (slug ? blogService.getPostBySlug(slug) : Promise.resolve(null)),
    [slug]
  );
}

export function usePostById(id: string | undefined) {
  return useAsync<BlogPost | null>(
    () => (id ? blogService.getPostById(id) : Promise.resolve(null)),
    [id]
  );
}
