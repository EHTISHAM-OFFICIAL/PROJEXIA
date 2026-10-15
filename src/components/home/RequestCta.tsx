import { ArrowRight, Mail } from 'lucide-react';
import { Container } from '../ui/Container';
import { ButtonLink } from '../ui/Button';
import { SITE } from '../../constants/site';
import { useSiteSettings } from '../../contexts/SiteSettingsContext';

export function RequestCta() {
  const { settings } = useSiteSettings();
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-card border border-line bg-surface px-6 py-14 sm:px-12 sm:py-16">
          <div className="absolute inset-0 grid-backdrop opacity-60" aria-hidden="true" />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Have a project in mind?
            </h2>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-content-secondary">
              Tell {settings.name} what you want to build. The request form takes a few minutes and covers
              the technical details up front, so the first reply is a real answer rather than a
              round of questions. Expect a response {SITE.responseTime}.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/request-project" size="lg">
                Start a project request
                <ArrowRight size={17} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink to="/contact" size="lg" variant="secondary">
                <Mail size={16} aria-hidden="true" />
                Ask a question first
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
