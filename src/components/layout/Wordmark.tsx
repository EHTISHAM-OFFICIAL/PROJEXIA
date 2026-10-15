import { useSiteSettings } from '../../contexts/SiteSettingsContext';

export function Wordmark({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const { settings } = useSiteSettings();
  const box = size === 'sm' ? 'h-7 w-7 text-xs' : 'h-8 w-8 text-sm';
  const text = size === 'sm' ? 'text-base' : 'text-lg';
  const initial = settings.name.trim().charAt(0).toUpperCase() || 'P';

  return (
    <span className="flex items-center gap-2.5">
      <span
        className={`flex ${box} items-center justify-center rounded-md bg-accent/15 font-mono font-semibold text-accent`}
        aria-hidden="true"
      >
        {initial}
      </span>
      <span className={`${text} font-display font-semibold tracking-tight`}>{settings.name}</span>
    </span>
  );
}
