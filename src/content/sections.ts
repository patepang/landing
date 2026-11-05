/** In-page sections that navigation links to. Each id belongs to that section's heading. */
export const sections = [
  { id: 'cara-kerja', label: 'Cara kerja' },
  { id: 'fitur', label: 'Fitur' },
  { id: 'harga', label: 'Harga' },
  { id: 'tanya-jawab', label: 'Tanya jawab' },
] as const;

/**
 * The closing section, where the header's action leads: the store links once Patepang is out,
 * and until then when it will be (src/content/status.ts). The id stays the same in both states,
 * so links to it keep working when the switch flips.
 */
export const closingId = 'unduh';
