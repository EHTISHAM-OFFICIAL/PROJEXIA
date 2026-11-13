import { useEffect, useState, type CSSProperties } from "react";
import { Check, ChevronLeft, ChevronRight, Layers, MessageCircle, Palette, Ruler, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Image } from "../ui/Image";
import { whatsappLink } from "../../constants/site";
import { useSiteSettings } from "../../contexts/SiteSettingsContext";
import type { CollectionItem } from "../../types/collection";
import { Prose } from "../projects/CaseStudySection";

function getColourTokens(value: string): string[] {
  return value.split(/[,;|]/).flatMap((part) => part.split("/")).map((part) => part.trim()).filter(Boolean).slice(0, 8);
}

function colourStyle(value: string): CSSProperties {
  const token = value.trim().toLowerCase();
  const named: Record<string, string> = {
    "rose gold": "linear-gradient(135deg, #b76e79, #f3c6bd)",
    gold: "#d4af37",
    silver: "#c0c0c0",
    bronze: "#cd7f32",
    copper: "#b87333",
    wood: "linear-gradient(135deg, #8b5a2b, #d2a679)",
    "natural wood": "linear-gradient(135deg, #8b5a2b, #d2a679)",
    clear: "linear-gradient(135deg, #ffffff, #dbeafe)",
    transparent: "linear-gradient(135deg, #ffffff, #dbeafe)",
    translucent: "linear-gradient(135deg, #ffffff, #dbeafe)",
    multicolour: "linear-gradient(135deg, #ef4444, #facc15, #22c55e, #3b82f6, #a855f7)",
    "multi color": "linear-gradient(135deg, #ef4444, #facc15, #22c55e, #3b82f6, #a855f7)",
  };
  if (named[token]) return { background: named[token] };
  const valid = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(value.trim())
    || /^(?:rgb|hsl)a?\([\d\s.,%/+-]+\)$/i.test(value.trim())
    || /^[a-zA-Z]+$/.test(value.trim());
  return { backgroundColor: valid ? value.trim() : "#a1a1aa" };
}

interface CollectionQuickViewProps {
  item: CollectionItem | null;
  onClose: () => void;
}

export function CollectionQuickView({ item, onClose }: CollectionQuickViewProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const { settings } = useSiteSettings();

  useEffect(() => {
    setImageIndex(0);
  }, [item?.id]);

  useEffect(() => {
    if (!item) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight" && item.images.length > 1) {
        setImageIndex((current) => (current + 1) % item.images.length);
      }
      if (event.key === "ArrowLeft" && item.images.length > 1) {
        setImageIndex((current) => (current - 1 + item.images.length) % item.images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const activeImage = item.images[imageIndex];
  const colourOptions = getColourTokens(item.color);
  const featureItems = (item.additionalDetails ?? [])
    .map((detail) => [detail.label.trim(), detail.value.trim()].filter(Boolean).join(": "))
    .filter(Boolean);
  const message = "Hello PROJEXIAHUB, I would like to enquire about: " + item.title;
  const enquiryUrl = settings.showWhatsapp ? whatsappLink(message, settings.whatsapp) : null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="collection-quick-view-title"
        className="relative flex max-h-[94dvh] w-full max-w-5xl flex-col overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch] rounded-t-2xl border border-line bg-surface shadow-2xl sm:rounded-2xl sm:max-h-[88dvh] lg:grid lg:h-[min(88dvh,850px)] lg:max-h-[88dvh] lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:overflow-hidden"
      >
        <button
          type="button"
          onClick={onClose}
          autoFocus
          aria-label="Close item details"
          className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg/90 text-content shadow-md backdrop-blur transition-colors hover:border-accent hover:text-accent"
        >
          <X size={19} aria-hidden="true" />
        </button>

        <div className="flex shrink-0 flex-col bg-surface-raised p-3 sm:p-5 lg:min-h-0 lg:shrink lg:overflow-hidden">
          <div className="relative flex h-[30dvh] min-h-[210px] max-h-[340px] w-full flex-none items-center justify-center overflow-hidden rounded-xl bg-bg/40 lg:h-auto lg:max-h-none lg:min-h-0 lg:flex-1">
            {activeImage ? (
              <Image
                src={activeImage.url}
                alt={activeImage.alt || item.title}
                eager
                className="max-h-full w-full object-contain lg:max-h-[64vh]"
              />
            ) : (
              <div className="flex aspect-[4/3] w-full items-center justify-center text-content-muted">Image unavailable</div>
            )}
            {item.images.length > 1 && (
              <>
                <button type="button" onClick={() => setImageIndex((current) => (current - 1 + item.images.length) % item.images.length)} aria-label="Previous image" className="absolute left-2 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-bg/90 text-content shadow-md hover:text-accent">
                  <ChevronLeft size={20} />
                </button>
                <button type="button" onClick={() => setImageIndex((current) => (current + 1) % item.images.length)} aria-label="Next image" className="absolute right-2 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-bg/90 text-content shadow-md hover:text-accent">
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
          {item.images.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Item images">
              {item.images.map((image, index) => (
                <button
                  key={image.url}
                  type="button"
                  onClick={() => setImageIndex(index)}
                  aria-label={"Show image " + (index + 1)}
                  aria-pressed={imageIndex === index}
                  className={"h-14 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-bg transition-colors " + (imageIndex === index ? "border-accent" : "border-line opacity-70 hover:opacity-100")}
                >
                  <Image src={image.url} alt={image.alt || item.title} className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="min-w-0 shrink-0 overflow-visible p-5 sm:p-7 lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain lg:p-8 lg:[-webkit-overflow-scrolling:touch]">
          <p className="pr-12 text-xs font-semibold uppercase tracking-[0.15em] text-accent">{item.category}</p>
          <h2 id="collection-quick-view-title" className="mt-2 text-2xl font-semibold leading-tight text-content sm:text-3xl">{item.title}</h2>
          {item.shortDescription && <p className="mt-3 text-base leading-relaxed text-content-secondary">{item.shortDescription}</p>}
          {item.description && <div className="mt-5"><Prose text={item.description}/></div>}
          {(item.tags ?? []).length > 0 && <div className="mt-5 flex flex-wrap gap-2" aria-label="Item tags">{item.tags.map((tag) => <span key={tag} className="rounded-full border border-line bg-surface-raised px-3 py-1.5 text-xs font-medium text-content-secondary">{tag}</span>)}</div>}

          {(item.material || item.dimensions || colourOptions.length > 0) && (
            <section className="mt-7 border-y border-line py-5" aria-label="Item specifications">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent">Details</p>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight text-content">Specifications</h3>
                </div>
                <span className="text-xs text-content-muted">Item overview</span>
              </div>

              {(item.material || item.dimensions) && (
                <dl className="grid gap-x-6 sm:grid-cols-2">
                  {item.material && (
                    <div className="flex min-w-0 items-start gap-3 border-b border-line/70 py-3 sm:border-b-0">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <Layers size={18} aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <dt className="text-xs font-medium text-content-muted">Material</dt>
                        <dd className="mt-1 break-words text-sm font-semibold leading-relaxed text-content">{item.material}</dd>
                      </div>
                    </div>
                  )}
                  {item.dimensions && (
                    <div className="flex min-w-0 items-start gap-3 py-3">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <Ruler size={18} aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <dt className="text-xs font-medium text-content-muted">Dimensions</dt>
                        <dd className="mt-1 break-words text-sm font-semibold leading-relaxed text-content">{item.dimensions}</dd>
                      </div>
                    </div>
                  )}
                </dl>
              )}

              {colourOptions.length > 0 && (
                <div className={(item.material || item.dimensions) ? "mt-4 border-t border-line/70 pt-4" : ""}>
                  <div className="mb-3 flex items-center gap-2">
                    <Palette size={16} className="text-accent" aria-hidden="true" />
                    <h4 className="text-xs font-semibold text-content">Available colours & finishes</h4>
                  </div>
                  <ul className="flex flex-wrap gap-2.5">
                    {colourOptions.map((colour, index) => (
                      <li key={colour + index} className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-line bg-surface px-3 py-2 shadow-sm">
                        <span
                          className="h-6 w-6 shrink-0 rounded-full border border-black/10 shadow-inner"
                          style={colourStyle(colour)}
                          aria-hidden="true"
                        />
                        <span className="break-words text-sm font-medium text-content">{colour}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {featureItems.length > 0 && (
            <div className="mt-7">
              <h3 className="text-sm font-bold text-content">Features</h3>
              <ul className="mt-3 space-y-2.5">
                {featureItems.map((feature, index) => (
                  <li key={feature + index} className="flex items-start gap-3 rounded-xl bg-surface-raised/65 px-3.5 py-3 text-sm leading-relaxed text-content-secondary">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent"><Check size={12}/></span>
                    <span className="break-words">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-7 border-t border-line pt-5">
            {item.enquiryEnabled && (
              enquiryUrl ? (
                <a href={enquiryUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-onAccent transition-colors hover:bg-accent-hover">
                  <MessageCircle size={17} /> Enquire about this item
                </a>
              ) : (
                <Link to="/contact" onClick={onClose} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-onAccent hover:bg-accent-hover">
                  <MessageCircle size={17} /> Contact us about this item
                </Link>
              )
            )}
            <p className="mt-3 text-center text-xs leading-relaxed text-content-muted">
              {item.enquiryEnabled ? "Send us an enquiry to discuss this item and its requirements." : "This item is shown as part of our collection gallery."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}