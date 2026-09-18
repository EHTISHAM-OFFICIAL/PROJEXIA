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
              MECTEC works on one thing: taking an electronics idea and turning it into something
              that actually runs. That means circuit design, firmware, enclosure decisions, testing,
              and the documentation that lets you keep using it after handover.
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
