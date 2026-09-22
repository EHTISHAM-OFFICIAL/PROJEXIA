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
              Projects range from a student's first sensor build to a small-batch automation system
              for a workshop. The scale changes. The approach doesn't — understand the problem
              first, pick the simplest hardware that solves it, then build it properly.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
