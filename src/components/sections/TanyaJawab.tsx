import { CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';

import { Icon } from '@/components/Icon';
import { KeepHyphenated } from '@/components/KeepHyphenated';
import { pricing } from '@/content/pricing';
import { whenAnswer } from '@/content/status';

import styles from './TanyaJawab.module.css';

interface Question {
  readonly question: string;
  readonly answer: string;
  /** Where the full answer lives, when it is longer than this page should be. */
  readonly more?: { readonly href: string; readonly label: string };
}

/**
 * Questions a first-time visitor is likely to have, answered with what is true today (fakta-produk,
 * 4 November 2026). Privacy is told as how Patepang is built, with what the server still knows,
 * never as a guarantee.
 */
const faq: readonly Question[] = [
  {
    question: 'Apa itu Patepang?',
    answer:
      'Aplikasi untuk tetap dekat dengan orang yang benar-benar pernah kamu temui. Koneksi hanya lahir saat kalian bertemu langsung, lalu terjaga lewat kabar, pesan, momen, dan rencana bertemu lagi.',
  },
  {
    question: 'Apa itu tempel?',
    answer:
      'Cara dua orang terhubung di Patepang saat bertemu langsung. Satu HP menampilkan kode, HP lain memindainya, lalu kalian menggoyangkan kedua HP bersama selama dua detik. Di pertemuan berikutnya, cukup pindai kodenya lagi.',
  },
  {
    question: 'Kenapa tidak ada pencarian orang?',
    answer:
      'Patepang hanya menghubungkan orang yang pernah bertemu langsung. Koneksi lahir dari tempel, bukan dari pencarian, jadi Patepang bukan tempat mencari orang baru.',
  },
  {
    question: 'Apakah aku perlu email atau nomor telepon?',
    answer:
      'Tidak. Akunmu dibuat di HP-mu, tanpa email atau nomor telepon, lalu lahir saat tempel pertama. Bila dalam 30 hari belum ada tempel, akun itu dihapus. Untuk yang belum punya kenalan di Patepang, ada titik lahir: pertemuan terbuka tempat orang melakukan tempel pertamanya. Jadwalnya belum ada.',
  },
  {
    question: 'Bisakah Patepang membaca pesanku?',
    answer:
      'Server Patepang tidak bisa membacanya. Pesan, kabar, foto, dan berkas dikunci di HP sebelum dikirim. Isinya hanya terbaca orang lain bila penerimanya melaporkannya (moderator membaca salinan yang dilaporkan) atau menyimpannya sebagai bukti. Server tetap tahu beberapa hal, misalnya akun mana pernah tempel dengan akun mana dan kapan.',
    more: { href: '/kebijakan-privasi', label: 'Yang diketahui server' },
  },
  {
    question: 'Apa yang terjadi kalau kami lama tidak bertemu?',
    answer:
      'Koneksi memudar setahun setelah pertemuan terakhir, dan Patepang memberi tanda mulai bulan ke-11. Setelah memudar, kabar kalian tidak lagi saling sampai, tetapi percakapan tetap ada. Bertemu dan tempel lagi menyegarkannya.',
  },
  {
    question: 'Berapa harganya?',
    answer: `Semua fitur gratis. Langganan ${pricing.monthly} per bulan atau ${pricing.yearly} per tahun hanya menambah ruang media di server dan ukuran berkas, dengan masa coba ${String(pricing.trialDays)} hari untuk pelanggan baru. Pembayarannya lewat App Store atau Google Play.`,
    more: { href: '/langganan', label: 'Rincian langganan' },
  },
  {
    question: 'Kapan Patepang bisa dipakai?',
    answer: whenAnswer,
  },
];

/** Native disclosure widgets: they open and close with keyboard and pointer, with or without JS. */
export function TanyaJawab() {
  return (
    <section className={styles.section} aria-labelledby="tanya-jawab">
      <div className={`page ${styles.grid}`}>
        <h2 id="tanya-jawab" className={`type-section ${styles.title}`} tabIndex={-1}>
          Tanya jawab
        </h2>
        <div className={styles.list}>
          {faq.map((item) => (
            <details key={item.question} className={styles.item}>
              <summary className={styles.summary}>
                <span className="type-headline">{item.question}</span>
                <Icon glyph={CaretDownIcon} size="sm" className={styles.caret} />
              </summary>
              <div className={styles.answer}>
                <p className="type-body-large tone-secondary">
                  <KeepHyphenated text={item.answer} />
                </p>
                {item.more ? (
                  <a className={styles.more} href={item.more.href}>
                    {item.more.label}
                  </a>
                ) : null}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
