import { ArrowCounterClockwiseIcon } from '@phosphor-icons/react/dist/ssr/ArrowCounterClockwise';
import { CheckIcon } from '@phosphor-icons/react/dist/ssr/Check';
import { DeviceMobileIcon } from '@phosphor-icons/react/dist/ssr/DeviceMobile';
import { PlayIcon } from '@phosphor-icons/react/dist/ssr/Play';
import { ScanIcon } from '@phosphor-icons/react/dist/ssr/Scan';
import { VibrateIcon } from '@phosphor-icons/react/dist/ssr/Vibrate';

import { TempelDemo, type TempelDemoProps } from '@/components/demo/TempelDemo';
import { Icon } from '@/components/Icon';

import styles from './CaraKerja.module.css';

/** The three steps, worded as in the app's TapRitualPreview. */
const steps: TempelDemoProps['steps'] = [
  {
    id: 'scan',
    title: 'Pindai kode',
    body: 'Satu HP menampilkan kode; HP lainnya memindainya.',
  },
  {
    id: 'shake',
    title: 'Goyang bersama',
    body: 'Pegang kedua HP berdempetan, lalu goyangkan bersama selama dua detik.',
  },
  {
    id: 'done',
    title: 'Terhubung',
    body: 'Koneksi kalian dan momen pertama tercatat di kedua HP.',
  },
];

const icons: TempelDemoProps['icons'] = {
  phone: <Icon glyph={DeviceMobileIcon} size="lg" />,
  scan: <Icon glyph={ScanIcon} />,
  shake: <Icon glyph={VibrateIcon} />,
  check: <Icon glyph={CheckIcon} weight="bold" />,
  stepCheck: <Icon glyph={CheckIcon} size="xs" weight="bold" />,
  play: <Icon glyph={PlayIcon} size="sm" />,
  replay: <Icon glyph={ArrowCounterClockwiseIcon} size="sm" />,
};

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
                Patepang hanya menghubungkan orang yang <span className="nowrap">benar-benar</span>{' '}
                bertemu. Caranya satu: tempel, saat kalian berhadapan. Tidak ada pencarian, dan
                tidak ada permintaan pertemanan dari orang asing.
              </p>
            </>
          }
          steps={steps}
          icons={icons}
        />
      </div>
    </section>
  );
}
