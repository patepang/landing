/** In-page sections that navigation links to. Each id belongs to that section's heading. */
export const sections = [
  { id: 'cara-tempel', label: 'Cara tempel' },
  { id: 'setelah-bertemu', label: 'Setelah bertemu' },
  { id: 'prototipe', label: 'Prototipe' },
  { id: 'tanya-jawab', label: 'Tanya jawab' },
] as const;

export type SectionId = (typeof sections)[number]['id'];

/** The one section link kept in the header on narrow screens. */
export const compactHeaderSection: SectionId = 'tanya-jawab';
