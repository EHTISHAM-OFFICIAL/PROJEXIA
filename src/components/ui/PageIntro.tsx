import type { ReactNode } from 'react';
import { Container } from './Container';
import { cn } from '../../utils/cn';

type PageIntroProps = {
  title: string;
  description?: ReactNode;
  eyebrow?: string;
  backdrop?: boolean;
  className?: string;
};

/**
 * Shared introduction pattern for public content pages.
 * Keeps headings, supporting copy, borders, and vertical spacing consistent
 * without changing route structure or page-specific content.
 */
export function PageIntro({
  title,
  description,
  eyebrow,
  backdrop = false,
  className,
}: PageIntroProps) {
  return (
    <section className={cn('relative isolate overflow-hidden border-b border-line bg-surface/20', className)}>
      {backdrop && <div className="grid-backdrop absolute inset-0" aria-hidden="true" />}
      <Container className="relative py-14 sm:py-20">
        <div className="max-w-3xl">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            {title}
          </h1>
          {description && (
            <div className="mt-4 max-w-prose text-base leading-relaxed text-content-secondary sm:text-lg">
              {description}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
