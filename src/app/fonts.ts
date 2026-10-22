import localFont from 'next/font/local';

/**
 * Plus Jakarta Sans, the only family, as four static weights (400, 500, 600, 700) in the latin
 * subset, served from this site. Each weight is its own @font-face, so the browser never fakes a
 * bold. Origin and licence: ./fonts/SOURCE.md and ./fonts/OFL.txt.
 *
 * `adjustFontFallback` builds a metric-matched fallback from Arial, so text keeps its size and
 * line breaks while the font loads or if it never arrives.
 */
export const jakarta = localFont({
  src: [
    { path: './fonts/plus-jakarta-sans-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/plus-jakarta-sans-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/plus-jakarta-sans-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: './fonts/plus-jakarta-sans-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-jakarta',
  display: 'swap',
  adjustFontFallback: 'Arial',
  fallback: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial'],
});
