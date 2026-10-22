import styles from './StatusPrototipe.module.css';

/** Plain words about where Patepang stands. Technical limits are explained where they matter. */
export function StatusPrototipe() {
  return (
    <section className={styles.section} aria-labelledby="prototipe">
      <div className="page">
        <div className={styles.panel}>
          <h2 id="prototipe" className={`type-section ${styles.title}`} tabIndex={-1}>
            Patepang masih prototipe
          </h2>
          <div className={styles.body}>
            <p className="type-body-large">
              Yang ada sekarang adalah prototipe aplikasi dengan data fiktif, dibuat untuk menguji
              rancangan yang dijelaskan di halaman ini. Patepang belum tersedia untuk diunduh, dan
              belum ada tanggal rilis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
