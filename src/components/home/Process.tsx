import { Section, SectionHeading } from '../ui/Section';

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

export function Process() {
  return (
    <Section className="border-b border-line">
      <SectionHeading
        title="How a project runs"
        description="Four stages from first message to finished build."
      />
      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, index) => (
          <li key={step.title} className="border-t border-line pt-6">
            <span className="font-mono text-sm text-accent">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="mt-3 text-base font-semibold tracking-tight">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-content-secondary">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
