/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // "Instrument Panel" — grounded in oscilloscopes, multimeters, signal
        // traces. Dark, but with a cool undertone (not flat obsidian), and one
        // accent used with intent rather than a scattering of neons.
        bg: '#0E1214',
        surface: {
          DEFAULT: '#171C1F',
          raised: '#20262A',
        },
        line: {
          DEFAULT: '#2B3236',
          strong: '#3C454A',
        },
        accent: {
          DEFAULT: '#FF7A3D', // molten copper — brand continuity, tuned to glow on dark
          hover: '#FF9260',
          subtle: 'rgba(255, 122, 61, 0.12)',
        },
        content: {
          DEFAULT: '#EDEFEE', // soft platinum, not pure white
          secondary: '#A6AEB2',
          muted: '#6B7478',
        },
        state: {
          success: '#34C77B',
          warning: '#E2A63B',
          danger: '#E5484D',
          info: '#4EA1D9', // signal-blue — status only, never competes with accent
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
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
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        shimmer: 'shimmer 1.6s infinite',
        'gradient-pan': 'gradient-pan 5s linear infinite',
        blink: 'blink 1.1s steps(1) infinite',
        'trace-draw': 'trace-draw 1.6s ease-out 0.3s both',
      },
    },
  },
  plugins: [],
};
