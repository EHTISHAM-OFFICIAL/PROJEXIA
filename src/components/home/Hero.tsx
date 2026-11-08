import { ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { ButtonLink } from "../ui/Button";
import { useSiteSettings } from "../../contexts/SiteSettingsContext";
import { CircuitBoard } from "./CircuitBoard";

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

          {/* The one deliberate flourish on the page: a live circuit board
              with data pulses, grounded in what the business actually builds. */}
          <div
            className="relative min-w-0 animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            <CircuitBoard className="mx-auto block aspect-square w-full max-w-[340px] sm:max-w-[500px]" />
            <p className="mt-2 text-center font-mono text-[10px] tracking-wide text-content-muted sm:text-xs">
              REQUEST → BUILD → TEST → DELIVER
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
