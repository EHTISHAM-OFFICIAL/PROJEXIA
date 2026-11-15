export interface Fact {
  label: string;
  value: string | null | undefined;
}

/**
 * Key facts as an open grid: a hairline above each, label over value. Labels
 * are sentence case at a readable size (the old uppercase 12px labels were hard
 * to read on phones). Facts without a value are dropped.
 */
export function FactGrid({ facts }: { facts: Fact[] }) {
  const shown = facts.filter((fact): fact is { label: string; value: string } => Boolean(fact.value?.trim()));
  if (shown.length === 0) return null;

  return (
    <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-surface/70 sm:grid-cols-3 lg:grid-cols-4">
      {shown.map((fact, index) => (
        <div
          key={fact.label}
          className={`min-w-0 px-4 py-3.5 sm:px-5 sm:py-4 ${index % 2 !== 0 ? 'border-l border-line' : ''} ${index >= 2 ? 'border-t border-line sm:border-t-0' : ''} ${index >= 3 ? 'sm:border-l sm:border-t-0' : ''} ${index >= 3 ? 'lg:border-t-0' : ''}`}
        >
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-content-muted">{fact.label}</dt>
          <dd className="mt-1.5 text-[15px] font-semibold leading-snug text-content [overflow-wrap:anywhere] sm:text-base">
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
