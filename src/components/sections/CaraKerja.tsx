import { ArrowCounterClockwiseIcon } from '@phosphor-icons/react/dist/ssr/ArrowCounterClockwise';
import { CheckIcon } from '@phosphor-icons/react/dist/ssr/Check';
import { PlayIcon } from '@phosphor-icons/react/dist/ssr/Play';
import { VibrateIcon } from '@phosphor-icons/react/dist/ssr/Vibrate';

import { TempelDemo, type TempelDemoProps } from '@/components/demo/TempelDemo';
import { Icon } from '@/components/Icon';
import { QR_SIZE, qrPath, qrSeed } from '@/components/preview/qr';
import { fiction } from '@/content/fiction';

import styles from './CaraKerja.module.css';

/** The three steps, after the app's TapRitualPreview, as briefly as they can be said. */
const steps: TempelDemoProps['steps'] = [
  {
    id: 'scan',
    title: 'Pindai kode',
    body: 'Satu HP menampilkan kode, HP lain memindainya.',
  },
  {
    id: 'shake',
    title: 'Goyang bersama',
    body: 'Dempetkan kedua HP, goyangkan dua detik.',
  },
  {
    id: 'done',
    title: 'Terhubung',
    body: 'Koneksi dan momen pertama tercatat di kedua HP.',
  },
];

const icons: TempelDemoProps['icons'] = {
  shake: <Icon glyph={VibrateIcon} size="lg" />,
  check: <Icon glyph={CheckIcon} weight="bold" />,
  stepCheck: <Icon glyph={CheckIcon} size="xs" weight="bold" />,
  play: <Icon glyph={PlayIcon} size="sm" />,
  replay: <Icon glyph={ArrowCounterClockwiseIcon} size="sm" />,
};

/** The demo code pattern (the hero's), drawn on the server and shown on both phones. */
const code = (
  <svg
    viewBox={`0 0 ${String(QR_SIZE)} ${String(QR_SIZE)}`}
    shapeRendering="crispEdges"
    aria-hidden="true"
    focusable="false"
  >
    <path d={qrPath(qrSeed(fiction.codeOwner, 0))} />
  </svg>
);

/** The answer to the problem: one way to connect, and only face to face. */
export function CaraKerja() {
  return (
    <section className={styles.section} aria-labelledby="cara-kerja">
      <div className="page">
        <TempelDemo
          intro={
            <>
              <h2 id="cara-kerja" className="type-section" tabIndex={-1}>
                Sebelum pamit, tempel dulu.
              </h2>
              <p className="type-body-large tone-secondary">
                Satu cara terhubung, hanya saat kalian berhadapan.
              </p>
            </>
          }
          steps={steps}
          icons={icons}
          code={code}
        />
      </div>
    </section>
  );
}
