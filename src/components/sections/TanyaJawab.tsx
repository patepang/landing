import { CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';

import { Icon } from '@/components/Icon';

import styles from './TanyaJawab.module.css';

/** Questions a first-time visitor is likely to have. The name's origin is left out: unconfirmed. */
const faq = [
  {
    question: 'Apa itu tempel?',
    answer:
      'Dalam rancangan Patepang, tempel adalah cara dua orang terhubung saat bertemu langsung. Satu HP menampilkan kode, HP lain memindainya, lalu kalian menggoyangkan kedua HP bersama selama dua detik.',
  },
  {
    question: 'Kenapa tidak ada pencarian orang?',
    answer:
      'Patepang hanya menghubungkan orang yang pernah bertemu langsung. Koneksi lahir dari tempel, bukan dari pencarian, jadi Patepang tidak dirancang sebagai tempat mencari orang baru.',
  },
  {
    question: 'Bagaimana koneksi tetap terjaga?',
    answer:
      'Lewat kabar, momen, dan rencana untuk bertemu lagi. Dalam rancangannya, koneksi memudar setahun setelah pertemuan terakhir, dengan peringatan di bulan ke-11. Bertemu dan tempel lagi menyegarkannya.',
  },
  {
    question: 'Bagaimana kalau aku belum punya koneksi?',
    answer:
      'Akunmu lahir saat tempel pertama, kapan pun itu, tanpa batas waktu. Rancangannya juga menyediakan titik lahir: pertemuan terbuka untuk orang yang ingin melakukan tempel pertamanya. Jadwalnya belum ada.',
  },
  {
    question: 'Kapan Patepang bisa dipakai?',
    answer:
      'Belum ada tanggal. Patepang masih prototipe dengan data fiktif, dan belum ada aplikasi yang bisa diunduh.',
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
              <p className={`type-body-large tone-secondary ${styles.answer}`}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
