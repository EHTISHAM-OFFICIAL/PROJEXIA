import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  /** Skip lazy loading for above-the-fold images. */
  eager?: boolean;
}

/** Lazy-loads by default and shows a neutral placeholder if the URL is missing or broken. */
export function Image({ src, alt, className, eager = false }: ImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
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
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
