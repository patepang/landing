'use client';

import { useEffect, useRef, type ReactNode } from 'react';

export interface HeaderShellProps {
  className: string | undefined;
  /** The header's content, rendered on the server. */
  children: ReactNode;
}

/** How far the page scrolls before the header leaves its resting place and floats. */
const FLOAT_AFTER = 16;
/** Scroll travel in one direction that hides (down) or brings back (up) the floating header. */
const TRAVEL = 12;
/** A section is the current one while it crosses this line, as a share of the window's height. */
const READING_LINE = 0.38;

/**
 * The <header> element and what it does with JavaScript. Without it the header rests at the top
 * of the page, as a plain bar. With it:
 *
 * - `data-enhanced`: the header may stay at the top of the window (CSS decides when there is
 *   room for that) and floats as a capsule once the page has scrolled, or while its menu is open,
 *   so the menu's card always unfolds from the same capsule (`data-floating`).
 * - `data-hidden`: on narrow screens it steps out of the way while the reader scrolls down and
 *   comes back as soon as they scroll up, move focus into it, or open its menu.
 * - The section the reader is in is marked `aria-current` on its links, and the indicator behind
 *   the wide links slides to it.
 *
 * Attributes are set on the DOM directly: none of this needs React to render again.
 */
export function HeaderShell({ className, children }: HeaderShellProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    const track = header.querySelector<HTMLElement>('[data-nav-track]');
    const indicator = track?.querySelector<HTMLElement>('[data-nav-indicator]') ?? null;
    const links = [...header.querySelectorAll<HTMLAnchorElement>('a[data-section]')];
    const targets = [...new Set(links.map((link) => link.dataset.section ?? ''))].flatMap((id) => {
      const section = document.getElementById(id)?.closest('section');
      return section ? [{ id, section }] : [];
    });

    let current: string | null = null;
    let placed: HTMLElement | null = null;
    let lastY = window.scrollY;
    let travel = 0;
    let frame = 0;

    function sectionInView() {
      const line = window.innerHeight * READING_LINE;
      let found: string | null = null;
      for (const { id, section } of targets) {
        const box = section.getBoundingClientRect();
        if (box.top <= line && box.bottom > line) found = id;
      }
      return found;
    }

    /** Draws the indicator over `link`, or as a sliver at its centre when `collapsed`. */
    function cover(target: HTMLElement, link: HTMLElement, collapsed: boolean) {
      const x = link.offsetLeft + (collapsed ? link.offsetWidth / 2 : 0);
      target.style.setProperty('--ind-x', `${String(x)}px`);
      target.style.setProperty('--ind-y', `${String(link.offsetTop)}px`);
      target.style.setProperty('--ind-w', `${String(collapsed ? 0 : link.offsetWidth)}px`);
      target.style.setProperty('--ind-h', `${String(link.offsetHeight)}px`);
    }

    /** Applies `draw` with transitions switched off, so the indicator jumps instead of moving. */
    function still(target: HTMLElement, draw: () => void) {
      target.dataset.instant = '';
      draw();
      void target.offsetWidth;
      delete target.dataset.instant;
    }

    /**
     * Moves the indicator to the current section's link. From nothing it grows out of the link's
     * centre, between links it slides, and to nothing it shrinks into the link it leaves.
     * `instant` repositions without motion (after a resize, or once fonts load).
     */
    function place(instant: boolean) {
      if (!track || !indicator) return;
      const target = indicator;
      const link = current
        ? track.querySelector<HTMLElement>(`a[data-section="${current}"]`)
        : null;
      const left = placed;
      if (instant) {
        still(target, () => {
          if (link) cover(target, link, false);
          else if (left) cover(target, left, true);
        });
      } else if (link && !left) {
        still(target, () => {
          cover(target, link, true);
        });
        cover(target, link, false);
      } else if (link) {
        cover(target, link, false);
      } else if (left) {
        cover(target, left, true);
      }
      placed = link;
    }

    function mark() {
      for (const link of links) {
        if (link.dataset.section === current) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      }
    }

    /** Focus inside the header, or its menu open, keeps it on screen. */
    function mustStay() {
      if (!header) return false;
      return (
        header.contains(document.activeElement) || header.querySelector('details[open]') !== null
      );
    }

    function update() {
      frame = 0;
      if (!header) return;
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;
      lastY = y;
      const menuOpen = header.querySelector('details[open]') !== null;
      header.toggleAttribute('data-floating', y > FLOAT_AFTER || menuOpen);
      if (delta !== 0) travel = Math.sign(delta) === Math.sign(travel) ? travel + delta : delta;
      // Near the top it always shows, so the capsule is seen before it ever steps aside.
      if (y <= header.offsetHeight * 2) header.removeAttribute('data-hidden');
      else if (travel > TRAVEL && !mustStay()) header.setAttribute('data-hidden', '');
      else if (travel < -TRAVEL) header.removeAttribute('data-hidden');
      const next = sectionInView();
      if (next !== current) {
        current = next;
        mark();
        place(false);
      }
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    function reveal() {
      header?.removeAttribute('data-hidden');
    }

    function onToggle() {
      reveal();
      schedule();
    }

    function reposition() {
      place(true);
    }

    header.setAttribute('data-enhanced', '');
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    header.addEventListener('focusin', reveal);
    // `toggle` does not bubble; listening while it travels down still catches the menu opening.
    header.addEventListener('toggle', onToggle, true);
    const resized = new ResizeObserver(reposition);
    if (track) resized.observe(track);
    void document.fonts.ready.then(reposition);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      header.removeEventListener('focusin', reveal);
      header.removeEventListener('toggle', onToggle, true);
      resized.disconnect();
      for (const name of ['data-enhanced', 'data-floating', 'data-hidden']) {
        header.removeAttribute(name);
      }
    };
  }, []);

  return (
    <header ref={ref} id="atas" className={className} tabIndex={-1}>
      {children}
    </header>
  );
}
