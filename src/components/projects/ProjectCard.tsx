import { Link } from 'react-router-dom';
import { ArrowUpRight, Eye } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { InlineText } from './CaseStudySection';
import { Image } from '../ui/Image';
import { DIFFICULTY_LABEL, STATUS_LABEL, STATUS_TONE } from '../../constants/projectOptions';
import { formatCompactNumber, formatShortDate, truncate } from '../../utils/formatting';
import type { Project } from '../../types/project';

export function ProjectCard({ project }: { project: Project }) {
  const visibleTech = project.technologies.slice(0, 3);
  const hiddenTechCount = project.technologies.length - visibleTech.length;

  return (
    <article className="card group relative flex h-full min-w-0 flex-col overflow-hidden transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow-elevated)] motion-reduce:transform-none motion-reduce:transition-none">
      <span
        className="absolute inset-x-0 top-0 z-10 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-200 group-hover:scale-x-100 motion-reduce:transition-none"
        aria-hidden="true"
      />
      <Link
        to={`/projects/${project.slug}`}
        className="flex h-full min-w-0 flex-col rounded-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
      >
        <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-surface-raised">
          <Image
            src={project.media.thumbnailUrl}
            alt={`${project.title} project thumbnail`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.025] motion-reduce:transition-none"
          />
          <div className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)]">
            <Badge tone={STATUS_TONE[project.status] ?? 'neutral'}>
              {STATUS_LABEL[project.status] ?? project.status}
            </Badge>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-content-muted">
            <span>{project.category}</span>
            <span aria-hidden="true" className="text-content-muted/70">/</span>
            <span>{DIFFICULTY_LABEL[project.difficulty] ?? project.difficulty}</span>
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
                  <Badge><InlineText text={tech} allowLinks={false} /></Badge>
                </li>
              ))}
              {hiddenTechCount > 0 && (
                <li>
                  <Badge>+{hiddenTechCount}</Badge>
                </li>
              )}
            </ul>
          )}

          <div className="mt-auto flex min-w-0 items-center justify-between gap-3 border-t border-line pt-4">
            <span className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-content-muted">
              <span>{formatShortDate(project.completedAt ?? project.createdAt)}</span>
              {project.viewCount > 0 && (
                <span className="inline-flex items-center gap-1">
                  <Eye size={12} aria-hidden="true" />
                  {formatCompactNumber(project.viewCount)}
                </span>
              )}
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-accent">
              View project
              <ArrowUpRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
