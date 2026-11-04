import type { Availability } from '../../src/content/availability';

/**
 * The launched state, for tests only: `pnpm test:tersedia` builds the site with this module in
 * place of src/content/availability.ts (next.config.ts). The links are the stores' own front
 * pages, not a real listing, so a test build can never point at someone else's app.
 */
export const availability: Availability = {
  state: 'tersedia',
  appStore: 'https://apps.apple.com/',
  googlePlay: 'https://play.google.com/store/apps',
};
