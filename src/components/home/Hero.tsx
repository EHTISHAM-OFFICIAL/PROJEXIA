import { ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { ButtonLink } from '../ui/Button';

const traces = [
  'M90 112 H170 C194 112 194 92 220 92 H286',
  'M90 196 H142 C166 196 166 222 194 222 H258 C280 222 282 202 306 202 H360',
  'M112 292 H184 C208 292 208 270 232 270 H300 C326 270 330 292 356 292 H430',
  'M354 92 H390 C414 92 416 112 440 112 H510',
  'M384 202 H426 C448 202 452 180 476 180 H542',
  'M414 292 H460 C482 292 486 270 510 270 H566',
  'M286 92 V146 C286 166 304 170 304 194 V240',
];

const nodes = [[90,112],[90,196],[112,292],[510,112],[542,180],[566,270],[286,92],[304,240]];

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
            </h1>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-content-secondary">
              MECTEC designs and builds custom electronics — embedded systems, IoT devices,
              automation and robotics. From a rough idea to a tested prototype you can hold in
              your hand.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/projects" size="lg">Explore projects<ArrowRight size={17} aria-hidden="true" /></ButtonLink>
              <ButtonLink to="/request-project" size="lg" variant="secondary">Request a project</ButtonLink>
            </div>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: '120ms' }}>
            <div className="mectec-energy-hero relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-line bg-surface">
              <div className="mectec-energy-aura" aria-hidden="true" />
              <div className="mectec-energy-orbit mectec-energy-orbit-a" aria-hidden="true" />
              <div className="mectec-energy-orbit mectec-energy-orbit-b" aria-hidden="true" />
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 640 400" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="energyTrace" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="rgb(var(--color-accent))" stopOpacity=".18" />
                    <stop offset=".5" stopColor="rgb(var(--color-accent2))" stopOpacity=".9" />
                    <stop offset="1" stopColor="rgb(var(--color-accent))" stopOpacity=".18" />
                  </linearGradient>
                </defs>
                <g className="mectec-trace-layer">
                  {traces.map((d) => <path key={d} className="mectec-energy-trace" d={d} stroke="url(#energyTrace)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="8 22" />)}
                </g>
                {traces.map((d) => <path key={'base-'+d} d={d} stroke="rgb(var(--color-content) / .09)" strokeWidth="1.5" strokeLinecap="round" />)}
                {nodes.map(([cx,cy],i) => <circle key={String(cx)+String(cy)} className="mectec-energy-node" cx={cx} cy={cy} r={i % 3 === 0 ? 4 : 3} fill="rgb(var(--color-accent))" />)}
                <g className="mectec-energy-core" transform="translate(320 200)">
                  <circle className="mectec-core-halo" r="72" fill="rgb(var(--color-accent) / .08)" />
                  <circle className="mectec-core-ring" r="54" stroke="rgb(var(--color-accent2) / .65)" strokeWidth="1.5" strokeDasharray="3 11" />
                  <circle r="42" fill="rgb(var(--color-surface) / .94)" stroke="rgb(var(--color-line-strong) / .8)" />
                  <circle className="mectec-core-pulse" r="29" fill="rgb(var(--color-accent) / .12)" />
                  <path d="M-12-8H12M-12 8H6M-5-16V16M8-16V16" stroke="rgb(var(--color-accent2))" strokeWidth="2.5" strokeLinecap="round" />
                </g>
                <g className="mectec-energy-particles">
                  <circle className="mectec-particle p1" r="4" fill="rgb(var(--color-accent2))" />
                  <circle className="mectec-particle p2" r="3" fill="rgb(var(--color-accent2))" />
                  <circle className="mectec-particle p3" r="3" fill="rgb(var(--color-accent2))" />
                  <circle className="mectec-particle p4" r="4" fill="rgb(var(--color-accent2))" />
                </g>
              </svg>
              <div className="mectec-energy-bloom" aria-hidden="true" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
