/**
 * The few design tokens that code needs as numbers or strings rather than CSS custom properties.
 * Values come from patepang/app @ 262202f (src/design-system/tokens); the CSS side lives in
 * src/app/tokens.css.
 */

/** iconography.ts: Phosphor takes a pixel size. */
export const iconSize = {
  /** Inline with captions and badges. */
  xs: 16,
  /** Inline with body text and inside buttons. */
  sm: 20,
  /** Default UI icon. */
  md: 24,
  /** Emphasis inside cards and steps. */
  lg: 32,
  /** Empty, offline and error states. */
  xl: 48,
} as const;

export type IconSize = keyof typeof iconSize;

/**
 * iconography.ts: weights in use. `thin` and `light` are excluded because their strokes fall
 * below non-text contrast at small sizes.
 */
export type IconWeight = 'regular' | 'fill' | 'bold' | 'duotone';

/** color.ts canvas, for the browser UI colour (`theme-color`), which cannot read CSS. */
export const canvasColor = { light: '#F7F5F0', dark: '#141513' } as const;
