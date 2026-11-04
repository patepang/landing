/**
 * Who is behind Patepang, for the legal pages. Taken from the company's own registration papers,
 * given by the owner on 4 November 2026: the Nomor Induk Berusaha (NIB) issued through OSS, the
 * Minister of Law's decree that registered the company (AHU-A135058.AH.01.30.Tahun 2026, 28 October
 * 2026), the founding statement, and the company's tax card. Only the company's public identity is
 * used here: its name, its registered office and its business number. The founder's own details
 * (identity number, date of birth, home address, personal tax number) and the telephone number on
 * the NIB are left out on purpose; people reach the company through the addresses in
 * `contact.ts`.
 *
 * A value that is `null` shows a marked placeholder instead. Change a value here and every page
 * that names it updates; the draft notice stays until the counsel review is done (the `draft`
 * flags in src/content/pages.ts).
 */
export const entity: {
  /** The company that runs Patepang and controls the data (pengendali data). */
  readonly name: string | null;
  /** Its registered office. */
  readonly address: string | null;
  /** Its business number (Nomor Induk Berusaha, NIB). */
  readonly registration: string | null;
  /**
   * Its registration as a private electronic system operator (PSE lingkup privat), once made;
   * `null` until then. The pages say it follows before launch and show a placeholder after.
   */
  readonly pse: string | null;
  /** The data protection officer (Pejabat Pelindungan Data Pribadi), named or as a role. */
  readonly dpo: string | null;
  /** The district court chosen for disputes that go to court. */
  readonly court: string | null;
} = {
  name: 'PT Pakuan Teknologi Pangrango',
  address:
    'Jl. Cihideung Udik RT 004/RW 009, Desa Cihideung Udik, Kecamatan Ciampea, Kabupaten Bogor, Jawa Barat 16620, Indonesia',
  registration: 'NIB 2810260094182',
  // Registered before launch (the owner's plan): see `Registration` in components/doc/parts.tsx.
  pse: null,
  // A sole-founder company (perseroan perorangan) has one director; the role is named, not the
  // person, and it is reached through the privacy address the sentence names just before.
  dpo: 'direktur perseroan, lewat alamat surel yang sama',
  // The district court of the company's registered office (Kabupaten Bogor).
  court: 'Pengadilan Negeri Cibinong',
};

/** The words a placeholder shows while its value is missing. */
export const entityPlaceholder = {
  name: 'Nama badan hukum',
  address: 'Alamat',
  registration: 'NIB',
  pse: 'Nomor tanda daftar PSE',
  // Named after the label the pages give it ("Pejabat pelindungan data pribadi: …"), one term.
  dpo: 'Nama atau jabatan pejabatnya',
  court: 'Pengadilan negeri yang dipilih',
} as const satisfies Record<keyof typeof entity, string>;
