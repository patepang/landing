# Implementasi landing patepang.com

- **Tanggal:** 22 Oktober 2026 (versi pertama dan keputusan versi produksi), 23 Oktober 2026
  (versi produksi selesai dan diverifikasi).
- **Status:** halaman produk pra-rilis, diuji secara lokal. Belum di-deploy; tanpa hosting, DNS,
  analytics, atau pengumpulan data.
- **Arah:** versi pertama memakai arah A, Tur prototipe
  (`docs/superpowers/specs/2026-10-22-landing-design.md` §8; commit `35b4e47`). Pada 22 Oktober 2026
  pemilik meminta halaman tampil "seakan-akan produksi", dengan section header, hero, masalah,
  solusi, fitur, testimoni, tanya jawab, CTA, dan footer. Keputusan pemilik atas hal yang tidak bisa
  dikarang:
  - testimoni diganti skenario pemakaian;
  - CTA "Segera hadir" tanpa formulir;
  - footer berisi navigasi dan hak cipta.
- **Sumber kebenaran:** `PRODUCT.md`, `DESIGN.md`, `docs/product-understanding.md`, dan kode
  `patepang/app` @ `262202f` (dibaca saja, lewat clone terpisah di luar repo ini; tidak ada
  install, build, atau perubahan di app).

## 1. Yang dibangun

Satu route `/` berisi seluruh halaman, ditambah 404:

1. **Header**:
   - lockup bertumpuk (dua titik di atas wordmark, dari `features/system/Wordmark.tsx`) dan skip
     link "Langsung ke isi";
   - tautan Cara kerja, Fitur, Cerita, dan Tanya jawab, sebaris mulai 768px;
   - di bawah 768px tautannya ada di balik tombol "Menu", yaitu `<details>` asli. Pulau klien kecil
     `MobileMenu` menutupnya saat tautan dipilih atau Escape ditekan.
2. **Hero**:
   - H1 "Hanya orang yang pernah kamu temui." dan lede;
   - CTA "Lihat cara kerja" dan "Jelajahi fitur";
   - status "Segera hadir. Belum tersedia untuk diunduh.";
   - di bawahnya, panggung forest mist dengan layar Tempel untuk orang yang belum punya akun. Tiga
     catatan di tepinya: tanpa email atau nomor telepon, kode berganti setiap 30 detik, dan hanya
     saat bertemu langsung.
3. **Masalah**: "Setelah pamit, kabar sering berhenti begitu saja.", dengan tiga masalah. Tanpa
   klaim riset.
4. **Solusi / Cara kerja**:
   - "Sebelum pamit, tempel dulu." dengan tiga langkah dari `TapRitualPreview`;
   - ilustrasi bergerak yang berputar sendiri sekali saat panggungnya terlihat, lalu bisa diputar
     ulang dengan "Putar lagi".
5. **Fitur**:
   - "Setelah bertemu, hubungan tetap terjaga.";
   - Kabar (`DayCompleteCard`), Momen (`MomenCard`), serta Orang dan bertemu lagi
     (`ConnectionCard` dengan peringatan memudar, ditambah satu baris Rencana), di satu panggung;
   - ditutup daftar "Yang sengaja tidak ada di Patepang".
6. **Cerita** (pengganti testimoni):
   - "Dibuat untuk pertemuan seperti ini.", dengan tiga skenario: kenalan di workshop, teman lama di
     pernikahan, dan sepupu dari kota lain;
   - setiap skenario punya tiga ketukan, ditulis untuk pembaca ("kamu"), bukan kutipan orang;
   - penanda tiap ketukan adalah dua titik merek: berjauhan, mendekat, lalu bertemu.
7. **Tanya jawab**: enam `<details>`. Pertanyaan asal nama tidak dimuat karena belum terverifikasi.
8. **CTA**: pita forest mist "Patepang segera hadir." dengan dua anchor kembali ke Cara kerja dan
   Fitur. Tidak ada unduhan, daftar tunggu, atau formulir.
9. **Footer**: lockup, "Hanya orang yang pernah kamu temui.", tautan section, "© 2026 Patepang",
   dan "Kembali ke atas". Tidak ada tautan ke halaman yang belum ada.

Pratinjau app adalah terjemahan HTML/CSS/SVG dari komponen sumber dengan data contoh, tanpa
screenshot asli. Setiap pratinjau punya nama aksesibel (`role="img"` + `aria-label`).

## 2. Keputusan dan penyimpangan (dengan alasan)

| Hal | Keputusan | Alasan |
|---|---|---|
| Pembingkaian | Halaman produk pra-rilis: fitur ditulis sebagai produk Patepang. Label "Pratinjau prototipe — data fiktif" dan section Status prototipe dihapus. Status "Segera hadir" tampil di hero, FAQ "Kapan", dan CTA. | Keputusan pemilik 22 Oktober 2026, dicatat di `PRODUCT.md`. Halaman tetap tidak menyatakan aplikasi sudah tersedia. |
| Testimoni | Diganti tiga skenario pemakaian berpenanda "Tiga contoh dari keseharian", tanpa nama, foto, atau tanda kutip. Setiap ketukan adalah perilaku app: momen tercatat, foto di Kabar (composer app menerima foto), rencana dengan jawaban "Ikut", peringatan memudar. | Belum ada pengguna sungguhan; testimoni karangan akan menyesatkan pengunjung. Keputusan pemilik. |
| CTA | "Lihat cara kerja" dan "Jelajahi fitur" (anchor di halaman). | Belum ada unduhan, daftar tunggu, atau kontak; pemilik memilih tanpa formulir. |
| Footer | Lockup, tagline, tautan section, "© 2026 Patepang", "Kembali ke atas". | Belum ada kontak, akun media sosial, atau halaman legal. Keputusan pemilik. |
| Navigasi di HP | Tombol "Menu" berupa `<details>` asli; panelnya menutupi halaman di bawah header. Dengan JavaScript, menu tertutup saat tautan dipilih, Escape ditekan (fokus kembali ke tombol), fokus pindah keluar menu, atau halaman ditekan di luar menu. | Dengan empat tujuan, satu tautan tidak lagi cukup. `<details>` tetap bekerja tanpa JavaScript. |
| Gerak khas | Ilustrasi Cara kerja berputar sendiri sekali, saat 60% panggungnya terlihat, dan tidak pernah berulang. "Putar lagi" memutarnya kembali; tekanan sebelum autoplay membatalkan autoplay. Hero dan lockup diam. | Halaman produksi menjelaskan alur tanpa meminta klik; satu momen yang terjadi sekali tetap sesuai larangan loop dan gerak dekoratif. Durasinya ±2 detik, di bawah batas 5 detik WCAG 2.2.2. |
| Pengumuman langkah | Kalimat langkah tampil di layar (`aria-hidden`); region `role="status"` terpisah yang tak terlihat hanya diisi untuk putaran yang diminta lewat tombol. Putaran otomatis tidak diumumkan; langkah aktif tetap terbaca lewat `aria-current="step"`. | Tanpa ini, pembaca layar yang menggulir halaman (VoiceOver iOS, mode jelajah NVDA) disela tiga pengumuman yang tidak diminta (temuan code review). |
| Nama tombol | Label terlihat "Putar" atau "Putar lagi", ditambah teks tak terlihat " cara tempel". | Nama aksesibel jelas di luar konteks ("Putar cara tempel") dan tetap memuat label yang terlihat (WCAG 2.5.3). |
| Judul CTA | "Patepang segera hadir." memakai ukuran section di HP dan ukuran hero mulai 600px. | Dengan ukuran hero, kata "Patepang" lebih lebar dari layar 360px pada teks 200% (temuan code review; kini dites). |
| Token | `src/app/tokens.css` menerjemahkan `palette.ts`, `color.ts` (terang dan gelap), `typography.ts`, `spacing.ts`, `shape.ts`, `elevation.ts`, `motion.ts`, `layout.ts`, `opacity.ts` apa adanya. Komponen hanya membaca custom property. | Brief: token lengkap dari sumber, tanpa nilai mentah di komponen. |
| Ukuran teks | Skala app diubah ke `rem` (16px = 1rem); tracking diubah ke `em`. | Agar pengaturan ukuran teks pembaca tetap berlaku, setara `allowFontScaling` di app. |
| Header di teks besar | Baris header boleh membungkus: pada teks 200% di lebar HP, tombol "Menu" pindah ke bawah lockup. | Wordmark di app juga ikut skala teks. Tanpa pembungkusan, tombol keluar layar 59px (ditemukan oleh tes teks 200%). |
| Kata bertanda hubung | "benar-benar", "ke-11", "Kabar-mu", dan sejenisnya dijaga tetap satu baris (`KeepHyphenated` dan kelas `.nowrap`). | Browser boleh memutus baris setelah tanda hubung. Font merek tidak punya glyph U+2011 (diuji), jadi tanda hubung tak-terputus akan meminjam glyph font lain. |
| Perluasan web | H1 40/56/72px dan H2 28/32/40px per breakpoint, lebar halaman 1360px dengan grid 12 kolom, jarak antarsection 64/96/128px. Ditandai terpisah di `tokens.css`. | Skala app (display 36px) dirancang untuk HP; di 1440px hierarkinya hilang (spec §12). |
| Breakpoint | 600 dan 1024px dari kelas jendela app (gutter 20/32/40). Khusus landing: 720px (catatan hero di kanan HP), 768px (tautan header sebaris), 1024px (masalah tiga kolom, cara kerja dan fitur dua kolom, skenario berdampingan), 1280px (judul hero berdampingan dengan lede, catatan di kedua sisi HP). | Diturunkan dari isi, bukan dari daftar perangkat. |
| Hover | Memakai warna *pressed* yang sudah ada, hanya di `@media (hover: hover)`. | App native tidak punya hover. |
| Penanda langkah | Ukurannya `1rem + 8px` (24px di ukuran normal), tumbuh bersama teks. | Di teks 200% angka keluar dari lingkaran 24px yang tetap. |
| Inisial avatar | Ukuran px tetap. | Paritas dengan app (`allowFontScaling={false}`). |
| Istilah | "Bertemu dan **tempel** lagi" di kartu koneksi. | `ConnectionCard.tsx` masih memakai "tepang" (drift); spec §12 memilih "tempel" di semua tempat. |
| Ilustrasi tempel | Timeline dan geometri `TapRitualPreview` (0,9 s dan 1,9 s; mendekat 24px; goyang 5° per 70ms, tiga siklus); di layar lebar diperbesar 1,5×. Dua titik merek berjauhan, mendekat, bertemu, seperti `ShakeScreen.tsx`. | Setia pada sumber. |
| Gerak dikurangi | Tanpa translasi, rotasi, atau skala; tanda centang muncul dengan fade 120ms; langkah dan status tetap berganti. | DESIGN.md dan brief. |
| Tanpa JavaScript | Semua isi tampil; tombol "Putar" disembunyikan dengan `@media (scripting: none)`. Selama belum terhidrasi (skrip masih dimuat atau gagal dimuat), kontrolnya bertanda `data-hydrating` dan disembunyikan dengan `visibility: hidden`, ruangnya tetap disisakan. Menu HP tetap bisa dibuka. | Tidak ada tombol yang hanya tampak bisa diklik. |
| Sorotan langkah | Latar `surface-pressed` (1,08:1 terhadap kanvas terang, 1,43:1 gelap), ditambah penanda terisi berangka, `aria-current="step"`, dan kalimat status. | Warna bukan satu-satunya penanda. |
| Daftar | `role="list"` pada daftar tanpa penanda di luar `nav` (langkah, masalah, skenario). | Safari menghapus semantik daftar dari list tanpa penanda; peran eksplisit mempertahankannya. Belum diuji dengan VoiceOver (lihat §7). |
| Pola kode | Port `qrPath()` dari `QrCodeView.tsx`; modul identik dengan app (dicek untuk empat seed), path digabung per baris. | Setia pada sumber, path ±50% lebih pendek. |
| Data contoh | `src/content/fiction.ts`: satu cerita yang konsisten (Sari, pertama bertemu 3 Mar 2025, terakhir 341 hari lalu, memudar dalam 24 hari, rencana Sabtu, 7 November). String dibentuk mengikuti formatter app. Nama aksesibel setiap pratinjau diawali "Contoh". | Contoh tampilan app, tidak pernah ditampilkan sebagai bukti (tanpa angka pengguna, kutipan, atau testimoni). |
| Favicon dan gambar sosial | `<link rel="icon" href="data:,">`; tidak ada `og:image`. | Jangan mengarang aset atau simbol. |
| Font | Empat file woff2 Plus Jakarta Sans (latin) dari `@fontsource/plus-jakarta-sans@5.3.0`, di `src/app/fonts/` bersama `OFL.txt`, dimuat dengan `next/font/local` (fallback metrik dari Arial). | Di-host sendiri, tanpa permintaan ke Google. |
| Creative North Star | "Dua Titik Bertemu" hanya arahan kerja; tidak muncul di halaman. | Brief. |

## 3. Dependensi

Versi diperiksa di registry npm pada 22 Oktober 2026, dipin persis, dipasang dengan pnpm 10.34.6
(Corepack, hash diverifikasi), satu lockfile. Kebijakan dari app: umur rilis minimal 14 hari
(`minimum-release-age` di `.npmrc`), skrip lifecycle diblokir (`onlyBuiltDependencies: []`).
Versi produksi tidak menambah dependensi.

| Paket | Versi | Catatan |
|---|---|---|
| `next` | 16.4.2 (15 Okt 2026) | **Pengecualian keamanan.** `next build` 16.4.0 berhenti dengan peringatan keamanan. Database advisory npm membenarkan tiga advisory untuk `>=16.0.0 <=16.4.0`: GHSA-2464-fhr4-w9xw (kritis), GHSA-673q-mjm6-r5xr (kritis), GHSA-p3m5-59mp-jv5r (tinggi). Rilis perbaikan pertama (16.4.1) berumur kurang dari 14 hari, jadi hanya `next`, `@next/env`, dan biner `@next/swc-*` (keduanya dipin persis oleh `next`) yang dikecualikan (`minimum-release-age-exclude` di `.npmrc`). Uji negatif pada salinan sementara: tanpa pengecualian, `next` 16.4.2 ditolak; tanpa pola `@next/swc-*`, biner SWC 16.4.2 ditolak; dengan pengecualian, `prettier` 3.9.10 tetap ditolak. Hapus pengecualian setelah 29 Okt 2026. Perintah `next upgrade --agent=security` yang disarankan CLI tidak dijalankan. |
| `react`, `react-dom` | 19.3.0 | 19.3.1 belum 14 hari dan tidak punya advisory. |
| `@phosphor-icons/react` | 2.1.10 | Paket web; diimpor per ikon dari `dist/ssr/*` dan dirender di server. |
| `typescript` | 6.0.3 | `typescript-eslint` 8.71.1 membatasi `typescript <6.1.0`. |
| `eslint` | 9.39.5 | Plugin di dalam `eslint-config-next` hanya mendeklarasikan dukungan sampai ESLint 9. Lini ESLint 9 sudah ditandai tidak didukung di registry; ini alat dev saja. |
| `eslint-config-next` | 16.4.0 | Tidak punya advisory; tetap dalam aturan umur. |
| `prettier` | 3.9.9 | 3.9.10 belum 14 hari. |
| `@playwright/test` | 1.56.1 | Cocok dengan Chromium 141 (build 1194) yang terpasang di lingkungan ini. |
| `axe-core` | 4.14.0 | Audit otomatis pelengkap di tes; bukan bukti kepatuhan menyeluruh. |
| `@types/node`, `@types/react`, `@types/react-dom` | 22.20.5, 19.3.0, 19.3.0 | |

Dokumentasi API Next.js yang dipakai adalah salinan resmi yang ikut terpasang
(`node_modules/next/dist/docs`, versi yang sama), sebagai pengganti Context7.

## 4. Berat halaman (hasil export)

Diukur dari `out/` hasil build versi produksi:

- HTML `index.html`: 101 KB, 20 KB gzip.
- CSS: tiga file, 40 KB, 8 KB gzip. Font: empat woff2, 47 KB total, di-preload.
- JavaScript yang dimuat browser modern: 458 KB, 137 KB gzip, hampir seluruhnya runtime React dan
  router Next.js App Router. Kedua pulau klien (ilustrasi tempel dan menu HP) ada di satu chunk:
  12,6 KB, 4,9 KB gzip. Satu chunk polyfill (110 KB, 38 KB gzip) berlabel `noModule`, sehingga
  hanya diunduh browser lama.
- Lighthouse tidak diukur.

## 5. Gambar tinjauan

`docs/screenshots/` (28 file, ±5,9 MB), dibuat ulang dengan `pnpm screenshots`, yang selalu
menjalankan `next build` lebih dulu. Set yang ada sekarang diambil dari versi produksi:

- Halaman penuh (JPEG): `360-light`, `390-light`, `390-dark`, `768-light`, `1440-light`,
  `1440-dark`, `no-js-390` (JavaScript mati), `text-200-390` (pengaturan ukuran teks browser 200%).
- Tampilan pertama (PNG): `390-light|dark-first-view`, `1440-light|dark-first-view`.
- Ilustrasi Cara kerja: `demo-scan`, `demo-shake`, `demo-done`, masing-masing juga versi
  `-reduced-motion`.
- Zoom browser 200% sungguhan pada jendela 1440×900 (tata letak 720 CSS px, DPR 2):
  `zoom-200-window-1440-1` sampai `-7`, satu per section. Diambil lewat DevTools per layar, karena
  screenshot Playwright tidak menggambar halaman yang di-zoom browser dengan benar (lihat §7).
- `menu-open-390.png`, `faq-open-390.png`, `404-390.png`.

## 6. Verifikasi

Dijalankan pada 23 Oktober 2026 di container Linux: Node 22.22.0, pnpm 10.34.6, Chromium
141.0.7390.37 (Playwright 1.56.1, build 1194). Semua perintah dijalankan ulang setelah perubahan
kode terakhir.

| Perintah | Hasil |
|---|---|
| `pnpm typecheck` | Lulus, 0 error. |
| `pnpm lint` | Lulus, 0 error, 0 peringatan (`--max-warnings 0`). |
| `pnpm format:check` | Semua file sesuai Prettier. |
| `pnpm check:contrast` | 62 dari 62 pasangan warna (31 pasangan × 2 tema) memenuhi minimum WCAG 2.2, termasuk teks dan cincin fokus di panel menu serta tombol di pita CTA. |
| `pnpm build` | Static export berhasil: `out/index.html` dan `out/404.html`. |
| `pnpm test:e2e` | 29 dari 29 lulus. Build dijalankan lebih dulu, dan server statis selalu dijalankan baru di port 4174. |
| `pnpm screenshots` | 9 dari 9 lulus; 28 gambar di `docs/screenshots/`. |
| `pnpm check` | Semua di atas (kecuali screenshot) sekaligus: lulus. |

**Isi tes e2e** (`tests/landing.spec.ts`, `tests/zoom.spec.ts`):

- **Muat halaman**: tidak ada error atau peringatan konsol, error halaman, permintaan yang gagal,
  atau permintaan ke pihak ketiga. Keempat bobot font termuat dari situs sendiri. H1 dan keenam H2
  hadir.
- **Metadata**: title, description ("Segera hadir"), canonical, `og:locale` id_ID, kartu Twitter
  `summary`, favicon `data:,`, dan tanpa `og:image`.
- **Kejujuran**:
  - status "Segera hadir" terlihat, dan setiap pratinjau punya nama aksesibel;
  - tidak ada form, dan tidak ada `blockquote`, `q`, atau `cite` (skenario bukan testimoni);
  - pemindaian kata terlarang (enkripsi, keamanan, privasi, jamin, toko aplikasi, platform,
    termasuk "ios" sebagai kata utuh, testimoni, rating, pengguna, harga, gratis, daftar tunggu,
    unduh sekarang) mencakup teks halaman, jawaban FAQ yang tertutup, `aria-label`, `alt`, `title`,
    dan metadata.
- **Tautan**: setiap `href` adalah anchor di halaman ini, dan targetnya ada.
- **CTA**: CTA hero dan CTA penutup memindahkan fokus ke judul section tujuan, dan judul itu terlihat
  di layar.
- **Header dan menu**:
  - di 768px keempat tautan sebaris dan tombol "Menu" tidak ada;
  - di 390px tautannya tersembunyi sampai "Menu" dibuka;
  - memilih tautan menutup menu, membuka section, dan memindahkan fokus ke judulnya;
  - Enter membuka menu, Tab masuk ke tautan pertama, Escape menutup dan mengembalikan fokus ke
    tombol.
- **Keyboard dan fokus**:
  - skip link menjadi pemberhentian pertama dan memindahkan fokus ke `main`;
  - pada 14 pemberhentian Tab pertama, cincin fokus selalu 2px focus-blue;
  - urutan delapan pemberhentian pertama sesuai harapan (skip link, lockup, empat tautan, dua CTA),
    lalu tombol "Putar".
- **Target sentuh**: semua elemen yang terlihat dan bisa ditekan minimal 48×48px, di 360 (dengan menu
  terbuka, sehingga tautannya ikut diukur) dan 1440px.
- **Ilustrasi Cara kerja**:
  - urutan langkah dicatat dari dalam halaman: kalimat di layar dan langkah ber-`aria-current` pada
    saat yang sama, serta semua yang diumumkan region `role="status"`;
  - ilustrasi berputar sendiri sekali saat terlihat, tanpa satu pun pengumuman, tidak berulang, dan
    tidak mulai lagi saat pengunjung pergi lalu kembali;
  - dengan seperempat panggung terlihat, ilustrasi tetap diam;
  - "Putar lagi cara tempel" mulai dari langkah pertama, fokus tetap di tombol, dan ketiga langkah
    diumumkan;
  - tekanan sebelum autoplay memutarnya sekali, dan melihat panggung sesudahnya tidak memulainya lagi;
  - tidak ada error konsol selama diputar;
  - dengan gerak dikurangi, semua langkah tercapai, dan di akhir (tempat gerak penuh menggeser HP)
    kedua HP tidak dianimasikan dan tidak di-transform;
  - kalau skripnya gagal dimuat, tombol tidak ditawarkan, tetapi ruangnya tetap ada.
- **FAQ**: bisa dibuka dan ditutup dengan Enter, Space, dan pointer.
- **Tema**: kanvas mengikuti tema sistem, dan `theme-color` sama dengan kanvas di kedua tema.
- **Overflow**: tidak ada overflow horizontal dan tidak ada elemen yang keluar layar, di 360, 390,
  768, dan 1440px.
- **Tanpa JavaScript**: isi, anchor, dan FAQ bekerja; tombol "Putar" tidak tampil; menu HP terbuka
  dan tautannya bekerja.
- **404**: status 404, judul, dan jalan kembali. Tautan header kembali ke section di halaman utama.
- **axe-core 4.14** (tag `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice`):
  0 pelanggaran di halaman utama dan 404, terang dan gelap.
- **Zoom dan ukuran teks 200% sungguhan**: lima kasus, dibahas di bawah. Pada lebar di bawah 768 CSS
  px, menu juga dibuka: tautan pertamanya harus utuh di jendela, dan tautan terakhir harus utuh
  setelah digulir.

**Cara zoom 200% diuji**:

- Tes membuka Chromium lengkap (`channel: 'chromium'`, headless baru) dengan profil yang berisi
  pengaturan browser sungguhan:
  - Zoom: `partition.default_zoom_level` = ln 2 / ln 1,2, yaitu pengaturan yang diubah oleh Ctrl/Cmd +.
  - Ukuran teks: `webkit.webprefs.default_font_size` 32, yaitu 200% dari 16.
- Setiap tes memastikan pengaturannya benar-benar berlaku, sehingga ini bukan sekadar viewport sempit
  yang diemulasikan:
  - Jendela 1440×900 menghasilkan `innerWidth` 720 dan `devicePixelRatio` 2.
  - Jendela 1280×800 menghasilkan `innerWidth` 640.
  - Pengaturan ukuran teks menghasilkan font root 32px (jendela 1440×900, serta viewport 390×844
    dan 360×740).
- Di setiap kasus, tes memeriksa:
  - tidak ada overflow atau teks terpotong;
  - H1 terlihat;
  - CTA memindahkan fokus;
  - ilustrasi Cara kerja sampai ke langkah 3.

**Pengukuran dan uji tambahan** (skrip sementara di luar repo, pada build versi produksi):

- **Teks 200% di 390px**: tes sempat gagal karena tombol "Menu" keluar layar 59px. Setelah baris
  header boleh membungkus, overflow-nya 0 dan tombol berada di bawah lockup.
- **Uji negatif menu**: tanpa penutupan saat tautan dipilih, tes menu gagal karena menu tetap
  terbuka. Setelah kodenya dikembalikan, tes lulus lagi.
- **Uji negatif judul CTA**: dengan ukuran hero di HP, kasus teks 200% di 360px gagal (overflow 2px).
  Dengan ukuran section, kasus itu lulus.
- **Uji negatif dari versi pertama**: tes "skrip gagal dimuat" gagal ketika aturan penyembunyian
  dihapus sementara.
- **Font merek**: tidak punya glyph U+2011. Lebarnya berbeda tergantung font cadangan yang dipakai.
- **Tinjauan visual**: 390, 768, dan 1440px, terang dan gelap, menu terbuka, teks 200%, zoom 200%.
  Yang diperbaiki dari tinjauan itu:
  - kata ulang yang terpotong di tanda hubung;
  - penanda skenario yang belum rata di layar lebar;
  - kolom masalah yang terlalu sempit di 768px.
- **`impeccable detect`** pada build versi produksi (1280×800 dan 390×844): satu-satunya temuan
  adalah `cream-palette`, yaitu kanvas merek #F7F5F0 dari token app.

**Code review versi produksi** (`requesting-code-review`, sub-agen baca-saja dengan konteks bersih,
atas `35b4e47..d4f04c8`):

- Tidak ada temuan kritis. Setiap temuan dicek dulu terhadap kode, lalu ditindaklanjuti
  (`receiving-code-review`).
- Temuan penting yang diperbaiki:
  - judul CTA keluar layar di 360px dengan teks 200%; kini ada kasus 360px di tes teks 200%;
  - putaran otomatis membuat pembaca layar bicara tanpa diminta;
  - tes gerak dikurangi rawan gagal karena mengambil sampel fase yang hanya ±1 detik.
- Temuan minor yang diperbaiki:
  - tekanan sebelum autoplay tidak membatalkan autoplay;
  - nama tombol "Putar" ambigu di luar konteks;
  - nama aksesibel pratinjau tidak menyebut contoh;
  - celah tes: kata terlarang, ukuran tautan menu, menu di jendela zoom, dan ambang 60%;
  - komentar dan sisa kode yang usang, termasuk tujuan landing di `PRODUCT.md`;
  - tautan header yang boleh membungkus;
  - `figure` tanpa keterangan;
  - menu yang tetap terbuka saat fokus atau klik pindah keluar;
  - "Kabar-mu" menjadi "Kabarmu" seperti di app.
- Tidak diubah, karena sudah ada sebelum versi ini: setelah tautan menu dipakai di halaman 404
  (navigasi `next/link`), fokus tertinggal di `<body>`, bukan di judul section (lihat §7).

**Tinjauan versi pertama** (masih berlaku untuk bagian yang tidak berubah):

- **Kritik Impeccable**: 29/36, dengan kelima isu prioritas sudah ditangani di pass polish. Snapshot
  tersimpan di `.impeccable/critique/2026-10-22T21-49-33Z__src-app-page-tsx.md`.
- **Code review oleh sub-agen**: tanpa temuan kritis. Temuan yang valid sudah diperbaiki.
- Dua pertanyaan terbuka dari kritik untuk pemilik:
  - apakah layar hero sebaiknya menjadi demo;
  - apakah "memudar setelah setahun" layak menjadi klimaks.

## 7. Batas yang nyata

- **Belum di-deploy.** Domain belum tersambung: `metadataBase` dan canonical menunjuk
  `https://patepang.com`, tetapi situs belum tayang di sana.
- **Isi yang belum ada di dunia nyata tetap tidak dikarang**:
  - testimoni, angka pengguna, dan rating;
  - kontak, media sosial, dan halaman legal;
  - tautan toko aplikasi, platform rilis, harga, dan tanggal rilis.

  Bila tersedia, isinya harus berasal dari pemilik.
- **Hanya Chromium 141 yang diuji.** Safari/WebKit dan Firefox tidak tersedia di lingkungan ini. Yang
  perlu dicek di sana:
  - `@media (scripting: none)`;
  - `text-wrap: pretty` dan `balance` (progresif);
  - `<details>` sebagai menu dan konten tertutupnya;
  - pita panggung dengan `box-shadow` dan `clip-path`;
  - `<summary>` yang memakai flex;
  - `role="list"` di VoiceOver.
- **Tidak ada perangkat nyata dan tidak ada pembaca layar nyata** (VoiceOver, TalkBack, NVDA).
  axe-core hanya menangkap sebagian masalah aksesibilitas; hasil di atas bukan klaim kepatuhan WCAG.
- **Zoom dan screenshot**:
  - Zoom 200% memakai pengaturan zoom Chromium yang sesungguhnya, tetapi di jendela headless.
  - Screenshot halaman yang di-zoom diambil per layar lewat DevTools Protocol.
  - Ukuran teks 200% di lebar HP memakai viewport emulasi, karena Chromium headless tidak membuka
    jendela yang lebih sempit dari 500px.
- **Lighthouse dan Core Web Vitals tidak diukur.** Angka di §4 adalah ukuran file.
- **Fokus setelah navigasi dari 404**: tautan header di halaman 404 memakai `next/link`. Setelah
  berpindah ke `/#section`, halaman menggulir ke section itu, tetapi fokus keyboard tetap di
  `<body>`.
- **Tes ilustrasi bergantung pada waktu** (fase 0,9 s dan 1,9 s) dan pada IntersectionObserver.
  Urutannya dicatat dari dalam halaman, dan batas tunggu tiap langkah 8 s; di mesin yang sangat
  sibuk, tes ini tetap yang paling peka.
- **Dependensi**:
  - Pengecualian umur rilis untuk `next` di `.npmrc` harus dihapus setelah 29 Oktober 2026.
  - `next dev` 16.4 menulis `AGENTS.md` di root repo bila mendeteksi agen AI. Bila tidak
    diinginkan, `agentRules: false` di `next.config.ts` mematikannya; itu keputusan pemilik.
- **Keputusan pemilik yang masih terbuka**: dua pertanyaan dari kritik di §6.
- **Referensi app**: `patepang/app` dibaca dari clone baca-saja di `/home/user/app`, di luar repo
  ini. Tidak ada file app yang diubah, di-install, atau di-build.
