import { useEffect, useMemo, useState } from "react";
import { Eye, EyeOff, FolderOpen, Pencil, Plus, Search, Tag, Trash2, X, Save } from "lucide-react";
import { Seo } from "../../components/ui/Seo";
import { Image } from "../../components/ui/Image";
import { Button, ButtonLink } from "../../components/ui/Button";
import { Alert } from "../../components/ui/Alert";
import { EmptyState } from "../../components/ui/EmptyState";
import { useToast } from "../../contexts/ToastContext";
import { collectionService } from "../../services/collectionService";
import type { CollectionItem } from "../../types/collection";

export default function CollectionsAdmin() {
  const { notify } = useToast();
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [visibility, setVisibility] = useState("all");
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState("");
  const [categoryDraft, setCategoryDraft] = useState("");

  const reload = async () => {
    setLoading(true);
    setError("");
    try {
      const [all, settings] = await Promise.all([collectionService.getAll(), collectionService.getSettings()]);
      setItems(all);
      setCategories(settings.categories);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not load collection items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void reload(); }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLocaleLowerCase();
    return items.filter((item) => {
      if (visibility === "published" && !item.published) return false;
      if (visibility === "draft" && item.published) return false;
      return !term || [item.title, item.category, item.shortDescription, item.description].join(" ").toLocaleLowerCase().includes(term);
    });
  }, [items, search, visibility]);

  const saveCategories = async (next: string[]) => {
    await collectionService.saveSettings({ categories: next });
    setCategories(next);
  };

  const addCategory = async () => {
    const value = newCategory.trim();
    if (!value) return;
    if (categories.some((category) => category.toLocaleLowerCase() === value.toLocaleLowerCase())) {
      notify({ title: "Category already exists", message: "Choose a different category name.", tone: "error" });
      return;
    }
    try {
      const next = [...categories.filter((category) => category !== "Others"), value];
      if (categories.includes("Others")) next.push("Others");
      else next.push("Others");
      await saveCategories(next);
      setNewCategory("");
      notify({ title: "Category added", message: value + " is now available for collection items.", tone: "success" });
    } catch (caught) {
      notify({ title: "Could not add category", message: caught instanceof Error ? caught.message : "Please try again.", tone: "error" });
    }
  };

  const renameCategory = async (oldName: string) => {
    const value = categoryDraft.trim();
    if (!value || value === oldName) { setEditingCategory(""); return; }
    if (categories.some((category) => category !== oldName && category.toLocaleLowerCase() === value.toLocaleLowerCase())) {
      notify({ title: "Category already exists", message: "Choose a different category name.", tone: "error" });
      return;
    }
    setWorking("category:" + oldName);
    try {
      await collectionService.renameCategory(oldName, value);
      const next = categories.map((category) => category === oldName ? value : category);
      await saveCategories(next);
      await reload();
      setEditingCategory("");
      notify({ title: "Category renamed", message: "Existing items were updated to use " + value + ".", tone: "success" });
    } catch (caught) {
      notify({ title: "Could not rename category", message: caught instanceof Error ? caught.message : "Please try again.", tone: "error" });
    } finally {
      setWorking(null);
    }
  };

  const deleteCategory = async (name: string) => {
    const usedBy = items.filter((item) => item.category === name).length;
    if (categories.length <= 1) {
      notify({ title: "Keep at least one category", message: "A collection needs at least one category. Add another category before deleting this one.", tone: "error" });
      return;
    }
    if (usedBy > 0) {
      notify({ title: "Category is in use", message: "Move the " + usedBy + " item(s) to another category before deleting this one.", tone: "error" });
      return;
    }
    if (!window.confirm("Delete the category \"" + name + "\"? This cannot be undone.")) return;
    try {
      await saveCategories(categories.filter((category) => category !== name));
      notify({ title: "Category deleted", message: name + " has been removed.", tone: "success" });
    } catch (caught) {
      notify({ title: "Could not delete category", message: caught instanceof Error ? caught.message : "Please try again.", tone: "error" });
    }
  };

  const runItemAction = async (id: string, action: () => Promise<void>, successTitle: string) => {
    setWorking(id);
    try {
      await action();
      await reload();
      notify({ title: successTitle, message: "The collection has been updated.", tone: "success" });
    } catch (caught) {
      notify({ title: "Action failed", message: caught instanceof Error ? caught.message : "Please try again.", tone: "error" });
    } finally {
      setWorking(null);
    }
  };

  const publishedCount = items.filter((item) => item.published).length;
  const draftCount = items.length - publishedCount;

  return (
    <>
      <Seo title="Manage Collections" noIndex />
      <div className="flex flex-col gap-6">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow">Content management</p>
            <h1 className="mt-1 text-2xl font-semibold">Collections</h1>
            <p className="mt-1 text-sm text-content-secondary">Manage gallery items, images, categories and publication status.</p>
          </div>
          <ButtonLink to="/admin/collections/new"><Plus size={17}/> Add new item</ButtonLink>
        </header>

        {error && <Alert tone="danger">{error}</Alert>}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-line bg-surface p-4"><p className="text-xs text-content-muted">Total items</p><p className="mt-1 text-2xl font-semibold">{items.length}</p></div>
          <div className="rounded-xl border border-line bg-surface p-4"><p className="text-xs text-content-muted">Published</p><p className="mt-1 text-2xl font-semibold text-state-success">{publishedCount}</p></div>
          <div className="rounded-xl border border-line bg-surface p-4"><p className="text-xs text-content-muted">Drafts</p><p className="mt-1 text-2xl font-semibold">{draftCount}</p></div>
        </div>

        <section className="rounded-xl border border-line bg-surface p-4 sm:p-5">
          <div className="flex items-center gap-2"><Tag size={18} className="text-accent"/><h2 className="font-semibold">Category management</h2></div>
          <p className="mt-1 text-xs leading-relaxed text-content-muted">Add categories as your collection grows. Renaming a category also updates all items assigned to it.</p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <input value={newCategory} onChange={(event) => setNewCategory(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); void addCategory(); } }} placeholder="New category name" className="field-input min-w-0 flex-1"/>
            <Button type="button" onClick={() => void addCategory()} disabled={!newCategory.trim()}><Plus size={16}/> Add category</Button>
          </div>
          <div className="mt-4 flex flex-col divide-y divide-line">
            {categories.map((name) => (
              <div key={name} className="flex flex-wrap items-center gap-2 py-2.5">
                {editingCategory === name ? (
                  <>
                    <input autoFocus value={categoryDraft} onChange={(event) => setCategoryDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") void renameCategory(name); if (event.key === "Escape") setEditingCategory(""); }} className="field-input min-w-0 flex-1"/>
                    <Button size="sm" onClick={() => void renameCategory(name)} loading={working === "category:" + name}><Save size={14}/> Save</Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditingCategory("")}><X size={14}/></Button>
                  </>
                ) : (
                  <>
                    <span className="min-w-0 flex-1 text-sm font-medium">{name}</span>
                    <span className="text-xs text-content-muted">{items.filter((item) => item.category === name).length} items</span>
                    <button type="button" onClick={() => { setEditingCategory(name); setCategoryDraft(name); }} aria-label={"Rename " + name} className="rounded-lg p-2 text-content-muted hover:bg-surface-raised hover:text-content"><Pencil size={15}/></button>
                    <button type="button" onClick={() => void deleteCategory(name)} aria-label={"Delete " + name} className="rounded-lg p-2 text-content-muted hover:bg-state-danger/10 hover:text-state-danger"><Trash2 size={15}/></button>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-line bg-surface p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative min-w-0 flex-1">
              <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-content-muted"/>
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search collection items..." className="field-input pl-10"/>
            </label>
            <select value={visibility} onChange={(event) => setVisibility(event.target.value)} className="field-input sm:w-44">
              <option value="all">All items</option><option value="published">Published</option><option value="draft">Drafts</option>
            </select>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 text-xs text-content-muted">
            <span>{filtered.length} matching {filtered.length === 1 ? "item" : "items"}</span>
            <button type="button" onClick={() => { setSearch(""); setVisibility("all"); }} className="inline-flex items-center gap-1 rounded-md px-2 py-1 hover:bg-surface-raised hover:text-content"><X size={13}/> Reset</button>
          </div>

          {loading ? (
            <div className="mt-5 space-y-3">{[1,2,3].map((item) => <div key={item} className="h-20 animate-pulse rounded-xl bg-surface-raised"/>)}</div>
          ) : filtered.length === 0 ? (
            <div className="mt-5"><EmptyState title={items.length ? "No matching items" : "No collection items yet"} description={items.length ? "Try a different search or filter." : "Add your first item to start building the gallery."} icon={<FolderOpen size={20}/>} action={!items.length ? <ButtonLink to="/admin/collections/new" size="sm"><Plus size={15}/> Add item</ButtonLink> : undefined}/></div>
          ) : (
            <div className="mt-4 divide-y divide-line">
              {filtered.map((item) => (
                <article key={item.id} className="flex min-w-0 flex-col gap-3 py-4 sm:flex-row sm:items-center">
                  <div className="h-20 w-full shrink-0 overflow-hidden rounded-lg border border-line bg-surface-raised sm:w-28">
                    {item.images[0] && <Image src={item.images[0].url} alt={item.images[0].alt || item.title} className="h-full w-full object-contain p-1"/>}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-content">{item.title}</h3>
                      <span className={"rounded-full px-2 py-0.5 text-[10px] font-semibold " + (item.published ? "bg-state-success/10 text-state-success" : "bg-surface-raised text-content-muted")}>{item.published ? "Published" : "Draft"}</span>
                    </div>
                    <p className="mt-1 text-xs text-content-muted">{item.category} · {item.images.length} {item.images.length === 1 ? "image" : "images"}{item.enquiryEnabled ? " · Enquiries enabled" : ""}</p>
                    {item.shortDescription && <p className="mt-1 line-clamp-1 text-sm text-content-secondary">{item.shortDescription}</p>}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    <Button size="sm" variant="secondary" disabled={working === item.id} onClick={() => void runItemAction(item.id, () => collectionService.setPublished(item.id, !item.published), item.published ? "Item unpublished" : "Item published")}>
                      {item.published ? <EyeOff size={14}/> : <Eye size={14}/>} {item.published ? "Unpublish" : "Publish"}
                    </Button>
                    <ButtonLink to={"/admin/collections/" + item.id + "/edit"} size="sm" variant="secondary"><Pencil size={14}/> Edit</ButtonLink>
                    <Button size="sm" variant="danger" disabled={working === item.id} onClick={() => { if (window.confirm("Permanently delete \"" + item.title + "\"?")) void runItemAction(item.id, () => collectionService.delete(item.id), "Item deleted"); }}><Trash2 size={14}/></Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}