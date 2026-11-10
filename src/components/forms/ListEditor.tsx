import { GripVertical, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { TextInput } from './Inputs';
import { RichTextEditor } from './RichTextEditor';
import { splitEntries } from '../../utils/splitEntries';

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
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const update = (index: number, value: string) => {
    const entries = splitEntries(value);
    if (entries.length > 1) {
      const next = [...rows];
      next.splice(index, 1, ...entries);
      onChange(next);
      return;
    }
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
        <div
          key={index}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            if (draggingIndex === null || draggingIndex === index) return;
            const next = [...rows];
            const [moved] = next.splice(draggingIndex, 1);
            if (moved === undefined) return;
            next.splice(index, 0, moved);
            onChange(next);
            setDraggingIndex(null);
          }}
          className={`flex min-w-0 items-center gap-1.5 rounded-lg border border-line bg-surface px-1.5 py-1 ${draggingIndex === index ? 'opacity-40' : ''}`}
        >
          <button type="button" draggable onDragStart={() => setDraggingIndex(index)} onDragEnd={() => setDraggingIndex(null)} aria-label={`Drag to reorder ${label} ${index + 1}`} title="Drag to reorder" className="shrink-0 cursor-grab touch-none rounded p-1 text-content-muted hover:bg-surface-raised active:cursor-grabbing">
            <GripVertical size={15} />
          </button>
          <TextInput
            value={value}
            placeholder={placeholder}
            aria-label={`${label} ${index + 1}`}
            onChange={(event) => update(index, event.target.value)}
          className="min-w-0 flex-1 border-0 bg-transparent shadow-none focus-visible:ring-1"
          />
          {rows.length > 1 && (
            <button
              type="button"
              onClick={() => remove(index)}
              aria-label={`Remove ${label} ${index + 1}`}
              className="shrink-0 rounded-lg border border-line px-2.5 text-content-muted transition-colors hover:border-line-strong hover:text-state-danger"
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
  columns: { key: Extract<keyof T, string>; label: string; type?: 'text' | 'number' | 'checkbox' | 'richtext'; width?: string; inlineOnly?: boolean; showToolbar?: boolean }[];
  emptyRow: T;
  onChange: (next: T[]) => void;
  label: string;
}) {
  const data = rows.length ? rows : [emptyRow];
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const update = (index: number, key: Extract<keyof T, string>, value: string | boolean) => {
    const firstColumnKey = columns[0]?.key;
    if (typeof value === 'string' && key === firstColumnKey) {
      const entries = splitEntries(value);
      if (entries.length > 1) {
        const next = [...data];
        next.splice(index, 1, ...entries.map((entry) => ({ ...emptyRow, [key]: entry } as T)));
        onChange(next);
        return;
      }
    }
    const type = columns.find((column) => column.key === key)?.type;
    const next = data.map((row, position) => {
      if (position !== index) return row;
      const nextValue = type === 'number' && typeof value === 'string' ? Number(value) || 0 : value;
      return { ...row, [key]: nextValue };
    });
    onChange(next);
  };

  const remove = (index: number) => {
    const next = data.filter((_, position) => position !== index);
    onChange(next.length ? next : [emptyRow]);
  };

  return (
    <div className="flex flex-col gap-3">
      {data.map((row, index) => (
        <div
          key={index}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            if (draggingIndex === null || draggingIndex === index) return;
            const next = [...data];
            const [moved] = next.splice(draggingIndex, 1);
            if (moved === undefined) return;
            next.splice(index, 0, moved);
            onChange(next);
            setDraggingIndex(null);
          }}
          className={`flex min-w-0 flex-wrap items-end gap-2 ${label === 'Component' ? 'rounded-lg border border-line px-2 py-2' : 'rounded-lg border border-line p-2'} ${draggingIndex === index ? 'opacity-40' : ''}`}
        >
          {data.length > 1 && <button type="button" draggable onDragStart={() => setDraggingIndex(index)} onDragEnd={() => setDraggingIndex(null)} aria-label={`Drag to reorder ${label.toLowerCase()} ${index + 1}`} title="Drag to reorder" className="mb-1 shrink-0 cursor-grab touch-none rounded p-1.5 text-content-muted hover:bg-surface-raised active:cursor-grabbing"><GripVertical size={15} /></button>}
          {columns.map((column) => (
            <div key={column.key} className={column.width ?? 'min-w-[140px] flex-1'}>
              {column.type === 'checkbox' ? (
                <label className="flex min-h-[42px] items-center gap-2 text-sm text-content-secondary">
                  <input
                    type="checkbox"
                    checked={Boolean(row[column.key])}
                    aria-label={`${label} ${index + 1} ${column.label}`}
                    onChange={(event) => update(index, column.key, event.target.checked)}
                    className="h-4 w-4 rounded border-line accent-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                  />
                  {column.label}
                </label>
              ) : column.type === 'richtext' && !(label === 'Component' && column.key === 'notes') ? (
                <>
                  <label className="mb-1 block text-xs text-content-muted">{column.label}</label>
                  <RichTextEditor
                    id={`table-${label.toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index}-${column.key}`}
                    rows={3}
                    inlineOnly={column.inlineOnly}
                    showToolbar={column.showToolbar}
                    value={String(row[column.key] ?? '')}
                    onChange={(value) => update(index, column.key, value)}
                  />
                </>
              ) : (
                <>
                  <label className="mb-1 block text-xs text-content-muted">{column.label}</label>
                  <TextInput
                    type={column.type === 'number' ? 'number' : 'text'}
                    value={String(row[column.key] ?? '')}
                    aria-label={`${label} ${index + 1} ${column.label}`}
                    onChange={(event) => update(index, column.key, event.target.value)}
                  />
                </>
              )}
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
