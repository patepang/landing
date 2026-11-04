import { pricing } from '@/content/pricing';

import styles from './Harga.module.css';

interface Plan {
  readonly name: string;
  readonly price: string;
  readonly per?: string;
  readonly note: string;
  readonly rows: readonly { readonly term: string; readonly value: string }[];
}

/**
 * The two plans, side by side with their rows level (subgrid), so the one difference reads at a
 * glance: every feature is in both, and the subscription only adds space and file size (app ADR
 * 0060 B21, B22). The stores hold the final prices. The free plan's space reads as its true
 * ceiling: the 10 GB cap is the bonus's, on top of 5 GB. Files above 64 MB go up in parts, which
 * the app does not do yet (backend ADR 0130), so the sizes above that are said as coming.
 */
const plans: readonly Plan[] = [
  {
    name: 'Gratis',
    price: 'Rp0',
    note: 'Tanpa pembayaran apa pun.',
    rows: [
      { term: 'Fitur', value: 'Semua' },
      {
        term: 'Ruang media di server',
        value: `${pricing.free.storage}, ditambah ${pricing.free.bonusPerPair} untuk setiap orang yang kamu temui lagi, sampai total ${pricing.free.storageMax}`,
      },
      { term: 'Ukuran berkas', value: `Sampai ${pricing.free.file}` },
    ],
  },
  {
    name: 'Langganan',
    price: pricing.monthly,
    per: 'per bulan',
    note: `Atau ${pricing.yearly} per tahun, hemat ${pricing.yearlySaving}. Masa coba ${String(pricing.trialDays)} hari untuk pelanggan baru.`,
    rows: [
      { term: 'Fitur', value: 'Semua, sama persis' },
      { term: 'Ruang media di server', value: pricing.subscriber.storage },
      { term: 'Ukuran berkas', value: `Sampai ${pricing.subscriber.file}` },
    ],
  },
];

/** What Patepang costs: nothing for any feature; the subscription buys room, not features. */
export function Harga() {
  return (
    <section className={styles.section} aria-labelledby="harga">
      <div className={`page ${styles.grid}`}>
        <div className={styles.header}>
          <h2 id="harga" className="type-section" tabIndex={-1}>
            Semua fitur gratis.
          </h2>
          <p className="type-body-large tone-secondary">
            Langganan hanya menambah ruang media di server dan ukuran berkas yang bisa kamu kirim.
          </p>
          <p className="type-body-small tone-secondary">
            Pembayaran, perpanjangan, dan penghentian lewat App Store atau Google Play. Harga
            ditetapkan di toko; di luar Indonesia harganya setara. Pengiriman berkas di atas 64 MB
            menyusul.
          </p>
          <a className={styles.more} href="/langganan">
            Rincian langganan
          </a>
        </div>
        <div className={styles.plans}>
          {plans.map((plan) => (
            <div key={plan.name} className={styles.plan}>
              <h3 className="type-headline">{plan.name}</h3>
              <p className={styles.price}>
                <span className={styles.amount}>{plan.price}</span>
                {plan.per ? <span className="type-body tone-secondary"> {plan.per}</span> : null}
              </p>
              <p className="type-body-small tone-secondary">{plan.note}</p>
              {plan.rows.map((row) => (
                <dl key={row.term} className={styles.row}>
                  <dt className="type-body-small tone-secondary">{row.term}</dt>
                  <dd className="type-body-strong">{row.value}</dd>
                </dl>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
