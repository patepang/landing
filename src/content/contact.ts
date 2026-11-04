/**
 * The site's addresses, in one place. `halo@` and `security@` are the owner's decision (app ADR
 * 0060 B32: the general contact the stores ask for, and the contact named in security.txt).
 * `privasi@` and `hukum@` give requests about personal data and legal requests their own
 * mailbox, as the brief for these pages asked; the owner creates all four before the site goes
 * to production (docs/landing-implementation.md §9). Nothing on the site collects anything: every
 * contact is a mailto link.
 */
export const contact = {
  /** Questions, help with the app, and the stores' general contact. */
  general: 'halo@patepang.com',
  /** Requests about personal data (UU PDP) and the data protection officer. */
  privacy: 'privasi@patepang.com',
  /** Vulnerability reports (security.txt, /keamanan). */
  security: 'security@patepang.com',
  /** Requests from authorities and other legal matters. */
  legal: 'hukum@patepang.com',
} as const;

export type ContactKey = keyof typeof contact;
