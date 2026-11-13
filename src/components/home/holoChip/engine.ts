/**
 * Renderer for the hero's rotating 3D microcontroller hologram.
 *
 * The look is unchanged from the original canvas version; the cost is not. The
 * old renderer spent nearly all of its time on things that are slow on phones:
 *
 *  - `shadowBlur` on every glow (the browser blurs an offscreen copy per call)
 *  - ~400 tiny stroked paths per frame (96-segment rings, 22-segment trails)
 *  - a fresh gradient and `measureText` call per element per frame
 *  - 60 fps at up to 2x pixel density on every device
 *
 * This version never sets `shadowBlur`: glows are drawn from small pre-rendered
 * sprites. Strokes are batched (a whole ring half is one path), 3D maths uses a
 * single combined matrix per object instead of trigonometry per point, text
 * widths are cached, and the amount of detail is a quality profile that the
 * component can lower at runtime when the device cannot keep up.
 */

export type Quality = "high" | "medium" | "lite";

export interface QualityProfile {
  /** Upper bound on canvas backing-store pixels (width x height x dpr^2). */
  pixelBudget: number;
  dprCap: number;
  sparks: number;
  ringSteps: number;
  /** Points in each electron's comet trail. */
  trail: number;
  tags: boolean;
  shockRings: number;
  shockSteps: number;
  /** Floor grid lines on each side of the centre line. */
  gridHalf: number;
  fps: number;
}

export const PROFILES: Record<Quality, QualityProfile> = {
  high: {
    pixelBudget: 1_100_000,
    dprCap: 2,
    sparks: 40,
    ringSteps: 72,
    trail: 14,
    tags: true,
    shockRings: 3,
    shockSteps: 56,
    gridHalf: 5,
    fps: 60,
  },
  medium: {
    pixelBudget: 520_000,
    dprCap: 1.5,
    sparks: 16,
    ringSteps: 56,
    trail: 9,
    tags: true,
    shockRings: 2,
    shockSteps: 40,
    gridHalf: 4,
    fps: 60,
  },
  lite: {
    pixelBudget: 260_000,
    dprCap: 1.25,
    sparks: 8,
    ringSteps: 44,
    trail: 6,
    tags: true,
    shockRings: 2,
    shockSteps: 32,
    gridHalf: 3,
    fps: 30,
  },
};

export const QUALITY_ORDER: Quality[] = ["high", "medium", "lite"];

export interface DeviceInfo {
  reducedMotion: boolean;
  saveData: boolean;
  /** navigator.hardwareConcurrency, when the browser reports it. */
  cores: number | undefined;
  /** navigator.deviceMemory in GB, when the browser reports it. */
  memory: number | undefined;
  coarsePointer: boolean;
  viewportWidth: number;
}

/** First guess only; the component lowers quality if frames are late. */
export function pickInitialQuality(device: DeviceInfo): Quality {
  if (device.reducedMotion || device.saveData) return "lite";
  const veryWeak =
    (device.cores !== undefined && device.cores <= 2) ||
    (device.memory !== undefined && device.memory <= 2);
  if (veryWeak) return "lite";
  const modest =
    (device.cores !== undefined && device.cores <= 4) ||
    (device.memory !== undefined && device.memory <= 4);
  if (modest || device.coarsePointer || device.viewportWidth < 700) return "medium";
  return "high";
}

/** Backing-store scale that respects both the device and the profile's pixel budget. */
export function chooseDpr(
  cssWidth: number,
  cssHeight: number,
  devicePixelRatio: number,
  profile: QualityProfile,
): number {
  const area = Math.max(1, cssWidth * cssHeight);
  const byBudget = Math.sqrt(profile.pixelBudget / area);
  return Math.max(1, Math.min(devicePixelRatio || 1, profile.dprCap, byBudget));
}

export interface SceneColors {
  /** Space-separated "R G B" channels, as stored in the theme CSS variables. */
  accent: string;
  accent2: string;
  ink: string;
  surface: string;
}

interface SpriteCanvas {
  width: number;
  height: number;
  getContext(type: "2d"): CanvasRenderingContext2D | null;
}

export interface SceneDeps {
  createCanvas(width: number, height: number): SpriteCanvas;
}

export interface ChipScene {
  setQuality(quality: Quality): void;
  setColors(colors: SceneColors): void;
  /** CSS-pixel size of the canvas and the backing-store scale already applied to it. */
  resize(width: number, height: number, dpr: number): void;
  setPointer(x: number, y: number): void;
  render(time: number, dt: number): void;
}

// ---- geometry -------------------------------------------------------------

const D = 560; // camera distance
const FOV = 560;
const HX = 62; // chip half-size (x / z)
const HY = 9; // chip half-thickness
const FLOOR = -78;
const PINS = 10;
const TAGS = ["I2C", "SPI", "UART", "PWM", "ADC", "GPIO", "CAN", "USB"];
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const MAX_SPARKS = 44;
const TWO_PI = Math.PI * 2;

type Mat = number[]; // 3x3, row-major

function rotX(a: number): Mat {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [1, 0, 0, 0, c, -s, 0, s, c];
}
function rotY(a: number): Mat {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [c, 0, s, 0, 1, 0, -s, 0, c];
}
function mul(a: Mat, b: Mat): Mat {
  const out = new Array<number>(9);
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      out[i * 3 + j] =
        a[i * 3] * b[j] + a[i * 3 + 1] * b[3 + j] + a[i * 3 + 2] * b[6 + j];
    }
  }
  return out;
}

interface Pt {
  x: number;
  y: number;
  z: number;
  f: number;
}

interface Face {
  n: [number, number, number];
  pts: [number, number, number][];
  centre: [number, number, number];
  top: boolean;
}

function buildFaces(): Face[] {
  const make = (
    n: [number, number, number],
    pts: [number, number, number][],
  ): Face => ({
    n,
    pts,
    centre: [
      pts.reduce((s, p) => s + p[0], 0) / 4,
      pts.reduce((s, p) => s + p[1], 0) / 4,
      pts.reduce((s, p) => s + p[2], 0) / 4,
    ],
    top: n[1] === 1,
  });
  return [
    make([0, 1, 0], [[-HX, HY, -HX], [HX, HY, -HX], [HX, HY, HX], [-HX, HY, HX]]),
    make([1, 0, 0], [[HX, -HY, -HX], [HX, -HY, HX], [HX, HY, HX], [HX, HY, -HX]]),
    make([-1, 0, 0], [[-HX, -HY, -HX], [-HX, -HY, HX], [-HX, HY, HX], [-HX, HY, -HX]]),
    make([0, 0, 1], [[-HX, -HY, HX], [HX, -HY, HX], [HX, HY, HX], [-HX, HY, HX]]),
    make([0, 0, -1], [[-HX, -HY, -HX], [HX, -HY, -HX], [HX, HY, -HX], [-HX, HY, -HX]]),
  ];
}

/** Pin endpoints in chip space: [ax, az, bx, bz] per pin, 4 sides x PINS. */
function buildPins(): Float64Array {
  const out = new Float64Array(PINS * 4 * 4);
  let o = 0;
  for (let side = 0; side < 4; side += 1) {
    for (let i = 0; i < PINS; i += 1) {
      const along = -52 + i * (104 / (PINS - 1));
      const sign = side % 2 === 0 ? 1 : -1;
      if (side < 2) {
        out[o++] = sign * HX;
        out[o++] = along;
        out[o++] = sign * (HX + 15);
        out[o++] = along;
      } else {
        out[o++] = along;
        out[o++] = sign * HX;
        out[o++] = along;
        out[o++] = sign * (HX + 15);
      }
    }
  }
  return out;
}

interface RingBuf {
  x: Float32Array;
  y: Float32Array;
  z: Float32Array;
}

const rgb = (channels: string, alpha: number) =>
  `rgb(${channels} / ${Math.max(0, Math.min(1, alpha))})`;

export function createChipScene(ctx: CanvasRenderingContext2D, deps: SceneDeps): ChipScene {
  let width = 1;
  let height = 1;
  let dpr = 1;
  let k = 1; // world -> pixel scale
  let profile = PROFILES.high;
  let colors: SceneColors = {
    accent: "232 126 54",
    accent2: "245 180 82",
    ink: "178 183 193",
    surface: "17 20 25",
  };
  const pointer = { x: 0, y: 0 };
  const cam = { yaw: 0, pitch: -0.42 };
  const pinFlash = new Float32Array(PINS * 4);

  const faces = buildFaces();
  const pinGeometry = buildPins();

  // Per-quality scratch buffers.
  let ringCos = new Float64Array(0);
  let ringSin = new Float64Array(0);
  let ringA: RingBuf = { x: new Float32Array(0), y: new Float32Array(0), z: new Float32Array(0) };
  let ringB: RingBuf = { x: new Float32Array(0), y: new Float32Array(0), z: new Float32Array(0) };
  let shockCos = new Float64Array(0);
  let shockSin = new Float64Array(0);

  const sparkAngle = new Float64Array(MAX_SPARKS);
  const sparkRadius = new Float64Array(MAX_SPARKS);
  const sparkSpeed = new Float64Array(MAX_SPARKS);
  const sparkPhase = new Float64Array(MAX_SPARKS);
  const sparkTone = new Uint8Array(MAX_SPARKS);
  for (let i = 0; i < MAX_SPARKS; i += 1) {
    sparkAngle[i] = (i * 2.399) % TWO_PI;
    sparkRadius[i] = 38 + ((i * 53) % 130);
    sparkSpeed[i] = 18 + ((i * 7) % 26);
    sparkPhase[i] = (i * 0.173) % 1;
    sparkTone[i] = i % 4 === 0 ? 1 : 0;
  }
  const sparkX = new Float32Array(MAX_SPARKS);
  const sparkY = new Float32Array(MAX_SPARKS);
  const sparkZ = new Float32Array(MAX_SPARKS);
  const sparkF = new Float32Array(MAX_SPARKS);
  const sparkFade = new Float32Array(MAX_SPARKS);

  const tagX = new Float32Array(TAGS.length);
  const tagY = new Float32Array(TAGS.length);
  const tagZ = new Float32Array(TAGS.length);
  const tagF = new Float32Array(TAGS.length);
  const tagWidths = new Map<string, number>();

  let glowAccent: SpriteCanvas | null = null;
  let glowAccent2: SpriteCanvas | null = null;
  let scanGradient: CanvasGradient | null = null;

  const scratchA: Pt = { x: 0, y: 0, z: 0, f: 1 };
  const scratchB: Pt = { x: 0, y: 0, z: 0, f: 1 };
  const scratchC: Pt = { x: 0, y: 0, z: 0, f: 1 };

  // ---- setup ---------------------------------------------------------------

  function makeGlow(channels: string): SpriteCanvas {
    const size = 96;
    const canvas = deps.createCanvas(size, size);
    const g = canvas.getContext("2d");
    if (g) {
      const gradient = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      gradient.addColorStop(0, rgb(channels, 1));
      gradient.addColorStop(0.22, rgb(channels, 0.55));
      gradient.addColorStop(0.55, rgb(channels, 0.14));
      gradient.addColorStop(1, rgb(channels, 0));
      g.fillStyle = gradient;
      g.fillRect(0, 0, size, size);
    }
    return canvas;
  }

  function buildTables() {
    const steps = profile.ringSteps;
    ringCos = new Float64Array(steps + 1);
    ringSin = new Float64Array(steps + 1);
    for (let s = 0; s <= steps; s += 1) {
      ringCos[s] = Math.cos((s / steps) * TWO_PI);
      ringSin[s] = Math.sin((s / steps) * TWO_PI);
    }
    const make = (): RingBuf => ({
      x: new Float32Array(steps + 1),
      y: new Float32Array(steps + 1),
      z: new Float32Array(steps + 1),
    });
    ringA = make();
    ringB = make();

    const shock = profile.shockSteps;
    shockCos = new Float64Array(shock + 1);
    shockSin = new Float64Array(shock + 1);
    for (let s = 0; s <= shock; s += 1) {
      shockCos[s] = Math.cos((s / shock) * TWO_PI);
      shockSin[s] = Math.sin((s / shock) * TWO_PI);
    }
  }

  // ---- projection ----------------------------------------------------------

  function project(m: Mat, x: number, y: number, z: number, out: Pt): Pt {
    const vx = m[0] * x + m[1] * y + m[2] * z;
    const vy = m[3] * x + m[4] * y + m[5] * z;
    const vz = m[6] * x + m[7] * y + m[8] * z;
    const f = FOV / (vz + D);
    out.x = width / 2 + vx * f * k;
    out.y = height * 0.52 - vy * f * k;
    out.z = vz;
    out.f = f;
    return out;
  }

  /** Point on a ring (radius r, angle theta) using that ring's combined matrix. */
  function ringPoint(m: Mat, radius: number, theta: number, out: Pt): Pt {
    return project(m, Math.cos(theta) * radius, 0, Math.sin(theta) * radius, out);
  }

  function fillRing(buf: RingBuf, m: Mat, radius: number) {
    const steps = profile.ringSteps;
    for (let s = 0; s <= steps; s += 1) {
      const c = ringCos[s] * radius;
      const sn = ringSin[s] * radius;
      const vx = c * m[0] + sn * m[2];
      const vy = c * m[3] + sn * m[5];
      const vz = c * m[6] + sn * m[8];
      const f = FOV / (vz + D);
      buf.x[s] = width / 2 + vx * f * k;
      buf.y[s] = height * 0.52 - vy * f * k;
      buf.z[s] = vz;
    }
  }

  // ---- drawing -------------------------------------------------------------

  function glow(sprite: SpriteCanvas | null, x: number, y: number, radius: number, alpha: number) {
    if (!sprite || radius <= 0.5 || alpha <= 0.01) return;
    ctx.globalAlpha = Math.min(1, alpha);
    ctx.drawImage(sprite as unknown as CanvasImageSource, x - radius, y - radius, radius * 2, radius * 2);
    ctx.globalAlpha = 1;
  }

  function drawFloor(view: Mat, time: number) {
    const centre = project(view, 0, FLOOR, 0, scratchA);
    glow(glowAccent, centre.x, centre.y, 200 * k, 0.3);

    // Grid: lines at the same distance from the centre share a fade, so each
    // distance is one stroked path.
    ctx.lineWidth = 1;
    const ext = 200;
    const a = scratchA;
    const b = scratchB;
    for (let j = 0; j <= profile.gridHalf; j += 1) {
      const o = j * 40;
      const fade = Math.max(0, 1 - o / (ext + 10));
      ctx.strokeStyle = rgb(colors.accent, 0.03 + fade * 0.22);
      ctx.beginPath();
      const offsets = j === 0 ? [0] : [o, -o];
      for (const offset of offsets) {
        project(view, offset, FLOOR, -ext, a);
        ctx.moveTo(a.x, a.y);
        project(view, offset, FLOOR, ext, b);
        ctx.lineTo(b.x, b.y);
        project(view, -ext, FLOOR, offset, a);
        ctx.moveTo(a.x, a.y);
        project(view, ext, FLOOR, offset, b);
        ctx.lineTo(b.x, b.y);
      }
      ctx.stroke();
    }

    // Shock-wave rings.
    ctx.lineWidth = 2;
    const rings = profile.shockRings;
    for (let w = 0; w < rings; w += 1) {
      const phase = (((time * 0.42 + w / rings) % 1) + 1) % 1;
      const radius = 30 + phase * 190;
      ctx.strokeStyle = rgb(colors.accent, (1 - phase) * 0.55);
      ctx.beginPath();
      for (let s = 0; s <= profile.shockSteps; s += 1) {
        project(view, shockCos[s] * radius, FLOOR, shockSin[s] * radius, a);
        if (s === 0) ctx.moveTo(a.x, a.y);
        else ctx.lineTo(a.x, a.y);
      }
      ctx.stroke();
    }
  }

  /** Strokes the half of a ring that is behind (or in front of) the chip as one path. */
  function strokeRingHalf(buf: RingBuf, channels: string, pass: "back" | "front") {
    const wantBack = pass === "back";
    ctx.lineWidth = 1.3;
    ctx.strokeStyle = rgb(channels, wantBack ? 0.14 : 0.42);
    ctx.beginPath();
    let pen = false;
    for (let s = 1; s <= profile.ringSteps; s += 1) {
      const isBack = (buf.z[s - 1] + buf.z[s]) / 2 > 0;
      if (isBack === wantBack) {
        if (!pen) {
          ctx.moveTo(buf.x[s - 1], buf.y[s - 1]);
          pen = true;
        }
        ctx.lineTo(buf.x[s], buf.y[s]);
      } else {
        pen = false;
      }
    }
    ctx.stroke();
  }

  const trailX = new Float32Array(32);
  const trailY = new Float32Array(32);

  function drawElectron(
    m: Mat,
    radius: number,
    theta: number,
    channels: string,
    sprite: SpriteCanvas | null,
    pass: "back" | "front",
  ) {
    const head = ringPoint(m, radius, theta, scratchC);
    const isBack = head.z > 0;
    if ((pass === "back") !== isBack) return;
    const hx = head.x;
    const hy = head.y;
    const hf = head.f;

    // Comet trail as three tapering strokes rather than one per segment.
    const n = Math.min(profile.trail, trailX.length - 1);
    const span = 0.99;
    trailX[0] = hx;
    trailY[0] = hy;
    for (let i = 1; i <= n; i += 1) {
      const p = ringPoint(m, radius, theta - (i * span) / n, scratchB);
      trailX[i] = p.x;
      trailY[i] = p.y;
    }
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (let g = 0; g < 3; g += 1) {
      const from = Math.floor((g * n) / 3);
      const to = Math.floor(((g + 1) * n) / 3);
      if (to <= from) continue;
      const mid = (g + 0.5) / 3;
      ctx.lineWidth = Math.max(0.8, 3.6 * (1 - mid) * hf);
      ctx.strokeStyle = rgb(channels, (1 - mid) * (isBack ? 0.45 : 0.9));
      ctx.beginPath();
      ctx.moveTo(trailX[from], trailY[from]);
      for (let i = from + 1; i <= to; i += 1) ctx.lineTo(trailX[i], trailY[i]);
      ctx.stroke();
    }

    glow(sprite, hx, hy, 17 * hf * k * 1.6, isBack ? 0.55 : 0.95);
    ctx.fillStyle = rgb(channels, isBack ? 0.7 : 1);
    ctx.beginPath();
    ctx.arc(hx, hy, 4 * hf * k * 1.6, 0, TWO_PI);
    ctx.fill();
  }

  function updateSparks(view: Mat, time: number) {
    const count = Math.min(profile.sparks, MAX_SPARKS);
    for (let i = 0; i < count; i += 1) {
      const life = ((((time * sparkSpeed[i]) / 150 + sparkPhase[i]) % 1) + 1) % 1;
      const y = FLOOR + life * 190;
      const a = sparkAngle[i] + time * 0.15;
      const p = project(view, Math.cos(a) * sparkRadius[i], y, Math.sin(a) * sparkRadius[i], scratchA);
      sparkX[i] = p.x;
      sparkY[i] = p.y;
      sparkZ[i] = p.z;
      sparkF[i] = p.f;
      sparkFade[i] = Math.sin(life * Math.PI);
    }
  }

  function drawSparks(pass: "back" | "front") {
    const count = Math.min(profile.sparks, MAX_SPARKS);
    const wantBack = pass === "back";
    let tone = -1;
    for (let i = 0; i < count; i += 1) {
      const isBack = sparkZ[i] > 0;
      if (isBack !== wantBack) continue;
      if (sparkTone[i] !== tone) {
        tone = sparkTone[i];
        ctx.fillStyle = rgb(tone === 1 ? colors.accent2 : colors.accent, 1);
      }
      ctx.globalAlpha = Math.max(0, sparkFade[i] * (isBack ? 0.45 : 0.95));
      const size = Math.max(1.6, 3.4 * sparkF[i] * k);
      ctx.fillRect(sparkX[i] - size / 2, sparkY[i] - size / 2, size, size);
    }
    ctx.globalAlpha = 1;
  }

  function updateTags(time: number) {
    if (!profile.tags) return;
    const tilt = 1.1 + 0.12 * Math.sin(time * 0.4);
    const m = mul(currentView, mul(rotY(time * 0.12), rotX(tilt)));
    for (let i = 0; i < TAGS.length; i += 1) {
      const theta = time * 0.28 + (i / TAGS.length) * TWO_PI;
      const p = ringPoint(m, 172, theta, scratchA);
      tagX[i] = p.x;
      tagY[i] = p.y;
      tagZ[i] = p.z;
      tagF[i] = p.f;
    }
  }

  let lastFont = "";
  function drawTags(pass: "back" | "front") {
    if (!profile.tags) return;
    const wantBack = pass === "back";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 1;
    for (let i = 0; i < TAGS.length; i += 1) {
      const isBack = tagZ[i] > 0;
      if (isBack !== wantBack) continue;
      const size = Math.max(7, Math.round(10.5 * tagF[i] * k * 1.5));
      const font = `600 ${size}px ${MONO}`;
      if (font !== lastFont) {
        ctx.font = font;
        lastFont = font;
      }
      const key = `${TAGS[i]}|${size}`;
      let textWidth = tagWidths.get(key);
      if (textWidth === undefined) {
        textWidth = ctx.measureText(TAGS[i]).width;
        tagWidths.set(key, textWidth);
      }
      const w = textWidth + 10 * tagF[i];
      const a = isBack ? 0.32 : 0.95;
      ctx.fillStyle = rgb(colors.surface, 0.8 * (isBack ? 0.5 : 1));
      ctx.strokeStyle = rgb(colors.accent, a * 0.6);
      ctx.beginPath();
      ctx.rect(tagX[i] - w / 2, tagY[i] - size * 0.8, w, size * 1.6);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = rgb(i % 3 === 0 ? colors.accent2 : colors.accent, a);
      ctx.fillText(TAGS[i], tagX[i], tagY[i] + 0.5);
    }
  }

  function drawPins(chipMat: Mat, pass: "back" | "front") {
    const wantBack = pass === "back";
    const a = scratchA;
    const b = scratchB;
    const baseWidth = Math.max(1.4, 5.6 * k);
    ctx.lineCap = "butt";

    // Unlit pins: one path per pass.
    ctx.lineWidth = baseWidth;
    ctx.strokeStyle = rgb(colors.ink, wantBack ? 0.22 : 0.5);
    ctx.beginPath();
    for (let p = 0; p < PINS * 4; p += 1) {
      if (pinFlash[p] > 0.05) continue;
      const o = p * 4;
      project(chipMat, pinGeometry[o], 0, pinGeometry[o + 1], a);
      project(chipMat, pinGeometry[o + 2], 0, pinGeometry[o + 3], b);
      if (((a.z + b.z) / 2 > 0) !== wantBack) continue;
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
    }
    ctx.stroke();

    // Lit pins (only a few at a time): a soft wide stroke under a bright one.
    for (let p = 0; p < PINS * 4; p += 1) {
      const lit = pinFlash[p];
      if (lit <= 0.05) continue;
      const o = p * 4;
      project(chipMat, pinGeometry[o], 0, pinGeometry[o + 1], a);
      project(chipMat, pinGeometry[o + 2], 0, pinGeometry[o + 3], b);
      if (((a.z + b.z) / 2 > 0) !== wantBack) continue;
      if (lit > 0.3) {
        ctx.lineWidth = baseWidth * 2.6;
        ctx.strokeStyle = rgb(colors.accent, 0.22 * lit);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      ctx.lineWidth = baseWidth;
      ctx.strokeStyle = rgb(colors.accent, 0.5 + lit * 0.5);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  }

  function drawChip(chipMat: Mat, time: number) {
    const pulse = 0.5 + 0.5 * Math.sin(time * 2.2);

    // Soft glow behind the whole chip, replacing the per-face shadow blur.
    const c = project(chipMat, 0, 0, 0, scratchA);
    glow(glowAccent, c.x, c.y, 118 * k, 0.34 + pulse * 0.1);

    const visible: { face: Face; depth: number }[] = [];
    for (const face of faces) {
      const nx = chipMat[0] * face.n[0] + chipMat[1] * face.n[1] + chipMat[2] * face.n[2];
      const ny = chipMat[3] * face.n[0] + chipMat[4] * face.n[1] + chipMat[5] * face.n[2];
      const nz = chipMat[6] * face.n[0] + chipMat[7] * face.n[1] + chipMat[8] * face.n[2];
      const cx = chipMat[0] * face.centre[0] + chipMat[1] * face.centre[1] + chipMat[2] * face.centre[2];
      const cy = chipMat[3] * face.centre[0] + chipMat[4] * face.centre[1] + chipMat[5] * face.centre[2];
      const cz = chipMat[6] * face.centre[0] + chipMat[7] * face.centre[1] + chipMat[8] * face.centre[2];
      if (nx * cx + ny * cy + nz * (cz + D) < 0) visible.push({ face, depth: cz });
    }
    visible.sort((p, q) => q.depth - p.depth);

    for (const { face } of visible) {
      ctx.fillStyle = rgb(colors.surface, face.top ? 0.97 : 0.93);
      ctx.lineJoin = "round";
      ctx.beginPath();
      for (let i = 0; i < 4; i += 1) {
        const p = project(chipMat, face.pts[i][0], face.pts[i][1], face.pts[i][2], scratchA);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.fill();
      // Edge glow: a wide translucent stroke under the crisp one stands in for
      // the old shadow blur at a fraction of the cost.
      ctx.lineWidth = face.top ? 9 + pulse * 4 : 6;
      ctx.strokeStyle = rgb(colors.accent, face.top ? 0.2 + pulse * 0.07 : 0.14);
      ctx.stroke();
      ctx.lineWidth = face.top ? 2 : 1.4;
      ctx.strokeStyle = rgb(colors.accent, 0.95);
      ctx.stroke();
      if (face.top) drawTopArtwork(chipMat, pulse, time);
    }
  }

  /** Draws in the top face's own coordinate system so the artwork turns with the chip. */
  function drawTopArtwork(chipMat: Mat, pulse: number, time: number) {
    const o = project(chipMat, 0, HY, 0, scratchA);
    const ox = o.x;
    const oy = o.y;
    const pu = project(chipMat, 10, HY, 0, scratchB);
    const ux = (pu.x - ox) / 10;
    const uy = (pu.y - oy) / 10;
    const pv = project(chipMat, 0, HY, -10, scratchC);
    const vx = (pv.x - ox) / 10;
    const vy = (pv.y - oy) / 10;

    ctx.save();
    ctx.setTransform(dpr * ux, dpr * uy, dpr * vx, dpr * vy, dpr * ox, dpr * oy);

    // Core glow.
    glow(glowAccent, 0, 0, 56, 0.5 + pulse * 0.25);

    // Die outline and tiny circuitry.
    ctx.lineWidth = 0.9;
    ctx.strokeStyle = rgb(colors.ink, 0.3);
    ctx.strokeRect(-34, -34, 68, 68);
    ctx.strokeStyle = rgb(colors.accent, 0.35);
    ctx.beginPath();
    for (let i = -3; i <= 3; i += 1) {
      ctx.moveTo(-34, i * 9);
      ctx.lineTo(-44, i * 9);
      ctx.moveTo(34, i * 9);
      ctx.lineTo(44, i * 9);
      ctx.moveTo(i * 9, -34);
      ctx.lineTo(i * 9, -44);
      ctx.moveTo(i * 9, 34);
      ctx.lineTo(i * 9, 44);
    }
    ctx.stroke();

    // Pin-1 dot.
    ctx.fillStyle = rgb(colors.accent, 1);
    ctx.beginPath();
    ctx.arc(-HX + 8, -HX + 8, 2.6, 0, TWO_PI);
    ctx.fill();

    // Scan-line sweeping across the die. The gradient is built once and moved
    // with a translate instead of being rebuilt every frame.
    if (scanGradient) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(-HX, -HX, HX * 2, HX * 2);
      ctx.clip();
      const sweep = (((time * 0.55) % 1) + 1) % 1;
      ctx.translate(-HX - 20 + sweep * (HX * 2 + 40), 0);
      ctx.fillStyle = scanGradient;
      ctx.fillRect(-22, -HX, 44, HX * 2);
      ctx.restore();
    }

    // Label.
    glow(glowAccent, 0, -3, 30, 0.28);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `800 19px ${MONO}`;
    ctx.fillStyle = rgb(colors.accent, 1);
    ctx.fillText("PX-1", 0, -3);
    ctx.font = `7px ${MONO}`;
    ctx.fillStyle = rgb(colors.ink, 0.65);
    ctx.fillText("32-BIT · 3V3", 0, 13);
    lastFont = "";
    ctx.restore();
  }

  // ---- frame ---------------------------------------------------------------

  let currentView: Mat = rotY(0);

  function render(time: number, dt: number) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.lineJoin = "round";
    lastFont = "";

    for (let i = 0; i < pinFlash.length; i += 1) {
      pinFlash[i] = Math.max(0, pinFlash[i] - dt * 2.4);
    }
    if (Math.random() < dt * 9) {
      pinFlash[Math.floor(Math.random() * pinFlash.length)] = 1;
    }

    cam.yaw = pointer.x * 0.35;
    cam.pitch = -0.42 + pointer.y * 0.12 + Math.sin(time * 0.5) * 0.035;
    currentView = mul(rotX(cam.pitch), rotY(cam.yaw));
    const chipMat = mul(currentView, rotY(time * 0.5));

    const matA = mul(currentView, mul(rotY(time * 0.35), rotX(1.0)));
    const matB = mul(currentView, mul(rotY(-time * 0.28), rotX(-0.85)));
    fillRing(ringA, matA, 112);
    fillRing(ringB, matB, 146);
    updateSparks(currentView, time);
    updateTags(time);

    const e1 = time * 1.5;
    const e2 = -time * 1.1;

    drawFloor(currentView, time);

    // Everything farther than the chip first...
    strokeRingHalf(ringA, colors.accent, "back");
    strokeRingHalf(ringB, colors.accent2, "back");
    drawSparks("back");
    drawTags("back");
    drawElectron(matA, 112, e1, colors.accent, glowAccent, "back");
    drawElectron(matA, 112, e1 + Math.PI, colors.accent, glowAccent, "back");
    drawElectron(matB, 146, e2, colors.accent2, glowAccent2, "back");
    drawElectron(matB, 146, e2 + 2.1, colors.accent2, glowAccent2, "back");
    drawElectron(matB, 146, e2 + 4.2, colors.accent2, glowAccent2, "back");
    drawPins(chipMat, "back");

    drawChip(chipMat, time);

    // ...then everything nearer.
    drawPins(chipMat, "front");
    strokeRingHalf(ringA, colors.accent, "front");
    strokeRingHalf(ringB, colors.accent2, "front");
    drawElectron(matA, 112, e1, colors.accent, glowAccent, "front");
    drawElectron(matA, 112, e1 + Math.PI, colors.accent, glowAccent, "front");
    drawElectron(matB, 146, e2, colors.accent2, glowAccent2, "front");
    drawElectron(matB, 146, e2 + 2.1, colors.accent2, glowAccent2, "front");
    drawElectron(matB, 146, e2 + 4.2, colors.accent2, glowAccent2, "front");
    drawSparks("front");
    drawTags("front");
  }

  function setColors(next: SceneColors) {
    colors = next;
    glowAccent = makeGlow(colors.accent);
    glowAccent2 = makeGlow(colors.accent2);
    const g = ctx.createLinearGradient(-22, 0, 22, 0);
    g.addColorStop(0, rgb(colors.accent2, 0));
    g.addColorStop(0.5, rgb(colors.accent2, 0.55));
    g.addColorStop(1, rgb(colors.accent2, 0));
    scanGradient = g;
  }

  buildTables();
  setColors(colors);

  return {
    setQuality(quality) {
      profile = PROFILES[quality];
      buildTables();
    },
    setColors,
    resize(w, h, scale) {
      width = Math.max(1, w);
      height = Math.max(1, h);
      dpr = scale;
      k = Math.min(width, height) / 470;
    },
    setPointer(x, y) {
      pointer.x = x;
      pointer.y = y;
    },
    render,
  };
}
