import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface FieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Wraps any input with its label, hint and error message.
 * Using one wrapper keeps required markers, spacing and error styling consistent
 * across ~60 fields without repeating markup.
 */
export function Field({
  label,
  htmlFor,
  required = false,
  hint,
  error,
  children,
  className,
}: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={htmlFor} className="flex items-baseline gap-1.5 text-sm font-medium text-content">
        {label}
        {required ? (
          <span className="text-state-danger" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="text-xs font-normal text-content-muted">Optional</span>
        )}
      </label>
      {hint && <p className="text-xs leading-relaxed text-content-muted">{hint}</p>}
      {children}
      {error && (
        <p className="text-xs text-state-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function FieldSet({
  legend,
  required = false,
  hint,
  error,
  children,
  className,
}: Omit<FieldProps, 'label' | 'htmlFor'> & { legend: string }) {
  return (
    <fieldset className={cn('flex flex-col gap-2', className)}>
      <legend className="flex items-baseline gap-1.5 text-sm font-medium text-content">
        {legend}
        {required ? (
          <span className="text-state-danger" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="text-xs font-normal text-content-muted">Optional</span>
        )}
      </legend>
      {hint && <p className="text-xs leading-relaxed text-content-muted">{hint}</p>}
      {children}
      {error && (
        <p className="text-xs text-state-danger" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
