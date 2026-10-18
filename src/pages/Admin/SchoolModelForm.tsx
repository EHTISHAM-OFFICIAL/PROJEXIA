import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowLeft, CheckCircle2, ChevronDown, Circle, Eye, GraduationCap, ImagePlus, Save, Trash2, Plus } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Seo } from '../../components/ui/Seo';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { Skeleton } from '../../components/ui/Skeleton';
import { Field, FieldSet } from '../../components/forms/Field';
import { Select, TextArea, TextInput } from '../../components/forms/Inputs';
import { RichTextEditor } from '../../components/forms/RichTextEditor';
import { Checkbox } from '../../components/forms/Choice';
import { ImageUploadField } from '../../components/forms/ImageUploadField';
import { ListEditor, TableEditor } from '../../components/forms/ListEditor';
import { schoolModelService, DEFAULT_SCHOOL_SETTINGS } from '../../services/schoolModelService';
import type { SchoolModelComponent, SchoolModelDraft, SchoolModelSpecification, SchoolSettings } from '../../services/schoolModelService';
import { imgbbService } from '../../services/imgbbService';

const EMPTY: SchoolModelDraft = {
  title: '', slug: '', category: 'Science Charts', subcategory: '', modelType: 'Static Chart', difficulty: 'Easy', status: 'Available for quote', subject: '', gradeRange: '',
  shortDescription: '', description: '', problemStatement: '', workingPrinciple: '', howToUse: '', materials: [], objectives: [], features: [], customizationOptions: [], setupInstructions: '', maintenanceNotes: '', safetyNotes: '', components: [], specifications: [], tags: [], dimensions: '', estimatedBuildTime: '',
  thumbnailUrl: '', heroImageUrl: '', galleryUrls: [], videoUrl: '', documentationUrl: '', featured: false, published: false, seoTitle: '', seoDescription: '', keywords: [],
};
const lines = (value: string) => [...new Set(value.split('\n').map((item) => item.trim()).filter(Boolean))];
const EMPTY_COMPONENT: SchoolModelComponent = { name: '', category: '', quantity: '1', notes: '', optional: false };
const EMPTY_SPECIFICATION: SchoolModelSpecification = { label: '', value: '' };
type TaxonomyKey = 'categories' | 'subcategories' | 'modelTypes' | 'difficulties' | 'statuses' | 'subjects';

export default function SchoolModelForm() {
  const { id } = useParams<{ id: string }>();
  const editing = Boolean(id);
  const navigate = useNavigate();
  const [draft, setDraft] = useState<SchoolModelDraft>(EMPTY);
  const [settings, setSettings] = useState<SchoolSettings>(DEFAULT_SCHOOL_SETTINGS);
  const [materials, setMaterials] = useState('');
  const [objectives, setObjectives] = useState('');
  const [features, setFeatures] = useState('');
  const [customizationOptions, setCustomizationOptions] = useState('');
  const [keywords, setKeywords] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [subcategoryInput, setSubcategoryInput] = useState('');
  const [modelTypeInput, setModelTypeInput] = useState('');
  const [difficultyInput, setDifficultyInput] = useState('');
  const [statusInput, setStatusInput] = useState('');
  const [subjectInput, setSubjectInput] = useState('');
  const [tags, setTags] = useState('');
  const [gallery, setGallery] = useState('');
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [initialSnapshot, setInitialSnapshot] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void Promise.all([schoolModelService.getSettings(), schoolModelService.getAll()]).then(([config, all]) => {
      if (!active) return;
      setSettings(config);
      if (id) {
        const item = all.find((entry) => entry.id === id);
        if (!item) { setError('This school model could not be found.'); setLoading(false); return; }
        const { id: _id, createdAt: _created, updatedAt: _updated, ...rest } = item;
        setDraft(rest);
        setMaterials(rest.materials.join('\n'));
        setObjectives(rest.objectives.join('\n'));
        setFeatures((rest.features ?? []).join('\n'));
        setCustomizationOptions((rest.customizationOptions ?? []).join('\n'));
        setKeywords((rest.keywords ?? []).join(', '));
        setTags((rest.tags ?? []).join(', '));
        setGallery(rest.galleryUrls.join('\n'));
        setInitialSnapshot(JSON.stringify({ draft: rest, materials: rest.materials.join('\n'), objectives: rest.objectives.join('\n'), features: (rest.features ?? []).join('\n'), customizationOptions: (rest.customizationOptions ?? []).join('\n'), keywords: (rest.keywords ?? []).join(', '), tags: (rest.tags ?? []).join(', '), gallery: rest.galleryUrls.join('\n') }));
      } else {
        const next = { ...EMPTY, category: config.categories[0] || 'Others' };
        setDraft(next);
        setInitialSnapshot(JSON.stringify({ draft: next, materials: '', objectives: '', features: '', customizationOptions: '', keywords: '', tags: '', gallery: '' }));
      }
      setLoading(false);
    }).catch((caught) => {
      if (active) { setError(caught instanceof Error ? caught.message : 'Could not load the editor.'); setLoading(false); }
    });
    return () => { active = false; };
  }, [id]);

  const update = <K extends keyof SchoolModelDraft>(key: K, value: SchoolModelDraft[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));

  const addTaxonomyOption = async (key: TaxonomyKey, rawValue: string, clear: () => void) => {
    const name = rawValue.trim().replace(/\s+/g, ' ');
    if (!name) return;
    const nextValues = [...new Set([...settings[key], name])].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    const nextSettings = { ...settings, [key]: nextValues };
    setError('');
    setNotice('');
    try {
      await schoolModelService.saveSettings(nextSettings);
      setSettings(nextSettings);
      if (key === 'categories') update('category', name);
      if (key === 'subcategories') update('subcategory', name);
      if (key === 'modelTypes') update('modelType', name);
      if (key === 'difficulties') update('difficulty', name);
      if (key === 'statuses') update('status', name);
      if (key === 'subjects') update('subject', name);
      clear();
      setNotice('“' + name + '” has been added to the reusable school-model options.');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not save this reusable option.');
    }
  };

  const currentSnapshot = JSON.stringify({ draft, materials, objectives, features, customizationOptions, keywords, tags, gallery });
  const hasUnsavedChanges = initialSnapshot !== null && currentSnapshot !== initialSnapshot;
  const basicsComplete = Boolean(draft.title.trim() && draft.shortDescription.trim() && draft.category.trim());
  const sections = [
    { id: 'school-model-basics', label: 'Basics', complete: basicsComplete, required: true },
    { id: 'school-model-media', label: 'Media', complete: Boolean(draft.thumbnailUrl || draft.heroImageUrl || gallery.trim() || draft.videoUrl), required: false },
    { id: 'school-model-story', label: 'Educational story', complete: Boolean(draft.description.trim() || draft.problemStatement.trim() || draft.workingPrinciple.trim() || draft.howToUse.trim() || objectives.trim()), required: false },
    { id: 'school-model-technical', label: 'Materials & specs', complete: Boolean(materials.trim() || draft.components.some((item) => item.name.trim()) || draft.specifications.some((item) => item.label.trim()) || tags.trim()), required: false },
    { id: 'school-model-features', label: 'Features & customization', complete: Boolean(features.trim() || customizationOptions.trim() || draft.setupInstructions.trim() || draft.maintenanceNotes.trim() || draft.safetyNotes.trim()), required: false },
    { id: 'school-model-links', label: 'Links & SEO', complete: Boolean(draft.documentationUrl || draft.seoTitle || draft.seoDescription || keywords.trim()), required: false },
    { id: 'school-model-publishing', label: 'Visibility', complete: Boolean(draft.published || draft.featured), required: false },
  ];
  const completedRequired = [draft.title.trim(), draft.shortDescription.trim(), draft.category.trim()].filter(Boolean).length;

  useEffect(() => {
    if (!hasUnsavedChanges || saving) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ''; };
    const confirmInternalNavigation = (event: MouseEvent) => {
      if (previewOpen || !(event.target instanceof Element)) return;
      const link = event.target.closest('a[href]') as HTMLAnchorElement | null;
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      if (!window.confirm('You have unsaved school model changes. Leave this page and discard them?')) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };
    window.addEventListener('beforeunload', warn);
    document.addEventListener('click', confirmInternalNavigation, true);
    return () => {
      window.removeEventListener('beforeunload', warn);
      document.removeEventListener('click', confirmInternalNavigation, true);
    };
  }, [hasUnsavedChanges, saving, previewOpen]);

  const cancel = () => {
    if (hasUnsavedChanges && !window.confirm('You have unsaved changes. Discard them and leave the editor?')) return;
    navigate('/admin/school-models');
  };

  const uploadGallery = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true); setError(''); setNotice('');
    try {
      const urls = await Promise.all(Array.from(files).map(async (file) => (await imgbbService.upload(file)).url));
      const next = [...lines(gallery), ...urls];
      setGallery(next.join('\n'));
      update('galleryUrls', next);
      setNotice(`${urls.length} gallery image${urls.length === 1 ? '' : 's'} uploaded. Save the model to keep your changes.`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Image upload failed. You can paste image URLs instead.');
    } finally { setUploading(false); }
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault(); setError(''); setNotice('');
    if (!draft.title.trim()) { setError('Add a title before saving.'); document.getElementById('school-title')?.focus(); return; }
    if (!draft.shortDescription.trim()) { setError('Add a short description for the catalog card.'); document.getElementById('school-short-description')?.focus(); return; }
    if (!draft.category.trim()) { setError('Choose a category before saving.'); return; }
    if (draft.slug.trim() && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(draft.slug.trim())) { setError('The URL slug can use lowercase letters, numbers and hyphens only.'); document.getElementById('school-slug')?.focus(); return; }
    setSaving(true);
    try {
      await schoolModelService.save({ ...draft, title: draft.title.trim(), slug: draft.slug.trim(), materials: lines(materials), objectives: lines(objectives), features: lines(features), customizationOptions: lines(customizationOptions), tags: lines(tags.replace(/,/g, '\n')), keywords: lines(keywords.replace(/,/g, '\n')), components: draft.components.filter((item) => item.name.trim()), specifications: draft.specifications.filter((item) => item.label.trim()), galleryUrls: lines(gallery) }, id);
      navigate('/admin/school-models', { replace: true, state: { notice: editing ? 'School model updated.' : 'School model created.' } });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not save this school model.');
    } finally { setSaving(false); }
  };

  const scrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (section instanceof HTMLDetailsElement) section.open = true;
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (loading) return <><Seo title={editing ? 'Edit school model' : 'New school model'} noIndex/><Skeleton className="h-12 w-full"/><Skeleton className="mt-5 h-96 w-full"/></>;

  return <>
    <Seo title={editing ? 'Edit school model' : 'New school model'} noIndex />
    <Link to="/admin/school-models" onClick={(event)=>{if(hasUnsavedChanges&&!window.confirm('You have unsaved changes. Discard them and leave the editor?'))event.preventDefault();}} className="inline-flex items-center gap-2 rounded-md py-2 text-sm text-content-secondary transition-colors hover:text-content"><ArrowLeft size={15}/> All school models</Link>

    <header className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div><div className="mb-2 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium text-accent"><GraduationCap size={14}/> SCHOOL CHARTS & EDUCATIONAL MODELS</div><h1 className="text-2xl font-semibold tracking-tight">{editing ? 'Edit school model' : 'Create a school model'}</h1><p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-content-secondary">Build a complete, polished catalog entry. Add only the educational details that apply; every field beyond the title, category and short description is optional.</p></div>
      <Button type="button" variant="secondary" onClick={()=>setPreviewOpen(true)}><Eye size={16}/> Preview card</Button>
    </header>

    <section className="mt-6 rounded-xl border border-line bg-surface/40 p-4 sm:p-5" aria-label="Editor progress">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-semibold">Editor progress</p><p className="mt-1 text-xs text-content-muted">Required details: {completedRequired} of 3 completed. Other sections are optional.</p></div><span className={completedRequired===3?'inline-flex items-center gap-1.5 text-sm font-medium text-state-success':'inline-flex items-center gap-1.5 text-sm font-medium text-content-secondary'}>{completedRequired===3?<CheckCircle2 size={16}/>:<Circle size={16}/>} {completedRequired===3?'Ready to save':'Required details remaining'}</span></div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-raised" role="progressbar" aria-label="Required school model details" aria-valuemin={0} aria-valuemax={3} aria-valuenow={completedRequired}><div className="h-full rounded-full bg-accent transition-[width]" style={{width:`${completedRequired/3*100}%`}}/></div>
      <div className="mt-4 flex flex-wrap gap-2">{sections.map((section)=><button key={section.id} type="button" onClick={()=>scrollTo(section.id)} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs transition-colors hover:bg-surface-raised">{section.complete?<CheckCircle2 size={14} className="text-state-success"/>:section.required?<Circle size={14} className="text-content-muted"/>:<span className="h-3.5 w-3.5 rounded-full border border-line"/>}<span>{section.label}</span><span className="text-content-muted">{section.required?(section.complete?'Complete':'Required'):(section.complete?'Added':'Optional')}</span></button>)}</div>
    </section>

    {hasUnsavedChanges&&<div className="mt-4 rounded-lg border border-state-warning/40 bg-state-warning/5 px-4 py-3 text-sm text-content-secondary" role="status">You have unsaved changes. Save the model before leaving, or discard them when prompted.</div>}
    {(error||notice)&&<div className="mt-5"><Alert tone={error?'danger':'success'}>{error||notice}</Alert></div>}

    {previewOpen&&<div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4" role="dialog" aria-modal="true" aria-label="School model preview"><div className="w-full max-w-2xl rounded-2xl border border-line bg-bg p-5 shadow-2xl sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wide text-accent">Live preview</p><h2 className="mt-1 text-xl font-semibold">Catalog card preview</h2></div><button type="button" onClick={()=>setPreviewOpen(false)} className="rounded-lg border border-line px-3 py-1.5 text-sm hover:bg-surface-raised">Close</button></div><div className="mt-5 overflow-hidden rounded-xl border border-line bg-surface sm:flex">{draft.thumbnailUrl?<img src={draft.thumbnailUrl} alt="" className="aspect-[16/10] w-full object-cover sm:w-2/5" onError={(event)=>{event.currentTarget.style.display='none'}}/>:<div className="flex aspect-[16/10] w-full items-center justify-center bg-surface-raised text-content-muted sm:w-2/5"><ImagePlus size={28}/></div>}<div className="flex flex-1 flex-col p-5"><div className="flex flex-wrap gap-2"><span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs text-accent">{draft.category||'Category'}</span>{draft.gradeRange&&<span className="rounded-full bg-surface-raised px-2.5 py-1 text-xs text-content-secondary">{draft.gradeRange}</span>}</div><h3 className="mt-3 text-lg font-semibold">{draft.title||'Your school model title'}</h3><p className="mt-2 text-sm leading-relaxed text-content-secondary">{draft.shortDescription||'Your short description will appear here.'}</p>{draft.dimensions&&<p className="mt-auto pt-4 text-xs text-content-muted">Approx. dimensions: {draft.dimensions}</p>}</div></div><p className="mt-4 text-xs text-content-muted">This is a preview of the catalog card, not a published page.</p></div></div>}

    <form onSubmit={submit} className="mt-8 flex max-w-5xl flex-col gap-5">
      <Group id="school-model-basics" title="Basics" subtitle="Title, classification and public-facing description" defaultOpen>
        <Field label="Model / chart title" htmlFor="school-title" required hint="Use the name a student, teacher or parent would search for.">
          <TextInput id="school-title" value={draft.title} maxLength={120} onChange={(event)=>update('title',event.target.value)} placeholder="e.g. Human Digestive System Model"/>
        </Field>
        <Field label="URL slug" htmlFor="school-slug" hint={'Public address: /school-projects/' + (draft.slug || 'your-model')}><TextInput id="school-slug" value={draft.slug} onChange={(event)=>update('slug',event.target.value.toLowerCase().replace(/[^a-z0-9-]/g,'-').replace(/-+/g,'-'))} placeholder="human-digestive-system-model"/></Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Category" htmlFor="school-category" required hint="Main catalog group. Add reusable options for future models.">
            <Select id="school-category" options={[...new Set([...settings.categories,draft.category].filter(Boolean))]} value={draft.category} onChange={(event)=>update('category',event.target.value)}/>
            <div className="mt-2 flex gap-2"><TextInput value={categoryInput} maxLength={60} onChange={(event)=>setCategoryInput(event.target.value)} placeholder="New category…" aria-label="New school model category"/><Button type="button" variant="secondary" disabled={!categoryInput.trim()||saving} onClick={()=>void addTaxonomyOption('categories',categoryInput,()=>setCategoryInput(''))}><Plus size={14}/> Add</Button></div>
          </Field>
          <Field label="Subcategory" htmlFor="school-subcategory" hint="A more specific grouping, such as Anatomy or Working Models.">
            <Select id="school-subcategory" options={[...new Set([...settings.subcategories,draft.subcategory].filter(Boolean))]} value={draft.subcategory} onChange={(event)=>update('subcategory',event.target.value)} placeholder="Choose subcategory"/>
            <div className="mt-2 flex gap-2"><TextInput value={subcategoryInput} maxLength={60} onChange={(event)=>setSubcategoryInput(event.target.value)} placeholder="New subcategory…" aria-label="New subcategory"/><Button type="button" variant="secondary" disabled={!subcategoryInput.trim()||saving} onClick={()=>void addTaxonomyOption('subcategories',subcategoryInput,()=>setSubcategoryInput(''))}><Plus size={14}/> Add</Button></div>
          </Field>
          <Field label="Subject" htmlFor="school-subject" hint="The academic subject this model supports.">
            <Select id="school-subject" options={[...new Set([...settings.subjects,draft.subject].filter(Boolean))]} value={draft.subject} onChange={(event)=>update('subject',event.target.value)} placeholder="Choose subject"/>
            <div className="mt-2 flex gap-2"><TextInput value={subjectInput} maxLength={60} onChange={(event)=>setSubjectInput(event.target.value)} placeholder="New subject…" aria-label="New subject"/><Button type="button" variant="secondary" disabled={!subjectInput.trim()||saving} onClick={()=>void addTaxonomyOption('subjects',subjectInput,()=>setSubjectInput(''))}><Plus size={14}/> Add</Button></div>
          </Field>
          <Field label="Model format" htmlFor="school-model-type" hint="For example, a static chart or working model.">
            <Select id="school-model-type" options={[...new Set([...settings.modelTypes,draft.modelType].filter(Boolean))]} value={draft.modelType} onChange={(event)=>update('modelType',event.target.value)} placeholder="Choose format"/>
            <div className="mt-2 flex gap-2"><TextInput value={modelTypeInput} maxLength={60} onChange={(event)=>setModelTypeInput(event.target.value)} placeholder="New format…" aria-label="New model format"/><Button type="button" variant="secondary" disabled={!modelTypeInput.trim()||saving} onClick={()=>void addTaxonomyOption('modelTypes',modelTypeInput,()=>setModelTypeInput(''))}><Plus size={14}/> Add</Button></div>
          </Field>
          <Field label="Difficulty" htmlFor="school-difficulty" hint="A general indication of build or demonstration complexity.">
            <Select id="school-difficulty" options={[...new Set([...settings.difficulties,draft.difficulty].filter(Boolean))]} value={draft.difficulty} onChange={(event)=>update('difficulty',event.target.value)}/>
            <div className="mt-2 flex gap-2"><TextInput value={difficultyInput} maxLength={40} onChange={(event)=>setDifficultyInput(event.target.value)} placeholder="New difficulty…" aria-label="New difficulty"/><Button type="button" variant="secondary" disabled={!difficultyInput.trim()||saving} onClick={()=>void addTaxonomyOption('difficulties',difficultyInput,()=>setDifficultyInput(''))}><Plus size={14}/> Add</Button></div>
          </Field>
          <Field label="Catalog status" htmlFor="school-status" hint="Describes how the model is offered; publishing is controlled separately.">
            <Select id="school-status" options={[...new Set([...settings.statuses,draft.status].filter(Boolean))]} value={draft.status} onChange={(event)=>update('status',event.target.value)}/>
            <div className="mt-2 flex gap-2"><TextInput value={statusInput} maxLength={60} onChange={(event)=>setStatusInput(event.target.value)} placeholder="New status…" aria-label="New catalog status"/><Button type="button" variant="secondary" disabled={!statusInput.trim()||saving} onClick={()=>void addTaxonomyOption('statuses',statusInput,()=>setStatusInput(''))}><Plus size={14}/> Add</Button></div>
          </Field>
          <Field label="Grade / class range" htmlFor="school-grade" hint="Who is this model designed for?">
            <TextInput id="school-grade" value={draft.gradeRange} onChange={(event)=>update('gradeRange',event.target.value)} placeholder="e.g. Classes 6–10"/>
          </Field>
          <Field label="Approximate dimensions" htmlFor="school-dimensions" hint="Include units; indicate if customizable.">
            <TextInput id="school-dimensions" value={draft.dimensions} onChange={(event)=>update('dimensions',event.target.value)} placeholder="e.g. 60 × 90 cm (customizable)"/>
          </Field>
          <Field label="Estimated build / preparation time" htmlFor="school-build-time" hint="An estimate, not a delivery promise.">
            <TextInput id="school-build-time" value={draft.estimatedBuildTime} onChange={(event)=>update('estimatedBuildTime',event.target.value)} placeholder="e.g. 3–5 working days after approval"/>
          </Field>
        </div>
                <Field label="Short description" htmlFor="school-short-description" required hint="A concise summary shown on catalog cards. Up to 320 characters.">
          <TextArea id="school-short-description" rows={3} maxLength={320} value={draft.shortDescription} onChange={(event)=>update('shortDescription',event.target.value)} placeholder="Explain what the chart or model demonstrates and why it is useful."/>
        </Field>
        <Field label="Full description" htmlFor="school-description" hint="Use paragraphs and simple formatting to explain the concept, key parts and educational value.">
          <RichTextEditor id="school-description" rows={6} value={draft.description} onChange={(value)=>update('description',value)} placeholder="Describe the concept, key parts, how it demonstrates the topic, and possible customization."/>
        </Field>
      </Group>

      <Group id="school-model-media" title="Images" subtitle="Thumbnail and additional gallery photos">
        <FieldSet legend="Thumbnail" hint="The primary catalog image. A landscape image with a clear subject works best.">
          <ImageUploadField label="Thumbnail" value={draft.thumbnailUrl||null} disabled={uploading||saving} onUpload={async(file)=>{const uploaded=await imgbbService.upload(file);update('thumbnailUrl',uploaded.url);setNotice('Thumbnail uploaded. Save the model to keep the change.');}} onClear={()=>update('thumbnailUrl','')}/>
          <Field label="Or paste a thumbnail URL" htmlFor="school-thumbnail-url"><TextInput id="school-thumbnail-url" type="url" value={draft.thumbnailUrl} onChange={(event)=>update('thumbnailUrl',event.target.value)} placeholder="https://…"/></Field>
        </FieldSet>
        <FieldSet legend="Hero image" hint="A larger image for the top of the public detail page. Optional; it can differ from the catalog thumbnail.">
          <ImageUploadField label="Hero image" value={draft.heroImageUrl || null} disabled={uploading || saving} onUpload={async (file) => { const uploaded = await imgbbService.upload(file); update('heroImageUrl', uploaded.url); setNotice('Hero image uploaded. Save the model to keep the change.'); }} onClear={() => update('heroImageUrl', '')}/>
          <Field label="Or paste a hero image URL" htmlFor="school-hero-url"><TextInput id="school-hero-url" type="url" value={draft.heroImageUrl} onChange={(event) => update('heroImageUrl', event.target.value)} placeholder="https://…"/></Field>
        </FieldSet>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Video demonstration URL" htmlFor="school-video-url" hint="Optional YouTube or Vimeo link; do not paste a private file link."><TextInput id="school-video-url" type="url" value={draft.videoUrl} onChange={(event) => update('videoUrl', event.target.value)} placeholder="https://…"/></Field>
          <Field label="Documentation / lesson resource URL" htmlFor="school-doc-url" hint="Optional worksheet, reference page or public guide."><TextInput id="school-doc-url" type="url" value={draft.documentationUrl} onChange={(event) => update('documentationUrl', event.target.value)} placeholder="https://…"/></Field>
        </div>
        <FieldSet legend="Gallery images" hint="Add real photos from different angles or close-ups. Add one URL per line, or upload several images at once.">
          <div className="grid gap-3 sm:grid-cols-2">{lines(gallery).map((url,index)=><div key={url+index} className="overflow-hidden rounded-xl border border-line bg-surface"><img src={url} alt={`Gallery image ${index+1}`} className="aspect-[16/10] w-full object-cover" onError={(event)=>{event.currentTarget.style.display='none'}}/><div className="flex items-center justify-between gap-2 p-3"><p className="min-w-0 truncate text-xs text-content-muted">Image {index+1}</p><button type="button" onClick={()=>{const next=lines(gallery).filter((_,position)=>position!==index);setGallery(next.join('\n'));update('galleryUrls',next)}} className="rounded-md p-1.5 text-content-muted hover:bg-surface-raised hover:text-state-danger" aria-label={`Remove gallery image ${index+1}`}><Trash2 size={15}/></button></div></div>)}</div>
          <Field label="Gallery image URLs" htmlFor="school-gallery-urls" hint="One image URL per line. Removing a line removes that image from the gallery."><TextArea id="school-gallery-urls" rows={4} value={gallery} onChange={(event)=>{setGallery(event.target.value);update('galleryUrls',lines(event.target.value))}} placeholder="https://image-one…&#10;https://image-two…"/></Field>
          <label className="inline-flex cursor-pointer items-center gap-2 self-start rounded-lg border border-line bg-surface px-4 py-2.5 text-sm font-medium transition hover:bg-surface-raised"><ImagePlus size={16}/>{uploading?'Uploading images…':'Upload gallery images'}<input type="file" accept="image/*" multiple disabled={uploading||saving} onChange={(event)=>{void uploadGallery(event.target.files);event.currentTarget.value=''}} className="sr-only"/></label>
        </FieldSet>
      </Group>

      <Group id="school-model-story" title="Educational story" subtitle="Explain the concept, the learning value and how the model is used">
        <Field label="Full description" htmlFor="school-description" hint="Blank lines create separate paragraphs; use headings and lists for long explanations.">
          <RichTextEditor id="school-description" rows={7} value={draft.description} onChange={(value) => update('description', value)} placeholder="Describe the model, its purpose, key parts and the learning experience."/>
        </Field>
        <Field label="Problem / learning need" htmlFor="school-problem" hint="What topic is difficult to explain without this visual or working aid?">
          <RichTextEditor id="school-problem" rows={4} value={draft.problemStatement} onChange={(value) => update('problemStatement', value)} placeholder="Describe the classroom need or concept this model helps explain."/>
        </Field>
        <Field label="Working principle / how it demonstrates the concept" htmlFor="school-principle">
          <RichTextEditor id="school-principle" rows={5} value={draft.workingPrinciple} onChange={(value) => update('workingPrinciple', value)} placeholder="Explain the mechanism, process, labeled parts or demonstration."/>
        </Field>
        <Field label="How teachers or students use it" htmlFor="school-how-to-use">
          <RichTextEditor id="school-how-to-use" rows={4} value={draft.howToUse} onChange={(value) => update('howToUse', value)} placeholder="Describe a simple classroom activity or demonstration flow."/>
        </Field>
        <FieldSet legend="Learning objectives" hint="One measurable outcome per line.">
          <TextArea id="school-objectives" rows={5} value={objectives} onChange={(event) => setObjectives(event.target.value)} placeholder={'Identify key parts\nExplain the process\nCompare concepts'}/>
        </FieldSet>
      </Group>

      <Group id="school-model-technical" title="Materials, components & specifications" subtitle="Make the build contents and physical details clear">
        <Field label="Materials / included supplies" htmlFor="school-materials" hint="One item per line. Keep this list high-level; use the component table for quantities and notes.">
          <TextArea id="school-materials" rows={5} value={materials} onChange={(event) => setMaterials(event.target.value)} placeholder={'Foam board\nPrinted labels\nWooden base\nFasteners and adhesives'}/>
        </Field>
        <FieldSet legend="Components / parts" hint="Add reusable parts, quantities, optional items and any useful notes.">
          <TableEditor<SchoolModelComponent> label="Component" rows={draft.components} emptyRow={EMPTY_COMPONENT} onChange={(rows) => update('components', rows)} columns={[
            { key: 'name', label: 'Part / material' },
            { key: 'category', label: 'Type' },
            { key: 'quantity', label: 'Quantity', width: 'w-24' },
            { key: 'notes', label: 'Notes', type: 'richtext' },
            { key: 'optional', label: 'Optional', type: 'checkbox', width: 'w-24' },
          ]}/>
        </FieldSet>
        <FieldSet legend="Specifications" hint="Add dimensions, material, display, power or other relevant specifications. Leave unknown values blank.">
          <TableEditor<SchoolModelSpecification> label="Specification" rows={draft.specifications} emptyRow={EMPTY_SPECIFICATION} onChange={(rows) => update('specifications', rows)} columns={[
            { key: 'label', label: 'Specification' },
            { key: 'value', label: 'Value', type: 'richtext', inlineOnly: true },
          ]}/>
        </FieldSet>
        <Field label="Search / discovery tags" htmlFor="school-tags" hint="Comma-separated terms used to help people discover this model.">
          <TextInput id="school-tags" value={tags} onChange={(event) => setTags(event.target.value)} placeholder="biology, classroom display, human anatomy"/>
        </Field>
      </Group>

      <Group id="school-model-features" title="Features & customization" subtitle="What makes this model useful and how it can be adapted">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Key features" htmlFor="school-features" hint="One feature per line. These are shown on the public detail page."><TextArea id="school-features" rows={5} value={features} onChange={(event)=>setFeatures(event.target.value)} placeholder={'Labeled key parts\nInteractive demonstration\nReusable classroom display'}/></Field>
          <Field label="Customization options" htmlFor="school-customization-options" hint="One option per line, such as language, colors or size."><TextArea id="school-customization-options" rows={5} value={customizationOptions} onChange={(event)=>setCustomizationOptions(event.target.value)} placeholder={'Custom dimensions\nUrdu or English labels\nSchool name / logo'}/></Field>
        </div>
        <Field label="Assembly, setup & demonstration notes" htmlFor="school-setup-instructions" hint="Optional public-facing instructions or notes for teachers."><RichTextEditor id="school-setup-instructions" rows={4} value={draft.setupInstructions} onChange={(value)=>update('setupInstructions',value)} placeholder="Explain any setup, handling or demonstration steps that are useful to know."/></Field>
      </Group>

      <Group id="school-model-publishing" title="Publishing & SEO" subtitle="Homepage visibility and search metadata">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="SEO title" htmlFor="school-seo-title" hint="Keep it descriptive; around 50–60 characters is a useful target."><TextInput id="school-seo-title" maxLength={70} value={draft.seoTitle} onChange={(event)=>update('seoTitle',event.target.value)} placeholder={draft.title||'School model title'}/></Field>
          <Field label="SEO description" htmlFor="school-seo-description" hint="A short summary for search results."><TextArea id="school-seo-description" rows={3} maxLength={180} value={draft.seoDescription} onChange={(event)=>update('seoDescription',event.target.value)} placeholder="Describe this educational model in a clear sentence."/></Field>
          <Field label="Search keywords" htmlFor="school-keywords" hint="Comma-separated phrases that help describe this item."><TextInput id="school-keywords" value={keywords} onChange={(event)=>setKeywords(event.target.value)} placeholder="biology model, classroom chart, science project"/></Field>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-line p-4"><Checkbox id="school-featured" label="Feature this item" description="Allow it to appear in featured school-model sections." checked={draft.featured} onChange={(event)=>update('featured',event.target.checked)}/></div>
          <div className="rounded-xl border border-line p-4"><Checkbox id="school-published" label="Publish this item" description="Published models can be seen by visitors. Drafts remain in admin." checked={draft.published} onChange={(event)=>update('published',event.target.checked)}/></div>
        </div>
      </Group>

      <div className="sticky bottom-3 z-20 flex flex-col gap-3 rounded-xl border border-line bg-bg/95 p-3 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-4">
        <p className="text-xs text-content-muted">{hasUnsavedChanges?'Unsaved changes':'All changes saved'} · Pricing remains quote-based.</p>
        <div className="flex flex-wrap gap-2"><Button type="button" variant="secondary" onClick={cancel}>Cancel</Button><Button type="submit" loading={saving||uploading} disabled={saving||uploading}><Save size={16}/>{saving?'Saving…':editing?'Save changes':'Create school model'}</Button></div>
      </div>
    </form>
  </>;
}

function Group({ id, title, subtitle, children, defaultOpen = false }: { id: string; title: string; subtitle: string; children: ReactNode; defaultOpen?: boolean }) {
  return <details id={id} open={defaultOpen} className="group scroll-mt-24 rounded-xl border border-line bg-surface/40">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-4 transition-colors hover:bg-surface-raised/60 [&::-webkit-details-marker]:hidden sm:px-5">
      <span className="min-w-0"><span className="block text-base font-semibold tracking-tight">{title}</span><span className="mt-0.5 block text-xs text-content-muted">{subtitle}</span></span>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-content-muted transition-transform group-open:rotate-180"><ChevronDown size={16}/></span>
    </summary>
    <div className="border-t border-line px-4 py-5 sm:px-5"><div className="flex flex-col gap-5">{children}</div></div>
  </details>;
}
