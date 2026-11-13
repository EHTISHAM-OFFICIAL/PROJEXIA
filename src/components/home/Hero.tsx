import { ArrowRight } from "lucide-react";
import { Container } from "../ui/Container";
import { ButtonLink } from "../ui/Button";
import { useSiteSettings } from "../../contexts/SiteSettingsContext";
import { SITE } from "../../constants/site";
import { HoloChip } from "./HoloChip";

// Taken from the services copy, so the strip states only what the studio does.
const BOARDS = ["Arduino", "ESP32", "STM32", "Raspberry Pi"];
const LINKS = ["WiFi", "Bluetooth", "GSM", "LoRa"];

export function Hero() {
  const { settings } = useSiteSettings();
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <div className="absolute inset-0 grid-backdrop" aria-hidden="true" />
      {/* A static glow behind the chip: depth without any animation cost. */}
      <div
        className="hero-glow pointer-events-none absolute -right-32 top-1/2 -z-10 h-[40rem] w-[40rem] -translate-y-1/2 sm:-right-16 lg:right-[-6rem]"
        aria-hidden="true"
      />

      <Container className="relative pb-8 pt-12 sm:pt-20 lg:pb-12 lg:pt-28">
        <div className="grid min-w-0 gap-8 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-6">
          <div className="min-w-0 max-w-2xl animate-fade-up">
            <h1 className="text-[clamp(2.3rem,7.6vw,4.15rem)] font-semibold leading-[1.04] tracking-tight">
              Turning ideas into working electronic and mechanical systems
            </h1>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-content-secondary sm:mt-7 sm:text-lg">
              {settings.name} designs and builds custom electronics: embedded systems, IoT devices,
              automation and robotics. From a rough idea to a tested prototype you can hold in your
              hand.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-10 sm:flex-row">
              <ButtonLink to="/request-project" size="lg" className="w-full sm:w-auto">
                Request a project
                <ArrowRight size={17} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink to="/projects" size="lg" variant="secondary" className="w-full sm:w-auto">
                Explore projects
              </ButtonLink>
            </div>
            <p className="mt-5 text-sm text-content-muted">
              Requests get a reply {SITE.responseTime}.
            </p>
          </div>

          <div className="relative min-w-0 animate-fade-up" style={{ animationDelay: "120ms" }}>
            <HoloChip className="mx-auto block aspect-square w-full max-w-[340px] sm:max-w-[520px]" />
          </div>
        </div>
      </Container>

      <div className="relative border-t border-line bg-surface/50">
        <Container className="flex flex-col gap-x-10 gap-y-3 py-4 text-sm sm:flex-row sm:flex-wrap sm:items-center">
          <p className="text-content-muted">Works with</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1.5 font-mono text-content-secondary">
            {BOARDS.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-x-6 gap-y-1.5 font-mono text-content-muted">
            {LINKS.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
