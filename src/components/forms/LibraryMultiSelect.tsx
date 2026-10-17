import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Plus, Search, X } from 'lucide-react';
import { TextInput } from './Inputs';
import { RichTextEditor } from './RichTextEditor';
import { projectLibraryService } from '../../services/projectLibraryService';
import type { ProjectLibraryItem, ProjectLibraryKind } from '../../types/projectLibrary';
import { PROJECT_LIBRARY_STARTER } from '../../constants/projectLibraryStarter';

const normalizeLibraryName = (value: string) => value
  .replace(/^\s{0,3}#{1,3}\s+/gm, '')
  .replace(/^\s*-\s+/gm, '')
  .replace(/\*\*(.*?)\*\*/g, '$1')
  .replace(/\+\+(.*?)\+\+/g, '$1')
  .replace(/(^|[^*])\*([^*]+)\*/g, '$1$2')
  .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  .trim()
  .toLocaleLowerCase()
  .replace(/\s+/g, ' ');

export function LibraryMultiSelect({
  kind,
  values,
  onChange,
  label,
  placeholder = 'Search library items…',
}: {
  kind: ProjectLibraryKind;
  values: string[];
  onChange: (values: string[], addedItem?: ProjectLibraryItem, selectedItems?: ProjectLibraryItem[]) => void;
  label: string;
  placeholder?: string;
}) {
  const [items, setItems] = useState<ProjectLibraryItem[]>([]);
  const [search, setSearch] = useState('');
  const [custom, setCustom] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadError, setLoadError] = useState('');
  const [customSaveError, setCustomSaveError] = useState('');
  const [customSaveNotice, setCustomSaveNotice] = useState('');
  const [savingCustom, setSavingCustom] = useState(false);
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

  const filtered = useMemo(() => {
    const term = search.trim().toLocaleLowerCase();
    return items.filter((item) =>
      (!term || `${item.name} ${item.category} ${item.description}`.toLocaleLowerCase().includes(term)) &&
      !values.some((value) => normalizeLibraryName(value) === normalizeLibraryName(item.name))
    ).slice(0, 30);
  }, [items, search, values]);

  const exactMatch = items.some((item) => normalizeLibraryName(item.name) === normalizeLibraryName(search));
  const alreadySelected = values.some((value) => normalizeLibraryName(value) === normalizeLibraryName(search));

  const add = async (name: string) => {
    const clean = name.trim();
    if (!clean) return;
    const maxNameLength = 10000;
    if (clean.length > maxNameLength) {
      setCustomSaveError(`This ${label.toLocaleLowerCase()} entry is too long. Use ${maxNameLength} characters or fewer.`);
      setCustomSaveNotice('');
      return;
    }

    const selectedItem = items.find((item) => normalizeLibraryName(item.name) === normalizeLibraryName(clean));
    const alreadyInProject = values.some((value) => normalizeLibraryName(value) === normalizeLibraryName(clean));
    setCustomSaveError('');
    setCustomSaveNotice('');

    let resolvedItem = selectedItem;
    // Every selector backed by Project Data Library should capture newly typed values,
    // not just a small subset such as objectives/challenges/components.
    const shouldSaveCustom = !selectedItem;
    if (shouldSaveCustom && !alreadyInProject) {
      setSavingCustom(true);
      try {
        resolvedItem = await projectLibraryService.addCustom({
          name: clean,
          kind,
          category: '',
          description: '',
          unit: '',
          defaultValue: '',
          active: true,
        });
        setItems((current) => current.some((item) => normalizeLibraryName(item.name) === normalizeLibraryName(clean))
          ? current
          : [...current, resolvedItem!].sort((a, b) => a.name.localeCompare(b.name)));
        setCustomSaveNotice(`Saved “${clean}” to the reusable library.`);
      } catch (caught) {
        const code = typeof caught === 'object' && caught !== null && 'code' in caught
          ? String((caught as { code?: unknown }).code ?? '')
          : '';
        const message = code === 'permission-denied'
          ? 'Firestore blocked this library write. Deploy the current Firestore rules to the same Firebase project as this website and confirm your signed-in account has an admins/{uid} document. Run: firebase deploy --only firestore:rules --project projexiahub'
          : caught instanceof Error
            ? caught.message
            : 'Could not save this custom item to the reusable library.';
        setCustomSaveError(message);
        setSavingCustom(false);
        return;
      } finally {
        setSavingCustom(false);
      }
    }

    if (!alreadyInProject) {
      const nextValues = [...values, clean];
      const availableItems = resolvedItem && !items.some((item) => item.id === resolvedItem!.id)
        ? [...items, resolvedItem]
        : items;
      const selectedItems = nextValues
        .map((value) => availableItems.find((item) => normalizeLibraryName(item.name) === normalizeLibraryName(value)))
        .filter((item): item is ProjectLibraryItem => Boolean(item));
      onChange(nextValues, resolvedItem, selectedItems);
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
      <div className="flex flex-col gap-2">
        {values.map((value, index) => (
          <div key={`${index}-${value}`} className="min-w-0 rounded-lg border border-line bg-surface-raised/50 p-2.5">
            <div className="flex min-w-0 items-start gap-2">
              <div className="min-w-0 flex-1">
                <RichTextEditor
                  id={`library-entry-${kind}-${index}`}
                  rows={2}
                  inlineOnly
                  showToolbar={false}
                  value={value}
                  onChange={(nextValue) => onChange(values.map((item, itemIndex) => itemIndex === index ? nextValue : item))}
                  placeholder={`Edit ${label.toLocaleLowerCase()}… Select text and press Ctrl+B, Ctrl+I or Ctrl+U.`}
                />
                <p className="mt-1 text-xs text-content-muted">Select text and use Ctrl+B (bold), Ctrl+I (italic) or Ctrl+U (underline).</p>
              </div>
              <button type="button" onClick={() => onChange(values.filter((_, itemIndex) => itemIndex !== index))} aria-label={`Remove ${value}`} className="shrink-0 rounded-md p-1.5 text-content-muted hover:text-content">
                <X size={14} />
              </button>
            </div>
          </div>
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
          maxLength={10000}
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
      {customSaveError && <p role="alert" className="text-xs text-state-danger">{customSaveError}</p>}
      {customSaveNotice && <p role="status" className="text-xs text-state-success">{customSaveNotice}</p>}

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
          maxLength={10000}
          onChange={(event) => setCustom(event.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              void add(custom);
            }
          }}
          placeholder={`Add custom ${label.toLocaleLowerCase()}`}
          aria-label={`Custom ${label}`}
        />
        <button type="button" onClick={() => void add(custom)} disabled={!custom.trim() || savingCustom} className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-line px-3 text-sm disabled:opacity-40">
          <Check size={14} /> {savingCustom ? 'Saving…' : 'Add'}
        </button>
      </div>
      {search.trim() && !exactMatch && !alreadySelected && (
        <button type="button" onClick={() => void add(search)} disabled={savingCustom} className="inline-flex w-fit items-center gap-2 rounded-md border border-line px-3 py-2 text-sm hover:bg-surface-raised">
          <Plus size={14} /> Add “{search.trim()}” as a custom item
        </button>
      )}
    </div>
  );
}
