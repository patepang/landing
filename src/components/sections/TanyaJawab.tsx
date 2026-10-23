import { CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';

import { Icon } from '@/components/Icon';
import { KeepHyphenated } from '@/components/KeepHyphenated';

import styles from './TanyaJawab.module.css';

/** Questions a first-time visitor is likely to have. The name's origin is left out: unconfirmed. */
const faq = [
  {
    question: 'Apa itu Patepang?',
    answer:
      'Aplikasi untuk tetap dekat dengan orang yang benar-benar pernah kamu temui. Koneksi hanya lahir saat kalian bertemu langsung, lalu terjaga lewat kabar, momen, dan rencana bertemu lagi.',
  },
  {
    question: 'Apa itu tempel?',
    answer:
      'Cara dua orang terhubung di Patepang saat bertemu langsung. Satu HP menampilkan kode, HP lain memindainya, lalu kalian menggoyangkan kedua HP bersama selama dua detik.',
  },
  {
    question: 'Kenapa tidak ada pencarian orang?',
    answer:
      'Patepang hanya menghubungkan orang yang pernah bertemu langsung. Koneksi lahir dari tempel, bukan dari pencarian, jadi Patepang bukan tempat mencari orang baru.',
  },
  {
    question: 'Apakah aku perlu email atau nomor telepon?',
    answer:
      'Tidak. Akunmu lahir saat tempel pertama dengan orang yang kamu temui, kapan pun itu. Untuk yang belum punya kenalan di Patepang, ada titik lahir: pertemuan terbuka tempat orang melakukan tempel pertamanya. Jadwalnya belum ada.',
  },
  {
    question: 'Apa yang terjadi kalau kami lama tidak bertemu?',
    answer:
      'Koneksi memudar setahun setelah pertemuan terakhir, dan Patepang memberi peringatan di bulan ke-11. Bertemu dan tempel lagi menyegarkannya.',
  },
  {
    question: 'Kapan Patepang bisa dipakai?',
    answer: 'Patepang segera hadir. Belum ada tanggal rilis, dan aplikasinya belum bisa diunduh.',
  },
] as const;

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
              <p className={`type-body-large tone-secondary ${styles.answer}`}>
                <KeepHyphenated text={item.answer} />
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
