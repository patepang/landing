import { ChatCircleIcon } from '@phosphor-icons/react/dist/ssr/ChatCircle';
import { GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { SparkleIcon } from '@phosphor-icons/react/dist/ssr/Sparkle';

import { TwoDots } from '@/components/brand/TwoDots';
import { Icon } from '@/components/Icon';
import { fiction } from '@/content/fiction';

import { QR_SIZE, qrPath, qrSeed } from './qr';
import styles from './TempelScreenPreview.module.css';

const codePath = qrPath(qrSeed(fiction.codeOwner, 0));

/**
 * The Tempel tab as a new person first sees it (screen 1.9 in the app, TempelScreen.tsx): the
 * account is not born yet, so a card says it is born at the first tempel; below it, the code to
 * be scanned. The optional "titik lahir" button is left out, as the app does when that screen is
 * unavailable. The picture ends inside the code, as if the phone continued below the stage.
 */
export function TempelScreenPreview({ className }: { className?: string }) {
  return (
    <div
      className={className ? `${styles.screen} ${className}` : styles.screen}
      role="img"
      aria-label="Layar Tempel di aplikasi Patepang untuk orang yang belum punya akun: kartu “Akunmu lahir saat tempel pertama”, judul “sebelum pamit, tempel dulu”, dua titik yang masih berjauhan, dan kode yang dipindai HP lain saat tempel."
    >
      <div className={styles.appHeader}>
        <span className={`type-title ${styles.appTitle}`}>Tempel</span>
        <span className={styles.headerActions}>
          <span className={styles.iconButton}>
            <Icon glyph={ChatCircleIcon} />
          </span>
          <span className={styles.iconButton}>
            <Icon glyph={GearSixIcon} />
          </span>
        </span>
      </div>

      <div className={styles.unborn}>
        <Icon glyph={SparkleIcon} size="lg" className={styles.unbornIcon} />
        <span className={`type-headline ${styles.unbornTitle}`}>
          Akunmu lahir saat tempel pertama
        </span>
        <span className="type-body">
          Temui seseorang yang kamu kenal, lalu tempel. Tidak ada batas waktu dan tidak ada yang
          perlu dikejar.
        </span>
      </div>

      <div className={styles.code}>
        <span className={`type-title-large ${styles.codeTitle}`}>sebelum pamit, tempel dulu</span>
        <TwoDots phase="apart" size="md" />
        {/* The only deliberate crop on the page: the code continues below the stage edge. */}
        <span className={styles.codeCrop} data-intentional-crop="">
          <span className={styles.codeCard}>
            <svg
              className={styles.codeSvg}
              viewBox={`0 0 ${String(QR_SIZE)} ${String(QR_SIZE)}`}
              shapeRendering="crispEdges"
              aria-hidden="true"
              focusable="false"
            >
              <path className={styles.codeInk} d={codePath} />
            </svg>
          </span>
        </span>
      </div>
    </div>
  );
}
