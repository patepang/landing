import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test, type Page } from '@playwright/test';

import { openWithBrowserSetting } from './browser-settings';
import { openLanding } from './helpers';

/**
 * Writes the review screenshots to docs/screenshots/. Run with `pnpm screenshots`, which builds
 * first. Full pages are JPEG to keep the repository light; close-ups are PNG.
 */
const dir = join(__dirname, '..', 'docs', 'screenshots');
mkdirSync(dir, { recursive: true });

async function fullPage(page: Page, name: string) {
  await page.screenshot({
    path: join(dir, `${name}.jpg`),
    fullPage: true,
    type: 'jpeg',
    quality: 80,
    scale: 'css',
  });
}

for (const width of [360, 390, 768, 1440]) {
  for (const colorScheme of ['light', 'dark'] as const) {
    if (colorScheme === 'dark' && (width === 360 || width === 768)) continue;
    test(`page at ${String(width)}px, ${colorScheme}`, async ({ browser, baseURL }) => {
      const context = await browser.newContext({
        baseURL,
        colorScheme,
        viewport: { width, height: width >= 1024 ? 900 : 844 },
      });
      const page = await context.newPage();
      await openLanding(page);
      await fullPage(page, `${String(width)}-${colorScheme}`);
      if (width === 1440 || width === 390) {
        await page.screenshot({
          path: join(dir, `${String(width)}-${colorScheme}-first-view.png`),
        });
      }
      await context.close();
    });
  }
}

test('tempel walk-through, each step, full and reduced motion', async ({ browser, baseURL }) => {
  for (const reducedMotion of ['no-preference', 'reduce'] as const) {
    const context = await browser.newContext({
      baseURL,
      reducedMotion,
      viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();
    await openLanding(page);
    const section = page.locator('section[aria-labelledby="cara-kerja"]');
    // The sentence on screen; the live region stays quiet for a run nobody asked for.
    const status = section.locator('p[aria-hidden="true"]');
    const suffix = reducedMotion === 'reduce' ? '-reduced-motion' : '';
    // On screen, it plays by itself.
    await section.evaluate((el) => {
      el.scrollIntoView({ block: 'center' });
    });
    await expect(status).toHaveText(/^Langkah 1 dari 3/, { timeout: 3000 });
    await section.screenshot({ path: join(dir, `demo-scan${suffix}.png`) });
    await expect(status).toHaveText(/^Langkah 2 dari 3/, { timeout: 3000 });
    await page.waitForTimeout(250); // approach done, shaking
    await section.screenshot({ path: join(dir, `demo-shake${suffix}.png`) });
    await expect(status).toHaveText(/^Langkah 3 dari 3/, { timeout: 3000 });
    await page.waitForTimeout(400);
    await section.screenshot({ path: join(dir, `demo-done${suffix}.png`) });
    await context.close();
  }
});

test('real 200% browser zoom and 200% text size', async () => {
  const testInfo = test.info();
  const zoomed = await openWithBrowserSetting(
    testInfo,
    { zoom: 2 },
    { window: { width: 1440, height: 900 } },
  );
  const zoomPage = zoomed.pages()[0] ?? (await zoomed.newPage());
  await openLanding(zoomPage);
  // Playwright's own screenshots assume its emulated scale and misdraw a browser-zoomed page
  // (a full-page capture even re-lays it out at 1440px). The DevTools capture records the window
  // exactly as zoomed, so the zoomed page is shot screen by screen, at its real pixel density.
  const cdp = await zoomed.newCDPSession(zoomPage);
  const sections = [
    '#atas',
    '#masalah',
    '#cara-kerja',
    '#fitur',
    '#cerita',
    '#tanya-jawab',
    '#segera-hadir',
  ];
  for (const [index, selector] of sections.entries()) {
    await zoomPage.locator(selector).evaluate((el) => el.scrollIntoView({ block: 'start' }));
    const { data } = (await cdp.send('Page.captureScreenshot', { format: 'png' })) as {
      data: string;
    };
    writeFileSync(
      join(dir, `zoom-200-window-1440-${String(index + 1)}.png`),
      Buffer.from(data, 'base64'),
    );
  }
  await cdp.detach();
  await zoomed.close();

  const text = await openWithBrowserSetting(
    testInfo,
    { textSize: 32 },
    { viewport: { width: 390, height: 844 } },
  );
  const textPage = text.pages()[0] ?? (await text.newPage());
  await openLanding(textPage);
  await fullPage(textPage, 'text-200-390');
  await text.close();
});

test('without JavaScript, menu and FAQ open, and the 404 page', async ({ browser, baseURL }) => {
  const noScript = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await noScript.newPage();
  await page.goto('/');
  await fullPage(page, 'no-js-390');
  await noScript.close();

  const context = await browser.newContext({ baseURL, viewport: { width: 390, height: 844 } });
  const faqPage = await context.newPage();
  await openLanding(faqPage);
  const menu = faqPage.locator('nav[aria-label="Utama"] summary');
  await menu.click();
  await faqPage.screenshot({ path: join(dir, 'menu-open-390.png') });
  await menu.click();
  await faqPage
    .locator('section[aria-labelledby="tanya-jawab"] details')
    .nth(2)
    .locator('summary')
    .click();
  await faqPage
    .locator('section[aria-labelledby="tanya-jawab"]')
    .screenshot({ path: join(dir, 'faq-open-390.png') });
  await openLanding(faqPage, '/halaman-yang-tidak-ada');
  await faqPage.screenshot({ path: join(dir, '404-390.png') });
  await context.close();
});
