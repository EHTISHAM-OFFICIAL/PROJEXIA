import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowLeft, CheckCircle2, ChevronDown, Circle, Eye, GraduationCap, ImagePlus, Save, Trash2 } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Seo } from '../../components/ui/Seo';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { Skeleton } from '../../components/ui/Skeleton';
import { Field, FieldSet } from '../../components/forms/Field';
import { Select, TextArea, TextInput } from '../../components/forms/Inputs';
import { Checkbox } from '../../components/forms/Choice';
import { ImageUploadField } from '../../components/forms/ImageUploadField';
import { schoolModelService, DEFAULT_SCHOOL_SETTINGS } from '../../services/schoolModelService';
import type { SchoolModelDraft, SchoolSettings } from '../../services/schoolModelService';
import { imgbbService } from '../../services/imgbbService';

const EMPTY: SchoolModelDraft = {
  title: '', slug: '', category: 'Science Charts', subject: '', gradeRange: '',
  shortDescription: '', description: '', materials: [], objectives: [], dimensions: '',
  thumbnailUrl: '', galleryUrls: [], featured: false, published: false, seoTitle: '', seoDescription: '',
};
const lines = (value: string) => [...new Set(value.split('\n').map((item) => item.trim()).filter(Boolean))];

export default function SchoolModelForm() {
  const { id } = useParams<{ id: string }>();
  const editing = Boolean(id);
  const navigate = useNavigate();
  const [draft, setDraft] = useState<SchoolModelDraft>(EMPTY);
  const [settings, setSettings] = useState<SchoolSettings>(DEFAULT_SCHOOL_SETTINGS);
  const [materials, setMaterials] = useState('');
  const [objectives, setObjectives] = useState('');
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
        setGallery(rest.galleryUrls.join('\n'));
        setInitialSnapshot(JSON.stringify({ draft: rest, materials: rest.materials.join('\n'), objectives: rest.objectives.join('\n'), gallery: rest.galleryUrls.join('\n') }));
      } else {
        const next = { ...EMPTY, category: config.categories[0] || 'Others' };
        setDraft(next);
        setInitialSnapshot(JSON.stringify({ draft: next, materials: '', objectives: '', gallery: '' }));
      }
      setLoading(false);
    }).catch((caught) => {
      if (active) { setError(caught instanceof Error ? caught.message : 'Could not load the editor.'); setLoading(false); }
    });
    return () => { active = false; };
  }, [id]);

  const update = <K extends keyof SchoolModelDraft>(key: K, value: SchoolModelDraft[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));

  const currentSnapshot = JSON.stringify({ draft, materials, objectives, gallery });
  const hasUnsavedChanges = initialSnapshot !== null && currentSnapshot !== initialSnapshot;
  const basicsComplete = Boolean(draft.title.trim() && draft.shortDescription.trim() && draft.category.trim());
  const sections = [
    { id: 'school-model-basics', label: 'Basics', complete: basicsComplete, required: true },
    { id: 'school-model-media', label: 'Images', complete: Boolean(draft.thumbnailUrl || gallery.trim()), required: false },
    { id: 'school-model-learning', label: 'Learning details', complete: Boolean(materials.trim() || objectives.trim() || draft.description.trim()), required: false },
    { id: 'school-model-publishing', label: 'Publishing & SEO', complete: Boolean(draft.seoTitle || draft.seoDescription || draft.published || draft.featured), required: false },
  ];
  const completedRequired = [draft.title.trim(), draft.shortDescription.trim(), draft.category.trim()].filter(Boolean).length;

  useEffect(() => {
    if (!hasUnsavedChanges || saving) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [hasUnsavedChanges, saving]);

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
    setSaving(true);
    try {
      await schoolModelService.save({ ...draft, title: draft.title.trim(), materials: lines(materials), objectives: lines(objectives), galleryUrls: lines(gallery), slug: '' }, id);
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
          <TextInput id="school-title" value={draft.title} maxLength={140} onChange={(event)=>update('title',event.target.value)} placeholder="e.g. Human Digestive System Model"/>
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Category" htmlFor="school-category" required hint="Used for catalog filters.">
            <Select id="school-category" options={[...new Set([...settings.categories,draft.category].filter(Boolean))]} value={draft.category} onChange={(event)=>update('category',event.target.value)}/>
          </Field>
          <Field label="Subject" htmlFor="school-subject" hint="e.g. Biology, Physics, Geography, Environmental Science">
            <TextInput id="school-subject" value={draft.subject} onChange={(event)=>update('subject',event.target.value)} placeholder="Biology"/>
          </Field>
          <Field label="Grade / class range" htmlFor="school-grade" hint="Helps visitors understand who this is for.">
            <TextInput id="school-grade" value={draft.gradeRange} onChange={(event)=>update('gradeRange',event.target.value)} placeholder="e.g. Classes 6–10"/>
          </Field>
          <Field label="Approximate dimensions" htmlFor="school-dimensions" hint="Mention if the size can be customized.">
            <TextInput id="school-dimensions" value={draft.dimensions} onChange={(event)=>update('dimensions',event.target.value)} placeholder="e.g. 60 × 90 cm (customizable)"/>
          </Field>
        </div>
        <Field label="Short description" htmlFor="school-short-description" required hint="A concise summary shown on catalog cards. Up to 320 characters.">
          <TextArea id="school-short-description" rows={3} maxLength={320} value={draft.shortDescription} onChange={(event)=>update('shortDescription',event.target.value)} placeholder="Explain what the chart or model demonstrates and why it is useful."/>
        </Field>
        <Field label="Full description" htmlFor="school-description" hint="You can leave this blank if the short description is enough.">
          <TextArea id="school-description" rows={6} value={draft.description} onChange={(event)=>update('description',event.target.value)} placeholder="Describe the concept, key parts, how it demonstrates the topic, and possible customization."/>
        </Field>
      </Group>

      <Group id="school-model-media" title="Images" subtitle="Thumbnail and additional gallery photos">
        <FieldSet legend="Thumbnail" hint="The primary catalog image. A landscape image with a clear subject works best.">
          <ImageUploadField label="Thumbnail" value={draft.thumbnailUrl||null} disabled={uploading||saving} onUpload={async(file)=>{const uploaded=await imgbbService.upload(file);update('thumbnailUrl',uploaded.url);setNotice('Thumbnail uploaded. Save the model to keep the change.');}} onClear={()=>update('thumbnailUrl','')}/>
          <Field label="Or paste a thumbnail URL" htmlFor="school-thumbnail-url"><TextInput id="school-thumbnail-url" type="url" value={draft.thumbnailUrl} onChange={(event)=>update('thumbnailUrl',event.target.value)} placeholder="https://…"/></Field>
        </FieldSet>
        <FieldSet legend="Gallery images" hint="Add real photos from different angles or close-ups. Add one URL per line, or upload several images at once.">
          <div className="grid gap-3 sm:grid-cols-2">{lines(gallery).map((url,index)=><div key={url+index} className="overflow-hidden rounded-xl border border-line bg-surface"><img src={url} alt={`Gallery image ${index+1}`} className="aspect-[16/10] w-full object-cover" onError={(event)=>{event.currentTarget.style.display='none'}}/><div className="flex items-center justify-between gap-2 p-3"><p className="min-w-0 truncate text-xs text-content-muted">Image {index+1}</p><button type="button" onClick={()=>{const next=lines(gallery).filter((_,position)=>position!==index);setGallery(next.join('\n'));update('galleryUrls',next)}} className="rounded-md p-1.5 text-content-muted hover:bg-surface-raised hover:text-state-danger" aria-label={`Remove gallery image ${index+1}`}><Trash2 size={15}/></button></div></div>)}</div>
          <Field label="Gallery image URLs" htmlFor="school-gallery-urls" hint="One image URL per line. Removing a line removes that image from the gallery."><TextArea id="school-gallery-urls" rows={4} value={gallery} onChange={(event)=>{setGallery(event.target.value);update('galleryUrls',lines(event.target.value))}} placeholder="https://image-one…&#10;https://image-two…"/></Field>
          <label className="inline-flex cursor-pointer items-center gap-2 self-start rounded-lg border border-line bg-surface px-4 py-2.5 text-sm font-medium transition hover:bg-surface-raised"><ImagePlus size={16}/>{uploading?'Uploading images…':'Upload gallery images'}<input type="file" accept="image/*" multiple disabled={uploading||saving} onChange={(event)=>{void uploadGallery(event.target.files);event.currentTarget.value=''}} className="sr-only"/></label>
        </FieldSet>
      </Group>

      <Group id="school-model-learning" title="Learning & construction details" subtitle="Materials, included components and learning objectives">
        <Field label="Learning overview" htmlFor="school-learning-overview" hint="Optional explanation of how the model can be used in a lesson or exhibition."><TextArea id="school-learning-overview" rows={5} value={draft.description} onChange={(event)=>update('description',event.target.value)} placeholder="Explain the concept this model helps demonstrate."/></Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Materials / included components" htmlFor="school-materials" hint="One item per line."><TextArea id="school-materials" rows={6} value={materials} onChange={(event)=>setMaterials(event.target.value)} placeholder={'Foam board\nPrinted labels\nWooden base'}/></Field>
          <Field label="Learning objectives" htmlFor="school-objectives" hint="One outcome per line."><TextArea id="school-objectives" rows={6} value={objectives} onChange={(event)=>setObjectives(event.target.value)} placeholder={'Identify key parts\nExplain the process\nCompare concepts'}/></Field>
        </div>
      </Group>

      <Group id="school-model-publishing" title="Publishing & SEO" subtitle="Homepage visibility and search metadata">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="SEO title" htmlFor="school-seo-title" hint="Keep it descriptive; around 50–60 characters is a useful target."><TextInput id="school-seo-title" maxLength={70} value={draft.seoTitle} onChange={(event)=>update('seoTitle',event.target.value)} placeholder={draft.title||'School model title'}/></Field>
          <Field label="SEO description" htmlFor="school-seo-description" hint="A short summary for search results."><TextArea id="school-seo-description" rows={3} maxLength={180} value={draft.seoDescription} onChange={(event)=>update('seoDescription',event.target.value)} placeholder="Describe this educational model in a clear sentence."/></Field>
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
