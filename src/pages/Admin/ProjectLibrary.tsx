import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Archive, Check, CheckCircle2, Database, Layers3, Pencil, Search, Trash2, X } from 'lucide-react';
import { Seo } from '../../components/ui/Seo';
import { Alert } from '../../components/ui/Alert';
import { Field } from '../../components/forms/Field';
import { Select, TextArea, TextInput } from '../../components/forms/Inputs';
import { Button } from '../../components/ui/Button';
import { projectLibraryService } from '../../services/projectLibraryService';
import { PROJECT_CATEGORIES, sortProjectCategories } from '../../constants/categories';
import type { ProjectLibraryDraft, ProjectLibraryItem, ProjectLibraryKind } from '../../types/projectLibrary';

const KINDS: { value: ProjectLibraryKind; label: string }[] = [
  { value: 'category', label: 'Project categories' },
  { value: 'subcategory', label: 'Subcategories' },
  { value: 'difficulty', label: 'Difficulty levels' },
  { value: 'status', label: 'Project statuses' },
  { value: 'component', label: 'Components' },
  { value: 'specification', label: 'Specifications' },
  { value: 'technology', label: 'Technologies' },
  { value: 'tool', label: 'Tools & software' },
  { value: 'protocol', label: 'Protocols & interfaces' },
  { value: 'application', label: 'Applications' },
  { value: 'tag', label: 'Tags' },
  { value: 'objective', label: 'Objectives' },
  { value: 'feature', label: 'Features' },
  { value: 'challenge', label: 'Challenges' },
];
const EMPTY: ProjectLibraryDraft = { name: '', kind: 'component', category: '', description: '', unit: '', defaultValue: '', active: true };
const isCatchAll = (name: string) => /^(other|others)$/i.test(name.trim());

function sortLibraryItems(items: ProjectLibraryItem[]) {
  return [...items].sort((a, b) => {
    if (a.kind === 'category' && b.kind === 'category' && isCatchAll(a.name) !== isCatchAll(b.name)) {
      return isCatchAll(a.name) ? 1 : -1;
    }
    return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
  });
}

export default function ProjectLibrary() {
  const [items, setItems] = useState<ProjectLibraryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [busyItemId, setBusyItemId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [kind, setKind] = useState<ProjectLibraryKind | 'all'>('all');
  const [draft, setDraft] = useState<ProjectLibraryDraft>(EMPTY);
  const [editingId, setEditingId] = useState<string | undefined>();
  const [showInactive, setShowInactive] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [seeding, setSeeding] = useState(false);

  const reload = async () => {
    setLoading(true);
    try {
      setItems(sortLibraryItems(await projectLibraryService.list(true)));
      setError('');
    } catch {
      setError('Could not load the project library. Check your connection and Firestore rules.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { void reload(); }, []);

  const visible = useMemo(() => sortLibraryItems(items.filter((item) =>
    (showInactive || item.active) &&
    (kind === 'all' || item.kind === kind) &&
    [item.name, item.category, item.description, item.unit, item.defaultValue]
      .join(' ')
      .toLocaleLowerCase()
      .includes(search.trim().toLocaleLowerCase())
  )), [items, showInactive, kind, search]);

  const activeCount = items.filter((item) => item.active).length;
  const inactiveCount = items.length - activeCount;
  const typeCount = new Set(items.map((item) => item.kind)).size;
  const categoryNames = sortProjectCategories([
    ...PROJECT_CATEGORIES,
    ...items.filter((item) => item.kind === 'category').map((item) => item.name),
  ]);

  const reset = () => {
    setDraft(EMPTY);
    setEditingId(undefined);
    setNotice('');
    setError('');
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setNotice('');
    setSaving(true);
    try {
      await projectLibraryService.save(draft, editingId);
      setKind(draft.kind);
      setSearch('');
      setShowInactive(!draft.active);
      setDraft(EMPTY);
      setEditingId(undefined);
      setNotice(editingId ? 'Library item updated successfully.' : 'Library item added successfully.');
      await reload();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not save this item.');
    } finally {
      setSaving(false);
    }
  };

  const edit = (item: ProjectLibraryItem) => {
    setEditingId(item.id);
    setDraft({
      name: item.name,
      kind: item.kind,
      category: item.category,
      description: item.description,
      unit: item.unit,
      defaultValue: item.defaultValue,
      active: item.active,
    });
    setKind(item.kind);
    setNotice('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const seedCatalog = async () => {
    setError('');
    setNotice('');
    setSeeding(true);
    try {
      const count = await projectLibraryService.seedStarterCatalog();
      setNotice(count
        ? `Added ${count} starter library items. Existing entries and custom values were preserved.`
        : 'The starter catalog is already present; no duplicates were added.');
      await reload();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not add the starter catalog.');
    } finally {
      setSeeding(false);
    }
  };

  const toggleActive = async (item: ProjectLibraryItem) => {
    setError('');
    setNotice('');
    setBusyItemId(item.id);
    try {
      await projectLibraryService.setActive(item.id, !item.active);
      setNotice(item.active
        ? `“${item.name}” is now inactive. Existing projects are unchanged.`
        : `“${item.name}” is active and available for new selections.`);
      await reload();
    } catch {
      setError('Could not update this library item. Check your connection and Firestore permissions.');
    } finally {
      setBusyItemId(null);
    }
  };

  const remove = async (item: ProjectLibraryItem) => {
    if (!window.confirm(`Permanently delete “${item.name}” from the reusable library? Existing project records will not be changed. If you only want to hide it from future selections, choose Deactivate instead.`)) return;
    setError('');
    setNotice('');
    setBusyItemId(item.id);
    try {
      await projectLibraryService.remove(item.id);
      if (editingId === item.id) reset();
      setNotice(`“${item.name}” was deleted from the reusable library. Existing projects were not changed.`);
      await reload();
    } catch {
      setError('Could not delete this library item. Check your connection and Firestore permissions.');
    } finally {
      setBusyItemId(null);
    }
  };

  return (
    <>
      <Seo title="Project data library" noIndex />
      <Link to="/admin/projects" className="inline-flex items-center gap-2 text-sm text-content-secondary transition-colors hover:text-content">
        <ArrowLeft size={15} aria-hidden="true" /> Projects
      </Link>

      <header className="mt-4">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-raised text-accent">
            <Database size={21} aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Project data library</h1>
            <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-content-secondary">
              One place to maintain reusable project options. Changes affect future selections; they do not rewrite existing project records.
            </p>
          </div>
        </div>
      </header>

      {(error || notice) && (
        <div className="mt-5">
          <Alert tone={error ? 'danger' : 'success'}>{error || notice}</Alert>
        </div>
      )}

      <section className="mt-6 grid gap-3 sm:grid-cols-3" aria-label="Library summary">
        <div className="rounded-xl border border-line bg-surface-raised p-4">
          <p className="text-sm text-content-secondary">Library entries</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">{items.length}</p>
          <p className="mt-1 text-xs text-content-muted">Across {KINDS.length} supported types</p>
        </div>
        <div className="rounded-xl border border-line bg-surface-raised p-4">
          <p className="flex items-center gap-2 text-sm text-content-secondary"><CheckCircle2 size={15} aria-hidden="true" /> Active entries</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">{activeCount}</p>
          <p className="mt-1 text-xs text-content-muted">Available in new selections</p>
        </div>
        <div className="rounded-xl border border-line bg-surface-raised p-4">
          <p className="flex items-center gap-2 text-sm text-content-secondary"><Layers3 size={15} aria-hidden="true" /> Inactive entries</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums">{inactiveCount}</p>
          <p className="mt-1 text-xs text-content-muted">Hidden from new selections</p>
        </div>
      </section>

      <section className="mt-5 flex flex-col gap-3 rounded-xl border border-line bg-surface-raised p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="font-semibold">Starter electronics catalog</h2>
          <p className="mt-1 text-sm leading-relaxed text-content-secondary">
            Add the suggested electronics catalog to Firestore. Existing custom entries are preserved and duplicate names of the same type are skipped.
          </p>
        </div>
        <Button type="button" variant="secondary" onClick={() => void seedCatalog()} disabled={seeding || loading || saving}>
          <Database size={15} aria-hidden="true" /> {seeding ? 'Adding catalog…' : 'Add starter catalog'}
        </Button>
      </section>

      <section className="mt-6 rounded-xl border border-line p-4 sm:p-5">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">{editingId ? 'Edit library item' : 'Add a library item'}</h2>
          <p className="mt-1 text-sm text-content-secondary">
            {editingId ? 'Update the selected reusable option. Avoid changing its type unless you intend to recategorize it.' : 'Create a reusable option for any supported project field. Names are checked for duplicates within the same type.'}
          </p>
        </div>
        <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" required hint="Use a clear name that can be reused across projects.">
            <TextInput required maxLength={120} value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="e.g. DHT22 Temperature Sensor" />
          </Field>
          <Field label="Type" required hint="This determines which project editor field can use this entry.">
            <Select options={KINDS} value={draft.kind} onChange={(event) => setDraft({ ...draft, kind: event.target.value as ProjectLibraryKind })} />
          </Field>

          <Field
            label={draft.kind === 'component' ? 'Component type' : draft.kind === 'subcategory' ? 'Parent category' : 'Category / grouping'}
            hint={draft.kind === 'component'
              ? 'Copied into the component Type field when selected.'
              : draft.kind === 'subcategory'
                ? 'Choose a project category to group this subcategory, or leave blank for a general option.'
                : 'Optional grouping used to organize or describe related options.'}
          >
            {draft.kind === 'subcategory' ? (
              <Select
                options={categoryNames.map((name) => ({ value: name, label: name }))}
                value={draft.category}
                onChange={(event) => setDraft({ ...draft, category: event.target.value })}
                placeholder="No parent category"
              />
            ) : (
              <TextInput
                maxLength={120}
                value={draft.category}
                onChange={(event) => setDraft({ ...draft, category: event.target.value })}
                placeholder={draft.kind === 'component' ? 'e.g. Sensor, controller, motor driver' : 'Optional grouping'}
              />
            )}
          </Field>

          <Field
            label={draft.kind === 'component' ? 'Default quantity unit' : 'Unit'}
            hint={draft.kind === 'component'
              ? 'Prefills a practical quantity unit such as pc, set, roll, or m.'
              : draft.kind === 'specification'
                ? 'Optional unit for a suggested specification, e.g. V, mA, mm, or °C.'
                : 'Optional measurement unit, if relevant.'}
          >
            <TextInput maxLength={120} value={draft.unit} onChange={(event) => setDraft({ ...draft, unit: event.target.value })} placeholder={draft.kind === 'component' ? 'e.g. pc, set, pair, roll, m' : 'e.g. V, mA, mm'} />
          </Field>

          <Field
            label={draft.kind === 'specification' ? 'Suggested specification value' : 'Suggested default value'}
            hint={draft.kind === 'specification' ? 'A suggestion only; verify it for each actual build.' : 'Optional value to prefill when appropriate.'}
          >
            <TextInput maxLength={500} value={draft.defaultValue} onChange={(event) => setDraft({ ...draft, defaultValue: event.target.value })} placeholder="Optional; verify for each project" />
          </Field>

          <Field
            label={draft.kind === 'component' ? 'Component notes' : 'Description'}
            hint={draft.kind === 'component' ? 'Copied into component Notes when selected. Keep it practical and specific.' : 'Optional notes to help you identify the right reusable option.'}
          >
            <TextArea rows={3} maxLength={2000} value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} placeholder="Optional notes…" />
          </Field>

          <div className="flex flex-col justify-between gap-4 sm:col-span-2 sm:flex-row sm:items-center">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={draft.active} onChange={(event) => setDraft({ ...draft, active: event.target.checked })} />
              Available for new projects
            </label>
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={saving || seeding}>
                <Check size={15} aria-hidden="true" /> {saving ? 'Saving…' : editingId ? 'Save changes' : 'Add item'}
              </Button>
              {editingId && <Button type="button" variant="secondary" disabled={saving} onClick={reset}><X size={15} aria-hidden="true" /> Cancel edit</Button>}
            </div>
          </div>
        </form>
      </section>

      <section className="mt-8" aria-label="Browse project library">
        <div className="flex flex-col gap-3">
          <div>
            <h2 className="text-lg font-semibold">Browse library</h2>
            <p className="mt-1 text-sm text-content-secondary">Search all metadata or filter by type and availability.</p>
          </div>
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-content-muted" aria-hidden="true" />
              <TextInput className="pl-9 pr-9" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search names, categories, notes, units…" aria-label="Search project library" />
              {search && <button type="button" onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-content-muted hover:text-content" aria-label="Clear search"><X size={14} aria-hidden="true" /></button>}
            </div>
            <div className="w-full lg:w-64">
              <Select options={[{ value: 'all', label: 'All types' }, ...KINDS]} value={kind} onChange={(event) => setKind(event.target.value as ProjectLibraryKind | 'all')} />
            </div>
            <label className="flex shrink-0 items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm">
              <input type="checkbox" checked={showInactive} onChange={(event) => setShowInactive(event.target.checked)} />
              Show inactive
            </label>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-content-muted">{visible.length} shown · {items.length} total · {typeCount} types in use</p>
          {(search || kind !== 'all' || showInactive) && (
            <button type="button" onClick={() => { setSearch(''); setKind('all'); setShowInactive(false); }} className="text-sm font-medium text-accent hover:underline">
              Clear filters
            </button>
          )}
        </div>

        <div className="mt-3 overflow-hidden rounded-xl border border-line">
          {loading ? (
            <div className="p-5 text-sm text-content-muted">Loading library entries…</div>
          ) : visible.length ? visible.map((item) => (
            <article key={item.id} className="flex flex-col gap-3 border-b border-line p-4 last:border-b-0 sm:flex-row sm:items-start">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="break-words font-medium">{item.name}</h3>
                  <span className={item.active
                    ? 'rounded-full border border-state-success/30 bg-state-success/5 px-2 py-0.5 text-xs text-content-secondary'
                    : 'rounded-full border border-line bg-surface-raised px-2 py-0.5 text-xs text-content-muted'}>
                    {item.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="mt-1 text-xs text-content-muted">
                  {KINDS.find((entry) => entry.value === item.kind)?.label ?? item.kind}
                  {item.category && ` · ${item.category}`}
                </p>
                {item.description && <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-content-secondary">{item.description}</p>}
                {(item.unit || item.defaultValue) && (
                  <p className="mt-2 break-words text-xs text-content-muted">
                    {item.unit && `Unit: ${item.unit}`}{item.unit && item.defaultValue ? ' · ' : ''}{item.defaultValue && `Suggested value: ${item.defaultValue}`}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end">
                <Button type="button" variant="secondary" disabled={Boolean(busyItemId) || saving || seeding} onClick={() => edit(item)}><Pencil size={14} aria-hidden="true" /> Edit</Button>
                <Button type="button" variant="secondary" disabled={Boolean(busyItemId) || saving || seeding} onClick={() => void toggleActive(item)}><Archive size={14} aria-hidden="true" /> {busyItemId === item.id ? 'Updating…' : item.active ? 'Deactivate' : 'Activate'}</Button>
                <Button type="button" variant="secondary" disabled={Boolean(busyItemId) || saving || seeding} onClick={() => void remove(item)}><Trash2 size={14} aria-hidden="true" /> Delete</Button>
              </div>
            </article>
          )) : (
            <div className="p-6 text-center">
              <p className="font-medium">No matching library entries</p>
              <p className="mt-1 text-sm text-content-muted">Try a different search or type, or add a new item above.</p>
              {(search || kind !== 'all' || showInactive) && <Button type="button" variant="secondary" className="mt-3" onClick={() => { setSearch(''); setKind('all'); setShowInactive(false); }}>Clear filters</Button>}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
