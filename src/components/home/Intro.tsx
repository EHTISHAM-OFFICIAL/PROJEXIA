import { Container } from '../ui/Container';

export function Intro() {
  return (
    <section className="border-b border-line py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <h2 className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
            An electronics studio, not a parts shop.
          </h2>
          <div className="flex flex-col gap-4 text-base leading-relaxed text-content-secondary">
            <p>
              MECTEC is a custom electronics design and development studio in Pakistan. The work
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
