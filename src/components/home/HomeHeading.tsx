import type { ReactNode } from 'react';

/**
 * Heading block for the homepage sections. Sized with clamp() so it scales
 * smoothly from phone to desktop without a stack of breakpoint overrides.
 */
export function HomeHeading({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
      <div className="min-w-0 max-w-2xl">
        <h2 className="text-[clamp(1.75rem,4.2vw,2.75rem)] font-semibold leading-[1.1] tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-4 max-w-prose text-base leading-relaxed text-content-secondary">{description}</p>
        )}
      </div>
      {children && <div className="shrink-0 self-start md:self-auto">{children}</div>}
    </div>
  );
}
