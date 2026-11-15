import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "../../components/ui/Container";
import { PageIntro } from "../../components/ui/PageIntro";
import { Seo } from "../../components/ui/Seo";
import { Button, ButtonLink } from "../../components/ui/Button";
import { SchoolModelCard } from "../../components/schoolModels/SchoolModelCard";
import { SchoolModelDetail } from "../../components/schoolModels/SchoolModelDetail";
import { SchoolModelFilters, type SchoolModelFiltersState } from "../../components/schoolModels/SchoolModelFilters";
import { useDebounce } from "../../hooks/useDebounce";
import { PROJECTS_PER_PAGE } from "../../constants/projectOptions";
import {
  schoolModelService,
  DEFAULT_SCHOOL_SETTINGS,
} from "../../services/schoolModelService";
import type {
  SchoolModel,
  SchoolSettings,
} from "../../services/schoolModelService";

export default function SchoolProjects() {
  const { slug } = useParams();
  const [items, setItems] = useState<SchoolModel[]>([]);
  const [model, setModel] = useState<SchoolModel | null>(null);
  const [settings, setSettings] = useState<SchoolSettings>(
    DEFAULT_SCHOOL_SETTINGS,
  );
  const [filters, setFilters] = useState<SchoolModelFiltersState>({
    search: "",
    category: "",
    subcategory: "",
    modelType: "",
    difficulty: "",
    status: "",
    sort: "newest",
  });
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);
  const debouncedSearch = useDebounce(filters.search, 250);
  const effectiveFilters = useMemo(
    () => ({ ...filters, search: debouncedSearch }),
    [filters, debouncedSearch],
  );
  const filteredItems = useMemo(() => {
    const term = effectiveFilters.search.trim().toLocaleLowerCase();
    const matched = items.filter((item) => {
      if (effectiveFilters.category && item.category !== effectiveFilters.category) return false;
      if (effectiveFilters.subcategory && item.subcategory !== effectiveFilters.subcategory) return false;
      if (effectiveFilters.modelType && item.modelType !== effectiveFilters.modelType) return false;
      if (effectiveFilters.difficulty && item.difficulty !== effectiveFilters.difficulty) return false;
      if (effectiveFilters.status && item.status !== effectiveFilters.status) return false;

      if (!term) return true;
      const searchableText = [
        item.title,
        item.shortDescription,
        item.description,
        item.category,
        item.subcategory,
        item.subject,
        item.gradeRange,
        item.modelType,
        item.difficulty,
        item.status,
        item.workingPrinciple,
        item.problemStatement,
        ...item.tags,
        ...item.materials,
        ...item.features,
        ...item.customizationOptions,
        ...item.keywords,
        ...item.objectives,
      ].join(" ").toLocaleLowerCase();

      return searchableText.includes(term);
    });

    const time = (value: SchoolModel["createdAt"] | SchoolModel["updatedAt"]) =>
      value?.toMillis?.() ??
      (value?.seconds ? value.seconds * 1000 : value ? new Date(value).getTime() : 0);

    return [...matched].sort((a, b) => {
      switch (effectiveFilters.sort) {
        case "oldest":
          return time(a.createdAt) - time(b.createdAt);
        case "release":
          return time(b.createdAt) - time(a.createdAt);
        case "updated":
          return time(b.updatedAt) - time(a.updatedAt);
        case "popular":
          return Number(b.featured) - Number(a.featured) || b.viewCount - a.viewCount;
        case "views":
          return b.viewCount - a.viewCount;
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "newest":
        default:
          return time(b.createdAt) - time(a.createdAt);
      }
    });
  }, [items, effectiveFilters]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = filteredItems.length > visibleCount;

  useEffect(() => {
    setVisibleCount(PROJECTS_PER_PAGE);
  }, [effectiveFilters]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Same category first, then the rest, so the end of a model page always has somewhere to go.
  const related = useMemo(() => {
    if (!model) return [];
    const others = items.filter((item) => item.id !== model.id);
    const sameCategory = others.filter((item) => item.category === model.category);
    const rest = others.filter((item) => item.category !== model.category);
    return [...sameCategory, ...rest].slice(0, 3);
  }, [items, model]);

  useEffect(() => {
    let live = true;

    Promise.all([
      schoolModelService.getSettings(),
      schoolModelService.getPublished(),
    ])
      .then(([s, a]) => {
        if (live) {
          setSettings(s);
          setItems(a);
        }
      })
      .catch(() => {
        if (live) setError("Could not load the school model catalog.");
      })
      .finally(() => {
        if (live) setLoading(false);
      });

    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    if (!slug) {
      setModel(null);
      return;
    }

    let live = true;

    schoolModelService
      .getBySlug(slug)
      .then((x) => {
        if (live) {
          setModel(x);
          if (x) schoolModelService.incrementViewCount(x.id);
        }
      })
      .catch(() => {
        if (live) setModel(null);
      });

    return () => {
      live = false;
    };
  }, [slug]);

  if (!loading && !settings.enabled) {
    return (
      <Container className="py-20">
        <Seo title="School models unavailable" noIndex />
        <h1 className="text-2xl font-semibold">
          This section is temporarily unavailable.
        </h1>
        <ButtonLink to="/projects" className="mt-5">
          Browse electronics projects
        </ButtonLink>
      </Container>
    );
  }

  if (slug) {
    if (loading) {
      return <Container className="py-20">Loading model…</Container>;
    }

    if (!model) {
      return (
        <Container className="py-20">
          <Seo title="Model not found" noIndex />
          <h1 className="text-2xl font-semibold">This model is unavailable.</h1>
          <ButtonLink to="/school-projects" className="mt-5">
            Browse school models
          </ButtonLink>
        </Container>
      );
    }

    return (
      <>
        <Seo
          title={model.seoTitle || model.title}
          description={model.seoDescription || model.shortDescription}
          path={"/school-projects/" + model.slug}
          image={model.heroImageUrl || model.thumbnailUrl || null}
        />
        <SchoolModelDetail model={model} related={related} />
      </>
    );
  }

  return (
    <>
      <Seo
        title="School Charts & Educational Models"
        description="Browse educational charts, school science models and creative exhibition projects. Request a quote tailored to your requirements."
        path="/school-projects"
      />
      <PageIntro
        eyebrow="School & learning"
        title="School Charts & Educational Models"
        description="Explore educational charts, classroom models and creative school projects. Request a quote tailored to your requirements."
      />

      <Container className="py-8 sm:py-12">
        <SchoolModelFilters
          filters={filters}
          onChange={setFilters}
          items={items}
          categories={settings.categories}
          subcategories={[...new Set([...settings.subcategories, ...items.map((item) => item.subcategory).filter(Boolean)])].sort()}
          modelTypes={[...new Set([...settings.modelTypes, ...items.map((item) => item.modelType).filter(Boolean)])].sort()}
          difficulties={[...new Set([...settings.difficulties, ...items.map((item) => item.difficulty).filter(Boolean)])].sort()}
          statuses={[...new Set([...settings.statuses, ...items.map((item) => item.status).filter(Boolean)])].sort()}
          resultCount={filteredItems.length}
        />

        {loading ? (
          <p className="py-12 text-center text-sm text-content-secondary">
            Loading catalog…
          </p>
        ) : error ? (
          <p role="alert" className="py-12 text-center text-state-danger">
            {error}
          </p>
        ) : filteredItems.length > 0 ? (
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((x) => (
              <SchoolModelCard key={x.id} model={x} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-line p-10 text-center">
            <h2 className="text-lg font-semibold">
              {items.length > 0 ? "Nothing matches those filters" : "No models published yet"}
            </h2>
            <p className="mt-2 text-sm text-content-secondary">
              {items.length > 0
                ? "Try a different search or clear the filters to see all school models."
                : "New items will appear here once published by the admin."}
            </p>
            {items.length === 0 ? (
              <ButtonLink
                to="/request-school-model"
                variant="secondary"
                className="mt-5"
              >
                Request a custom school model
              </ButtonLink>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                className="mt-5"
                onClick={() =>
                  setFilters({
                    search: "",
                    category: "",
                    subcategory: "",
                    modelType: "",
                    difficulty: "",
                    status: "",
                    sort: "newest",
                  })
                }
              >
                Clear filters
              </Button>
            )}
          </div>
        )}
        {hasMore && (
          <div className="mt-8 flex justify-center sm:mt-12">
            <Button
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={() => setVisibleCount((count) => count + PROJECTS_PER_PAGE)}
            >
              Show more models
            </Button>
          </div>
        )}
      </Container>
    </>
  );
}
