# patepang.com

Situs Patepang dalam bahasa Indonesia: halaman utama (apa Patepang, masalah yang dijawab, cara
kerja tempel, fitur setelah bertemu, skenario pemakaian, harga, tanya jawab, dan kapan Patepang
bisa dipakai) ditambah halaman kebijakan privasi, syarat dan ketentuan, pedoman komunitas,
keamanan, transparansi, hapus akun, langganan, kontak, tentang, dan lisensi. Patepang belum ada di
App Store maupun Google Play; satu sakelar mengubah seluruh situs saat sudah ada (lihat di bawah).

Dibangun dengan Next.js (App Router, static export) dan TypeScript. Tidak ada backend, formulir,
analytics, cookie, atau pengumpulan data. Cabang `main` di-deploy otomatis oleh Vercel ke produksi.

## Menjalankan secara lokal

Butuh Node.js `^22.13.0 || ^24.3.0` dan Corepack (bawaan Node). Versi pnpm dipin di
`package.json` (`packageManager`).

```bash
corepack enable          # sekali saja, agar `pnpm` memakai versi yang dipin
pnpm install
pnpm dev                 # server pengembangan di http://localhost:3000
pnpm build               # static export ke out/
pnpm preview             # sajikan out/ di http://127.0.0.1:4173, dengan header vercel.json
```

## Pemeriksaan

```bash
pnpm typecheck           # tsc --noEmit
pnpm lint                # ESLint (eslint-config-next), nol peringatan
pnpm format:check        # Prettier
pnpm check:contrast      # rasio kontras WCAG semua pasangan warna, tema terang dan gelap
pnpm test:tersedia       # build keadaan "sudah di toko" (fixture), lalu tes ketersediaannya
pnpm test:e2e            # build sungguhan, lalu seluruh tes Playwright
pnpm test                # kontras, test:tersedia, lalu test:e2e
pnpm screenshots         # build, lalu tulis ulang gambar tinjauan di docs/screenshots/
                         # (halaman lain di docs/screenshots/pages/, tidak di-commit)
pnpm check               # typecheck, lint, format, lalu test
```

`pnpm test:e2e`, `pnpm test:tersedia`, dan `pnpm screenshots` selalu menjalankan `next build` lebih
dulu dan menyalakan server statis baru di port 4174 (ubah dengan `TEST_PORT`), sehingga tes tidak
pernah lulus atas build lama atau atas `pnpm preview` yang masih berjalan di 4173. Server lokal
(`scripts/serve-out.mjs`) menerapkan header dan redirect `vercel.json` seperti Vercel, jadi tes
berjalan di bawah Content-Security-Policy sungguhan. `pnpm test` menjalankan `test:tersedia` lebih
dulu, sehingga `out/` di akhir selalu berisi build sungguhan.

Tes Playwright memakai Chromium versi 1194 (Playwright 1.56.1). Di mesin baru, jalankan sekali
`pnpm exec playwright install chromium`. Bila mesin hanya punya Chromium lain (misalnya build 1243
di `/opt/pw-browsers`), arahkan `PLAYWRIGHT_BROWSERS_PATH` ke folder yang memetakan nama build 1194
ke Chromium itu. Tes zoom memakai Chromium penuh (`channel: 'chromium'`), karena hanya mode itu yang
membaca pengaturan zoom dan ukuran teks browser.

## Sakelar ketersediaan

`src/content/availability.ts` adalah satu-satunya tempat yang menyatakan apakah Patepang sudah bisa
dipasang. Sekarang nilainya `{ state: 'segera' }`: header menampilkan "Segera hadir", hero
menampilkan status di bawah "Lihat cara kerja", section penutup berkata "Patepang segera hadir di
Indonesia.", dan halaman Hapus akun serta Langganan menyebut bahwa aplikasinya belum bisa diunduh.

Saat peluncuran, ganti nilainya dengan tautan kedua toko:

```ts
export const availability: Availability = {
  state: 'tersedia',
  appStore: 'https://apps.apple.com/id/app/...',
  googlePlay: 'https://play.google.com/store/apps/details?id=...',
};
```

Semua kata yang bergantung padanya ada di `src/content/status-copy.ts`. Jalankan `pnpm check`,
lalu periksa pratinjau Vercel sebelum menggabungkan ke `main`.

## Yang harus diisi pemilik

Placeholder bertanda kurung siku (misalnya `[Nama badan hukum]`) tampil di halaman sampai datanya
diisi:

- `src/content/entity.ts`: nama badan hukum, alamat, NIB/PSE, pejabat pelindungan data, dan
  pengadilan negeri untuk sengketa.
- `src/content/contact.ts`: alamat surel. Buat kotak suratnya sebelum produksi.
- Placeholder lain (fakta yang belum dikonfirmasi, misalnya retensi log Vercel) ada di teks
  halamannya; daftarnya di `docs/landing-implementation.md` §9.

Dokumen legal masih draf yang menunggu tinjauan penasihat hukum dan menampilkan pemberitahuan
"Draf: menunggu tinjauan penasihat hukum. Belum berlaku." Pemberitahuan itu diatur oleh `draft`
di `src/content/pages.ts`.

## Peta repo

- `src/app/`: `layout.tsx` (metadata, font, tema), `page.tsx` (halaman utama), `not-found.tsx`
  (404), satu folder per halaman (`kebijakan-privasi/`, `syarat-ketentuan/`, ...),
  `.well-known/security.txt/route.ts`, `robots.ts`, `sitemap.ts`, `tokens.css`, `globals.css`,
  `fonts/` (Plus Jakarta Sans, OFL).
- `src/content/`: `availability.ts` (sakelar), `status-copy.ts` dan `status.ts` (kata-kata per
  keadaan), `pages.ts` (daftar halaman untuk footer, indeks kebijakan, sitemap, dan tes),
  `contact.ts`, `entity.ts`, `pricing.ts`, `security.ts`, `metadata.ts`, `sections.ts`,
  `fiction.ts` (data contoh pratinjau).
- `src/components/`: `sections/` (bagian halaman utama), `doc/` (kerangka halaman dokumen,
  placeholder, kartu tautan), `preview/` (komponen app dengan data contoh), `demo/TempelDemo.tsx`,
  `site/` (header, footer, `HeaderShell.tsx` dan `MobileMenu.tsx`), `brand/`, `ui/`.
- `tests/`: Playwright (`landing.spec.ts`, `pages.spec.ts`, `availability.spec.ts`,
  `zoom.spec.ts`, `screenshots.spec.ts`), `fixtures/availability-tersedia.ts`.
- `scripts/`: `serve-out.mjs` (server statis lokal dengan aturan `vercel.json`),
  `check-contrast.mjs`.
- `vercel.json`: header keamanan (CSP tanpa pihak ketiga, HSTS, dan lainnya) dan redirect
  `/ketentuan`.
- `docs/landing-implementation.md`: keputusan, penyimpangan, verifikasi, batas, dan tugas pemilik.
- `PRODUCT.md`, `DESIGN.md`: kebenaran produk dan design system.
