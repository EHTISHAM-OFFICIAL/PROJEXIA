import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { ArrowLeft, ImagePlus, Loader2, Pencil, Plus, Save, Upload, X } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Seo } from "../../components/ui/Seo";
import { Button } from "../../components/ui/Button";
import { Alert } from "../../components/ui/Alert";
import { Image } from "../../components/ui/Image";
import { Field } from "../../components/forms/Field";
import { TextInput, TextArea, Select } from "../../components/forms/Inputs";
import { RichTextEditor } from "../../components/forms/RichTextEditor";
import { ListEditor } from "../../components/forms/ListEditor";
import { ImageProcessingDialog } from "../../components/forms/ImageProcessingDialog";
import { collectionService } from "../../services/collectionService";
import { imgbbService } from "../../services/imgbbService";
import { PROJECT_IMAGE_RULES } from "../../constants/requestOptions";
import { validateProjectImage } from "../../utils/fileValidation";
import { useToast } from "../../contexts/ToastContext";
import type { CollectionItemDraft } from "../../types/collection";
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
  const [pendingImages, setPendingImages] = useState<File[]>([]);
  const [editingImageIndex, setEditingImageIndex] = useState<number | null>(null);
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
          setDraft({\n            ...EMPTY_COLLECTION_DRAFT,\n            ...rest,\n            additionalDetails: (rest.additionalDetails ?? []).map((detail) => ({\n              label: "",\n              value: [detail.label?.trim(), detail.value?.trim()].filter(Boolean).join(": "),\n            })).filter((detail) => detail.value),\n          });
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

  const uploadImages = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;
    if (draft.images.length + files.length > 10) {
      setError("You can add up to 10 images to one collection item.");
      event.target.value = "";
      return;
    }
    const invalid = files.map((file) => ({ file, result: validateProjectImage(file) })).find((entry) => !entry.result.valid);
    if (invalid) {
      setError(invalid.result.error || invalid.file.name + " cannot be uploaded.");
      event.target.value = "";
      return;
    }
    setError("");
    setEditingImageIndex(null);
    setPendingImages(files);
    event.target.value = "";
  };

  const uploadPreparedImage = async (file: File) => {
    setUploading(true);
    setError("");
    setUploadProgress("Uploading image to the existing image hosts...");
    try {
      const uploaded = await imgbbService.upload(file);
      const alt = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").replace(/-cropped$/i, "").trim();
      if (editingImageIndex !== null) {
        setDraft((current) => ({
          ...current,
          images: current.images.map((image, index) => index === editingImageIndex ? { ...image, url: uploaded.url } : image),
        }));
        setEditingImageIndex(null);
      } else {
        setDraft((current) => ({ ...current, images: [...current.images, { url: uploaded.url, alt }] }));
      }
      setPendingImages((current) => current.slice(1));
      notify({ title: "Image prepared", message: "The edited image has been uploaded successfully.", tone: "success" });
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "The image could not be uploaded.";
      setError(message);
      throw caught;
    } finally {
      setUploading(false);
      setUploadProgress("");
    }
  };

  const editExistingImage = async (index: number) => {
    const current = draft.images[index];
    if (!current) return;
    setError("");
    try {
      const response = await fetch(current.url);
      if (!response.ok) throw new Error("Could not retrieve this image for editing.");
      const blob = await response.blob();
      const type = blob.type || "image/png";
      const extension = type === "image/jpeg" ? ".jpg" : type === "image/webp" ? ".webp" : ".png";
      const file = new File([blob], (current.alt || draft.title || "collection-image") + extension, { type });
      const validation = validateProjectImage(file);
      if (!validation.valid) throw new Error(validation.error || "This image cannot be edited.");
      setEditingImageIndex(index);
      setPendingImages([file]);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not open this image for editing.");
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

  const updateFeatures = (value: string) => {
    const features = value
      .split(".")
      .map((feature) => feature.trim())
      .filter(Boolean)
      .map((feature) => ({ label: "", value: feature }));
    setDraft((current) => ({ ...current, additionalDetails: features }));
  };

  const save = async (published: boolean) => {
    setError("");
    if (pendingImages.length > 0 || uploading) { setError("Finish preparing and uploading the selected images before saving."); return; }
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
                <RichTextEditor id="description" rows={8} value={draft.description} onChange={(value) => update("description", value)} placeholder="Describe the item, its purpose and any useful details..." showToolbar/>
              </Field>
            </div>
          </section>

          <section className="rounded-xl border border-line bg-surface p-4 sm:p-6">
            <h2 className="font-semibold">Tags and search terms</h2>
            <p className="mt-1 text-xs text-content-muted">Add short keywords that describe this item. Press comma or paste comma-separated values to create separate entries.</p>
            <div className="mt-4">
              <ListEditor label="Tag" placeholder="e.g. Acrylic, Custom-made, Educational" values={draft.tags ?? []} onChange={(tags) => update("tags", tags)} splitOnComma/>
            </div>
          </section>

          <section className="rounded-xl border border-line bg-surface p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div><h2 className="font-semibold">Item images</h2><p className="mt-1 text-xs text-content-muted">Upload up to 10 images. The first image is used as the gallery cover.</p></div>
              <Button type="button" variant="secondary" size="sm" onClick={() => inputRef.current?.click()} disabled={uploading}><ImagePlus size={15}/> Add images</Button>
            </div>
            <input ref={inputRef} type="file" accept={PROJECT_IMAGE_RULES.allowedExtensions.join(",")} multiple onChange={uploadImages} className="sr-only"/>
            {pendingImages[0] && <ImageProcessingDialog key={pendingImages[0].name + pendingImages[0].lastModified} file={pendingImages[0]} title={editingImageIndex !== null ? "Edit collection image" : "Prepare collection image"} onCancel={() => { setPendingImages([]); setEditingImageIndex(null); }} onUse={uploadPreparedImage}/>} 
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
                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <button type="button" onClick={() => void editExistingImage(index)} disabled={uploading || pendingImages.length > 0} className="inline-flex items-center gap-1 text-xs font-medium text-content-secondary hover:text-accent disabled:opacity-50"><Pencil size={12}/> Edit / crop</button>
                        {index > 0 && <button type="button" onClick={() => setDraft((current) => ({ ...current, images: [current.images[index], ...current.images.filter((_, imageIndex) => imageIndex !== index)] }))} className="text-xs font-medium text-accent hover:underline">Make cover image</button>}
                      </div>
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
              <div className="flex items-center justify-between gap-3">
                <div><h3 className="text-sm font-semibold">Features</h3><p className="mt-1 text-xs text-content-muted">Separate each feature with a full stop. Each one appears as its own line in the item details.</p></div>
                <Button type="button" variant="secondary" size="sm" onClick={() => updateFeatures([...draft.additionalDetails.map((feature) => feature.value), ""].join(". "))}><Plus size={14}/> Add feature</Button>
              </div>
              <Field label="Item features" htmlFor="features">
                <TextArea id="features" rows={4} value={draft.additionalDetails.map((feature) => feature.value).join(". ")} onChange={(event) => updateFeatures(event.target.value)} placeholder="e.g. Lightweight design. Smooth polished finish. Made for everyday use."/>
              </Field>
              <p className="mt-2 text-xs text-content-muted">{draft.additionalDetails.filter((feature) => feature.value.trim()).length} feature(s) detected</p>
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
              <Button type="button" onClick={() => void save(false)} loading={saving} disabled={uploading || pendingImages.length > 0}><Save size={15}/> Save as draft</Button>
              <Button type="button" variant="secondary" onClick={() => void save(true)} loading={saving} disabled={uploading || pendingImages.length > 0}><Plus size={15}/> Save and publish</Button>
              <Button type="button" variant="ghost" onClick={() => navigate("/admin/collections")} disabled={saving || uploading || pendingImages.length > 0}>Cancel</Button>
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