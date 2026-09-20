/** @type {import('tailwindcss').Config} */

// Reads a color from a CSS custom property storing "R G B" (space-separated,
// no commas), so Tailwind's opacity modifiers (e.g. bg-accent/50) still work
// on top of a runtime-swappable value. This is what makes the theme toggle
// possible without a rebuild: swapping the CSS variables in index.css swaps
// every color on the page instantly.
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) return `rgb(var(${variableName}))`;
    return `rgb(var(${variableName}) / ${opacityValue})`;
  };
}

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // "Instrument Panel" (dark, default) / "Schematic" (light) — both
        // themes are defined as CSS variables in index.css; this file only
        // wires up the token *names* that components use everywhere
        // (bg-surface, text-content, etc.).
        bg: withOpacity('--color-bg'),
        surface: {
          DEFAULT: withOpacity('--color-surface'),
          raised: withOpacity('--color-surface-raised'),
        },
        line: {
          DEFAULT: withOpacity('--color-line'),
          strong: withOpacity('--color-line-strong'),
        },
        accent: {
          DEFAULT: withOpacity('--color-accent'),
          hover: withOpacity('--color-accent-hover'),
          subtle: 'var(--color-accent-subtle)',
        },
        accent2: withOpacity('--color-accent2'),
        onAccent: withOpacity('--color-on-accent'),
        content: {
          DEFAULT: withOpacity('--color-content'),
          secondary: withOpacity('--color-content-secondary'),
          muted: withOpacity('--color-content-muted'),
        },
        state: {
          success: withOpacity('--color-state-success'),
          warning: withOpacity('--color-state-warning'),
          danger: withOpacity('--color-state-danger'),
          info: withOpacity('--color-state-info'),
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Chakra Petch"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        content: '1200px',
        prose: '68ch',
      },
      borderRadius: {
        card: '14px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'gradient-pan': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'trace-draw': {
          '0%': { strokeDashoffset: '1' },
          '100%': { strokeDashoffset: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        shimmer: 'shimmer 1.6s infinite',
        'gradient-pan': 'gradient-pan 5s linear infinite',
        blink: 'blink 1.1s steps(1) infinite',
        'trace-draw': 'trace-draw 1.6s ease-out 0.3s both',
        marquee: 'marquee 9s linear infinite',
      },
    },
  },
  plugins: [],
};
