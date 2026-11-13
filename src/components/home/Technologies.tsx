import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Section } from '../ui/Section';
import { HomeHeading } from './HomeHeading';
import { PROJECT_CATEGORIES } from '../../constants/categories';

export function Technologies() {
  return (
    <Section className="border-b border-line">
      <HomeHeading
        title="Areas of work"
        description="Browse the project archive by the kind of system you're interested in."
      />
      <ul className="mt-10 flex flex-wrap gap-2.5">
        {PROJECT_CATEGORIES.map((category) => (
          <li key={category}>
            <Link
              to={`/projects?category=${encodeURIComponent(category)}`}
              className="group inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-4 py-3 text-sm text-content-secondary transition-colors hover:border-accent/50 hover:bg-accent/5 hover:text-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {category}
              <ArrowUpRight
                size={14}
                className="-ml-0.5 w-0 text-accent opacity-0 transition-all group-hover:ml-0 group-hover:w-3.5 group-hover:opacity-100"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
