import type { ReactNode } from 'react';
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '../../utils/cn';

type Tone = 'info' | 'success' | 'danger';

const TONES: Record<Tone, { wrapper: string; icon: ReactNode }> = {
  info: {
    wrapper: 'border-accent/25 bg-accent/5 text-content',
    icon: <Info size={17} className="text-accent" aria-hidden="true" />,
  },
  success: {
    wrapper: 'border-state-success/25 bg-state-success/5 text-content',
    icon: <CheckCircle2 size={17} className="text-state-success" aria-hidden="true" />,
  },
  danger: {
    wrapper: 'border-state-danger/25 bg-state-danger/5 text-content',
    icon: <AlertTriangle size={17} className="text-state-danger" aria-hidden="true" />,
  },
};

export function Alert({
  tone = 'info',
  children,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      role={tone === 'danger' ? 'alert' : 'status'}
      className={cn('flex gap-3 rounded-lg border px-4 py-3 text-sm', TONES[tone].wrapper, className)}
    >
      <span className="mt-0.5 shrink-0">{TONES[tone].icon}</span>
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}
