import { Badge } from '../ui/Badge';
import { InlineText, Prose } from '../projects/CaseStudySection';
import type { ProjectComponent } from '../../types/project';

/**
 * Parts list. A table needs room, so it only appears from `md`; on phones each
 * part is a small card, which avoids sideways scrolling entirely.
 */
export function ComponentList({ components }: { components: ProjectComponent[] }) {
  return (
    <>
      <ul className="divide-y divide-line overflow-hidden rounded-card border border-line bg-surface md:hidden">
        {components.map((component, index) => (
          <li key={index} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="min-w-0 text-base font-medium leading-snug text-content [overflow-wrap:anywhere]">
                <InlineText text={component.name} allowLinks={false} />
                {component.optional && (
                  <Badge tone="info" className="ml-2 align-middle">
                    Optional
                  </Badge>
                )}
              </p>
              <span className="shrink-0 rounded-md border border-line px-2 py-0.5 font-mono text-sm text-content-secondary">
                Qty {component.quantity}
              </span>
            </div>
            {component.category && (
              <p className="mt-1 text-sm text-content-muted">
                <InlineText text={component.category} allowLinks={false} />
              </p>
            )}
            {component.notes && (
              <div className="mt-2">
                <Prose text={component.notes} size="reading" />
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="hidden overflow-hidden rounded-card border border-line bg-surface md:block">
        <table className="w-full table-fixed border-separate border-spacing-0 text-[15px]">
          <thead>
            <tr className="bg-surface-raised text-left">
              <th scope="col" className="w-[27%] border-b border-r border-line px-4 py-3 text-sm font-semibold text-content-secondary">Component</th>
              <th scope="col" className="w-[22%] border-b border-r border-line px-4 py-3 text-sm font-semibold text-content-secondary">Type</th>
              <th scope="col" className="w-[9%] border-b border-r border-line px-4 py-3 text-sm font-semibold text-content-secondary">Qty</th>
              <th scope="col" className="w-[42%] border-b border-line px-4 py-3 text-sm font-semibold text-content-secondary">Notes</th>
            </tr>
          </thead>
          <tbody>
            {components.map((component, index) => (
              <tr key={index} className="transition-colors hover:bg-surface-raised/60 [&:not(:last-child)>td]:border-b [&:not(:last-child)>td]:border-line">
                <td className="border-r border-line px-4 py-3.5 align-top leading-relaxed text-content [overflow-wrap:anywhere]">
                  <span className="font-medium"><InlineText text={component.name} allowLinks={false} /></span>
                  {component.optional && <Badge tone="info" className="ml-2 align-middle">Optional</Badge>}
                </td>
                <td className="border-r border-line px-4 py-3.5 align-top leading-relaxed text-content-secondary break-words">
                  {component.category ? <InlineText text={component.category} allowLinks={false} /> : '—'}
                </td>
                <td className="border-r border-line px-4 py-3.5 align-top font-mono leading-relaxed text-content-secondary">{component.quantity}</td>
                <td className="px-4 py-3.5 align-top leading-relaxed text-content-secondary [&_p]:text-[15px] [&_p]:leading-relaxed">
                  {component.notes ? <Prose text={component.notes} /> : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
