import styles from './TwoDots.module.css';

export type DotsPhase = 'apart' | 'near' | 'meet';
export type DotsSize = 'sm' | 'md' | 'lg';

export interface TwoDotsProps {
  phase: DotsPhase;
  size?: DotsSize;
  /**
   * When set, the dots arrive at `phase` from this phase once, as the page first paints, the way
   * they move in the app when a phase changes. It plays in CSS, so it needs no script, and it is
   * skipped when the reader asks for less motion.
   */
  from?: Exclude<DotsPhase, 'meet'>;
  /**
   * The box is as wide as the dots apart by default, so changing phase never moves anything
   * around it. `snug` fits the box to the resting phase instead, for a mark that has to line up
   * with its neighbours (the header); an arrival then starts outside the box.
   */
  snug?: boolean;
  className?: string;
}

/**
 * The brand motif from the app (src/shared/TwoDots.tsx): two dots, one forest and one apricot,
 * apart, near or met. Purely decorative and hidden from assistive technology; the words around it
 * carry the meaning. It never loops.
 */
export function TwoDots({ phase, size = 'md', from, snug = false, className }: TwoDotsProps) {
  return (
    <span
      className={className ? `${styles.dots} ${className}` : styles.dots}
      data-phase={phase}
      data-size={size}
      data-from={from}
      data-snug={snug ? '' : undefined}
      aria-hidden="true"
    >
      <span className={`${styles.dot} ${styles.first}`} />
      <span className={`${styles.dot} ${styles.second}`} />
    </span>
  );
}
