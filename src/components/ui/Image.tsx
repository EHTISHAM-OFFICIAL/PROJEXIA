import { useEffect, useState } from 'react';
import { ImageOff } from 'lucide-react';
import { imgbbService } from '../../services/imgbbService';
import { cn } from '../../utils/cn';

interface ImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  /** Skip lazy loading for above-the-fold images. */
  eager?: boolean;
}

/**
 * Lazy-loads images, tries a saved secondary host only after the primary URL
 * fails, and then shows a neutral placeholder. Legacy single-host images work
 * without a metadata lookup unless their load fails.
 */
export function Image({ src, alt, className, eager = false }: ImageProps) {
  const [displaySrc, setDisplaySrc] = useState(src);
  const [failed, setFailed] = useState(false);
  const [fallbackTried, setFallbackTried] = useState(false);

  useEffect(() => {
    setDisplaySrc(src);
    setFailed(false);
    setFallbackTried(false);
  }, [src]);

  const handleError = async () => {
    if (!fallbackTried && src) {
      setFallbackTried(true);
      const backup = await imgbbService.getBackupImageUrl(src);
      if (backup && backup !== src) {
        setDisplaySrc(backup);
        return;
      }
    }
    setFailed(true);
  };

  if (!displaySrc || failed) {
    return (
      <div
        className={cn('flex items-center justify-center bg-surface-raised text-content-muted', className)}
        role="img"
        aria-label={alt}
      >
        <ImageOff size={22} aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={displaySrc}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
      onError={() => void handleError()}
      className={className}
    />
  );
}
