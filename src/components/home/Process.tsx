import { Section } from '../ui/Section';
import { HomeHeading } from './HomeHeading';

const STEPS = [
  {
    title: 'You describe the idea',
    description:
      'Fill in the project request form. It asks about platform, sensors, budget and timeline so the first reply is useful rather than a list of questions.',
  },
  {
    title: 'We scope it together',
    description:
      'A short conversation to confirm what is actually needed, what can be simplified, and what it will realistically cost and take.',
  },
  {
    title: 'Design and build',
    description:
      'Circuit and firmware development, with progress shared as it happens. Changes are easier early, so early feedback matters.',
  },
  {
    title: 'Test and hand over',
    description:
      'The build is tested against the requirements you agreed, then handed over with source code, wiring notes and instructions.',
  },
];

/**
 * The stages really are a sequence, so they are drawn as a route: a trace
 * running from pad to pad. Vertical on phones, horizontal from `lg`.
 */
export function Process() {
  return (
    <Section className="border-b border-line">
      <HomeHeading
        title="How a project runs"
        description="Four stages from first message to finished build."
      />
      <ol className="mt-14 grid gap-10 lg:grid-cols-4 lg:gap-8">
        {STEPS.map((step, index) => (
          <li
            key={step.title}
            className="relative pl-12 before:absolute before:left-3.5 before:top-3.5 before:h-[calc(100%+1.625rem)] before:w-px before:bg-line before:content-[''] last:before:hidden lg:pl-0 lg:pt-12 lg:before:h-px lg:before:w-[calc(100%+2rem)]"
          >
            <span className="absolute left-0 top-0 z-10 grid h-7 w-7 place-items-center rounded-full border border-accent/60 bg-bg font-mono text-xs text-accent">
              {index + 1}
            </span>
            <h3 className="text-base font-semibold tracking-tight">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-content-secondary">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
