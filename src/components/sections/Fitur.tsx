import type { ReactNode } from 'react';

import {
  KabarEndPreview,
  MeetAgainPreview,
  MomenPreview,
} from '@/components/preview/AfterPreviews';

import styles from './Fitur.module.css';

function Exhibit({
  title,
  children,
  preview,
}: {
  title: string;
  children: ReactNode;
  preview: ReactNode;
}) {
  return (
    <div className={styles.exhibit}>
      <div className={styles.text}>
        <h3 className="type-title">{title}</h3>
        {children}
      </div>
      <div className={styles.plinth}>{preview}</div>
    </div>
  );
}

/** Things Patepang leaves out on purpose, each with the reason in the product's own terms. */
const leftOut = [
  {
    term: 'Pencarian orang.',
    reason: 'Koneksi lahir dari tempel, bukan dari pencarian.',
  },
  {
    term: 'Pengikut, like publik, dan peringkat.',
    reason: 'Tidak ada angka yang dipamerkan atau dibandingkan.',
  },
  {
    term: 'Feed tanpa akhir.',
    reason: 'Kabar harian selesai, dan tidak ada yang perlu dikejar.',
  },
  {
    term: 'Orang asing.',
    reason:
      'Patepang bukan aplikasi kencan dan bukan tempat berkenalan dengan orang yang belum pernah kamu temui.',
  },
] as const;

/**
 * What Patepang does after two people part. Each feature pairs a few words with the app component
 * that shows it; the section ends with what is left out on purpose.
 */
export function Fitur() {
  return (
    <section className={styles.section} aria-labelledby="fitur">
      <div className="page">
        <div className={styles.header}>
          <h2 id="fitur" className="type-section" tabIndex={-1}>
            Setelah bertemu, hubungan tetap terjaga.
          </h2>
          <p className="type-body-large tone-secondary">
            Patepang punya empat tab: Tempel, Kabar, Orang, dan Momen. Semuanya hanya berisi orang
            yang pernah kamu temui.
          </p>
        </div>

        <div className={styles.exhibits}>
          <Exhibit title="Kabar yang punya akhir" preview={<KabarEndPreview />}>
            <p className="type-body-large tone-secondary">
              Kabar hanya datang dari orang yang pernah kamu temui, urut waktu. Kamu memilih siapa
              yang membaca kabarmu: semua koneksi, satu lingkaran (kelompok yang kamu susun
              sendiri), atau satu orang. Setelah semuanya terbaca, halamannya selesai.
            </p>
          </Exhibit>

          <Exhibit title="Momen dari setiap pertemuan" preview={<MomenPreview />}>
            <p className="type-body-large tone-secondary">
              Setiap tempel mencatat momen untuk kalian berdua: kapan, tempat yang kalian tulis
              sendiri, dan siapa yang hadir. Foto boleh ditambahkan, boleh juga tidak.
            </p>
          </Exhibit>

          <Exhibit title="Bertemu lagi menjaga koneksi" preview={<MeetAgainPreview />}>
            <p className="type-body-large tone-secondary">
              Di tab Orang, halaman seseorang berisi riwayat kalian berdua: kapan pertama bertemu,
              berapa kali, dan kapan terakhir, bukan pengikut atau angka popularitas. Koneksi
              memudar setahun setelah pertemuan terakhir, dengan peringatan di bulan{' '}
              <span className="nowrap">ke-11</span>.
            </p>
            <p className="type-body-large tone-secondary">
              Ajak ketemu, buat rencana, atau simpan namanya di daftar pribadi “Ingin ketemu lagi”.
              Saat kalian bertemu dan tempel lagi, koneksinya segar kembali.
            </p>
          </Exhibit>
        </div>

        <div className={styles.leftOut}>
          <h3 className="type-title">Yang sengaja tidak ada di Patepang</h3>
          <dl className={styles.leftOutList}>
            {leftOut.map((item) => (
              <div key={item.term} className={styles.leftOutItem}>
                <dt className="type-body-strong">{item.term}</dt>
                <dd className="type-body tone-secondary">{item.reason}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
