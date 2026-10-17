import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-accent text-onAccent shadow-sm hover:bg-accent-hover hover:shadow-md',
  secondary:
    'bg-surface-raised text-content border border-line hover:border-line-strong hover:bg-surface',
  ghost: 'text-content-secondary hover:text-content hover:bg-surface',
  danger: 'bg-state-danger/10 text-state-danger border border-state-danger/30 hover:bg-state-danger/20',
};

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

const BASE =
  'inline-flex min-w-0 items-center justify-center gap-2 rounded-xl font-medium leading-none ' +
  'transition-[background-color,border-color,color,box-shadow,transform] duration-150 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ' +
  'hover:-translate-y-px active:translate-y-0 active:scale-[0.99] ' +
  'disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none disabled:hover:translate-y-0 disabled:active:scale-100';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}

interface ButtonLinkProps {
  to: string;
  external?: boolean;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  to,
  external = false,
  variant = 'primary',
  size = 'md',
  className,
  children,
}: ButtonLinkProps) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if (external) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={classes}>
      {children}
    </Link>
  );
}
