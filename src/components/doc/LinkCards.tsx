import type { ReactNode } from 'react';

import styles from './LinkCards.module.css';

export interface LinkCard {
  readonly href: string;
  readonly title: string;
  /** A line in the brand's ink under the title, such as an address. */
  readonly detail?: string;
  readonly text: string;
  /** A short state beside the title, such as "Draf". */
  readonly badge?: string;
  readonly icon?: ReactNode;
}

/**
 * Destinations as cards: each card is one link, a whole surface to press, with what it is, an
 * optional detail line, and what it is for. Used by the contact page and the policies index.
 */
export function LinkCards({ cards }: { cards: readonly LinkCard[] }) {
  return (
    <ul className={styles.list} role="list">
      {cards.map((card) => (
        <li key={card.href}>
          <a className={styles.card} href={card.href}>
            {card.icon ? <span className={styles.icon}>{card.icon}</span> : null}
            <span className={styles.words}>
              <span className={styles.head}>
                <span className={styles.title}>{card.title}</span>
                {card.badge ? <span className={styles.badge}>{card.badge}</span> : null}
              </span>
              {card.detail ? <span className={styles.detail}>{card.detail}</span> : null}
              <span className={styles.text}>{card.text}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
