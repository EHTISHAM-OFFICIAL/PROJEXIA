import { ArrowUpRight } from "lucide-react";
import { Image } from "../ui/Image";
import type { CollectionItem } from "../../types/collection";

interface CollectionCardProps {
  item: CollectionItem;
  onOpen: (item: CollectionItem) => void;
}

export function CollectionCard({ item, onOpen }: CollectionCardProps) {
  const cover = item.images[0];

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      aria-label={"View " + item.title}
      className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-surface text-left shadow-resting transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-1 hover:border-accent/50 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-raised">
        {cover ? (
          <Image
            src={cover.url}
            alt={cover.alt || item.title}
            className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.035] sm:p-4"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-content-muted">Image unavailable</div>
        )}
        {item.images.length > 1 && (
          <span className="absolute bottom-3 right-3 rounded-full border border-line/70 bg-bg/85 px-2.5 py-1 text-[11px] font-medium text-content backdrop-blur">
            {item.images.length} photos
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-accent">{item.category}</p>
        <div className="mt-1.5 flex items-start justify-between gap-2">
          <h2 className="min-w-0 text-base font-semibold leading-snug text-content sm:text-lg">{item.title}</h2>
          <ArrowUpRight size={17} className="mt-0.5 shrink-0 text-content-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
        </div>
        {item.shortDescription && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-content-secondary">{item.shortDescription}</p>
        )}
        <span className="mt-4 text-xs font-semibold text-content-secondary transition-colors group-hover:text-accent">View details</span>
      </div>
    </button>
  );
}