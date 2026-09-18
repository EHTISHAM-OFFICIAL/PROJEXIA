import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Image } from '../ui/Image';
import { DIFFICULTY_LABEL, STATUS_LABEL, STATUS_TONE } from '../../constants/projectOptions';
import { formatShortDate, truncate } from '../../utils/formatting';
import type { Project } from '../../types/project';

export function ProjectCard({ project }: { project: Project }) {
  const visibleTech = project.technologies.slice(0, 3);
  const hiddenTechCount = project.technologies.length - visibleTech.length;

  return (
    <article className="group card relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_20px_45px_-20px_rgba(0,0,0,0.6)]">
      <span
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
        aria-hidden="true"
      />
      <Link to={`/projects/${project.slug}`} className="block focus-visible:ring-offset-0">
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-raised">
          <Image
            src={project.media.thumbnailUrl}
            alt={`${project.title} project thumbnail`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute left-3 top-3">
            <Badge tone={STATUS_TONE[project.status]}>{STATUS_LABEL[project.status]}</Badge>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-content-muted">
            <span>{project.category}</span>
            <span aria-hidden="true">/</span>
            <span>{DIFFICULTY_LABEL[project.difficulty]}</span>
          </div>

          <h3 className="mt-2.5 text-lg font-semibold leading-snug tracking-tight text-content">
            {project.title}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-content-secondary">
            {truncate(project.shortDescription, 120)}
          </p>

          {visibleTech.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {visibleTech.map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
              {hiddenTechCount > 0 && (
                <li>
                  <Badge>+{hiddenTechCount}</Badge>
                </li>
              )}
            </ul>
          )}

          <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
            <span className="font-mono text-xs text-content-muted">
              {formatShortDate(project.completedAt ?? project.createdAt)}
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
              View project
              <ArrowUpRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
