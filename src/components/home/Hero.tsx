import { ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { ButtonLink } from '../ui/Button';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="absolute inset-0 grid-backdrop" aria-hidden="true" />

      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
          <div className="max-w-2xl animate-fade-up">
            <h1 className="text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Turning ideas into{' '}
              <span className="bg-gradient-to-r from-accent via-accent2 to-accent bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-pan">
                working electronic systems
              </span>
              <span
                className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-0.5 bg-accent align-middle animate-blink"
                aria-hidden="true"
              />
            </h1>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-content-secondary">
              MECTEC designs and builds custom electronics — embedded systems, IoT devices,
              automation and robotics. From a rough idea to a tested prototype you can hold in
              your hand.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/projects" size="lg">
                Explore projects
                <ArrowRight size={17} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink to="/request-project" size="lg" variant="secondary">
                Request a project
              </ButtonLink>
            </div>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: '120ms' }}>
            <div className="relative aspect-[5/4] overflow-hidden rounded-card border border-line bg-surface">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto h-16 w-16 rounded-2xl border border-line-strong bg-surface-elevated" />
                  <p className="mt-4 text-sm text-content-secondary">MECTEC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
