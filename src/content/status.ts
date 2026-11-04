import { availability } from '@/content/availability';

import { statusFor } from './status-copy';

/**
 * The site's words for the current state of the owner's switch (src/content/availability.ts).
 * Components read these; none of them looks at the switch directly, so flipping it changes the
 * whole site at once. The words themselves are in src/content/status-copy.ts.
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
