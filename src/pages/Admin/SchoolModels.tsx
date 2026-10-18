import { useEffect, useMemo, useState } from 'react';
import { BookOpen, ChevronDown, Eye, EyeOff, FolderTree, Pencil, Plus, Save, Search, Settings2, Star, Trash2, X } from 'lucide-react';
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
  const [subcategories, setSubcategories] = useState(DEFAULT_SCHOOL_SETTINGS.subcategories.join('\n'));
  const [subjects, setSubjects] = useState(DEFAULT_SCHOOL_SETTINGS.subjects.join('\n'));
  const [modelTypes, setModelTypes] = useState(DEFAULT_SCHOOL_SETTINGS.modelTypes.join('\n'));
  const [difficulties, setDifficulties] = useState(DEFAULT_SCHOOL_SETTINGS.difficulties.join('\n'));
  const [statuses, setStatuses] = useState(DEFAULT_SCHOOL_SETTINGS.statuses.join('\n'));
  const [taxonomyKey, setTaxonomyKey] = useState<keyof Pick<SchoolSettings, 'categories' | 'subcategories' | 'subjects' | 'modelTypes' | 'difficulties' | 'statuses'>>('categories');
  const [newTaxonomyOption, setNewTaxonomyOption] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [modelType, setModelType] = useState('');
  const [difficulty, setDifficulty] = useState('');
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
      setSubcategories(config.subcategories.join('\n'));
      setSubjects(config.subjects.join('\n'));
      setModelTypes(config.modelTypes.join('\n'));
      setDifficulties(config.difficulties.join('\n'));
      setStatuses(config.statuses.join('\n'));
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
      if (modelType && item.modelType !== modelType) return false;
      if (difficulty && item.difficulty !== difficulty) return false;
      if (visibility === 'published' && !item.published) return false;
      if (visibility === 'draft' && item.published) return false;
      return !term || `${item.title} ${item.slug} ${item.subject} ${item.category} ${item.subcategory} ${item.modelType} ${item.difficulty} ${(item.tags || []).join(' ')}`.toLocaleLowerCase().includes(term);
    });
  }, [items, search, category, modelType, difficulty, visibility]);

  const run = async (id: string, action: () => Promise<void>, success: string) => {
    setWorking(id); setError(''); setNotice('');
    try { await action(); setNotice(success); await reload(); }
    catch (caught) { setError(caught instanceof Error ? caught.message : 'The action could not be completed.'); }
    finally { setWorking(null); }
  };

  const saveSettings = async () => {
    setError(''); setNotice('');
    const next = { ...settings, categories: lines(categories), subcategories: lines(subcategories), subjects: lines(subjects), modelTypes: lines(modelTypes), difficulties: lines(difficulties), statuses: lines(statuses) };
    if (!next.categories.length) { setError('Add at least one category before saving.'); return; }
    try { await schoolModelService.saveSettings(next); setSettings(next); setCategories(next.categories.join('\n')); setSubcategories(next.subcategories.join('\n')); setSubjects(next.subjects.join('\n')); setModelTypes(next.modelTypes.join('\n')); setDifficulties(next.difficulties.join('\n')); setStatuses(next.statuses.join('\n')); setNotice('Catalog settings saved.'); }
    catch (caught) { setError(caught instanceof Error ? caught.message : 'Could not save settings.'); }
  };

  const remove = async (item: SchoolModel) => {
    if (!window.confirm(`Permanently delete “${item.title}”? This cannot be undone.`)) return;
    await run(item.id, () => schoolModelService.delete(item.id), 'School model deleted.');
  };

  return <>
    <Seo title="School Charts & Models" noIndex />
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div><h1 className="text-2xl font-semibold tracking-tight">School Charts & Models</h1><p className="mt-1.5 text-sm text-content-secondary">{items.length} catalog items · manage content, visibility, media, classification and reusable catalog options.</p></div>
      <ButtonLink to="/admin/school-models/new"><Plus size={16} /> New school model</ButtonLink>
    </header>
    {error && <div className="mt-5"><Alert tone="danger">{error}</Alert></div>}
    {notice && <div className="mt-5"><Alert tone="success">{notice}</Alert></div>}
    <section className="mt-7 rounded-2xl border border-line bg-surface p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent"><Settings2 size={16}/></span><div><h2 className="text-sm font-semibold">Find a school model</h2><p className="text-xs text-content-muted">Search the catalog or narrow it using the dropdown filters.</p></div></div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_repeat(4,minmax(145px,170px))]">
        <label className="relative block"><span className="sr-only">Search catalog</span><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-content-muted" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search title, subject or slug" className="h-11 w-full rounded-xl border border-line bg-bg pl-9 pr-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15" /></label>
        <div className="relative"><select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by category" className="h-11 w-full appearance-none rounded-xl border border-line bg-bg px-3 pr-9 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"><option value="">All categories</option>{[...new Set([...settings.categories, ...items.map((item) => item.category)])].sort((a,b)=>a.localeCompare(b)).map((item)=><option key={item} value={item}>{item}</option>)}</select><ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-content-muted"/></div>
        <div className="relative"><select value={modelType} onChange={(event) => setModelType(event.target.value)} aria-label="Filter by model format" className="h-11 w-full appearance-none rounded-xl border border-line bg-bg px-3 pr-9 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"><option value="">All formats</option>{[...new Set([...settings.modelTypes,...items.map((item)=>item.modelType).filter(Boolean)])].sort().map((value)=><option key={value} value={value}>{value}</option>)}</select><ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-content-muted"/></div>
        <div className="relative"><select value={difficulty} onChange={(event) => setDifficulty(event.target.value)} aria-label="Filter by difficulty" className="h-11 w-full appearance-none rounded-xl border border-line bg-bg px-3 pr-9 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"><option value="">All difficulty levels</option>{[...new Set([...settings.difficulties,...items.map((item)=>item.difficulty).filter(Boolean)])].sort().map((value)=><option key={value} value={value}>{value}</option>)}</select><ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-content-muted"/></div>
        <div className="relative"><select value={visibility} onChange={(event) => setVisibility(event.target.value)} aria-label="Filter by visibility" className="h-11 w-full appearance-none rounded-xl border border-line bg-bg px-3 pr-9 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"><option value="">All visibility</option><option value="published">Published</option><option value="draft">Drafts</option></select><ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-content-muted"/></div>
      </div>
      {(category || modelType || difficulty || visibility || search) && <div className="mt-3 flex flex-wrap items-center gap-2"><span className="text-xs text-content-muted">Active filters:</span>{category && <button type="button" onClick={()=>setCategory('')} className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-xs text-accent">{category}<X size={12}/></button>}{modelType && <button type="button" onClick={()=>setModelType('')} className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-xs text-accent">{modelType}<X size={12}/></button>}{difficulty && <button type="button" onClick={()=>setDifficulty('')} className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-xs text-accent">{difficulty}<X size={12}/></button>}{visibility && <button type="button" onClick={()=>setVisibility('')} className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-xs text-accent">{visibility==='published'?'Published':'Drafts'}<X size={12}/></button>}{search && <button type="button" onClick={()=>setSearch('')} className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-xs text-accent">“{search}”<X size={12}/></button>}<button type="button" onClick={()=>{setSearch('');setCategory('');setModelType('');setDifficulty('');setVisibility('');}} className="ml-1 text-xs font-medium text-content-secondary underline underline-offset-2 hover:text-content">Clear all</button></div>}
    </section>
    <section className="mt-5">
      {loading ? <p className="rounded-xl border border-line p-8 text-center text-sm text-content-secondary">Loading catalog…</p>
        : filtered.length === 0 ? <div className="rounded-xl border border-line bg-surface p-8 text-center"><h2 className="font-semibold">{items.length ? 'No items match these filters' : 'No school models yet'}</h2><p className="mt-2 text-sm text-content-secondary">Create a model with a thumbnail, details and optional gallery images.</p>{!items.length && <ButtonLink to="/admin/school-models/new" className="mt-4"><Plus size={16}/> Create first model</ButtonLink>}</div>
        : <ul className="space-y-3">{filtered.map((item) => <li key={item.id} className="flex flex-col gap-4 rounded-xl border border-line bg-surface p-4 sm:flex-row sm:items-center">
          <div className="h-20 w-full shrink-0 overflow-hidden rounded-lg bg-surface-raised sm:w-28">{item.thumbnailUrl ? <img src={item.thumbnailUrl} alt="" className="h-full w-full object-cover" onError={(event)=>{event.currentTarget.style.display='none'}}/> : <div className="flex h-full items-center justify-center text-xs text-content-muted">No image</div>}</div>
          <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><Link to={`/admin/school-models/${item.id}/edit`} className="font-semibold hover:text-accent">{item.title}</Link><span className={`rounded-full px-2 py-0.5 text-xs ${item.published?'bg-state-success/10 text-state-success':'bg-surface-raised text-content-secondary'}`}>{item.published?'Published':'Draft'}</span>{item.featured&&<span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">Featured</span>}{item.status&&<span className="rounded-full border border-line px-2 py-0.5 text-xs text-content-secondary">{item.status}</span>}</div><p className="mt-1 text-sm text-content-secondary">{item.category}{item.subcategory ? ` / ${item.subcategory}` : ''}{item.subject ? ` · ${item.subject}` : ''}{item.modelType ? ` · ${item.modelType}` : ''}{item.difficulty ? ` · ${item.difficulty}` : ''}{item.gradeRange ? ` · ${item.gradeRange}` : ''}</p><p className="mt-1 truncate font-mono text-xs text-content-muted">/school-projects/{item.slug}</p>{item.tags?.length>0&&<p className="mt-1 truncate text-xs text-content-muted">Tags: {item.tags.join(" · ")}</p>}</div>
          <div className="flex flex-wrap items-center gap-1"><button type="button" disabled={working===item.id} title={item.published?'Unpublish':'Publish'} aria-label={item.published?'Unpublish model':'Publish model'} onClick={()=>void run(item.id,()=>schoolModelService.setPublished(item.id,!item.published),item.published?'Model unpublished.':'Model published.')} className="rounded-lg p-2 text-content-secondary hover:bg-surface-raised disabled:opacity-40">{item.published?<EyeOff size={17}/>:<Eye size={17}/>}</button><button type="button" disabled={working===item.id} title={item.featured?'Remove from featured':'Feature on homepage'} aria-label={item.featured?'Remove featured status':'Feature model'} onClick={()=>void run(item.id,()=>schoolModelService.setFeatured(item.id,!item.featured),item.featured?'Model removed from featured items.':'Model marked as featured.')} className={`rounded-lg p-2 hover:bg-surface-raised disabled:opacity-40 ${item.featured?'text-accent':'text-content-secondary'}`}><Star size={17} fill={item.featured?'currentColor':'none'}/></button><Link to={`/admin/school-models/${item.id}/edit`} aria-label={`Edit ${item.title}`} className="rounded-lg p-2 text-content-secondary hover:bg-surface-raised"><Pencil size={17}/></Link><button type="button" disabled={working===item.id} title="Delete model" aria-label={`Delete ${item.title}`} onClick={()=>void remove(item)} className="rounded-lg p-2 text-content-secondary hover:bg-state-danger/10 hover:text-state-danger disabled:opacity-40"><Trash2 size={17}/></button></div>
        </li>)}</ul>}
    </section>
    <section className="mt-9 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="border-b border-line bg-surface-raised/40 px-5 py-5 sm:px-7"><div className="flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent"><Settings2 size={19}/></span><div><h2 className="text-lg font-semibold tracking-tight">Catalog & website settings</h2><p className="mt-1 max-w-2xl text-sm leading-relaxed text-content-secondary">Manage which service sections appear on the site and maintain the dropdown options used throughout the school-model catalog. Requests stay quote-based.</p></div></div></div>
      <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-2">
        <div className="rounded-xl border border-line bg-bg/40 p-4 sm:p-5"><div className="flex items-center gap-2"><BookOpen size={17} className="text-accent"/><h3 className="font-semibold">School Charts & Models</h3></div><p className="mt-1 text-xs text-content-muted">Control the visibility of the educational catalog.</p><div className="mt-4 space-y-3">{([['enabled','Enable section'],['showInNavigation','Show in navigation'],['showOnHome','Show featured models on homepage']] as const).map(([key,label])=><label key={key} className="flex cursor-pointer items-center gap-3 rounded-lg border border-line bg-surface px-3 py-3 text-sm transition hover:border-accent/40"><input type="checkbox" className="h-4 w-4 accent-accent" checked={settings[key]} onChange={(event)=>setSettings((current)=>({...current,[key]:event.target.checked}))}/><span>{label}</span></label>)}</div></div>
        <div className="rounded-xl border border-line bg-bg/40 p-4 sm:p-5"><div className="flex items-center gap-2"><FolderTree size={17} className="text-accent"/><h3 className="font-semibold">Electronics & Mechanical Projects</h3></div><p className="mt-1 text-xs text-content-muted">These controls apply to the electronics catalog only.</p><div className="mt-4 space-y-3">{([['electronicsEnabled','Enable section'],['showElectronicsInNavigation','Show in navigation'],['showElectronicsOnHome','Show featured projects on homepage']] as const).map(([key,label])=><label key={key} className="flex cursor-pointer items-center gap-3 rounded-lg border border-line bg-surface px-3 py-3 text-sm transition hover:border-accent/40"><input type="checkbox" className="h-4 w-4 accent-accent" checked={settings[key]} onChange={(event)=>setSettings((current)=>({...current,[key]:event.target.checked}))}/><span>{label}</span></label>)}</div></div>
      </div>
      <div className="border-t border-line p-4 sm:p-6">
        <div className="mb-4"><h3 className="font-semibold">Dropdown option manager</h3><p className="mt-1 text-sm text-content-secondary">Choose an option group, add values, or remove outdated entries. Changes are saved with the settings button below.</p></div>
        <div className="grid gap-4 lg:grid-cols-[minmax(220px,0.7fr)_minmax(0,1.3fr)]">
          <div><label htmlFor="school-taxonomy-select" className="mb-1.5 block text-sm font-medium">Option group</label><div className="relative"><select id="school-taxonomy-select" value={taxonomyKey} onChange={(event)=>setTaxonomyKey(event.target.value as typeof taxonomyKey)} className="h-12 w-full appearance-none rounded-xl border border-line bg-bg px-3 pr-10 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"><option value="categories">Categories</option><option value="subcategories">Subcategories</option><option value="subjects">Subjects</option><option value="modelTypes">Model formats</option><option value="difficulties">Difficulty levels</option><option value="statuses">Catalog statuses</option></select><ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-content-muted"/></div><p className="mt-2 text-xs leading-relaxed text-content-muted">This group controls the matching dropdown in the model editor and catalog filters.</p></div>
          <div className="min-w-0 rounded-xl border border-line bg-bg/40 p-4 sm:p-5"><div className="flex items-center justify-between gap-3"><div><p className="text-sm font-semibold">{({categories:'Categories',subcategories:'Subcategories',subjects:'Subjects',modelTypes:'Model formats',difficulties:'Difficulty levels',statuses:'Catalog statuses'})[taxonomyKey]}</p><p className="mt-1 text-xs text-content-muted">{lines(({categories,subcategories,subjects,modelTypes,difficulties,statuses})[taxonomyKey]).length} available options</p></div><span className="rounded-lg bg-accent/10 p-2 text-accent"><FolderTree size={17}/></span></div>
            <form className="mt-4 flex flex-col gap-2 sm:flex-row" onSubmit={(event)=>{event.preventDefault();const value=newTaxonomyOption.trim().replace(/\s+/g,' ');if(!value)return;const setterMap={categories:setCategories,subcategories:setSubcategories,subjects:setSubjects,modelTypes:setModelTypes,difficulties:setDifficulties,statuses:setStatuses};const currentMap={categories:categories,subcategories:subcategories,subjects:subjects,modelTypes:modelTypes,difficulties:difficulties,statuses:statuses};const existing=lines(currentMap[taxonomyKey]);if(existing.some((item)=>item.toLocaleLowerCase()===value.toLocaleLowerCase())){setError('That option already exists in this group.');return;}setterMap[taxonomyKey]([...existing,value].sort((a,b)=>a.localeCompare(b,undefined,{sensitivity:'base'})).join('\n'));setNewTaxonomyOption('');setError('');setNotice('Option added to the pending settings changes.');}}><input value={newTaxonomyOption} onChange={(event)=>setNewTaxonomyOption(event.target.value)} maxLength={80} placeholder="Type a new option…" className="h-11 min-w-0 flex-1 rounded-xl border border-line bg-bg px-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15"/><Button type="submit" variant="secondary" disabled={!newTaxonomyOption.trim()}><Plus size={15}/> Add option</Button></form>
            <div className="mt-4 flex flex-wrap gap-2">{lines(({categories,subcategories,subjects,modelTypes,difficulties,statuses})[taxonomyKey]).map((option)=><span key={option} className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs text-content"><span className="max-w-[240px] truncate">{option}</span><button type="button" onClick={()=>{if(taxonomyKey==='categories'&&lines(categories).length===1){setError('Keep at least one category.');return;}const setterMap={categories:setCategories,subcategories:setSubcategories,subjects:setSubjects,modelTypes:setModelTypes,difficulties:setDifficulties,statuses:setStatuses};const currentMap={categories:categories,subcategories:subcategories,subjects:subjects,modelTypes:modelTypes,difficulties:difficulties,statuses:statuses};setterMap[taxonomyKey](lines(currentMap[taxonomyKey]).filter((item)=>item!==option).join('\n'));setError('');setNotice('Option removed from pending settings changes.');}} aria-label={'Remove '+option} className="rounded p-0.5 text-content-muted transition hover:bg-state-danger/10 hover:text-state-danger"><X size={13}/></button></span>)}</div>
            {lines(({categories,subcategories,subjects,modelTypes,difficulties,statuses})[taxonomyKey]).length===0&&<p className="mt-4 rounded-lg border border-dashed border-line p-4 text-center text-sm text-content-muted">No options in this group yet. Add the first one above.</p>}
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs leading-relaxed text-content-muted">Remember to save after adding or removing options. Existing models keep their saved values until you edit them.</p><Button onClick={()=>void saveSettings()}><Save size={16}/> Save catalog settings</Button></div>
      </div>
    </section>
  </>;
}
