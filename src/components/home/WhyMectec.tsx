import { Section, SectionHeading } from '../ui/Section';
import { useSiteSettings } from '../../contexts/SiteSettingsContext';

const REASONS = [
  {
    title: 'You get the source',
    description:
      'Firmware, schematics and wiring notes are handed over with the build. Nothing is locked away, so you can maintain or extend it later.',
  },
  {
    title: 'Scope is agreed before work starts',
    description:
      'What the system will and will not do is written down first. That is how projects avoid drifting into something neither side expected.',
  },
  {
    title: 'The simplest hardware that works',
    description:
      'An ESP32 that does the job beats a Raspberry Pi that does it with more to go wrong. Component choices are explained, not just made.',
  },
  {
    title: 'Built to be tested',
    description:
      'Every project is checked against its own requirements before handover, and you see the results.',
  },
];

export function WhyMectec() {
  const { settings } = useSiteSettings();
  return (
    <Section className="border-b border-line">
      <SectionHeading title={`How ${settings.name} works`} />
      <dl className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
        {REASONS.map((reason) => (
          <div key={reason.title}>
            <dt className="text-base font-semibold tracking-tight">{reason.title}</dt>
            <dd className="mt-2 max-w-prose text-sm leading-relaxed text-content-secondary">
              {reason.description}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
