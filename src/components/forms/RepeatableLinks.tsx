import { Plus, X } from 'lucide-react';
import { TextInput } from './Inputs';

interface RepeatableLinksProps {
  values: string[];
  onChange: (next: string[]) => void;
  errors?: (string | undefined)[];
  max?: number;
}

/** A growable list of reference URLs. */
export function RepeatableLinks({ values, onChange, errors = [], max = 5 }: RepeatableLinksProps) {
  const rows = values.length ? values : [''];

  const update = (index: number, value: string) => {
    const next = [...rows];
    next[index] = value;
    onChange(next);
  };

  const remove = (index: number) => {
    const next = rows.filter((_, position) => position !== index);
    onChange(next.length ? next : ['']);
  };

  return (
    <div className="flex flex-col gap-2">
      {rows.map((value, index) => (
        <div key={index} className="flex flex-col gap-1">
          <div className="flex gap-2">
            <TextInput
              type="url"
              inputMode="url"
              value={value}
              hasError={Boolean(errors[index])}
              placeholder="https://example.com/similar-project"
              aria-label={`Reference link ${index + 1}`}
              onChange={(event) => update(index, event.target.value)}
            />
            {rows.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                aria-label={`Remove reference link ${index + 1}`}
                className="shrink-0 rounded-lg border border-line px-3 text-content-muted transition-colors hover:border-line-strong hover:text-state-danger"
              >
                <X size={15} />
              </button>
            )}
          </div>
          {errors[index] && (
            <p className="text-xs text-state-danger" role="alert">
              {errors[index]}
            </p>
          )}
        </div>
      ))}

      {rows.length < max && (
        <button
          type="button"
          onClick={() => onChange([...rows, ''])}
          className="inline-flex w-fit items-center gap-1.5 rounded-lg px-1 py-1.5 text-sm text-accent transition-colors hover:text-accent-hover"
        >
          <Plus size={15} aria-hidden="true" />
          Add another link
        </button>
      )}
    </div>
  );
}
