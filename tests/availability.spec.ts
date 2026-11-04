import { expect, test } from '@playwright/test';

import { built, builtAvailability } from './built';
import { openLanding, watchProblems } from './helpers';

/**
 * The owner's availability switch, in whichever state this build was made with: `pnpm test:e2e`
 * runs it against the switch as it stands (src/content/availability.ts), and `pnpm test:tersedia`
 * against a build of the launched state (tests/fixtures/availability-tersedia.ts), so both states
 * are checked on every `pnpm test`.
 */
test.describe(`availability: ${builtAvailability.state}`, () => {
  test('the header, the opening and the closing section say the same thing', async ({
    page,
    baseURL,
  }) => {
    const problems = watchProblems(page, baseURL ?? '');
    await openLanding(page);
    const header = page.getByRole('navigation', { name: 'Utama' });
    const action = header.getByRole('link', { name: built.headerAction.name });
    await expect(action).toHaveText(built.headerAction.label);
    await expect(action).toHaveAttribute('href', '#unduh');

    const hero = page.locator('section[aria-labelledby="judul-utama"]');
    const closing = page.locator('section[aria-labelledby="unduh"]');
    await expect(closing.getByRole('heading', { level: 2 })).toHaveText(built.closing.title);
    await expect(closing.getByText(built.closing.body)).toBeVisible();

    const storeLinks = page.locator('a[href*="apps.apple.com"], a[href*="play.google.com"]');
    if (builtAvailability.state === 'tersedia') {
      // The main action is to get it, and the closing section holds both stores.
      await expect(hero.getByRole('link', { name: 'Unduh Patepang' })).toHaveAttribute(
        'href',
        '#unduh',
      );
      await expect(hero.getByText('Belum bisa diunduh')).toHaveCount(0);
      await expect(closing.getByRole('link', { name: 'App Store untuk iPhone' })).toHaveAttribute(
        'href',
        builtAvailability.appStore,
      );
      await expect(
        closing.getByRole('link', { name: 'Google Play untuk Android' }),
      ).toHaveAttribute('href', builtAvailability.googlePlay);
      await expect(storeLinks).toHaveCount(2);
      const text = (await page.locator('body').textContent())?.toLowerCase() ?? '';
      expect(text).not.toContain('segera hadir');
      expect(text).not.toContain('belum bisa diunduh');
    } else {
      // Nothing to download: no download action, no store link, and the status said plainly.
      await expect(hero.getByRole('link', { name: /Unduh/ })).toHaveCount(0);
      await expect(hero.getByText(built.heroStatus ?? '')).toBeVisible();
      await expect(storeLinks).toHaveCount(0);
      await expect(page.getByRole('link', { name: /Unduh/ })).toHaveCount(0);
    }

    // The question "Kapan Patepang bisa dipakai?" has the same answer.
    const when = page.locator('details').filter({ hasText: 'Kapan Patepang bisa dipakai?' });
    await when.locator('summary').click();
    await expect(when.locator('p')).toHaveText(built.whenAnswer);

    // And so does the description search results and link previews show.
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description?.endsWith(built.descriptionStatus)).toBe(true);
    expect(problems).toEqual([]);
  });

  test('pages about the app say whether it can be installed yet', async ({ page }) => {
    for (const path of ['/hapus-akun', '/langganan']) {
      await openLanding(page, path);
      const note = page
        .locator('main')
        .getByText(
          'Patepang belum bisa diunduh. Halaman ini menjelaskan cara kerjanya saat aplikasi tersedia.',
        );
      await expect(note, path).toHaveCount(built.pageNote ? 1 : 0);
    }
    await openLanding(page, '/tentang');
    await expect(page.locator('main').getByText(built.aboutStatus)).toBeVisible();
  });

  test('nothing overflows on a phone in this state', async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, viewport: { width: 360, height: 740 } });
    const page = await context.newPage();
    await openLanding(page);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
    await context.close();
  });
});
