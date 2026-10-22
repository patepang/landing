import styles from './Lockup.module.css';
import { TwoDots } from './TwoDots';

export interface LockupProps {
  /** `sm`: 12px dots over a 28px wordmark. `lg`: 28px dots over a 36px wordmark. */
  size?: 'sm' | 'lg';
}

/**
 * The stacked lockup from the app (src/features/system/Wordmark.tsx): the two dots, met, over the
 * lowercase wordmark in the brand colour. The symbol itself (two touching arcs) is not produced
 * yet, so the dots stand in for it. Read as "Patepang".
 */
export function Lockup({ size = 'sm' }: LockupProps) {
  return (
    <span className={styles.lockup} data-size={size} role="img" aria-label="Patepang">
      <TwoDots phase="meet" size={size === 'lg' ? 'lg' : 'sm'} />
      <span className={styles.wordmark}>patepang</span>
    </span>
  );
}
