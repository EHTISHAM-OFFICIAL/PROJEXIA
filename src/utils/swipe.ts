/**
 * Decides whether a finished touch gesture was a horizontal swipe.
 * Swiping left (negative dx) reveals the next item.
 */
export function swipeDirection(dx: number, dy: number, threshold = 50): 'next' | 'prev' | null {
  if (Math.abs(dx) < threshold) return null;
  // Mostly vertical gestures are scrolling, not swiping.
  if (Math.abs(dx) < Math.abs(dy) * 1.2) return null;
  return dx < 0 ? 'next' : 'prev';
}
