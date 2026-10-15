import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Archive, Check, Database, Pencil, Search, Trash2 } from 'lucide-react';
import { Seo } from '../../components/ui/Seo';
import { Alert } from '../../components/ui/Alert';
import { Field } from '../../components/forms/Field';
import { Select, TextArea, TextInput } from '../../components/forms/Inputs';
import { Button } from '../../components/ui/Button';
import { projectLibraryService } from '../../services/projectLibraryService';
import type { ProjectLibraryDraft, ProjectLibraryItem, ProjectLibraryKind } from '../../types/projectLibrary';

const KINDS: { value: ProjectLibraryKind; label: string }[] = [
  { value: 'component', label: 'Components' },
  { value: 'specification', label: 'Specifications' },
  { value: 'tag', label: 'Tags' },
  { value: 'feature', label: 'Features' },
  { value: 'technology', label: 'Technologies' },
  { value: 'tool', label: 'Tools & software' },
  { value: 'objective', label: 'Objectives' },
  { value: 'challenge', label: 'Challenges' },
  { value: 'category', label: 'Project categories' },
  { value: 'subcategory', label: 'Subcategories' },
  { value: 'protocol', label: 'Protocols' },
  { value: 'application', label: 'Applications' },
];
const EMPTY: ProjectLibraryDraft = { name: '', kind: 'component', category: '', description: '', unit: '', defaultValue: '', active: true };

export default function ProjectLibrary() {
  const [items, setItems] = useState<ProjectLibraryItem[]>([]);
  const [loading, setLoading] = useState(true);
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
    try { setItems(await projectLibraryService.list(true)); setError(''); }
    catch { setError('Could not load the project library. Check your connection and Firestore rules.'); }
    finally { setLoading(false); }
  };
  useEffect(() => { void reload(); }, []);

  const visible = useMemo(() => items.filter((item) =>
    (showInactive || item.active) &&
    (kind === 'all' || item.kind === kind) &&
    [item.name, item.category, item.description].join(' ').toLocaleLowerCase().includes(search.toLocaleLowerCase())
  ), [items, showInactive, kind, search]);

  const reset = () => { setDraft(EMPTY); setEditingId(undefined); setNotice(''); };
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError(''); setNotice('');
    try {
      await projectLibraryService.save(draft, editingId);
      reset(); setNotice('Library item saved.'); await reload();
    } catch (caught) { setError(caught instanceof Error ? caught.message : 'Could not save this item.'); }
  };
  const edit = (item: ProjectLibraryItem) => {
    setEditingId(item.id);
    setDraft({ name: item.name, kind: item.kind, category: item.category, description: item.description, unit: item.unit, defaultValue: item.defaultValue, active: item.active });
    setNotice(''); setError('');
  };
  const seedCatalog = async () => {
    setError(''); setNotice(''); setSeeding(true);
    try {
      const count = await projectLibraryService.seedStarterCatalog();
      setNotice(count ? `Added ${count} starter library items. Existing entries were preserved.` : 'The starter catalog is already present; no duplicates were added.');
      await reload();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not add the starter catalog.');
    } finally { setSeeding(false); }
  };
  const toggleActive = async (item: ProjectLibraryItem) => {
    try { await projectLibraryService.setActive(item.id, !item.active); await reload(); }
    catch { setError('Could not update this library item.'); }
  };
  const remove = async (item: ProjectLibraryItem) => {
    if (!window.confirm(`Permanently delete “${item.name}” from the reusable library? Existing project records will not be changed.`)) return;
    try { await projectLibraryService.remove(item.id); await reload(); }
    catch { setError('Could not delete this library item.'); }
  };

  return (
    <>
      <Seo title="Project data library" noIndex />
      <Link to="/admin/projects" className="inline-flex items-center gap-2 text-sm text-content-secondary hover:text-content"><ArrowLeft size={15} /> Projects</Link>
      <header className="mt-4">
        <h1 className="text-2xl font-semibold tracking-tight">Project data library</h1>
        <p className="mt-1.5 max-w-2xl text-sm text-content-secondary">Manage reusable options for project creation. Deactivating an item hides it from new selections; saved project data remains unchanged.</p>
      </header>
      {(error || notice) && <div className="mt-5"><Alert tone={error ? 'danger' : 'success'}>{error || notice}</Alert></div>}
      <div className="mt-6 flex flex-col gap-3 rounded-xl border border-line bg-surface-raised p-4 sm:flex-row sm:items-center sm:justify-between">
        <div><h2 className="font-semibold">Starter electronics catalog</h2><p className="mt-1 text-sm text-content-secondary">Add common electronics components, specifications, technologies, tools, tags, and features. Existing library entries are preserved.</p></div>
        <Button type="button" variant="secondary" onClick={() => void seedCatalog()} disabled={seeding}><Database size={15} /> {seeding ? "Adding catalog…" : "Add starter catalog"}</Button>
      </div>
      <form onSubmit={submit} className="mt-7 grid gap-4 rounded-xl border border-line p-4 sm:grid-cols-2">
        <h2 className="sm:col-span-2 text-lg font-semibold">{editingId ? 'Edit library item' : 'Add library item'}</h2>
        <Field label="Name" required><TextInput required maxLength={120} value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} /></Field>
        <Field label="Type" required><Select options={KINDS} value={draft.kind} onChange={(event) => setDraft({ ...draft, kind: event.target.value as ProjectLibraryKind })} /></Field>
        <Field label="Category"><TextInput maxLength={80} value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })} placeholder="e.g. Microcontrollers" /></Field>
        <Field label="Unit"><TextInput maxLength={30} value={draft.unit} onChange={(event) => setDraft({ ...draft, unit: event.target.value })} placeholder="e.g. V, mA, mm" /></Field>
        <Field label="Suggested default value"><TextInput maxLength={120} value={draft.defaultValue} onChange={(event) => setDraft({ ...draft, defaultValue: event.target.value })} placeholder="Optional; verify for each project" /></Field>
        <Field label="Description"><TextArea rows={2} maxLength={300} value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} /></Field>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={draft.active} onChange={(event) => setDraft({ ...draft, active: event.target.checked })} /> Available for new projects</label>
        <div className="flex flex-wrap gap-2 sm:col-span-2">
          <Button type="submit"><Check size={15} /> {editingId ? 'Save changes' : 'Add item'}</Button>
          {editingId && <Button type="button" variant="secondary" onClick={reset}>Cancel edit</Button>}
        </div>
      </form>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-content-muted" /><TextInput className="pl-9" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search names, categories, descriptions…" /></div>
        <Select options={[{ value: 'all', label: 'All types' }, ...KINDS]} value={kind} onChange={(event) => setKind(event.target.value as ProjectLibraryKind | 'all')} />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={showInactive} onChange={(event) => setShowInactive(event.target.checked)} /> Show inactive</label>
      </div>
      <p className="mt-3 text-sm text-content-muted">{visible.length} items shown · {items.length} total</p>
      <div className="mt-3 overflow-hidden rounded-xl border border-line">
        {loading ? <p className="p-4 text-sm text-content-muted">Loading library…</p> : visible.length ? visible.map((item) => (
          <div key={item.id} className="flex flex-col gap-3 border-b border-line p-4 last:border-b-0 sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1"><p className="font-medium">{item.name}</p><p className="mt-1 text-xs text-content-muted">{KINDS.find((entry) => entry.value === item.kind)?.label} {item.category && `· ${item.category}`} {!item.active && '· Inactive'}</p>{item.description && <p className="mt-1 text-sm text-content-secondary">{item.description}</p>}</div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="secondary" onClick={() => edit(item)}><Pencil size={14} /> Edit</Button>
              <Button type="button" variant="secondary" onClick={() => void toggleActive(item)}><Archive size={14} /> {item.active ? 'Deactivate' : 'Activate'}</Button>
              <Button type="button" variant="secondary" onClick={() => void remove(item)}><Trash2 size={14} /> Delete</Button>
            </div>
          </div>
        )) : <p className="p-4 text-sm text-content-muted">No matching library items.</p>}
      </div>
    </>
  );
}
