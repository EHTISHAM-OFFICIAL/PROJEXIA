import { Link } from 'react-router-dom';
import { Section, SectionHeading } from '../ui/Section';
import { PROJECT_CATEGORIES } from '../../constants/categories';

export function Technologies() {
  return (
    <Section className="border-b border-line">
      <SectionHeading
        title="Areas of work"
        description="Browse the project archive by the kind of system you're interested in."
      />
      <ul className="mt-10 flex flex-wrap gap-2.5">
        {PROJECT_CATEGORIES.map((category) => (
          <li key={category}>
            <Link
              to={`/projects?category=${encodeURIComponent(category)}`}
              className="inline-flex rounded-lg border border-line bg-surface px-4 py-2.5 text-sm text-content-secondary transition-colors hover:border-accent/40 hover:bg-accent/5 hover:text-content"
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
