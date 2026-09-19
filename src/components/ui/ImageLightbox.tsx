import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Image } from './Image';
import type { GalleryImage } from '../../types/project';

interface ImageLightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ImageLightbox({ images, index, onClose, onNavigate }: ImageLightboxProps) {
  const active = images[index];
  const hasMultiple = images.length > 1;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight' && hasMultiple) onNavigate((index + 1) % images.length);
      if (event.key === 'ArrowLeft' && hasMultiple) {
        onNavigate((index - 1 + images.length) % images.length);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [index, images.length, hasMultiple, onClose, onNavigate]);

  if (!active) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={active.alt || 'Image viewer'}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image viewer"
        className="absolute right-4 top-4 z-10 rounded-full bg-surface/80 p-2.5 text-content backdrop-blur transition-colors hover:text-accent"
      >
        <X size={20} />
      </button>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate((index - 1 + images.length) % images.length);
            }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-surface/80 p-2.5 text-content backdrop-blur transition-colors hover:text-accent sm:left-6"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNavigate((index + 1) % images.length);
            }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-surface/80 p-2.5 text-content backdrop-blur transition-colors hover:text-accent sm:right-6"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      <figure
        className="flex max-h-full max-w-4xl flex-col items-center gap-4"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={active.url}
          alt={active.alt || 'Project photograph'}
          eager
          className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain"
        />
        <figcaption className="flex items-center gap-3 text-sm text-content-secondary">
          {active.caption && <span>{active.caption}</span>}
          {hasMultiple && (
            <span className="font-mono text-xs text-content-muted">
              {index + 1} / {images.length}
            </span>
          )}
        </figcaption>
      </figure>
    </div>
  );
}
