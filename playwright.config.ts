import { defineConfig } from '@playwright/test';

/** Not the preview's 4173, so a preview left running is never mistaken for this build. */
const port = Number(process.env.TEST_PORT ?? 4174);

/**
 * Tests run against the static export in out/, served by a plain static server, so they check
 * what a host would actually serve rather than the dev server. `pnpm test:e2e` and
 * `pnpm screenshots` build first, and the server is always started fresh, so a run can never pass
 * against an older build.
 *
 * Projects: `e2e` holds the assertions; `screenshots` writes the review images to
 * docs/screenshots/ and is run on its own with `pnpm screenshots`.
 */
export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  reporter: [['list']],
  use: {
    baseURL: `http://127.0.0.1:${String(port)}`,
    locale: 'id-ID',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'node scripts/serve-out.mjs',
    url: `http://127.0.0.1:${String(port)}`,
    env: { PORT: String(port) },
    reuseExistingServer: false,
  },
  // Plain Chromium with an explicit viewport, and no device descriptor: the zoom and text-size
  // tests open windows the browser sizes itself, which device emulation settings would conflict
  // with.
  projects: [
    {
      name: 'e2e',
      testIgnore: /screenshots\.spec\.ts/,
      use: { browserName: 'chromium', viewport: { width: 1280, height: 720 } },
    },
    {
      name: 'screenshots',
      testMatch: /screenshots\.spec\.ts/,
      use: { browserName: 'chromium', viewport: { width: 1280, height: 720 } },
    },
  ],
});
