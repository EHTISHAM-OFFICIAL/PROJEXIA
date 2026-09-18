import { Plus, X } from 'lucide-react';
import { TextInput } from './Inputs';

/** Edits a string[] field (objectives, features, challenges, tags, technologies). */
export function ListEditor({
  values,
  onChange,
  placeholder,
  label,
}: {
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  label: string;
}) {
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
        <div key={index} className="flex gap-2">
          <TextInput
            value={value}
            placeholder={placeholder}
            aria-label={`${label} ${index + 1}`}
            onChange={(event) => update(index, event.target.value)}
          />
          {rows.length > 1 && (
            <button
              type="button"
              onClick={() => remove(index)}
              aria-label={`Remove ${label} ${index + 1}`}
              className="shrink-0 rounded-lg border border-line px-3 text-content-muted transition-colors hover:border-line-strong hover:text-state-danger"
            >
              <X size={15} />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...rows, ''])}
        className="inline-flex w-fit items-center gap-1.5 rounded-lg px-1 py-1.5 text-sm text-accent transition-colors hover:text-accent-hover"
      >
        <Plus size={15} aria-hidden="true" />
        Add
      </button>
    </div>
  );
}

/** Edits an array of objects with fixed string or number columns (specs, components). */
export function TableEditor<T extends object>({
  rows,
  columns,
  emptyRow,
  onChange,
  label,
}: {
  rows: T[];
  columns: { key: Extract<keyof T, string>; label: string; type?: 'text' | 'number'; width?: string }[];
  emptyRow: T;
  onChange: (next: T[]) => void;
  label: string;
}) {
  const data = rows.length ? rows : [emptyRow];

  const update = (index: number, key: Extract<keyof T, string>, value: string) => {
    const isNumber = columns.find((column) => column.key === key)?.type === 'number';
    const next = data.map((row, position) =>
      position === index ? { ...row, [key]: isNumber ? Number(value) || 0 : value } : row
    );
    onChange(next);
  };

  const remove = (index: number) => {
    const next = data.filter((_, position) => position !== index);
    onChange(next.length ? next : [emptyRow]);
  };

  return (
    <div className="flex flex-col gap-3">
      {data.map((row, index) => (
        <div key={index} className="flex flex-wrap items-end gap-2 rounded-lg border border-line p-3">
          {columns.map((column) => (
            <div key={column.key} className={column.width ?? 'min-w-[140px] flex-1'}>
              <label className="mb-1 block text-xs text-content-muted">{column.label}</label>
              <TextInput
                type={column.type === 'number' ? 'number' : 'text'}
                value={String(row[column.key] ?? '')}
                aria-label={`${label} ${index + 1} ${column.label}`}
                onChange={(event) => update(index, column.key, event.target.value)}
              />
            </div>
          ))}
          {data.length > 1 && (
            <button
              type="button"
              onClick={() => remove(index)}
              aria-label={`Remove ${label} ${index + 1}`}
              className="h-[42px] shrink-0 rounded-lg border border-line px-3 text-content-muted transition-colors hover:border-line-strong hover:text-state-danger"
            >
              <X size={15} />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...data, emptyRow])}
        className="inline-flex w-fit items-center gap-1.5 rounded-lg px-1 py-1.5 text-sm text-accent transition-colors hover:text-accent-hover"
      >
        <Plus size={15} aria-hidden="true" />
        Add row
      </button>
    </div>
  );
}
