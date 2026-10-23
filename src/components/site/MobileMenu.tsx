'use client';

import { useRef, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';

import styles from './SiteHeader.module.css';

export interface MobileMenuProps {
  /** Icons rendered on the server: the menu glyph, and the close glyph shown while open. */
  icons: { open: ReactNode; close: ReactNode };
  /** The section links. */
  children: ReactNode;
}

/**
 * The section links on narrow screens, behind a "Menu" disclosure. It is a native <details>, so it
 * opens and closes with or without JavaScript. With JavaScript, choosing a link or pressing Escape
 * also closes it, and Escape returns focus to the button.
 */
export function MobileMenu({ icons, children }: MobileMenuProps) {
  const menu = useRef<HTMLDetailsElement>(null);

  function close(returnFocus: boolean) {
    const details = menu.current;
    if (!details?.open) return;
    details.open = false;
    if (returnFocus) details.querySelector('summary')?.focus();
  }

  function onClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target instanceof Element && event.target.closest('a')) close(false);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDetailsElement>) {
    if (event.key === 'Escape') close(true);
  }

  return (
    <details ref={menu} className={styles.menu} onKeyDown={onKeyDown}>
      <summary className={styles.menuButton}>
        <span className={styles.menuIconOpen}>{icons.open}</span>
        <span className={styles.menuIconClose}>{icons.close}</span>
        Menu
      </summary>
      <div className={styles.menuPanel} onClick={onClick}>
        {children}
      </div>
    </details>
  );
}
