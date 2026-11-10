import { useEffect, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Search, X, ChevronLeft, ChevronRight, Images, Expand } from "lucide-react";
import { Container } from "../../components/ui/Container";
import { PageIntro } from "../../components/ui/PageIntro";
import { Seo } from "../../components/ui/Seo";
import { ButtonLink } from "../../components/ui/Button";
import { Image } from "../../components/ui/Image";
import { Badge } from "../../components/ui/Badge";
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
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [modelType, setModelType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const galleryImages = model?.galleryUrls.filter((url, index, urls) => Boolean(url) && urls.indexOf(url) === index) ?? [];

  useEffect(() => {
    setActiveGalleryIndex(null);
  }, [slug]);

  useEffect(() => {
    if (activeGalleryIndex === null || galleryImages.length === 0) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveGalleryIndex(null);
      if (event.key === "ArrowRight") setActiveGalleryIndex((index) => index === null ? 0 : (index + 1) % galleryImages.length);
      if (event.key === "ArrowLeft") setActiveGalleryIndex((index) => index === null ? 0 : (index - 1 + galleryImages.length) % galleryImages.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeGalleryIndex, galleryImages.length]);

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
        if (live) setModel(x);
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

        <Container className="pt-5 sm:pt-7">
          <Link
            to="/school-projects"
            className="inline-flex items-center gap-2 rounded-lg py-2 text-sm font-medium text-content-secondary transition-colors hover:text-content"
          >
            <span aria-hidden="true">←</span> All school models
          </Link>
        </Container>

        <Container className="pb-12 pt-4 sm:pb-16 sm:pt-6">
          <header className="max-w-4xl">
            <div className="flex flex-wrap gap-2">
              <Badge tone="accent">{model.category}</Badge>
              {model.subject && <Badge>{model.subject}</Badge>}
              {model.gradeRange && <Badge>{model.gradeRange}</Badge>}
              {model.subcategory && <Badge>{model.subcategory}</Badge>}
              {model.modelType && <Badge>{model.modelType}</Badge>}
              {model.difficulty && <Badge>{model.difficulty}</Badge>}
              {model.status && <Badge>{model.status}</Badge>}
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-content sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {model.title}
            </h1>
            {model.shortDescription && (
              <p className="mt-4 max-w-3xl text-base leading-7 text-content-secondary sm:text-lg sm:leading-8">
                {model.shortDescription}
              </p>
            )}
          </header>

          <div className="mt-7 grid items-start gap-6 lg:mt-9 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] lg:gap-8">
            <section aria-label="Model images" className="min-w-0">
              <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
                <Image
                  src={model.heroImageUrl || model.thumbnailUrl}
                  alt={model.title}
                  eager
                  className="aspect-[5/4] w-full bg-surface-raised object-contain sm:aspect-[16/10] lg:aspect-[5/4]"
                />
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-4 py-3">
                  <span className="text-xs font-medium text-content-secondary">Main project image</span>
                  {galleryImages.length > 0 && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-content-muted">
                      <Images size={14} /> {galleryImages.length} gallery {galleryImages.length === 1 ? "image" : "images"} below
                    </span>
                  )}
                </div>
              </div>
            </section>

            <aside className="min-w-0 space-y-5 lg:sticky lg:top-24">
              <section className="rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-base font-semibold">Model overview</h2>
                  <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">School model</span>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    ["Category", model.category],
                    ["Subject", model.subject],
                    ["Suitable for", model.gradeRange],
                    ["Format", model.modelType],
                    ["Difficulty", model.difficulty],
                    ["Dimensions", model.dimensions],
                  ].filter((item) => item[1]).map(([label, value]) => (
                    <div key={label} className="min-w-0 rounded-xl border border-line/80 bg-bg/60 p-3">
                      <dt className="text-xs text-content-muted">{label}</dt>
                      <dd className="mt-1 break-words text-sm font-medium text-content">{value}</dd>
                    </div>
                  ))}
                </dl>
                {model.estimatedBuildTime && (
                  <p className="mt-4 border-t border-line pt-4 text-sm text-content-secondary">
                    <span className="font-medium text-content">Estimated preparation:</span>{" "}
                    {model.estimatedBuildTime}
                  </p>
                )}
              </section>

              <section className="rounded-2xl border border-accent/25 bg-accent/5 p-5 sm:p-6">
                <h2 className="font-semibold">Need this model for your school?</h2>
                <p className="mt-2 text-sm leading-6 text-content-secondary">
                  Request a quote based on your quantity, size and requirements. No fixed price is assumed.
                </p>
                <ButtonLink
                  to={"/request-school-model?slug=" + encodeURIComponent(model.slug)}
                  className="mt-4 w-full justify-center sm:w-auto"
                >
                  Request a quote <ArrowRight size={16} />
                </ButtonLink>
              </section>

              {(model.videoUrl || model.documentationUrl) && (
                <section className="rounded-2xl border border-line p-5">
                  <h2 className="font-semibold">Learning resources</h2>
                  <div className="mt-3 flex flex-col gap-2">
                    {model.videoUrl && (
                      <a href={model.videoUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-between gap-3 rounded-lg border border-line px-3 py-2.5 text-sm font-medium transition-colors hover:bg-surface">
                        Watch demonstration <span aria-hidden="true">↗</span>
                      </a>
                    )}
                    {model.documentationUrl && (
                      <a href={model.documentationUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-between gap-3 rounded-lg border border-line px-3 py-2.5 text-sm font-medium transition-colors hover:bg-surface">
                        Open lesson resource <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </section>
              )}
            </aside>
          </div>

          {galleryImages.length > 0 && (
            <section aria-labelledby="school-model-gallery-title" className="mt-8 rounded-2xl border border-line bg-surface p-4 shadow-sm sm:mt-10 sm:p-6">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Inside the project</p>
                  <h2 id="school-model-gallery-title" className="mt-1 text-xl font-semibold sm:text-2xl">Project gallery</h2>
                  <p className="mt-1 text-sm leading-6 text-content-secondary">Explore additional views and details. Select any image to view it full size.</p>
                </div>
                <span className="rounded-full border border-line bg-bg/60 px-3 py-1.5 text-xs font-medium text-content-secondary">{galleryImages.length} {galleryImages.length === 1 ? "photo" : "photos"}</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
                {galleryImages.map((url, index) => (
                  <button
                    key={url}
                    type="button"
                    onClick={() => setActiveGalleryIndex(index)}
                    aria-label={"Open gallery image " + (index + 1) + " of " + galleryImages.length}
                    className="group relative min-w-0 overflow-hidden rounded-xl border border-line bg-surface-raised text-left transition duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <Image
                      src={url}
                      alt={model.title + " gallery view " + (index + 1)}
                      className="aspect-[4/3] w-full bg-surface-raised object-contain p-1.5 transition-transform duration-300 group-hover:scale-[1.025] sm:p-2"
                    />
                    <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-lg bg-bg/90 px-2 py-1 text-[11px] font-medium text-content shadow-sm backdrop-blur">
                      <Expand size={12} /> View
                    </span>
                  </button>
                ))}
              </div>
            </section>
          )}

          <div className="mt-8 grid items-start gap-6 lg:mt-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.85fr)] lg:gap-8">
            <div className="min-w-0 space-y-5">
              {model.description && (
                <section className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
                  <h2 className="text-lg font-semibold">About this model</h2>
                  <div className="mt-3 space-y-3 text-sm leading-7 text-content-secondary sm:text-[15px]">
                    {renderSchoolText(model.description)}
                  </div>
                </section>
              )}

              {model.problemStatement && (
                <section className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
                  <h2 className="text-lg font-semibold">Learning need</h2>
                  <div className="mt-3 space-y-2 text-sm leading-7 text-content-secondary">
                    {renderSchoolText(model.problemStatement)}
                  </div>
                </section>
              )}

              {model.workingPrinciple && (
                <section className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
                  <h2 className="text-lg font-semibold">Working principle</h2>
                  <div className="mt-3 space-y-2 text-sm leading-7 text-content-secondary">
                    {renderSchoolText(model.workingPrinciple)}
                  </div>
                </section>
              )}

              {model.howToUse && (
                <section className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
                  <h2 className="text-lg font-semibold">How to use this model</h2>
                  <div className="mt-3 space-y-2 text-sm leading-7 text-content-secondary">
                    {renderSchoolText(model.howToUse)}
                  </div>
                </section>
              )}

              {model.setupInstructions && (
                <section className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
                  <h2 className="text-lg font-semibold">Setup & demonstration notes</h2>
                  <div className="mt-3 space-y-2 text-sm leading-7 text-content-secondary">
                    {renderSchoolText(model.setupInstructions)}
                  </div>
                </section>
              )}

              {model.safetyNotes && (
                <section className="rounded-2xl border border-state-warning/30 bg-state-warning/5 p-5 sm:p-6">
                  <h2 className="text-lg font-semibold">Handling & safety notes</h2>
                  <div className="mt-3 space-y-2 text-sm leading-7 text-content-secondary">
                    {renderSchoolText(model.safetyNotes)}
                  </div>
                </section>
              )}

              {model.maintenanceNotes && (
                <section className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
                  <h2 className="text-lg font-semibold">Care & storage</h2>
                  <div className="mt-3 space-y-2 text-sm leading-7 text-content-secondary">
                    {renderSchoolText(model.maintenanceNotes)}
                  </div>
                </section>
              )}
            </div>

            <div className="min-w-0 space-y-5">
              {model.objectives.length > 0 && (
                <section className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
                  <h2 className="font-semibold">Learning objectives</h2>
                  <ul className="mt-3 space-y-2.5 text-sm leading-6 text-content-secondary">
                    {model.objectives.map((x, i) => (
                      <li key={i} className="flex gap-2.5">
                        <span className="mt-0.5 text-accent" aria-hidden="true">✓</span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {model.materials.length > 0 && (
                <section className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
                  <h2 className="font-semibold">Materials required</h2>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-content-secondary">
                    {model.materials.map((x, i) => <li key={i} className="flex gap-2"><span className="text-accent" aria-hidden="true">•</span><span>{x}</span></li>)}
                  </ul>
                </section>
              )}

              {model.features?.length > 0 && (
                <section className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
                  <h2 className="font-semibold">Key features</h2>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-content-secondary">
                    {model.features.map((x, i) => <li key={i} className="flex gap-2"><span className="text-accent" aria-hidden="true">•</span><span>{x}</span></li>)}
                  </ul>
                </section>
              )}

              {model.customizationOptions?.length > 0 && (
                <section className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
                  <h2 className="font-semibold">Customization options</h2>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-content-secondary">
                    {model.customizationOptions.map((x, i) => <li key={i} className="flex gap-2"><span className="text-accent" aria-hidden="true">•</span><span>{x}</span></li>)}
                  </ul>
                </section>
              )}

              {model.components?.some((part) => part.name.trim()) && (
                <section className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
                  <h2 className="font-semibold">Included parts</h2>
                  <div className="mt-3 space-y-2">
                    {model.components.filter((part) => part.name.trim()).map((part, index) => (
                      <div key={index} className="rounded-xl border border-line/80 p-3">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <p className="text-sm font-medium">{part.name}{part.optional && <span className="ml-2 text-xs font-normal text-content-muted">Optional</span>}</p>
                          <span className="text-xs text-content-secondary">{part.quantity}{part.category ? " · " + part.category : ""}</span>
                        </div>
                        {part.notes && <p className="mt-1.5 text-xs leading-5 text-content-secondary">{part.notes}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {model.specifications?.some((spec) => spec.label.trim()) && (
                <section className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
                  <h2 className="font-semibold">Specifications</h2>
                  <dl className="mt-3 divide-y divide-line">
                    {model.specifications.filter((spec) => spec.label.trim()).map((spec, index) => (
                      <div key={index} className="grid gap-1 py-3 text-sm sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
                        <dt className="font-medium">{spec.label}</dt>
                        <dd className="min-w-0 break-words text-content-secondary">{renderSchoolText(spec.value)}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              {model.tags?.length > 0 && (
                <section className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
                  <h2 className="font-semibold">Topics & tags</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {model.tags.map((tag, index) => <span key={index} className="rounded-full border border-line px-2.5 py-1 text-xs text-content-secondary">{tag}</span>)}
                  </div>
                </section>
              )}
            </div>
          </div>
        </Container>

        {activeGalleryIndex !== null && galleryImages[activeGalleryIndex] && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 backdrop-blur-sm sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Project image gallery"
            onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveGalleryIndex(null); }}
          >
            <div className="relative flex h-full max-h-[92vh] w-full max-w-6xl flex-col">
              <div className="flex shrink-0 items-center justify-between gap-3 pb-3 text-white">
                <p className="min-w-0 truncate text-sm font-medium">{model.title} <span className="ml-2 text-white/60">{activeGalleryIndex + 1} / {galleryImages.length}</span></p>
                <button type="button" onClick={() => setActiveGalleryIndex(null)} aria-label="Close gallery" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><X size={21} /></button>
              </div>
              <div className="relative flex min-h-0 flex-1 items-center justify-center">
                <Image
                  src={galleryImages[activeGalleryIndex]}
                  alt={model.title + " gallery image " + (activeGalleryIndex + 1)}
                  eager
                  className="max-h-full w-full rounded-xl object-contain"
                />
                {galleryImages.length > 1 && (
                  <>
                    <button type="button" onClick={() => setActiveGalleryIndex((current) => current === null ? 0 : (current - 1 + galleryImages.length) % galleryImages.length)} aria-label="Previous image" className="absolute left-2 grid h-11 w-11 place-items-center rounded-full bg-black/60 text-white ring-1 ring-white/20 transition hover:bg-black/85 sm:left-4 sm:h-12 sm:w-12"><ChevronLeft size={25} /></button>
                    <button type="button" onClick={() => setActiveGalleryIndex((current) => current === null ? 0 : (current + 1) % galleryImages.length)} aria-label="Next image" className="absolute right-2 grid h-11 w-11 place-items-center rounded-full bg-black/60 text-white ring-1 ring-white/20 transition hover:bg-black/85 sm:right-4 sm:h-12 sm:w-12"><ChevronRight size={25} /></button>
                  </>
                )}
              </div>
              <div className="flex shrink-0 justify-center gap-2 overflow-x-auto py-3">
                {galleryImages.map((url, index) => (
                  <button key={url} type="button" onClick={() => setActiveGalleryIndex(index)} aria-label={"Show image " + (index + 1)} aria-current={index === activeGalleryIndex ? "true" : undefined} className={"h-12 w-16 shrink-0 overflow-hidden rounded-md border-2 transition sm:h-14 sm:w-20 " + (index === activeGalleryIndex ? "border-accent opacity-100" : "border-white/20 opacity-60 hover:opacity-100")}>
                    <Image src={url} alt="" className="h-full w-full bg-white/5 object-contain" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  const shown = items.filter(
    (x) =>
      (!category || x.category === category) &&
      (!subcategory || x.subcategory === subcategory) &&
      (!modelType || x.modelType === modelType) &&
      (
        x.title +
        " " +
        x.category +
        " " +
        x.subject +
        " " +
        x.gradeRange +
        " " +
        x.subcategory +
        " " +
        x.modelType +
        " " +
        x.difficulty +
        " " +
        x.shortDescription +
        " " +
        (x.tags || []).join(" ") +
        " " +
        (x.materials || []).join(" ") +
        " " +
        (x.features || []).join(" ") +
        " " +
        (x.customizationOptions || []).join(" ") +
        " " +
        (x.keywords || []).join(" ")
      )
        .toLowerCase()
        .includes(search.toLowerCase().trim()),
  );

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
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_190px_190px_190px]">
          <label className="relative">
            <Search
              size={16}
              className="absolute left-3 top-4 text-content-muted"
            />
            <input
              aria-label="Search school models"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search charts, subjects or models"
              className="h-12 w-full rounded-xl border border-line bg-surface pl-9 pr-3 text-sm"
            />
          </label>

          <select
            aria-label="Filter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-12 rounded-xl border border-line bg-surface px-3 text-sm"
          >
            <option value="">All categories</option>
            {settings.categories.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>

          <select
            aria-label="Filter subcategory"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="h-12 rounded-xl border border-line bg-surface px-3 text-sm"
          >
            <option value="">All subcategories</option>
            {[
              ...new Set([
                ...settings.subcategories,
                ...items.map((x) => x.subcategory).filter(Boolean),
              ]),
            ]
              .sort()
              .map((x) => (
                <option key={x}>{x}</option>
              ))}
          </select>

          <select
            aria-label="Filter model format"
            value={modelType}
            onChange={(e) => setModelType(e.target.value)}
            className="h-12 rounded-xl border border-line bg-surface px-3 text-sm"
          >
            <option value="">All formats</option>
            {[
              ...new Set([
                ...settings.modelTypes,
                ...items.map((x) => x.modelType).filter(Boolean),
              ]),
            ]
              .sort()
              .map((x) => (
                <option key={x}>{x}</option>
              ))}
          </select>
        </div>

        {loading ? (
          <p className="py-12 text-center text-sm text-content-secondary">
            Loading catalog…
          </p>
        ) : error ? (
          <p role="alert" className="py-12 text-center text-state-danger">
            {error}
          </p>
        ) : shown.length ? (
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((x) => (
              <Link
                key={x.id}
                to={"/school-projects/" + x.slug}
                className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition duration-200 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Image
                  src={x.thumbnailUrl}
                  alt={x.title}
                  className="aspect-[16/10] w-full bg-surface-raised object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <div className="flex flex-wrap gap-2">
                    <Badge tone="accent">{x.category}</Badge>
                    {x.modelType && <Badge>{x.modelType}</Badge>}
                    {x.difficulty && <Badge>{x.difficulty}</Badge>}
                  </div>

                  <h2 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug text-content sm:text-xl">{x.title}</h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-content-secondary sm:text-base sm:leading-7">
                    {x.shortDescription}
                  </p>

                  {(x.subject || x.gradeRange || x.subcategory) && (
                    <p className="mt-3 text-xs text-content-muted sm:text-sm">
                      {[x.subject, x.gradeRange, x.subcategory]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  )}

                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-accent transition-colors group-hover:text-accent-hover">
                    View details <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-line p-10 text-center">
            <h2 className="text-lg font-semibold">No models published yet</h2>
            <p className="mt-2 text-sm text-content-secondary">
              New items will appear here once published by the admin.
            </p>
            <ButtonLink
              to="/request-school-model"
              variant="secondary"
              className="mt-5"
            >
              Request a custom school model
            </ButtonLink>
          </div>
        )}
      </Container>
    </>
  );
}

function renderSchoolText(value: string): ReactNode {
  if (!value.trim()) return null;

  const lines = value.split(/\r?\n/);

  return lines.map((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) return <div key={index} className="h-1" aria-hidden="true" />;
    if (trimmed.startsWith("## ")) {
      return (
        <h3 key={index} className="pt-1 text-base font-semibold">
          {renderSchoolInline(trimmed.slice(3))}
        </h3>
      );
    }
    if (trimmed.startsWith("- ")) {
      return (
        <div key={index} className="flex gap-2 pl-1">
          <span className="text-accent" aria-hidden="true">
            •
          </span>
          <span>{renderSchoolInline(trimmed.slice(2))}</span>
        </div>
      );
    }

    return <p key={index}>{renderSchoolInline(trimmed)}</p>;
  });
}

function renderSchoolInline(value: string): ReactNode[] {
  return value
    .split(/(\*\*.*?\*\*|\+\+.*?\+\+|\*.*?\*)/g)
    .map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**"))
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      if (part.startsWith("++") && part.endsWith("++"))
        return <u key={index}>{part.slice(2, -2)}</u>;
      if (part.startsWith("*") && part.endsWith("*"))
        return <em key={index}>{part.slice(1, -1)}</em>;
      return part;
    });
}
