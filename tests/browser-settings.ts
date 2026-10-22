import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { chromium, type BrowserContext, type TestInfo } from '@playwright/test';

/**
 * Opens a real Chromium window whose profile already carries a browser setting, so the page is
 * tested under the browser's own zoom or text size rather than an emulated viewport:
 *
 * - `zoom`: the page zoom that Ctrl/Cmd + changes (`partition.default_zoom_level`, in steps of
 *   1.2^level). At 200% a 1440px window lays the page out at 720 CSS px with devicePixelRatio 2.
 * - `textSize`: the "Font size" setting (`webkit.webprefs.default_font_size`); 32 is 200% of 16.
 *
 * These settings need full Chromium in its new headless mode (`channel: 'chromium'`); the
 * stripped-down headless shell ignores them, so each test also asserts the setting took effect.
 *
 * `size` is a real window for zoom (the browser itself lays the page out narrower). Headless
 * Chromium will not open a window narrower than 500px, so phone widths use an emulated viewport;
 * that suits the text-size setting, which does not depend on the window.
 */
export async function openWithBrowserSetting(
  testInfo: TestInfo,
  setting: { zoom: number } | { textSize: number },
  size:
    { window: { width: number; height: number } } | { viewport: { width: number; height: number } },
): Promise<BrowserContext> {
  const profile = testInfo.outputPath(`profile-${String(Date.now())}`);
  mkdirSync(join(profile, 'Default'), { recursive: true });
  const preferences =
    'zoom' in setting
      ? { partition: { default_zoom_level: { x: Math.log(setting.zoom) / Math.log(1.2) } } }
      : { webkit: { webprefs: { default_font_size: setting.textSize } } };
  writeFileSync(join(profile, 'Default', 'Preferences'), JSON.stringify(preferences));
  return chromium.launchPersistentContext(profile, {
    channel: 'chromium',
    baseURL: testInfo.project.use.baseURL,
    ...('window' in size
      ? {
          viewport: null,
          args: [`--window-size=${String(size.window.width)},${String(size.window.height)}`],
        }
      : { viewport: size.viewport }),
  });
}

/**
 * Elements that hide overflowing content and are actually hiding some, except the one crop that
 * is intended (the code pattern running off the stage). Empty means no text is cut off.
 */
export function clippedElements(): string[] {
  return [...document.querySelectorAll('body *')]
    .filter((el) => !el.closest('[data-intentional-crop]'))
    .filter((el) => {
      const style = getComputedStyle(el);
      const clipsX = style.overflowX === 'hidden' || style.overflowX === 'clip';
      const clipsY = style.overflowY === 'hidden' || style.overflowY === 'clip';
      return (
        (clipsX && el.scrollWidth > el.clientWidth + 1) ||
        (clipsY && el.scrollHeight > el.clientHeight + 1)
      );
    })
    .map((el) => `${el.tagName.toLowerCase()}.${String(el.className)}`);
}
