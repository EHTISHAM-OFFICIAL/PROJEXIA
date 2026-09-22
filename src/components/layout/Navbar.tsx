import { useEffect, useState } from 'react';
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
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-colors duration-200',
        scrolled || mobileOpen ? 'border-line bg-bg/85 backdrop-blur-md' : 'border-transparent'
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between" aria-label="Main">
          <Link to="/" className="rounded-md">
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
            className="-mr-2 rounded-md p-2 text-content-secondary transition-colors hover:text-content md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </Container>

      {mobileOpen && (
        <div id="mobile-menu" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-bg md:hidden">
          <Container className="py-4">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-lg px-3 py-3 text-base transition-colors',
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
            <div className="mt-4 flex items-center justify-between rounded-lg border border-line px-3 py-2.5">
              <span className="text-sm text-content-secondary">Theme</span>
              <ThemeToggle />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {user ? (
                <ButtonLink to="/account" variant="secondary" size="lg">
                  Account
                </ButtonLink>
              ) : (
                <ButtonLink to="/login" variant="secondary" size="lg">
                  Log in
                </ButtonLink>
              )}
              <ButtonLink to="/request-project" size="lg">
                Request a project
              </ButtonLink>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
