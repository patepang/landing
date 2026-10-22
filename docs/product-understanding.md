# Pemahaman produk Patepang

Dokumen kerja untuk landing `patepang.com`. Isinya hanya hal yang bisa dibuktikan dari repo
sumber. Yang tidak bisa dibuktikan ditandai sebagai pertanyaan terbuka.

## Sumber yang diperiksa

| Hal           | Keterangan                                                                                                                                                                                                                                                                                                                                                                |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repo          | `patepang/app` (privat, hanya dibaca)                                                                                                                                                                                                                                                                                                                                     |
| Commit        | `262202fa7866d268ba1f74258d47e7b19515df89`. Ini HEAD `main` di remote saat diperiksa (`git ls-remote origin`, 22 Oktober 2026), dan clone lokal sudah berada di commit itu. Tidak ada checkout, fetch, install, build, atau perubahan file di `app`.                                                                                                                       |
| Cara membaca  | Kode dan dokumen dibaca langsung. **Prototipe tidak dijalankan**, karena brief melarang install dan build di `app`. "Terlihat di prototipe" di bawah berarti tertulis di kode layar dan dites menurut laporan repo, bukan diamati di layar sungguhan pada sesi ini.                                                                                                         |
| Dibaca        | `README.md`, `DESIGN_SYSTEM.md`, `app.json`, `package.json`, `docs/source/SCREENS-v1.md`, `docs/prompts/PATEPANG-115-SCREENS-CLAUDE-PROMPT.md` (§1–3, §9), `docs/adr/0001` dan `0002`, `docs/APP_IMPLEMENTATION_REPORT.md`, `docs/DUMMY_DATA_AND_SCENARIOS.md`, seluruh `src/design-system/tokens/`, serta pola dan layar yang dirujuk di bawah.                         |
| Tidak tersedia | `whitepaper-v3.pdf` dan spesifikasi klien yang dirujuk dokumen repo (§3–4, §7, §9.1, §12, §21, §23) tidak ada di repo. Isinya hanya diketahui lewat kutipan di repo dan **tidak dipakai sebagai dasar klaim**. Folder `docs/design/` yang dirujuk `SCREENS-v1.md` juga tidak ada.                                                                                           |
| Tidak dibaca  | `.env` dan kredensial (tidak ada di repo yang tracked). Tidak ada data pengguna sungguhan di repo.                                                                                                                                                                                                                                                                        |

Path di bawah relatif terhadap root `patepang/app` pada commit di atas.

## 1. Patepang itu apa

**Satu kalimat dari produk sendiri:** "Hanya orang yang pernah kamu temui."
(`src/features/onboarding/WelcomeScreen.tsx:39`, `docs/source/SCREENS-v1.md:27`)

- **Apa.** Aplikasi HP (iOS dan Android lewat React Native/Expo, dengan web sebagai alat pratinjau)
  untuk menjaga hubungan dengan orang yang benar-benar pernah ditemui langsung. Brief internal
  menyebutnya "produk manusia ... untuk orang yang pernah bertemu secara langsung. Bukan aplikasi
  dating, pencari teman asing, jejaring publik, feed algoritmik, atau pengganti pertemuan nyata"
  (`docs/prompts/PATEPANG-115-SCREENS-CLAUDE-PROMPT.md:53`).
- **Untuk siapa.** Orang yang ingin tetap dekat dengan orang yang mereka temui di dunia nyata,
  misalnya teman, kenalan di acara, atau keluarga. Repo tidak memuat riset pengguna atau segmen.
  Siapa persisnya target awal masih **pertanyaan terbuka**.
- **Masalah yang diatasi (tersirat dari aturan produk, tidak tertulis sebagai pernyataan
  masalah).** Hubungan dari pertemuan nyata mudah hilang. Di sisi lain, jejaring yang ada mendorong
  koneksi dengan orang asing, angka pengikut, dan feed tanpa akhir. Patepang menolak mekanisme itu:
  tidak ada pencarian orang, pengikut, like publik, peringkat, atau feed tanpa akhir
  (`docs/adr/0002-arah-visual-dan-gerak.md:11-13`).
- **Peran pertemuan langsung.** Pertemuan langsung adalah satu-satunya jalan masuk dan sekaligus
  bahan bakar hubungannya:
  1. **Koneksi hanya lahir dari tempel**, saat dua orang berhadapan: satu HP menampilkan kode, HP
     lain memindainya, lalu keduanya digoyangkan bersama selama dua detik
     (`src/features/settings/HelpAboutScreen.tsx:20-29`, `src/domain/limits.ts` `shakeMs`).
     Koneksi tidak bisa lahir dari pencarian.
  2. **Akun pun lahir saat tempel pertama.** Tidak ada email atau nomor telepon yang diminta, dan
     tidak ada hitung mundur (`src/features/onboarding/states.ts:15`, `src/features/tempel/TempelScreen.tsx:132`).
  3. **Bertemu lagi menyegarkan hubungan.** Koneksi memudar setahun setelah pertemuan terakhir,
     dengan peringatan di bulan ke-11. "Bertemu dan tempel lagi menyegarkannya"
     (`src/features/orang/OrangScreen.tsx:179-180`, `src/domain/limits.ts:73`). Tempel ulang
     mencatat momen baru (`docs/source/SCREENS-v1.md:46`). Rancangan penyimpanan juga memberi bonus
     untuk setiap orang yang ditemui kedua kalinya (`src/domain/limits.ts:125`).
  4. **Bagi yang belum punya koneksi**, ada _titik lahir_: "pertemuan terbuka tempat orang yang
     belum punya koneksi melakukan tempel pertamanya" (`src/features/events/BirthPointsScreen.tsx:51`).
     Jadwalnya di prototipe adalah data contoh.

Nama: repo menjelaskan "Tepang (bahasa Sunda: bertemu)"
(`src/design-system/patterns/TapInvitationCard.tsx:47`). Asal-usul nama "Patepang" sendiri tidak
ditulis eksplisit di repo, jadi itu **pertanyaan terbuka**.

## 2. Alur utama di prototipe

Empat tab utama: **Tempel, Kabar, Orang, Momen**. Percakapan dan Pengaturan dibuka dari header
(`docs/APP_IMPLEMENTATION_REPORT.md:39`). Semua 115 ID di `docs/source/SCREENS-v1.md` punya layar
(100 `implemented-dummy`, 15 `simulated-native`).

| Alur                       | Yang terjadi                                                                                                                                                                                                                                                                   | Rujukan                                                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| Mulai                      | Splash dengan dua titik bertemu sekali, lalu Selamat datang: satu kalimat dan satu tombol "Mulai", tanpa login. Berikutnya nama panggilan (≤30 grafem), PIN, biometrik opsional, wilayah rumah, dan pertanyaan teman pertama.                                                   | `features/system/SplashScreen.tsx`, `features/onboarding/*`, SCREENS 1.1–1.8                                                  |
| Belum lahir                | Tab Tempel menyatakan "Akunmu lahir saat tempel pertama", tanpa batas waktu, dengan tautan ke jadwal titik lahir.                                                                                                                                                              | `features/tempel/TempelScreen.tsx:124-151`, SCREENS 1.9                                                                       |
| Tempel                     | "sebelum pamit, tempel dulu". Kode besar berganti tiap 30 detik, lalu Pindai, lalu Goyang bersama 2 detik. Hasilnya: "Koneksi kalian dan momen pertama tercatat di kedua HP." Foto dan nama tempat bersifat opsional. Ada juga alasan gagal yang jelas, tempel bantu, tempel tertunda saat offline (menunggu saksi ≤7 hari), dan tempel ulang. | `features/tempel/*`, `design-system/patterns/TapRitualPreview.tsx:36-56`, SCREENS 2.1–2.7                                     |
| Kabar                      | Kabar hari ini dari koneksi, urut waktu, dibaca atau belum, dan berakhir dengan "Selesai untuk hari ini … Kabar berikutnya datang besok; tidak ada yang perlu dikejar." Penerima bisa semua koneksi, satu lingkaran, atau satu orang: "Tidak ada yang publik." Reaksi dan balasan bersifat pribadi. | `features/kabar/KabarScreen.tsx`, `design-system/patterns/DayCompleteCard.tsx:37`, `features/kabar/AudienceSheet.tsx:107`, SCREENS 3.x |
| Orang                      | Profil pertemuan berisi pertemuan pertama, berapa kali bertemu, momen, catatan pribadi, kartu kontak, dan lingkaran: "riwayat di antara kalian berdua … bukan profil, jumlah pengikut, atau feed". Ada rencana dengan RSVP, ajak ketemu, daftar pribadi "Ingin ketemu lagi", status 24 jam, buku pertemuan ("Siapa yang kamu temui hari ini?"), dan koneksi memudar. | `design-system/patterns/ConnectionCard.tsx:51-53`, `features/orang/*`, `features/plans/*`, SCREENS 4.x                         |
| Momen                      | Lini masa pertemuan (foto, cerita, tempat yang ditulis sendiri, orang yang hadir), kalender, dan arsip tahunan.                                                                                                                                                                | `features/momen/*`, SCREENS 5.x                                                                                               |
| Lainnya                    | Chat, grup (hanya dari koneksi), panggilan, ruang acara (masuk lewat poster **tidak** membuat koneksi pribadi), titik lahir, serta pengaturan keamanan dan pemulihan. Semua bagian native atau server di sini disimulasikan.                                                    | SCREENS 6.x–8.x, `docs/APP_IMPLEMENTATION_REPORT.md:46-71`                                                                     |

## 3. Bahasa, nada, dan identitas visual yang dipertahankan

**Bahasa dan nada** (`docs/adr/0002-arah-visual-dan-gerak.md:78-87`):

- Bahasa Indonesia, kalimat biasa (sentence case), kata kerja jelas. `app.json` memakai `lang: "id"`.
- Istilah produk: **Tempel, Kabar, Orang, Momen, lingkaran, titik lahir**. Huruf kecil di tengah
  kalimat ("tempel dulu"), kapital bila menjadi nama tab.
- Tenang dan tidak memburu: "tidak ada yang perlu dikejar", "Tidak ada batas waktu". Tidak ada
  urgensi palsu, angka belum dibaca yang memancing, atau hitungan pengikut.
- Pesan menjelaskan apa yang terjadi tanpa minta maaf. Hal yang disimulasikan diakui sebagai simulasi.
- **Drift istilah:** "tempel" dipakai 351 kali di `src` (layar produk, sesuai `SCREENS-v1.md`),
  sedangkan "tepang" muncul 19 kali, terutama di pola fondasi dan showcase lama (mis.
  `ConnectionCard.tsx:118` "tepang lagi", `TapInvitationCard.tsx`). Landing mengikuti
  `SCREENS-v1.md`: **tempel**. Arti "tepang" hanya dipakai untuk menjelaskan nama, bila disetujui.

**Identitas visual** (nilai dari `src/design-system/tokens/*.ts`, alasan di ADR 0002):

| Unsur            | Nilai                                                                                                                                                                                                                                                                         |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Logo             | Wordmark huruf kecil `patepang` (Plus Jakarta Sans Bold, warna `brand`). _Lockup_ bertumpuk: dua titik di atas wordmark (`features/system/Wordmark.tsx:15-31`). Simbol "dua busur bersentuhan" **belum dibuat**. Ikon aplikasi, splash final, dan favicon juga **belum ada** (`DESIGN_SYSTEM.md:425`). |
| Motif            | **Dua titik**, satu hijau hutan (`brand.solid`) dan satu apricot (`accent.decor` `#E7956C`), bergerak saling mendekat lalu bertemu sekali dan tidak pernah berulang. Motif ini dekoratif dan disembunyikan dari pembaca layar (`src/shared/TwoDots.tsx:42-46`).                  |
| Warna terang     | Kanvas ivory `#F7F5F0`, permukaan `#FFFEFB`, tinta `#22201C`, teks sekunder `#57524A`, merek `#1F5F4F`, merek lembut `#E2EEE9`, garis `#E3DFD6`.                                                                                                                                |
| Warna gelap      | Kanvas `#141513`, permukaan `#1C1E1B`, teks `#F2EFE8`, merek `#7FCDB4` (teks di atasnya `#0C2620`).                                                                                                                                                                             |
| Aksen            | Apricot/bata (`#A0461E` teks, `#FBE8DB` latar) **hanya untuk kenangan** (momen, "setahun lalu"). Krem `#F4F1EA` dan terakota `#D97757` sengaja dihindari karena sudah menjadi ciri desain generik (ADR 0002:22-24).                                                              |
| Fokus            | Biru `#245C8F` / `#8DBDEB`, cincin 2 px dengan offset 2 px, agar tidak tertukar dengan status terpilih.                                                                                                                                                                         |
| Huruf            | Hanya Plus Jakarta Sans 400/500/600/700, dengan sebelas langkah dari `display` 36/44 Bold −0,72 sampai `caption` 12/16. Tinggi baris kelipatan 4. Tanpa label huruf kapital semua dan tanpa monospace.                                                                            |
| Bentuk           | Grid 4 titik. Radius: kontrol 4–12, kartu 20, banner 16, dialog/sheet 28. **Semua yang ditekan berbentuk kapsul**, menggemakan motif dua busur. Pemisahan lewat tona dan garis tipis lebih dulu; bayangan sangat lembut hanya untuk yang mengambang.                             |
| Ikon             | Hanya Phosphor: `regular` untuk UI, `fill` untuk aktif, `bold` untuk 16 px, `duotone` untuk ilustrasi status. Tanpa `thin`/`light`, tanpa emoji sebagai ikon, tanpa ikon buatan sendiri.                                                                                          |
| Gerak            | Tekan 120 ms (skala 0,97), pilihan 160, masuk 220 (naik 8 px + fade), keluar 180, pindah 240, overlay 300/240. Kurva bawaan `cubic-bezier(0.23, 1, 0.32, 1)`, tanpa ease-in, tanpa loop. Saat gerak dikurangi: tanpa translasi, skala, atau rotasi; transisi menjadi fade 120 ms. |
| Aksesibilitas    | Target sentuh minimal 48 px. Semua pasangan warna yang dipakai ≥ WCAG AA dan dikunci tes (`docs/CONTRAST.md`). Status tidak boleh hanya mengandalkan warna.                                                                                                                       |

## 4. Klaim yang aman dipublikasikan

Tiga kelas: **(A) fakta** yang benar sekarang; **(B) rancangan**, yaitu aturan yang tertulis di
spesifikasi dan terlihat di prototipe, yang boleh dijelaskan sebagai cara Patepang dirancang tetapi
bukan sebagai layanan yang sudah berjalan; **(C) terbuka**, yang tidak boleh diklaim sampai pemilik
memastikan.

**A. Fakta**

- Patepang sedang dibangun. Yang ada sekarang adalah prototipe aplikasi versi `0.1.0` dengan data
  fiktif lokal: tanpa backend, akun sungguhan, pesan, panggilan, pembayaran, atau kriptografi
  (`README.md:7-12`, `docs/DUMMY_DATA_AND_SCENARIOS.md:93-95`).
- Repo tidak memuat tautan toko aplikasi, tanggal rilis, harga yang berlaku, alamat kontak
  sungguhan, kebijakan privasi, atau entitas hukum. Semua alamat di aplikasi memakai
  `patepang.example`, yang memang domain contoh.

**B. Rancangan** (tulis dengan "dirancang", "di Patepang nanti", atau bentuk netral yang tidak
menjanjikan ketersediaan)

- Hanya orang yang pernah kamu temui. Koneksi lahir dari tempel, bukan dari pencarian.
- Tempel: saat berhadapan sebelum berpisah, pindai kode lalu goyangkan kedua HP bersama dua detik.
  Momen pertama tercatat untuk kalian berdua.
- Akun lahir saat tempel pertama, tanpa email atau nomor telepon.
- Kabar dari orang yang pernah kamu temui, dan halamannya berakhir: "Selesai untuk hari ini".
- Tidak ada pencarian orang, pengikut, like publik, peringkat, atau feed tanpa akhir.
- Kamu memilih siapa yang melihat kabar: semua koneksi, satu lingkaran, atau satu orang.
- Koneksi memudar setahun setelah pertemuan terakhir. Bertemu dan tempel lagi menyegarkannya.
- Momen, rencana bertemu, daftar "Ingin ketemu lagi", dan buku pertemuan.
- Titik lahir: pertemuan terbuka untuk tempel pertama. Belum ada jadwal sungguhan.

**C. Terbuka, jangan diklaim**

- Tanggal peluncuran, platform yang tersedia, negara atau kota awal, dan harga. Langganan memang
  ada di spesifikasi, tetapi harganya contoh (`src/data/fixtures/prices.ts`).
- Klaim keamanan, privasi, enkripsi, penyimpanan di perangkat, pemulihan akun, atau log
  transparansi. Repo menyebut rencana inti Rust/libsignal, tetapi tidak ada implementasi. Kata
  "privacy-first" di brief internal adalah prinsip, bukan jaminan yang boleh diumumkan.
- Kanal kontak, akun media sosial, dan proses daftar atau daftar tunggu.
- Asal-usul nama "Patepang" di luar arti "tepang" yang tertulis di repo.
- Simbol logo final.

## 5. Yang tidak boleh disimpulkan dari data dummy

- **Angka dan orang.** "21 koneksi", "35 orang", Kirana, Raka, Sekar, dan lainnya adalah pemeran
  fiktif skenario "Akun aktif" (`docs/DUMMY_DATA_AND_SCENARIOS.md:41-64`). Itu bukan jumlah
  pengguna, bukan pengguna tipikal, dan bukan testimoni.
- **Tempat dan acara.** Bandung, Yogyakarta, Surabaya, Makassar, "Festival Literasi Bandung", "Lari
  Pagi Bandung", dan jadwal titik lahir adalah data contoh. Itu bukan bukti kehadiran, kemitraan, atau
  acara sungguhan.
- **Harga dan pasar.** Harga contoh dalam IDR, SGD, dan MYR bukan penawaran dan bukan keputusan pasar.
- **Fungsi.** Keberadaan layar bukan bukti fitur berfungsi. Kamera/QR, goyang, NFC, biometrik,
  panggilan, lokasi, toko, laporan, ekspor, pemulihan, dan log transparansi disimulasikan
  (`docs/APP_IMPLEMENTATION_REPORT.md:113-117`).
- **Keamanan.** PIN demo `123456`, 12 kata contoh, dan sidik jari `CONTOH …` sengaja palsu.
- **Kualitas.** Label `verified-automated` berarti tes Jest dan web lulus, **bukan** bukti runtime
  iOS/Android, pembaca layar, atau FPS (`docs/APP_IMPLEMENTATION_REPORT.md:31-32`).
- **Visual.** Tangkapan layar prototipe akan berisi nama dan data fiktif. Bila dipakai, harus
  diberi label "prototipe" dan tidak boleh tampak seperti bukti pengguna nyata.

## 6. Tujuan landing dan CTA

**Tujuan.** Dalam satu kunjungan singkat, orang baru bisa menjawab:

1. Patepang itu apa? Hanya untuk orang yang pernah kamu temui.
2. Bagaimana koneksinya terbentuk? Lewat tempel, saat bertemu, sebelum berpisah.
3. Apa yang terjadi setelah bertemu? Kabar yang punya akhir, momen, rencana bertemu lagi, dan
   koneksi yang memudar bila tidak pernah bertemu lagi.
4. Apa yang sengaja tidak ada? Pencarian orang, pengikut, like publik, dan feed tanpa akhir.
5. Bisakah saya memakainya sekarang? Belum. Patepang masih dibangun.

**CTA yang didukung keadaan produk sekarang:**

- **Utama:** navigasi di halaman ke penjelasan tempel ("Lihat cara tempel"). Tautan ini jujur,
  berfungsi, dan tidak mengumpulkan data.
- **Pendukung:** tautan ke pertanyaan umum dan pernyataan status ("Patepang masih dibangun. Belum
  ada aplikasi yang bisa diunduh.").
- **Tidak boleh:** tombol unduh, daftar akun, daftar tunggu, formulir, atau kontak `patepang.example`.
- **Perlu keputusan pemilik:** apakah ada kanal kontak sungguhan (mis. alamat surel yang dipantau)
  yang boleh ditampilkan. Tanpa itu, landing tidak menampilkan kontak.
