import { DocPage, type DocSection } from '@/components/doc/DocPage';
import { Entity } from '@/components/doc/parts';
import { pageMetadata } from '@/content/metadata';
import { pageAt } from '@/content/pages';
import { aboutStatus } from '@/content/status';

/*
 * Who builds Patepang and what it holds to. The principles are the owner's (1 November 2026) and
 * the product's (PRODUCT.md), said as how Patepang is built, never as guarantees. The name's
 * meaning is the app's own words (TapInvitationCard.tsx: "Tepang (bahasa Sunda: bertemu)"). Who
 * runs it is not decided yet and stands as a placeholder.
 */

const page = pageAt('/tentang');

export const metadata = pageMetadata(page);

const principles = [
  {
    term: 'Pertemuan dulu.',
    text: 'Koneksi hanya lahir dari tempel, saat dua orang berhadapan. Patepang melayani hubungan yang lahir dari bertemu, bukan menggantikannya.',
  },
  {
    term: 'Isimu terkunci di HP-mu.',
    text: 'Pesan, kabar, momen, dan foto dienkripsi di HP sebelum dikirim, sehingga server tidak bisa membacanya.',
  },
  {
    term: 'Tanpa akun bot.',
    text: 'Akun hanya lahir lewat tempel saat bertemu langsung, tanpa email atau nomor telepon, dan satu HP hanya bisa membuat beberapa akun sebulan.',
  },
  {
    term: 'Tanpa iklan dan tanpa feed algoritma.',
    text: 'Kabar urut waktu dan halamannya selesai. Pemasukan Patepang hanya dari langganan dan tip, dan semua fitur gratis.',
  },
  {
    term: 'Betah karena nyaman, bukan karena dipancing.',
    text: 'Tidak ada angka belum dibaca, hitungan pengikut, atau peringkat yang memancing orang kembali.',
  },
  {
    term: 'Jujur tentang keadaan.',
    text: 'Yang sudah jadi dibedakan dari yang belum, dan yang diketahui server disebut terus terang.',
  },
] as const;

const sections: DocSection[] = [
  {
    id: 'kenapa',
    title: 'Kenapa Patepang ada',
    body: (
      <>
        <p>
          Hubungan dari pertemuan nyata mudah hilang setelah pamit, sementara jejaring yang ada
          mendorong koneksi dengan orang asing, angka pengikut, dan feed tanpa akhir. Patepang
          memilih sebaliknya: hanya orang yang pernah kamu temui, dan bertemu lagi yang menjaga
          hubungan.
        </p>
        <p>Namanya dari bahasa Sunda: tepang berarti bertemu.</p>
      </>
    ),
  },
  {
    id: 'yang-dipegang',
    title: 'Yang kami pegang',
    body: (
      <dl>
        {principles.map((principle) => (
          <div key={principle.term}>
            <dt>{principle.term}</dt>
            <dd>{principle.text}</dd>
          </div>
        ))}
      </dl>
    ),
  },
  {
    id: 'siapa',
    title: 'Siapa yang membangun',
    body: (
      <p>
        Patepang dibangun dan dikelola oleh <Entity field="name" />. Peluncuran pertamanya di
        Indonesia, dalam bahasa Indonesia, untuk umur 18 tahun ke atas, di iPhone dan Android.
      </p>
    ),
  },
  {
    id: 'keadaan-sekarang',
    title: 'Keadaan sekarang',
    body: (
      <p>
        {aboutStatus} Sebelum peluncuran publik, keamanannya diaudit pihak luar, lalu kodenya dibuka
        dengan lisensi AGPL-3.0 (lihat <a href="/lisensi">Lisensi</a>). Pertanyaan bisa dikirim
        lewat halaman <a href="/kontak">Kontak</a>.
      </p>
    ),
  },
];

export default function TentangPage() {
  return (
    <DocPage
      page={page}
      lede={
        <p>
          Patepang adalah aplikasi untuk tetap dekat dengan orang yang benar-benar pernah kamu
          temui. Ini tentang siapa yang membangunnya dan apa yang dipegang.
        </p>
      }
      sections={sections}
    />
  );
}
