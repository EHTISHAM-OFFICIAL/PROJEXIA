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
    <dl className="divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
      {items.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className="grid min-w-0 gap-1 px-4 py-3.5 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-6 sm:px-5"
        >
          <dt className="text-sm font-medium text-content-muted sm:text-base sm:text-content-secondary">
            {item.label}
          </dt>
          <dd className="min-w-0 text-base leading-[1.6] text-content [overflow-wrap:anywhere]">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
