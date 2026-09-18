import type { ReactNode } from 'react';

interface FormSectionProps {
  id: string;
  step: number;
  title: string;
  description?: string;
  children: ReactNode;
}

/**
 * One block of the request form. The step number is meaningful here — the form
 * is a sequence the person works through top to bottom.
 */
export function FormSection({ id, step, title, description, children }: FormSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-sm text-accent" aria-hidden="true">
          {String(step).padStart(2, '0')}
        </span>
        <h2 id={`${id}-title`} className="text-xl font-semibold tracking-tight">
          {title}
        </h2>
      </div>
      {description && (
        <p className="ml-9 mt-2 max-w-prose text-sm leading-relaxed text-content-secondary">
          {description}
        </p>
      )}
      <div className="ml-0 mt-6 flex flex-col gap-5 sm:ml-9">{children}</div>
    </section>
  );
}
