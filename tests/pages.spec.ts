import { expect, test, type Browser, type Page } from '@playwright/test';

import { confirmed, contact, unconfirmedMailboxes } from '../src/content/contact';
import { redirects, sitePages, type SitePage } from '../src/content/pages';

import { openLanding, watchProblems } from './helpers';

/* `window.axe` is declared in landing.spec.ts. */

/**
 * The site's pages beyond the landing: each one renders, says what it is, is linked from the
 * footer and listed in the sitemap, keeps its links real, and passes the same accessibility,
 * overflow and target-size checks as the landing. Also the files a host serves beside them
 * (security.txt, robots.txt, sitemap.xml), the hosting headers of vercel.json (the local server
 * applies them, as the production host does), and the redirect for the decided /ketentuan address.
 */

const SITE = 'https://patepang.com';

/** Every page the brief asked for; the registry may hold more, never fewer. */
const REQUIRED = [
  '/kebijakan-privasi',
  '/syarat-ketentuan',
  '/pedoman-komunitas',
  '/keamanan',
  '/transparansi',
  '/hapus-akun',
  '/langganan',
  '/kontak',
  '/tentang',
  '/lisensi',
];

/** Hosts a page may link to: the stores' help for refunds, and the licences' own sites. */
const EXTERNAL_HOSTS = new Set([
  'reportaproblem.apple.com',
  'support.google.com',
  'www.gnu.org',
  'openfontlicense.org',
]);

const DRAFT_NOTICE = 'Draf: menunggu tinjauan penasihat hukum. Belum berlaku.';

/** What a page in force says about its brackets while it holds one. */
const PENDING_NOTE = 'Bagian yang masih menunggu keputusan ditandai kurung siku, [seperti ini].';

async function newPage(browser: Browser, baseURL: string | undefined, options: object = {}) {
  const context = await browser.newContext({ baseURL, ...options });
  return { context, page: await context.newPage() };
}

/** "4 November 2026" from an ISO date, as the pages write it. */
function longDate(iso: string) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`));
}

test('every page the brief asked for is in the registry, once', () => {
  const paths = sitePages.map((page) => page.path);
  expect(new Set(paths).size).toBe(paths.length);
  for (const path of REQUIRED) expect(paths, path).toContain(path);
});

for (const entry of sitePages as readonly SitePage[]) {
  test(`${entry.path} renders, says what it is, and keeps its links real`, async ({
    page,
    baseURL,
    request,
  }) => {
    const problems = watchProblems(page, baseURL ?? '');
    await openLanding(page, entry.path);

    // One title, the page's own metadata, no borrowed canonical address.
    await expect(page).toHaveTitle(`${entry.title} | Patepang`);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(entry.title);
    const head = page.locator('head');
    await expect(head.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      entry.description,
    );
    await expect(head.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `${SITE}${entry.path}`,
    );
    await expect(head.locator('meta[property="og:url"]')).toHaveAttribute(
      'content',
      `${SITE}${entry.path}`,
    );
    await expect(head.locator('meta[property="og:title"]')).toHaveAttribute(
      'content',
      `${entry.title} | Patepang`,
    );
    await expect(head.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'id_ID');
    await expect(head.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary');
    await expect(head.locator('meta[property="og:image"]')).toHaveCount(0);

    // When it last changed, and whether it is a draft that is not in force yet.
    await expect(page.locator(`main time[datetime="${entry.updated}"]`)).toHaveText(
      longDate(entry.updated),
    );
    const notice = page.getByRole('note').filter({ hasText: DRAFT_NOTICE });
    await expect(notice).toHaveCount(entry.draft ? 1 : 0);

    // Every heading in the contents leads to a section of this page.
    const contents = page.getByRole('navigation', { name: 'Isi halaman' });
    for (const href of await contents
      .locator('a')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href') ?? ''))) {
      expect(href).toMatch(/^#[a-z-]+$/);
      await expect(page.locator(`h2${href}`), href).toHaveCount(1);
    }

    // Links: anchors on this page, pages that exist, the site's own mailboxes, and a few named
    // sites. No forms anywhere.
    const hrefs = await page
      .locator('a[href]')
      .evaluateAll((links) => [...new Set(links.map((link) => link.getAttribute('href') ?? ''))]);
    const mailboxes = new Set(Object.values(contact).map((address) => `mailto:${address}`));
    for (const href of hrefs) {
      if (href.startsWith('#')) {
        await expect(page.locator(href), href).toHaveCount(1);
      } else if (href.startsWith('mailto:')) {
        expect(mailboxes.has(href), href).toBe(true);
      } else if (href.startsWith('/')) {
        const response = await request.get(href);
        expect(response.status(), href).toBe(200);
      } else {
        expect(EXTERNAL_HOSTS.has(new URL(href).host), href).toBe(true);
      }
    }
    await expect(page.locator('form, input, textarea, select')).toHaveCount(0);

    // Nothing that is not true yet.
    const text = (await page.locator('body').textContent())?.toLowerCase() ?? '';
    for (const banned of ['tidak bisa diretas', 'paling aman', 'sudah diaudit', 'bug bounty']) {
      expect(text, banned).not.toContain(banned);
    }
    expect(problems).toEqual([]);
  });
}

test('the footer links every page, on the landing and on every other page', async ({ page }) => {
  for (const path of ['/', '/kebijakan-privasi']) {
    await openLanding(page, path);
    const footer = page.getByRole('navigation', { name: 'Situs' });
    for (const entry of sitePages) {
      await expect(footer.locator(`a[href="${entry.path}"]`), `${path}: ${entry.path}`).toHaveCount(
        1,
      );
    }
    // The landing's sections too, as anchors there and as links back to it elsewhere.
    const prefix = path === '/' ? '#' : '/#';
    for (const id of ['cara-kerja', 'fitur', 'harga', 'tanya-jawab']) {
      await expect(footer.locator(`a[href="${prefix}${id}"]`)).toHaveCount(1);
    }
  }
});

test('the contents fold away on phones and stand beside the text on wide screens', async ({
  browser,
  baseURL,
}) => {
  const phone = await newPage(browser, baseURL, { viewport: { width: 390, height: 844 } });
  await openLanding(phone.page, '/kebijakan-privasi');
  // Only one of the two contents is displayed at a time: folded here.
  const contents = phone.page.getByRole('navigation', { name: 'Isi halaman' });
  const first = contents.locator('a').first();
  // A closed <details> hides its content with content-visibility, which keeps layout boxes, so
  // the browser's own visibility check is the one to ask.
  const shown = () => first.evaluate((link) => link.checkVisibility());
  expect(await shown()).toBe(false);
  await contents.locator('summary').click();
  expect(await shown()).toBe(true);
  await first.click();
  await expect(phone.page).toHaveURL(/#ringkasnya$/);
  await expect(phone.page.locator('#ringkasnya')).toBeFocused();
  await phone.context.close();

  const wide = await newPage(browser, baseURL, { viewport: { width: 1440, height: 900 } });
  await openLanding(wide.page, '/kebijakan-privasi');
  const rail = wide.page.getByRole('navigation', { name: 'Isi halaman' });
  await expect(rail.getByRole('link').first()).toBeVisible();
  await expect(rail.locator('summary')).toBeHidden();
  // It stays in view while the text scrolls.
  await wide.page.locator('#hakmu').evaluate((heading) => {
    heading.scrollIntoView({ block: 'start' });
  });
  await expect(rail.getByRole('link').first()).toBeInViewport();
  await wide.context.close();
});

test('the company behind Patepang is named from its papers, and open facts stay marked', async ({
  page,
}) => {
  await openLanding(page, '/kebijakan-privasi');
  const who = page.locator('section[aria-labelledby="siapa-kami"]');
  await expect(who).toContainText('Patepang dikelola oleh PT Pakuan Teknologi Pangrango');
  await expect(who).toContainText('Kabupaten Bogor, Jawa Barat 16620');
  await expect(who).toContainText('terdaftar dengan NIB 2810260094182');
  await expect(who).toContainText(
    'Pejabat pelindungan data pribadi: direktur perseroan, lewat alamat surel yang sama.',
  );
  // Not registered as an electronic system operator yet: the page says so instead of a number.
  await expect(who).toContainText('pendaftaran PSE menyusul sebelum Patepang diluncurkan');
  const placeholders = await page
    .locator('main [data-placeholder]')
    .evaluateAll((spans) => spans.map((span) => span.textContent));
  // The entity is no longer a placeholder anywhere on the page...
  for (const filled of [
    '[Nama badan hukum]',
    '[Alamat]',
    '[NIB/PSE]',
    '[Nama atau jabatan pejabatnya]',
  ]) {
    expect(placeholders).not.toContain(filled);
  }
  // ...while facts nobody has decided yet still stand marked, never as made-up text.
  expect(placeholders).toContain(
    '[Cara membuktikan pemilik akun untuk permintaan lewat surel: menunggu keputusan]',
  );
});

test('a page in force explains its brackets exactly while it holds one', async ({ page }) => {
  for (const entry of sitePages.filter((candidate) => !candidate.draft)) {
    await openLanding(page, entry.path);
    const held = await page.locator('main [data-placeholder]').count();
    const note = page.locator('[data-pending-note]');
    if (held > 0) {
      await expect(note, entry.path).toBeVisible();
      await expect(note, entry.path).toHaveText(PENDING_NOTE);
    } else {
      await expect(note, entry.path).toBeHidden();
    }
  }
});

test('the security policy is in force, and its safe harbour says it is not yet', async ({
  page,
}) => {
  await openLanding(page, '/keamanan');
  await expect(page.getByRole('note').filter({ hasText: DRAFT_NOTICE })).toHaveCount(0);
  const harbour = page.locator('section[aria-labelledby="safe-harbour"]');
  await expect(harbour.getByRole('note')).toContainText('Belum berlaku.');
  await expect(page.locator('section[aria-labelledby="in-english"]')).toContainText(
    'this safe harbour is a draft awaiting legal review and is not in force yet',
  );
});

test('each address is listed once, and the production build waits for its mailbox', async ({
  page,
}) => {
  const shown = [...new Set(Object.values(contact))];
  await openLanding(page, '/kontak');
  const cards = await page
    .locator('section[aria-labelledby="alamat-surel"] a[href^="mailto:"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute('href') ?? ''));
  expect(cards.sort()).toEqual(shown.map((address) => `mailto:${address}`).sort());
  // Every address shown has a flag, so the gate in next.config.ts cannot miss one.
  for (const address of shown) expect(Object.keys(confirmed), address).toContain(address);
  expect(unconfirmedMailboxes().sort()).toEqual(
    shown.filter((address) => confirmed[address] !== true).sort(),
  );
});

test('security.txt is plain text with the fields RFC 9116 asks for', async ({ request }) => {
  const response = await request.get('/.well-known/security.txt');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toBe('text/plain; charset=utf-8');
  const fields = Object.fromEntries(
    (await response.text())
      .split('\n')
      .filter((line) => line.trim() !== '' && !line.startsWith('#'))
      .map((line) => {
        const at = line.indexOf(': ');
        return [line.slice(0, at), line.slice(at + 2)];
      }),
  );
  expect(fields.Contact).toBe('mailto:security@patepang.com');
  expect(fields['Preferred-Languages']).toBe('id, en');
  expect(fields.Policy).toBe(`${SITE}/keamanan`);
  expect(fields.Canonical).toBe(`${SITE}/.well-known/security.txt`);
  // In the future, less than a year ahead (RFC 9116 §2.5.5), and renewed at least a month before
  // it lapses: this fails a month ahead, so the file is reviewed in time.
  const expires = Date.parse(fields.Expires ?? '');
  const day = 24 * 60 * 60 * 1000;
  expect(Number.isNaN(expires)).toBe(false);
  expect(expires - Date.now()).toBeGreaterThan(30 * day);
  expect(expires - Date.now()).toBeLessThan(366 * day);
  // The policy it names exists.
  expect((await request.get('/keamanan')).status()).toBe(200);
});

test('robots.txt and sitemap.xml list the site and nothing else', async ({ request }) => {
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain('Allow: /');
  expect(robots).toContain(`Sitemap: ${SITE}/sitemap.xml`);

  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  const listed = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => match[1],
  );
  expect(listed.sort()).toEqual([SITE, ...sitePages.map((entry) => `${SITE}${entry.path}`)].sort());
});

test('the host sends the security headers, with a policy that allows no third party', async ({
  request,
}) => {
  for (const path of ['/', '/kebijakan-privasi', '/halaman-yang-tidak-ada']) {
    const headers = (await request.get(path)).headers();
    const csp = headers['content-security-policy'] ?? '';
    expect(csp, path).toContain("frame-ancestors 'none'");
    expect(csp, path).toContain("default-src 'self'");
    expect(csp, path).toContain("form-action 'none'");
    // Every source is the site itself, nothing, or inline data: no other origin anywhere.
    for (const directive of csp.split(';')) {
      const [, ...sources] = directive.trim().split(/\s+/);
      for (const source of sources) {
        expect(["'self'", "'none'", "'unsafe-inline'", 'data:'], `${path}: ${source}`).toContain(
          source,
        );
      }
    }
    expect(headers['strict-transport-security'], path).toMatch(/max-age=\d{8,}/);
    expect(headers['x-content-type-options'], path).toBe('nosniff');
    expect(headers['referrer-policy'], path).toBe('no-referrer');
    expect(headers['permissions-policy'], path).toContain('camera=()');
    expect(headers['x-frame-options'], path).toBe('DENY');
  }
});

test('the decided /ketentuan address leads to the terms', async ({ request, page }) => {
  for (const { from, to } of redirects) {
    const response = await request.get(from, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(to);
  }
  await page.goto('/ketentuan');
  await expect(page).toHaveURL(/\/syarat-ketentuan$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Syarat dan ketentuan');
});

test('no page sets a cookie or stores anything in the browser', async ({ page, context }) => {
  for (const path of ['/', ...sitePages.map((entry) => entry.path)]) {
    await openLanding(page, path);
    const stored = await page.evaluate(() => ({
      cookie: document.cookie,
      local: localStorage.length,
      session: sessionStorage.length,
    }));
    expect(stored, path).toEqual({ cookie: '', local: 0, session: 0 });
  }
  expect(await context.cookies()).toEqual([]);
});

/** Pressable things that are not links inside running text (WCAG 2.5.8 exempts those). */
async function smallTargets(page: Page) {
  return page.locator('a[href], button, summary').evaluateAll((elements) =>
    elements
      .filter((el) => el.checkVisibility())
      .filter(
        (el) => !el.closest('[data-prose] p, [data-prose] li, [data-prose] td, [data-prose] dd'),
      )
      .map((el) => ({ el, box: el.getBoundingClientRect() }))
      .filter(({ box }) => box.width < 47.99 || box.height < 47.99)
      .map(({ el, box }) => `${el.textContent?.trim() ?? ''} ${box.width}x${box.height}`),
  );
}

for (const width of [360, 1440]) {
  test(`at ${String(width)}px no page overflows, and controls keep a 48px target`, async ({
    browser,
    baseURL,
  }) => {
    const { context, page } = await newPage(browser, baseURL, {
      viewport: { width, height: 900 },
    });
    for (const entry of sitePages) {
      await openLanding(page, entry.path);
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
      expect(result.scroll, entry.path).toBeLessThanOrEqual(result.viewport);
      expect(result.outside, entry.path).toEqual([]);
      expect(await smallTargets(page), entry.path).toEqual([]);
    }
    await context.close();
  });
}

for (const colorScheme of ['light', 'dark'] as const) {
  test(`axe-core reports no violations on any page (${colorScheme})`, async ({
    browser,
    baseURL,
  }) => {
    const { context, page } = await newPage(browser, baseURL, { colorScheme });
    for (const entry of sitePages) {
      await openLanding(page, entry.path);
      await page.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
      const violations = await page.evaluate(async () => {
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
      expect(violations, entry.path).toEqual([]);
    }
    await context.close();
  });
}
