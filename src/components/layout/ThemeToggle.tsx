import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Check, Moon, Sun, Zap, type LucideIcon } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { THEME_OPTIONS } from "../../constants/themes";
import type { ThemeName } from "../../types/theme";
import { cn } from "../../utils/cn";

const ICONS: Record<ThemeName, LucideIcon> = { dark: Moon, light: Sun, electric: Zap };

function Swatch({ colors }: { colors: [string, string, string] }) {
  return (
    <span className="flex shrink-0 -space-x-1.5" aria-hidden="true">
      {colors.map((color, index) => (
        <span
          key={index}
          className="h-5 w-5 rounded-full border border-white/15"
          style={{ backgroundColor: color }}
        />
      ))}
    </span>
  );
}

interface ThemeToggleProps {
  className?: string;
  /**
   * `menu`: one button that opens a list (header). `segmented`: all choices
   * side by side (mobile menu), so no popover has to fit inside the panel.
   */
  variant?: "menu" | "segmented";
}

export function ThemeToggle({ className = "", variant = "menu" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const current = THEME_OPTIONS.find((option) => option.name === theme) ?? THEME_OPTIONS[0];
  const CurrentIcon = ICONS[current.name];

  if (variant === "segmented") {
    return (
      <div
        role="radiogroup"
        aria-label="Theme"
        className={cn("flex gap-1 rounded-lg border border-line bg-surface-raised p-1", className)}
      >
        {THEME_OPTIONS.map((option) => {
          const Icon = ICONS[option.name];
          const selected = option.name === theme;
          return (
            <button
              key={option.name}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setTheme(option.name)}
              className={cn(
                "inline-flex min-h-10 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium transition-colors",
                selected ? "bg-accent text-on-accent" : "text-content-secondary hover:text-content",
              )}
            >
              <Icon size={15} aria-hidden="true" />
              {option.label}
            </button>
          );
        })}
      </div>
    );
  }

  return <ThemeMenu className={className} current={current} CurrentIcon={CurrentIcon} theme={theme} setTheme={setTheme} />;
}

function ThemeMenu({
  className,
  current,
  CurrentIcon,
  theme,
  setTheme,
}: {
  className: string;
  current: (typeof THEME_OPTIONS)[number];
  CurrentIcon: LucideIcon;
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    // Land on the active option so arrow keys start from where you are.
    root.current?.querySelector<HTMLElement>('[aria-checked="true"]')?.focus();

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const onMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('[role="menuitemradio"]'));
    const index = items.indexOf(document.activeElement as HTMLElement);
    const step = event.key === "ArrowDown" ? 1 : -1;
    items[(index + step + items.length) % items.length]?.focus();
  };

  return (
    <div ref={root} className="relative">
      <button
        ref={button}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Theme: ${current.label}. Change theme`}
        title={`Theme: ${current.label}`}
        className={cn(
          "grid h-10 w-10 place-items-center rounded-md text-content-secondary transition-colors hover:text-content",
          theme === "electric" && "text-accent hover:text-accent-hover",
          className,
        )}
      >
        <CurrentIcon size={18} aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Choose a theme"
          onKeyDown={onMenuKeyDown}
          className="absolute right-0 top-full z-[70] mt-2 w-72 rounded-xl border border-line bg-surface p-1.5 shadow-[var(--shadow-elevated)]"
        >
          {THEME_OPTIONS.map((option) => {
            const Icon = ICONS[option.name];
            const selected = option.name === theme;
            return (
              <button
                key={option.name}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                onClick={() => {
                  setTheme(option.name);
                  setOpen(false);
                  button.current?.focus();
                }}
                className={cn(
                  "flex w-full min-w-0 items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-surface-raised focus-visible:bg-surface-raised",
                  selected && "bg-surface-raised",
                )}
              >
                <Swatch colors={option.swatch} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-content">
                    <Icon size={14} className={selected ? "text-accent" : "text-content-muted"} aria-hidden="true" />
                    {option.label}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-snug text-content-muted">{option.hint}</span>
                </span>
                {selected && <Check size={16} className="shrink-0 text-accent" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
