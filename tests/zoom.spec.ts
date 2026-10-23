import { expect, test } from '@playwright/test';

import { clippedElements, openWithBrowserSetting } from './browser-settings';
import { openLanding } from './helpers';

const cases = [
  {
    name: '200% browser zoom, 1440×900 window',
    setting: { zoom: 2 },
    size: { window: { width: 1440, height: 900 } },
    layout: 720,
  },
  {
    name: '200% browser zoom, 1280×800 window',
    setting: { zoom: 2 },
    size: { window: { width: 1280, height: 800 } },
    layout: 640,
  },
  {
    name: '200% text size, 1440×900 window',
    setting: { textSize: 32 },
    size: { window: { width: 1440, height: 900 } },
    layout: 1440,
  },
  {
    name: '200% text size, 390×844 viewport',
    setting: { textSize: 32 },
    size: { viewport: { width: 390, height: 844 } },
    layout: 390,
  },
] as const;

for (const { name, setting, size, layout } of cases) {
  test(`${name}: nothing overflows or gets cut off, and the actions still work`, async () => {
    // No fixtures: this test opens its own browser with the setting applied.
    const context = await openWithBrowserSetting(test.info(), setting, size);
    const page = context.pages()[0] ?? (await context.newPage());
    await openLanding(page);

    // The setting really applied: zoom shrinks the layout width, text size doubles the root font.
    const metrics = await page.evaluate(() => ({
      layout: window.innerWidth,
      ratio: window.devicePixelRatio,
      rootFont: getComputedStyle(document.documentElement).fontSize,
    }));
    expect(metrics.layout).toBe(layout);
    if ('zoom' in setting) expect(metrics.ratio).toBe(2);
    else expect(metrics.rootFont).toBe('32px');

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
    expect(await page.evaluate(clippedElements)).toEqual([]);

    await expect(page.getByRole('heading', { level: 1 })).toBeInViewport();
    // Below 768 CSS px the section links sit behind the menu, which must open within the window.
    if (layout < 768) {
      const menu = page.locator('nav[aria-label="Utama"] summary');
      await menu.click();
      await expect(page.getByRole('link', { name: 'Tanya jawab' }).first()).toBeInViewport();
      await menu.click();
    }
    await page.getByRole('link', { name: 'Lihat cara kerja' }).first().click();
    await expect(page.locator('#cara-kerja')).toBeFocused();
    // The walk-through plays by itself once its stage is on screen.
    await page
      .locator('section[aria-labelledby="cara-kerja"] div[aria-hidden="true"]')
      .first()
      .evaluate((stage) => {
        stage.scrollIntoView({ block: 'center' });
      });
    await expect(page.getByRole('status')).toHaveText(/^Langkah 3 dari 3/, { timeout: 8000 });
    await context.close();
  });
}
