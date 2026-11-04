/**
 * The site's pages other than the landing, in one list: the footer, the policies index
 * (/kebijakan), the sitemap and the tests all read it, so a page cannot be added without being
 * linked and listed. `draft` marks the documents that are waiting for counsel's review: they show
 * the draft notice and are not in force yet.
 *
 * Relative imports only: the Playwright tests import this file directly.
 */
export interface SitePage {
  readonly path: `/${string}`;
  /** The page's H1, and the start of its <title>. */
  readonly title: string;
  /** The link's words in the footer and the index, when shorter than the title. */
  readonly label: string;
  /** One sentence: the page's description in search results, link previews and the index. */
  readonly description: string;
  /** Where the footer lists it. */
  readonly group: 'patepang' | 'kebijakan' | 'bantuan';
  /** A document waiting for counsel's review: it carries the draft notice. */
  readonly draft: boolean;
  /** When its text last changed (ISO date). */
  readonly updated: string;
}

/** The date of the first published drafts. */
const FIRST_DRAFT = '2026-11-04';

export const sitePages = [
  {
    path: '/tentang',
    title: 'Tentang Patepang',
    label: 'Tentang',
    description:
      'Siapa yang membangun Patepang, prinsip yang dipegang, dan keadaan Patepang sekarang.',
    group: 'patepang',
    draft: false,
    updated: FIRST_DRAFT,
  },
  {
    path: '/kebijakan-privasi',
    title: 'Kebijakan privasi',
    label: 'Kebijakan privasi',
    description:
      'Data apa yang diproses Patepang, untuk apa, di mana, berapa lama, siapa yang memprosesnya, dan hakmu atas datamu.',
    group: 'kebijakan',
    draft: true,
    updated: FIRST_DRAFT,
  },
  {
    path: '/syarat-ketentuan',
    title: 'Syarat dan ketentuan',
    label: 'Syarat dan ketentuan',
    description:
      'Perjanjian antara kamu dan Patepang: siapa yang boleh memakai, akunmu, isimu, langganan, dan penyelesaian masalah.',
    group: 'kebijakan',
    draft: true,
    updated: FIRST_DRAFT,
  },
  {
    path: '/pedoman-komunitas',
    title: 'Pedoman komunitas',
    label: 'Pedoman komunitas',
    description:
      'Yang tidak boleh dilakukan di Patepang, cara melapor, apa yang dilihat moderator, sanksi, dan banding.',
    group: 'kebijakan',
    draft: true,
    updated: FIRST_DRAFT,
  },
  {
    path: '/langganan',
    title: 'Langganan dan pembayaran',
    label: 'Langganan',
    description:
      'Paket, harga, masa coba, pembayaran lewat App Store dan Google Play, cara berhenti, pengembalian dana, dan ruang media.',
    group: 'kebijakan',
    draft: true,
    updated: FIRST_DRAFT,
  },
  {
    path: '/lisensi',
    title: 'Lisensi dan kode terbuka',
    label: 'Lisensi',
    description:
      'Lisensi AGPL-3.0 untuk kode Patepang, rencana membuka kode, dan perangkat lunak pihak ketiga di situs ini.',
    group: 'kebijakan',
    draft: false,
    updated: FIRST_DRAFT,
  },
  {
    path: '/hapus-akun',
    title: 'Menghapus akun dan data',
    label: 'Hapus akun',
    description:
      'Cara menghapus akun Patepang dan datamu, apa yang terhapus, kapan, dan apa yang tersisa.',
    group: 'bantuan',
    draft: false,
    updated: FIRST_DRAFT,
  },
  {
    path: '/keamanan',
    title: 'Keamanan',
    label: 'Keamanan',
    description:
      'Cara Patepang melindungi orang yang memakainya, batasnya, dan cara melaporkan kerentanan dengan aman.',
    group: 'bantuan',
    draft: true,
    updated: FIRST_DRAFT,
  },
  {
    path: '/transparansi',
    title: 'Transparansi',
    label: 'Transparansi',
    description:
      'Berkas dan laporan yang akan diterbitkan Patepang, dan apa yang bisa dan tidak bisa diberikan atas permintaan aparat.',
    group: 'bantuan',
    draft: true,
    updated: FIRST_DRAFT,
  },
  {
    path: '/kontak',
    title: 'Kontak',
    label: 'Kontak',
    description: 'Alamat surel Patepang untuk bantuan, data pribadi, keamanan, dan urusan hukum.',
    group: 'bantuan',
    draft: false,
    updated: FIRST_DRAFT,
  },
  {
    path: '/kebijakan',
    title: 'Kebijakan privasi dan ketentuan',
    label: 'Semua kebijakan',
    description:
      'Semua kebijakan dan ketentuan Patepang di satu tempat: privasi, syarat, pedoman komunitas, langganan, keamanan, dan lainnya.',
    group: 'bantuan',
    draft: false,
    updated: FIRST_DRAFT,
  },
] as const satisfies readonly SitePage[];

export type SitePath = (typeof sitePages)[number]['path'];

/** The page registered at `path`; the registry is the only place a page's words live. */
export function pageAt(path: SitePath): SitePage {
  const page = sitePages.find((candidate) => candidate.path === path);
  if (!page) throw new Error(`No page at ${path}`);
  return page;
}

/** Addresses that only redirect, for the hosting config and its tests (vercel.json). */
export const redirects = [{ from: '/ketentuan', to: '/syarat-ketentuan' }] as const;
