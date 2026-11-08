import { ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { ButtonLink } from "../ui/Button";
import { useSiteSettings } from "../../contexts/SiteSettingsContext";
import { ScopeTrace } from "./ScopeTrace";

const INDICATORS = [
  { label: "PWR", tone: "bg-state-success" },
  { label: "SIG", tone: "bg-accent" },
  { label: "OUT", tone: "bg-state-info" },
] as const;

export function Hero() {
  const { settings } = useSiteSettings();
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="absolute inset-0 grid-backdrop" aria-hidden="true" />

      <Container className="relative py-12 sm:py-20 lg:py-32">
        <div className="grid min-w-0 gap-8 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
          <div className="min-w-0 max-w-2xl animate-fade-up">
            <h1 className="text-[clamp(2.15rem,8.5vw,3rem)] font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Turning ideas into{" "}
              <span className="bg-gradient-to-r from-accent via-accent2 to-accent bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-pan">
                working electronic & mechanical systems
              </span>
              <span
                className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-0.5 bg-accent align-middle animate-blink"
                aria-hidden="true"
              />
            </h1>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-content-secondary sm:mt-6 sm:text-lg">
              {settings.name} designs and builds custom electronics — embedded
              systems, IoT devices, automation and robotics. From a rough idea
              to a tested prototype you can hold in your hand.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row">
              <ButtonLink to="/projects" size="lg" className="w-full sm:w-auto">
                Explore projects
                <ArrowRight size={17} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink to="/request-project" size="lg" variant="secondary" className="w-full sm:w-auto">
                Request a project
              </ButtonLink>
            </div>
          </div>

          {/* The one deliberate flourish on the page: a live oscilloscope
              (analog channel plus a digital data line), grounded in what an
              electronics bench actually looks like. */}
          <div
            className="relative min-w-0 animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            <div className="overflow-hidden rounded-card border border-line bg-surface">
              <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-3 sm:px-4">
                <span className="min-w-0 truncate font-mono text-[10px] tracking-wide text-content-muted sm:text-xs">
                  BENCH.TRACE — LIVE
                </span>
                <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                  {INDICATORS.map((indicator, index) => (
                    <span
                      key={indicator.label}
                      className="flex items-center gap-1 sm:gap-1.5"
                    >
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

              <ScopeTrace className="relative h-44 w-full sm:h-64" />

              <div className="flex items-center justify-center border-t border-line px-3 py-3 sm:px-4">
                <span className="text-center font-mono text-[10px] leading-relaxed text-content-muted sm:text-xs">
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
