import { Bot, Cpu, Radio, Wrench } from 'lucide-react';
import { Section } from '../ui/Section';
import { HomeHeading } from './HomeHeading';
import { useSiteSettings } from '../../contexts/SiteSettingsContext';

// Tags are drawn from each description, so they name real parts of the service.
const SERVICES = [
  {
    icon: Cpu,
    title: 'Embedded systems',
    description:
      'Microcontroller firmware for Arduino, ESP32, STM32 and Raspberry Pi, from sensor reads to full state machines.',
    tags: ['Arduino', 'ESP32', 'STM32', 'Raspberry Pi'],
  },
  {
    icon: Radio,
    title: 'IoT and connectivity',
    description:
      'Devices that report to a dashboard or phone over WiFi, Bluetooth, GSM or LoRa, with cloud storage where it helps.',
    tags: ['WiFi', 'Bluetooth', 'GSM', 'LoRa'],
  },
  {
    icon: Wrench,
    title: 'Automation and control',
    description:
      'Relay control, motor drives, timers and safety interlocks for home, lab and small-workshop systems.',
    tags: ['Relays', 'Motor drives', 'Timers', 'Interlocks'],
  },
  {
    icon: Bot,
    title: 'Robotics and prototypes',
    description:
      'Mobile robots, actuated mechanisms and proof-of-concept builds that demonstrate an idea works before you commit to it.',
    tags: ['Mobile robots', 'Mechanisms', 'Proof of concept'],
  },
];

export function Services() {
  const { settings } = useSiteSettings();
  return (
    <Section className="border-b border-line">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <HomeHeading
            title="Custom electronics services"
            description={`${settings.name} develops embedded systems, IoT devices, automation and robotics prototypes, from an initial idea through testing and handover.`}
          />
        </div>
        <ul className="divide-y divide-line border-y border-line">
          {SERVICES.map((service) => (
            <li
              key={service.title}
              className="group relative grid gap-4 py-7 sm:grid-cols-[auto_1fr] sm:gap-6 sm:py-8"
            >
              <span
                className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100"
                aria-hidden="true"
              />
              <span className="grid h-11 w-11 place-items-center rounded-lg border border-line bg-surface text-accent transition-colors group-hover:border-accent/50 sm:ml-4">
                <service.icon size={20} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold tracking-tight">{service.title}</h3>
                <p className="mt-2 max-w-prose text-sm leading-relaxed text-content-secondary">
                  {service.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-line px-2 py-1 font-mono text-xs text-content-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
