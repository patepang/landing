import { ArrowSquareOutIcon } from '@phosphor-icons/react/dist/ssr/ArrowSquareOut';

import { TwoDots } from '@/components/brand/TwoDots';
import { Icon } from '@/components/Icon';
import button from '@/components/ui/button.module.css';
import { closingId } from '@/content/sections';
import { closing, released, stores } from '@/content/status';

import styles from './Ajakan.module.css';

/**
 * The closing section, where the header's action leads (#unduh). Once Patepang is in the stores
 * it holds the two store links; until then it says plainly where and for whom Patepang is coming,
 * that there is no date yet, and that the links will be here: no form, no waiting list. The words
 * come from src/content/status.ts. The store buttons are words, not the stores' badge artwork,
 * which the owner can swap in from Apple's and Google's own kits.
 */
export function Ajakan() {
  return (
    <section className={styles.cta} aria-labelledby={closingId}>
      <div className={`page ${styles.inner}`}>
        <TwoDots phase={released ? 'meet' : 'near'} size="lg" />
        <h2 id={closingId} className={`type-section ${styles.title}`} tabIndex={-1}>
          {closing.title}
        </h2>
        <p className="type-body-large">{closing.body}</p>
        <div className={styles.actions}>
          {released ? (
            stores.map((store) => (
              <a
                key={store.id}
                className={`${button.button} ${button.primary} ${button.large}`}
                href={store.href}
                rel="noopener"
              >
                {store.name}
                {/* Read as "App Store untuk iPhone": the hidden words are their own box. */}
                <span className="visually-hidden">untuk {store.platform}</span>
                <Icon glyph={ArrowSquareOutIcon} size="sm" />
              </a>
            ))
          ) : (
            <>
              <a className={`${button.button} ${button.ghost}`} href="/kebijakan-privasi">
                Baca kebijakan privasi
              </a>
              <a className={`${button.button} ${button.ghost}`} href="#tanya-jawab">
                Tanya jawab
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
