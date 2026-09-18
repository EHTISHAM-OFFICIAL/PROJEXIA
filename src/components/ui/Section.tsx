import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Container } from './Container';
import { Reveal } from './Reveal';

/** Standard vertical rhythm for every marketing section, so spacing never drifts. */
export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn('py-16 sm:py-20 lg:py-24', className)}>
      <Container>
        <Reveal>{children}</Reveal>
      </Container>
    </section>
  );
}

export function SectionHeading({
  title,
  description,
  align = 'left',
  children,
}: {
  title: string;
  description?: string;
  align?: 'left' | 'center';
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'md:flex-col md:items-center md:text-center'
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        {description && (
          <p className="mt-4 max-w-prose text-base leading-relaxed text-content-secondary">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
