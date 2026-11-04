import { EnvelopeSimpleIcon } from '@phosphor-icons/react/dist/ssr/EnvelopeSimple';

import { DocPage, type DocSection } from '@/components/doc/DocPage';
import { LinkCards } from '@/components/doc/LinkCards';
import { Entity } from '@/components/doc/parts';
import { Icon } from '@/components/Icon';
import { contact, type ContactKey } from '@/content/contact';
import { pageMetadata } from '@/content/metadata';
import { pageAt } from '@/content/pages';

/*
 * The addresses, as mail links: there is no form, and nothing on the site collects anything. The
 * mailboxes are the owner's to create before the site goes to production (src/content/contact.ts).
 */

const page = pageAt('/kontak');

export const metadata = pageMetadata(page);

const mailboxes: readonly { key: ContactKey; title: string; text: string }[] = [
  {
    key: 'general',
    title: 'Bantuan dan pertanyaan umum',
    text: 'Pertanyaan tentang Patepang, bantuan memakai aplikasi, langganan, dan masukan.',
  },
  {
    key: 'privacy',
    title: 'Data pribadi',
    text: 'Permintaan atas data pribadimu menurut UU PDP, dan pertanyaan untuk pejabat pelindungan data.',
  },
  {
    key: 'security',
    title: 'Keamanan',
    text: 'Laporan kerentanan, dalam bahasa Indonesia atau Inggris, sesuai kebijakan di halaman Keamanan.',
  },
  {
    key: 'legal',
    title: 'Urusan hukum',
    text: 'Permintaan dari aparat penegak hukum dan pemerintah, dan pemberitahuan hukum lain.',
  },
];

const sections: DocSection[] = [
  {
    id: 'alamat-surel',
    title: 'Alamat surel',
    body: (
      <LinkCards
        cards={mailboxes.map((box) => ({
          href: `mailto:${contact[box.key]}`,
          title: box.title,
          detail: contact[box.key],
          text: box.text,
          icon: <Icon glyph={EnvelopeSimpleIcon} />,
        }))}
      />
    ),
  },
  {
    id: 'sebelum-menulis',
    title: 'Sebelum menulis',
    body: (
      <ul>
        <li>
          Patepang tidak punya formulir dan tidak meminta data apa pun dari situs ini. Satu-satunya
          cara menghubungi kami adalah surel.
        </li>
        <li>
          Jangan pernah mengirim PIN, enam kata ekspor atau mode perjalanan, atau berkas kunci.
          Patepang tidak pernah menanyakannya. Surel yang memintanya bukan dari kami.
        </li>
        <li>
          Kami tidak tahu siapa pemilik sebuah akun dari nama atau alamat surel. Bila pertanyaanmu
          tentang akunmu, sebutkan id akunmu, tanpa PIN.
        </li>
      </ul>
    ),
  },
  {
    id: 'surat',
    title: 'Surat',
    body: (
      <p>
        <Entity field="name" />
        <br />
        <Entity field="address" />
      </p>
    ),
  },
];

export default function KontakPage() {
  return (
    <DocPage
      page={page}
      lede={<p>Tulis ke alamat yang sesuai dengan keperluanmu. Tidak ada formulir.</p>}
      sections={sections}
    />
  );
}
