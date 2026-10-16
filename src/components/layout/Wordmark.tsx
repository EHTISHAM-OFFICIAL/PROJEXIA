import { SITE } from '@/constants/site';

export function Wordmark() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <img src="/favicon.svg" alt="" width={32} height={32} className="h-8 w-8 rounded-lg" />
      <span className="font-display text-lg font-bold tracking-tight text-content">{SITE.name}</span>
    </span>
  );
}
