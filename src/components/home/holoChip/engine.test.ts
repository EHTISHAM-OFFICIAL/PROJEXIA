import { describe, expect, it, vi } from 'vitest';
import {
  PROFILES,
  QUALITY_ORDER,
  chooseDpr,
  createChipScene,
  pickInitialQuality,
  type DeviceInfo,
  type Quality,
} from './engine';

/** A recording stand-in for CanvasRenderingContext2D. */
function mockContext() {
  const calls: Record<string, number> = {};
  const sets: Record<string, unknown[]> = {};
  const numericArgs: { name: string; args: number[] }[] = [];
  const state: Record<string, unknown> = {};
  const drawing = new Set(['moveTo', 'lineTo', 'arc', 'rect', 'fillRect', 'strokeRect', 'drawImage', 'setTransform', 'translate', 'fillText']);

  const ctx = new Proxy({} as Record<string, unknown>, {
    get(_, name: string) {
      if (name in state) return state[name];
      if (name === 'measureText') {
        return (text: string) => {
          calls[name] = (calls[name] ?? 0) + 1;
          return { width: text.length * 6 };
        };
      }
      if (name === 'createRadialGradient' || name === 'createLinearGradient') {
        return () => {
          calls[name] = (calls[name] ?? 0) + 1;
          return { addColorStop: () => undefined };
        };
      }
      return (...args: unknown[]) => {
        calls[name] = (calls[name] ?? 0) + 1;
        if (drawing.has(name)) {
          numericArgs.push({ name, args: args.filter((a): a is number => typeof a === 'number') });
        }
      };
    },
    set(_, name: string, value) {
      (sets[name] ??= []).push(value);
      state[name] = value;
      return true;
    },
  });

  const sprite = { width: 0, height: 0, getContext: () => ctx as unknown as CanvasRenderingContext2D };
  return {
    ctx: ctx as unknown as CanvasRenderingContext2D,
    calls,
    sets,
    numericArgs,
    deps: { createCanvas: () => sprite },
    reset() {
      for (const key of Object.keys(calls)) delete calls[key];
      numericArgs.length = 0;
    },
  };
}

function sceneAt(quality: Quality, size = 340, dpr = 1) {
  const mock = mockContext();
  const scene = createChipScene(mock.ctx, mock.deps);
  scene.setQuality(quality);
  scene.resize(size, size, dpr);
  return { scene, ...mock };
}

describe('chip renderer', () => {
  it.each(QUALITY_ORDER)('draws a frame at %s quality without invalid coordinates', (quality) => {
    const { scene, numericArgs } = sceneAt(quality);
    for (let t = 0; t < 60; t += 0.7) scene.render(t, 1 / 60);
    expect(numericArgs.length).toBeGreaterThan(0);
    for (const { name, args } of numericArgs) {
      for (const value of args) {
        expect(Number.isFinite(value), `${name} got ${value}`).toBe(true);
      }
    }
  });

  it('copes with a tiny and a very large canvas', () => {
    for (const [size, dpr] of [[1, 1], [120, 1], [520, 2]] as const) {
      const { scene } = sceneAt('high', size, dpr);
      expect(() => scene.render(3, 1 / 60)).not.toThrow();
    }
  });

  it('never uses shadow blur, the main cause of the original lag', () => {
    for (const quality of QUALITY_ORDER) {
      const { scene, sets } = sceneAt(quality);
      for (let t = 0; t < 10; t += 0.5) scene.render(t, 1 / 60);
      expect(sets.shadowBlur).toBeUndefined();
      expect(sets.shadowColor).toBeUndefined();
    }
  });

  it('builds no gradients per frame', () => {
    const { scene, calls, reset } = sceneAt('high');
    scene.render(1, 1 / 60);
    reset();
    scene.render(1.02, 1 / 60);
    expect(calls.createRadialGradient ?? 0).toBe(0);
    expect(calls.createLinearGradient ?? 0).toBe(0);
  });

  it('measures each tag label once, not every frame', () => {
    const { scene, calls, reset } = sceneAt('high');
    for (let t = 0; t < 5; t += 0.05) scene.render(t, 1 / 60);
    reset();
    for (let t = 5; t < 5.5; t += 0.05) scene.render(t, 1 / 60);
    // Sizes can still change slowly as tags orbit, but it must be a trickle.
    expect(calls.measureText ?? 0).toBeLessThan(10);
  });

  it('stays within a per-frame stroke budget (the original used about 400)', () => {
    const budgets: Record<Quality, number> = { high: 140, medium: 120, lite: 100 };
    for (const quality of QUALITY_ORDER) {
      const { scene, calls, reset } = sceneAt(quality);
      scene.render(1, 1 / 60);
      reset();
      scene.render(1.5, 1 / 60);
      expect(calls.stroke ?? 0, `${quality} strokes`).toBeLessThan(budgets[quality]);
    }
  });

  it('gets cheaper as quality drops', () => {
    const cost = (quality: Quality) => {
      const { scene, calls, reset } = sceneAt(quality);
      scene.render(1, 1 / 60);
      reset();
      scene.render(1.5, 1 / 60);
      return (calls.stroke ?? 0) + (calls.lineTo ?? 0) + (calls.fillRect ?? 0);
    };
    expect(cost('medium')).toBeLessThan(cost('high'));
    expect(cost('lite')).toBeLessThan(cost('medium'));
  });

  it('redraws glow sprites when the theme colours change', () => {
    const { scene, calls, reset } = sceneAt('high');
    reset();
    scene.setColors({ accent: '1 2 3', accent2: '4 5 6', ink: '7 8 9', surface: '10 11 12' });
    expect(calls.createRadialGradient).toBe(2);
    expect(() => scene.render(1, 1 / 60)).not.toThrow();
  });

  it('tilts with the pointer without producing invalid coordinates', () => {
    const { scene, numericArgs } = sceneAt('high');
    scene.setPointer(1.2, -1.2);
    scene.render(2, 1 / 60);
    expect(numericArgs.every(({ args }) => args.every(Number.isFinite))).toBe(true);
  });

  it('lights random pins using Math.random only for flicker', () => {
    const spy = vi.spyOn(Math, 'random').mockReturnValue(0);
    const { scene } = sceneAt('high');
    expect(() => scene.render(1, 1)).not.toThrow();
    spy.mockRestore();
  });
});

describe('quality selection', () => {
  const base: DeviceInfo = {
    reducedMotion: false,
    saveData: false,
    cores: 8,
    memory: 8,
    coarsePointer: false,
    viewportWidth: 1280,
  };

  it('gives a capable desktop the full effect', () => {
    expect(pickInitialQuality(base)).toBe('high');
  });

  it('is cautious on phones and mid-range devices', () => {
    expect(pickInitialQuality({ ...base, coarsePointer: true, viewportWidth: 390 })).toBe('medium');
    expect(pickInitialQuality({ ...base, viewportWidth: 600 })).toBe('medium');
    expect(pickInitialQuality({ ...base, cores: 4 })).toBe('medium');
    expect(pickInitialQuality({ ...base, memory: 4 })).toBe('medium');
  });

  it('uses the lightest tier for weak devices, data saver and reduced motion', () => {
    expect(pickInitialQuality({ ...base, cores: 2 })).toBe('lite');
    expect(pickInitialQuality({ ...base, memory: 2 })).toBe('lite');
    expect(pickInitialQuality({ ...base, saveData: true })).toBe('lite');
    expect(pickInitialQuality({ ...base, reducedMotion: true })).toBe('lite');
  });

  it('does not guess when the browser hides its hardware details', () => {
    expect(pickInitialQuality({ ...base, cores: undefined, memory: undefined })).toBe('high');
  });

  it('keeps tiers ordered from heavy to light', () => {
    const [high, medium, lite] = QUALITY_ORDER.map((q) => PROFILES[q]);
    expect(high.pixelBudget).toBeGreaterThan(medium.pixelBudget);
    expect(medium.pixelBudget).toBeGreaterThan(lite.pixelBudget);
    expect(high.sparks).toBeGreaterThan(medium.sparks);
    expect(medium.sparks).toBeGreaterThan(lite.sparks);
    expect(lite.fps).toBeLessThanOrEqual(medium.fps);
  });
});

describe('chooseDpr', () => {
  it('never exceeds the pixel budget of the profile', () => {
    for (const quality of QUALITY_ORDER) {
      for (const [w, h, ratio] of [[340, 340, 3], [520, 520, 2], [520, 520, 3], [700, 700, 2]]) {
        const dpr = chooseDpr(w, h, ratio, PROFILES[quality]);
        expect(w * h * dpr * dpr).toBeLessThanOrEqual(Math.max(PROFILES[quality].pixelBudget, w * h) * 1.001);
      }
    }
  });

  it('is sharp on small screens and never blurry below 1', () => {
    expect(chooseDpr(340, 340, 3, PROFILES.medium)).toBeCloseTo(1.5, 5);
    expect(chooseDpr(2000, 2000, 2, PROFILES.lite)).toBe(1);
    expect(chooseDpr(340, 340, 0, PROFILES.high)).toBe(1);
  });
});
