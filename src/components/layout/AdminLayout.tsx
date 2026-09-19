import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  FolderKanban,
  Inbox,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  MessageSquareQuote,
  Newspaper,
  Settings,
  X,
} from 'lucide-react';
import { Wordmark } from './Wordmark';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/cn';

const ADMIN_LINKS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban, end: false },
  { to: '/admin/requests', label: 'Requests', icon: Inbox, end: false },
  { to: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote, end: false },
  { to: '/admin/blog', label: 'Blog', icon: Newspaper, end: false },
  { to: '/admin/banner', label: 'Banner', icon: Megaphone, end: false },
  { to: '/admin/settings', label: 'Settings', icon: Settings, end: false },
];

export function AdminLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
  );
}
