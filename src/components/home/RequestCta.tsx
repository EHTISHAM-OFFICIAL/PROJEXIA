import { ArrowRight, Mail } from 'lucide-react';
import { Container } from '../ui/Container';
import { ButtonLink } from '../ui/Button';
import { SITE } from '../../constants/site';
import { useSiteSettings } from '../../contexts/SiteSettingsContext';

/** Three traces ending in pads: the same visual language as the process route. */
function TraceArt() {
  return (
    <svg viewBox="0 0 360 220" className="h-full w-full" fill="none" aria-hidden="true">
      <g className="stroke-accent/50" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M0 44 H132 L160 72 H300" />
        <path d="M0 110 H96 L124 138 H206 L234 110 H300" />
        <path d="M0 176 H156 L178 154 H300" />
      </g>
      <g className="fill-surface stroke-accent" strokeWidth="1.5">
        <circle cx="312" cy="72" r="7" />
        <circle cx="312" cy="110" r="7" />
        <circle cx="312" cy="154" r="7" />
      </g>
      <g className="fill-accent">
        <circle cx="312" cy="72" r="2.5" />
        <circle cx="312" cy="110" r="2.5" />
        <circle cx="312" cy="154" r="2.5" />
      </g>
    </svg>
  );
}

export function RequestCta() {
  const { settings } = useSiteSettings();
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-card border border-line bg-surface px-6 py-14 sm:px-12 sm:py-20">
          <div className="absolute inset-0 grid-backdrop opacity-50" aria-hidden="true" />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-[40%] items-center [mask-image:linear-gradient(to_right,transparent,black_40%)] lg:flex"
            aria-hidden="true"
          >
            <TraceArt />
          </div>
          <div className="relative max-w-lg">
            <h2 className="text-[clamp(1.9rem,4.6vw,3rem)] font-semibold leading-[1.08] tracking-tight">
              Have a project in mind?
            </h2>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-content-secondary">
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
