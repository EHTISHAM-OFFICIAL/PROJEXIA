import type { ReactNode } from 'react';

export interface SpecItem {
  label: string;
  value: ReactNode;
}

/**
 * Specifications as stacked rows on phones (label over value, so long values
 * wrap naturally) and as two columns from `sm`.
 */
export function SpecList({ items }: { items: SpecItem[] }) {
  if (items.length === 0) return null;
  return (
    <dl className="divide-y divide-line border-y border-line">
      {items.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className="grid min-w-0 gap-1.5 py-4 sm:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] sm:gap-8 sm:py-5"
        >
          <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-content-muted sm:pt-0.5 sm:text-sm sm:tracking-normal">
            {item.label}
          </dt>
          <dd className="min-w-0 text-[15px] leading-[1.75] text-content [overflow-wrap:anywhere] sm:text-base">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
