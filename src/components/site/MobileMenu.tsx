'use client';

import {
  useCallback,
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
 * The section links on narrow screens, behind a round menu button. It is a native <details>, so
 * it opens and closes with or without JavaScript, and its panel unfolds in CSS. With JavaScript it
 * also folds away before it closes, and it closes when a link is chosen, when Escape is pressed
 * (focus returns to the button), when focus moves on past it, and when the page is pressed
 * outside it.
 */
export function MobileMenu({ icons, children }: MobileMenuProps) {
  const menu = useRef<HTMLDetailsElement>(null);
  /** Counts closings, so a closing that was interrupted cannot finish a later one. */
  const closings = useRef(0);

  /**
   * Plays the panel's exit (`data-state="closing"`), then closes the <details>: closing it at once
   * would hide the panel before it could leave. Focus, when asked for, returns immediately.
   */
  const close = useCallback((returnFocus: boolean) => {
    const details = menu.current;
    if (!details?.open) return;
    if (returnFocus) details.querySelector('summary')?.focus();
    if (details.dataset.state === 'closing') return;
    details.dataset.state = 'closing';
    const closing = (closings.current += 1);
    const panel = details.querySelector<HTMLElement>('[data-menu-panel]');

    function finish() {
      if (!details || closings.current !== closing || details.dataset.state !== 'closing') return;
      delete details.dataset.state;
      details.open = false;
    }

    // Reading the animations applies the closing style first, so the exit is already listed.
    const exits = panel?.getAnimations() ?? [];
    if (exits.length === 0) {
      finish();
      return;
    }
    void Promise.all(exits.map((animation) => animation.finished)).then(finish, finish);
  }, []);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const details = menu.current;
      if (details?.open && event.target instanceof Node && !details.contains(event.target)) {
        close(false);
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [close]);

  /** The button closes an open menu through the exit, and reopens one that is still leaving. */
  function onToggleClick(event: MouseEvent<HTMLElement>) {
    const details = menu.current;
    if (!details?.open) return;
    event.preventDefault();
    if (details.dataset.state === 'closing') delete details.dataset.state;
    else close(false);
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
      <summary className={styles.menuButton} onClick={onToggleClick}>
        <span className={styles.menuGlyphs}>
          <span className={styles.menuIconOpen}>{icons.open}</span>
          <span className={styles.menuIconClose}>{icons.close}</span>
        </span>
        <span className="visually-hidden">Menu</span>
      </summary>
      <div className={styles.menuPanel} data-menu-panel onClick={onClick}>
        {children}
      </div>
    </details>
  );
}
