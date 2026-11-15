import type { ReactNode } from 'react';
import { Check } from 'lucide-react';

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
    <section id={id} className="scroll-mt-[4.5rem] border-t border-line pt-8 sm:scroll-mt-36 sm:pt-10">
      <div className="flex items-center gap-3">
        <span className="h-6 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
        <h2 className="text-[1.375rem] font-semibold leading-tight tracking-tight sm:text-2xl">{title}</h2>
      </div>
      <div className="mt-5 min-w-0 sm:mt-6">{children}</div>
    </section>
  );
}

/**
 * Markdown links are written by admins, but a `javascript:` or `data:` target
 * must never become a clickable href. Allow web links, mail/phone links and
 * paths within this site.
 */
export function isSafeLinkTarget(href: string): boolean {
  const target = href.trim();
  if (target.startsWith('//')) return false;
  if (target.startsWith('/') || target.startsWith('#')) return true;
  try {
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(new URL(target).protocol);
  } catch {
    return false;
  }
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
          if (!isSafeLinkTarget(href)) return <span key={index}>{label}</span>;
          const internal = href.startsWith('/') && !href.startsWith('//');
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
 * 1. Numbered item
 * **bold**, *italic*
 * [link text](/path)
 * > Callout
 * Blank lines create paragraphs.
 */
export type ProseSize = 'compact' | 'reading';

const PARAGRAPH: Record<ProseSize, string> = {
  compact: 'text-sm leading-7 text-content-secondary sm:text-base sm:leading-8',
  // 16px on phones, 17px from sm, with generous leading and stronger contrast.
  reading: 'text-base leading-[1.8] text-content/90 sm:text-[1.0625rem]',
};
const LIST: Record<ProseSize, string> = {
  compact: 'my-4 flex flex-col gap-2 pl-5 text-sm leading-relaxed text-content-secondary sm:text-base',
  reading: 'my-2 flex flex-col gap-2.5 pl-5 text-base leading-[1.75] text-content/90 sm:text-[1.0625rem]',
};
const QUOTE: Record<ProseSize, string> = {
  compact: 'my-5 rounded-r-xl border-l-2 border-accent bg-accent/5 py-3 pl-4 pr-3 text-sm leading-relaxed text-content-secondary sm:text-base',
  reading: 'my-3 rounded-r-xl border-l-2 border-accent bg-accent/5 py-3.5 pl-4 pr-3 text-base leading-[1.7] text-content/90 sm:text-[1.0625rem]',
};

export function Prose({ text, size = 'compact' }: { text: string; size?: ProseSize }) {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const blocks: ReactNode[] = [];
  let bullets: string[] = [];
  let numbered: string[] = [];

  const flushBullets = () => {
    if (!bullets.length) return;
    blocks.push(<ul key={'ul-' + blocks.length} className={LIST[size]}>
      {bullets.map((item, index) => <li key={index} className="list-disc pl-1"><InlineText text={item}/></li>)}
    </ul>);
    bullets = [];
  };
  const flushNumbered = () => {
    if (!numbered.length) return;
    blocks.push(<ol key={'ol-' + blocks.length} className={LIST[size]}>
      {numbered.map((item, index) => <li key={index} className="list-decimal pl-1"><InlineText text={item}/></li>)}
    </ol>);
    numbered = [];
  };
  const flushLists = () => { flushBullets(); flushNumbered(); };

  lines.forEach((raw, index) => {
    const line = raw.trim();
    if (!line) { flushLists(); return; }
    if (line.startsWith('- ') || line.startsWith('* ')) {
      flushNumbered();
      bullets.push(line.slice(2).trim());
      return;
    }
    const ordered = line.match(/^\d+[.)]\s+(.+)$/);
    if (ordered) {
      flushBullets();
      numbered.push(ordered[1]);
      return;
    }
    flushLists();
    if (size === 'reading' && /^#{1,3} /.test(line)) {
      // Inside a page section that already has an h2, headings step down a level.
      const level = line.match(/^#+/)![0].length;
      const heading = line.replace(/^#+\s+/, '').trim();
      blocks.push(
        level === 3 ? (
          <h4 key={index} className="mt-3 text-base font-semibold leading-snug text-content sm:text-lg"><InlineText text={heading}/></h4>
        ) : (
          <h3 key={index} className="mt-5 text-lg font-semibold leading-snug tracking-tight text-content sm:text-xl"><InlineText text={heading}/></h3>
        ),
      );
      return;
    }
    if (line.startsWith('### ')) {
      blocks.push(<h3 key={index} className="mt-7 text-lg font-semibold leading-tight tracking-tight sm:text-xl"><InlineText text={line.slice(4).trim()}/></h3>);
      return;
    }
    if (line.startsWith('## ')) {
      blocks.push(<h2 key={index} className="mt-8 text-xl font-semibold leading-tight tracking-tight sm:text-2xl"><InlineText text={line.slice(3).trim()}/></h2>);
      return;
    }
    if (line.startsWith('# ')) {
      blocks.push(<h2 key={index} className="mt-9 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl"><InlineText text={line.slice(2).trim()}/></h2>);
      return;
    }
    if (line.startsWith('> ')) {
      blocks.push(<blockquote key={index} className={QUOTE[size]}><InlineText text={line.slice(2).trim()}/></blockquote>);
      return;
    }
    blocks.push(<p key={index} className={PARAGRAPH[size]}><InlineText text={line}/></p>);
  });
  flushLists();
  return <div className={`prose-content flex max-w-prose flex-col ${size === 'reading' ? 'gap-4' : 'gap-2'}`}>{blocks}</div>;
}

export function BulletList({
  items,
  variant = 'dot',
}: {
  items: string[];
  variant?: 'dot' | 'check';
}) {
  return (
    <ul className="flex max-w-prose flex-col gap-3.5">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex min-w-0 items-start gap-3 text-base leading-[1.7] text-content/90 sm:text-[1.0625rem]"
        >
          {variant === 'check' ? (
            <span
              className="mt-[0.3rem] grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent"
              aria-hidden="true"
            >
              <Check size={13} strokeWidth={3} />
            </span>
          ) : (
            <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          )}
          <span className="min-w-0 flex-1 [overflow-wrap:anywhere]">
            <InlineText text={item} />
          </span>
        </li>
      ))}
    </ul>
  );
}
