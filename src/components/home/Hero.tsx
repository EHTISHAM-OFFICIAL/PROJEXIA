import { useEffect, useRef } from 'react';
import { ArrowRight, Cpu, Radio, Zap } from 'lucide-react';
import { Container } from '../ui/Container';
import { ButtonLink } from '../ui/Button';

const INDICATORS = [
  { label: 'PWR', tone: 'bg-state-success' },
  { label: 'SIG', tone: 'bg-accent' },
  { label: 'OUT', tone: 'bg-state-info' },
] as const;

const CIRCUIT_PATHS = [
  'M24 126H82V92H126',
  'M24 126H82V160H126',
  'M274 92H318V58H374',
  'M274 126H344V126H390',
  'M274 160H318V194H374',
  'M126 92H108V58H74',
  'M126 160H108V194H74',
] as const;

const NODE_POINTS = [
  [24, 126], [74, 58], [74, 194], [126, 92], [126, 160],
  [274, 92], [274, 126], [274, 160], [374, 58], [390, 126], [374, 194],
] as const;

export function Hero() {
  const circuitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = circuitRef.current;
    if (!element) return;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      element.style.setProperty('--pointer-x', ((event.clientX - rect.left) / rect.width) * 100 + '%');
      element.style.setProperty('--pointer-y', ((event.clientY - rect.top) / rect.height) * 100 + '%');
    };

    const handlePointerLeave = () => {
      element.style.setProperty('--pointer-x', '50%');
      element.style.setProperty('--pointer-y', '50%');
    };

    element.addEventListener('pointermove', handlePointerMove, { passive: true });
    element.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      element.removeEventListener('pointermove', handlePointerMove);
      element.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="absolute inset-0 grid-backdrop" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,rgba(var(--color-accent),0.10),transparent_68%)]"
        aria-hidden="true"
      />

      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-12">
          <div className="max-w-2xl animate-fade-up">
            <div className="mb-5 inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-content-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-state-success animate-pulse" aria-hidden="true" />
              MECTEC / ELECTRONICS ENGINEERING
            </div>

            <h1 className="text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.65rem]">
              Custom electronics{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-accent via-accent2 to-accent bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-pan">
                  design &amp; development
                </span>
                <span className="mectec-hero-underline" aria-hidden="true" />
              </span>
            </h1>

            <p className="mt-6 max-w-prose text-lg leading-relaxed text-content-secondary">
              MECTEC designs and builds custom electronics — embedded systems, IoT devices,
              automation and robotics. From a rough idea to a tested prototype you can hold in
              your hand.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/request-project" size="lg">
                Start a project
                <ArrowRight size={17} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink to="/projects" size="lg" variant="secondary">
                Explore projects
              </ButtonLink>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em] text-content-muted">
              <span>Embedded systems</span>
              <span>IoT</span>
              <span>Automation</span>
              <span>Prototyping</span>
            </div>
          </div>

          <div
            ref={circuitRef}
            className="relative animate-fade-up"
            style={{ animationDelay: '120ms' }}
          >
            <div className="mectec-circuit-shell">
              <div className="mectec-circuit-glow" aria-hidden="true" />

              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <span className="font-mono text-xs tracking-wide text-content-muted">
                  MECTEC.NODE — SYSTEM ONLINE
                </span>
                <div className="flex items-center gap-3">
                  {INDICATORS.map((indicator, index) => (
                    <span key={indicator.label} className="flex items-center gap-1.5">
                      <span
                        className={'h-1.5 w-1.5 rounded-full ' + indicator.tone + ' animate-pulse'}
                        style={{ animationDelay: index * 200 + 'ms' }}
                        aria-hidden="true"
                      />
                      <span className="font-mono text-[10px] text-content-muted">
                        {indicator.label}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="mectec-circuit-stage" aria-hidden="true">
                <svg viewBox="0 0 414 252" className="h-auto w-full" focusable="false">
                  <defs>
                    <pattern id="mectec-circuit-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                      <path d="M24 0H0V24" fill="none" stroke="currentColor" strokeWidth="1" className="text-content-muted/10" />
                    </pattern>
                    <filter id="mectec-circuit-soft-glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <linearGradient id="mectec-trace-gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" style={{ stopColor: 'rgb(var(--color-accent))' }} />
                      <stop offset="100%" style={{ stopColor: 'rgb(var(--color-accent2))' }} />
                    </linearGradient>
                  </defs>

                  <rect width="414" height="252" fill="url(#mectec-circuit-grid)" />

                  <g className="mectec-circuit-traces">
                    {CIRCUIT_PATHS.map((path) => (
                      <path key={path} d={path} pathLength={1} />
                    ))}
                  </g>

                  <g className="mectec-circuit-traces mectec-circuit-traces-active" filter="url(#mectec-circuit-soft-glow)">
                    {CIRCUIT_PATHS.map((path) => (
                      <path key={'active-' + path} d={path} pathLength={1} />
                    ))}
                  </g>

                  <g className="mectec-circuit-nodes">
                    {NODE_POINTS.map(([cx, cy]) => (
                      <circle key={cx + '-' + cy} cx={cx} cy={cy} r="3.2" />
                    ))}
                  </g>

                  <g className="mectec-circuit-chip">
                    <rect x="126" y="70" width="148" height="112" rx="10" />
                    <rect x="140" y="84" width="120" height="84" rx="6" />
                    <text x="200" y="119" textAnchor="middle">MECTEC</text>
                    <text x="200" y="140" textAnchor="middle" className="mectec-chip-subtitle">CONTROL CORE</text>
                  </g>

                  <g className="mectec-circuit-labels">
                    <text x="24" y="111">INPUT</text>
                    <text x="374" y="43">OUTPUT</text>
                    <text x="342" y="111">I/O</text>
                    <text x="38" y="213">SENSOR</text>
                  </g>

                  <circle className="mectec-circuit-pulse mectec-circuit-pulse-one" cx="24" cy="126" r="3" />
                  <circle className="mectec-circuit-pulse mectec-circuit-pulse-two" cx="126" cy="92" r="3" />
                  <circle className="mectec-circuit-pulse mectec-circuit-pulse-three" cx="274" cy="160" r="3" />
                </svg>

                <div className="mectec-circuit-hover" />
              </div>

              <div className="flex items-center justify-between border-t border-line px-4 py-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-content-muted">
                  IDEA → DESIGN → BUILD → TEST
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-content-muted">
                  <Cpu size={12} aria-hidden="true" />
                  MCU
                </span>
              </div>
            </div>

            <div className="mectec-floating-chip mectec-floating-chip-left" aria-hidden="true">
              <Radio size={14} />
              <span>SIGNAL</span>
            </div>
            <div className="mectec-floating-chip mectec-floating-chip-right" aria-hidden="true">
              <Zap size={14} />
              <span>POWER</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
