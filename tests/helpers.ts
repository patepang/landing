import type { Page } from '@playwright/test';

/**
 * Collects everything that would mean the page is broken or leaking: console errors and warnings
 * (hydration errors included), uncaught errors, failed or 4xx/5xx requests, and any request that
 * leaves the local origin.
 */
export function watchProblems(page: Page, origin: string): string[] {
  const problems: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') {
      problems.push(`console ${message.type()}: ${message.text()} @ ${message.location().url}`);
    }
  });
  page.on('pageerror', (error) => problems.push(`page error: ${error.message}`));
  page.on('requestfailed', (request) => {
    const reason = request.failure()?.errorText ?? '?';
    // Cancelled by the page itself (Next's router aborts its HEAD probe and stale prefetches);
    // nothing failed to load. Server errors still surface through the response check below.
    if (reason === 'net::ERR_ABORTED') return;
    problems.push(`request failed: ${request.url()} (${reason})`);
  });
  page.on('response', (response) => {
    if (response.status() >= 400) problems.push(`HTTP ${response.status()}: ${response.url()}`);
  });
  page.on('request', (request) => {
    const url = request.url();
    if (!url.startsWith(origin) && !url.startsWith('data:')) problems.push(`third party: ${url}`);
  });
  return problems;
}

/**
 * Waits for the page, its fonts, a quiet network and hydration: the tempel demo marks its controls
 * `data-hydrating` until its button can respond.
 */
export async function openLanding(page: Page, path = '/') {
  await page.goto(path, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  await page.waitForFunction(() => !document.querySelector('[data-hydrating]'));
}
