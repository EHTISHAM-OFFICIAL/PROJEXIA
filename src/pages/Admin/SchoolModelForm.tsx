import { useEffect, useState, type ReactNode } from 'react';
import { ArrowLeft, CheckCircle2, ChevronDown, Circle, Eye, GraduationCap, GripVertical, ImagePlus, Save, Plus } from 'lucide-react';
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
import { ImageProcessingDialog } from '../../components/forms/ImageProcessingDialog';
import { ListEditor, TableEditor } from '../../components/forms/ListEditor';
import { schoolModelService, DEFAULT_SCHOOL_SETTINGS } from '../../services/schoolModelService';
import type { SchoolModelComponent, SchoolModelDraft, SchoolModelSpecification, SchoolSettings } from '../../services/schoolModelService';
import { imgbbService } from '../../services/imgbbService';
import { slugify } from '../../utils/slug';
import { useToast } from '../../contexts/ToastContext';

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
  const { notify } = useToast();
  const [draft, setDraft] = useState<SchoolModelDraft>(EMPTY);
  const [slugTouched, setSlugTouched] = useState(false);
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
  const [galleryUrlInput, setGalleryUrlInput] = useState('');
  const [draggingGalleryIndex, setDraggingGalleryIndex] = useState<number | null>(null);
  const [galleryQueue, setGalleryQueue] = useState<File[]>([]);
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
        setSlugTouched(true);
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

  const updateTitle = (title: string) => setDraft((current) => ({ ...current, title, slug: slugTouched ? current.slug : slugify(title) }));

  const addTaxonomyOption = async (key: TaxonomyKey, rawValue: string, clear: () => void) => {
    const name = rawValue.trim().replace(/\s+/g, ' ');
    if (!name) return;
    const nextValues = [...new Set([...settings[key], name])].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    const nextSettings: SchoolSettings = { ...settings, [key]: nextValues };
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
    { id: 'school-model-basics', step: '01', label: 'Basic information', description: 'Name, category and short summary', complete: basicsComplete, required: true },
    { id: 'school-model-media', step: '02', label: 'Images & media', description: 'Catalog image, gallery and video', complete: Boolean(draft.thumbnailUrl || draft.heroImageUrl || gallery.trim() || draft.videoUrl), required: false },
    { id: 'school-model-story', step: '03', label: 'Learning content', description: 'Explain what students learn and how it works', complete: Boolean(draft.description.trim() || draft.problemStatement.trim() || draft.workingPrinciple.trim() || draft.howToUse.trim() || objectives.trim()), required: false },
    { id: 'school-model-technical', step: '04', label: 'Build details', description: 'Materials, included parts and specifications', complete: Boolean(materials.trim() || draft.components.some((item) => item.name.trim()) || draft.specifications.some((item) => item.label.trim()) || tags.trim()), required: false },
    { id: 'school-model-features', step: '05', label: 'Use & customization', description: 'Features, options, setup and care', complete: Boolean(features.trim() || customizationOptions.trim() || draft.setupInstructions.trim() || draft.maintenanceNotes.trim() || draft.safetyNotes.trim()), required: false },
    { id: 'school-model-links', step: '06', label: 'Search & resources', description: 'SEO details and supporting links', complete: Boolean(draft.documentationUrl || draft.seoTitle || draft.seoDescription || keywords.trim()), required: false },
    { id: 'school-model-publishing', step: '07', label: 'Review & publish', description: 'Feature it or make it visible to visitors', complete: Boolean(draft.published || draft.featured), required: false },
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

  const uploadGallery = (files: FileList | null) => {
    if (!files?.length) return;
    setError('');
    setNotice('');
    setGalleryQueue(Array.from(files));
  };

  const uploadPreparedGalleryImage = async (file: File) => {
    setUploading(true);
    setError('');
    try {
      const uploaded = await imgbbService.upload(file);
      const next = [...lines(gallery), uploaded.url];
      setGallery(next.join('\n'));
      update('galleryUrls', next);
      setGalleryQueue((current) => current.slice(1));
      setNotice('Gallery image uploaded. Save the model to keep your changes.');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Image upload failed. You can paste image URLs instead.');
      throw caught;
    } finally {
      setUploading(false);
    }
  };

  const submit = async (event?: { preventDefault: () => void }, publish?: boolean) => {
    event?.preventDefault(); setError(''); setNotice('');
    if (!draft.title.trim()) { setError('Add a title before saving.'); document.getElementById('school-title')?.focus(); return; }
    if (!draft.shortDescription.trim()) { setError('Add a short description for the catalog card.'); document.getElementById('school-short-description')?.focus(); return; }
    if (!draft.category.trim()) { setError('Choose a category before saving.'); return; }
    if (draft.slug.trim() && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(draft.slug.trim())) { setError('The URL slug can use lowercase letters, numbers and hyphens only.'); document.getElementById('school-slug')?.focus(); return; }
    setSaving(true);
    try {
      await schoolModelService.save({ ...draft, title: draft.title.trim(), slug: draft.slug.trim(), materials: lines(materials), objectives: lines(objectives), features: lines(features), customizationOptions: lines(customizationOptions), tags: lines(tags.replace(/,/g, '\n')), keywords: lines(keywords.replace(/,/g, '\n')), components: draft.components.filter((item) => item.name.trim()), specifications: draft.specifications.filter((item) => item.label.trim()), galleryUrls: lines(gallery), published: publish ?? draft.published }, id);
      notify({ title: publish ? 'School model published' : editing ? 'School model changes saved' : 'School model draft saved', message: 'Your school model has been saved successfully.', tone: 'success' });
      navigate('/admin/school-models', { replace: true, state: { notice: publish ? 'School model saved and published.' : editing ? 'School model updated.' : 'School model created.' } });
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : 'Could not save this school model.';
      setError(message);
      notify({ title: 'Could not save school model', message, tone: 'error' });
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
      <div><div className="mb-2 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium text-accent"><GraduationCap size={14}/> SCHOOL CHARTS & EDUCATIONAL MODELS</div><h1 className="text-2xl font-semibold tracking-tight">{editing ? 'Edit school model' : 'Create a school model'}</h1><p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-content-secondary">Work through the sections below in order. Start with the three required details, then add only the media and educational information that applies to this item.</p></div>
      <Button type="button" variant="secondary" onClick={()=>setPreviewOpen(true)}><Eye size={16}/> Preview card</Button>
    </header>

    <section className="mt-6 rounded-xl border border-line bg-surface/40 p-4 sm:p-5" aria-label="Editor guide"><div className="mb-4 flex items-start gap-3 rounded-lg bg-accent/5 p-3"><div className="mt-0.5 rounded-lg bg-accent/10 p-2 text-accent"><CheckCircle2 size={16}/></div><div><p className="text-sm font-semibold">A simple way to complete this form</p><p className="mt-1 text-xs leading-relaxed text-content-secondary">1. Add the title, category and short description. 2. Add images and explain the learning purpose. 3. List supplied materials and parts if known. 4. Review visibility and save. Everything else is optional and can be filled in later.</p></div></div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-semibold">Editor progress</p><p className="mt-1 text-xs text-content-muted">Required details: {completedRequired} of 3 completed. Other sections are optional.</p></div><span className={completedRequired===3?'inline-flex items-center gap-1.5 text-sm font-medium text-state-success':'inline-flex items-center gap-1.5 text-sm font-medium text-content-secondary'}>{completedRequired===3?<CheckCircle2 size={16}/>:<Circle size={16}/>} {completedRequired===3?'Ready to save':'Required details remaining'}</span></div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-raised" role="progressbar" aria-label="Required school model details" aria-valuemin={0} aria-valuemax={3} aria-valuenow={completedRequired}><div className="h-full rounded-full bg-accent transition-[width]" style={{width:`${completedRequired/3*100}%`}}/></div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">{sections.map((section)=><button key={section.id} type="button" onClick={()=>scrollTo(section.id)} className="flex min-w-0 items-start gap-3 rounded-xl border border-line bg-bg/70 p-3 text-left transition-colors hover:border-accent/40 hover:bg-surface-raised"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-raised text-xs font-semibold text-content-secondary">{section.complete?<CheckCircle2 size={16} className="text-state-success"/>:section.step}</span><span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-2 text-sm font-medium text-content">{section.label}<span className={section.required?'rounded-full bg-state-warning/10 px-1.5 py-0.5 text-[10px] font-medium text-state-warning':'rounded-full bg-surface-raised px-1.5 py-0.5 text-[10px] text-content-muted'}>{section.required?'Required':'Optional'}</span></span><span className="mt-1 block text-xs leading-relaxed text-content-muted">{section.description}</span></span></button>)}</div>
    </section>

    {hasUnsavedChanges&&<div className="mt-4 rounded-lg border border-state-warning/40 bg-state-warning/5 px-4 py-3 text-sm text-content-secondary" role="status">You have unsaved changes. Save the model before leaving, or discard them when prompted.</div>}
    {(error||notice)&&<div className="mt-5"><Alert tone={error?'danger':'success'}>{error||notice}</Alert></div>}

    {previewOpen&&<div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4" role="dialog" aria-modal="true" aria-label="School model preview"><div className="w-full max-w-2xl rounded-2xl border border-line bg-bg p-5 shadow-2xl sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wide text-accent">Live preview</p><h2 className="mt-1 text-xl font-semibold">Catalog card preview</h2></div><button type="button" onClick={()=>setPreviewOpen(false)} className="rounded-lg border border-line px-3 py-1.5 text-sm hover:bg-surface-raised">Close</button></div><div className="mt-5 overflow-hidden rounded-xl border border-line bg-surface sm:flex">{draft.thumbnailUrl?<img src={draft.thumbnailUrl} alt="" className="aspect-[16/10] w-full object-cover sm:w-2/5" onError={(event)=>{event.currentTarget.style.display='none'}}/>:<div className="flex aspect-[16/10] w-full items-center justify-center bg-surface-raised text-content-muted sm:w-2/5"><ImagePlus size={28}/></div>}<div className="flex flex-1 flex-col p-5"><div className="flex flex-wrap gap-2"><span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs text-accent">{draft.category||'Category'}</span>{draft.gradeRange&&<span className="rounded-full bg-surface-raised px-2.5 py-1 text-xs text-content-secondary">{draft.gradeRange}</span>}{draft.subcategory&&<span className="rounded-full bg-surface-raised px-2.5 py-1 text-xs text-content-secondary">{draft.subcategory}</span>}{draft.modelType&&<span className="rounded-full bg-surface-raised px-2.5 py-1 text-xs text-content-secondary">{draft.modelType}</span>}{draft.difficulty&&<span className="rounded-full bg-surface-raised px-2.5 py-1 text-xs text-content-secondary">{draft.difficulty}</span>}</div><h3 className="mt-3 text-lg font-semibold">{draft.title||'Your school model title'}</h3><p className="mt-2 text-sm leading-relaxed text-content-secondary">{draft.shortDescription||'Your short description will appear here.'}</p>{draft.dimensions&&<p className="mt-auto pt-4 text-xs text-content-muted">Approx. dimensions: {draft.dimensions}</p>}</div></div><p className="mt-4 text-xs text-content-muted">This is a preview of the catalog card, not a published page.</p></div></div>}

    <form onSubmit={submit} className="mt-8 flex w-full max-w-6xl flex-col gap-6 lg:gap-7">
      <Group id="school-model-basics" title="1. Basic information" subtitle="Required: identify the model and explain it briefly" defaultOpen>
        <Field label="Model / chart title" htmlFor="school-title" required hint="Use the name a student, teacher or parent would search for.">
          <TextInput id="school-title" value={draft.title} maxLength={120} onChange={(event)=>updateTitle(event.target.value)} placeholder="e.g. Human Digestive System Model"/>
        </Field>
        <Field label="URL slug" htmlFor="school-slug" hint={'Public address: /school-projects/' + (draft.slug || 'your-model')}><TextInput id="school-slug" value={draft.slug} onChange={(event)=>{setSlugTouched(true);update('slug',event.target.value)}} onBlur={(event)=>update('slug',slugify(event.target.value))} placeholder="human-digestive-system-model"/></Field>
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
      </Group>

      <Group id="school-model-media" title="2. Images & media" subtitle="Help visitors understand what the model looks like">
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
        <FieldSet legend="Gallery images" hint="Drag images to reorder them. Edit or remove any image, paste a URL, or upload multiple images.">
          <div className="flex flex-col gap-2">
            {lines(gallery).map((url, index) => (
              <div key={`${url}-${index}`} onDragOver={(event) => event.preventDefault()} onDrop={(event) => {
                event.preventDefault();
                const source = Number(event.dataTransfer.getData('text/plain'));
                const current = lines(gallery);
                if (!Number.isInteger(source) || source === index || source < 0 || source >= current.length) return;
                const next = [...current];
                const [moved] = next.splice(source, 1);
                if (moved === undefined) return;
                next.splice(index, 0, moved);
                setGallery(next.join('\n'));
                update('galleryUrls', next);
                setDraggingGalleryIndex(null);
              }} className={`flex min-w-0 flex-col gap-2 rounded-lg border border-line bg-surface p-2 sm:flex-row sm:items-center ${draggingGalleryIndex === index ? 'opacity-50' : ''}`}>
                <button type="button" draggable onDragStart={(event) => { event.dataTransfer.setData('text/plain', String(index)); setDraggingGalleryIndex(index); }} onDragEnd={() => setDraggingGalleryIndex(null)} aria-label={`Drag to reorder gallery image ${index + 1}`} title="Drag to reorder" className="flex shrink-0 items-center justify-center self-start rounded-md p-1 text-content-muted hover:bg-surface-raised sm:self-center"><GripVertical size={16}/></button>
                <div className="w-full min-w-0 shrink-0 sm:w-44">
                  <ImageUploadField label={`Gallery image ${index + 1}`} value={url} disabled={uploading || saving}
                    onUpload={async (file) => { const uploaded = await imgbbService.upload(file); const next = lines(gallery).map((item, position) => position === index ? uploaded.url : item); setGallery(next.join('\n')); update('galleryUrls', next); setNotice('Gallery image updated. Save the model to keep the change.'); }}
                    onClear={() => { const next = lines(gallery).filter((_, position) => position !== index); setGallery(next.join('\n')); update('galleryUrls', next); }}
                  />
                </div>
                <p className="min-w-0 flex-1 break-all text-xs text-content-muted sm:truncate" title={url}>Image {index + 1} · {url}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <TextInput value={galleryUrlInput} onChange={(event) => setGalleryUrlInput(event.target.value)} type="url" placeholder="Paste a gallery image URL…" aria-label="Gallery image URL"/>
            <Button type="button" variant="secondary" disabled={!galleryUrlInput.trim() || saving || uploading} onClick={() => { const url = galleryUrlInput.trim(); if (!url) return; const next = [...lines(gallery), url]; setGallery(next.join('\n')); update('galleryUrls', next); setGalleryUrlInput(''); }}><Plus size={14}/> Add URL</Button>
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2 self-start rounded-lg border border-line bg-surface px-3 py-2 text-sm font-medium transition hover:bg-surface-raised"><ImagePlus size={16}/>{uploading?'Uploading images…':'Upload gallery images'}<input type="file" accept="image/*" multiple disabled={uploading||saving} onChange={(event)=>{void uploadGallery(event.target.files);event.currentTarget.value=''}} className="sr-only"/></label>
        </FieldSet>
      </Group>

      <Group id="school-model-story" title="3. Learning content" subtitle="Explain what it teaches, how it works and how it is used">
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
        <FieldSet legend="Learning objectives" hint="Add each outcome separately. Start with a clear action verb so teachers can see what students should be able to do after using this model.">
          <div className="flex flex-col gap-2">
            <div><p className="text-sm font-semibold">What will learners be able to do?</p><p className="mt-1 text-xs leading-relaxed text-content-muted">Use one outcome per row. Keep outcomes observable and specific.</p></div>
            <ListEditor values={lines(objectives)} onChange={(next) => setObjectives(next.join('\n'))} label="Learning objective" placeholder="e.g. Identify and label the main parts"/>
            <p className="text-xs leading-relaxed text-content-muted"><span className="font-semibold text-content">Examples:</span> Identify key parts · Explain the process · Compare two concepts · Predict what happens when one variable changes.</p>
          </div>
        </FieldSet>
      </Group>

      <Group id="school-model-technical" title="4. Build details" subtitle="List supplied materials, parts and known dimensions">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <FieldSet legend="Materials / included supplies" hint="List the main materials supplied with the model, such as boards, labels, fasteners, adhesives or finishing items.">
            <div className="flex flex-col gap-2">
              <div><p className="text-sm font-semibold">What is included?</p><p className="mt-1 text-xs leading-relaxed text-content-muted">Add one material or supply per row. Use the parts list for exact quantities and individual notes.</p></div>
              <ListEditor values={lines(materials)} onChange={(next) => setMaterials(next.join('\n'))} label="Included material" placeholder="e.g. Printed, laminated labels"/>
              <p className="text-xs text-content-muted">{lines(materials).filter(Boolean).length} material item{lines(materials).filter(Boolean).length === 1 ? '' : 's'} listed</p>
            </div>
          </FieldSet>
          <FieldSet legend="Included components & parts" hint="Compact editable rows with drag-and-drop ordering, quantities, types, optional status and notes.">
            <TableEditor<SchoolModelComponent> label="Component" rows={draft.components} emptyRow={EMPTY_COMPONENT} onChange={(rows) => update('components', rows)} columns={[
              { key: 'name', label: 'Component / part' },
              { key: 'category', label: 'Type' },
              { key: 'quantity', label: 'Quantity', width: 'w-28' },
              { key: 'notes', label: 'Notes' },
              { key: 'optional', label: 'Optional', type: 'checkbox', width: 'w-28' },
            ]}/>
          </FieldSet>
        </div>
        <FieldSet legend="Specifications" hint="Add dimensions, material, display, power or other relevant specifications. Leave unknown values blank.">
          <TableEditor<SchoolModelSpecification> label="Specification" rows={draft.specifications} emptyRow={EMPTY_SPECIFICATION} onChange={(rows) => update('specifications', rows)} columns={[
            { key: 'label', label: 'Specification' },
            { key: 'value', label: 'Value', type: 'richtext', inlineOnly: true, showToolbar: false },
          ]}/>
        </FieldSet>
        <FieldSet legend="Search / discovery tags" hint="Add one tag per row and drag to set the order.">
          <ListEditor values={lines(tags.replace(/,/g, '\n'))} onChange={(next) => setTags(next.map((item) => item.trim()).filter(Boolean).join(', '))} label="Tag" placeholder="e.g. biology"/>
        </FieldSet>
      </Group>

      <Group id="school-model-features" title="5. Use & customization" subtitle="Add special features, setup, care and customization options">
        <div className="grid gap-5 sm:grid-cols-2">
          <FieldSet legend="Key features" hint="Add each public-facing feature separately. Drag rows to set the display order.">
            <ListEditor values={lines(features)} onChange={(next) => setFeatures(next.join('\n'))} label="Feature" placeholder="e.g. Labeled key parts"/>
          </FieldSet>
          <FieldSet legend="Customization options" hint="Add each available option separately, such as language, colors or size. Drag to reorder.">
            <ListEditor values={lines(customizationOptions)} onChange={(next) => setCustomizationOptions(next.join('\n'))} label="Customization option" placeholder="e.g. Custom dimensions"/>
          </FieldSet>
        </div>
        <Field label="Assembly, setup & demonstration notes" htmlFor="school-setup-instructions" hint="Optional public-facing instructions or notes for teachers."><RichTextEditor id="school-setup-instructions" rows={4} value={draft.setupInstructions} onChange={(value) => update('setupInstructions', value)} placeholder="Explain any setup, handling or demonstration steps that are useful to know."/></Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Maintenance / storage notes" htmlFor="school-maintenance-notes" hint="Optional care instructions for reusable classroom models."><RichTextEditor id="school-maintenance-notes" rows={3} value={draft.maintenanceNotes} onChange={(value) => update('maintenanceNotes', value)} placeholder="Cleaning, storage, handling or reuse notes."/></Field>
          <Field label="Safety notes" htmlFor="school-safety-notes" hint="Only add specific, accurate guidance that applies to this model."><RichTextEditor id="school-safety-notes" rows={3} value={draft.safetyNotes} onChange={(value) => update('safetyNotes', value)} placeholder="Relevant handling or supervision considerations."/></Field>
        </div>
      </Group>

      <Group id="school-model-links" title="6. Search & resources" subtitle="Optional search-result text and supporting links">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="SEO title" htmlFor="school-seo-title" hint="Keep it descriptive; around 50–60 characters is a useful target."><TextInput id="school-seo-title" maxLength={70} value={draft.seoTitle} onChange={(event) => update('seoTitle', event.target.value)} placeholder={draft.title || 'School model title'}/></Field>
          <Field label="SEO description" htmlFor="school-seo-description" hint="A short summary for search results."><TextArea id="school-seo-description" rows={3} maxLength={180} value={draft.seoDescription} onChange={(event) => update('seoDescription', event.target.value)} placeholder="Describe this educational model in a clear sentence."/></Field>
          <FieldSet legend="Search keywords" hint="Add one keyword or phrase per row and drag to reorder.">
            <ListEditor values={lines(keywords.replace(/,/g, '\n'))} onChange={(next) => setKeywords(next.map((item) => item.trim()).filter(Boolean).join(', '))} label="Keyword" placeholder="e.g. biology model"/>
          </FieldSet>
        </div>
      </Group>

      <Group id="school-model-publishing" title="7. Review & publish" subtitle="Choose whether to feature it and show it on the public website">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-line p-4"><Checkbox id="school-featured" label="Feature this item" description="Allow it to appear in featured school-model sections." checked={draft.featured} onChange={(event) => update('featured', event.target.checked)}/></div>
          <div className="rounded-xl border border-line p-4"><Checkbox id="school-published" label="Publish this item" description="Published models can be seen by visitors. Drafts remain in admin." checked={draft.published} onChange={(event) => update('published', event.target.checked)}/></div>
        </div>
      </Group>

      {galleryQueue[0] && <ImageProcessingDialog key={galleryQueue[0].name + galleryQueue[0].lastModified} file={galleryQueue[0]} title="Prepare gallery image" onCancel={() => setGalleryQueue([])} onUse={uploadPreparedGalleryImage} />}

      <div className="sticky bottom-3 z-20 flex flex-col gap-3 rounded-xl border border-line bg-bg/95 p-3 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-4">
        <p className="text-xs text-content-muted">{hasUnsavedChanges?'Unsaved changes':'All changes saved'} · Pricing remains quote-based.</p>
        <div className="flex flex-wrap gap-2"><Button type="button" variant="ghost" onClick={cancel} disabled={saving||uploading}>Cancel</Button><Button type="submit" loading={saving||uploading} disabled={saving||uploading}><Save size={16}/>{saving?'Saving…':editing?'Save changes':'Save draft'}</Button>{!draft.published&&<Button type="button" variant="secondary" disabled={saving||uploading} onClick={()=>void submit(undefined,true)}>{saving?'Publishing…':'Save & publish'}</Button>}</div>
      </div>
    </form>
  </>;
}

function Group({ id, title, subtitle, children, defaultOpen = false }: { id: string; title: string; subtitle: string; children: ReactNode; defaultOpen?: boolean }) {
  return <details id={id} open={defaultOpen} className="group scroll-mt-24 overflow-hidden rounded-2xl border border-line bg-surface/50 shadow-sm transition-shadow open:shadow-md">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-5 transition-colors hover:bg-surface-raised/50 [&::-webkit-details-marker]:hidden sm:px-6 sm:py-5">
      <span className="min-w-0"><span className="block text-base font-semibold tracking-tight">{title}</span><span className="mt-0.5 block text-xs text-content-muted">{subtitle}</span></span>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-content-muted transition-transform group-open:rotate-180"><ChevronDown size={16}/></span>
    </summary>
    <div className="border-t border-line bg-bg/30 px-4 py-5 sm:px-6 sm:py-6"><div className="flex flex-col gap-5">{children}</div></div>
  </details>;
}
