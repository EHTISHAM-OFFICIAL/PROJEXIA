import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Image } from './Image';
import type { GalleryImage } from '../../types/project';
import { swipeDirection } from '../../utils/swipe';

interface ImageLightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ImageLightbox({ images, index, onClose, onNavigate }: ImageLightboxProps) {
  const active = images[index];
  const hasMultiple = images.length > 1;
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const step = (direction: 1 | -1) => onNavigate((index + direction + images.length) % images.length);

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
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] sm:p-8"
      onClick={onClose}
      onTouchStart={(event) => {
        const touch = event.touches[0];
        touchStart.current = { x: touch.clientX, y: touch.clientY };
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        touchStart.current = null;
        if (!start || !hasMultiple) return;
        const touch = event.changedTouches[0];
        const direction = swipeDirection(touch.clientX - start.x, touch.clientY - start.y);
        if (direction === 'next') step(1);
        if (direction === 'prev') step(-1);
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image viewer"
        className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-10 grid h-11 w-11 place-items-center rounded-full bg-surface/80 text-content backdrop-blur transition-colors hover:text-accent"
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
            className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-surface/80 text-content backdrop-blur transition-colors hover:text-accent sm:left-6 sm:grid"
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
            className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-surface/80 text-content backdrop-blur transition-colors hover:text-accent sm:right-6 sm:grid"
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
        <figcaption className="flex flex-col items-center gap-1 px-2 text-center text-sm leading-relaxed text-white/80">
          {active.caption && <span>{active.caption}</span>}
          {hasMultiple && (
            <span className="font-mono text-sm text-white/60">
              {index + 1} / {images.length}
              <span className="sm:hidden"> · swipe for more</span>
            </span>
          )}
        </figcaption>
      </figure>
    </div>
  );
}
