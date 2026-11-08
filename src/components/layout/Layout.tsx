import { Suspense, lazy, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AnnouncementBanner } from './AnnouncementBanner';
import { WhatsAppFab } from './WhatsAppFab';

// The help bot ships ~85,000 lines of knowledge-base text. Loading it with the
// first page would more than double the initial download for a feature most
// visitors never open, so it is split into its own file and fetched once the
// browser is idle.
const HelpChatWidget = lazy(() =>
  import('./HelpChatWidget').then((module) => ({ default: module.HelpChatWidget }))
);

function DeferredHelpChat() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => setReady(true);
    // Older Safari has no requestIdleCallback, so fall back to a short timer.
    const idle = (window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    });
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
      <WhatsAppFab />
      <DeferredHelpChat />
    </div>
  );
}
