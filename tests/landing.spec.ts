import { expect, test, type Browser, type Page } from '@playwright/test';

import { openLanding, watchProblems } from './helpers';

const DEMO = 'section[aria-labelledby="cara-tempel"]';
/** The demo moves on at 0.9s and 1.9s; waits allow far more, since order is what is checked. */
const STEP_TIMEOUT = 8000;

const STEPS = [
  'Langkah 1 dari 3: pindai kode. | Pindai kode',
  'Langkah 2 dari 3: goyang bersama. | Goyang bersama',
  'Langkah 3 dari 3: terhubung. Koneksi dan momen pertama tercatat di kedua HP. | Terhubung',
];

declare global {
  interface Window {
    axe: {
      run: (
        context: Document,
        options: object,
      ) => Promise<{ violations: { id: string; nodes: { target: string[] }[] }[] }>;
    };
    tempelLog: string[];
  }
}

/**
 * Records, from inside the page, every status the demo announces together with the step marked
 * current at that same moment. Each phase lasts about a second, too short to sample reliably from
 * the test under load, so the page writes the sequence down itself.
 */
async function recordDemo(page: Page) {
  await page.evaluate(() => {
    window.tempelLog = [];
    const status = document.querySelector('[role="status"]');
    if (!status) throw new Error('No status region');
    new MutationObserver(() => {
      const current = document.querySelector('li[aria-current="step"] .type-body-strong');
      window.tempelLog.push(`${status.textContent ?? ''} | ${current?.textContent ?? '-'}`);
    }).observe(status, { childList: true, characterData: true, subtree: true });
  });
}

/** `#RRGGBB` as the browser reports computed colours. */
function rgb(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return `rgb(${String(r)}, ${String(g)}, ${String(b)})`;
}

async function newPage(browser: Browser, baseURL: string | undefined, options: object = {}) {
  const context = await browser.newContext({ baseURL, ...options });
  return { context, page: await context.newPage() };
}

test.describe('landing', () => {
  test('loads the whole story with no errors, third-party requests or missing fonts', async ({
    page,
    baseURL,
  }) => {
    const problems = watchProblems(page, baseURL ?? '');
    await openLanding(page);

    await expect(page).toHaveTitle('Patepang: hanya orang yang pernah kamu temui');
    await expect(page.locator('html')).toHaveAttribute('lang', 'id');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Hanya orang yang pernah kamu temui.',
    );
    for (const name of [
      'Pertemuan nyata tidak harus selesai saat kalian berpisah.',
      'Sebelum pamit, tempel dulu.',
      'Setelah kalian berpisah',
      'Patepang masih prototipe',
      'Tanya jawab',
      'Selesai. Tidak ada yang perlu dikejar.',
    ]) {
      await expect(page.getByRole('heading', { level: 2, name })).toBeVisible();
    }

    // The four static weights of the brand family are loaded, from this site only.
    const weights = await page.evaluate(() => {
      const family = getComputedStyle(document.body).fontFamily.split(',')[0]?.replace(/['"]/g, '');
      return [...document.fonts]
        .filter((face) => face.family.replace(/['"]/g, '') === family && face.status === 'loaded')
        .map((face) => face.weight)
        .sort();
    });
    expect(weights).toEqual(['400', '500', '600', '700']);
    expect(problems).toEqual([]);
  });

  test('metadata describes the page without inventing assets', async ({ page }) => {
    await openLanding(page);
    const head = page.locator('head');
    await expect(head.locator('meta[name="description"]')).toHaveAttribute('content', /prototipe/);
    await expect(head.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://patepang.com',
    );
    await expect(head.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'id_ID');
    await expect(head.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary');
    await expect(head.locator('meta[property="og:image"]')).toHaveCount(0);
    await expect(head.locator('link[rel="icon"]')).toHaveAttribute('href', 'data:,');
  });

  test('says it is a prototype and makes no claims or offers it cannot keep', async ({ page }) => {
    await openLanding(page);
    await expect(
      page.getByText('Masih prototipe dengan data fiktif. Belum tersedia untuk diunduh.'),
    ).toBeVisible();
    // Every preview of the app carries the label.
    await expect(
      page.locator('figcaption', { hasText: 'Pratinjau prototipe — data fiktif' }),
    ).toHaveCount(4);
    for (const image of await page.locator('[role="img"]').all()) {
      await expect(image).toHaveAttribute('aria-label', /\S/);
    }
    // No forms, downloads, waitlists, store badges, ratings, testimonials or security promises.
    await expect(page.locator('form, input, textarea, select')).toHaveCount(0);
    // Everything a reader or a screen reader can meet: closed FAQ answers, labels and metadata too.
    const text = await page.evaluate(() => {
      const body = document.body.cloneNode(true) as HTMLElement;
      for (const element of body.querySelectorAll('script, style, template')) element.remove();
      const attributes = [...document.querySelectorAll('[aria-label], [alt], [title]')].flatMap(
        (element) => ['aria-label', 'alt', 'title'].map((name) => element.getAttribute(name) ?? ''),
      );
      const meta = [...document.head.querySelectorAll('meta[content]')].map(
        (element) => element.getAttribute('content') ?? '',
      );
      return [document.title, body.textContent, ...attributes, ...meta].join('\n').toLowerCase();
    });
    expect(text, 'the scan reaches closed FAQ answers').toContain('titik lahir');
    for (const banned of [
      'enkripsi',
      'terenkripsi',
      'keamanan',
      'terjamin',
      'app store',
      'google play',
      'play store',
      'android',
      'iphone',
      'testimoni',
      'rating',
      'pengguna',
      'harga',
      'gratis',
      'daftar tunggu',
      'waitlist',
      'unduh sekarang',
    ]) {
      expect(text, banned).not.toContain(banned);
    }
  });

  test('every link is real: anchors land on this page, nothing points to "#" or off-site', async ({
    page,
  }) => {
    await openLanding(page);
    const hrefs = await page
      .locator('a[href]')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href') ?? ''));
    expect(hrefs.length).toBeGreaterThan(10);
    for (const href of hrefs) {
      expect(href).toMatch(/^#[a-z-]+$/);
      await expect(page.locator(href), href).toHaveCount(1);
    }
  });

  test('hero actions move to their sections and put focus on the heading', async ({ page }) => {
    await openLanding(page);
    await page.getByRole('link', { name: 'Lihat cara tempel' }).first().click();
    await expect(page).toHaveURL(/#cara-tempel$/);
    await expect(page.locator('#cara-tempel')).toBeFocused();
    await expect(page.locator('#cara-tempel')).toBeInViewport();

    await page.getByRole('link', { name: 'Tentang prototipe' }).click();
    await expect(page).toHaveURL(/#prototipe$/);
    await expect(page.locator('#prototipe')).toBeFocused();
    const top = await page.locator('#prototipe').evaluate((el) => el.getBoundingClientRect().top);
    expect(top).toBeGreaterThanOrEqual(0);
    expect(top).toBeLessThan(160);
  });

  test('the header keeps one section link on phones and shows all four from 768px', async ({
    browser,
    baseURL,
  }) => {
    for (const [width, expected] of [
      [390, ['Tanya jawab']],
      [768, ['Cara tempel', 'Setelah bertemu', 'Prototipe', 'Tanya jawab']],
    ] as const) {
      const { context, page } = await newPage(browser, baseURL, {
        viewport: { width, height: 900 },
      });
      await openLanding(page);
      const nav = page.getByRole('navigation', { name: 'Utama' });
      const shown = await nav
        .locator('a')
        .evaluateAll((links) =>
          links.filter((link) => link.getClientRects().length > 0).map((link) => link.textContent),
        );
      expect(shown, `${String(width)}px`).toEqual(expected);
      await nav.getByRole('link', { name: 'Tanya jawab' }).click();
      await expect(page).toHaveURL(/#tanya-jawab$/);
      await expect(page.locator('#tanya-jawab')).toBeFocused();
      await context.close();
    }
  });

  test('the skip link comes first and moves focus to the content', async ({ page }) => {
    await openLanding(page);
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Langsung ke isi' });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await page.keyboard.press('Enter');
    await expect(page.locator('main#isi')).toBeFocused();
  });

  test('keyboard focus is always shown as the 2px focus-blue ring, in a sensible order', async ({
    page,
  }) => {
    await openLanding(page);
    const stops: string[] = [];
    for (let i = 0; i < 14; i += 1) {
      await page.keyboard.press('Tab');
      const focus = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement;
        const style = getComputedStyle(el);
        return {
          name: (el.getAttribute('aria-label') ?? el.textContent ?? '').trim().slice(0, 40),
          ring: `${style.outlineStyle} ${style.outlineWidth} ${style.outlineColor}`,
        };
      });
      expect(focus.ring, focus.name).toBe('solid 2px rgb(36, 92, 143)');
      stops.push(focus.name);
    }
    expect(stops.slice(0, 9)).toEqual([
      'Langsung ke isi',
      'patepang',
      'Cara tempel',
      'Setelah bertemu',
      'Prototipe',
      'Tanya jawab',
      'Lihat cara tempel',
      'Tentang prototipe',
      'Putar cara tempel',
    ]);
  });

  for (const width of [360, 1440]) {
    test(`everything pressable has a 48px target at ${String(width)}px`, async ({
      browser,
      baseURL,
    }) => {
      const { context, page } = await newPage(browser, baseURL, {
        viewport: { width, height: 900 },
      });
      await openLanding(page);
      const small = await page.locator('a[href], button, summary').evaluateAll((elements) =>
        elements
          .filter((el) => el.getClientRects().length > 0)
          .map((el) => ({ el, box: el.getBoundingClientRect() }))
          .filter(({ box }) => box.width < 48 || box.height < 48)
          .map(({ el, box }) => `${el.textContent?.trim() ?? ''} ${box.width}x${box.height}`),
      );
      expect(small).toEqual([]);
      await context.close();
    });
  }

  test('the tempel demo plays once per press, says each step in words and replays', async ({
    page,
    baseURL,
  }) => {
    const problems = watchProblems(page, baseURL ?? '');
    await openLanding(page);
    const demo = page.locator(`${DEMO} div[data-phase]`).first();
    const status = page.getByRole('status');
    await expect(status).toHaveText('Siap diputar.');
    await recordDemo(page);

    // Each step is announced in words with the matching step marked current, in order.
    await page.getByRole('button', { name: 'Putar cara tempel' }).click();
    await expect(status).toHaveText(/^Langkah 3 dari 3: terhubung\./, { timeout: STEP_TIMEOUT });
    expect(await page.evaluate(() => window.tempelLog)).toEqual(STEPS);

    // It never loops: well after the end it is still finished and nothing more was announced.
    await page.waitForTimeout(2500);
    await expect(demo).toHaveAttribute('data-phase', 'done');
    expect(await page.evaluate(() => window.tempelLog)).toEqual(STEPS);

    // "Putar lagi" starts it over from the first step, and keyboard focus stays on the button.
    const replay = page.getByRole('button', { name: 'Putar lagi' });
    await replay.click();
    await expect(replay).toBeFocused();
    await expect(status).toHaveText(/^Langkah 3 dari 3/, { timeout: STEP_TIMEOUT });
    expect(await page.evaluate(() => window.tempelLog)).toEqual([...STEPS, ...STEPS]);
    expect(problems).toEqual([]);
  });

  test('if its script never loads, the demo offers no button that would not respond', async ({
    browser,
    baseURL,
  }) => {
    const { context, page } = await newPage(browser, baseURL);
    await page.route('**/*.js', (route) => route.abort());
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.locator(`${DEMO} ol > li`)).toHaveCount(3);
    const button = page.locator(`${DEMO} button`);
    await expect(button).toBeHidden();
    // Its place is kept, so nothing moves when a working button appears.
    expect(await button.evaluate((el) => el.getBoundingClientRect().height)).toBeGreaterThanOrEqual(
      48,
    );
    await context.close();
  });

  test('under reduced motion the demo reaches every step without moving the phones', async ({
    browser,
    baseURL,
  }) => {
    const { context, page } = await newPage(browser, baseURL, { reducedMotion: 'reduce' });
    await openLanding(page);
    await page.getByRole('button', { name: 'Putar cara tempel' }).click();
    const status = page.getByRole('status');
    await expect(status).toHaveText('Langkah 2 dari 3: goyang bersama.', { timeout: STEP_TIMEOUT });
    const phones = await page
      .locator(`${DEMO} div[aria-hidden="true"] > div > span`)
      .evaluateAll((spans) =>
        spans.map((span) => {
          const style = getComputedStyle(span);
          return `${style.animationName} ${style.transform}`;
        }),
      );
    expect(phones).toEqual(['none none', 'none none', 'none none']);
    await expect(status).toHaveText(/^Langkah 3 dari 3/, { timeout: STEP_TIMEOUT });
    await context.close();
  });

  test('FAQ answers open with the keyboard and the pointer', async ({ page }) => {
    await openLanding(page);
    const first = page.locator('details').first();
    await first.locator('summary').focus();
    await page.keyboard.press('Enter');
    await expect(first).toHaveAttribute('open', '');
    await expect(first.locator('p')).toBeVisible();
    await page.keyboard.press('Space');
    await expect(first).not.toHaveAttribute('open', '');

    const last = page.locator('details').last();
    await last.locator('summary').click();
    await expect(last.locator('p')).toContainText('Belum ada tanggal');
  });

  test('the theme follows the operating system, and so does the browser colour', async ({
    browser,
    baseURL,
  }) => {
    for (const [colorScheme, canvas] of [
      ['light', 'rgb(247, 245, 240)'],
      ['dark', 'rgb(20, 21, 19)'],
    ] as const) {
      const { context, page } = await newPage(browser, baseURL, { colorScheme });
      await openLanding(page);
      await expect(page.locator('body')).toHaveCSS('background-color', canvas);
      // theme-color comes from src/design/tokens.ts, which cannot read the CSS: they must agree.
      const themeColor = await page
        .locator(`meta[name="theme-color"][media="(prefers-color-scheme: ${colorScheme})"]`)
        .getAttribute('content');
      expect(rgb(themeColor ?? '')).toBe(canvas);
      await context.close();
    }
  });

  for (const width of [360, 390, 768, 1440]) {
    test(`no horizontal overflow at ${String(width)}px`, async ({ browser, baseURL }) => {
      const { context, page } = await newPage(browser, baseURL, {
        viewport: { width, height: 900 },
      });
      await openLanding(page);
      const result = await page.evaluate(() => {
        const viewport = document.documentElement.clientWidth;
        const outside = [...document.querySelectorAll('body *')]
          .filter((el) => !el.closest('.skip-link'))
          .filter((el) => {
            const box = el.getBoundingClientRect();
            return box.width > 0 && (box.right > viewport + 0.5 || box.left < -0.5);
          })
          .map((el) => `${el.tagName.toLowerCase()}.${String(el.className)}`);
        return { scroll: document.documentElement.scrollWidth, viewport, outside };
      });
      expect(result.scroll).toBeLessThanOrEqual(result.viewport);
      expect(result.outside).toEqual([]);
      await context.close();
    });
  }

  test('without JavaScript the content, anchors and FAQ still work', async ({
    browser,
    baseURL,
  }) => {
    const { context, page } = await newPage(browser, baseURL, { javaScriptEnabled: false });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('ol > li')).toHaveCount(3);
    await expect(page.getByText('Selesai untuk hari ini')).toBeVisible();
    await expect(page.getByText('Memudar dalam 24 hari.', { exact: false })).toBeVisible();
    // The demo's button needs JavaScript, so it is not offered; the steps stay readable.
    await expect(page.getByRole('button', { name: 'Putar cara tempel' })).toBeHidden();

    await page.getByRole('link', { name: 'Lihat cara tempel' }).first().click();
    await expect(page).toHaveURL(/#cara-tempel$/);
    const faq = page.locator('details').nth(1);
    await faq.locator('summary').click();
    await expect(faq).toHaveAttribute('open', '');
    await context.close();
  });

  test('unknown addresses get the 404 page with a way back', async ({ page, baseURL }) => {
    const problems = watchProblems(page, baseURL ?? '');
    const response = await page.goto('/halaman-yang-tidak-ada', { waitUntil: 'networkidle' });
    expect(response?.status()).toBe(404);
    await expect(page).toHaveTitle('Halaman tidak ditemukan | Patepang');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Halaman ini tidak ada.');
    await expect(page.getByRole('link', { name: 'Kembali ke halaman utama' })).toHaveAttribute(
      'href',
      '/',
    );
    // Its header leads back into the landing's sections.
    await page
      .getByRole('navigation', { name: 'Utama' })
      .getByRole('link', { name: 'Cara tempel' })
      .click();
    await expect(page).toHaveURL(/\/#cara-tempel$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Hanya orang yang pernah kamu temui.',
    );
    await expect(page.locator('#cara-tempel')).toBeInViewport();
    // The only expected failure is the 404 response for the page itself.
    expect(problems.filter((p) => !p.includes('/halaman-yang-tidak-ada'))).toEqual([]);
  });

  for (const colorScheme of ['light', 'dark'] as const) {
    test(`axe-core reports no violations (${colorScheme})`, async ({ browser, baseURL }) => {
      const { context, page } = await newPage(browser, baseURL, { colorScheme });
      for (const path of ['/', '/halaman-yang-tidak-ada']) {
        await openLanding(page, path);
        await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
        const violations = await runAxe(page);
        expect(violations, path).toEqual([]);
      }
      await context.close();
    });
  }
});

async function runAxe(page: Page) {
  return page.evaluate(async () => {
    const result = await window.axe.run(document, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'],
      },
    });
    return result.violations.map((violation) => ({
      id: violation.id,
      targets: violation.nodes.slice(0, 5).map((node) => node.target.join(' ')),
    }));
  });
}
