/**
 * The demo code pattern, ported from the app (src/shared/QrCodeView.tsx and
 * src/domain/rules/tempel.ts). It is deliberately not an encoded QR code: no app can scan it,
 * and it cannot bind an account or a device.
 *
 * The only change from the app is the output format: runs of dark modules in a row are merged
 * into one rectangle, which draws the same pattern with a much shorter path.
 */

const MODULES = 25;
const QUIET = 2;

/** Width and height of the pattern in modules, quiet zone included. */
export const QR_SIZE = MODULES + QUIET * 2;

function prng(seed: string) {
  let hash = 2166136261;
  for (const char of seed) {
    hash ^= char.codePointAt(0) ?? 0;
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  let state = hash || 1;
  return () => {
    // mulberry32
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function isFinder(x: number, y: number): boolean {
  const inBox = (ox: number, oy: number) => x >= ox && x < ox + 7 && y >= oy && y < oy + 7;
  return inBox(0, 0) || inBox(MODULES - 7, 0) || inBox(0, MODULES - 7);
}

function finderDark(x: number, y: number): boolean {
  const local = (ox: number, oy: number) => {
    const lx = x - ox;
    const ly = y - oy;
    const ring = lx === 0 || lx === 6 || ly === 0 || ly === 6;
    const core = lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4;
    return ring || core;
  };
  if (x < 7 && y < 7) return local(0, 0);
  if (x >= MODULES - 7 && y < 7) return local(MODULES - 7, 0);
  return local(0, MODULES - 7);
}

function nearFinder(x: number, y: number): boolean {
  const near = (ox: number, oy: number) => x >= ox - 1 && x <= ox + 7 && y >= oy - 1 && y <= oy + 7;
  return near(0, 0) || near(MODULES - 7, 0) || near(0, MODULES - 7);
}

/** Deterministic demo code for a window: same window, same pattern; next window, new pattern. */
export function qrSeed(owner: string, window: number): string {
  let hash = 2166136261;
  for (const char of `${owner}:${String(window)}`) {
    hash ^= char.codePointAt(0) ?? 0;
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return `demo-${hash.toString(16).padStart(8, '0')}`;
}

/** Path data of the dark modules for `seed`: deterministic, and different for every seed. */
export function qrPath(seed: string): string {
  const random = prng(seed);
  const parts: string[] = [];
  for (let y = 0; y < MODULES; y += 1) {
    let runStart = -1;
    for (let x = 0; x <= MODULES; x += 1) {
      let dark = false;
      if (x < MODULES) {
        // The same decision order as the app, so the random sequence lines up module by module.
        if (isFinder(x, y)) dark = finderDark(x, y);
        else if (nearFinder(x, y)) dark = false;
        else if (x === 6 || y === 6) dark = (x + y) % 2 === 0;
        else dark = random() > 0.52;
      }
      if (dark && runStart < 0) runStart = x;
      if (!dark && runStart >= 0) {
        const length = x - runStart;
        parts.push(
          `M${String(runStart + QUIET)} ${String(y + QUIET)}h${String(length)}v1h-${String(length)}z`,
        );
        runStart = -1;
      }
    }
  }
  return parts.join('');
}
