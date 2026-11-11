import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Layers, MessageCircle, Palette, Ruler, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Image } from "../ui/Image";
import { SITE, whatsappLink } from "../../constants/site";
import type { CollectionItem } from "../../types/collection";

interface CollectionQuickViewProps {
  item: CollectionItem | null;
  onClose: () => void;
}

export function CollectionQuickView({ item, onClose }: CollectionQuickViewProps) {
  const [imageIndex, setImageIndex] = useState(0);

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
  const message = "Hello PROJEXIAHUB, I would like to enquire about: " + item.title;
  const enquiryUrl = whatsappLink(message);

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
        className="relative flex max-h-[94dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl border border-line bg-surface shadow-2xl sm:max-h-[88vh] sm:rounded-2xl lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]"
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

        <div className="flex min-h-0 flex-col bg-surface-raised p-3 sm:p-5 lg:min-h-[520px]">
          <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-xl bg-bg/40">
            {activeImage ? (
              <Image
                src={activeImage.url}
                alt={activeImage.alt || item.title}
                eager
                className="max-h-[42vh] w-full object-contain sm:max-h-[52vh] lg:max-h-[64vh]"
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

        <div className="min-h-0 overflow-y-auto p-5 sm:p-7 lg:p-8">
          <p className="pr-12 text-xs font-semibold uppercase tracking-[0.15em] text-accent">{item.category}</p>
          <h2 id="collection-quick-view-title" className="mt-2 text-2xl font-semibold leading-tight text-content sm:text-3xl">{item.title}</h2>
          {item.shortDescription && <p className="mt-3 text-base leading-relaxed text-content-secondary">{item.shortDescription}</p>}
          {item.description && <p className="mt-5 whitespace-pre-line text-sm leading-7 text-content-secondary">{item.description}</p>}

          {(item.material || item.dimensions || item.color) && (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {item.material && <div className="flex gap-2.5 rounded-xl border border-line bg-surface-raised/60 p-3"><Layers size={17} className="mt-0.5 shrink-0 text-accent"/><div><p className="text-[11px] font-semibold uppercase tracking-wide text-content-muted">Material</p><p className="mt-0.5 text-sm text-content">{item.material}</p></div></div>}
              {item.dimensions && <div className="flex gap-2.5 rounded-xl border border-line bg-surface-raised/60 p-3"><Ruler size={17} className="mt-0.5 shrink-0 text-accent"/><div><p className="text-[11px] font-semibold uppercase tracking-wide text-content-muted">Dimensions</p><p className="mt-0.5 text-sm text-content">{item.dimensions}</p></div></div>}
              {item.color && <div className="flex gap-2.5 rounded-xl border border-line bg-surface-raised/60 p-3"><Palette size={17} className="mt-0.5 shrink-0 text-accent"/><div><p className="text-[11px] font-semibold uppercase tracking-wide text-content-muted">Colour / finish</p><p className="mt-0.5 text-sm text-content">{item.color}</p></div></div>}
            </div>
          )}

          {item.additionalDetails.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-content">Additional details</h3>
              <dl className="mt-2 divide-y divide-line rounded-xl border border-line px-3">
                {item.additionalDetails.map((detail, index) => (
                  <div key={detail.label + index} className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-3 py-2.5 text-sm">
                    <dt className="text-content-muted">{detail.label}</dt>
                    <dd className="break-words text-right text-content">{detail.value}</dd>
                  </div>
                ))}
              </dl>
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