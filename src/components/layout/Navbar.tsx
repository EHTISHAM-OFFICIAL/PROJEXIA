import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Container } from '../ui/Container';
import { ButtonLink } from '../ui/Button';
import { Wordmark } from './Wordmark';
import { ThemeToggle } from './ThemeToggle';
import { NAV_LINKS } from '../../constants/site';
import { cn } from '../../utils/cn';
import { useAuth } from '../../hooks/useAuth';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuScrollPosition = useRef(0);
  const menuOpenPath = useRef('');
  const location = useLocation();
  const { user, profile } = useAuth();

  useEffect(() => setMobileOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    // Mobile browsers can jump to the top when body overflow is toggled.
    // Freeze the body at its current scroll offset instead, keeping the menu
    // anchored to the viewport without moving the page behind it.
    const body = document.body;
    const scrollY = window.scrollY;
    menuScrollPosition.current = scrollY;
    menuOpenPath.current = window.location.pathname;

    const previousStyles = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';

    return () => {
      body.style.position = previousStyles.position;
      body.style.top = previousStyles.top;
      body.style.left = previousStyles.left;
      body.style.right = previousStyles.right;
      body.style.width = previousStyles.width;
      body.style.overflow = previousStyles.overflow;

      // Restore the previous position only when closing on the same route.
      // When a menu link navigates, don't carry the old page's scroll offset
      // over to the destination page.
      if (window.location.pathname === menuOpenPath.current) {
        window.scrollTo(0, menuScrollPosition.current);
      }
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b border-line/80 bg-bg/90 backdrop-blur-xl transition-[background-color,box-shadow] duration-200',
        scrolled || mobileOpen ? 'shadow-[0_8px_24px_-18px_rgba(0,0,0,0.55)]' : 'shadow-none'
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between gap-3 sm:h-[4.25rem]" aria-label="Main">
          <Link to="/" className="min-w-0 rounded-md" aria-label="ProjexiaHub home">
            <Wordmark />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'relative rounded-md px-3.5 py-2 text-sm transition-colors',
                      'after:absolute after:inset-x-3.5 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100',
                      isActive
                        ? 'text-content after:scale-x-100'
                        : 'text-content-secondary hover:text-content'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            {user ? (
              <ButtonLink to="/account" variant="secondary" size="sm">
                {profile?.username || 'Account'}
              </ButtonLink>
            ) : (
              <ButtonLink to="/login" variant="secondary" size="sm">
                Log in
              </ButtonLink>
            )}
            <ButtonLink to="/request-project" size="sm">
              Request a project
            </ButtonLink>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-content-secondary transition-colors hover:bg-surface hover:text-content md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </Container>

    </header>

    {mobileOpen && (
      <div
        id="mobile-menu"
        className="fixed inset-x-0 top-16 z-[60] max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-y border-line bg-bg shadow-[0_18px_36px_-24px_rgba(0,0,0,0.55)] pb-[env(safe-area-inset-bottom)] sm:top-[4.25rem] sm:max-h-[calc(100dvh-4.25rem)] md:hidden"
      >
        <Container className="py-3 sm:py-4">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'flex min-h-11 items-center rounded-lg px-3 py-3 text-base transition-colors',
                      isActive
                        ? 'bg-surface text-content'
                        : 'text-content-secondary hover:bg-surface hover:text-content'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex min-h-12 items-center justify-between rounded-lg border border-line px-3 py-2.5">
            <span className="text-sm text-content-secondary">Theme</span>
            <ThemeToggle />
          </div>
          <div className="mt-3 grid grid-cols-1 gap-2 min-[360px]:grid-cols-2">
            {user ? (
              <ButtonLink to="/account" variant="secondary" size="lg" className="w-full">
                Account
              </ButtonLink>
            ) : (
              <ButtonLink to="/login" variant="secondary" size="lg" className="w-full">
                Log in
              </ButtonLink>
            )}
            <ButtonLink to="/request-project" size="lg" className="w-full">
              Request a project
            </ButtonLink>
          </div>
        </Container>
      </div>
    )}
  );
}
