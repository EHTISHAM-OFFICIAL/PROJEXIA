import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info';

const TONES: Record<BadgeTone, string> = {
  neutral: 'bg-surface-raised text-content-secondary border-line',
  accent: 'bg-accent/10 text-accent border-accent/25',
  info: 'bg-state-info/10 text-state-info border-state-info/25',
  success: 'bg-state-success/10 text-state-success border-state-success/25',
  warning: 'bg-state-warning/10 text-state-warning border-state-warning/25',
  danger: 'bg-state-danger/10 text-state-danger border-state-danger/25',
};

export function Badge({
  tone = 'neutral',
  children,
  className,
}: {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium',
        TONES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
