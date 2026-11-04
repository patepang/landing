/**
 * Who is behind Patepang, for the legal pages. None of it is decided yet (fakta-data §1: the legal
 * entity, its address, its registrations and a data protection officer are not in any repository),
 * so every value is `null`, and the pages show a marked placeholder in its place. Fill a value
 * here and every page that names it updates; the placeholders and the draft notice stay until the
 * counsel review is done (src/content/legal.ts).
 */
export const entity: {
  /** The company or foundation that runs Patepang and controls the data (pengendali data). */
  readonly name: string | null;
  /** Its registered address. */
  readonly address: string | null;
  /** Its business number (NIB) and its private electronic system operator registration (PSE). */
  readonly registration: string | null;
  /** The data protection officer (Pejabat Pelindungan Data Pribadi), named or as a role. */
  readonly dpo: string | null;
  /** The district court chosen for disputes that go to court. */
  readonly court: string | null;
} = {
  name: null,
  address: null,
  registration: null,
  dpo: null,
  court: null,
};

/** The words a placeholder shows while its value is missing. */
export const entityPlaceholder = {
  name: 'Nama badan hukum',
  address: 'Alamat',
  registration: 'NIB/PSE',
  dpo: 'Petugas pelindungan data',
  court: 'Pengadilan negeri yang dipilih',
} as const satisfies Record<keyof typeof entity, string>;
