import { useEffect, useMemo, useState } from 'react';
import { Check, Plus, Search, X } from 'lucide-react';
import { TextInput } from './Inputs';
import { projectLibraryService } from '../../services/projectLibraryService';
import type { ProjectLibraryItem, ProjectLibraryKind } from '../../types/projectLibrary';

export function LibraryMultiSelect({
  kind,
  values,
  onChange,
  label,
  placeholder = 'Search library items…',
}: {
  kind: ProjectLibraryKind;
  values: string[];
  onChange: (values: string[]) => void;
  label: string;
  placeholder?: string;
}) {
  const [items, setItems] = useState<ProjectLibraryItem[]>([]);
  const [search, setSearch] = useState('');
  const [custom, setCustom] = useState('');
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let alive = true;
    projectLibraryService.listByKind(kind)
      .then((result) => { if (alive) { setItems(result); setLoadError(''); } })
      .catch(() => { if (alive) setLoadError('Library options could not be loaded. You can still enter custom items.'); });
    return () => { alive = false; };
  }, [kind]);

  const filtered = useMemo(() => items.filter((item) =>
    item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) &&
    !values.some((value) => value.toLocaleLowerCase() === item.name.toLocaleLowerCase())
  ).slice(0, 12), [items, search, values]);

  const add = (name: string) => {
    const clean = name.trim();
    if (clean && !values.some((value) => value.toLocaleLowerCase() === clean.toLocaleLowerCase())) {
      onChange([...values, clean]);
    }
    setCustom('');
    setSearch('');
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {values.map((value) => (
          <span key={value} className="inline-flex items-center gap-1 rounded-full border border-line bg-surface-raised px-3 py-1.5 text-sm">
            {value}
            <button type="button" onClick={() => onChange(values.filter((item) => item !== value))} aria-label={`Remove ${value}`} className="text-content-muted hover:text-content">
              <X size={13} />
            </button>
          </span>
        ))}
        {!values.length && <span className="text-sm text-content-muted">No {label.toLocaleLowerCase()} selected.</span>}
      </div>
      <div className="relative">
        <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-content-muted" />
        <TextInput value={search} onChange={(event) => setSearch(event.target.value)} placeholder={placeholder} className="pl-9" />
      </div>
      {loadError && <p className="text-xs text-state-warning">{loadError}</p>}
      {search.trim() && filtered.length > 0 && (
        <div className="max-h-52 overflow-auto rounded-lg border border-line">
          {filtered.map((item) => (
            <button type="button" key={item.id} onClick={() => add(item.name)} className="flex w-full items-center justify-between border-b border-line px-3 py-2 text-left text-sm last:border-b-0 hover:bg-surface-raised">
              <span>{item.name}{item.category && <span className="ml-2 text-xs text-content-muted">{item.category}</span>}</span>
              <Plus size={14} />
            </button>
          ))}
        </div>
      )}
      {search.trim() && !filtered.length && !values.some((value) => value.toLocaleLowerCase() === search.trim().toLocaleLowerCase()) && (
        <button type="button" onClick={() => add(search)} className="inline-flex w-fit items-center gap-2 rounded-md border border-line px-3 py-2 text-sm hover:bg-surface-raised">
          <Plus size={14} /> Use custom item “{search.trim()}”
        </button>
      )}
      <div className="flex gap-2">
        <TextInput value={custom} onChange={(event) => setCustom(event.target.value)} placeholder={`Add custom ${label.toLocaleLowerCase()}`} />
        <button type="button" onClick={() => add(custom)} disabled={!custom.trim()} className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-line px-3 text-sm disabled:opacity-40">
          <Check size={14} /> Add
        </button>
      </div>
    </div>
  );
}
