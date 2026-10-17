import { ProjectCard } from './ProjectCard';
import type { Project } from '../../types/project';

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid items-stretch gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
