/** "#RRGGBB" -> "R G B", the channel format the CSS theme variables use. */
export function hexToRgb(hex: string): string {
  const normalized = hex.replace('#', '').trim();
  if (normalized.length !== 6) return '0 0 0';

  const red = parseInt(normalized.slice(0, 2), 16);
  const green = parseInt(normalized.slice(2, 4), 16);
  const blue = parseInt(normalized.slice(4, 6), 16);
  if ([red, green, blue].some((value) => Number.isNaN(value))) return '0 0 0';

  return `${red} ${green} ${blue}`;
}

/** WCAG relative luminance of a "#RRGGBB" colour. */
export function relativeLuminance(hex: string): number {
  const [red, green, blue] = hexToRgb(hex)
    .split(' ')
    .map((channel) => {
      const value = Number(channel) / 255;
      return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

/** WCAG contrast ratio between two "#RRGGBB" colours (1 to 21). */
export function contrastRatio(foreground: string, background: string): number {
  const [lighter, darker] = [relativeLuminance(foreground), relativeLuminance(background)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}
