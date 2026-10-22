import styles from './Story.module.css';

/** Why Patepang exists, in two short paragraphs: the problem and the design that answers it. */
export function Story() {
  return (
    <section className={styles.story} aria-labelledby="cerita">
      <div className={`page ${styles.grid}`}>
        <h2 id="cerita" className={`type-section ${styles.title}`}>
          Pertemuan nyata tidak harus selesai saat kalian berpisah.
        </h2>
        <div className={styles.body}>
          <p className="type-body-large">
            Kenalan di sebuah acara, teman lama yang kebetulan bertemu lagi, saudara dari kota lain.
            Setelah pamit, kabar di antara kalian sering berhenti begitu saja.
          </p>
          <p className="type-body-large">
            Patepang dirancang untuk menjaga hubungan seperti itu, dan hanya itu. Orang yang belum
            pernah kamu temui tidak bisa terhubung denganmu, dan tidak ada angka yang memancingmu
            untuk kembali. Yang ada adalah kabar dari orang yang kamu temui, catatan dari setiap
            pertemuan, dan alasan untuk bertemu lagi.
          </p>
        </div>
      </div>
    </section>
  );
}
