import { Container } from '../ui/Container';
import { useSiteSettings } from '../../contexts/SiteSettingsContext';

export function Intro() {
  const { settings } = useSiteSettings();
  return (
    <section className="border-b border-line py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <h2 className="text-[clamp(1.9rem,4.6vw,3.1rem)] font-semibold leading-[1.08] tracking-tight">
            An electronics studio, not a parts shop.
          </h2>
          <div className="flex flex-col gap-5 border-l border-accent/40 pl-6 text-base leading-relaxed text-content-secondary sm:text-lg sm:leading-relaxed">
            <p>
              {settings.name} is a custom electronics design and development studio in Pakistan. The work
              covers circuit design, embedded firmware, IoT connectivity, automation, robotics,
              prototyping and the documentation needed to keep a system useful after handover.
            </p>
            <p>
              Projects range from sensor and microcontroller prototypes to connected IoT devices
              and small automation systems. The scale changes, but the approach stays the same:
              understand the problem first, choose hardware that fits the requirement, prototype
              early, then test the finished system properly.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
