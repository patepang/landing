import { BatteryFullIcon } from '@phosphor-icons/react/dist/ssr/BatteryFull';
import { CellSignalFullIcon } from '@phosphor-icons/react/dist/ssr/CellSignalFull';
import { QrCodeIcon } from '@phosphor-icons/react/dist/ssr/QrCode';
import { ScanIcon } from '@phosphor-icons/react/dist/ssr/Scan';
import { SparkleIcon } from '@phosphor-icons/react/dist/ssr/Sparkle';
import { WifiHighIcon } from '@phosphor-icons/react/dist/ssr/WifiHigh';

import { Icon } from '@/components/Icon';
import { fiction } from '@/content/fiction';

import { QR_SIZE, qrPath, qrSeed } from './qr';
import styles from './TempelScreenPreview.module.css';

const codePath = qrPath(qrSeed(fiction.codeOwner, 0));

/**
 * The Tempel sheet as a new person first sees it (screen 1.9, app TempelPanel.tsx @ b4c6118),
 * held in a phone: the two sides "Pindai" and "QR-mu" with the code shown first, "Sebelum pamit,
 * tempel dulu", the code to be scanned, what to do with it, and, under the code, the account that
 * is not born yet and the 30 days it has. The optional "Titik lahir di dekatmu" button is left
 * out, as the app does when that screen is unavailable. The phone's frame, island and status bar
 * are the device, not the app; the phone continues below the stage.
 *
 * The screen's six parts are the phone's direct children, one per row, so a page can lay them in
 * its own grid rows (subgrid) and stand things level with them. Three carry `data-target` (face,
 * code, born), so the notes around the phone can point them out.
 */
export function TempelScreenPreview({ className }: { className?: string }) {
  return (
    <div
      className={className ? `${styles.device} ${className}` : styles.device}
      role="img"
      aria-label="Contoh lembar Tempel di aplikasi Patepang untuk orang yang belum punya akun: pilihan “Pindai” dan “QR-mu”, judul “Sebelum pamit, tempel dulu”, kode yang dipindai HP lain, “Tunjukkan kode ini ke orang yang kamu temui. Kode berganti sendiri setiap 30 detik.”, lalu “Akunmu lahir saat tempel pertama. Bila tidak ada tempel dalam 30 hari sejak akun dibuat, akunnya dihapus.”"
    >
      <div className={styles.statusBar}>
        <span>09.41</span>
        <span className={styles.statusIcons}>
          <Icon glyph={CellSignalFullIcon} size="xs" weight="bold" />
          <Icon glyph={WifiHighIcon} size="xs" weight="bold" />
          <Icon glyph={BatteryFullIcon} size="xs" weight="bold" />
        </span>
      </div>

      {/* SegmentedControl: a neutral pill raised on a ringed groove, never the brand fill. */}
      <span className={styles.sides}>
        <span className={styles.side}>
          <Icon glyph={ScanIcon} size="sm" />
          Pindai
        </span>
        <span className={styles.side} data-selected="">
          <Icon glyph={QrCodeIcon} size="sm" />
          QR-mu
        </span>
      </span>

      <span className={`type-headline ${styles.codeTitle}`} data-target="face">
        Sebelum pamit, tempel dulu
      </span>
      <span className={styles.codeCard} data-target="code">
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
      <span className={styles.under}>
        <span className={`type-body ${styles.balanced}`}>
          Tunjukkan kode ini ke&nbsp;orang yang kamu temui.
        </span>
        <span className="type-body-small tone-secondary">
          Kode berganti sendiri setiap 30&nbsp;detik.
        </span>
      </span>

      {/* Not born yet: said once, under the code, as the app does. */}
      <span className={styles.unborn} data-target="born">
        <Icon glyph={SparkleIcon} size="sm" className={styles.unbornIcon} />
        <span className={styles.unbornWords}>
          <span className="type-body-strong">Akunmu lahir saat tempel pertama</span>
          <span className="type-body-small tone-secondary">
            Bila tidak ada tempel dalam 30&nbsp;hari sejak akun dibuat, akunnya dihapus.
          </span>
        </span>
      </span>
    </div>
  );
}
