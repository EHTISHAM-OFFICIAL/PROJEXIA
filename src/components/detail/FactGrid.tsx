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
    <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-4">
      {shown.map((fact) => (
        <div key={fact.label} className="min-w-0 border-t border-line pt-3">
          <dt className="text-sm text-content-muted">{fact.label}</dt>
          <dd className="mt-1 text-base font-medium leading-snug text-content [overflow-wrap:anywhere]">
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
