import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Images } from 'lucide-react';
import { Container } from '../ui/Container';
import { Image } from '../ui/Image';
import { cn } from '../../utils/cn';

export interface DetailImage {
  src: string | null | undefined;
  alt: string;
  /** `contain` keeps product-style images (white backgrounds) uncropped. */
  fit?: 'cover' | 'contain';
  note?: ReactNode;
  galleryHref?: string;
}

interface DetailHeaderProps {
  backTo: string;
  backLabel: string;
  badges?: ReactNode;
  title: string;
  summary?: string;
  actions?: ReactNode;
  image?: DetailImage;
  /** Key facts strip, shown under the header. */
  children?: ReactNode;
}

/**
 * Top of a project or school-model page.
 *
 * Phones: title, then a full-bleed image, then the action buttons, then the
 * facts. From `lg` the title and actions sit left and the image right. Both
 * orders come from one DOM order, so nothing is duplicated for screen readers.
 */
export function DetailHeader({
  backTo,
  backLabel,
  badges,
  title,
  summary,
  actions,
  image,
  children,
}: DetailHeaderProps) {
  const hasImage = Boolean(image?.src);

  return (
    <header className="relative border-b border-line">
      <div className="absolute inset-0 grid-backdrop opacity-60" aria-hidden="true" />
      <Container className="relative pb-7 pt-3 sm:pb-12 sm:pt-6 lg:pb-14">
        <Link
          to={backTo}
          className="-ml-2 inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm text-content-secondary transition-colors hover:text-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {backLabel}
        </Link>

        <div
          className={cn(
            'mt-3 grid min-w-0 gap-x-10 gap-y-6 sm:mt-5 sm:gap-y-8 lg:gap-x-12',
            hasImage && 'lg:grid-cols-[1.05fr_1fr] lg:content-center lg:items-start',
          )}
        >
          <div className={cn('min-w-0', hasImage && 'lg:col-start-1 lg:row-start-1')}>
            {badges && <div className="flex flex-wrap gap-2">{badges}</div>}
            <h1 className="mt-4 text-[1.875rem] font-semibold leading-[1.12] tracking-tight [overflow-wrap:anywhere] sm:text-4xl lg:text-[2.75rem]">
              {title}
            </h1>
            {summary && (
              <p className="mt-4 max-w-prose text-[1.0625rem] leading-[1.7] text-content-secondary sm:mt-5 sm:text-lg">
                {summary}
              </p>
            )}
          </div>

          {hasImage && image && (
            <figure className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div className="group relative overflow-hidden rounded-[1.25rem] border border-line bg-surface-raised shadow-[0_16px_42px_-28px_rgba(0,0,0,0.32)] sm:rounded-[1.4rem]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  eager
                  className={cn(
                    'aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[5/4]',
                    image.fit === 'contain' ? 'bg-surface-raised object-contain p-2 sm:p-4' : 'object-cover',
                  )}
                />
                {image.galleryHref && (
                  <a
                    href={image.galleryHref}
                    className="absolute bottom-3 right-3 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition duration-200 hover:-translate-y-0.5 hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent sm:bottom-4 sm:right-4 sm:px-5"
                  >
                    <Images size={17} aria-hidden="true" />
                    View gallery
                  </a>
                )}
              </div>
              {image.note && (
                <figcaption className="mt-3 max-w-prose text-sm leading-relaxed text-content-muted">{image.note}</figcaption>
              )}
            </figure>
          )}

          {actions && (
            <div
              className={cn(
                'flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap',
                hasImage && 'lg:col-start-1 lg:row-start-2',
              )}
            >
              {actions}
            </div>
          )}
        </div>

        {children && <div className="mt-6 sm:mt-10">{children}</div>}
      </Container>
    </header>
  );
}
