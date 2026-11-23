import type { ReactNode } from 'react';
import { useId } from 'react';
import { cn } from '../../utils/cn';

/**
 * Section opener in the site's circuit language: a datasheet-style section
 * number, a copper trace that steps down at a 45 degree jog, and a solder pad
 * at the end, with the title underneath. The same motif is used for the
 * homepage process route, so detail pages feel like part of one product.
 *
 * The trace is decorative (aria-hidden); the number, when given, is read as
 * part of the page structure by sighted users only.
 */
export function SectionHeading({
  number,
  children,
  as: Tag = 'h2',
  className,
}: {
  number?: string;
  children: ReactNode;
  as?: 'h2' | 'h3';
  className?: string;
}) {
  const gradientId = useId();

  return (
    <div className={className}>
      <div className="section-trace flex items-center gap-3" aria-hidden="true">
        {number && (
          <span className="font-mono text-[13px] font-semibold tracking-[0.16em] text-accent sm:text-sm">
            {number}
          </span>
        )}
        <svg viewBox="0 0 100 12" preserveAspectRatio="none" className="h-3 min-w-0 flex-1" fill="none">
          <defs>
            <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="rgb(var(--color-accent))" stopOpacity="0.95" />
              <stop offset="0.7" stopColor="rgb(var(--color-accent))" stopOpacity="0.5" />
              <stop offset="1" stopColor="rgb(var(--color-accent))" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            d="M0 1 H82 L88 11 H100"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.5"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span className="-ml-3 grid h-3 w-3 shrink-0 place-items-center rounded-full border border-accent/70 bg-bg">
          <span className="h-1 w-1 rounded-full bg-accent" />
        </span>
      </div>
      <Tag
        className={cn(
          'mt-3 text-[1.625rem] font-semibold leading-[1.12] tracking-[-0.02em] [overflow-wrap:anywhere] [text-wrap:balance] sm:mt-4 sm:text-[2rem]',
        )}
      >
        {children}
      </Tag>
    </div>
  );
}

/**
 * Sub-heading inside a section. Level 3 gets a small copper pad (the same mark
 * used for the commitments list on the homepage); level 4 is a plain step down.
 */
export function SubHeading({
  children,
  level = 3,
  className,
}: {
  children: ReactNode;
  level?: 3 | 4;
  className?: string;
}) {
  const Tag = level === 3 ? 'h3' : 'h4';
  return (
    <Tag
      className={cn(
        'flex items-start gap-2.5 font-semibold tracking-[-0.01em] text-content [text-wrap:balance]',
        level === 3 ? 'text-[1.25rem] leading-[1.25] sm:text-[1.375rem]' : 'text-[1.0625rem] leading-snug sm:text-lg',
        className,
      )}
    >
      {level === 3 && (
        <span
          className="mt-[0.42em] h-2 w-2 shrink-0 rounded-[2px] bg-accent shadow-[0_0_10px_rgb(var(--color-accent)/0.45)]"
          aria-hidden="true"
        />
      )}
      <span className="min-w-0 [overflow-wrap:anywhere]">{children}</span>
    </Tag>
  );
}
