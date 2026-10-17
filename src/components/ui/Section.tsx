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
    <section id={id} className={cn('py-12 sm:py-20 lg:py-24', className)}>
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
        'flex min-w-0 flex-col gap-3 sm:gap-4 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'md:flex-col md:items-center md:text-center'
      )}
    >
      <div className={cn('min-w-0 max-w-2xl', align === 'center' && 'mx-auto')}>
        <h2 className="text-2xl font-semibold leading-tight tracking-tight sm:text-4xl">{title}</h2>
        {description && (
          <p className="mt-3 max-w-prose text-base leading-relaxed text-content-secondary sm:mt-4">
            {description}
          </p>
        )}
      </div>
      {children && <div className="shrink-0 self-start md:self-auto">{children}</div>}
    </div>
  );
}
