'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

import { TwoDots, type DotsPhase } from '@/components/brand/TwoDots';
import button from '@/components/ui/button.module.css';

import styles from './TempelDemo.module.css';

type Phase = 'idle' | 'scan' | 'shake' | 'done';
export type TempelStepId = Exclude<Phase, 'idle'>;

/** Timeline of the app's TapRitualPreview, in ms from the start. */
const TIMELINE = { shakeAt: 900, doneAt: 1900 } as const;

/** How much of the stage must be on screen before it plays by itself, once. */
const AUTOPLAY_THRESHOLD = 0.6;

const order: Record<Phase, number> = { idle: -1, scan: 0, shake: 1, done: 2 };

/** As on the app's shake screen (ShakeScreen.tsx): apart until shaking, near while shaking, met. */
const dots: Record<Phase, DotsPhase> = {
  idle: 'apart',
  scan: 'apart',
  shake: 'near',
  done: 'meet',
};

/** Nothing to subscribe to: the value below only changes from the server's to the browser's. */
const subscribe = () => () => undefined;

/**
 * False in the exported HTML and while the page hydrates, true once React runs here. Until then
 * the button would not respond (the script may still be loading, or may never load), so it is
 * not offered; its space stays reserved.
 */
function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

/**
 * Announced as the walk-through moves on, for runs started by a press only: the run that starts by
 * itself stays quiet, since the steps list already says the same and an unasked announcement would
 * interrupt whatever is being read. On screen, the phones and the current step say it.
 */
const status: Record<Phase, string> = {
  idle: '',
  scan: 'Langkah 1 dari 3: pindai kode.',
  shake: 'Langkah 2 dari 3: goyang bersama.',
  done: 'Langkah 3 dari 3: terhubung. Koneksi dan momen pertama tercatat di kedua HP.',
};

export interface TempelDemoProps {
  /** Section heading and intro, rendered on the server. */
  intro: ReactNode;
  steps: readonly { id: TempelStepId; title: string; body: string }[];
  /** Icons rendered on the server, so no icon code ships to the browser. */
  icons: Record<'shake' | 'check' | 'stepCheck' | 'play' | 'replay', ReactNode>;
  /** The code pattern, drawn on the server: on one phone's screen, and in the other's camera. */
  code: ReactNode;
}

/**
 * An illustrated walk-through of tempel, after the app's TapRitualPreview, on two phones: one
 * shows its code and the other's camera finds it; the phones move together and shake; the two
 * dots on both screens meet and a check mark lands. It plays by itself once, the first time the
 * stage is well on screen (unless a press already played it), and again on every press of the
 * button; it never loops. Pressing the button while it plays starts it over, and the button stays
 * enabled, so keyboard focus never drops to the page. Under reduced motion the CSS keeps every
 * step but drops the travel, the shake and the scan.
 */
export function TempelDemo({ intro, steps, icons, code }: TempelDemoProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  /** Set by the first press; from then on every run was asked for, so it is announced. */
  const [pressed, setPressed] = useState(false);
  const timers = useRef<number[]>([]);
  const started = useRef(false);
  const stage = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();

  useEffect(() => {
    const pending = timers.current;
    return () => {
      for (const id of pending) window.clearTimeout(id);
    };
  }, []);

  const play = useCallback(() => {
    started.current = true;
    for (const id of timers.current) window.clearTimeout(id);
    timers.current.length = 0;
    setPhase('scan');
    timers.current.push(
      window.setTimeout(() => {
        setPhase('shake');
      }, TIMELINE.shakeAt),
      window.setTimeout(() => {
        setPhase('done');
      }, TIMELINE.doneAt),
    );
  }, []);

  useEffect(() => {
    const target = stage.current;
    if (!target || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        if (!started.current) play();
      },
      { threshold: AUTOPLAY_THRESHOLD },
    );
    observer.observe(target);
    return () => {
      observer.disconnect();
    };
  }, [play]);

  function press() {
    setPressed(true);
    play();
  }

  const current = order[phase];

  /* Both screens once the code is read: the dots draw near as the phones shake, then meet. */
  const ritual = (
    <span className={styles.ritual}>
      <TwoDots phase={dots[phase]} size="md" />
      <span className={styles.sign}>
        {phase === 'done' ? <span className={styles.check}>{icons.check}</span> : icons.shake}
      </span>
    </span>
  );

  return (
    <div className={styles.demo} data-phase={phase}>
      <div className={styles.intro}>{intro}</div>

      {/* role="list": Safari drops list semantics from a list without markers outside a nav. */}
      <ol className={styles.steps} role="list">
        {steps.map((step, index) => {
          const state = current > index ? 'past' : current === index ? 'current' : 'next';
          const checked = state === 'past' || (state === 'current' && step.id === 'done');
          return (
            <li
              key={step.id}
              className={styles.step}
              data-state={state}
              aria-current={state === 'current' ? 'step' : undefined}
            >
              <span className={styles.marker} aria-hidden="true">
                {checked ? icons.stepCheck : index + 1}
              </span>
              <span className={styles.stepText}>
                <span className="type-body-strong">{step.title}</span>
                <span className="type-body-small tone-secondary">{step.body}</span>
              </span>
            </li>
          );
        })}
      </ol>

      <div className={styles.player}>
        <div ref={stage} className={styles.stage} aria-hidden="true">
          <div className={styles.phones}>
            <span className={`${styles.phone} ${styles.left}`}>
              <span className={styles.screen}>
                {/* The Tempel tab: the dots apart over the code. */}
                <span className={styles.shows}>
                  <TwoDots phase="apart" size="sm" />
                  <span className={styles.codeCard}>{code}</span>
                </span>
                {ritual}
              </span>
            </span>
            <span className={`${styles.phone} ${styles.right}`}>
              <span className={styles.screen}>
                {/* The camera, finding the other phone's code. */}
                <span className={styles.camera}>
                  <span className={styles.viewfinder}>
                    <span className={styles.seen}>{code}</span>
                    <span className={styles.sweep} />
                    <svg className={styles.corners} viewBox="0 0 100 100" focusable="false">
                      <path d="M0 24V0H24M76 0H100V24M100 76V100H76M24 100H0V76" />
                    </svg>
                  </span>
                </span>
                {ritual}
              </span>
            </span>
          </div>
        </div>
        <div className={styles.controls} data-hydrating={hydrated ? undefined : ''}>
          <button type="button" className={`${button.button} ${button.primary}`} onClick={press}>
            {phase === 'idle' ? icons.play : icons.replay}
            {phase === 'idle' ? 'Putar' : 'Putar lagi'}
            <span className="visually-hidden">{' cara tempel'}</span>
          </button>
          <p className="visually-hidden" role="status">
            {pressed ? status[phase] : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
