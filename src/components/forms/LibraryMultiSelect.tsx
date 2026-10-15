import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Plus, Search, X } from 'lucide-react';
import { TextInput } from './Inputs';
import { projectLibraryService } from '../../services/projectLibraryService';
import type { ProjectLibraryItem, ProjectLibraryKind } from '../../types/projectLibrary';
import { PROJECT_LIBRARY_STARTER } from '../../constants/projectLibraryStarter';

const normalizeLibraryName = (value: string) => value.trim().toLocaleLowerCase().replace(/\\s+/g, ' ');

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
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadError, setLoadError] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let alive = true;
    projectLibraryService.listByKind(kind)
      .then((result) => {
        if (!alive) return;
        setItems(result);
        setLoadError('');
      })
      .catch(() => {
        if (alive) {
          setItems(PROJECT_LIBRARY_STARTER
            .filter((item) => item.kind === kind)
            .map((item, index) => ({ ...item, id: `fallback-${kind}-${index}` })));
          setLoadError('Saved library options could not be loaded. Showing starter suggestions; custom entries are still available.');
        }
      });
    return () => { alive = false; };
  }, [kind]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const normalized = (value: string) => value.trim().toLocaleLowerCase().replace(/\s+/g, ' ');
  const filtered = useMemo(() => {
    const term = search.trim().toLocaleLowerCase();
    return items.filter((item) =>
      (!term || `${item.name} ${item.category} ${item.description}`.toLocaleLowerCase().includes(term)) &&
      !values.some((value) => normalizeLibraryName(value) === normalizeLibraryName(item.name))
    ).slice(0, 30);
  }, [items, search, values]);

  const exactMatch = items.some((item) => normalizeLibraryName(item.name) === normalizeLibraryName(search));
  const alreadySelected = values.some((value) => normalizeLibraryName(value) === normalizeLibraryName(search));

  const add = (name: string) => {
    const clean = name.trim();
    if (clean && !values.some((value) => normalizeLibraryName(value) === normalizeLibraryName(clean))) {
      onChange([...values, clean]);
    }
    setCustom('');
    setSearch('');
    setActiveIndex(0);
    setIsOpen(true);
    inputRef.current?.focus();
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((current) => Math.min(current + 1, Math.max(filtered.length - 1, 0)));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (isOpen && filtered[activeIndex]) add(filtered[activeIndex].name);
      else if (search.trim() && !alreadySelected) add(search);
    }
  };

  return (
    <div ref={rootRef} className="flex flex-col gap-3">
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
        <TextInput
          ref={inputRef}
          value={search}
          onChange={(event) => { setSearch(event.target.value); setActiveIndex(0); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
          onKeyDown={handleSearchKeyDown}
          placeholder={placeholder}
          className="pl-9 pr-9"
          role="combobox"
          aria-label={`Search ${label}`}
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls={`library-options-${kind}`}
          autoComplete="off"
        />
        <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-content-muted" />
      </div>

      {loadError && <p className="text-xs text-state-warning">{loadError}</p>}

      {isOpen && (
        <div id={`library-options-${kind}`} role="listbox" aria-label={`${label} suggestions`} className="max-h-64 overflow-auto rounded-lg border border-line bg-surface shadow-lg">
          {filtered.length > 0 ? filtered.map((item, index) => (
            <button
              type="button"
              role="option"
              aria-selected={index === activeIndex}
              key={item.id}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => add(item.name)}
              className={`flex w-full items-center justify-between gap-3 border-b border-line px-3 py-2.5 text-left text-sm last:border-b-0 ${index === activeIndex ? 'bg-surface-raised' : 'hover:bg-surface-raised'}`}
            >
              <span className="min-w-0">
                <span className="block">{item.name}</span>
                {item.category && <span className="mt-0.5 block text-xs text-content-muted">{item.category}</span>}
              </span>
              <Plus size={14} className="shrink-0" />
            </button>
          )) : (
            <p className="px-3 py-3 text-sm text-content-muted">
              {search.trim() ? 'No matching library item. You can add it as a custom entry below.' : 'No options available for this field yet.'}
            </p>
          )}
          {filtered.length === 30 && <p className="border-t border-line px-3 py-2 text-xs text-content-muted">Showing the first 30 matches. Type a little more to narrow the list.</p>}
        </div>
      )}

      <div className="flex gap-2">
        <TextInput
          value={custom}
          onChange={(event) => setCustom(event.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              add(custom);
            }
          }}
          placeholder={`Add custom ${label.toLocaleLowerCase()}`}
          aria-label={`Custom ${label}`}
        />
        <button type="button" onClick={() => add(custom)} disabled={!custom.trim()} className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-line px-3 text-sm disabled:opacity-40">
          <Check size={14} /> Add
        </button>
      </div>
      {search.trim() && !exactMatch && !alreadySelected && (
        <button type="button" onClick={() => add(search)} className="inline-flex w-fit items-center gap-2 rounded-md border border-line px-3 py-2 text-sm hover:bg-surface-raised">
          <Plus size={14} /> Add “{search.trim()}” as a custom item
        </button>
      )}
    </div>
  );
}
