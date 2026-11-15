import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '../ui/Button';

interface CtaPanelProps {
  title: string;
  description: string;
  primary: { to: string; label: string };
  secondary?: { to: string; label: string; icon?: ReactNode };
}

/** Closing call to action. Buttons are full width and 48px tall on phones. */
export function CtaPanel({ title, description, primary, secondary }: CtaPanelProps) {
  return (
    <section className="relative overflow-hidden rounded-card border border-accent/25 bg-accent/5 p-6 sm:p-10">
      <div className="max-w-xl">
        <h2 className="text-[1.5rem] font-semibold leading-tight tracking-tight sm:text-3xl">{title}</h2>
        <p className="mt-3 text-base leading-[1.7] text-content-secondary sm:text-[1.0625rem]">{description}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to={primary.to} size="lg" className="w-full sm:w-auto">
            {primary.label}
            <ArrowRight size={17} aria-hidden="true" />
          </ButtonLink>
          {secondary && (
            <ButtonLink to={secondary.to} size="lg" variant="secondary" className="w-full sm:w-auto">
              {secondary.icon}
              {secondary.label}
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
