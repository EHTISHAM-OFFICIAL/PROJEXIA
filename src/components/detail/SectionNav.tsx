import { useEffect, useRef, useState } from 'react';
import { Container } from '../ui/Container';
import { cn } from '../../utils/cn';

export interface NavGroup {
  label: string;
  /** Section ids this entry covers. The link goes to the first one. */
  ids: string[];
}

/** Which of the given section ids is currently being read. */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join('|');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const elements = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (elements.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // The topmost section inside the reading band wins.
        let best: string | null = null;
        let bestTop = Infinity;
        for (const id of visible) {
          const top = document.getElementById(id)?.getBoundingClientRect().top ?? Infinity;
          if (top < bestTop) {
            best = id;
            bestTop = top;
          }
        }
        if (best) setActive(best);
      },
      // A band from just under the sticky bars to the upper half of the screen.
      { rootMargin: '-130px 0px -55% 0px' },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [key]);

  return active;
}

const isActive = (group: NavGroup, active: string | null) => active !== null && group.ids.includes(active);

/**
 * Jump links for a long page. Phones get a row of chips that sticks under the
 * site header (it must be a child of the tall page wrapper to stick); desktop
 * gets `SectionList` in the sidebar.
 */
export function SectionChips({ groups }: { groups: NavGroup[] }) {
  const active = useActiveSection(groups.flatMap((group) => group.ids));
  const scroller = useRef<HTMLDivElement>(null);

  // Keep the active chip in view without scrolling the page itself.
  useEffect(() => {
    const row = scroller.current;
    const chip = row?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!row || !chip) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    row.scrollTo({
      left: chip.offsetLeft - (row.clientWidth - chip.clientWidth) / 2,
      behavior: reduce ? 'auto' : 'smooth',
    });
  }, [active]);

  if (groups.length < 2) return null;

  return (
    <div className="sticky top-[65px] z-20 border-b border-line bg-bg sm:top-[69px] lg:hidden">
      <Container>
        <nav aria-label="On this page">
          <div
            ref={scroller}
            className="-mx-4 flex gap-2 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] max-[380px]:-mx-3.5 max-[380px]:px-3.5 sm:-mx-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
          >
            {groups.map((group) => {
              const current = isActive(group, active);
              return (
                <a
                  key={group.label}
                  href={`#${group.ids[0]}`}
                  aria-current={current ? 'true' : undefined}
                  className={cn(
                    'inline-flex h-11 shrink-0 items-center rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                    current
                      ? 'border-accent/60 bg-accent/10 text-accent'
                      : 'border-line text-content-secondary hover:text-content',
                  )}
                >
                  {group.label}
                </a>
              );
            })}
          </div>
        </nav>
      </Container>
    </div>
  );
}

export function SectionList({ groups }: { groups: NavGroup[] }) {
  const active = useActiveSection(groups.flatMap((group) => group.ids));
  if (groups.length < 2) return null;

  return (
    <nav aria-label="On this page">
      <p className="text-sm font-semibold text-content">On this page</p>
      <ul className="mt-3 border-l border-line">
        {groups.map((group) => {
          const current = isActive(group, active);
          return (
            <li key={group.label}>
              <a
                href={`#${group.ids[0]}`}
                aria-current={current ? 'true' : undefined}
                className={cn(
                  '-ml-px block border-l py-1.5 pl-4 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                  current
                    ? 'border-accent font-medium text-content'
                    : 'border-transparent text-content-secondary hover:text-content',
                )}
              >
                {group.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
