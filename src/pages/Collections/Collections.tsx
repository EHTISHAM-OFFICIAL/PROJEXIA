import { useEffect, useMemo, useState } from "react";
import { FolderSearch } from "lucide-react";
import { PageIntro } from "../../components/ui/PageIntro";
import { Container } from "../../components/ui/Container";
import { Seo } from "../../components/ui/Seo";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { ErrorState } from "../../components/ui/ErrorState";
import { CollectionCard } from "../../components/collections/CollectionCard";
import { CollectionFilters } from "../../components/collections/CollectionFilters";
import { CollectionQuickView } from "../../components/collections/CollectionQuickView";
import { collectionService } from "../../services/collectionService";
import { useDebounce } from "../../hooks/useDebounce";
import type { CollectionItem } from "../../types/collection";

const ITEMS_PER_PAGE = 12;

export default function Collections() {
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [selectedItem, setSelectedItem] = useState<CollectionItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const debouncedSearch = useDebounce(search, 250);

  const reload = async () => {
    setLoading(true);
    setError("");
    try {
      const [published, settings] = await Promise.all([
        collectionService.getPublished(),
        collectionService.getSettings(),
      ]);
      setItems(published);
      setCategories(settings.categories);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The collections could not be loaded.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void reload(); }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    items.forEach((item) => { counts[item.category] = (counts[item.category] ?? 0) + 1; });
    return counts;
  }, [items]);

  const filtered = useMemo(() => {
    const term = debouncedSearch.trim().toLocaleLowerCase();
    return items.filter((item) => {
      if (category && item.category !== category) return false;
      if (!term) return true;
      const details = item.additionalDetails.map((detail) => detail.label + " " + detail.value).join(" ");
      const searchable = [
        item.title,
        item.category,
        item.shortDescription,
        item.description,
        item.material,
        item.dimensions,
        item.color,
        details,
      ].join(" ").toLocaleLowerCase();
      return searchable.includes(term);
    });
  }, [items, category, debouncedSearch]);

  const visible = filtered.slice(0, visibleCount);
  const hasFilters = Boolean(search.trim() || category);

  useEffect(() => { setVisibleCount(ITEMS_PER_PAGE); }, [category, debouncedSearch]);

  const clearFilters = () => {
    setSearch("");
    setCategory("");
  };

  return (
    <>
      <Seo
        title="Collections | Acrylic Products & Accessories"
        description="Explore the PROJEXIAHUB collections: acrylic products, project accessories, educational items, materials and custom creations."
        path="/collections"
      />
      <PageIntro
        eyebrow="Explore PROJEXIAHUB"
        title="Our Collections"
        description="A visual collection of useful creations, custom products, project accessories and other things we've put together. Select an item to explore its details."
        backdrop
      />

      <Container className="py-8 sm:py-12">
        {!loading && !error && items.length > 0 && (
          <CollectionFilters
            search={search}
            onSearchChange={setSearch}
            categories={categories}
            activeCategory={category}
            onCategoryChange={setCategory}
            categoryCounts={categoryCounts}
            totalCount={items.length}
            resultCount={filtered.length}
          />
        )}

        <div className="mt-7 sm:mt-9">
          {loading && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="overflow-hidden rounded-2xl border border-line bg-surface">
                  <div className="aspect-[4/3] animate-pulse bg-surface-raised" />
                  <div className="space-y-3 p-4">
                    <div className="h-3 w-1/3 animate-pulse rounded bg-surface-raised" />
                    <div className="h-5 w-3/4 animate-pulse rounded bg-surface-raised" />
                    <div className="h-3 w-full animate-pulse rounded bg-surface-raised" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && error && <ErrorState message={error} onRetry={() => void reload()} />}

          {!loading && !error && items.length === 0 && (
            <EmptyState
              title="Our collection is taking shape"
              description="New items will appear here as they are added to the PROJEXIAHUB collection."
              icon={<FolderSearch size={21} aria-hidden="true" />}
            />
          )}

          {!loading && !error && items.length > 0 && filtered.length === 0 && (
            <EmptyState
              title="No items match your search"
              description="Try another search term or category, or clear the filters to explore the full collection."
              icon={<FolderSearch size={21} aria-hidden="true" />}
              action={<Button variant="secondary" size="sm" onClick={clearFilters}>Clear filters</Button>}
            />
          )}

          {!loading && !error && visible.length > 0 && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                {visible.map((item) => (
                  <CollectionCard key={item.id} item={item} onOpen={setSelectedItem} />
                ))}
              </div>
              {filtered.length > visibleCount && (
                <div className="mt-8 flex justify-center sm:mt-10">
                  <Button variant="secondary" className="w-full sm:w-auto" onClick={() => setVisibleCount((count) => count + ITEMS_PER_PAGE)}>
                    Show more items
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </Container>

      <CollectionQuickView item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
}