import type { ReactNode } from 'react';

/** Renders nothing when there is no content, which is how optional fields disappear. */
export function CaseStudySection({
  title,
  children,
  empty = false,
}: {
  title: string;
  children: ReactNode;
  empty?: boolean;
}) {
  if (empty) return null;

  return (
    <section className="border-t border-line pt-10">
      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

/** Preserves paragraph breaks from a Firestore text field without allowing raw HTML. */
export function Prose({ text }: { text: string }) {
  const paragraphs = text.split(/\n{2,}/).filter((paragraph) => paragraph.trim());
  return (
    <div className="flex max-w-prose flex-col gap-4">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="text-base leading-relaxed text-content-secondary">
          {paragraph.trim()}
        </p>
      ))}
    </div>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex max-w-prose flex-col gap-3">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3 text-base leading-relaxed text-content-secondary">
          <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}
