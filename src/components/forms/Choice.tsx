import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

/** Single checkbox with an inline label — used for booleans and consent. */
export const Checkbox = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { label: string; description?: string }
>(({ label, description, className, id, ...props }, ref) => (
  <div className={cn('flex gap-3', className)}>
    <input
      ref={ref}
      id={id}
      type="checkbox"
      className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-line bg-surface-raised accent-accent"
      {...props}
    />
    <label htmlFor={id} className="cursor-pointer select-none text-sm leading-relaxed text-content">
      {label}
      {description && <span className="mt-0.5 block text-xs text-content-muted">{description}</span>}
    </label>
  </div>
));
Checkbox.displayName = 'Checkbox';

interface CheckboxGroupProps {
  name: string;
  options: readonly string[];
  value: string[];
  onChange: (next: string[]) => void;
  columns?: 2 | 3;
}

/** Multi-select rendered as toggle chips — far easier to use on a phone than a multi-select. */
export function CheckboxGroup({ name, options, value, onChange, columns = 3 }: CheckboxGroupProps) {
  const toggle = (option: string) => {
    onChange(value.includes(option) ? value.filter((item) => item !== option) : [...value, option]);
  };

  return (
    <div
      className={cn(
        'grid gap-2',
        columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      )}
    >
      {options.map((option) => {
        const id = `${name}-${option.replace(/\W+/g, '-').toLowerCase()}`;
        const checked = value.includes(option);
        return (
          <label
            key={option}
            htmlFor={id}
            className={cn(
              'flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-colors',
              checked
                ? 'border-accent/40 bg-accent/10 text-content'
                : 'border-line bg-surface-raised text-content-secondary hover:border-line-strong hover:text-content'
            )}
          >
            <input
              id={id}
              type="checkbox"
              checked={checked}
              onChange={() => toggle(option)}
              className="h-4 w-4 shrink-0 cursor-pointer rounded border-line bg-surface accent-accent"
            />
            {option}
          </label>
        );
      })}
    </div>
  );
}

interface RadioGroupProps {
  name: string;
  options: readonly string[];
  value: string;
  onChange: (next: string) => void;
}

export function RadioGroup({ name, options, value, onChange }: RadioGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const id = `${name}-${option.replace(/\W+/g, '-').toLowerCase()}`;
        const checked = value === option;
        return (
          <label
            key={option}
            htmlFor={id}
            className={cn(
              'flex cursor-pointer items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-sm transition-colors',
              checked
                ? 'border-accent/40 bg-accent/10 text-content'
                : 'border-line bg-surface-raised text-content-secondary hover:border-line-strong hover:text-content'
            )}
          >
            <input
              id={id}
              type="radio"
              name={name}
              value={option}
              checked={checked}
              onChange={() => onChange(option)}
              className="h-4 w-4 cursor-pointer border-line bg-surface accent-accent"
            />
            {option}
          </label>
        );
      })}
    </div>
  );
}
