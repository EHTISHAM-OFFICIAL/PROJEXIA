import { SITE } from '../../constants/site';

export function Wordmark({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const box = size === 'sm' ? 'h-7 w-7 text-xs' : 'h-8 w-8 text-sm';
  const text = size === 'sm' ? 'text-base' : 'text-lg';

  return (
    <span className="flex items-center gap-2.5">
      <span
        className={`flex ${box} items-center justify-center rounded-md bg-accent/15 font-mono font-semibold text-accent`}
        aria-hidden="true"
      >
        M
      </span>
      <span className={`${text} font-display font-semibold tracking-tight`}>{SITE.name}</span>
    </span>
  );
}
