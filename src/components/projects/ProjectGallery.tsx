import { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { Image } from '../ui/Image';
import { ImageLightbox } from '../ui/ImageLightbox';
import type { GalleryImage } from '../../types/project';

export function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const ordered = [...images].sort((a, b) => a.order - b.order);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const active = ordered[activeIndex];

  if (ordered.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
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
          <figcaption className="mt-3 text-sm text-content-secondary">{active.caption}</figcaption>
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
              className={`w-28 shrink-0 snap-start overflow-hidden rounded-lg border transition-colors sm:w-32 ${
                index === activeIndex
                  ? 'border-accent'
                  : 'border-line hover:border-line-strong'
              }`}
            >
              <Image
                src={image.url}
                alt=""
                className="aspect-[4/3] w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

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
