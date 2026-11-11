import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { ArrowLeft, ImagePlus, Loader2, Plus, Save, Trash2, Upload, X } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Seo } from "../../components/ui/Seo";
import { Button } from "../../components/ui/Button";
import { Alert } from "../../components/ui/Alert";
import { Image } from "../../components/ui/Image";
import { Field } from "../../components/forms/Field";
import { TextArea, TextInput, Select } from "../../components/forms/Inputs";
import { collectionService } from "../../services/collectionService";
import { imgbbService } from "../../services/imgbbService";
import { PROJECT_IMAGE_RULES } from "../../constants/requestOptions";
import { validateProjectImage } from "../../utils/fileValidation";
import { useToast } from "../../contexts/ToastContext";
import type { CollectionItemDraft, CollectionSettings } from "../../types/collection";
import { EMPTY_COLLECTION_DRAFT, DEFAULT_COLLECTION_CATEGORIES } from "../../types/collection";

export default function CollectionForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { notify } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState<CollectionItemDraft>({ ...EMPTY_COLLECTION_DRAFT, images: [], additionalDetails: [] });
  const [categories, setCategories] = useState<string[]>(DEFAULT_COLLECTION_CATEGORIES);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const [settings, item] = await Promise.all([
          collectionService.getSettings(),
          id ? collectionService.getById(id) : Promise.resolve(null),
        ]);
        if (!active) return;
        setCategories(settings.categories);
        if (id && !item) {
          setError("This collection item could not be found.");
        } else if (item) {
          const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...rest } = item;
          setDraft({ ...EMPTY_COLLECTION_DRAFT, ...rest });
        } else {
          setDraft((current) => ({ ...current, category: settings.categories[0] || DEFAULT_COLLECTION_CATEGORIES[0] }));
        }
      } catch (caught) {
        if (active) setError(caught instanceof Error ? caught.message : "Could not load the collection item.");
      } finally {
        if (active) setLoading(false);
      }
    };
    void load();
    return () => { active = false; };
  }, [id]);

  const update = <K extends keyof CollectionItemDraft>(key: K, value: CollectionItemDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const uploadImages = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;
    if (draft.images.length + files.length > 10) {
      setError("You can add up to 10 images to one collection item.");
      event.target.value = "";
      return;
    }
    setError("");
    setUploading(true);
    let completed = 0;
    try {
      for (const file of files) {
        const validation = validateProjectImage(file);
        if (!validation.valid) throw new Error(validation.error || "This image cannot be uploaded.");
        setUploadProgress("Uploading " + (completed + 1) + " of " + files.length + "...");
        const uploaded = await imgbbService.upload(file);
        const alt = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim();
        setDraft((current) => ({ ...current, images: [...current.images, { url: uploaded.url, alt }] }));
        completed += 1;
      }
      notify({ title: "Images uploaded", message: completed + " image(s) added to this item.", tone: "success" });
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "One or more images could not be uploaded.";
      setError(completed ? message + " The images uploaded before the error have been kept." : message);
      notify({ title: "Image upload incomplete", message, tone: "error" });
    } finally {
      setUploading(false);
      setUploadProgress("");
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const updateImageAlt = (index: number, alt: string) => {
    setDraft((current) => ({
      ...current,
      images: current.images.map((image, imageIndex) => imageIndex === index ? { ...image, alt } : image),
    }));
  };

  const removeImage = (index: number) => {
    setDraft((current) => ({ ...current, images: current.images.filter((_, imageIndex) => imageIndex !== index) }));
  };

  const updateDetail = (index: number, key: "label" | "value", value: string) => {
    setDraft((current) => ({
      ...current,
      additionalDetails: current.additionalDetails.map((detail, detailIndex) => detailIndex === index ? { ...detail, [key]: value } : detail),
    }));
  };

  const save = async (published: boolean) => {
    setError("");
    if (!draft.title.trim()) { setError("Enter an item name."); return; }
    if (!draft.category.trim()) { setError("Choose a category."); return; }
    if (!draft.images.length) { setError("Upload at least one image."); return; }
    setSaving(true);
    try {
      await collectionService.save({ ...draft, published }, id);
      notify({
        title: published ? "Collection item published" : "Collection item saved",
        message: "Your collection item has been saved successfully.",
        tone: "success",
      });
      navigate("/admin/collections");
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "The collection item could not be saved.";
      setError(message);
      notify({ title: "Could not save item", message, tone: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="space-y-4"><div className="h-8 w-48 animate-pulse rounded bg-surface-raised"/><div className="h-64 animate-pulse rounded-xl bg-surface-raised"/></div>;
  }

  return (
    <>
      <Seo title={isEdit ? "Edit collection item" : "New collection item"} noIndex />
      <Link to="/admin/collections" className="inline-flex items-center gap-2 rounded-md py-2 text-sm text-content-secondary hover:text-content"><ArrowLeft size={15}/> All collection items</Link>
      <header className="mt-4">
        <p className="eyebrow">Collections manager</p>
        <h1 className="mt-1 text-2xl font-semibold">{isEdit ? "Edit collection item" : "Add collection item"}</h1>
        <p className="mt-1.5 max-w-2xl text-sm text-content-secondary">Add clear photos and only the details you actually know. Optional fields can be left empty.</p>
      </header>

      {error && <div className="mt-5"><Alert tone="danger">{error}</Alert></div>}

      <div className="mt-7 grid gap-7 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex min-w-0 flex-col gap-5">
          <section className="rounded-xl border border-line bg-surface p-4 sm:p-6">
            <h2 className="font-semibold">Basic information</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field label="Item name" htmlFor="title" required>
                <TextInput id="title" value={draft.title} onChange={(event) => update("title", event.target.value)} placeholder="e.g. Transparent Acrylic Box"/>
              </Field>
              <Field label="Category" htmlFor="category" required hint="Categories are managed from the Collections page in the admin panel.">
                <Select id="category" value={draft.category} onChange={(event) => update("category", event.target.value)} options={categories} placeholder="Choose a category"/>
              </Field>
              <Field label="Short description" htmlFor="shortDescription" hint="A brief line shown on the gallery card.">
                <TextInput id="shortDescription" value={draft.shortDescription} onChange={(event) => update("shortDescription", event.target.value)} placeholder="A clear, concise introduction"/>
              </Field>
              <Field label="Display order" htmlFor="displayOrder" hint="Lower numbers appear first. Items with the same order are sorted by title.">
                <TextInput id="displayOrder" type="number" value={String(draft.displayOrder)} onChange={(event) => update("displayOrder", Number(event.target.value) || 0)}/>
              </Field>
            </div>
            <div className="mt-5">
              <Field label="Full description" htmlFor="description">
                <TextArea id="description" rows={5} value={draft.description} onChange={(event) => update("description", event.target.value)} placeholder="Add a little more context about this item..."/>
              </Field>
            </div>
          </section>

          <section className="rounded-xl border border-line bg-surface p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div><h2 className="font-semibold">Item images</h2><p className="mt-1 text-xs text-content-muted">Upload up to 10 images. The first image is used as the gallery cover.</p></div>
              <Button type="button" variant="secondary" size="sm" onClick={() => inputRef.current?.click()} disabled={uploading}><ImagePlus size={15}/> Add images</Button>
            </div>
            <input ref={inputRef} type="file" accept={PROJECT_IMAGE_RULES.allowedExtensions.join(",")} multiple onChange={(event) => void uploadImages(event)} className="sr-only"/>
            {uploading && <div className="mt-4 flex items-center gap-2 rounded-lg border border-accent/25 bg-accent/5 px-3 py-2 text-sm text-content-secondary"><Loader2 size={16} className="animate-spin text-accent"/>{uploadProgress}</div>}
            {draft.images.length === 0 ? (
              <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading} className="mt-4 flex min-h-40 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-surface-raised/50 px-4 py-8 text-center text-content-secondary transition-colors hover:border-accent hover:text-accent">
                <Upload size={22}/><span className="text-sm font-medium">Choose image files</span><span className="text-xs text-content-muted">JPG, PNG, WebP or GIF · up to 10 MB each</span>
              </button>
            ) : (
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {draft.images.map((image, index) => (
                  <div key={image.url} className="overflow-hidden rounded-xl border border-line bg-surface-raised">
                    <div className="relative flex aspect-[4/3] items-center justify-center bg-bg/30">
                      <Image src={image.url} alt={image.alt || draft.title} className="h-full w-full object-contain p-2"/>
                      {index === 0 && <span className="absolute left-2 top-2 rounded-md bg-accent px-2 py-1 text-[10px] font-semibold text-onAccent">Cover image</span>}
                      <button type="button" onClick={() => removeImage(index)} aria-label={"Remove image " + (index + 1)} className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-bg/90 text-content hover:text-state-danger"><X size={15}/></button>
                    </div>
                    <div className="p-3">
                      <label className="text-xs font-medium text-content-secondary" htmlFor={"image-alt-" + index}>Image description (alt text)</label>
                      <TextInput id={"image-alt-" + index} value={image.alt} onChange={(event) => updateImageAlt(index, event.target.value)} className="mt-1 text-sm"/>
                      {index > 0 && <button type="button" onClick={() => setDraft((current) => ({ ...current, images: [current.images[index], ...current.images.filter((_, imageIndex) => imageIndex !== index)] }))} className="mt-2 text-xs font-medium text-accent hover:underline">Make cover image</button>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-xl border border-line bg-surface p-4 sm:p-6">
            <h2 className="font-semibold">Additional information</h2>
            <p className="mt-1 text-xs text-content-muted">All of these fields are optional. Only add information that is confirmed.</p>
            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              <Field label="Material" htmlFor="material"><TextInput id="material" value={draft.material} onChange={(event) => update("material", event.target.value)} placeholder="e.g. Acrylic"/></Field>
              <Field label="Dimensions" htmlFor="dimensions"><TextInput id="dimensions" value={draft.dimensions} onChange={(event) => update("dimensions", event.target.value)} placeholder="e.g. 20 × 15 × 10 cm"/></Field>
              <Field label="Colour / finish" htmlFor="color"><TextInput id="color" value={draft.color} onChange={(event) => update("color", event.target.value)} placeholder="e.g. Clear / transparent"/></Field>
            </div>
            <div className="mt-6">
              <div className="flex items-center justify-between gap-3"><h3 className="text-sm font-semibold">Custom details</h3><Button type="button" variant="secondary" size="sm" onClick={() => update("additionalDetails", [...draft.additionalDetails, { label: "", value: "" }])}><Plus size={14}/> Add detail</Button></div>
              {draft.additionalDetails.length === 0 ? <p className="mt-2 text-xs text-content-muted">No additional details added.</p> : <div className="mt-3 space-y-2">
                {draft.additionalDetails.map((detail, index) => (
                  <div key={index} className="grid gap-2 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_auto]">
                    <TextInput aria-label="Detail label" value={detail.label} onChange={(event) => updateDetail(index, "label", event.target.value)} placeholder="Label"/>
                    <TextInput aria-label="Detail value" value={detail.value} onChange={(event) => updateDetail(index, "value", event.target.value)} placeholder="Value"/>
                    <Button type="button" variant="danger" size="sm" onClick={() => update("additionalDetails", draft.additionalDetails.filter((_, detailIndex) => detailIndex !== index))}><Trash2 size={14}/></Button>
                  </div>
                ))}
              </div>}
            </div>
          </section>
        </div>

        <aside className="flex flex-col gap-4">
          <section className="rounded-xl border border-line bg-surface p-4 sm:p-5">
            <h2 className="font-semibold">Publishing</h2>
            <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-lg border border-line bg-surface-raised/60 p-3">
              <input type="checkbox" checked={draft.enquiryEnabled} onChange={(event) => update("enquiryEnabled", event.target.checked)} className="mt-0.5 h-4 w-4 accent-[rgb(var(--color-accent))]"/>
              <span><span className="block text-sm font-medium">Enable item enquiries</span><span className="mt-0.5 block text-xs leading-relaxed text-content-muted">Show a contact/enquiry action in this item's popup.</span></span>
            </label>
            <p className="mt-4 text-xs leading-relaxed text-content-muted">Drafts are visible only to administrators. Publishing makes this item available in the public Collections gallery.</p>
            <div className="mt-5 flex flex-col gap-2">
              <Button type="button" onClick={() => void save(false)} loading={saving} disabled={uploading}><Save size={15}/> Save as draft</Button>
              <Button type="button" variant="secondary" onClick={() => void save(true)} loading={saving} disabled={uploading}><Plus size={15}/> Save and publish</Button>
              <Button type="button" variant="ghost" onClick={() => navigate("/admin/collections")} disabled={saving || uploading}>Cancel</Button>
            </div>
          </section>
          <section className="rounded-xl border border-line bg-surface p-4">
            <h3 className="text-sm font-semibold">Before publishing</h3>
            <ul className="mt-2 list-disc space-y-1.5 pl-4 text-xs leading-relaxed text-content-secondary">
              <li>Use clear, well-lit photos.</li>
              <li>Check that the first image is the best cover.</li>
              <li>Only enter confirmed dimensions and material details.</li>
              <li>Enable enquiries only when you want visitors to contact you about this item.</li>
            </ul>
          </section>
        </aside>
      </div>
    </>
  );
}