import { ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { ButtonLink } from '../ui/Button';

const INDICATORS = [
  { label: 'PWR', tone: 'bg-state-success' },
  { label: 'SIG', tone: 'bg-accent' },
  { label: 'OUT', tone: 'bg-state-info' },
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="absolute inset-0 grid-backdrop" aria-hidden="true" />

      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
          <div className="max-w-2xl animate-fade-up">
            <h1 className="text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Turning ideas into{' '}
              <span
                className="bg-gradient-to-r from-accent via-accent-hover to-accent bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-pan"
              >
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

          {/* The one deliberate flourish on the page: an oscilloscope-style
              signal trace, grounded in what an electronics bench actually
              looks like, rather than generic decoration. */}
          <div className="relative animate-fade-up" style={{ animationDelay: '120ms' }}>
            <div className="overflow-hidden rounded-card border border-line bg-surface">
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <span className="font-mono text-xs tracking-wide text-content-muted">
                  BENCH.TRACE — CH1
                </span>
                <div className="flex items-center gap-3">
                  {INDICATORS.map((indicator, index) => (
                    <span key={indicator.label} className="flex items-center gap-1.5">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${indicator.tone} animate-pulse`}
                        style={{ animationDelay: `${index * 200}ms` }}
                        aria-hidden="true"
                      />
                      <span className="font-mono text-[10px] text-content-muted">
                        {indicator.label}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              <svg
                viewBox="0 0 400 220"
                className="h-56 w-full sm:h-64"
                role="img"
                aria-label="Decorative oscilloscope trace"
              >
                <defs>
                  <pattern id="scope-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path
                      d="M 20 0 L 0 0 0 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-content-muted/10"
                    />
                  </pattern>
                </defs>
                <rect width="400" height="220" fill="url(#scope-grid)" />
                <path
                  d="M0,110 L40,110 L55,60 L70,160 L85,40 L100,180 L115,110 L160,110
                     L175,70 L190,150 L205,50 L220,170 L235,110 L280,110
                     L295,65 L310,155 L325,45 L340,175 L355,110 L400,110"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray={1}
                  className="text-accent animate-trace-draw"
                />
              </svg>

              <div className="flex items-center justify-between border-t border-line px-4 py-3">
                <span className="font-mono text-xs text-content-muted">
                  REQUEST → BUILD → TEST → DELIVER
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
