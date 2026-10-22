# Implementasi landing patepang.com

- **Tanggal:** 22 Oktober 2026.
- **Status:** diimplementasikan dan diuji secara lokal. Belum di-commit, belum di-deploy, tanpa
  hosting, DNS, analytics, atau pengumpulan data.
- **Arah:** A, Tur prototipe (`docs/superpowers/specs/2026-10-22-landing-design.md` §8), sesuai
  keputusan pemilik di brief implementasi.
- **Sumber kebenaran:** `PRODUCT.md`, `DESIGN.md`, `docs/product-understanding.md`, dan kode
  `patepang/app` @ `262202f` (dibaca saja, lewat clone terpisah di luar repo ini; tidak ada
  install, build, atau perubahan di app).

## 1. Yang dibangun

Satu route `/` berisi seluruh cerita, ditambah 404:

1. **Header**: lockup bertumpuk (dua titik di atas wordmark, dari `features/system/Wordmark.tsx`),
   skip link "Langsung ke isi", empat anchor. Di bawah 768px hanya "Tanya jawab" yang tersisa,
   sesuai spec §9 untuk HP. Header tidak menempel, agar zoom 200% tidak tertutup bilah.
2. **Hero**: H1 "Hanya orang yang pernah kamu temui.", lede yang menyebut "sedang dirancang", CTA
   "Lihat cara tempel" dan "Tentang prototipe", serta status "Masih prototipe dengan data fiktif.
   Belum tersedia untuk diunduh." Di bawahnya panggung forest mist: layar Tempel varian akun
   belum lahir (layar 1.9 di app, tanpa tombol titik lahir, persis seperti app saat layar itu
   tidak tersedia) yang muncul dari tepi bawah panggung, dengan tiga anotasi bergaris penunjuk.
3. **Cerita**: masalah dan rancangan dalam dua paragraf, tanpa klaim riset.
4. **Cara tempel**: tiga langkah dengan copy dari `TapRitualPreview`, dan demo "Putar cara tempel"
   / "Putar lagi" (satu-satunya Client Component). Di bawah kedua HP, dua titik merek berjauhan,
   mendekat, lalu bertemu, seperti di layar goyang app (`ShakeScreen.tsx`).
5. **Setelah bertemu**: tiga pemberhentian tur. Kabar (`DayCompleteCard`), Momen (`MomenCard`),
   lalu Orang dan bertemu lagi (`ConnectionCard` dengan peringatan memudar, ditambah satu baris
   Rencana). Di layar lebar ketiganya berdiri di satu panggung yang sama. Ditutup daftar "Yang
   sengaja tidak ada".
6. **Status prototipe**: belum tersedia untuk diunduh, belum ada tanggal rilis, data pratinjau fiktif.
7. **Tanya jawab**: lima `<details>`; pertanyaan asal nama tidak dimuat karena belum terverifikasi.
8. **Penutup dan footer**: "Selesai. Tidak ada yang perlu dikejar.", dua anchor kembali ke isi
   halaman ("Lihat cara tempel", "Kembali ke pratinjau"). Footer ringkas: lockup, "Hanya orang yang
   pernah kamu temui.", dan "Kembali ke atas". Tidak ada tautan ke halaman yang belum ada.

Semua pratinjau diberi `figcaption` "Pratinjau prototipe — data fiktif" dan nama aksesibel
(`role="img"` + `aria-label`). Tidak ada screenshot asli app yang dipakai (tidak ada aset aman, dan
app tidak boleh di-build); semua pratinjau adalah terjemahan HTML/CSS/SVG dari komponen sumber.

## 2. Keputusan dan penyimpangan (dengan alasan)

| Hal | Keputusan | Alasan |
|---|---|---|
| Token | `src/app/tokens.css` menerjemahkan `palette.ts`, `color.ts` (terang dan gelap), `typography.ts`, `spacing.ts`, `shape.ts`, `elevation.ts`, `motion.ts`, `layout.ts`, `opacity.ts` apa adanya. Komponen hanya membaca custom property. | Brief: token lengkap dari sumber, tanpa nilai mentah di komponen. |
| Ukuran teks | Skala app diubah ke `rem` (16px = 1rem); tracking diubah ke `em`. | Agar pengaturan ukuran teks pembaca tetap berlaku, setara `allowFontScaling` di app. |
| Perluasan web | H1 40/56/72px dan H2 28/32/40px per breakpoint, lebar halaman 1360px dengan grid 12 kolom, jarak antarsection 64/96/128px. Ditandai terpisah di `tokens.css`. | Skala app (display 36px) dirancang untuk HP; di 1440px hierarkinya hilang (spec §12). |
| Hover | Memakai warna *pressed* yang sudah ada, hanya di `@media (hover: hover)`. | App native tidak punya hover. |
| Penanda langkah demo | Ukurannya `1rem + 8px` (24px di ukuran normal), tumbuh bersama teks. | Di teks 200% angka keluar dari lingkaran 24px yang tetap; aturan "Readable-at-200%" di DESIGN.md meminta tinggi minimum. |
| Inisial avatar | Ukuran px tetap. | Paritas dengan app (`allowFontScaling={false}`): lingkaran avatar berukuran tetap. |
| Istilah | "Bertemu dan **tempel** lagi" di kartu koneksi. | `ConnectionCard.tsx` masih memakai "tepang" (drift); spec §12 memilih "tempel" di semua tempat, sesuai `SCREENS-v1.md` dan `OrangScreen.tsx`. |
| Demo | Timeline dan geometri `TapRitualPreview` (0,9 s dan 1,9 s; mendekat 24px; goyang 5° per 70ms, tiga siklus); di layar lebar diperbesar 1,5×. Tiga langkah bernomor, label tombol dari brief. | Brief meminta tiga langkah dan label "Putar cara tempel" / "Putar lagi"; app memakai dua langkah ditambah hasil. |
| Gerak dikurangi | Tanpa translasi, rotasi, atau skala; tanda centang muncul dengan fade 120ms; status tetap berganti. | DESIGN.md dan brief. |
| Tanpa JavaScript | Semua isi tampil; tombol demo disembunyikan dengan `@media (scripting: none)`. Selama halaman belum terhidrasi (skrip masih dimuat atau gagal dimuat), kontrol demo bertanda `data-hydrating` dan disembunyikan dengan `visibility: hidden`, ruangnya tetap disisakan. | Brief: tidak ada tombol yang hanya tampak bisa diklik. Sebelum hidrasi, klik pada tombol hilang begitu saja. |
| Gerak khas | Hanya di demo Cara tempel, dan hanya setelah ditekan: dua HP mendekat dan bergoyang, centang mendarat, dua titik merek bertemu. Layar Tempel di hero diam; lockup tidak bergerak saat halaman dimuat. | Spec §8 A menaruh momen khas di layar hero, dan §11 mengizinkan satu gerak lockup saat dimuat. Brief menaruh demo di section Cara tempel dan melarang gerak dekoratif, jadi satu momen yang dipicu pengunjung sudah cukup. "Layar hero sebagai demo" tetap pertanyaan terbuka untuk pemilik. |
| Navigasi di HP | Di bawah 768px: lockup dan "Tanya jawab", tanpa menu tambahan. | Spec §9 (Mobile); brief: "menu tambahan hanya jika perlu". Halaman adalah satu tur yang dibaca berurutan, dan dua tombol hero menuju demo dan status. |
| Footer | Lockup, tagline, "Kembali ke atas". Status prototipe tidak diulang di footer. | Wireframe spec §9 menaruh status di footer. Kritik Impeccable menilai penafian yang berulang terbaca seperti permintaan maaf, dan halaman perlu benar-benar selesai. Status tetap terlihat di hero, di section Status prototipe, dan di FAQ "Kapan". |
| Breakpoint | 600 dan 1024px dari kelas jendela app (gutter 20/32/40). Khusus landing: 720px (anotasi hero pindah ke kanan HP), 768px (header menampilkan keempat anchor), 1280px (judul hero berdampingan dengan lede, anotasi di kedua sisi HP). | Diturunkan dari isi, bukan dari daftar perangkat; spec hanya menetapkan HP (360 sampai 599px) dan desktop (≥ 1024px). |
| Sorotan langkah demo | Latar `surface-pressed` (1,08:1 terhadap kanvas terang, 1,43:1 gelap), ditambah penanda terisi berangka, `aria-current="step"`, dan kalimat status. | Warna bukan satu-satunya penanda, jadi kontras latar di bawah 3:1 diterima dan dicatat. |
| Daftar langkah | `<ol role="list">`. | Safari menghapus semantik daftar dari list tanpa penanda di luar `nav`; peran eksplisit mempertahankannya. Belum diuji dengan VoiceOver (lihat §7). |
| Pola kode | Port `qrPath()` dari `QrCodeView.tsx`. Modul gelap identik (dicek untuk empat seed); hanya path-nya digabung per baris. | Setia pada sumber, path ±50% lebih pendek. |
| Data fiktif | `src/content/fiction.ts`: satu cerita yang konsisten (Sari, pertama bertemu 3 Mar 2025, terakhir 341 hari lalu, memudar dalam 24 hari, rencana Sabtu, 7 November). String dibentuk mengikuti formatter app. | Pratinjau tidak boleh tampak seperti data pengguna nyata, tetapi juga tidak boleh tidak masuk akal. |
| Favicon dan gambar sosial | `<link rel="icon" href="data:,">`; tidak ada `og:image`. | Brief: jangan mengarang aset atau simbol. |
| Font | Empat file woff2 Plus Jakarta Sans (latin) dari `@fontsource/plus-jakarta-sans@5.3.0`, disalin ke `src/app/fonts/` bersama `OFL.txt`, dimuat dengan `next/font/local` (fallback metrik dari Arial). | Di-host sendiri, tanpa permintaan ke Google saat build maupun runtime. |
| Creative North Star | "Dua Titik Bertemu" hanya arahan kerja; tidak muncul di halaman. | Brief. |

## 3. Dependensi

Versi diperiksa di registry npm pada 22 Oktober 2026, dipin persis, dipasang dengan pnpm 10.34.6
(Corepack, hash diverifikasi), satu lockfile. Kebijakan dari app: umur rilis minimal 14 hari
(`minimum-release-age` di `.npmrc`), skrip lifecycle diblokir (`onlyBuiltDependencies: []`).

| Paket | Versi | Catatan |
|---|---|---|
| `next` | 16.4.2 (15 Okt 2026) | **Pengecualian keamanan.** `next build` 16.4.0 berhenti dengan peringatan keamanan. Database advisory npm membenarkan tiga advisory untuk `>=16.0.0 <=16.4.0`: GHSA-2464-fhr4-w9xw (kritis), GHSA-673q-mjm6-r5xr (kritis), GHSA-p3m5-59mp-jv5r (tinggi). Rilis perbaikan pertama (16.4.1) berumur kurang dari 14 hari, jadi hanya `next`, `@next/env`, dan biner `@next/swc-*` (keduanya dipin persis oleh `next`) yang dikecualikan (`minimum-release-age-exclude` di `.npmrc`). Uji negatif pada salinan sementara: tanpa pengecualian, `next` 16.4.2 ditolak; tanpa pola `@next/swc-*`, biner SWC 16.4.2 ditolak; dengan pengecualian, `prettier` 3.9.10 tetap ditolak. `@next/eslint-plugin-next` 16.4.0 sudah lewat 14 hari dan tetap tunduk pada aturan umur. Hapus pengecualian setelah 29 Okt 2026. Perintah `next upgrade --agent=security` yang disarankan CLI tidak dijalankan. |
| `react`, `react-dom` | 19.3.0 | 19.3.1 belum 14 hari dan tidak punya advisory. |
| `@phosphor-icons/react` | 2.1.10 | Paket web; diimpor per ikon dari `dist/ssr/*` dan dirender di server. |
| `typescript` | 6.0.3 | `typescript-eslint` 8.71.1 membatasi `typescript <6.1.0`; TS 7.0.2 belum didukung. |
| `eslint` | 9.39.5 | `eslint-plugin-react` 7.37.5, `-import` 2.32.0, dan `-jsx-a11y` 6.10.2 di dalam `eslint-config-next` hanya mendeklarasikan dukungan sampai ESLint 9, dan repo Next.js v16.4.0 sendiri memakai ESLint 9.37.0. Catatan: lini ESLint 9 sudah ditandai tidak didukung di registry; ini alat dev saja dan tidak ikut ke hasil build. |
| `eslint-config-next` | 16.4.0 | Tidak punya advisory; tetap dalam aturan umur. |
| `prettier` | 3.9.9 | 3.9.10 belum 14 hari. |
| `@playwright/test` | 1.56.1 | Cocok dengan Chromium 141 (build 1194) yang terpasang di lingkungan ini. |
| `axe-core` | 4.14.0 | Audit otomatis pelengkap di tes; bukan bukti kepatuhan menyeluruh. |
| `@types/node`, `@types/react`, `@types/react-dom` | 22.20.5, 19.3.0, 19.3.0 | |

Dokumentasi yang dipakai untuk API Next.js adalah salinan resmi yang ikut terpasang
(`node_modules/next/dist/docs`, versi yang sama), sebagai pengganti Context7 yang tidak tersedia di
sesi ini.

## 4. Berat halaman (hasil export)

Diukur ulang dari `out/` hasil build terakhir:

- HTML `index.html`: 84 KB, 18 KB gzip.
- CSS: tiga file, 37 KB, 8 KB gzip. Font: empat woff2, 47 KB total, di-preload.
- JavaScript yang dimuat browser modern: 457 KB, 137 KB gzip, hampir seluruhnya runtime React dan
  router Next.js App Router. Pulau demo sendiri 11 KB (4,5 KB gzip). Satu chunk polyfill
  (110 KB, 38 KB gzip) berlabel `noModule`, sehingga hanya diunduh browser lama.
- Lighthouse tidak diukur.

## 5. Gambar tinjauan

`docs/screenshots/` (25 file, ±5,4 MB), dibuat ulang dengan `pnpm screenshots`, yang selalu
menjalankan `next build` lebih dulu. Set yang ada sekarang diambil dari kode final:

- Halaman penuh (JPEG): `360-light`, `390-light`, `390-dark`, `768-light`, `1440-light`,
  `1440-dark`, `no-js-390` (JavaScript mati), `text-200-390` (pengaturan ukuran teks browser 200%).
- Tampilan pertama (PNG): `390-light|dark-first-view`, `1440-light|dark-first-view`.
- Demo: `demo-idle`, `demo-shake`, `demo-done`, masing-masing juga versi `-reduced-motion`.
- Zoom browser 200% sungguhan pada jendela 1440×900 (tata letak 720 CSS px, DPR 2):
  `zoom-200-window-1440-1` sampai `-5`, diambil lewat DevTools per layar, karena screenshot
  Playwright tidak menggambar halaman yang di-zoom browser dengan benar (lihat §7).
- `faq-open-390.png`, `404-390.png`.

## 6. Verifikasi

Dijalankan pada 22 Oktober 2026 di container Linux: Node 22.22.0, pnpm 10.34.6, Chromium
141.0.7390.37 (Playwright 1.56.1, build 1194). Semua perintah dijalankan ulang setelah perubahan
kode terakhir.

| Perintah | Hasil |
|---|---|
| `pnpm typecheck` | Lulus, 0 error. |
| `pnpm lint` | Lulus, 0 error, 0 peringatan (`--max-warnings 0`). |
| `pnpm format:check` | Semua file sesuai Prettier. |
| `pnpm check:contrast` | 62 dari 62 pasangan warna (31 pasangan × 2 tema) memenuhi minimum WCAG 2.2: 4,5:1 untuk teks, 3:1 untuk batas kontrol dan cincin fokus. |
| `pnpm build` | Static export berhasil: `out/index.html` dan `out/404.html`. |
| `pnpm test:e2e` | 27 dari 27 lulus. Build dijalankan lebih dulu, dan server statis selalu dijalankan baru di port 4174. |
| `pnpm screenshots` | 9 dari 9 lulus; 25 gambar di `docs/screenshots/`. |
| `pnpm check` | Semua di atas (kecuali screenshot) sekaligus: lulus. |

**Isi tes e2e** (`tests/landing.spec.ts`, `tests/zoom.spec.ts`):

- **Muat halaman**: tidak ada error atau peringatan konsol, error halaman, permintaan yang gagal,
  atau permintaan ke pihak ketiga. Keempat bobot font termuat dari situs sendiri. H1 dan keenam H2
  hadir.
- **Metadata**: title, description, canonical, `og:locale` id_ID, kartu Twitter `summary`, favicon
  `data:,`, dan tanpa `og:image`.
- **Kejujuran**: status prototipe terlihat, dan keempat pratinjau berlabel "Pratinjau prototipe —
  data fiktif". Tidak ada form. Pemindaian kata terlarang (enkripsi, keamanan, terjamin, toko aplikasi,
  platform, testimoni, rating, pengguna, harga, gratis, daftar tunggu, unduh sekarang) mencakup
  teks halaman, jawaban FAQ yang tertutup, `aria-label`, `alt`, `title`, dan metadata.
- **Tautan**: setiap `href` adalah anchor di halaman ini, dan targetnya ada.
- **Keyboard dan fokus**:
  - Skip link menjadi pemberhentian pertama dan memindahkan fokus ke `main`.
  - CTA hero memindahkan fokus ke judul section tujuan, dan judul itu terlihat di layar.
  - Pada 14 pemberhentian Tab pertama, cincin fokus selalu 2px focus-blue, dan urutan sembilan
    pemberhentian pertama sesuai harapan (skip link, lockup, empat anchor, dua CTA, tombol demo).
- **Header**: di 390px hanya "Tanya jawab", di 768px keempat anchor; tautannya bekerja.
- **Target sentuh**: semua elemen yang bisa ditekan minimal 48×48px, di 360 dan 1440px.
- **Demo**:
  - Urutan langkah dicatat dari dalam halaman: kalimat status dan langkah ber-`aria-current` pada
    saat yang sama.
  - Demo tidak berulang sendiri. "Putar lagi" mulai dari langkah pertama, dan fokus tetap di tombol.
  - Tidak ada error konsol selama demo diputar.
  - Dengan gerak dikurangi, tidak ada animasi atau transform pada kedua HP, dan semua langkah tetap
    tercapai.
  - Kalau skripnya gagal dimuat, tombol tidak ditawarkan, tetapi ruangnya tetap ada.
- **FAQ**: bisa dibuka dan ditutup dengan Enter, Space, dan pointer.
- **Tema**: kanvas mengikuti tema sistem, dan `theme-color` sama dengan kanvas di kedua tema.
- **Overflow**: tidak ada overflow horizontal dan tidak ada elemen yang keluar layar, di 360, 390,
  768, dan 1440px.
- **Tanpa JavaScript**: isi, anchor, dan FAQ bekerja, dan tombol demo tidak tampil.
- **404**: status 404, judul, dan jalan kembali. Tautan header kembali ke section di halaman utama.
- **axe-core 4.14** (tag `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice`):
  0 pelanggaran di halaman utama dan 404, terang dan gelap.
- **Zoom dan ukuran teks 200% sungguhan**: empat kasus, dibahas di bawah.

**Cara zoom 200% diuji**:

- Tes membuka Chromium lengkap (`channel: 'chromium'`, headless baru) dengan profil yang berisi
  pengaturan browser sungguhan:
  - Zoom: `partition.default_zoom_level` = ln 2 / ln 1,2, yaitu pengaturan yang diubah oleh Ctrl/Cmd +.
  - Ukuran teks: `webkit.webprefs.default_font_size` 32, yaitu 200% dari 16.
- Setiap tes memastikan pengaturannya benar-benar berlaku, sehingga ini bukan sekadar viewport sempit
  yang diemulasikan:
  - Jendela 1440×900 menghasilkan `innerWidth` 720 dan `devicePixelRatio` 2.
  - Jendela 1280×800 menghasilkan `innerWidth` 640.
  - Pengaturan ukuran teks menghasilkan font root 32px.
- Di setiap kasus, tes memeriksa bahwa tidak ada overflow atau teks terpotong, H1 terlihat, CTA
  memindahkan fokus, dan demo sampai ke langkah 3.

**Pengukuran tambahan** (skrip sementara di luar repo, pada build final):

- Garis penunjuk hero menyentuh tepi layar HP, dengan celah 0px, di 720, 768, 1024, 1280, 1440, dan
  1920px.
- Setelah "Tentang prototipe" diklik, panel status mulai 24px dari tepi atas layar, di semua lebar
  dari 390 sampai 1920px.
- Teks status demo sejajar dengan tengah tombol. Keterangan di bawahnya tidak bergeser saat langkah
  berganti.
- Teks "Kembali ke atas" di footer berada pada garis dasar yang sama dengan tagline.
- **Uji negatif**: tes "skrip gagal dimuat" gagal (`Expected: hidden, Received: visible`) ketika
  aturan penyembunyian dihapus sementara, lalu lulus lagi setelah aturan itu dikembalikan.

**Tinjauan**:

- **Impeccable `critique`** (dua sub-agen: tinjauan desain dan detektor):
  - Snapshot `.impeccable/critique/2026-10-22T21-49-33Z__src-app-page-tsx.md`: 29/36 (Good),
    0 isu P0, 1 isu P1.
  - Kelima isu prioritas ditangani di pass `polish`, lalu diperiksa di browser:
    - komposisi hero di semua lebar (P1);
    - penafian yang berulang dikurangi;
    - dua titik bergerak di demo;
    - satu pita panggung tanpa panel bersarang di bawah 1024px;
    - footer yang benar-benar menutup halaman.
  - `impeccable detect` dijalankan ulang pada build final di 1280×800 dan 390×844. Satu-satunya
    temuan adalah `cream-palette`, yaitu kanvas merek #F7F5F0 dari token app. Temuan `nested-cards`
    dan teks yatim yang dilaporkan sebelum polish sudah hilang.
  - Dua pertanyaan terbuka dari kritik diserahkan ke pemilik:
    - apakah layar hero sebaiknya menjadi demo;
    - apakah "memudar setelah setahun" layak menjadi klimaks.
- **Superpowers `requesting-code-review`** (reviewer sub-agen baca-saja dengan konteks bersih):
  - Hasil: "siap dengan perbaikan", tanpa temuan kritis. Setiap temuan diperiksa terhadap kode,
    brief, dan spec sebelum ditindaklanjuti (`receiving-code-review`).
  - Temuan penting yang diperbaiki:
    - §6 dan §7 dokumen ini belum ada;
    - bukti lebih tua dari kode. Sekarang tes dan screenshot selalu build ulang dan tidak memakai
      server yang sudah berjalan, lalu semuanya dijalankan ulang.
  - Temuan minor yang diperbaiki:
    - tombol demo sebelum hidrasi;
    - cakupan pemindaian klaim;
    - `.npmrc` dipersempit;
    - tes untuk header HP, error selama demo, dan tautan dari 404;
    - penyimpangan dicatat di §2;
    - komentar yang keliru dan kelas CSS yang tidak terpakai;
    - `theme-color` diuji;
    - kualifikasi "Dalam rancangan Patepang" di FAQ "Apa itu tempel?";
    - komentar dan dokumen yang masih menyebut footer lama.
  - Tidak diubah:
    - navigasi HP, karena sudah sesuai spec §9;
    - kontras sorotan langkah, yang dicatat di §2;
    - hal yang menjadi keputusan pemilik (lihat §7).

## 7. Batas yang nyata

- **Belum di-commit, di-push, atau di-deploy**, sesuai brief. Container cloud ini sementara, jadi
  perubahan yang belum di-commit bisa hilang ketika sesi berakhir.
- **Hanya Chromium 141 yang diuji.** Safari/WebKit dan Firefox tidak tersedia di lingkungan ini. Yang
  perlu dicek di sana:
  - `@media (scripting: none)`;
  - `text-wrap: pretty` dan `balance` (progresif);
  - `align-items: last baseline` di footer (ada fallback `flex-end`);
  - pita panggung dengan `box-shadow` dan `clip-path`;
  - `<summary>` yang memakai flex;
  - `role="list"` di VoiceOver.
- **Tidak ada perangkat nyata dan tidak ada pembaca layar nyata** (VoiceOver, TalkBack, NVDA).
  axe-core hanya menangkap sebagian masalah aksesibilitas; hasil di atas bukan klaim kepatuhan WCAG.
- **Zoom dan screenshot**:
  - Zoom 200% memakai pengaturan zoom Chromium yang sesungguhnya, tetapi di jendela headless.
  - Screenshot halaman yang di-zoom diambil per layar lewat DevTools Protocol, karena screenshot
    Playwright salah menggambar halaman yang di-zoom browser.
  - Ukuran teks 200% di lebar HP memakai viewport emulasi, karena Chromium headless tidak membuka
    jendela yang lebih sempit dari 500px.
- **Lighthouse dan Core Web Vitals tidak diukur.** Angka di §4 adalah ukuran file, bukan pengukuran
  jaringan.
- **Tes demo bergantung pada waktu** (fase 0,9 s dan 1,9 s). Urutannya dicatat dari dalam halaman,
  bukan diambil sampelnya dari luar, dan batas tunggu tiap langkah 8 s. Di mesin yang sangat sibuk,
  tes ini tetap yang paling peka.
- **Domain belum tersambung**: `metadataBase` dan canonical menunjuk `https://patepang.com`,
  tetapi situs belum tayang di sana.
- **Dependensi**:
  - Pengecualian umur rilis untuk `next` di `.npmrc` harus dihapus setelah 29 Oktober 2026.
  - Lini ESLint 9 sudah ditandai tidak didukung di registry. ESLint hanya alat dev dan tidak ikut ke
    hasil build.
  - `next dev` 16.4 menulis `AGENTS.md` di root repo bila mendeteksi agen AI. File yang muncul saat
    uji `pnpm dev` di sesi ini sudah dihapus. Bila tidak diinginkan, `agentRules: false` di
    `next.config.ts` mematikannya; itu keputusan pemilik.
- **Keputusan pemilik**:
  - apakah `docs/screenshots/` (±5,4 MB) dan `.impeccable/critique/` ikut di-commit;
  - seberapa sering kata "prototipe" diulang;
  - dua pertanyaan terbuka dari kritik di §6.
- **Referensi app**: `patepang/app` dibaca dari clone baca-saja di `/home/user/app`, di luar repo
  ini. Tidak ada file app yang diubah, di-install, atau di-build.
