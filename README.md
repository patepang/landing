# patepang.com

Landing page Patepang: satu halaman statis berbahasa Indonesia untuk aplikasi yang sudah hadir.
Isinya: apa Patepang, masalah yang dijawab, cara kerja tempel, fitur setelah bertemu, skenario
pemakaian, tanya jawab, dan ajakan mengunduh, tanpa formulir. Tautan toko aplikasi menyusul.

Dibangun dengan Next.js (App Router, static export) dan TypeScript. Tidak ada backend, formulir,
analytics, atau pengumpulan data. Cabang `main` di-deploy otomatis oleh Vercel.

## Menjalankan secara lokal

Butuh Node.js `^22.13.0 || ^24.3.0` dan Corepack (bawaan Node). Versi pnpm dipin di
`package.json` (`packageManager`).

```bash
corepack enable          # sekali saja, agar `pnpm` memakai versi yang dipin
pnpm install
pnpm dev                 # server pengembangan di http://localhost:3000
pnpm build               # static export ke out/
pnpm preview             # sajikan out/ di http://127.0.0.1:4173 (tanpa dependensi tambahan)
```

## Pemeriksaan

```bash
pnpm typecheck           # tsc --noEmit
pnpm lint                # ESLint (eslint-config-next), nol peringatan
pnpm format:check        # Prettier
pnpm check:contrast      # rasio kontras WCAG semua pasangan warna, tema terang dan gelap
pnpm test                # kontras + build + Playwright atas hasil export (bukan dev server)
pnpm screenshots         # build, lalu tulis ulang gambar tinjauan di docs/screenshots/
pnpm check               # typecheck, lint, format, lalu test
```

`pnpm test:e2e` dan `pnpm screenshots` selalu menjalankan `next build` lebih dulu dan menyalakan
server statis baru di port 4174 (ubah dengan `TEST_PORT`), sehingga tes tidak pernah lulus atas
build lama atau atas `pnpm preview` yang masih berjalan di 4173.

Tes Playwright memakai Chromium versi 1194 (Playwright 1.56.1). Di mesin baru, jalankan sekali
`pnpm exec playwright install chromium`. Tes zoom memakai Chromium penuh (`channel: 'chromium'`),
karena hanya mode itu yang membaca pengaturan zoom dan ukuran teks browser.

## Peta repo

- `src/app/`: `layout.tsx` (metadata, font, tema), `page.tsx` (seluruh halaman),
  `not-found.tsx` (404), `tokens.css` (token dari design system app), `globals.css`, `fonts/`
  (Plus Jakarta Sans, OFL).
- `src/components/`: `sections/` (bagian halaman), `preview/` (komponen app dengan data contoh),
  `demo/TempelDemo.tsx`, `site/HeaderShell.tsx`, dan `site/MobileMenu.tsx` (tiga Client
  Component), `brand/` (dua titik dan lockup), `site/` (header dan footer), `ui/` (gaya tombol).
- `tests/`: Playwright (`landing.spec.ts`, `zoom.spec.ts`, `screenshots.spec.ts`).
- `scripts/`: `serve-out.mjs` (server statis lokal), `check-contrast.mjs`.
- `docs/landing-implementation.md`: keputusan, penyimpangan dari rancangan, verifikasi, dan batas.
- `PRODUCT.md`, `DESIGN.md`, `docs/product-understanding.md`: kebenaran produk dan design system.
