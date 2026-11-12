import { ArrowUpRight, Images } from "lucide-react";
import { Image } from "../ui/Image";
import type { CollectionItem } from "../../types/collection";

interface CollectionCardProps {
  item: CollectionItem;
  onOpen: (item: CollectionItem) => void;
}

export function CollectionCard({ item, onOpen }: CollectionCardProps) {
  const cover = item.images[0];

  return (
    <article className="group h-full min-w-0">
      <button
        type="button"
        onClick={() => onOpen(item)}
        aria-label={"Open details for " + item.title}
        className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-[1.6rem] border border-line/80 bg-surface text-left shadow-[0_8px_30px_-20px_rgba(15,23,42,.42)] transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_26px_60px_-28px_rgba(15,23,42,.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        <div className="relative aspect-[5/4] w-full overflow-hidden bg-surface-raised">
          {cover ? (
            <Image
              src={cover.url}
              alt={cover.alt || item.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-content-muted">Image unavailable</div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
          <span className="absolute left-5 top-5 inline-flex max-w-[75%] items-center rounded-full border border-white/30 bg-black/35 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[.15em] text-white shadow-sm backdrop-blur-md">
            <span className="truncate">{item.category}</span>
          </span>
          {item.images.length > 1 && (
            <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/35 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md">
              <Images size={14} aria-hidden="true" /> {item.images.length} photos
            </span>
          )}
          <span className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-xl transition duration-300 group-hover:rotate-45 group-hover:bg-accent group-hover:text-onAccent">
            <ArrowUpRight size={21} aria-hidden="true" />
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
          <p className="text-[10px] font-bold uppercase tracking-[.18em] text-accent">PROJEXIAHUB COLLECTION</p>
          <h2 className="mt-2 line-clamp-2 text-xl font-bold leading-tight tracking-tight text-content sm:text-2xl">
            {item.title}
          </h2>
          {item.shortDescription ? (
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-content-secondary sm:text-[15px]">
              {item.shortDescription}
            </p>
          ) : (
            <p className="mt-3 text-sm leading-6 text-content-muted">Open to explore this collection item.</p>
          )}
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-line/80 pt-4">
            <span className="text-sm font-semibold text-content transition-colors group-hover:text-accent">Explore item</span>
            <span className="text-xs font-medium text-content-muted">{item.images.length} {item.images.length === 1 ? "photo" : "photos"}</span>
          </div>
        </div>
      </button>
    </article>
  );
}
