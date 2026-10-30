/** In-page sections that navigation links to. Each id belongs to that section's heading. */
export const sections = [
  { id: 'cara-kerja', label: 'Cara kerja' },
  { id: 'fitur', label: 'Fitur' },
  { id: 'cerita', label: 'Cerita' },
  { id: 'tanya-jawab', label: 'Tanya jawab' },
] as const;

/**
 * Where the header's download action leads: the closing section. It will hold the store links
 * once they exist; until then it says how to start.
 */
export const download = { id: 'unduh', label: 'Unduh Patepang' } as const;
