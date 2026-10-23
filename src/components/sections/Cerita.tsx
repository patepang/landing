import { TwoDots, type DotsPhase } from '@/components/brand/TwoDots';
import { KeepHyphenated } from '@/components/KeepHyphenated';

import styles from './Cerita.module.css';

/**
 * Everyday situations, told in the second person: examples of what Patepang does after a meeting,
 * not quotes from users. Every beat is something the app does.
 */
const scenarios = [
  {
    title: 'Kenalan baru di workshop',
    beats: [
      'Sabtu pagi, kamu satu meja dengan seseorang di workshop fotografi.',
      'Sebelum pulang, kalian tempel. Momen pertama tercatat untuk kalian berdua.',
      'Minggu berikutnya, foto hasil latihannya muncul di Kabar-mu.',
    ],
  },
  {
    title: 'Teman lama di pernikahan',
    beats: [
      'Di resepsi seorang kawan, kamu bertemu lagi dengan teman sekelas yang lama tak terdengar kabarnya.',
      'Kalian tempel di sela antrean salaman. Kali ini, pertemuannya tercatat.',
      'Sebulan kemudian, kamu mengajaknya ngopi lewat rencana bertemu lagi, dan ia menjawab “Ikut”.',
    ],
  },
  {
    title: 'Sepupu dari kota lain',
    beats: [
      'Saat Lebaran, sepupumu datang dari luar kota untuk beberapa hari.',
      'Sebelum ia pulang, kalian tempel di ruang tamu.',
      'Menjelang setahun, Patepang mengingatkan bahwa koneksi kalian akan memudar. Lebaran berikutnya, kalian tempel lagi.',
    ],
  },
] as const;

/** Each beat is marked by the two dots: apart before tempel, close at tempel, met after it. */
const beatPhases: readonly DotsPhase[] = ['apart', 'near', 'meet'];

export function Cerita() {
  return (
    <section className={styles.section} aria-labelledby="cerita">
      <div className="page">
        <div className={styles.intro}>
          <h2 id="cerita" className="type-section" tabIndex={-1}>
            Dibuat untuk pertemuan seperti ini.
          </h2>
          <p className="type-body-large tone-secondary">
            Tiga contoh dari keseharian: bagaimana sebuah pertemuan berlanjut setelah tempel.
          </p>
        </div>
        <ul className={styles.list} role="list">
          {scenarios.map((scenario) => (
            <li key={scenario.title} className={styles.scenario}>
              <h3 className={`type-title ${styles.scenarioTitle}`}>{scenario.title}</h3>
              <ol className={styles.beats} role="list">
                {scenario.beats.map((beat, index) => (
                  <li key={beat} className={styles.beat}>
                    <TwoDots
                      phase={beatPhases[index] ?? 'meet'}
                      size="sm"
                      className={styles.dots}
                    />
                    <p className="type-body tone-secondary">
                      <KeepHyphenated text={beat} />
                    </p>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
