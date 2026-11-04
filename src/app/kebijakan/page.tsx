import { DocPage, type DocSection } from '@/components/doc/DocPage';
import { LinkCards } from '@/components/doc/LinkCards';
import { pageMetadata } from '@/content/metadata';
import { pageAt } from '@/content/pages';

/*
 * Every policy in one place. This is the address the app opens from "Kebijakan privasi dan
 * ketentuan" (the cell's POLICIES_URL, app ADR 0060 B32), so it leads to the privacy policy and
 * the terms first, then everything else that binds or explains.
 */

const page = pageAt('/kebijakan');

export const metadata = pageMetadata(page);

const order = [
  '/kebijakan-privasi',
  '/syarat-ketentuan',
  '/pedoman-komunitas',
  '/langganan',
  '/hapus-akun',
  '/keamanan',
  '/transparansi',
  '/lisensi',
  '/kontak',
] as const;

const sections: DocSection[] = [
  {
    id: 'dokumen',
    title: 'Dokumen',
    body: (
      <LinkCards
        cards={order.map((path) => {
          const entry = pageAt(path);
          return {
            href: entry.path,
            title: entry.title,
            text: entry.description,
            ...(entry.draft ? { badge: 'Draf' } : {}),
          };
        })}
      />
    ),
  },
  {
    id: 'tentang-draf',
    title: 'Tentang draf',
    body: (
      <p>
        Dokumen bertanda Draf sedang menunggu tinjauan penasihat hukum dan belum berlaku. Patepang
        belum diluncurkan; dokumen ini berlaku setelah ditinjau dan diumumkan di aplikasi.
      </p>
    ),
  },
];

export default function KebijakanPage() {
  return (
    <DocPage
      page={page}
      lede={
        <p>
          Semua kebijakan dan ketentuan Patepang di satu tempat. Kebijakan privasi dan syarat dan
          ketentuan berlaku bersama, untuk aplikasi dan untuk langganan.
        </p>
      }
      sections={sections}
    />
  );
}
