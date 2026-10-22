import styles from './TwoDots.module.css';

export type DotsPhase = 'apart' | 'near' | 'meet';
export type DotsSize = 'sm' | 'md' | 'lg';

export interface TwoDotsProps {
  phase: DotsPhase;
  size?: DotsSize;
  className?: string;
}

/**
 * The brand motif from the app (src/shared/TwoDots.tsx): two dots, one forest and one apricot,
 * apart, near or met. Purely decorative and hidden from assistive technology; the words around it
 * carry the meaning. It never loops.
 */
export function TwoDots({ phase, size = 'md', className }: TwoDotsProps) {
  return (
    <span
      className={className ? `${styles.dots} ${className}` : styles.dots}
      data-phase={phase}
      data-size={size}
      aria-hidden="true"
    >
      <span className={`${styles.dot} ${styles.first}`} />
      <span className={`${styles.dot} ${styles.second}`} />
    </span>
  );
}
