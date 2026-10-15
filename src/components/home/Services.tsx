import { Bot, Cpu, Radio, Wrench } from 'lucide-react';
import { Section, SectionHeading } from '../ui/Section';
import { useSiteSettings } from '../../contexts/SiteSettingsContext';

const SERVICES = [
  {
    icon: Cpu,
    title: 'Embedded systems',
    description:
      'Microcontroller firmware for Arduino, ESP32, STM32 and Raspberry Pi — from sensor reads to full state machines.',
  },
  {
    icon: Radio,
    title: 'IoT and connectivity',
    description:
      'Devices that report to a dashboard or phone over WiFi, Bluetooth, GSM or LoRa, with cloud storage where it helps.',
  },
  {
    icon: Wrench,
    title: 'Automation and control',
    description:
      'Relay control, motor drives, timers and safety interlocks for home, lab and small-workshop systems.',
  },
  {
    icon: Bot,
    title: 'Robotics and prototypes',
    description:
      'Mobile robots, actuated mechanisms and proof-of-concept builds that demonstrate an idea works before you commit to it.',
  },
];

export function Services() {
  const { settings } = useSiteSettings();
  return (
    <Section className="border-b border-line">
      <SectionHeading
        title="Custom electronics services"
        description={`${settings.name} develops embedded systems, IoT devices, automation and robotics prototypes, from an initial idea through testing and handover.`}
      />
      <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
        {SERVICES.map((service) => (
          <div key={service.title} className="bg-bg p-6 sm:p-8">
            <service.icon size={20} className="text-accent" aria-hidden="true" />
            <h3 className="mt-4 text-lg font-semibold tracking-tight">{service.title}</h3>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-content-secondary">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
