import { ArrowUpRight, Images } from "lucide-react";
import { Image } from "../ui/Image";
import type { CollectionItem } from "../../types/collection";

interface CollectionCardProps {
  item: CollectionItem;
  onOpen: (item: CollectionItem) => void;
}

export function CollectionCard({ item, onOpen }: CollectionCardProps) {
  const cover = item.images[0];
  const visibleTags = (item.tags ?? []).slice(0, 3);

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      aria-label={"View " + item.title}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-surface text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/45 hover:shadow-[0_18px_48px_-24px_rgba(0,0,0,.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[5/4] w-full overflow-hidden bg-surface-raised">
        {cover ? (
          <Image
            src={cover.url}
            alt={cover.alt || item.title}
            className="h-full w-full object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-[1.045] sm:p-4"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-content-muted">Image unavailable</div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60"/>
        <span className="absolute left-3 top-3 max-w-[75%] truncate rounded-full border border-white/30 bg-bg/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-content shadow-sm backdrop-blur-md">
          {item.category}
        </span>
        {item.images.length > 1 && (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/65 px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-sm backdrop-blur-md">
            <Images size={12}/>{item.images.length} photos
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="min-w-0 text-base font-semibold leading-snug tracking-tight text-content sm:text-lg">{item.title}</h2>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-surface-raised text-content-muted transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-onAccent">
            <ArrowUpRight size={16} aria-hidden="true"/>
          </span>
        </div>
        {item.shortDescription && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-content-secondary">{item.shortDescription}</p>
        )}
        {visibleTags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {visibleTags.map((tag) => <span key={tag} className="rounded-md bg-surface-raised px-2 py-1 text-[10px] font-medium text-content-secondary">{tag}</span>)}
            {(item.tags?.length ?? 0) > visibleTags.length && <span className="px-1 py-1 text-[10px] text-content-muted">+{item.tags.length - visibleTags.length}</span>}
          </div>
        )}
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-line/80 pt-3 mt-4">
          <span className="text-xs font-semibold text-content-secondary transition-colors group-hover:text-accent">Explore item</span>
          <span className="text-[10px] text-content-muted">{item.images.length || 0} {item.images.length === 1 ? "image" : "images"}</span>
        </div>
      </div>
    </button>
  );
}