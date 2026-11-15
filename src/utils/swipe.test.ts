import { describe, expect, it } from 'vitest';
import { swipeDirection } from './swipe';

describe('swipeDirection', () => {
  it('maps a left swipe to next and a right swipe to previous', () => {
    expect(swipeDirection(-120, 10)).toBe('next');
    expect(swipeDirection(120, -10)).toBe('prev');
  });

  it('ignores short movements, which are taps', () => {
    expect(swipeDirection(-20, 0)).toBeNull();
    expect(swipeDirection(49, 0)).toBeNull();
  });

  it('ignores mostly vertical gestures, which are scrolling', () => {
    expect(swipeDirection(-80, 200)).toBeNull();
    expect(swipeDirection(60, 55)).toBeNull();
  });

  it('respects a custom threshold', () => {
    expect(swipeDirection(-30, 0, 20)).toBe('next');
  });
});
