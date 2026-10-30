// Measures WCAG 2.2 contrast for every colour pairing the landing renders, in both themes, using
// the values in src/app/tokens.css (so the check follows the tokens that actually ship). Fails
// when a pair is below its minimum: 4.5:1 for text, 3:1 for control boundaries and focus rings.
// Usage: node scripts/check-contrast.mjs
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const css = readFileSync(fileURLToPath(new URL('../src/app/tokens.css', import.meta.url)), 'utf8');

/** Custom properties declared directly inside `block`. */
function declarations(block) {
  const values = {};
  for (const match of block.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    values[match[1]] = match[2].replace(/\/\*.*?\*\//g, '').trim();
  }
  return values;
}

/** The body of the first `:root { ... }` after `start`, braces balanced. */
function rootBlock(from) {
  const open = css.indexOf('{', css.indexOf(':root', from));
  let depth = 0;
  for (let i = open; i < css.length; i += 1) {
    if (css[i] === '{') depth += 1;
    if (css[i] === '}') depth -= 1;
    if (depth === 0) return css.slice(open + 1, i);
  }
  throw new Error('Unbalanced braces in tokens.css');
}

const light = declarations(rootBlock(0));
const dark = { ...light, ...declarations(rootBlock(css.indexOf('prefers-color-scheme: dark'))) };

function resolve(theme, name, seen = new Set()) {
  const value = theme[name];
  if (value === undefined) throw new Error(`Unknown token ${name}`);
  const reference = value.match(/^var\((--[\w-]+)\)$/);
  if (!reference) return value;
  if (seen.has(name)) throw new Error(`Circular token ${name}`);
  seen.add(name);
  return resolve(theme, reference[1], seen);
}

function luminance(hex) {
  const match = hex.match(/^#([0-9a-f]{6})$/i);
  if (!match) throw new Error(`Not a solid hex colour: ${hex}`);
  const channels = [0, 2, 4].map((i) => parseInt(match[1].slice(i, i + 2), 16) / 255);
  const [r, g, b] = channels.map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(fg, bg) {
  const [a, b] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}

/**
 * The see-through capsule (`--color-surface-glass`, a color-mix of a surface with transparent) as
 * it looks over `behind`: the share of the surface comes from the token itself, so the check
 * follows what ships. The blur behind it only ever softens what passes underneath.
 */
function glassOver(theme, behind) {
  const value = theme['--color-surface-glass'];
  const match = value.match(
    /^color-mix\(in srgb, var\((--[\w-]+)\) (\d+(?:\.\d+)?)%, transparent\)$/,
  );
  if (!match) throw new Error(`Unexpected --color-surface-glass: ${value}`);
  const share = Number(match[2]) / 100;
  const [top, bottom] = [resolve(theme, match[1]), resolve(theme, behind)].map((hex) =>
    [0, 2, 4].map((i) => parseInt(hex.slice(1 + i, 3 + i), 16)),
  );
  const mixed = top.map((channel, i) => Math.round(channel * share + bottom[i] * (1 - share)));
  return `#${mixed.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`;
}

/**
 * The floating header over the worst page underneath it: the darkest ink in the light theme, and
 * in the dark theme the code panel, which stays light (`--color-code-surface`).
 */
const GLASS = { light: '--color-code-ink', dark: '--color-code-surface' };

const TEXT = 4.5;
const NON_TEXT = 3;

/** [foreground, background, minimum, where it appears] */
const pairs = [
  ['--color-text-primary', '--color-canvas', TEXT, 'Headings and body copy'],
  ['--color-text-primary', '--color-surface-raised', TEXT, 'Text in preview cards'],
  ['--color-text-primary', '--color-surface-pressed', TEXT, 'Header and footer links on hover'],
  ['--color-text-primary', '--color-brand-subtle', TEXT, 'Note titles, closing heading on mist'],
  ['--color-text-secondary', '--color-canvas', TEXT, 'Ledes, FAQ answers, footer links'],
  ['--color-text-secondary', '--color-surface-raised', TEXT, 'Card details in previews'],
  ['--color-text-secondary', '--color-surface-sunken', TEXT, 'Neutral badge in previews'],
  ['--color-text-secondary', '--color-surface-pressed', TEXT, 'Current step details in the demo'],
  [
    '--color-text-secondary',
    '--color-brand-subtle',
    TEXT,
    'Feature text on the mist band (narrow)',
  ],
  ['--color-brand-on-subtle', '--color-canvas', TEXT, 'Hero notes below the stage (narrow)'],
  ['--color-text-tertiary', '--color-surface-raised', TEXT, 'Muted icons in cards'],
  ['--color-text-tertiary', '--color-surface-sunken', TEXT, 'Photo placeholder in Momen'],
  ['--color-brand-text', '--color-canvas', TEXT, 'Text links, ghost buttons, wordmark'],
  ['--color-brand-text', '--color-surface-pressed', TEXT, 'Ghost and footer links on hover'],
  ['--color-brand-text', '--color-surface-overlay', TEXT, 'Skip link'],
  ['--color-brand-text', '--color-surface-raised', TEXT, 'Phone glyphs in the walk-through'],
  ['--color-brand-text', '--color-brand-subtle', TEXT, 'Ghost button on the closing band'],
  ['--color-brand-on-solid', '--color-brand-solid', TEXT, 'Primary button label'],
  [
    '--color-brand-on-solid',
    '--color-brand-solid-pressed',
    TEXT,
    'Primary button pressed or hovered',
  ],
  ['--color-brand-on-subtle', '--color-brand-subtle', TEXT, 'Unborn card, closing text on mist'],
  ['--color-success-text', '--color-success-subtle', TEXT, '"Ikut" badge, day-complete glyph'],
  ['--color-warning-text', '--color-warning-subtle', TEXT, 'Fading warning'],
  ['--avatar-1-fg', '--avatar-1-bg', TEXT, 'Avatar initials (forest)'],
  ['--color-code-ink', '--color-code-surface', NON_TEXT, 'Demo code pattern'],
  ['--color-border-strong', '--color-canvas', NON_TEXT, 'Menu button and upcoming step outlines'],
  ['--color-brand-solid', '--color-canvas', NON_TEXT, 'Primary button against the page'],
  [
    '--color-brand-solid',
    '--color-brand-subtle',
    NON_TEXT,
    'Leader lines, check mark on the stage',
  ],
  ['--color-border-focus', '--color-canvas', NON_TEXT, 'Focus ring on the page'],
  [
    '--color-border-focus',
    '--color-surface-overlay',
    NON_TEXT,
    'Focus ring on the overlay surface',
  ],
  ['--color-border-focus', '--color-brand-subtle', NON_TEXT, 'Focus ring on the stage'],
  ['--color-brand-on-subtle', '--color-brand-subtle', TEXT, 'Current section in the header'],
  ['--color-canvas', '--color-text-primary', NON_TEXT, 'Close glyph on the open menu button'],
  ['--color-text-secondary', GLASS, TEXT, 'Header links on the floating capsule'],
  ['--color-text-primary', GLASS, TEXT, 'Links on the open menu card'],
  ['--color-text-primary', '--color-surface-pressed', NON_TEXT, 'Menu glyph, filled circle'],
  ['--color-brand-solid', GLASS, NON_TEXT, 'Download action and mark on the capsule'],
  ['--color-border-focus', GLASS, NON_TEXT, 'Focus ring on the floating capsule'],
];

let failures = 0;
for (const [label, theme] of [
  ['light', light],
  ['dark', dark],
]) {
  console.log(`\n${label}`);
  for (const [fg, bg, min, usage] of pairs) {
    const glass = typeof bg === 'object';
    const background = glass ? glassOver(theme, bg[label]) : resolve(theme, bg);
    const value = ratio(resolve(theme, fg), background);
    const pass = value >= min;
    if (!pass) failures += 1;
    const where = glass ? `--color-surface-glass over ${bg[label]}` : bg;
    console.log(
      `${pass ? 'pass' : 'FAIL'}  ${value.toFixed(2).padStart(5)}:1  (min ${min})  ${fg} on ${where}  ${usage}`,
    );
  }
}

if (failures > 0) {
  console.error(`\n${failures} pairing(s) below the minimum.`);
  process.exit(1);
}
console.log(`\nAll ${pairs.length * 2} pairings meet their minimum.`);
