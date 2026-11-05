import { availability } from '@/content/availability';

import { statusFor } from './status-copy';

/**
 * The site's words for the current state of the owner's switch (src/content/availability.ts).
 * Components read these; none of them looks at the switch directly, so flipping it changes the
 * whole site at once. The words shared across the site are in src/content/status-copy.ts; a page
 * whose own sentences depend on the launch (the legal pages, /keamanan, /transparansi, /tentang,
 * /lisensi) reads `released` and says both states itself. tests/availability.spec.ts reads every
 * page of each state's build for words that belong to the other state.
 */
export const {
  released,
  stores,
  headerAction,
  heroStatus,
  closing,
  whenAnswer,
  descriptionStatus,
  pageNote,
  aboutStatus,
} = statusFor(availability);
