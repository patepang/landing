# Sumber kebenaran: patepang.com

Diperbarui: 2026-11-06. Berkas ini adalah pintu masuk tunggal bagi siapa pun, orang atau agen, yang
mengerjakan repo ini. Bacalah sebelum apa pun, lalu `README.md`, `PRODUCT.md`, dan `DESIGN.md`.
Setiap repo Patepang punya berkas seperti ini di `docs/`; yang di repo aplikasi
(`patepang/app/docs/SUMBER-KEBENARAN.md`) memegang keadaan lintas repo dan rencana menuju
peluncuran, dan menang atas berkas ini untuk fakta produk dan keadaan.

Urutan kebenaran untuk kalimat di situs: kode dan dokumen `patepang/app`, `patepang/backend`, dan
`patepang/core` (apa yang sungguh ada); keputusan pemilik di ADR aplikasi 0060 (harga, umur, kontak,
lisensi, negara); `PRODUCT.md` (apa yang boleh dan tidak boleh diklaim); berkas ini. Bila berkas ini
berbeda, berkas ini yang diperbaiki. Situs tidak pernah mengklaim apa yang belum ada: "sudah
diaudit", "kode terbuka" (sekarang), "server tidak tahu siapa bertemu siapa", "tidak bisa diretas",
"paling aman", teruji di HP, angka pengguna, testimoni, mitra, rating.

## 1. Apa repo ini

Situs Patepang dalam bahasa Indonesia: halaman utama (apa Patepang, masalah, cara kerja tempel,
fitur setelah bertemu, skenario pemakaian sebagai contoh untuk pembaca, harga, tanya jawab, kapan
bisa dipakai) dan halaman kebijakan privasi, syarat dan ketentuan, pedoman komunitas, keamanan,
transparansi, hapus akun, langganan, kontak, tentang, lisensi, ditambah `security.txt`, `robots`,
`sitemap`, dan 404. Next.js App Router dengan static export, TypeScript, tanpa backend, formulir,
analytics, cookie, atau pengumpulan data; CSP tanpa pihak ketiga di `vercel.json`. Cabang `main`
di-deploy Vercel ke produksi.

## 2. Aturan yang mengikat

- **Sakelar ketersediaan** `src/content/availability.ts` adalah satu-satunya tempat yang menyatakan
  apakah Patepang sudah bisa dipasang. Sekarang `{ state: 'segera' }`. Saat peluncuran pemilik
  menggantinya dengan tautan App Store dan Google Play; seluruh situs mengikuti lewat
  `src/content/status-copy.ts`. `pnpm test:tersedia` memeriksa keadaan tersedia, `pnpm test:e2e`
  keadaan sekarang; keduanya membangun ulang situs.
- **Gerbang produksi**: build `main` di Vercel berhenti selama ada alamat surel di
  `src/content/contact.ts` yang belum `confirmed`. `halo@` dan `security@` sudah dikonfirmasi
  (Zoho Mail, 2026-11-04); `privasi@` dan `hukum@` diarahkan ke `halo@` sampai pemilik membuat kotak
  suratnya.
- **Dokumen legal masih draf** menunggu tinjauan penasihat hukum dan menampilkan pemberitahuannya
  (`draft` di `src/content/pages.ts`). Placeholder bertanda kurung siku (`data-placeholder`) tampil
  sampai pemilik atau penasihat hukum mengisinya; daftarnya di `docs/landing-implementation.md`
  §9.4.
- Identitas visual: wordmark `patepang` huruf kecil, tanda dua titik di header, Plus Jakarta Sans,
  Phosphor; design system aplikasi adalah otoritas (`DESIGN.md`). Kontras WCAG 2.2 AA untuk setiap
  pasangan warna (`pnpm check:contrast`), target sentuh 48 px, gerak dikurangi dihormati, teks utuh
  pada 200 persen; diperiksa pada 360, 390, 768, 1440 px.
- Dependensi dipatok lewat `packageManager` dan lockfile; Node `^22.13.0 || ^24.3.0`.
- Bahasa dokumen dan commit: Indonesia. `main` satu-satunya sumber kebenaran.

## 3. Keadaan per 2026-11-06

- `main` `579f5e4` (PR #1, 2026-11-05): situs nyata dengan halaman legal, keadaan "Segera hadir",
  entitas hukum PT Pakuan Teknologi Pangrango terisi, pembaruan aplikasi hanya lewat toko (ADR
  aplikasi 0110). Typecheck, lint, dan format hijau pada 2026-11-06; `pnpm test` (kontras,
  ketersediaan, Playwright) butuh Chromium 1194 Playwright.
- Menunggu pemilik: kotak surat `privasi@` dan `hukum@` (opsional), nomor PSE (`entity.pse`),
  tinjauan penasihat hukum atas semua dokumen legal dan jawaban placeholder, kebijakan tertulis
  permintaan aparat, target waktu peninjauan laporan, ringkasan hasil audit dan alamat kode sumber
  (hanya tampil di keadaan tersedia), simbol logo final, lencana resmi toko, tautan toko dan
  tanggal rilis.
- Pernyataan situs yang bergantung pada fitur aplikasi diperiksa ulang sebelum sakelar dibalik
  (`docs/landing-implementation.md` §10.4): hapus akun tanpa aplikasi dan kode penghapusan, langkah
  persetujuan dan gerbang umur, pemberitahuan di aplikasi, melupakan token push, pembuka ekspor;
  semuanya dibangun di aplikasi (cabang REL, digabung ke `main` aplikasi oleh koordinator), halaman
  web hapus akun ada di `patepang/app` `web/hapus-akun/` dan belum dihosting.

## 4. Perintah

`corepack enable`, `pnpm install`, `pnpm dev` (localhost:3000), `pnpm build` (export ke `out/`),
`pnpm preview` (127.0.0.1:4173 dengan header `vercel.json`), `pnpm check` (typecheck, lint,
format, lalu `pnpm test`: kontras, test:tersedia, test:e2e; Playwright membangun dan menyajikan di
4174), `pnpm screenshots` (gambar tinjauan di `docs/screenshots/`).

## 5. Peta berkas

- `docs/SUMBER-KEBENARAN.md`: berkas ini. `README.md`: menjalankan, memeriksa, sakelar, gerbang
  produksi, yang harus diisi pemilik, peta repo. `PRODUCT.md`: kebenaran produk dan apa yang boleh
  diklaim. `DESIGN.md`: design system situs.
- `docs/landing-implementation.md`: keputusan, penyimpangan, verifikasi, batas, revisi, situs nyata
  dan dokumen legal (§9), koreksi setelah tinjauan dan penghalang rilis (§10). `docs/screenshots/`:
  gambar tinjauan yang dibuat `pnpm screenshots`.
- `src/content/`: `availability.ts`, `status-copy.ts`, `status.ts`, `pages.ts`, `contact.ts`,
  `entity.ts`, `pricing.ts`, `security.ts`, `metadata.ts`, `sections.ts`, `fiction.ts` (data
  contoh rekaan). `src/app/`: halaman. `src/components/`: bagian halaman utama, kerangka halaman
  dokumen, pratinjau aplikasi, demo tempel, header dan footer. `tests/`: Playwright.
- `.claude/skills/`: skill Claude Code yang disalin ke repo atas keputusan pemilik 2026-10-22
  (frontend-design, superpowers, impeccable, vercel, webapp-testing); bukan bagian situs.
- Dihapus 2026-11-06 (riwayat git): `docs/product-understanding.md` (usang sejak 4 November),
  `docs/tooling-status.md`, `docs/superpowers/` (spesifikasi desain 22 Oktober), `.impeccable/`
  (kritik dan mock 22 Oktober).
