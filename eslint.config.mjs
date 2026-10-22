import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      // The page explains itself in words on screen; nothing it does should log to the console.
      'no-console': 'error',
    },
  },
  globalIgnores([
    // Default ignores of eslint-config-next, restated because this list overrides them.
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Installed agent skills and design-tool state are vendored as-is.
    '.claude/**',
    '.impeccable/**',
    // Playwright output.
    'playwright-report/**',
    'test-results/**',
  ]),
]);
