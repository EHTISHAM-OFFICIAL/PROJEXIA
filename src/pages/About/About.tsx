import { PageIntro } from "../../components/ui/PageIntro";
import { Seo } from "../../components/ui/Seo";
import { Section, SectionHeading } from "../../components/ui/Section";
import { ButtonLink } from "../../components/ui/Button";
import { Accordion } from "../../components/ui/Accordion";
import { PROJECT_CATEGORIES } from "../../constants/categories";
import { FAQ_ITEMS } from "../../constants/faq";
import { useSiteSettings } from "../../contexts/SiteSettingsContext";

const CAPABILITIES = [
  {
    title: "Hardware",
    items: [
      "Microcontroller selection and circuit design",
      "Sensor interfacing — analog and digital",
      "Relay, motor and actuator control",
      "Power supply design and battery operation",
      "Breadboard to stripboard to PCB",
    ],
  },
  {
    title: "Firmware",
    items: [
      "C and C++ for Arduino, ESP32, ESP8266 and STM32",
      "Python and MicroPython on Raspberry Pi",
      "Interrupt and timer driven control loops",
      "Data logging to SD card or cloud",
      "Over-the-air updates where the hardware supports it",
    ],
  },
  {
    title: "Connectivity and software",
    items: [
      "WiFi, Bluetooth, BLE, GSM and LoRa links",
      "MQTT and HTTP device-to-server communication",
      "Web dashboards for monitoring and control",
      "Cloud databases and push notifications",
    ],
  },
];

export default function About() {
  const { settings } = useSiteSettings();
  return (
    <>
      <Seo
        title={`About ${settings.name}`}
        description={`${settings.name} is an electronics studio building embedded systems, IoT devices and automation projects from concept through to tested hardware.`}
        path="/about"
        schema={{
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }}
      />

      <PageIntro
        eyebrow={`About ${settings.name}`}
        title="Electronics built to be understood, not just delivered."
        description={`${settings.name} is an electronics design and development studio working on embedded systems, IoT devices, automation and robotics.`}
        backdrop
      />

      <Section className="border-b border-line">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-16">
          <h2 className="text-2xl font-semibold tracking-tight">The story</h2>
          <div className="flex max-w-prose flex-col gap-4 text-base leading-relaxed text-content-secondary">
            <p>
              {settings.name} started from a simple frustration: plenty of
              electronics projects exist online, but very few are explained well
              enough to actually rebuild, adapt or trust. Wiring diagrams are
              missing, code is half-posted, and nobody says what went wrong.
            </p>
            <p>
              So {settings.name} was set up to work the other way round. Every
              project is documented as a case study — what the problem was,
              which components were chosen and why, what failed during
              development, and what the finished system measurably does.
            </p>
            <p>
              That same standard applies to client work. Whether it's a final
              year project or a small automation system for a workshop, the
              handover includes the source, the schematics and the reasoning.
            </p>
          </div>
        </div>
      </Section>

      <Section className="border-b border-line">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-16">
          <h2 className="text-2xl font-semibold tracking-tight">Mission</h2>
          <p className="max-w-prose text-lg leading-relaxed text-content">
            Make custom electronics accessible to people who have a clear idea
            but not the engineering time — and leave them with something they
            can maintain themselves.
          </p>
        </div>
      </Section>

      <Section className="border-b border-line">
        <SectionHeading
          title="Technical capabilities"
          description="The tools and techniques currently used on {settings.name} projects."
        />
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {CAPABILITIES.map((group) => (
            <div key={group.title}>
              <h3 className="text-base font-semibold tracking-tight">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-content-secondary"
                  >
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-b border-line">
        <SectionHeading
          title={`What ${settings.name} works on`}
          description="Project categories currently covered. The list grows as new work comes in."
        />
        <ul className="mt-10 flex flex-wrap gap-2.5">
          {PROJECT_CATEGORIES.map((category) => (
            <li
              key={category}
              className="rounded-lg border border-line bg-surface px-4 py-2.5 text-sm text-content-secondary"
            >
              {category}
            </li>
          ))}
        </ul>
      </Section>

      <Section className="border-b border-line">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-16">
          <h2 className="text-2xl font-semibold tracking-tight">
            Development philosophy
          </h2>
          <div className="flex max-w-prose flex-col gap-5 text-base leading-relaxed text-content-secondary">
            <p>
              <strong className="font-medium text-content">
                Simple beats clever.
              </strong>{" "}
              The right solution is the least complicated one that meets the
              requirement. Extra features are extra things that can fail in the
              field.
            </p>
            <p>
              <strong className="font-medium text-content">
                Prototype before committing.
              </strong>{" "}
              A breadboard version answers questions that no amount of planning
              will. Testing early costs hours; finding out late costs the build.
            </p>
            <p>
              <strong className="font-medium text-content">
                Document as you go.
              </strong>{" "}
              Notes written during development are accurate. Notes written
              afterwards are a reconstruction.
            </p>
            <p>
              <strong className="font-medium text-content">
                Hand over everything.
              </strong>{" "}
              Code, schematics, component lists and known limitations. A project
              you cannot maintain is a project you have rented.
            </p>
          </div>
        </div>
      </Section>

      <Section className="border-b border-line">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-16">
          <h2 className="text-2xl font-semibold tracking-tight">
            Where this is going
          </h2>
          <div className="flex max-w-prose flex-col gap-4 text-base leading-relaxed text-content-secondary">
            <p>
              The near-term plan is to keep growing the public project archive
              so that anyone starting a similar build has a real reference to
              work from.
            </p>
            <p>
              Beyond that: build guides with full wiring and code, small-batch
              kits for the most requested designs, and deeper documentation on
              the parts of embedded work that are usually skipped — power
              budgeting, enclosure choice, field testing.
            </p>
          </div>
        </div>
      </Section>

      <Section className="border-b border-line">
        <SectionHeading
          title="Frequently asked questions"
          description="The questions that come up most before a request form gets filled in."
        />
        <div className="mx-auto mt-10 max-w-2xl">
          <Accordion items={FAQ_ITEMS} />
        </div>
      </Section>

      <Section>
        <div className="rounded-card border border-line bg-surface p-8 sm:p-12">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Start a conversation
          </h2>
          <p className="mt-3 max-w-prose text-base leading-relaxed text-content-secondary">
            If you have a project in mind, the request form is the fastest route
            to a useful reply. If you just want to ask something first, that
            works too.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/request-project">Request a project</ButtonLink>
            <ButtonLink to="/contact" variant="secondary">
              Contact {settings.name}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
