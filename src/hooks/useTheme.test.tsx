import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';

// The theme service talks to Firebase; the store logic does not need it.
vi.mock('../services/themeService', async () => {
  const constants = await import('../constants/themes');
  return { ...constants, themeService: { getTheme: async () => constants.DEFAULT_THEME } };
});

import { DEFAULT_THEME, ELECTRIC_THEME } from '../constants/themes';
import { colorsFor, themeStore } from './useTheme';
import { ThemeToggle } from '../components/layout/ThemeToggle';

/** Just enough of the DOM for the store, which only touches the <html> element. */
function stubDom({ reducedMotion = false } = {}) {
  const attributes = new Map<string, string>();
  const properties = new Map<string, string>();
  const meta = { content: '#0E1214', setAttribute: (_: string, value: string) => (meta.content = value) };
  const appended: { className: string; removed: boolean }[] = [];
  const storage = new Map<string, string>();

  const root = {
    getAttribute: (name: string) => attributes.get(name) ?? null,
    setAttribute: (name: string, value: string) => void attributes.set(name, value),
    removeAttribute: (name: string) => void attributes.delete(name),
    style: { setProperty: (name: string, value: string) => void properties.set(name, value) },
  };

  vi.stubGlobal('document', {
    documentElement: root,
    querySelector: (selector: string) => (selector.includes('theme-color') ? meta : null),
    createElement: () => {
      const element = { className: '', removed: false, setAttribute: () => undefined, remove() { element.removed = true; } };
      return element;
    },
    body: { appendChild: (element: { className: string; removed: boolean }) => void appended.push(element) },
  });
  vi.stubGlobal('window', {
    matchMedia: () => ({ matches: reducedMotion }),
    setTimeout: (callback: () => void) => {
      callback();
      return 0;
    },
  });
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => void storage.set(key, value),
  });

  return { attributes, properties, meta, appended, storage };
}

beforeEach(() => vi.unstubAllGlobals());
afterEach(() => vi.unstubAllGlobals());

describe('theme store', () => {
  it('switches to Electric: attribute, colours, toolbar colour and saved choice', () => {
    const dom = stubDom();
    themeStore.set('electric');

    expect(dom.attributes.get('data-theme')).toBe('electric');
    expect(themeStore.getSnapshot()).toBe('electric');
    expect(dom.properties.get('--color-accent')).toBe('34 211 255');
    expect(dom.properties.get('--color-accent2')).toBe('255 154 60');
    expect(dom.meta.content).toBe(ELECTRIC_THEME.bg);
    expect(dom.storage.get('mectec-theme')).toBe('electric');
  });

  it('returning to dark removes the attribute and restores the dark colours', () => {
    const dom = stubDom();
    themeStore.set('electric');
    themeStore.set('dark');

    expect(dom.attributes.has('data-theme')).toBe(false);
    expect(themeStore.getSnapshot()).toBe('dark');
    expect(dom.properties.get('--color-accent')).not.toBe('34 211 255');
    expect(dom.meta.content).toBe(DEFAULT_THEME.dark.bg);
    expect(dom.storage.get('mectec-theme')).toBe('dark');
  });

  it('ignores names that are not themes', () => {
    const dom = stubDom();
    themeStore.set('electric');
    themeStore.set('neon' as never);

    expect(dom.attributes.get('data-theme')).toBe('electric');
    expect(dom.storage.get('mectec-theme')).toBe('electric');
  });

  it('notifies every subscriber and stops after unsubscribe', () => {
    stubDom();
    const first = vi.fn();
    const second = vi.fn();
    const stopFirst = themeStore.subscribe(first);
    themeStore.subscribe(second);

    themeStore.set('light');
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(1);

    stopFirst();
    themeStore.set('electric');
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(2);
  });

  it('cycles dark, light, electric and back to dark', () => {
    stubDom();
    themeStore.set('dark');
    expect(themeStore.next()).toBe('light');
    themeStore.set('light');
    expect(themeStore.next()).toBe('electric');
    themeStore.set('electric');
    expect(themeStore.next()).toBe('dark');
  });

  it('treats an unknown attribute as dark', () => {
    const dom = stubDom();
    dom.attributes.set('data-theme', 'sepia');
    expect(themeStore.getSnapshot()).toBe('dark');
  });

  it('plays the power-on flash only when entering Electric', () => {
    const dom = stubDom();
    themeStore.set('dark');
    themeStore.set('light');
    expect(dom.appended).toHaveLength(0);

    themeStore.set('electric');
    expect(dom.appended).toHaveLength(1);
    expect(dom.appended[0].className).toBe('electric-power-on');
    expect(dom.appended[0].removed).toBe(true); // cleaned up afterwards

    themeStore.set('electric'); // already Electric: no second flash
    expect(dom.appended).toHaveLength(1);
  });

  it('skips the flash when the visitor prefers reduced motion', () => {
    const dom = stubDom({ reducedMotion: true });
    themeStore.set('dark');
    themeStore.set('electric');
    expect(dom.appended).toHaveLength(0);
    expect(dom.attributes.get('data-theme')).toBe('electric');
  });
});

describe('colorsFor', () => {
  it('uses the fixed brand palette for Electric and the site settings for the rest', () => {
    const custom = { ...DEFAULT_THEME, dark: { ...DEFAULT_THEME.dark, accent: '#123456' } };
    expect(colorsFor('electric', custom)).toBe(ELECTRIC_THEME);
    expect(colorsFor('dark', custom).accent).toBe('#123456');
    expect(colorsFor('light', custom)).toBe(custom.light);
  });
});

describe('ThemeToggle', () => {
  it('segmented: one radio per theme, with the current one checked', () => {
    stubDom();
    themeStore.set('dark');
    const html = renderToStaticMarkup(<ThemeToggle variant="segmented" />);

    expect(html).toContain('role="radiogroup"');
    expect(html.match(/role="radio"/g)).toHaveLength(3);
    for (const label of ['Dark', 'Light', 'Electric']) expect(html).toContain(label);
    expect(html.match(/aria-checked="true"/g)).toHaveLength(1);
  });

  it('menu: a single labelled button that announces the popup and starts closed', () => {
    stubDom();
    const html = renderToStaticMarkup(<ThemeToggle />);

    expect(html).toContain('aria-haspopup="menu"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain('aria-label="Theme: Dark. Change theme"');
    expect(html).not.toContain('role="menu"');
  });
});
