import { Bot, Cpu, Radio, Wrench } from 'lucide-react';
import { Section, SectionHeading } from '../ui/Section';

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
  return (
    <Section className="border-b border-line">
      <SectionHeading
        title="What MECTEC builds"
        description="Four areas cover most of the work. If your project sits between them, that's usually fine — ask."
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
