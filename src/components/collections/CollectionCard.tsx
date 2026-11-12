import { ArrowUpRight, Images, Sparkles } from "lucide-react";\nimport type { CSSProperties } from "react";
import { Image } from "../ui/Image";
import type { CollectionItem } from "../../types/collection";

interface CollectionCardProps {
  item: CollectionItem;
  onOpen: (item: CollectionItem) => void;
}

function getColourTokens(value: string): string[] {
  return value.split(/[,;|]/).map((part) => part.trim()).filter(Boolean).slice(0, 4);
}

function colourStyle(value: string): CSSProperties {
  const token = value.trim();
  const isHex = /^#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i.test(token);
  const isRgb = /^(?:rgb|hsl)a?\([\d\s.,%/+-]+\)$/i.test(token);
  const safeName = /^[a-zA-Z]+$/.test(token);
  return { backgroundColor: isHex || isRgb || safeName ? token : "transparent" };
}

export function CollectionCard({ item, onOpen }: CollectionCardProps) {
  const cover = item.images[0];
  const colours = getColourTokens(item.color);
  const features = (item.additionalDetails ?? [])
    .map((detail) => [detail.label.trim(), detail.value.trim()].filter(Boolean).join(": "))
    .filter(Boolean)
    .slice(0, 2);

  return (
    <article className="group h-full min-w-0">
      <button
        type="button"
        onClick={() => onOpen(item)}
        aria-label={"Explore " + item.title}
        className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-[1.35rem] border border-line/80 bg-surface text-left shadow-[0_5px_22px_-14px_rgba(15,23,42,.35)] transition duration-300 hover:-translate-y-1 hover:border-accent/45 hover:shadow-[0_22px_55px_-24px_rgba(15,23,42,.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        <div className="relative isolate aspect-[4/3] w-full overflow-hidden bg-surface-raised">
          {cover ? (
            <Image src={cover.url} alt={cover.alt || item.title} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.055]" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-content-muted">Image unavailable</div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/15" />
          <span className="absolute left-4 top-4 inline-flex max-w-[72%] items-center rounded-full border border-white/25 bg-black/35 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-white shadow-sm backdrop-blur-md">
            <span className="truncate">{item.category}</span>
          </span>
          {item.images.length > 1 && (
            <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/35 px-2.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
              <Images size={13} /> {item.images.length}
            </span>
          )}
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-white/75">PROJEXIAHUB collection</p>
              <h2 className="mt-1 line-clamp-2 text-xl font-bold leading-tight tracking-tight text-white drop-shadow-sm sm:text-2xl">{item.title}</h2>
            </div>
            <span className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition duration-300 group-hover:rotate-45 group-hover:bg-accent group-hover:text-onAccent">
              <ArrowUpRight size={19} aria-hidden="true" />
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
          {item.shortDescription && (
            <p className="line-clamp-2 text-sm leading-6 text-content-secondary">{item.shortDescription}</p>
          )}

          {(item.material || item.dimensions || colours.length > 0) && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {item.material && (
                <div className="min-w-0 rounded-xl bg-surface-raised px-3 py-2.5">
                  <p className="text-[9px] font-bold uppercase tracking-[.13em] text-content-muted">Material</p>
                  <p className="mt-1 truncate text-xs font-semibold text-content" title={item.material}>{item.material}</p>
                </div>
              )}
              {item.dimensions && (
                <div className="min-w-0 rounded-xl bg-surface-raised px-3 py-2.5">
                  <p className="text-[9px] font-bold uppercase tracking-[.13em] text-content-muted">Size</p>
                  <p className="mt-1 truncate text-xs font-semibold text-content" title={item.dimensions}>{item.dimensions}</p>
                </div>
              )}
              {colours.length > 0 && (
                <div className="col-span-2 flex min-w-0 items-center gap-2 rounded-xl bg-surface-raised px-3 py-2.5">
                  <span className="shrink-0 text-[9px] font-bold uppercase tracking-[.13em] text-content-muted">Colour</span>
                  <span className="flex min-w-0 flex-wrap items-center gap-1.5">
                    {colours.map((colour, index) => (
                      <span key={colour + index} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2 py-1 text-[10px] font-medium text-content-secondary">
                        <span className="h-3 w-3 rounded-full border border-black/15 shadow-inner" style={colourStyle(colour)} />
                        {colour}
                      </span>
                    ))}
                  </span>
                </div>
              )}
            </div>
          )}

          {features.length > 0 && (
            <div className="mt-4 space-y-2">
              {features.map((feature, index) => (
                <p key={feature + index} className="flex items-start gap-2 text-xs leading-5 text-content-secondary">
                  <Sparkles size={13} className="mt-0.5 shrink-0 text-accent" />
                  <span className="line-clamp-1">{feature}</span>
                </p>
              ))}
            </div>
          )}

          {(item.tags ?? []).length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {item.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="rounded-md border border-line/80 px-2 py-1 text-[10px] font-medium text-content-muted">{tag}</span>
              ))}
              {item.tags.length > 3 && <span className="px-1 py-1 text-[10px] text-content-muted">+{item.tags.length - 3}</span>}
            </div>
          )}

          <div className="mt-auto flex items-center justify-between border-t border-line/80 pt-3 mt-4">
            <span className="text-xs font-bold text-accent">View collection item</span>
            <span className="text-[10px] text-content-muted">{item.images.length} {item.images.length === 1 ? "photo" : "photos"}</span>
          </div>
        </div>
      </button>
    </article>
  );
}
