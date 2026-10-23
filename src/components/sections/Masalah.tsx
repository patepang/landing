import { KeepHyphenated } from '@/components/KeepHyphenated';

import styles from './Masalah.module.css';

/** What happens after a good meeting, in the visitor's own experience. */
const problems = [
  {
    title: 'Kontaknya tersimpan, ceritanya hilang.',
    body: 'Nama dan nomor ada di HP, tetapi kapan dan di mana kalian bertemu tidak tercatat di mana pun.',
  },
  {
    title: 'Kabarnya tenggelam.',
    body: 'Di media sosial, kabar dari orang yang benar-benar kamu temui bercampur dengan orang asing, angka pengikut, dan feed yang tidak ada ujungnya.',
  },
  {
    title: 'Bertemu lagi terus tertunda.',
    body: 'Tanpa pengingat dan rencana, “kapan-kapan ketemu lagi” mudah berhenti sebagai basa-basi.',
  },
] as const;

/** The problem Patepang answers: real meetings that fade once people part. */
export function Masalah() {
  return (
    <section className={styles.section} aria-labelledby="masalah">
      <div className="page">
        <div className={styles.intro}>
          <h2 id="masalah" className={`type-section ${styles.title}`}>
            Setelah pamit, kabar sering berhenti begitu saja.
          </h2>
          <p className="type-body-large tone-secondary">
            Kenalan di sebuah acara, teman lama yang kebetulan bertemu lagi, saudara dari kota lain.
            Pertemuannya hangat, tetapi setelah berpisah, hubungan itu perlahan hilang.
          </p>
        </div>
        <ul className={styles.list} role="list">
          {problems.map((problem) => (
            <li key={problem.title} className={styles.item}>
              <h3 className="type-title">{problem.title}</h3>
              <p className="type-body tone-secondary">
                <KeepHyphenated text={problem.body} />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
