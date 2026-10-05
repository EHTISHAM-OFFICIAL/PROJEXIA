import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  FolderKanban,
  Inbox,
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  MessageSquareQuote,
  Newspaper,
  Settings,
  ClipboardList,
  X,
  ShieldCheck,
} from 'lucide-react';
import { Wordmark } from './Wordmark';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/cn';

const ADMIN_LINKS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban, end: false },
  { to: '/admin/requests', label: 'Requests', icon: Inbox, end: false },
  { to: '/admin/meetings', label: 'Meetings', icon: CalendarDays, end: false },
  { to: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote, end: false },
  { to: '/admin/blog', label: 'Blog', icon: Newspaper, end: false },
  { to: '/admin/banner', label: 'Banner', icon: Megaphone, end: false },
  { to: '/admin/settings', label: 'Settings', icon: Settings, end: false },
  { to: '/admin/request-status', label: 'Request Status', icon: ClipboardList, end: false },
];

export function AdminLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('mectec-admin-welcome-pending') === '1') {
      setShowWelcome(true);
      sessionStorage.removeItem('mectec-admin-welcome-pending');
    }
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login', { replace: true });
  };

  const nav = (
    <nav className="flex flex-col gap-1" aria-label="Admin">
      {ADMIN_LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
              isActive
                ? 'bg-accent/10 text-accent'
                : 'text-content-secondary hover:bg-surface-raised hover:text-content'
            )
          }
        >
          <link.icon size={17} aria-hidden="true" />
          {link.label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <>
      <div className="min-h-screen lg:flex">
      <header className="flex h-14 items-center justify-between border-b border-line px-4 lg:hidden">
        <Link to="/admin">
          <Wordmark size="sm" />
        </Link>
        <button
          type="button"
          onClick={() => setSidebarOpen((open) => !open)}
          aria-expanded={sidebarOpen}
          aria-label={sidebarOpen ? 'Close admin menu' : 'Open admin menu'}
          className="rounded-md p-2 text-content-secondary hover:text-content"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {sidebarOpen && (
        <div className="border-b border-line p-4 lg:hidden">
          {nav}
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-content-secondary hover:bg-surface-raised hover:text-content"
          >
            <LogOut size={17} aria-hidden="true" />
            Sign out
          </button>
        </div>
      )}

      <aside className="hidden w-60 shrink-0 flex-col border-r border-line p-4 lg:flex">
        <Link to="/admin" className="mb-8 px-1">
          <Wordmark size="sm" />
        </Link>
        {nav}
        <div className="mt-auto border-t border-line pt-4">
          <p className="truncate px-3 text-xs text-content-muted" title={user?.email ?? ''}>
            {user?.email}
          </p>
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-content-secondary transition-colors hover:bg-surface-raised hover:text-content"
          >
            <LogOut size={17} aria-hidden="true" />
            Sign out
          </button>
          <Link
            to="/"
            className="mt-1 block px-3 py-2 text-xs text-content-muted transition-colors hover:text-content"
          >
            View public site
          </Link>
        </div>
      </aside>

      <main className="min-w-0 flex-1 p-5 sm:p-8">
        <Outlet />
      </main>
      </div>

      {showWelcome && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="admin-welcome-title"
        >
          <div className="w-full max-w-lg rounded-card border border-line bg-surface p-7 shadow-2xl sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
              <ShieldCheck size={22} aria-hidden="true" />
            </div>
            <p className="mt-5 text-sm font-medium text-accent">MECTEC Admin</p>
            <h1 id="admin-welcome-title" className="mt-1 text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-content-secondary">
              You are entering the private MECTEC administration area. Customer requests can contain
              personal contact details, project information, internal notes and quoted amounts.
            </p>

            <div className="mt-5 rounded-lg border border-state-warning/30 bg-state-warning/5 p-4">
              <p className="text-sm font-semibold">Administrator disclaimer</p>
              <p className="mt-1 text-sm leading-relaxed text-content-secondary">
                Use this area only for legitimate MECTEC administration. Keep customer information
                confidential, review changes carefully, and remember that request status updates can
                be visible to customers. Deleted requests are moved to recoverable trash rather than
                being permanently removed.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowWelcome(false);
                  navigate('/');
                }}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-line bg-surface-raised px-5 text-sm font-medium transition-colors hover:border-line-strong hover:bg-surface"
              >
                View public site
              </button>
              <button
                type="button"
                autoFocus
                onClick={() => setShowWelcome(false)}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-accent px-5 text-sm font-medium text-onAccent transition-colors hover:bg-accent-hover"
              >
                Continue to admin panel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
