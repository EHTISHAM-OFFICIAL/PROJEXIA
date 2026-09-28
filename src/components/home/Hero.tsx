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
              <span
                className="bg-gradient-to-r from-accent via-accent2 to-accent bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-pan"
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

          <div className="relative animate-fade-up" style={{ animationDelay: '120ms' }}>
            <div className="mectec-energy-field relative aspect-[5/4] overflow-hidden rounded-card border border-line bg-surface">
              <div className="mectec-energy-aura" aria-hidden="true" />
              <div className="mectec-energy-orbit mectec-energy-orbit-one" aria-hidden="true" />
              <div className="mectec-energy-orbit mectec-energy-orbit-two" aria-hidden="true" />

              <svg
                viewBox="0 0 520 420"
                className="absolute inset-0 h-full w-full"
                role="img"
                aria-label="Animated glowing electrical current flowing through a circuit"
              >
                <defs>
                  <linearGradient id="energy-line" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgb(var(--color-accent))" />
                    <stop offset="50%" stopColor="rgb(var(--color-accent2))" />
                    <stop offset="100%" stopColor="rgb(var(--color-accent))" />
                  </linearGradient>
                  <radialGradient id="core-glow">
                    <stop offset="0%" stopColor="rgb(var(--color-accent2) / 0.34)" />
                    <stop offset="55%" stopColor="rgb(var(--color-accent) / 0.12)" />
                    <stop offset="100%" stopColor="rgb(var(--color-accent) / 0)" />
                  </radialGradient>
                  <filter id="energy-blur" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="5" />
                  </filter>
                  <filter id="soft-blur" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="11" />
                  </filter>
                </defs>

                <circle cx="260" cy="210" r="145" fill="url(#core-glow)" />

                <g className="mectec-circuit-lines" fill="none" stroke="url(#energy-line)">
                  <path d="M34 86H120C142 86 146 112 169 112H205" />
                  <path d="M34 210H92C118 210 124 180 151 180H205" />
                  <path d="M34 334H112C138 334 142 306 170 306H205" />
                  <path d="M486 86H398C376 86 372 112 349 112H315" />
                  <path d="M486 210H428C402 210 396 180 369 180H315" />
                  <path d="M486 334H408C382 334 378 306 350 306H315" />
                  <path d="M205 112V82C205 62 226 50 244 50H260" />
                  <path d="M315 112V82C315 62 294 50 276 50H260" />
                  <path d="M205 306V338C205 358 226 370 244 370H260" />
                  <path d="M315 306V338C315 358 294 370 276 370H260" />
                  <path d="M151 180V144C151 124 166 112 186 112" />
                  <path d="M369 180V144C369 124 354 112 334 112" />
                  <path d="M151 240V276C151 296 166 306 186 306" />
                  <path d="M369 240V276C369 296 354 306 334 306" />
                </g>

                <g className="mectec-circuit-glow" fill="none" stroke="url(#energy-line)">
                  <path d="M34 86H120C142 86 146 112 169 112H205" />
                  <path d="M34 210H92C118 210 124 180 151 180H205" />
                  <path d="M34 334H112C138 334 142 306 170 306H205" />
                  <path d="M486 86H398C376 86 372 112 349 112H315" />
                  <path d="M486 210H428C402 210 396 180 369 180H315" />
                  <path d="M486 334H408C382 334 378 306 350 306H315" />
                  <path d="M205 112V82C205 62 226 50 244 50H260" />
                  <path d="M315 112V82C315 62 294 50 276 50H260" />
                  <path d="M205 306V338C205 358 226 370 244 370H260" />
                  <path d="M315 306V338C315 358 294 370 276 370H260" />
                </g>

                <g className="mectec-energy-pulses">
                  <circle r="4.5" fill="rgb(var(--color-accent2))" className="mectec-energy-pulse">
                    <animateMotion dur="5.6s" repeatCount="indefinite" begin="-1.8s" path="M34 86H120C142 86 146 112 169 112H205" />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.72;1" dur="5.6s" repeatCount="indefinite" begin="-1.8s" />
                  </circle>
                  <circle r="3.5" fill="rgb(var(--color-accent))" className="mectec-energy-pulse">
                    <animateMotion dur="6.8s" repeatCount="indefinite" begin="-4.2s" path="M486 334H408C382 334 378 306 350 306H315" />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.72;1" dur="6.8s" repeatCount="indefinite" begin="-4.2s" />
                  </circle>
                  <circle r="4" fill="rgb(var(--color-accent2))" className="mectec-energy-pulse">
                    <animateMotion dur="7.4s" repeatCount="indefinite" begin="-2.7s" path="M34 210H92C118 210 124 180 151 180H205" />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.68;1" dur="7.4s" repeatCount="indefinite" begin="-2.7s" />
                  </circle>
                  <circle r="3.5" fill="rgb(var(--color-accent))" className="mectec-energy-pulse">
                    <animateMotion dur="6.3s" repeatCount="indefinite" begin="-3.4s" path="M486 210H428C402 210 396 180 369 180H315" />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.7;1" dur="6.3s" repeatCount="indefinite" begin="-3.4s" />
                  </circle>
                </g>

                <g className="mectec-energy-nodes" fill="rgb(var(--color-surface))" stroke="rgb(var(--color-accent))">
                  <circle cx="34" cy="86" r="5" />
                  <circle cx="34" cy="210" r="5" />
                  <circle cx="34" cy="334" r="5" />
                  <circle cx="486" cy="86" r="5" />
                  <circle cx="486" cy="210" r="5" />
                  <circle cx="486" cy="334" r="5" />
                  <circle cx="151" cy="180" r="5" />
                  <circle cx="369" cy="180" r="5" />
                  <circle cx="151" cy="240" r="5" />
                  <circle cx="369" cy="240" r="5" />
                </g>

                <g className="mectec-energy-core">
                  <rect x="205" y="112" width="110" height="196" rx="24" fill="rgb(var(--color-surface-raised) / 0.82)" stroke="rgb(var(--color-line-strong))" strokeWidth="1.5" />
                  <rect x="218" y="126" width="84" height="168" rx="17" fill="none" stroke="rgb(var(--color-accent) / 0.24)" />
                  <path d="M235 153H285M235 180H285M235 207H285M235 234H285M235 261H285" stroke="rgb(var(--color-accent) / 0.3)" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="260" cy="207" r="30" fill="url(#core-glow)" filter="url(#soft-blur)" />
                  <circle cx="260" cy="207" r="20" fill="rgb(var(--color-accent) / 0.08)" stroke="rgb(var(--color-accent))" strokeWidth="1.5" />
                  <circle cx="260" cy="207" r="7" fill="rgb(var(--color-accent2))" className="mectec-core-beacon" />
                </g>

                <g className="mectec-component-shapes" fill="none" stroke="rgb(var(--color-accent2))" strokeWidth="2">
                  <path d="M105 86h16l6-10 8 20 8-20 8 20 6-10h16" />
                  <path d="M382 334h16l6-10 8 20 8-20 8 20 6-10h16" />
                  <path d="M105 334h18M124 324v20M137 324v20M143 334h18" />
                  <path d="M359 86h18M378 76v20M391 76v20M397 86h18" />
                </g>
              </svg>

              <div className="mectec-energy-specks" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
