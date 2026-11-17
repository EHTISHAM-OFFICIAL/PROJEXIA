import { Loader2 } from 'lucide-react';

interface GoogleSignInButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function GoogleSignInButton({ onClick, loading = false, disabled = false }: GoogleSignInButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-line bg-surface px-5 text-sm font-semibold text-content shadow-sm transition-colors hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" aria-hidden="true" />
      ) : (
        <svg viewBox="0 0 48 48" className="h-[18px] w-[18px]" aria-hidden="true">
          <path fill="#FFC107" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.9 6.1-15Z" />
          <path fill="#FF3D00" d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4 1.9-6.9 1.9-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z" />
          <path fill="#4CAF50" d="M12.6 27.5a12 12 0 0 1 0-7V15H5.8a20 20 0 0 0 0 18l6.8-5.5Z" />
          <path fill="#1976D2" d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8A19.4 19.4 0 0 0 24 4 20 20 0 0 0 5.8 15l6.8 5.5c1.6-4.8 6.1-8.4 11.4-8.4Z" />
        </svg>
      )}
      {loading ? 'Connecting to Google…' : 'Continue with Google'}
    </button>
  );
}
