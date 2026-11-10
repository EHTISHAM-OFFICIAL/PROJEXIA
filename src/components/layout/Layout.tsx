import { Suspense, lazy, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AnnouncementBanner } from './AnnouncementBanner';
import { WhatsAppFab } from './WhatsAppFab';

// Defer the chat interface until the browser is idle. The much larger local
// matching engine and knowledge base are loaded only when a visitor opens chat.
const HelpChatWidget = lazy(() =>
  import('./HelpChatWidget').then((module) => ({ default: module.HelpChatWidget }))
);

function DeferredHelpChat() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => setReady(true);
    const idle = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (idle.requestIdleCallback) {
      const id = idle.requestIdleCallback(start, { timeout: 3000 });
      return () => idle.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(start, 1500);
    return () => window.clearTimeout(id);
  }, []);

  return ready ? (
    <Suspense fallback={null}>
      <HelpChatWidget />
    </Suspense>
  ) : null;
}

function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextVisible = scrollableHeight > 0 && window.scrollY / scrollableHeight >= 0.5;
      setVisible((current) => current === nextVisible ? current : nextVisible);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);
    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{'@keyframes backToTopBounce { 0%, 100% { transform: translateY(0); } 32% { transform: translateY(-13px); } 58% { transform: translateY(0); } 80% { transform: translateY(-6px); } } .back-to-top-bounce { animation: backToTopBounce 850ms cubic-bezier(0.34, 1.56, 0.64, 1) infinite; will-change: transform; }'}</style>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
        aria-label="Back to top"
        title="Back to top"
        className="back-to-top-bounce inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-surface text-accent shadow-[0_10px_30px_-10px_rgba(0,0,0,0.55)] transition-colors duration-200 hover:bg-accent hover:text-onAccent hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        <ArrowUp size={22} strokeWidth={2.5} aria-hidden="true" />
      </button>
    </>
  );
}

export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-onAccent"
      >
        Skip to content
      </a>
      <AnnouncementBanner />
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />

      {/* Keep Back to Top vertically above WhatsApp with a clear, consistent gap. */}
      <div className="pointer-events-none fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-5 z-50 flex flex-col items-center gap-5 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] sm:right-8">
        <div className="pointer-events-auto">
          <BackToTopButton />
        </div>
        <div className="pointer-events-auto">
          <WhatsAppFab />
        </div>
      </div>

      <DeferredHelpChat />
    </div>
  );
}
