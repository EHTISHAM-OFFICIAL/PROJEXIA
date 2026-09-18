import { forwardRef, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

type WithError = { hasError?: boolean };

export const TextInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & WithError>(
  ({ hasError, className, ...props }, ref) => (
    <input
      ref={ref}
      aria-invalid={hasError || undefined}
      className={cn('field-input', hasError && 'field-input-error', className)}
      {...props}
    />
  )
);
TextInput.displayName = 'TextInput';

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & WithError
>(({ hasError, className, rows = 5, ...props }, ref) => (
  <textarea
    ref={ref}
    rows={rows}
    aria-invalid={hasError || undefined}
    className={cn('field-input resize-y leading-relaxed', hasError && 'field-input-error', className)}
    {...props}
  />
));
TextArea.displayName = 'TextArea';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, WithError {
  options: readonly string[] | readonly { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ hasError, className, options, placeholder, ...props }, ref) => (
    <select
      ref={ref}
      aria-invalid={hasError || undefined}
      className={cn('field-input appearance-none pr-9', hasError && 'field-input-error', className)}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239BA3AF' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.75rem center',
        backgroundSize: '1rem',
      }}
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) =>
        typeof option === 'string' ? (
          <option key={option} value={option}>
            {option}
          </option>
        ) : (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        )
      )}
    </select>
  )
);
Select.displayName = 'Select';
