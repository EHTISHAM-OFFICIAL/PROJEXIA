import type { ReactNode } from 'react';

/** Renders nothing when there is no content, which is how optional fields disappear. */
export function CaseStudySection({
  title,
  children,
  empty = false,
  id,
}: {
  title: string;
  children: ReactNode;
  empty?: boolean;
  id?: string;
}) {
  if (empty) return null;

  return (
    <section id={id} className="scroll-mt-24 border-t border-line pt-8 sm:pt-9">
      <div className="flex items-center gap-3">
        <span className="h-5 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
        <h2 className="text-xl font-semibold leading-tight tracking-tight sm:text-2xl">{title}</h2>
      </div>
      <div className="mt-5 min-w-0">{children}</div>
    </section>
  );
}

export function InlineText({ text, allowLinks = true }: { text: string; allowLinks?: boolean }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\+\+[^+]+\+\+|\[[^\]]+\]\([^\)]+\))/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index} className="font-semibold text-content">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('++') && part.endsWith('++')) {
          return <u key={index} className="underline decoration-current underline-offset-2">{part.slice(2, -2)}</u>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={index}>{part.slice(1, -1)}</em>;
        }
        const link = part.match(/^\[([^\]]+)\]\(([^\)]+)\)$/);
        if (link && allowLinks) {
          const [, label, href] = link;
          const internal = href.startsWith('/');
          return (
            <a
              key={index}
              href={href}
              className="text-accent underline decoration-accent/40 underline-offset-2 hover:text-accent-hover"
              {...(!internal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {label}
            </a>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

/**
 * Lightweight, safe blog markup. It intentionally does not render raw HTML.
 *
 * Supported:
 * # Heading 1
 * ## Heading 2
 * ### Heading 3
 * - Bullet item
 * **bold**, *italic*
 * [link text](/path)
 * > Callout
 * Blank lines create paragraphs.
 */
export function Prose({ text }: { text: string }) {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const blocks: ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = () => {
    if (!bullets.length) return;
    blocks.push(
      <ul key={blocks.length} className="my-6 flex flex-col gap-3 pl-5 text-base leading-relaxed text-content-secondary sm:text-[1.0625rem]">
        {bullets.map((item, index) => (
          <li key={index} className="list-disc pl-1">
            <InlineText text={item} />
          </li>
        ))}
      </ul>,
    );
    bullets = [];
  };

  lines.forEach((raw, index) => {
    const line = raw.trim();
    if (!line) {
      flushBullets();
      return;
    }

    if (line.startsWith('- ')) {
      bullets.push(line.slice(2).trim());
      return;
    }

    flushBullets();

    if (line.startsWith('### ')) {
      blocks.push(
        <h3 key={index} className="mt-9 text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
          <InlineText text={line.slice(4).trim()} />
        </h3>,
      );
      return;
    }

    if (line.startsWith('## ')) {
      blocks.push(
        <h2 key={index} className="mt-11 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
          <InlineText text={line.slice(3).trim()} />
        </h2>,
      );
      return;
    }

    if (line.startsWith('# ')) {
      blocks.push(
        <h2 key={index} className="mt-12 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          <InlineText text={line.slice(2).trim()} />
        </h2>,
      );
      return;
    }

    if (line.startsWith('> ')) {
      blocks.push(
        <blockquote key={index} className="my-7 border-l-2 border-accent pl-5 text-base leading-relaxed text-content-secondary sm:text-lg">
          <InlineText text={line.slice(2).trim()} />
        </blockquote>,
      );
      return;
    }

    blocks.push(
      <p key={index} className="text-base leading-8 text-content-secondary sm:text-[1.0625rem]">
        <InlineText text={line} />
      </p>,
    );
  });

  flushBullets();

  return <div className="prose-content flex max-w-prose flex-col gap-2">{blocks}</div>;
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex max-w-prose flex-col gap-3">
      {items.map((item, index) => (
        <li key={index} className="flex min-w-0 items-start gap-3 text-base leading-relaxed text-content-secondary">
          <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          <span className="min-w-0 flex-1 [overflow-wrap:anywhere]">
            <InlineText text={item} />
          </span>
        </li>
      ))}
    </ul>
  );
}
