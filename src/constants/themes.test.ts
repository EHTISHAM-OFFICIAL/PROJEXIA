import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { DEFAULT_THEME, ELECTRIC_THEME, THEME_OPTIONS, toolbarColorFor } from './themes';
import { THEME_NAMES, isThemeName } from '../types/theme';
import { contrastRatio, hexToRgb } from '../utils/color';


/** Splits a selector list on commas that are not inside parentheses, e.g. :is(a, button). */
function splitTopLevel(list: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = '';
  for (const character of list) {
    if (character === '(') depth += 1;
    if (character === ')') depth -= 1;
    if (character === ',' && depth === 0) {
      parts.push(current.trim());
      current = '';
    } else {
      current += character;
    }
  }
  parts.push(current.trim());
  return parts.filter(Boolean);
}

const E = ELECTRIC_THEME;

describe('Electric palette legibility (WCAG)', () => {
  const grounds = [
    ['page background', E.bg],
    ['surface', E.surface],
    ['raised surface', E.surfaceRaised],
  ] as const;

  it.each(grounds)('body text is AAA on the %s', (_name, ground) => {
    expect(contrastRatio(E.content, ground)).toBeGreaterThanOrEqual(7);
    expect(contrastRatio(E.contentSecondary, ground)).toBeGreaterThanOrEqual(7);
  });

  it.each(grounds)('muted text still passes AA on the %s', (_name, ground) => {
    expect(contrastRatio(E.contentMuted, ground)).toBeGreaterThanOrEqual(4.5);
  });

  it.each(grounds)('accent colours are readable as text on the %s', (_name, ground) => {
    expect(contrastRatio(E.accent, ground)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(E.accentHover, ground)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(E.accent2, ground)).toBeGreaterThanOrEqual(4.5);
  });

  it.each(grounds)('status colours are readable on the %s', (_name, ground) => {
    for (const colour of [E.stateSuccess, E.stateWarning, E.stateDanger, E.stateInfo]) {
      expect(contrastRatio(colour, ground)).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('text on a filled primary button is AA or better', () => {
    expect(contrastRatio(E.onAccent, E.accent)).toBeGreaterThanOrEqual(7);
    expect(contrastRatio(E.onAccent, E.accentHover)).toBeGreaterThanOrEqual(7);
  });

  it('keeps a visible separation between page, surface and border', () => {
    expect(contrastRatio(E.line, E.bg)).toBeGreaterThanOrEqual(1.3);
    expect(contrastRatio(E.lineStrong, E.bg)).toBeGreaterThanOrEqual(2);
  });
});

describe('Electric palette is mirrored in the stylesheet', () => {
  const css = readFileSync(resolve(process.cwd(), 'src/index.css'), 'utf8');
  const block = css.match(/\[data-theme="electric"\]\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';

  const expected: Record<string, string> = {
    '--color-bg': hexToRgb(E.bg),
    '--color-surface': hexToRgb(E.surface),
    '--color-surface-raised': hexToRgb(E.surfaceRaised),
    '--color-line': hexToRgb(E.line),
    '--color-line-strong': hexToRgb(E.lineStrong),
    '--color-accent': hexToRgb(E.accent),
    '--color-accent-hover': hexToRgb(E.accentHover),
    '--color-accent2': hexToRgb(E.accent2),
    '--color-on-accent': hexToRgb(E.onAccent),
    '--color-content': hexToRgb(E.content),
    '--color-content-secondary': hexToRgb(E.contentSecondary),
    '--color-content-muted': hexToRgb(E.contentMuted),
    '--color-state-success': hexToRgb(E.stateSuccess),
    '--color-state-warning': hexToRgb(E.stateWarning),
    '--color-state-danger': hexToRgb(E.stateDanger),
    '--color-state-info': hexToRgb(E.stateInfo),
  };

  it('finds the electric token block', () => {
    expect(block.length).toBeGreaterThan(200);
  });

  it.each(Object.entries(expected))('%s matches ELECTRIC_THEME', (token, value) => {
    const found = block.match(new RegExp(`${token}:\\s*([^;]+);`))?.[1].trim();
    expect(found).toBe(value);
  });

  it('accent-subtle matches too', () => {
    const found = block.match(/--color-accent-subtle:\s*([^;]+);/)?.[1].replace(/\s/g, '');
    expect(found).toBe(E.accentSubtle.replace(/\s/g, ''));
  });
});

describe('theme options', () => {
  it('offers every theme exactly once, in cycle order', () => {
    expect(THEME_OPTIONS.map((option) => option.name)).toEqual([...THEME_NAMES]);
  });

  it('uses each theme background for the mobile toolbar colour', () => {
    expect(toolbarColorFor('dark')).toBe(DEFAULT_THEME.dark.bg);
    expect(toolbarColorFor('light')).toBe(DEFAULT_THEME.light.bg);
    expect(toolbarColorFor('electric')).toBe(E.bg);
  });

  it('only accepts known theme names', () => {
    expect(isThemeName('electric')).toBe(true);
    expect(isThemeName('neon')).toBe(false);
    expect(isThemeName(undefined)).toBe(false);
    expect(isThemeName(null)).toBe(false);
  });
});

describe('Electric effects stay inside the Electric theme', () => {
  const css = readFileSync(resolve(process.cwd(), 'src/index.css'), 'utf8');
  // Start at the banner comment's opening so it is stripped as a whole comment.
  const effects = css.slice(css.lastIndexOf('/*', css.indexOf('ELECTRIC THEME EFFECTS')));

  // Reduce the section to plain rules: no comments, keyframes or @media wrappers.
  const plain = effects
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/@keyframes[^{]+\{(?:[^{}]*\{[^}]*\})*[^}]*\}/g, '')
    .replace(/@media[^{]+\{/g, '');

  // Selector lists of every remaining rule.
  const selectors = [...plain.matchAll(/(?:^|[};])\s*([^{}@;]+?)\s*\{/g)].map((match) => match[1].trim());

  it('finds the effect rules', () => {
    expect(selectors.length).toBeGreaterThan(10);
  });

  it('scopes every rule to the electric theme (or the one-off flash element)', () => {
    for (const list of selectors) {
      for (const selector of splitTopLevel(list)) {
        const scoped = selector.includes('[data-theme="electric"]') || selector.startsWith('.electric-power-on');
        expect(scoped, `unscoped selector: ${selector}`).toBe(true);
      }
    }
  });

  it('drops the extra effects on struggling devices and for reduced motion', () => {
    expect(effects).toContain('[data-perf="lite"][data-theme="electric"] body::after');
    expect(effects).toMatch(/prefers-reduced-motion: reduce[\s\S]*body::after[\s\S]*display: none/);
  });
});
