import type { ReactNode } from 'react';

import { contact, type ContactKey } from '@/content/contact';
import { entity, entityPlaceholder } from '@/content/entity';

import styles from './parts.module.css';

/**
 * Where a fact the owner has not given yet will stand: in square brackets, on the app's warning
 * pair, so it is found at a glance and never read as settled. `data-placeholder` lets the tests
 * and the documentation list every one of them.
 */
export function Placeholder({ children }: { children: string }) {
  return (
    <span className={styles.placeholder} data-placeholder={children}>
      [{children}]
    </span>
  );
}

/**
 * A part of a page in force that is still a draft, said where it stands: what it waits for, and
 * that it does not apply yet.
 */
export function SectionDraft({ children }: { children: ReactNode }) {
  return (
    <p className={styles.sectionDraft} role="note">
      {children}
    </p>
  );
}

/** A fact about the entity behind Patepang: its value once given, its placeholder until then. */
export function Entity({ field }: { field: keyof typeof entity }) {
  const value = entity[field];
  return value ?? <Placeholder>{entityPlaceholder[field]}</Placeholder>;
}

/** One of the site's addresses as a mailto link, inside a sentence. */
export function Mail({ to }: { to: ContactKey }) {
  return <a href={`mailto:${contact[to]}`}>{contact[to]}</a>;
}

/** A link to another site, said as such to screen readers and opened in the same tab. */
export function External({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} rel="noopener">
      {children}
      <span className="visually-hidden"> (situs lain)</span>
    </a>
  );
}
