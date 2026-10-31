import { expect, test, type Browser, type Page } from '@playwright/test';

import { openWithBrowserSetting } from './browser-settings';
import { openLanding, watchProblems } from './helpers';

const HERO = 'section[aria-labelledby="judul-utama"]';
const PROBLEM = 'section[aria-labelledby="masalah"]';
const DEMO = 'section[aria-labelledby="cara-kerja"]';
const FAQ = 'section[aria-labelledby="tanya-jawab"]';
/** The walk-through moves on at 0.9s and 1.9s; waits allow far more, since order is checked. */
const STEP_TIMEOUT = 8000;

/** Each phase the phones show, with the step marked current at that moment. */
const STEPS = ['scan | Pindai kode', 'shake | Goyang bersama', 'done | Terhubung'];

declare global {
  interface Window {
    axe: {
      run: (
        context: Document,
        options: object,
      ) => Promise<{ violations: { id: string; nodes: { target: string[] }[] }[] }>;
    };
    tempelLog: string[];
    tempelSpoken: string[];
  }
}

/**
 * Records, from inside the page, every phase the walk-through shows together with the step marked
 * current at that same moment (`tempelLog`), and everything its live region announces
 * (`tempelSpoken`). Each phase lasts about a second, too short to sample reliably from the test
 * under load, so the page writes the sequence down itself.
 */
async function recordDemo(page: Page) {
  await page.evaluate((demo) => {
    window.tempelLog = [];
    window.tempelSpoken = [];
    const section = document.querySelector(demo);
    const player = section?.querySelector('div[data-phase]');
    const spoken = section?.querySelector('[role="status"]');
    if (!section || !player || !spoken) throw new Error('No walk-through');
    new MutationObserver(() => {
      const current = section.querySelector('li[aria-current="step"] .type-body-strong');
      window.tempelLog.push(
        `${player.getAttribute('data-phase') ?? '-'} | ${current?.textContent ?? '-'}`,
      );
    }).observe(player, { attributes: true, attributeFilter: ['data-phase'] });
    new MutationObserver(() => {
      if (spoken.textContent) window.tempelSpoken.push(spoken.textContent);
    }).observe(spoken, { childList: true, characterData: true, subtree: true });
  }, DEMO);
}

/** What the live region announces at each step, for runs started by a press. */
const SPOKEN = [
  'Langkah 1 dari 3: pindai kode.',
  'Langkah 2 dari 3: goyang bersama.',
  'Langkah 3 dari 3: terhubung. Koneksi dan momen pertama tercatat di kedua HP.',
];

/** `#RRGGBB` as the browser reports computed colours. */
function rgb(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return `rgb(${String(r)}, ${String(g)}, ${String(b)})`;
}

/** Brings the walk-through's stage well on screen, which starts it the first time. */
async function showStage(page: Page) {
  await page
    .locator(`${DEMO} div[aria-hidden="true"]`)
    .first()
    .evaluate((stage) => {
      stage.scrollIntoView({ block: 'center' });
    });
}

/**
 * The text of every link inside `scope` that is drawn on screen. A closed <details> hides its
 * content with content-visibility, which keeps layout boxes, so client rects are not enough.
 */
async function shownLinks(page: Page, scope: string) {
  return page
    .locator(`${scope} a`)
    .evaluateAll((links) =>
      links.filter((link) => link.checkVisibility()).map((link) => link.textContent),
    );
}

/**
 * Where the opening's phone and notes stand: how far the phone's bottom is from the stage's, and
 * for each note (in page order) how far its leader line is from the phone's frame and from the
 * line of the screen it is about: the card's title, the title "sebelum pamit, tempel dulu", and
 * the middle of the code's top corner squares. Also how much of the stage stays below the note.
 */
async function measureStage(page: Page) {
  return page.locator(HERO).evaluate((section) => {
    const device = section.querySelector('[role="img"]');
    const stage = device?.parentElement?.parentElement;
    const code = section.querySelector('[data-target="code"] svg');
    if (!device || !stage || !code) throw new Error('No stage');
    const firstLine = (el: Element | null) => {
      if (!el) throw new Error('No target');
      return el.getBoundingClientRect().top + parseFloat(getComputedStyle(el).lineHeight) / 2;
    };
    // The corner squares are 7 modules tall, after a 2-module margin, of the pattern's 29.
    const pattern = code.getBoundingClientRect();
    const aims: Record<string, number> = {
      born: firstLine(section.querySelector('[data-target="born"] .type-headline')),
      face: firstLine(section.querySelector('[data-target="face"]')),
      code: pattern.top + (pattern.height * 5.5) / 29,
    };
    const phone = device.getBoundingClientRect();
    const edge = stage.getBoundingClientRect().bottom;
    return {
      flush: Math.abs(phone.bottom - edge),
      notes: [...section.querySelectorAll<HTMLElement>('[data-note]')].map((note) => {
        const id = note.dataset.note ?? '';
        const line = getComputedStyle(note, '::after');
        const box = note.getBoundingClientRect();
        const start = box.left + parseFloat(line.left);
        const end = start + parseFloat(line.width);
        return {
          id,
          // The line runs from the note to the phone's frame, on whichever side it stands.
          reach: Math.min(Math.abs(end - phone.left), Math.abs(start - phone.right)),
          aim: Math.abs(box.top + parseFloat(line.top) - (aims[id] ?? Number.NaN)),
          below: edge - box.bottom,
        };
      }),
    };
  });
}

/** The phone stands on the stage edge, and each line runs from the phone to its part's line. */
function expectNotesInPlace(stage: Awaited<ReturnType<typeof measureStage>>) {
  expect(stage.flush).toBeLessThan(0.5);
  // In the order of the screen.
  expect(stage.notes.map(({ id }) => id)).toEqual(['born', 'face', 'code']);
  for (const note of stage.notes) {
    expect(note.reach, note.id).toBeLessThan(0.5);
    expect(note.aim, note.id).toBeLessThan(1);
    // At least 32px of the stage stays below every note.
    expect(note.below, note.id).toBeGreaterThanOrEqual(32);
  }
}

/**
 * Where the problem's story stands: how far the second dot has drifted along the rail (0 touching
 * the first dot, 1 at the far end) and how faded it is; how much of each memory in the contact is
 * left; how far Sari's post has been pushed down the feed, and how much of it still shows; and how
 * long ago the chat's last message was.
 */
async function storyState(page: Page) {
  return page.locator(PROBLEM).evaluate((section) => {
    const rail = section.querySelector('ol')?.parentElement?.firstElementChild;
    const [you, them] = [...(rail?.children ?? [])];
    const [feedWindow, age] = [...section.querySelectorAll('[data-intentional-crop]')];
    const post = [...(feedWindow?.firstElementChild?.children ?? [])].find((child) =>
      child.textContent.includes('Sari'),
    );
    if (!rail || !you || !them || !feedWindow || !age || !post) throw new Error('No story');
    const across = getComputedStyle(rail).height === getComputedStyle(you).height;
    const box = (el: Element) => el.getBoundingClientRect();
    const [line, first, second] = [box(rail), box(you), box(them)];
    const travelled = across ? second.left - first.right : second.top - first.bottom;
    const room = across
      ? line.right - first.right - second.width
      : line.bottom - first.bottom - second.height;
    const shown = [...(age.firstElementChild?.children ?? [])].find(
      (label) => Math.abs(box(label).top - box(age).top) < 1,
    );
    return {
      drift: travelled / room,
      fade: Number(getComputedStyle(them).opacity),
      dotMiddle: across ? second.left + second.width / 2 : second.top + second.height / 2,
      memories: [...section.querySelectorAll('[data-part]')]
        .slice(0, 3)
        .map((memory) => Number(getComputedStyle(memory).opacity)),
      sariFromTop: box(post).top - box(feedWindow).top,
      sariShowing: box(feedWindow).bottom - box(post).top,
      lastMessage: shown?.textContent ?? '',
    };
  });
}

/** Scrolls so the problem's story ends `below` px above the bottom of the window. */
async function showStory(page: Page, below: number) {
  await page.locator(PROBLEM).evaluate((section, gap) => {
    const story = section.querySelector('ol')?.parentElement;
    if (!story) throw new Error('No story');
    const bottom = story.getBoundingClientRect().bottom + window.scrollY;
    window.scrollTo(0, bottom - window.innerHeight + gap);
  }, below);
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
      'Setelah pamit, kabar sering berhenti begitu saja.',
      'Sebelum pamit, tempel dulu.',
      'Setelah bertemu, hubungan tetap terjaga.',
      'Dibuat untuk pertemuan seperti ini.',
      'Tanya jawab',
      'Patepang sudah hadir.',
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
    await expect(head.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /Sudah bisa diunduh/,
    );
    await expect(head.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://patepang.com',
    );
    await expect(head.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'id_ID');
    await expect(head.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary');
    await expect(head.locator('meta[property="og:image"]')).toHaveCount(0);
    await expect(head.locator('link[rel="icon"]')).toHaveAttribute('href', 'data:,');
  });

  test('says it is out, and makes no claims or offers it cannot keep', async ({ page }) => {
    await openLanding(page);
    // The opening offers Patepang itself first; the closing section says it is out.
    await expect(page.locator(HERO).getByRole('link', { name: 'Unduh Patepang' })).toHaveAttribute(
      'href',
      '#unduh',
    );
    await expect(page.getByRole('heading', { name: 'Patepang sudah hadir.' })).toBeVisible();
    for (const image of await page.locator('[role="img"]').all()) {
      await expect(image).toHaveAttribute('aria-label', /\S/);
    }
    // No forms, waitlists, store badges, ratings, security promises, and no quotes: the
    // situations in "Cerita" are examples told to the reader, not testimonials. The store links
    // are not in yet, so no store is named either.
    await expect(page.locator('form, input, textarea, select')).toHaveCount(0);
    await expect(page.locator('blockquote, q, cite')).toHaveCount(0);
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
      // The pre-launch wording is gone everywhere.
      'segera hadir',
      'belum bisa diunduh',
      'belum tersedia',
      'enkripsi',
      'terenkripsi',
      'keamanan',
      'privasi',
      'jamin',
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
    // Platform names as whole words ("ios" also hides inside ordinary words).
    expect(text).not.toMatch(/\bios\b/);
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

  test('calls to action move to their sections and put focus on the heading', async ({ page }) => {
    await openLanding(page);
    /** The heading is focused and shown below the floating header, not under it. */
    const lands = async (id: string) => {
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      const heading = page.locator(`#${id}`);
      await expect(heading).toBeFocused();
      await expect(heading).toBeInViewport();
      const covered = await heading.evaluate((el) => {
        const box = el.getBoundingClientRect();
        const hit = document.elementFromPoint(box.left + 8, box.top + 8);
        return hit !== null && !el.contains(hit);
      });
      expect(covered, id).toBe(false);
    };

    // The opening's two actions: see how it works, or go straight to getting it.
    const hero = page.locator(HERO);
    await hero.getByRole('link', { name: 'Lihat cara kerja' }).click();
    await lands('cara-kerja');
    await hero.getByRole('link', { name: 'Unduh Patepang' }).click();
    await lands('unduh');

    // The closing section leads back into the page.
    await page.getByRole('link', { name: 'Jelajahi fitur' }).click();
    await lands('fitur');
    await page.getByRole('link', { name: 'Lihat cara kerja' }).last().click();
    await lands('cara-kerja');

    // The header's download action leads to the closing section too.
    await page
      .getByRole('navigation', { name: 'Utama' })
      .getByRole('link', { name: 'Unduh Patepang' })
      .click();
    await lands('unduh');
  });

  test('the header shows the section links from 768px and a working menu below that', async ({
    browser,
    baseURL,
  }) => {
    const all = ['Cara kerja', 'Fitur', 'Cerita', 'Tanya jawab'];
    // On screen the action reads "Unduh"; its accessible name is "Unduh Patepang".
    const action = 'Unduh';
    const nav = 'nav[aria-label="Utama"]';

    const wide = await newPage(browser, baseURL, { viewport: { width: 768, height: 900 } });
    await openLanding(wide.page);
    expect(await shownLinks(wide.page, nav)).toEqual([...all, action]);
    await expect(wide.page.locator(`${nav} summary`)).toBeHidden();
    // Mark, links and action share one row.
    const tops = await wide.page
      .locator(`header a[href="#atas"], ${nav} a[data-section], ${nav} a[href="#unduh"]`)
      .evaluateAll((links) =>
        links
          .filter((link) => link.checkVisibility())
          .map((link) => {
            const box = link.getBoundingClientRect();
            return Math.round(box.top + box.height / 2);
          }),
      );
    expect(new Set(tops).size).toBe(1);
    await wide.context.close();

    const { context, page } = await newPage(browser, baseURL, {
      viewport: { width: 390, height: 844 },
    });
    await openLanding(page);
    const menu = page.locator(`${nav} details`);
    const button = menu.locator('summary');
    await expect(button).toHaveText('Menu');
    // The download action stays in reach; the section links wait behind the menu.
    expect(await shownLinks(page, nav)).toEqual([action]);

    // Choosing a link closes the menu and lands on the section, with focus on its heading.
    await button.click();
    expect(await shownLinks(page, nav)).toEqual([action, ...all]);
    await page.locator(nav).getByRole('link', { name: 'Tanya jawab' }).click();
    await expect(page).toHaveURL(/#tanya-jawab$/);
    await expect(page.locator('#tanya-jawab')).toBeFocused();
    await expect(menu).not.toHaveAttribute('open', '');

    // Keyboard: Enter opens it, Escape closes it and returns focus to the button.
    await button.focus();
    await page.keyboard.press('Enter');
    await expect(menu).toHaveAttribute('open', '');
    await page.keyboard.press('Tab');
    await expect(page.locator(nav).getByRole('link', { name: 'Cara kerja' })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(menu).not.toHaveAttribute('open', '');
    await expect(button).toBeFocused();
    await context.close();
  });

  test('the header floats once the page scrolls, and marks the section being read', async ({
    page,
  }) => {
    await openLanding(page);
    const header = page.locator('header');
    const current = page.locator('nav[aria-label="Utama"] a[aria-current="true"]');
    await expect(header).toHaveCSS('position', 'sticky');
    await expect(header).not.toHaveAttribute('data-floating');
    await expect(current).toHaveCount(0);

    for (const [id, name] of [
      ['fitur', 'Fitur'],
      ['cerita', 'Cerita'],
      ['cara-kerja', 'Cara kerja'],
    ] as const) {
      await page.locator(`#${id}`).evaluate((heading) => {
        heading.scrollIntoView({ block: 'start' });
      });
      await expect(header).toHaveAttribute('data-floating', '');
      // The same section on both of its links: the row's and the menu's.
      await expect(current).toHaveText([name, name]);
    }
    expect(await header.evaluate((el) => el.getBoundingClientRect().top)).toBe(0);

    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await expect(header).not.toHaveAttribute('data-floating');
    await expect(current).toHaveCount(0);
  });

  test('on phones the floating header steps aside on the way down and returns on the way up', async ({
    browser,
    baseURL,
  }) => {
    const { context, page } = await newPage(browser, baseURL, {
      viewport: { width: 390, height: 844 },
    });
    await openLanding(page);
    const header = page.locator('header');
    const bottom = () => header.evaluate((el) => el.getBoundingClientRect().bottom);

    // Near the top it floats and stays, so the capsule is seen first.
    await page.mouse.wheel(0, 100);
    await expect(header).toHaveAttribute('data-floating', '');
    await expect(header).not.toHaveAttribute('data-hidden');

    // Reading on, it steps out of the window; a little scroll back brings it in again.
    await page.mouse.wheel(0, 700);
    await expect(header).toHaveAttribute('data-hidden', '');
    await expect.poll(bottom).toBeLessThanOrEqual(0);
    await page.mouse.wheel(0, -100);
    await expect(header).not.toHaveAttribute('data-hidden');
    await expect.poll(bottom).toBeGreaterThan(0);

    // Keyboard focus brings it back too.
    await page.mouse.wheel(0, 700);
    await expect(header).toHaveAttribute('data-hidden', '');
    await header.locator('summary').focus();
    await expect(header).not.toHaveAttribute('data-hidden');
    await context.close();
  });

  test('the header mark dots meet once on arrival, and stay still with reduced motion', async ({
    browser,
    baseURL,
  }) => {
    for (const reducedMotion of ['no-preference', 'reduce'] as const) {
      const { context, page } = await newPage(browser, baseURL, { reducedMotion });
      await page.goto('/');
      const dots = page.locator('header [data-from] > span');
      const names = await dots.evaluateAll((spans) =>
        spans.map((span) => getComputedStyle(span).animationName),
      );
      if (reducedMotion === 'reduce') {
        expect(names).toEqual(['none', 'none']);
      } else {
        expect(names).toEqual([
          expect.stringContaining('first-arrives'),
          expect.stringContaining('second-arrives'),
        ]);
        expect(
          await dots.evaluateAll((spans) =>
            spans.map((span) => getComputedStyle(span).animationIterationCount),
          ),
        ).toEqual(['1', '1']);
        // Once met, nothing runs on them again.
        await expect
          .poll(() => dots.evaluateAll((spans) => spans.flatMap((span) => span.getAnimations())))
          .toHaveLength(0);
      }

      // Floating: with reduced motion the header changes shape at once instead of travelling.
      await page.evaluate(() => {
        window.scrollTo(0, 400);
      });
      await expect(page.locator('header')).toHaveAttribute('data-floating', '');
      const home = page.locator('header a[href="#atas"]');
      if (reducedMotion === 'reduce') await expect(home).toHaveCSS('transition-duration', '0s');
      else await expect(home).not.toHaveCSS('transition-duration', '0s');
      await context.close();
    }
  });

  test('the phone rises once as the page opens, the notes follow, and reduced motion keeps all still', async ({
    browser,
    baseURL,
  }) => {
    // The notes only stand beside the phone from 768px, so narrower screens get the rise alone.
    const cases = [
      { width: 1440, reducedMotion: 'no-preference', rises: true, notes: true },
      { width: 390, reducedMotion: 'no-preference', rises: true, notes: false },
      { width: 1440, reducedMotion: 'reduce', rises: false, notes: false },
    ] as const;
    for (const { width, reducedMotion, rises, notes } of cases) {
      const { context, page } = await newPage(browser, baseURL, {
        viewport: { width, height: 900 },
        reducedMotion,
      });
      await page.goto('/');
      const hero = page.locator(HERO);
      const motion = await hero.evaluate((section) => {
        const style = (el: Element | null, pseudo?: string) =>
          el ? getComputedStyle(el, pseudo) : null;
        const phone = style(section.querySelector('[role="img"]'));
        return {
          phone: [phone?.animationName, phone?.animationIterationCount],
          // Each note: its leader line, its title and its body.
          notes: [...section.querySelectorAll('[data-note]')].map((note) => [
            style(note, '::after')?.animationName,
            style(note.firstElementChild)?.animationName,
            style(note.lastElementChild)?.animationName,
          ]),
          targets: [...section.querySelectorAll('[data-target]')].map(
            (target) => style(target)?.animationName,
          ),
        };
      });
      const label = `${String(width)}px, ${reducedMotion}`;
      expect(motion.phone, label).toEqual(
        rises ? [expect.stringContaining('phone-rises'), '1'] : ['none', '1'],
      );
      for (const note of motion.notes) {
        expect(note, label).toEqual(
          notes
            ? [
                expect.stringContaining('leader-draws'),
                expect.stringContaining('note-appears'),
                expect.stringContaining('note-appears'),
              ]
            : ['none', 'none', 'none'],
        );
      }
      // In the order of the screen: the card, the line "sebelum pamit, tempel dulu", the code.
      expect(motion.targets, label).toEqual(
        notes
          ? [
              expect.stringContaining('target-rings'),
              expect.stringContaining('target-inks'),
              expect.stringContaining('target-rings'),
            ]
          : ['none', 'none', 'none'],
      );
      // Once played, nothing in the opening runs again.
      await expect
        .poll(() => hero.evaluate((section) => section.getAnimations({ subtree: true }).length))
        .toBe(0);
      await context.close();
    }
  });

  test('pointing at a note lights the part of the screen it explains', async ({
    browser,
    baseURL,
  }) => {
    for (const colorScheme of ['light', 'dark'] as const) {
      const { context, page } = await newPage(browser, baseURL, { colorScheme });
      await openLanding(page);
      const hero = page.locator(HERO);
      // After the opening, which lights each part once by itself.
      await expect
        .poll(() => hero.evaluate((section) => section.getAnimations({ subtree: true }).length))
        .toBe(0);
      // The stage's forest; the code card stays light in both themes, and so does its ring.
      const forest = rgb(colorScheme === 'light' ? '#1f5f4f' : '#7fcdb4');
      const lit = [
        ['born', 'box-shadow', `${forest} 0px 0px 0px 2px inset`],
        ['face', 'color', forest],
        ['code', 'box-shadow', `${rgb('#1f5f4f')} 0px 0px 0px 2px inset`],
      ] as const;
      for (const [id, property, value] of lit) {
        const target = hero.locator(`[data-target="${id}"]`);
        await expect(target).not.toHaveCSS(property, value);
        await hero.locator(`[data-note="${id}"]`).hover();
        await expect(target, `${id}, ${colorScheme}`).toHaveCSS(property, value);
      }
      await page.mouse.move(0, 0);
      for (const [id, property, value] of lit) {
        await expect(hero.locator(`[data-target="${id}"]`)).not.toHaveCSS(property, value);
      }
      await context.close();
    }
  });

  for (const width of [768, 1024, 1440]) {
    test(`at ${String(width)}px each note's line runs from the phone to the line it is about`, async ({
      browser,
      baseURL,
    }) => {
      const { context, page } = await newPage(browser, baseURL, {
        viewport: { width, height: 1000 },
        reducedMotion: 'reduce',
      });
      await openLanding(page);
      expectNotesInPlace(await measureStage(page));
      await context.close();
    });
  }

  test('with a larger text size the notes still meet the lines they are about', async () => {
    // 150% text: a 1440px window is 60em wide, so the notes still stand beside the phone.
    const context = await openWithBrowserSetting(
      test.info(),
      { textSize: 24 },
      { window: { width: 1440, height: 900 } },
    );
    const page = context.pages()[0] ?? (await context.newPage());
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await openLanding(page);
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).fontSize)).toBe(
      '24px',
    );
    expectNotesInPlace(await measureStage(page));
    await context.close();
  });

  test('the problem is told as one meeting fading over a week, a month and a year', async ({
    page,
  }) => {
    await openLanding(page);
    // The pictures are pictures only: what reaches assistive technology is the words.
    await expect(page.locator(PROBLEM)).toMatchAriaSnapshot(`
      - heading "Setelah pamit, kabar sering berhenti begitu saja." [level=2]
      - paragraph: Pertemuannya hangat. Setelah berpisah, hubungannya perlahan hilang.
      - list:
        - listitem:
          - paragraph: Seminggu kemudian
          - heading "Kontaknya tersimpan, ceritanya hilang." [level=3]
          - paragraph: /^Nama dan nomor ada di HP/
        - listitem:
          - paragraph: Sebulan kemudian
          - heading "Kabarnya tenggelam." [level=3]
          - paragraph: /^Kabar dari orang yang kamu temui/
        - listitem:
          - paragraph: Setahun kemudian
          - heading "Bertemu lagi terus tertunda." [level=3]
          - paragraph: /basa-basi\.$/
    `);
  });

  test('time passes as the story scrolls into view, and stands still with reduced motion', async ({
    browser,
    baseURL,
  }) => {
    for (const reducedMotion of ['no-preference', 'reduce'] as const) {
      const { context, page } = await newPage(browser, baseURL, {
        viewport: { width: 1440, height: 900 },
        reducedMotion,
      });
      await openLanding(page);
      const ended = {
        drift: expect.closeTo(1, 2),
        fade: expect.closeTo(0.4, 2),
        memories: [0, 0, 0],
        // Five posts above it, Sari's post shows only its first 32px at the bottom of the feed.
        sariShowing: expect.closeTo(32, 0),
        lastMessage: 'setahun lalu',
      };
      if (reducedMotion === 'reduce') {
        // Nothing moves: the story shows how it ends wherever the reader is.
        expect(await storyState(page)).toMatchObject(ended);
        expect(
          await page
            .locator(PROBLEM)
            .evaluate((section) => section.getAnimations({ subtree: true }).length),
        ).toBe(0);
      } else {
        // Before the story comes into view, the two dots still touch and nothing has faded.
        expect(await storyState(page)).toMatchObject({
          drift: expect.closeTo(0, 2),
          fade: 1,
          memories: [1, 1, 1],
          sariFromTop: expect.closeTo(0, 0),
          lastMessage: 'hari ini',
        });
        // Fully in view, the story has played to its end.
        await showStory(page, 40);
        await expect.poll(() => storyState(page)).toMatchObject(ended);
        // And it plays back as the reader scrolls back up.
        await page.evaluate(() => {
          window.scrollTo(0, 0);
        });
        await expect.poll(async () => (await storyState(page)).lastMessage).toBe('hari ini');
      }
      await context.close();
    }
  });

  test('on phones the drifting dot follows the middle of the window down the rail', async ({
    browser,
    baseURL,
  }) => {
    const { context, page } = await newPage(browser, baseURL, {
      viewport: { width: 390, height: 844 },
    });
    await openLanding(page);
    for (const share of [0.25, 0.5, 0.75]) {
      await page.locator(PROBLEM).evaluate((section, at) => {
        const story = section.querySelector('ol')?.parentElement;
        if (!story) throw new Error('No story');
        const box = story.getBoundingClientRect();
        window.scrollTo(0, box.top + window.scrollY + box.height * at - window.innerHeight / 2);
      }, share);
      await expect
        .poll(async () => Math.abs((await storyState(page)).dotMiddle - 844 / 2))
        .toBeLessThan(1);
    }
    await context.close();
  });

  test('a click or a tap never leaves the blue focus ring; the keyboard does', async ({
    browser,
    baseURL,
  }) => {
    const ring = (page: Page) =>
      page.evaluate(() => getComputedStyle(document.activeElement ?? document.body).outlineStyle);

    const desk = await newPage(browser, baseURL, { viewport: { width: 1280, height: 800 } });
    await openLanding(desk.page);
    const nav = desk.page.getByRole('navigation', { name: 'Utama' });
    for (const target of [
      nav.getByRole('link', { name: 'Cerita' }),
      nav.getByRole('link', { name: 'Unduh Patepang' }),
      desk.page.locator(`${FAQ} summary`).first(),
      desk.page.getByRole('button', { name: /^Putar/ }),
      desk.page.getByRole('link', { name: 'Kembali ke atas' }),
    ]) {
      await target.click();
      expect(await ring(desk.page)).toBe('none');
    }
    await desk.page.keyboard.press('Tab');
    expect(await ring(desk.page)).toBe('solid');
    await desk.context.close();

    // Taps, and the browser's own tap tint (blue on Android) is off on everything pressable.
    const phone = await newPage(browser, baseURL, {
      viewport: { width: 390, height: 844 },
      hasTouch: true,
      isMobile: true,
    });
    await openLanding(phone.page);
    const menu = phone.page.getByRole('navigation', { name: 'Utama' });
    await menu.locator('summary').tap();
    expect(await ring(phone.page)).toBe('none');
    await menu.getByRole('link', { name: 'Fitur' }).tap();
    expect(await ring(phone.page)).toBe('none');
    const tints = await phone.page
      .locator('a, button, summary')
      .evaluateAll((elements) => [
        ...new Set(
          elements.map((el) =>
            getComputedStyle(el).getPropertyValue('-webkit-tap-highlight-color'),
          ),
        ),
      ]);
    expect(tints).toEqual(['rgba(0, 0, 0, 0)']);
    await phone.context.close();
  });

  test('no scrollbar is drawn, and the page still scrolls', async ({ page }) => {
    await openLanding(page);
    await expect(page.locator('html')).toHaveCSS('scrollbar-width', 'none');
    await page.mouse.wheel(0, 600);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  });

  test('the footer wordmark is exactly as wide as the page column, and the way back up works', async ({
    browser,
    baseURL,
  }) => {
    for (const width of [360, 768, 1440]) {
      const { context, page } = await newPage(browser, baseURL, {
        viewport: { width, height: 900 },
      });
      await openLanding(page);
      // The ink as drawn: the first and last columns of wordmark pixels, against the column.
      const wordmark = page.locator('footer p[aria-hidden="true"]');
      await wordmark.scrollIntoViewIfNeeded();
      const area = await wordmark.evaluate((el) => {
        const column = el.closest('footer')?.firstElementChild;
        if (!(column instanceof HTMLElement)) throw new Error('No column');
        const box = column.getBoundingClientRect();
        const padding = getComputedStyle(column);
        const own = el.getBoundingClientRect();
        return {
          top: own.top,
          height: own.height,
          columnLeft: box.left + parseFloat(padding.paddingLeft),
          columnRight: box.right - parseFloat(padding.paddingRight),
        };
      });
      const shot = await page.screenshot({
        clip: { x: 0, y: area.top, width, height: area.height },
      });
      const ink = await page.evaluate(async (png) => {
        const image = new Image();
        image.src = `data:image/png;base64,${png}`;
        await image.decode();
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');
        if (!context) throw new Error('No canvas');
        context.drawImage(image, 0, 0);
        const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
        // Forest ink is far darker in red than the ivory canvas: the midpoint splits them.
        const inked = (x: number) => {
          for (let y = 0; y < canvas.height; y += 1) {
            if ((data[(y * canvas.width + x) * 4] ?? 255) < 139) return true;
          }
          return false;
        };
        let left = 0;
        while (left < canvas.width && !inked(left)) left += 1;
        let right = canvas.width - 1;
        while (right > left && !inked(right)) right -= 1;
        return { left, right: right + 1 };
      }, shot.toString('base64'));
      const fit = {
        inkLeft: ink.left,
        inkRight: ink.right,
        columnLeft: area.columnLeft,
        columnRight: area.columnRight,
      };
      expect(Math.abs(fit.inkLeft - fit.columnLeft), String(width)).toBeLessThan(1);
      expect(Math.abs(fit.inkRight - fit.columnRight), String(width)).toBeLessThan(1);

      if (width === 1440) {
        // Back to the very top, although the floating header is in view the whole time.
        await page.getByRole('link', { name: 'Kembali ke atas' }).click();
        await expect(page).toHaveURL(/#atas$/);
        await expect(page.locator('#atas')).toBeFocused();
        await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
        // The mark in the floating header leads there too.
        await page.locator('#cerita').evaluate((heading) => {
          heading.scrollIntoView();
        });
        await page.locator('header a[href="#atas"]').click();
        await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
      }
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
      'Patepang',
      'Cara kerja',
      'Fitur',
      'Cerita',
      'Tanya jawab',
      'Unduh Patepang',
      // The opening's two actions.
      'Unduh Patepang',
      'Lihat cara kerja',
    ]);
    // Then the walk-through's button: "Putar", or "Putar lagi" once it has played by itself.
    expect(stops[9]).toMatch(/^Putar/);
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
      // Below 768px the section links live in the menu: open it so they are measured too, once
      // the header has settled (mid-slide, a translated box can measure a hair under its size).
      if (width < 768) {
        await page.locator('nav[aria-label="Utama"] summary').click();
        await expect
          .poll(() =>
            page
              .locator('header')
              .evaluate(
                (header) =>
                  header
                    .getAnimations({ subtree: true })
                    .filter((animation) => animation.playState === 'running').length,
              ),
          )
          .toBe(0);
      }
      const small = await page.locator('a[href], button, summary').evaluateAll((elements) =>
        elements
          .filter((el) => el.checkVisibility())
          .map((el) => ({ el, box: el.getBoundingClientRect() }))
          // Within a hundredth of a pixel: layout rounds to 1/64 px.
          .filter(({ box }) => box.width < 47.99 || box.height < 47.99)
          .map(({ el, box }) => `${el.textContent?.trim() ?? ''} ${box.width}x${box.height}`),
      );
      expect(small).toEqual([]);
      await context.close();
    });
  }

  test('the walk-through plays once on view, quietly, and announces runs that are asked for', async ({
    page,
    baseURL,
  }) => {
    const problems = watchProblems(page, baseURL ?? '');
    await openLanding(page);
    const demo = page.locator(`${DEMO} div[data-phase]`).first();
    const spoken = page.getByRole('status');
    await expect(demo).toHaveAttribute('data-phase', 'idle');
    await recordDemo(page);

    // Brought on screen, it plays by itself: each phase on the phones with the same step marked
    // current. Nobody asked for it, so the live region stays silent.
    await showStage(page);
    await expect(demo).toHaveAttribute('data-phase', 'done', { timeout: STEP_TIMEOUT });
    // Both phones end on the two dots met.
    await expect(page.locator(`${DEMO} span[data-phase="meet"]`)).toHaveCount(2);
    expect(await page.evaluate(() => window.tempelLog)).toEqual(STEPS);
    expect(await page.evaluate(() => window.tempelSpoken)).toEqual([]);
    await expect(spoken).toHaveText('');

    // Only once, and it never loops: leaving and coming back does not start it again.
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await showStage(page);
    await page.waitForTimeout(2500);
    await expect(demo).toHaveAttribute('data-phase', 'done');
    expect(await page.evaluate(() => window.tempelLog)).toEqual(STEPS);

    // "Putar lagi" starts it over from the first step, keeps keyboard focus on the button, and,
    // being asked for, is announced step by step.
    const replay = page.getByRole('button', { name: 'Putar lagi cara tempel' });
    await replay.click();
    await expect(replay).toBeFocused();
    await expect(spoken).toHaveText(/^Langkah 3 dari 3/, { timeout: STEP_TIMEOUT });
    expect(await page.evaluate(() => window.tempelLog)).toEqual([...STEPS, ...STEPS]);
    expect(await page.evaluate(() => window.tempelSpoken)).toEqual(SPOKEN);
    expect(problems).toEqual([]);
  });

  test('the walk-through waits until its stage is well on screen, and a press comes first', async ({
    page,
  }) => {
    await openLanding(page);
    const demo = page.locator(`${DEMO} div[data-phase]`).first();
    const stage = page.locator(`${DEMO} div[aria-hidden="true"]`).first();
    await recordDemo(page);

    // A quarter of the stage on screen is not enough to start it.
    await stage.evaluate((el) => {
      const box = el.getBoundingClientRect();
      window.scrollBy(0, box.top - window.innerHeight + box.height * 0.25);
    });
    await page.waitForTimeout(1500);
    await expect(demo).toHaveAttribute('data-phase', 'idle');

    // Pressed before it ever played by itself, it plays once, announced, and seeing the whole
    // stage afterwards does not start it again.
    await page.locator(`${DEMO} button`).evaluate((button) => {
      (button as HTMLButtonElement).click();
    });
    await expect(demo).toHaveAttribute('data-phase', 'done', { timeout: STEP_TIMEOUT });
    await showStage(page);
    await page.waitForTimeout(2500);
    expect(await page.evaluate(() => window.tempelLog)).toEqual(STEPS);
    expect(await page.evaluate(() => window.tempelSpoken)).toEqual(SPOKEN);
  });

  test('if its script never loads, the walk-through offers no button that does nothing', async ({
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

  test('under reduced motion the walk-through reaches every step without moving', async ({
    browser,
    baseURL,
  }) => {
    const { context, page } = await newPage(browser, baseURL, { reducedMotion: 'reduce' });
    await openLanding(page);
    await recordDemo(page);
    await showStage(page);
    await expect(page.locator(`${DEMO} div[data-phase]`).first()).toHaveAttribute(
      'data-phase',
      'done',
      { timeout: STEP_TIMEOUT },
    );
    expect(await page.evaluate(() => window.tempelLog)).toEqual(STEPS);
    // At the end, where full motion leaves the phones moved together, they have not moved.
    const phones = await page
      .locator(`${DEMO} div[aria-hidden="true"] > div > span`)
      .evaluateAll((spans) =>
        spans.map((span) => {
          const style = getComputedStyle(span);
          return `${style.animationName} ${style.transform}`;
        }),
      );
    expect(phones).toEqual(['none none', 'none none']);
    await context.close();
  });

  test('FAQ answers open with the keyboard and the pointer', async ({ page }) => {
    await openLanding(page);
    const first = page.locator(`${FAQ} details`).first();
    await first.locator('summary').focus();
    await page.keyboard.press('Enter');
    await expect(first).toHaveAttribute('open', '');
    await expect(first.locator('p')).toBeVisible();
    await page.keyboard.press('Space');
    await expect(first).not.toHaveAttribute('open', '');

    const last = page.locator(`${FAQ} details`).last();
    await last.locator('summary').click();
    await expect(last.locator('p')).toContainText('sudah bisa diunduh');
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
    // The header rests at the top of the page: floating needs the script that styles it.
    await expect(page.locator('header')).toHaveCSS('position', 'relative');
    await expect(page.locator(`${DEMO} ol > li`)).toHaveCount(3);
    await expect(page.getByText('Selesai untuk hari ini')).toBeVisible();
    await expect(page.getByText('Memudar dalam 24 hari.', { exact: false })).toBeVisible();
    // The walk-through's button needs JavaScript, so it is not offered; the steps stay readable.
    await expect(page.getByRole('button', { name: /^Putar/ })).toBeHidden();

    await page.getByRole('link', { name: 'Lihat cara kerja' }).first().click();
    await expect(page).toHaveURL(/#cara-kerja$/);
    const faq = page.locator(`${FAQ} details`).nth(1);
    await faq.locator('summary').click();
    await expect(faq).toHaveAttribute('open', '');
    await context.close();

    // The phone menu is a native disclosure, so it opens and its links work without JavaScript.
    // Reduced motion: without JavaScript, Playwright cannot wait for the panel's unfolding to end
    // before it clicks (its stability check needs page scripts), so the panel only fades here.
    const phone = await newPage(browser, baseURL, {
      javaScriptEnabled: false,
      reducedMotion: 'reduce',
      viewport: { width: 390, height: 844 },
    });
    await phone.page.goto('/');
    const nav = phone.page.locator('nav[aria-label="Utama"]');
    await nav.locator('summary').click();
    await nav.getByRole('link', { name: 'Fitur' }).click();
    await expect(phone.page).toHaveURL(/#fitur$/);
    await phone.context.close();
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
      .getByRole('link', { name: 'Cara kerja' })
      .click();
    await expect(page).toHaveURL(/\/#cara-kerja$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Hanya orang yang pernah kamu temui.',
    );
    await expect(page.locator('#cara-kerja')).toBeInViewport();
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

/**
 * Runs axe on the page at rest, once its opening (the time-based animations) has played: a note
 * still fading in would measure as low contrast. Scroll-driven animations rest wherever the page
 * is scrolled, so they are measured as they stand.
 */
async function runAxe(page: Page) {
  await page.waitForFunction(() =>
    document
      .getAnimations()
      .every(
        (animation) =>
          animation.timeline !== document.timeline || animation.playState !== 'running',
      ),
  );
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
