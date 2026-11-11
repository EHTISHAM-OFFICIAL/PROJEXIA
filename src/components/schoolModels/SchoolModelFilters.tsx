import { Search, SlidersHorizontal, X } from "lucide-react";
import { Select, TextInput } from "../../components/forms/Inputs";
import { cn } from "../../utils/cn";
import type { SchoolModel } from "../../services/schoolModelService";

export type SchoolModelFiltersState = {
  search: string;
  category: string;
  subcategory: string;
  modelType: string;
  difficulty: string;
  status: string;
  sort: string;
};

interface SchoolModelFiltersProps {
  filters: SchoolModelFiltersState;
  onChange: (filters: SchoolModelFiltersState) => void;
  items: SchoolModel[];
  categories: string[];
  subcategories: string[];
  modelTypes: string[];
  difficulties: string[];
  statuses: string[];
  resultCount: number;
}

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "updated", label: "Recently updated" },
  { value: "release", label: "Release date (newest)" },
  { value: "popular", label: "Most popular" },
  { value: "views", label: "Most viewed" },
  { value: "title-asc", label: "Title A–Z" },
  { value: "title-desc", label: "Title Z–A" },
];

export function SchoolModelFilters({
  filters,
  onChange,
  items,
  categories,
  subcategories,
  modelTypes,
  difficulties,
  statuses,
  resultCount,
}: SchoolModelFiltersProps) {
  const update = <K extends keyof SchoolModelFiltersState>(
    key: K,
    value: SchoolModelFiltersState[K],
  ) => onChange({ ...filters, [key]: value });

  const categoryCounts = items.reduce<Record<string, number>>((counts, item) => {
    counts[item.category] = (counts[item.category] ?? 0) + 1;
    return counts;
  }, {});

  const availableCategories = [...new Set([...categories, ...Object.keys(categoryCounts)])]
    .filter((value) => (categoryCounts[value] ?? 0) > 0)
    .sort((a, b) => {
      if (a === "Others") return 1;
      if (b === "Others") return -1;
      return a.localeCompare(b);
    });

  const activeCount = [
    filters.category,
    filters.subcategory,
    filters.modelType,
    filters.difficulty,
    filters.status,
  ].filter(Boolean).length;
  const hasAnyFilter = activeCount > 0 || filters.search.trim() !== "";

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div className="relative min-w-0">
        <Search
          size={17}
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-content-muted"
        />
        <TextInput
          type="search"
          value={filters.search}
          onChange={(event) => update("search", event.target.value)}
          placeholder="Search models by name, subject, material or tag"
          aria-label="Search school models"
          className="pl-11"
        />
      </div>

      <div
        className="-mx-4 flex max-w-[calc(100%+2rem)] flex-nowrap gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:thin] sm:mx-0 sm:max-w-full sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
        role="group"
        aria-label="Filter by category"
      >
        <button
          type="button"
          onClick={() => update("category", "")}
          aria-pressed={!filters.category}
          className={cn(
            "min-h-11 shrink-0 rounded-lg border px-3.5 py-2 text-sm transition-colors",
            !filters.category
              ? "border-accent bg-accent text-onAccent"
              : "border-line bg-surface text-content-secondary hover:border-line-strong hover:text-content",
          )}
        >
          All <span className="opacity-70">({items.length})</span>
        </button>
        {availableCategories.map((category) => {
          const active = filters.category === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => update("category", active ? "" : category)}
              aria-pressed={active}
              className={cn(
                "min-h-11 shrink-0 rounded-lg border px-3.5 py-2 text-sm transition-colors",
                active
                  ? "border-accent bg-accent text-onAccent"
                  : "border-line bg-surface text-content-secondary hover:border-line-strong hover:text-content",
              )}
            >
              {category} <span className="opacity-70">({categoryCounts[category]})</span>
            </button>
          );
        })}
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Select
          options={subcategories}
          placeholder="All subcategories"
          value={filters.subcategory}
          aria-label="Filter by subcategory"
          onChange={(event) => update("subcategory", event.target.value)}
        />
        <Select
          options={modelTypes}
          placeholder="All model formats"
          value={filters.modelType}
          aria-label="Filter by model format"
          onChange={(event) => update("modelType", event.target.value)}
        />
        <Select
          options={difficulties}
          placeholder="Any difficulty"
          value={filters.difficulty}
          aria-label="Filter by difficulty"
          onChange={(event) => update("difficulty", event.target.value)}
        />
        <Select
          options={statuses}
          placeholder="Any status"
          value={filters.status}
          aria-label="Filter by status"
          onChange={(event) => update("status", event.target.value)}
        />
        <Select
          options={SORT_OPTIONS}
          value={filters.sort}
          aria-label="Sort school models"
          onChange={(event) => update("sort", event.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
        <p className="flex items-center gap-2 text-sm text-content-secondary">
          <SlidersHorizontal
            size={15}
            aria-hidden="true"
            className="shrink-0 text-content-muted"
          />
          <span aria-live="polite">
            {resultCount} {resultCount === 1 ? "model" : "models"}
            {activeCount > 0 &&
              ` · ${activeCount} ${activeCount === 1 ? "filter" : "filters"}`}
          </span>
        </p>
        {hasAnyFilter && (
          <button
            type="button"
            onClick={() =>
              onChange({
                search: "",
                category: "",
                subcategory: "",
                modelType: "",
                difficulty: "",
                status: "",
                sort: "newest",
              })
            }
            className="inline-flex min-h-10 items-center gap-1.5 rounded-md px-2 py-1 text-sm text-content-secondary transition-colors hover:text-content"
          >
            <X size={14} aria-hidden="true" />
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
