import { useEffect, useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Seo } from '../../components/ui/Seo';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { Skeleton } from '../../components/ui/Skeleton';
import { schoolModelService, DEFAULT_SCHOOL_SETTINGS } from '../../services/schoolModelService';
import type { SchoolModelDraft, SchoolSettings } from '../../services/schoolModelService';
import { imgbbService } from '../../services/imgbbService';

const EMPTY: SchoolModelDraft = {
  title: '', slug: '', category: 'Science Charts', subject: '', gradeRange: '',
  shortDescription: '', description: '', materials: [], objectives: [], dimensions: '',
  thumbnailUrl: '', galleryUrls: [], featured: false, published: false, seoTitle: '', seoDescription: '',
};
const lines = (value: string) => value.split('\n').map((item) => item.trim()).filter(Boolean);

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
      } else {
        setDraft({ ...EMPTY, category: config.categories[0] || 'Others' });
      }
      setLoading(false);
    }).catch((caught) => {
      if (active) { setError(caught instanceof Error ? caught.message : 'Could not load the editor.'); setLoading(false); }
    });
    return () => { active = false; };
  }, [id]);

  const update = <K extends keyof SchoolModelDraft>(key: K, value: SchoolModelDraft[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));

  const uploadImages = async (files: FileList | null, target: 'thumbnail' | 'gallery') => {
    if (!files?.length) return;
    setUploading(true); setError(''); setNotice('');
    try {
      const urls = await Promise.all(Array.from(files).map(async (file) => (await imgbbService.upload(file)).url));
      if (target === 'thumbnail') update('thumbnailUrl', urls[0]);
      else {
        const next = [...lines(gallery), ...urls];
        setGallery(next.join('\n'));
        update('galleryUrls', next);
      }
      setNotice('Image upload complete. Save the item to keep your changes.');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Image upload failed. You can paste an image URL instead.');
    } finally { setUploading(false); }
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setError(''); setNotice('');
    if (!draft.title.trim()) { setError('Add a title before saving.'); return; }
    if (!draft.shortDescription.trim()) { setError('Add a short description for the catalog card.'); return; }
    setSaving(true);
    try {
      await schoolModelService.save({ ...draft, title: draft.title.trim(), materials: lines(materials), objectives: lines(objectives), galleryUrls: lines(gallery), slug: '' }, id);
      navigate('/admin/school-models', { replace: true, state: { notice: editing ? 'School model updated.' : 'School model created.' } });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not save this school model.');
    } finally { setSaving(false); }
  };

  if (loading) return <><Seo title={editing ? 'Edit school model' : 'New school model'} noIndex/><Skeleton className="h-12 w-full"/><Skeleton className="mt-5 h-96 w-full"/></>;

  return <>
    <Seo title={editing ? 'Edit school model' : 'New school model'} noIndex />
    <Link to="/admin/school-models" className="inline-flex items-center gap-2 text-sm text-content-secondary hover:text-content"><ArrowLeft size={16}/> Back to School Models</Link>
    <header className="mt-5"><h1 className="text-2xl font-semibold tracking-tight">{editing ? 'Edit school model' : 'Create a school model'}</h1><p className="mt-1.5 text-sm text-content-secondary">Manage catalog details, learning information, images and search metadata. Pricing stays quote-based.</p></header>
    {error && <div className="mt-5"><Alert tone="danger">{error}</Alert></div>}
    {notice && <div className="mt-5"><Alert tone="success">{notice}</Alert></div>}
    <form onSubmit={submit} className="mt-6 space-y-6">
      <section className="rounded-2xl border border-line bg-surface p-5 sm:p-7"><h2 className="text-lg font-semibold">Basic information</h2><div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium sm:col-span-2">Model / chart title *<input required maxLength={140} value={draft.title} onChange={(e)=>update('title',e.target.value)} placeholder="e.g. Human Digestive System Model" className="mt-1.5 h-11 w-full rounded-lg border border-line bg-bg px-3 text-sm"/></label>
        <label className="block text-sm font-medium">Category *<select required value={draft.category} onChange={(e)=>update('category',e.target.value)} className="mt-1.5 h-11 w-full rounded-lg border border-line bg-bg px-3 text-sm">{[...new Set([...settings.categories,draft.category].filter(Boolean))].map((item)=><option key={item} value={item}>{item}</option>)}</select></label>
        <label className="block text-sm font-medium">Subject<input value={draft.subject} onChange={(e)=>update('subject',e.target.value)} placeholder="Biology, Physics, Geography…" className="mt-1.5 h-11 w-full rounded-lg border border-line bg-bg px-3 text-sm"/></label>
        <label className="block text-sm font-medium">Grade / class range<input value={draft.gradeRange} onChange={(e)=>update('gradeRange',e.target.value)} placeholder="e.g. Classes 6–10" className="mt-1.5 h-11 w-full rounded-lg border border-line bg-bg px-3 text-sm"/></label>
        <label className="block text-sm font-medium">Approximate dimensions<input value={draft.dimensions} onChange={(e)=>update('dimensions',e.target.value)} placeholder="e.g. 60 × 90 cm (customizable)" className="mt-1.5 h-11 w-full rounded-lg border border-line bg-bg px-3 text-sm"/></label>
        <label className="block text-sm font-medium sm:col-span-2">Short description *<textarea required maxLength={320} rows={2} value={draft.shortDescription} onChange={(e)=>update('shortDescription',e.target.value)} placeholder="A concise summary shown on catalog cards." className="mt-1.5 w-full rounded-lg border border-line bg-bg p-3 text-sm"/></label>
        <label className="block text-sm font-medium sm:col-span-2">Full description<textarea rows={6} value={draft.description} onChange={(e)=>update('description',e.target.value)} placeholder="Explain the model, how it demonstrates the concept, construction details and customization possibilities." className="mt-1.5 w-full rounded-lg border border-line bg-bg p-3 text-sm"/></label>
      </div></section>
      <section className="rounded-2xl border border-line bg-surface p-5 sm:p-7"><h2 className="text-lg font-semibold">Images</h2><p className="mt-1 text-sm text-content-secondary">Use a representative thumbnail and separate gallery photos. Uploads use the existing imgBB integration; direct image URLs are also supported.</p><div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium sm:col-span-2">Thumbnail image URL<input value={draft.thumbnailUrl} onChange={(e)=>update('thumbnailUrl',e.target.value)} placeholder="https://…" className="mt-1.5 h-11 w-full rounded-lg border border-line bg-bg px-3 text-sm"/><input type="file" accept="image/*" onChange={(e)=>void uploadImages(e.target.files,'thumbnail')} className="mt-2 block w-full text-sm"/></label>
        {draft.thumbnailUrl&&<div className="sm:col-span-2"><img src={draft.thumbnailUrl} alt="Thumbnail preview" className="max-h-56 rounded-xl border border-line object-contain" onError={(e)=>{e.currentTarget.style.display='none'}}/></div>}
        <label className="block text-sm font-medium sm:col-span-2">Gallery images — one URL per line<textarea rows={4} value={gallery} onChange={(e)=>{setGallery(e.target.value);update('galleryUrls',lines(e.target.value))}} placeholder="https://image-one…&#10;https://image-two…" className="mt-1.5 w-full rounded-lg border border-line bg-bg p-3 text-sm"/><input type="file" accept="image/*" multiple onChange={(e)=>void uploadImages(e.target.files,'gallery')} className="mt-2 block w-full text-sm"/><span className="mt-1 block text-xs text-content-muted">You can add multiple gallery images at once.</span></label>
      </div></section>
      <section className="rounded-2xl border border-line bg-surface p-5 sm:p-7"><h2 className="text-lg font-semibold">Learning & construction details</h2><div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium">Materials / included components (one per line)<textarea rows={6} value={materials} onChange={(e)=>setMaterials(e.target.value)} placeholder="Foam board&#10;Printed labels&#10;Wooden base" className="mt-1.5 w-full rounded-lg border border-line bg-bg p-3 text-sm"/></label>
        <label className="block text-sm font-medium">Learning objectives (one per line)<textarea rows={6} value={objectives} onChange={(e)=>setObjectives(e.target.value)} placeholder="Identify key parts&#10;Explain the process&#10;Compare concepts" className="mt-1.5 w-full rounded-lg border border-line bg-bg p-3 text-sm"/></label>
      </div></section>
      <section className="rounded-2xl border border-line bg-surface p-5 sm:p-7"><h2 className="text-lg font-semibold">Publishing & SEO</h2><div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium sm:col-span-2">SEO title<input maxLength={70} value={draft.seoTitle} onChange={(e)=>update('seoTitle',e.target.value)} className="mt-1.5 h-11 w-full rounded-lg border border-line bg-bg px-3 text-sm"/></label>
        <label className="block text-sm font-medium sm:col-span-2">SEO description<textarea maxLength={180} rows={3} value={draft.seoDescription} onChange={(e)=>update('seoDescription',e.target.value)} className="mt-1.5 w-full rounded-lg border border-line bg-bg p-3 text-sm"/></label>
        <label className="flex items-start gap-3 rounded-lg border border-line p-4 text-sm"><input type="checkbox" checked={draft.featured} onChange={(e)=>update('featured',e.target.checked)} className="mt-0.5"/><span><span className="block font-medium">Featured item</span><span className="mt-1 block text-content-secondary">Allow this model to appear in featured school-model sections.</span></span></label>
        <label className="flex items-start gap-3 rounded-lg border border-line p-4 text-sm"><input type="checkbox" checked={draft.published} onChange={(e)=>update('published',e.target.checked)} className="mt-0.5"/><span><span className="block font-medium">Published</span><span className="mt-1 block text-content-secondary">Published items are visible to visitors. Leave unchecked to save as a draft.</span></span></label>
      </div></section>
      <div className="flex flex-wrap gap-3"><Button type="submit" loading={saving||uploading} disabled={saving||uploading}><Save size={16}/>{saving?'Saving…':editing?'Save changes':'Create school model'}</Button><Button type="button" variant="secondary" onClick={()=>navigate('/admin/school-models')}>Cancel</Button></div>
    </form>
  </>;
}
