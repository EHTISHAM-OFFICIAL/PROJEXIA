import type { ReactNode } from 'react';
import { Inbox } from 'lucide-react';

export function EmptyState({
  title,
  description,
  icon,
  action,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-card border border-dashed border-line px-6 py-16 text-center">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-surface-raised text-content-muted">
        {icon ?? <Inbox size={20} aria-hidden="true" />}
      </div>
      <h3 className="text-base font-medium text-content">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-content-secondary">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
