import { describe, expect, it } from 'vitest';
import { contrastRatio, hexToRgb, relativeLuminance } from './color';

describe('hexToRgb', () => {
  it('converts to the space-separated channels the CSS variables use', () => {
    expect(hexToRgb('#22D3FF')).toBe('34 211 255');
    expect(hexToRgb('04060E')).toBe('4 6 14');
  });

  it('falls back to black for malformed input instead of producing NaN', () => {
    expect(hexToRgb('#fff')).toBe('0 0 0');
    expect(hexToRgb('#zzzzzz')).toBe('0 0 0');
    expect(hexToRgb('')).toBe('0 0 0');
  });
});

describe('contrast', () => {
  it('matches the WCAG reference values', () => {
    expect(relativeLuminance('#000000')).toBe(0);
    expect(relativeLuminance('#FFFFFF')).toBeCloseTo(1, 5);
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 1);
    expect(contrastRatio('#777777', '#777777')).toBeCloseTo(1, 5);
  });

  it('is symmetric', () => {
    expect(contrastRatio('#22D3FF', '#04060E')).toBeCloseTo(contrastRatio('#04060E', '#22D3FF'), 8);
  });
});
