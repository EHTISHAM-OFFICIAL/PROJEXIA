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
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:rounded-2xl sm:grid-cols-3 lg:grid-cols-4">
      {shown.map((fact) => (
        <div key={fact.label} className="min-w-0 bg-surface px-3.5 py-3 sm:px-5 sm:py-4">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-content-muted sm:text-xs sm:tracking-[0.1em]">{fact.label}</dt>
          <dd className="mt-1 text-[15px] font-semibold leading-snug text-content [overflow-wrap:anywhere] sm:text-base">
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
