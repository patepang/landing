import { EnvelopeSimpleIcon } from '@phosphor-icons/react/dist/ssr/EnvelopeSimple';

import { DocPage, type DocSection } from '@/components/doc/DocPage';
import { LinkCards } from '@/components/doc/LinkCards';
import { Entity, Placeholder } from '@/components/doc/parts';
import { Icon } from '@/components/Icon';
import { contact, type ContactKey } from '@/content/contact';
import { pageMetadata } from '@/content/metadata';
import { pageAt } from '@/content/pages';

/*
 * The addresses, as mail links: there is no form, and nothing on the site collects anything. The
 * mailboxes are the owner's to create before the site goes to production (src/content/contact.ts,
 * whose confirmed flags gate the production build). Several purposes can share one address (data
 * requests and legal matters go to halo@ until they have their own): each address is listed once,
 * with every purpose it serves. The app shows no account id (app src, 4 November 2026), so the page
 * never asks for one.
 */

const page = pageAt('/kontak');

export const metadata = pageMetadata(page);

const purposes: readonly { key: ContactKey; topic: string; text: string }[] = [
  {
    key: 'general',
    topic: 'bantuan dan pertanyaan umum',
    text: 'Pertanyaan tentang Patepang, bantuan memakai aplikasi, langganan, dan masukan.',
  },
  {
    key: 'privacy',
    topic: 'data pribadi',
    text: 'Permintaan atas data pribadimu menurut UU PDP, dan pertanyaan untuk pejabat pelindungan data pribadi.',
  },
  {
    key: 'security',
    topic: 'keamanan',
    text: 'Laporan kerentanan, dalam bahasa Indonesia atau Inggris, sesuai kebijakan di halaman Keamanan.',
  },
  {
    key: 'legal',
    topic: 'urusan hukum',
    text: 'Permintaan dari aparat penegak hukum dan pemerintah, dan pemberitahuan hukum lain.',
  },
];

/** "a", "a dan b", "a, b, dan c", with the first letter raised. */
function topics(words: readonly string[]): string {
  const said =
    words.length < 3
      ? words.join(' dan ')
      : `${words.slice(0, -1).join(', ')}, dan ${words[words.length - 1] ?? ''}`;
  return said.charAt(0).toUpperCase() + said.slice(1);
}

/** One card for each address, naming every purpose it serves, in the order above. */
const mailboxes = [...new Set(purposes.map((purpose) => contact[purpose.key]))].map((address) => {
  const served = purposes.filter((purpose) => contact[purpose.key] === address);
  return {
    address,
    title: topics(served.map((purpose) => purpose.topic)),
    text: served.map((purpose) => purpose.text).join(' '),
  };
});

const sections: DocSection[] = [
  {
    id: 'alamat-surel',
    title: 'Alamat surel',
    body: (
      <LinkCards
        cards={mailboxes.map((box) => ({
          href: `mailto:${box.address}`,
          title: box.title,
          detail: box.address,
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
          Kami tidak tahu siapa pemilik sebuah akun dari nama atau alamat surel, jadi lewat surel
          kami belum bisa memastikan bahwa sebuah akun milikmu. Jangan mengirim PIN atau enam kata
          untuk membuktikannya.{' '}
          <Placeholder>Cara membuktikan pemilik akun lewat surel: menunggu keputusan</Placeholder>
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
