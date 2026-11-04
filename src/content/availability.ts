/**
 * Whether Patepang can be installed yet: the one switch the owner flips at launch.
 *
 * - `segera`: Patepang is not in the App Store or Google Play yet (the state on 4 November 2026).
 *   Every page says so plainly, and nothing offers a download.
 * - `tersedia`: both store links are in. The header, the opening, the closing section, the
 *   questions and the page descriptions offer them, and the "not out yet" notes disappear.
 *
 * To launch, replace the value below with the two store pages, for example:
 *
 *   export const availability: Availability = {
 *     state: 'tersedia',
 *     appStore: 'https://apps.apple.com/id/app/…',
 *     googlePlay: 'https://play.google.com/store/apps/details?id=…',
 *   };
 *
 * Everything that depends on it reads src/content/status.ts, which derives its words from this
 * value. The tests build the site a second time with the `tersedia` state of
 * tests/fixtures/availability-tersedia.ts (see next.config.ts), so both states stay checked.
 */
export type Availability =
  | { readonly state: 'segera' }
  | { readonly state: 'tersedia'; readonly appStore: string; readonly googlePlay: string };

export const availability: Availability = { state: 'segera' };
