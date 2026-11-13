import { useEffect, useRef, useState, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * Fades and lifts content in as it scrolls into view.
 *
 * Built directly on IntersectionObserver rather than a library — this is the
 * only scroll-triggered motion the site needs, so a dependency isn't
 * justified. Reduced-motion is handled for free: the global media query in
 * index.css collapses every transition duration to near-zero, so this still
 * fires (content still becomes visible) but does not animate for people who
 * have asked for that.
 */
export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-500 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      } ${className ?? ''}`}
    >
      {children}
    </div>
  );
}
