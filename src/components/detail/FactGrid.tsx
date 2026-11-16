export interface Fact {
  label: string;
  value: string | null | undefined;
}

/**
 * Responsive key facts. Only real facts get a tile, so missing values never
 * leave a grey placeholder or an empty fourth column.
 */
export function FactGrid({ facts }: { facts: Fact[] }) {
  const shown = facts.filter((fact): fact is { label: string; value: string } => Boolean(fact.value?.trim()));
  if (shown.length === 0) return null;

  const mobileColumns = shown.length === 1 ? 'grid-cols-1' : 'grid-cols-2';
  const tabletColumns = shown.length <= 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3';
  const desktopColumns = shown.length === 1
    ? 'lg:grid-cols-1'
    : shown.length === 2
      ? 'lg:grid-cols-2'
      : shown.length === 3
        ? 'lg:grid-cols-3'
        : 'lg:grid-cols-4';

  return (
    <dl className={`grid ${mobileColumns} gap-2 ${tabletColumns} ${desktopColumns}`}>
      {shown.map((fact) => (
        <div key={fact.label} className="min-w-0 rounded-xl border border-line bg-surface px-3.5 py-3 sm:rounded-2xl sm:px-5 sm:py-4">
          <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-content-muted sm:tracking-[0.1em]">{fact.label}</dt>
          <dd className="mt-1 text-[15px] font-semibold leading-snug text-content [overflow-wrap:anywhere] sm:text-base">
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
