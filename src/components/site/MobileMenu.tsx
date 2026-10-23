'use client';

import {
  useEffect,
  useRef,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react';

import styles from './SiteHeader.module.css';

export interface MobileMenuProps {
  /** Icons rendered on the server: the menu glyph, and the close glyph shown while open. */
  icons: { open: ReactNode; close: ReactNode };
  /** The section links. */
  children: ReactNode;
}

/**
 * The section links on narrow screens, behind a "Menu" disclosure. It is a native <details>, so it
 * opens and closes with or without JavaScript. With JavaScript it also closes when a link is
 * chosen, when Escape is pressed (focus returns to the button), when focus moves on past it, and
 * when the page is pressed outside it.
 */
export function MobileMenu({ icons, children }: MobileMenuProps) {
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const details = menu.current;
      if (details?.open && event.target instanceof Node && !details.contains(event.target)) {
        details.open = false;
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

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

  function onBlur(event: FocusEvent<HTMLDetailsElement>) {
    const next = event.relatedTarget;
    if (next instanceof Node && !event.currentTarget.contains(next)) close(false);
  }

  return (
    <details ref={menu} className={styles.menu} onKeyDown={onKeyDown} onBlur={onBlur}>
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
