import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CircuitBoard,
  Code2,
  Cpu,
  Lightbulb,
  RadioTower,
  Wrench,
} from 'lucide-react';
import { Seo } from '../../components/ui/Seo';
import { Section, SectionHeading } from '../../components/ui/Section';
import { ButtonLink } from '../../components/ui/Button';
import { Accordion } from '../../components/ui/Accordion';
import { PROJECT_CATEGORIES } from '../../constants/categories';
import { FAQ_ITEMS } from '../../constants/faq';
import { useSiteSettings } from '../../contexts/SiteSettingsContext';

const CAPABILITIES = [
  {
    number: '01',
    title: 'Hardware & circuits',
    description: 'From choosing the right board to connecting the parts that make a system work.',
    icon: CircuitBoard,
    items: [
      'Microcontroller selection and circuit design',
      'Analog and digital sensor interfacing',
      'Relay, motor and actuator control',
      'Power supplies and battery operation',
      'Breadboard, stripboard and PCB prototyping',
    ],
  },
  {
    number: '02',
    title: 'Embedded software',
    description: 'The logic behind the hardware, written to do its job clearly and reliably.',
    icon: Code2,
    items: [
      'C and C++ for Arduino, ESP32, ESP8266 and STM32',
      'Python and MicroPython on Raspberry Pi',
      'Interrupt- and timer-driven control',
      'SD card and cloud data logging',
      'Over-the-air updates where supported',
    ],
  },
  {
    number: '03',
    title: 'Connectivity & IoT',
    description: 'Connecting devices, data and interfaces into useful systems.',
    icon: RadioTower,
    items: [
      'Wi-Fi, Bluetooth, BLE, GSM and LoRa',
      'MQTT and HTTP communication',
      'Web dashboards for monitoring and control',
      'Cloud databases and push notifications',
    ],
  },
];

const PRINCIPLES = [
  {
    icon: Lightbulb,
    title: 'Keep it understandable',
    description: 'The best solution is not the most complicated one. It is the simplest approach that meets the actual requirement.',
  },
  {
    icon: Wrench,
    title: 'Build, then test',
    description: 'Prototypes answer practical questions early. Testing during development helps uncover issues before they become expensive.',
  },
  {
    icon: BookOpen,
    title: 'Document the process',
    description: 'Clear notes, wiring details and decisions make a project easier to understand, improve and rebuild.',
  },
  {
    icon: Check,
    title: 'Hand over the knowledge',
    description: 'Code, schematics, component lists and known limitations should be part of a useful project handover.',
  },
];

export default function About() {
  const { settings } = useSiteSettings();

  return (
    <>
      <Seo
        title={`About ${settings.name}`}
        description={`${settings.name} is an electronics design and development studio working on embedded systems, IoT devices, automation and robotics.`}
        path="/about"
        schema={{
          '@type': 'FAQPage',
          mainEntity: FAQ_ITEMS.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        }}
      />

      <section className="relative isolate overflow-hidden border-b border-line bg-surface/30">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute -right-32 -top-40 h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-40 left-[12%] h-80 w-80 rounded-full bg-accent2/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'linear-gradient(rgba(128,128,128,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,.8) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        </div>
        <div className="mx-auto grid w-full max-w-content items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.15fr_.85fr] lg:gap-16 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3.5 py-2 text-xs font-semibold uppercase tracking-[.16em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Get to know {settings.name}
            </div>
            <h1 className="font-display text-4xl font-bold leading-[1.06] tracking-tight text-content sm:text-5xl lg:text-6xl">
              Good ideas deserve
              <span className="mt-1 block text-accent">better engineering.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-content-secondary sm:text-lg">
              We turn concepts into practical electronics projects, embedded systems and connected solutions — with a focus on making the work clear, useful and understandable.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/request-project" size="lg">
                Tell us your idea <ArrowUpRight size={17} />
              </ButtonLink>
              <ButtonLink to="/projects" variant="secondary" size="lg">
                Explore our projects <ArrowRight size={17} />
              </ButtonLink>
            </div>
            <a href="#our-story" className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-content-muted transition-colors hover:text-accent">
              Discover our approach <ArrowDown size={15} />
            </a>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-5 rounded-[2rem] border border-accent/10 rotate-3" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-3xl border border-line bg-surface-raised p-6 shadow-2xl shadow-black/10 sm:p-8">
              <div className="flex items-center justify-between border-b border-line pb-5">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[.2em] text-content-muted">Our point of view</p>
                  <p className="mt-1 text-sm font-semibold text-content">Ideas into working systems</p>
                </div>
                <span className="rounded-xl bg-accent/10 p-3 text-accent"><Cpu size={23} /></span>
              </div>
              <div className="relative my-8 flex items-center justify-center">
                <div className="absolute h-48 w-48 rounded-full border border-dashed border-accent/25" />
                <div className="absolute h-36 w-36 rounded-full border border-accent/20" />
                <div className="absolute h-24 w-24 rounded-full bg-accent/10 blur-xl" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent shadow-lg shadow-accent/10">
                  <CircuitBoard size={48} strokeWidth={1.35} />
                </div>
                <span className="absolute left-[8%] top-[18%] rounded-lg border border-line bg-bg px-3 py-2 text-xs font-medium text-content-secondary">Design</span>
                <span className="absolute right-[4%] top-[25%] rounded-lg border border-line bg-bg px-3 py-2 text-xs font-medium text-content-secondary">Build</span>
                <span className="absolute bottom-[8%] left-[18%] rounded-lg border border-line bg-bg px-3 py-2 text-xs font-medium text-content-secondary">Test</span>
                <span className="absolute bottom-[8%] right-[10%] rounded-lg border border-line bg-bg px-3 py-2 text-xs font-medium text-content-secondary">Learn</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-line bg-bg/70 p-4">
                  <p className="text-xs text-content-muted">Focus</p>
                  <p className="mt-1 text-sm font-semibold text-content">Practical builds</p>
                </div>
                <div className="rounded-xl border border-line bg-bg/70 p-4">
                  <p className="text-xs text-content-muted">Approach</p>
                  <p className="mt-1 text-sm font-semibold text-content">Clear handover</p>
                </div>
              </div>
              <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[.18em] text-content-muted">Curiosity · Craft · Clarity</p>
            </div>
          </div>
        </div>
      </section>

      <Section className="border-b border-line" id="our-story">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-3">01 / The story</p>
            <h2 className="max-w-sm text-3xl font-semibold leading-tight tracking-tight text-content sm:text-4xl">
              Making electronics easier to understand.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-content-secondary sm:text-lg">
            <p>
              Electronics projects are everywhere, but finding a build that is properly explained can be difficult. Wiring details may be missing, code can be incomplete, and the lessons learned along the way are often left out.
            </p>
            <p>
              {settings.name} is built around a more useful approach: treat each project as a learning experience as well as a finished result. Show the idea, explain the components, share the development process and make the outcome easier to understand.
            </p>
            <p>
              That thinking carries into custom work too. Whether it is an educational model, a final-year project or an automation idea, the aim is to create something practical and make the work behind it clear.
            </p>
            <div className="border-l-2 border-accent py-1 pl-5">
              <p className="text-lg font-semibold leading-relaxed text-content sm:text-xl">
                A project should not just work. You should be able to understand how it works.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-b border-line">
        <div className="grid gap-8 overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/10 via-surface-raised to-surface-raised p-7 sm:p-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:p-14">
          <div>
            <p className="eyebrow mb-3">02 / Our mission</p>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-content sm:text-4xl">
              Make ideas possible. Make the result understandable.
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-content-secondary sm:text-lg">
              Make custom electronics accessible to people who have a clear idea but not the engineering time — and leave them with something they can understand, maintain and build on.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {['Accessible engineering', 'Practical solutions', 'Knowledge sharing'].map((item) => (
                <span key={item} className="rounded-full border border-line bg-bg/70 px-3.5 py-2 text-xs font-medium text-content-secondary sm:text-sm">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-b border-line">
        <SectionHeading
          title="What we can work on"
          description="A mix of electronics, embedded development and connected systems — selected to fit the problem, not just the trend."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {CAPABILITIES.map((group) => {
            const Icon = group.icon;
            return (
              <article key={group.number} className="group flex h-full flex-col rounded-2xl border border-line bg-surface-raised p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-black/5 sm:p-7">
                <div className="flex items-start justify-between">
                  <span className="rounded-xl border border-accent/20 bg-accent/10 p-3 text-accent"><Icon size={23} strokeWidth={1.8} /></span>
                  <span className="font-mono text-xs text-content-muted">{group.number}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-content">{group.title}</h3>
                <p className="mt-2 min-h-[3.5rem] text-sm leading-relaxed text-content-secondary">{group.description}</p>
                <ul className="mt-6 space-y-3 border-t border-line pt-5">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-content-secondary">
                      <Check size={15} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Section>

      <Section className="border-b border-line">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-3">03 / Areas of interest</p>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-content sm:text-4xl">A broad toolkit for curious minds.</h2>
            <p className="mt-4 max-w-sm leading-relaxed text-content-secondary">
              Explore the areas represented across our project work. The list can grow as new ideas and builds are added.
            </p>
            <ButtonLink to="/projects" variant="secondary" className="mt-6">
              Browse projects <ArrowUpRight size={16} />
            </ButtonLink>
          </div>
          <div className="rounded-2xl border border-line bg-surface-raised p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-line pb-5">
              <div>
                <p className="text-sm font-semibold text-content">Project categories</p>
                <p className="mt-1 text-xs text-content-muted">Explore the disciplines</p>
              </div>
              <span className="rounded-xl bg-accent/10 p-3 text-accent"><Cpu size={21} /></span>
            </div>
            <ul className="flex flex-wrap gap-2.5">
              {PROJECT_CATEGORIES.map((category) => (
                <li key={category} className="rounded-xl border border-line bg-bg px-4 py-3 text-sm font-medium text-content-secondary transition-colors hover:border-accent/40 hover:text-accent">
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="border-b border-line">
        <SectionHeading
          title="The principles behind every build"
          description="A few practical ideas guide how we approach design, development and project handover."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {PRINCIPLES.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <article key={principle.title} className="flex gap-5 rounded-2xl border border-line bg-surface-raised p-6 sm:p-7">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="mb-1 font-mono text-[10px] tracking-[.16em] text-content-muted">0{index + 1}</p>
                  <h3 className="text-lg font-semibold text-content">{principle.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-content-secondary">{principle.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section className="border-b border-line">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-3">04 / Looking ahead</p>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-content sm:text-4xl">More projects. Better guides. Shared learning.</h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-content-secondary">
            <p>
              The goal is to keep growing the public project archive so that anyone starting a similar build has a useful reference to learn from.
            </p>
            <p>
              Future plans include more detailed build guides with wiring and code, small-batch kits for frequently requested designs, and deeper explanations of the practical details that matter in embedded work — from power budgeting to enclosure choices and testing.
            </p>
          </div>
        </div>
      </Section>

      <Section className="border-b border-line">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <p className="eyebrow mb-3">Good to know</p>
            <SectionHeading
              title="Frequently asked questions"
              description="A few useful answers before you start planning a project."
              align="center"
            />
          </div>
          <div className="rounded-2xl border border-line bg-surface-raised p-4 sm:p-7">
            <Accordion items={FAQ_ITEMS} />
          </div>
        </div>
      </Section>

      <Section>
        <div className="relative isolate overflow-hidden rounded-3xl border border-accent/25 bg-surface-raised px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
          <div className="pointer-events-none absolute -right-20 -top-28 -z-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 -z-10 h-64 w-64 rounded-full bg-accent2/10 blur-3xl" aria-hidden="true" />
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-2xl">
              <p className="eyebrow mb-3">Have an idea?</p>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-content sm:text-4xl">Let’s turn your idea into something real.</h2>
              <p className="mt-4 max-w-xl leading-relaxed text-content-secondary">
                Tell us what you have in mind. You do not need every technical detail figured out before starting the conversation.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <ButtonLink to="/request-project" size="lg">
                Request a project <ArrowUpRight size={17} />
              </ButtonLink>
              <ButtonLink to="/contact" variant="secondary" size="lg">
                Contact {settings.name}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
