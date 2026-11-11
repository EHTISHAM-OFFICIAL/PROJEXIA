import { Search, X } from "lucide-react";

interface CollectionFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (value: string) => void;
  categoryCounts: Record<string, number>;
  totalCount: number;
  resultCount: number;
}

export function CollectionFilters({
  search,
  onSearchChange,
  categories,
  activeCategory,
  onCategoryChange,
  categoryCounts,
  totalCount,
  resultCount,
}: CollectionFiltersProps) {
  const hasFilters = Boolean(search.trim() || activeCategory);

  return (
    <section className="rounded-2xl border border-line bg-surface/80 p-4 shadow-sm sm:p-5" aria-label="Filter collections">
      <label className="relative block">
        <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-content-muted" aria-hidden="true" />
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search items, materials or details..."
          aria-label="Search collection items"
          className="field-input h-12 pl-11 pr-4"
        />
      </label>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible" role="group" aria-label="Collection categories">
        <button
          type="button"
          onClick={() => onCategoryChange("")}
          aria-pressed={!activeCategory}
          className={"shrink-0 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors " + (!activeCategory ? "border-accent bg-accent text-onAccent" : "border-line bg-surface-raised text-content-secondary hover:border-line-strong hover:text-content")}
        >
          All items <span className="ml-1 opacity-75">({totalCount})</span>
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            aria-pressed={activeCategory === category}
            className={"shrink-0 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors " + (activeCategory === category ? "border-accent bg-accent text-onAccent" : "border-line bg-surface-raised text-content-secondary hover:border-line-strong hover:text-content")}
          >
            {category} <span className="ml-1 opacity-75">({categoryCounts[category] ?? 0})</span>
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3">
        <p className="text-xs text-content-muted" aria-live="polite">
          Showing <span className="font-semibold text-content">{resultCount}</span> of {totalCount} {totalCount === 1 ? "item" : "items"}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={() => { onSearchChange(""); onCategoryChange(""); }}
            className="inline-flex min-h-8 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-content-secondary transition-colors hover:bg-surface-raised hover:text-content"
          >
            <X size={14} aria-hidden="true" /> Clear filters
          </button>
        )}
      </div>
    </section>
  );
}