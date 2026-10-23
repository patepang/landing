import type { ReactNode } from 'react';

import styles from './preview.module.css';

export type BadgeTone = 'neutral' | 'brand' | 'success';

export function Badge({ label, tone, icon }: { label: string; tone: BadgeTone; icon?: ReactNode }) {
  return (
    <span className={styles.badge} data-tone={tone}>
      {icon}
      {label}
    </span>
  );
}

/** "Sari Wulandari" → "SW": first letters of the first two words, as the app's initialsOf(). */
function initialsOf(name: string, count: 1 | 2): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const first = Array.from(words[0] ?? '')[0] ?? '';
  const second = count === 2 ? (Array.from(words[1] ?? '')[0] ?? '') : '';
  return `${first}${second}`.toLocaleUpperCase('id-ID') || '?';
}

export function Avatar({
  name,
  size,
  tone,
}: {
  name: string;
  size: 'sm' | 'md' | 'lg';
  tone: 0 | 1 | 2 | 3;
}) {
  return (
    <span className={styles.avatar} data-size={size} data-tone={tone} aria-hidden="true">
      {initialsOf(name, size === 'sm' ? 1 : 2)}
    </span>
  );
}

export function Divider() {
  return <div className={styles.divider} aria-hidden="true" />;
}

export const surfaceClass = styles.surface;
