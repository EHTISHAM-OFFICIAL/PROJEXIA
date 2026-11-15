import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Image } from '../ui/Image';
import { Badge } from '../ui/Badge';
import type { SchoolModel } from '../../services/schoolModelService';

/** Catalogue card. Used in the school model list and as a related model. */
export function SchoolModelCard({ model }: { model: SchoolModel }) {
  const meta = [model.subject, model.gradeRange, model.subcategory].filter(Boolean).join(' · ');

  return (
    <Link
      to={'/school-projects/' + model.slug}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition duration-200 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <Image
        src={model.thumbnailUrl}
        alt={model.title}
        className="aspect-[16/10] w-full bg-surface-raised object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex flex-wrap gap-2">
          <Badge tone="accent">{model.category}</Badge>
          {model.modelType && <Badge>{model.modelType}</Badge>}
          {model.difficulty && <Badge>{model.difficulty}</Badge>}
        </div>

        <h2 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug text-content sm:text-xl">{model.title}</h2>
        <p className="mt-2 line-clamp-3 text-base leading-[1.65] text-content-secondary">{model.shortDescription}</p>

        {meta && <p className="mt-3 text-sm text-content-muted">{meta}</p>}

        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-base font-semibold text-accent transition-colors group-hover:text-accent-hover">
          View details <ArrowRight size={16} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
