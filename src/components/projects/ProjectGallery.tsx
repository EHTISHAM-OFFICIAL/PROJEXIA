import { useRef, useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { Image } from '../ui/Image';
import { ImageLightbox } from '../ui/ImageLightbox';
import { cn } from '../../utils/cn';
import type { GalleryImage } from '../../types/project';

/**
 * Phones get a swipeable carousel (the next photo peeks in to show there is
 * more); from `sm` it is one large image with a thumbnail strip. Either way a
 * tap opens the full-screen viewer, which can also be swiped.
 */
export function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const ordered = [...images].sort((a, b) => a.order - b.order);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const active = ordered[activeIndex];

  if (ordered.length === 0) return null;

  const onTrackScroll = () => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const element = track.current;
      if (!element) return;
      const slide = element.firstElementChild as HTMLElement | null;
      if (!slide) return;
      const pitch = slide.offsetWidth + 12;
      setActiveIndex(Math.max(0, Math.min(ordered.length - 1, Math.round(element.scrollLeft / pitch))));
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Phones */}
      <div className="sm:hidden">
        <div
          ref={track}
          onScroll={onTrackScroll}
          className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] max-[380px]:-mx-3.5 max-[380px]:px-3.5 [&::-webkit-scrollbar]:hidden"
        >
          {ordered.map((image, index) => (
            <figure key={image.url} className="w-[86%] shrink-0 snap-center">
              <button
                type="button"
                onClick={() => {
                  setActiveIndex(index);
                  setLightboxOpen(true);
                }}
                aria-label={`View photo ${index + 1} of ${ordered.length} full size`}
                className="block w-full overflow-hidden rounded-card border border-line bg-surface-raised"
              >
                <Image
                  src={image.url}
                  alt={image.alt || 'Project photograph'}
                  className="aspect-[4/3] w-full object-cover"
                />
              </button>
              {image.caption && (
                <figcaption className="mt-2 text-sm leading-relaxed text-content-secondary">{image.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
        {ordered.length > 1 && (
          <p className="mt-3 text-center font-mono text-sm text-content-muted" aria-live="polite">
            {activeIndex + 1} / {ordered.length}
          </p>
        )}
      </div>

      {/* Larger screens */}
      <div className="hidden flex-col gap-4 sm:flex">
        <figure>
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="View full size"
            className="group relative block w-full overflow-hidden rounded-card border border-line bg-surface-raised"
          >
            <Image
              src={active.url}
              alt={active.alt || 'Project photograph'}
              className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-md bg-bg/80 px-2.5 py-1.5 text-xs text-content opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              <Maximize2 size={13} aria-hidden="true" />
              View full size
            </span>
          </button>
          {active.caption && (
            <figcaption className="mt-3 text-base leading-relaxed text-content-secondary">{active.caption}</figcaption>
          )}
        </figure>

        {ordered.length > 1 && (
          <div className="-mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-1">
            {ordered.map((image, index) => (
              <button
                key={image.url}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1}: ${image.alt || 'project photograph'}`}
                aria-current={index === activeIndex}
                className={cn(
                  'w-32 shrink-0 snap-start overflow-hidden rounded-lg border transition-colors',
                  index === activeIndex ? 'border-accent' : 'border-line hover:border-line-strong',
                )}
              >
                <Image src={image.url} alt="" className="aspect-[4/3] w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <ImageLightbox
          images={ordered}
          index={activeIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setActiveIndex}
        />
      )}
    </div>
  );
}
