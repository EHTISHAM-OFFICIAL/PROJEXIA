import { useEffect, useMemo, useState } from 'react';
import { Eye, EyeOff, Pencil, Plus, Save, Search, Star, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo } from '../../components/ui/Seo';
import { Button, ButtonLink } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { schoolModelService, DEFAULT_SCHOOL_SETTINGS } from '../../services/schoolModelService';
import type { SchoolModel, SchoolSettings } from '../../services/schoolModelService';

const lines = (value: string) => [...new Set(value.split('\n').map((item) => item.trim()).filter(Boolean))];

export default function SchoolModelsAdmin() {
  const [items, setItems] = useState<SchoolModel[]>([]);
  const [settings, setSettings] = useState<SchoolSettings>(DEFAULT_SCHOOL_SETTINGS);
  const [categories, setCategories] = useState(DEFAULT_SCHOOL_SETTINGS.categories.join('\n'));
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [visibility, setVisibility] = useState('');
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const reload = async () => {
    setLoading(true);
    setError('');
    try {
      const [all, config] = await Promise.all([schoolModelService.getAll(), schoolModelService.getSettings()]);
      setItems(all);
      setSettings(config);
      setCategories(config.categories.join('\n'));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not load school models.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void reload(); }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLocaleLowerCase();
    return items.filter((item) => {
      if (category && item.category !== category) return false;
      if (visibility === 'published' && !item.published) return false;
      if (visibility === 'draft' && item.published) return false;
      return !term || `${item.title} ${item.slug} ${item.subject} ${item.category}`.toLocaleLowerCase().includes(term);
    });
  }, [items, search, category, visibility]);

  const run = async (id: string, action: () => Promise<void>, success: string) => {
    setWorking(id); setError(''); setNotice('');
    try { await action(); setNotice(success); await reload(); }
    catch (caught) { setError(caught instanceof Error ? caught.message : 'The action could not be completed.'); }
    finally { setWorking(null); }
  };

  const saveSettings = async () => {
    setError(''); setNotice('');
    const next = { ...settings, categories: lines(categories) };
    if (!next.categories.length) { setError('Add at least one category before saving.'); return; }
    try { await schoolModelService.saveSettings(next); setSettings(next); setCategories(next.categories.join('\n')); setNotice('Catalog settings saved.'); }
    catch (caught) { setError(caught instanceof Error ? caught.message : 'Could not save settings.'); }
  };

  const remove = async (item: SchoolModel) => {
    if (!window.confirm(`Permanently delete “${item.title}”? This cannot be undone.`)) return;
    await run(item.id, () => schoolModelService.delete(item.id), 'School model deleted.');
  };

  return <>
    <Seo title="School Charts & Models" noIndex />
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div><h1 className="text-2xl font-semibold tracking-tight">School Charts & Models</h1><p className="mt-1.5 text-sm text-content-secondary">{items.length} catalog items · manage content, visibility, media and categories.</p></div>
      <ButtonLink to="/admin/school-models/new"><Plus size={16} /> New school model</ButtonLink>
    </header>
    {error && <div className="mt-5"><Alert tone="danger">{error}</Alert></div>}
    {notice && <div className="mt-5"><Alert tone="success">{notice}</Alert></div>}
    <section className="mt-7 rounded-2xl border border-line bg-surface p-4 sm:p-5">
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_200px_170px]">
        <label className="relative block"><span className="sr-only">Search catalog</span><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-content-muted" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search title, subject or slug" className="h-11 w-full rounded-lg border border-line bg-bg pl-9 pr-3 text-sm" /></label>
        <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by category" className="h-11 rounded-lg border border-line bg-bg px-3 text-sm"><option value="">All categories</option>{[...new Set([...settings.categories, ...items.map((item) => item.category)])].sort((a,b)=>a.localeCompare(b)).map((item)=><option key={item} value={item}>{item}</option>)}</select>
        <select value={visibility} onChange={(event) => setVisibility(event.target.value)} aria-label="Filter by visibility" className="h-11 rounded-lg border border-line bg-bg px-3 text-sm"><option value="">All visibility</option><option value="published">Published</option><option value="draft">Drafts</option></select>
      </div>
    </section>
    <section className="mt-5">
      {loading ? <p className="rounded-xl border border-line p-8 text-center text-sm text-content-secondary">Loading catalog…</p>
        : filtered.length === 0 ? <div className="rounded-xl border border-line bg-surface p-8 text-center"><h2 className="font-semibold">{items.length ? 'No items match these filters' : 'No school models yet'}</h2><p className="mt-2 text-sm text-content-secondary">Create a model with a thumbnail, details and optional gallery images.</p>{!items.length && <ButtonLink to="/admin/school-models/new" className="mt-4"><Plus size={16}/> Create first model</ButtonLink>}</div>
        : <ul className="space-y-3">{filtered.map((item) => <li key={item.id} className="flex flex-col gap-4 rounded-xl border border-line bg-surface p-4 sm:flex-row sm:items-center">
          <div className="h-20 w-full shrink-0 overflow-hidden rounded-lg bg-surface-raised sm:w-28">{item.thumbnailUrl ? <img src={item.thumbnailUrl} alt="" className="h-full w-full object-cover" onError={(event)=>{event.currentTarget.style.display='none'}}/> : <div className="flex h-full items-center justify-center text-xs text-content-muted">No image</div>}</div>
          <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><Link to={`/admin/school-models/${item.id}/edit`} className="font-semibold hover:text-accent">{item.title}</Link><span className={`rounded-full px-2 py-0.5 text-xs ${item.published?'bg-state-success/10 text-state-success':'bg-surface-raised text-content-secondary'}`}>{item.published?'Published':'Draft'}</span>{item.featured&&<span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">Featured</span>}</div><p className="mt-1 text-sm text-content-secondary">{item.category}{item.subject ? ` · ${item.subject}` : ''}{item.gradeRange ? ` · ${item.gradeRange}` : ''}</p><p className="mt-1 truncate font-mono text-xs text-content-muted">/school-projects/{item.slug}</p></div>
          <div className="flex flex-wrap items-center gap-1"><button type="button" disabled={working===item.id} title={item.published?'Unpublish':'Publish'} aria-label={item.published?'Unpublish model':'Publish model'} onClick={()=>void run(item.id,()=>schoolModelService.setPublished(item.id,!item.published),item.published?'Model unpublished.':'Model published.')} className="rounded-lg p-2 text-content-secondary hover:bg-surface-raised disabled:opacity-40">{item.published?<EyeOff size={17}/>:<Eye size={17}/>}</button><button type="button" disabled={working===item.id} title={item.featured?'Remove from featured':'Feature on homepage'} aria-label={item.featured?'Remove featured status':'Feature model'} onClick={()=>void run(item.id,()=>schoolModelService.setFeatured(item.id,!item.featured),item.featured?'Model removed from featured items.':'Model marked as featured.')} className={`rounded-lg p-2 hover:bg-surface-raised disabled:opacity-40 ${item.featured?'text-accent':'text-content-secondary'}`}><Star size={17} fill={item.featured?'currentColor':'none'}/></button><Link to={`/admin/school-models/${item.id}/edit`} aria-label={`Edit ${item.title}`} className="rounded-lg p-2 text-content-secondary hover:bg-surface-raised"><Pencil size={17}/></Link><button type="button" disabled={working===item.id} title="Delete model" aria-label={`Delete ${item.title}`} onClick={()=>void remove(item)} className="rounded-lg p-2 text-content-secondary hover:bg-state-danger/10 hover:text-state-danger disabled:opacity-40"><Trash2 size={17}/></button></div>
        </li>)}</ul>}
    </section>
    <section className="mt-9 rounded-2xl border border-line bg-surface p-5 sm:p-7">
      <h2 className="text-lg font-semibold">Catalog & website settings</h2><p className="mt-1 text-sm text-content-secondary">Control the two service sections independently. School-model requests remain quote-based.</p>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-line p-4"><h3 className="font-medium">School Charts & Models</h3><div className="mt-3 space-y-3">{([['enabled','Enable section'],['showInNavigation','Show in navigation'],['showOnHome','Show featured models on homepage']] as const).map(([key,label])=><label key={key} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={settings[key]} onChange={(event)=>setSettings((current)=>({...current,[key]:event.target.checked}))}/>{label}</label>)}</div></div>
        <div className="rounded-xl border border-line p-4"><h3 className="font-medium">Electronics & Mechanical Projects</h3><div className="mt-3 space-y-3">{([['electronicsEnabled','Enable section'],['showElectronicsInNavigation','Show in navigation'],['showElectronicsOnHome','Show featured projects on homepage']] as const).map(([key,label])=><label key={key} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={settings[key]} onChange={(event)=>setSettings((current)=>({...current,[key]:event.target.checked}))}/>{label}</label>)}</div></div>
      </div>
      <label className="mt-5 block text-sm font-medium">School model categories (one per line)<textarea rows={6} value={categories} onChange={(event)=>setCategories(event.target.value)} className="mt-1.5 w-full rounded-lg border border-line bg-bg p-3 text-sm"/></label>
      <Button onClick={()=>void saveSettings()} className="mt-4"><Save size={16}/> Save settings</Button>
    </section>
  </>;
}
