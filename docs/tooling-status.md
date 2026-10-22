# Status alat

Status sembilan alat wajib untuk landing `patepang.com`. Diperiksa pada 22 Oktober 2026 di sesi
cloud Claude Code (CLI 2.1.308).

- **Aktif** = bisa dipanggil sebagai alat bawaan Claude Code di sesi ini (tool Skill, MCP, atau LSP).
- **Uji fungsi** = alat yang sama benar-benar dijalankan dan hasilnya diperiksa.

## Ringkasan

| # | Alat | Terpasang | Aktif di sesi ini | Uji fungsi | Jalur yang dipakai |
|---|---|---|---|---|---|
| 1 | Frontend Design | Ya: plugin lokal + salinan skill di repo | Tidak | `SKILL.md` dibaca dan diterapkan | Salinan resmi di `.claude/skills/frontend-design` |
| 2 | Impeccable | Ya: skill proyek | **Ya**, dipanggil lewat tool Skill | `context`, `concept-seed` | Skill proyek |
| 3 | Superpowers | Ya: plugin lokal + salinan 15 skill di repo | Tidak | `brainstorming` dan builder check dijalankan | Salinan resmi di `.claude/skills/<skill>` |
| 4 | Context7 | Ya: plugin lokal | Tidak | Sebagian: `resolve-library-id` berhasil, `query-docs` ditolak kuota | Menunggu API key |
| 5 | Playwright | Ya: plugin lokal | Tidak | Ya, server MCP lewat klien stdio | `npx @playwright/mcp@0.0.83` + skrip klien |
| 6 | TypeScript LSP | Ya: plugin lokal | Tidak | Ya, language server lewat klien LSP | `npx typescript-language-server@5.3.0` + skrip klien |
| 7 | vercel-react-best-practices | Ya: skill proyek | **Ya**, terdaftar sebagai skill | Isi diverifikasi identik dengan sumber | Skill proyek; dipakai saat implementasi |
| 8 | web-design-guidelines | Ya: skill proyek | **Ya**, terdaftar sebagai skill | Isi diverifikasi; sumber aturan terjangkau | Skill proyek; dipakai saat tinjauan UI |
| 9 | webapp-testing | Ya: skill proyek | **Ya**, dipanggil lewat tool Skill | Ya, server, klik, console, dan screenshot | Skill proyek + `.venv` lokal |

## Hambatan lingkungan dan keputusan pemilik

Sesi ini berjalan di lingkungan cloud yang di-hosting Anthropic dengan dua repo (`app` dan
`landing`). Di lingkungan ini:

1. **Plugin marketplace tidak dimuat.** Prosesnya berjalan dengan `SKIP_PLUGIN_MARKETPLACE=true`.
   Menurut dokumentasi resmi, sesi cloud tidak memasang plugin yang diaktifkan settings repo, dan
   tidak membaca `~/.claude/settings.json` maupun `.claude/settings.local.json`
   ([Settings in cloud sessions](https://code.claude.com/docs/en/settings#settings-in-cloud-sessions),
   [What carries over](https://code.claude.com/docs/en/cloud-environments#what-carries-over-from-your-setup)).
   Buktinya ada dua. Pertama, `claude plugin list` menandai kelima plugin lokal `enabled`, sedangkan
   `github@synced` ditandai `loaded`. Kedua, memanggil `frontend-design:frontend-design` menghasilkan
   `Unknown skill`.
2. **`.mcp.json` dan hook repo hanya dimuat di sesi dengan satu repo.**
3. **Skill di `.claude/skills/` repo dimuat saat sesi dimulai, dan sebagian juga di tengah sesi.** Empat skill yang
   dipasang lewat CLI (Impeccable, dua skill Vercel, webapp-testing) muncul sebagai skill aktif
   beberapa menit setelah dipasang. Salinan Frontend Design dan Superpowers yang ditambahkan
   belakangan belum dikenali di sesi ini (`Unknown skill: frontend-design`). Di sesi ini keduanya
   dipakai dengan membaca `SKILL.md` langsung. Setelah di-push, keduanya dimuat di sesi berikutnya.

Pemilik memilih jalur **"semua lewat repo"** (22 Oktober 2026): salin skill resmi beserta lisensinya
ke repo landing; pakai Playwright MCP dan language server lewat skrip yang sudah terbukti; Context7
menunggu API key; dan tidak ada perubahan di akun claude.ai.

## Rincian per alat

| Alat | Sumber dan versi aktual | Cara pasang dan scope | Catatan |
|---|---|---|---|
| Frontend Design | `anthropics/claude-plugins-official` @ `af59ee3`, Apache-2.0 | Plugin: `claude plugin install frontend-design@claude-plugins-official --scope local`. Salinan: `.claude/skills/frontend-design/` (identik dengan cache plugin dan commit sumber; `SOURCE.md`) | Satu skill, tanpa hook atau MCP |
| Impeccable | CLI `impeccable@4.7.0` (npm, 19 Okt 2026), engine 0.1.16, skill 4.7.0, Apache-2.0 | `npx impeccable@4.7.0 install --providers=claude --scope=project --no-hooks -y` menghasilkan `.claude/skills/impeccable/` dan 4 agent di `.claude/agents/` | Hook tidak dipasang (tidak terbaca di sesi cloud multi-repo). Detektor dijalankan manual: `scripts/impeccable detect --json`. |
| Superpowers | `obra/superpowers` @ `bb92a77` = v7.0.0, versi yang dipin katalog resmi, MIT | Plugin: `claude plugin install superpowers@claude-plugins-official --scope local`. Salinan: 15 folder skill di `.claude/skills/`, masing-masing dengan `LICENSE` dan `SOURCE.md` | Hook `SessionStart` (menyuntikkan `using-superpowers`) tidak ikut. *Visual companion* tidak dipakai. |
| Context7 | `claude-plugins-official` @ `af59ee3`. MCP remote `mcp.context7.com` (server 4.4.3) | `claude plugin install context7@claude-plugins-official --scope local` | URL plugin (`?client=claude-code-plugin`) meminta OAuth (`401`). Endpoint anonim `/mcp` kehabisan kuota bulanan. Dokumentasi Next.js terindeks sampai v16.2.9. |
| Playwright | `claude-plugins-official` @ `af59ee3`. Plugin menjalankan `npx @playwright/mcp@latest` = 0.0.83 (Playwright **1.64.0-alpha**) | `claude plugin install playwright@claude-plugins-official --scope local` | Di container ini perlu `--headless --isolated --browser chromium --executable-path /opt/pw-browsers/chromium-1194/chrome-linux/chrome`. `browser_click` versi ini memakai `target`, bukan `ref`. |
| TypeScript LSP | `claude-plugins-official`, plugin 1.0.0 | `claude plugin install typescript-lsp@claude-plugins-official --scope local` | Butuh `typescript-language-server` di `PATH`. Instalasi global tidak dilakukan (perlu persetujuan). Versi 6.x butuh Node ≥ 22.22.2; container memakai 22.22.0, jadi uji memakai 5.3.0. |
| vercel-react-best-practices | `vercel-labs/agent-skills` @ `063bee9`, skill 1.0.0, MIT | `npx skills@1.7.4 add vercel-labs/agent-skills --skill vercel-react-best-practices -a claude-code --copy -y` | Identik dengan sumber, kecuali `metadata.json` yang tidak disalin CLI. Tercatat di `skills-lock.json`. |
| web-design-guidelines | `vercel-labs/agent-skills` @ `063bee9`, skill 1.0.0 | Sama dengan baris di atas | Saat review, aturan diambil dari `raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md` (HTTP 200) |
| webapp-testing | `anthropics/skills` @ `dbd4588`, Apache-2.0 | `npx skills@1.7.4 add anthropics/skills --skill webapp-testing -a claude-code --copy -y` (folder lengkap) | Python Playwright 1.56.0 di `.venv/` (lokal, diabaikan git), cocok dengan Chromium 141.0.7390.37 bawaan image |

Bundle `example-skills` dari `anthropics/skills` sengaja tidak dipasang, karena membawa
`frontend-design` (duplikat) dan sepuluh skill lain yang tidak dibutuhkan.

## Jaringan, telemetry, dan data keluar

| Alat | Yang keluar dari container | Pengaturan |
|---|---|---|
| Impeccable | `concept-seed` menghubungi API `impeccable.style` (`source: api`) dengan kunci acak, scope, mode, dan revisi katalog. Menurut README, nama proyek, file, kode, dan `PRODUCT.md` tidak dikirim. Ping telemetry dilewati otomatis. | `.impeccable/config.json` `"telemetry": false`, dan `DO_NOT_TRACK=1` + `IMPECCABLE_NO_TELEMETRY=1` di setiap perintah |
| CLI `skills` | Telemetry instalasi dan *security audit* | Dimatikan dengan `DISABLE_TELEMETRY=1` dan `DO_NOT_TRACK=1` |
| Context7 | Hanya pertanyaan dokumentasi pustaka yang generik. Tidak ada isi repo privat. | Tanpa API key |
| Superpowers | Tidak ada | — |
| Playwright MCP, webapp-testing | Hanya ke `127.0.0.1` dan `file://`. Sketsa memuat Plus Jakarta Sans dari Google Fonts. | — |

## File yang ditulis

- **Repo landing:**
  - `.gitignore`
  - `.claude/skills/` (20 folder skill)
  - `.claude/agents/impeccable-*.md` (4 file)
  - `skills-lock.json`
  - `.impeccable/config.json`, `.impeccable/design.json`, `.impeccable/mocks/decision/*.html`
  - Diabaikan git: `.claude/settings.local.json`, `.venv/`, dan engine Impeccable
    (`.claude/skills/impeccable/scripts/bin/`, 23 MB). Launcher mengunduh versi yang dipin dan
    memverifikasi checksum bila folder engine tidak ada.
- **Container, di luar repo (cache, bukan settings):** `~/.claude/plugins/` (marketplace dan cache
  plugin) dan cache `npx`.
- **Tidak diubah:** `~/.claude/settings.json` (tidak ada), *global git excludes*, paket npm/pip global,
  akun claude.ai, dan repo `patepang/app`.

## Yang masih dibutuhkan

| Alat | Kebutuhan |
|---|---|
| Context7 | Pemilik membuat API key gratis di context7.com, lalu menyimpannya sebagai secret lingkungan cloud dengan nama `CONTEXT7_API_KEY` (menu environment di judul sesi → Edit). Key mulai terbaca di sesi baru. Sampai saat itu, keputusan versi memakai catatan rilis resmi (GitHub) dan dicatat sebagai pengganti sementara. |
| Frontend Design, Superpowers | Mulai sesi baru setelah push untuk memastikan salinannya termuat sebagai skill |
| TypeScript LSP | Tool LSP bawaan Claude Code hanya tersedia di sesi lokal. Di sini dipakai `tsc --noEmit` ditambah klien language server. |

## Bukti pemakaian per fase

| Fase | Alat | Bukti |
|---|---|---|
| Verifikasi alat | webapp-testing | `with_server.py` + skrip: klik, 2 log console, screenshot 390px diperiksa |
| Verifikasi alat | Playwright MCP | `navigate`, `snapshot`, `click`, `screenshot` 1440px (diperiksa), `console_messages` |
| Verifikasi alat | TS language server | Diagnostik `TS2322`, go-to-definition, find-references |
| Verifikasi alat | Context7 | `resolve-library-id` → `/vercel/next.js`; `query-docs` ditolak kuota |
| Perencanaan | Impeccable (tool Skill) | `context` → `init` (`PRODUCT.md`) → `document` (`DESIGN.md` + `.impeccable/design.json`) → `shape`: `concept-seed --scope surface --mode persuade` (`seed:1890326d8fad4b69`, kocokan 7/1/5) |
| Perencanaan | webapp-testing (tool Skill) | Render tiga sketsa 1440×900 dengan cek font, console, dan overflow. Gambar diperiksa. Tiga cacat ditemukan dan diperbaiki: label terpotong dan skala waktu tidak proporsional di sketsa B; kelas `monthNone` dan makna warna yang tidak konsisten di sketsa C. |
| Perencanaan | Frontend Design (`SKILL.md`) | Dua lintasan: rencana token dan wireframe, lalu tinjauan terhadap default (`docs/superpowers/specs/2026-10-22-landing-design.md` §15). Label bergaya template dihapus. |
| Perencanaan | Superpowers (`brainstorming`) | Desain tertulis di `docs/superpowers/specs/2026-10-22-landing-design.md`. *Builder check* oleh subagent baru sedang berjalan saat commit ini; hasilnya akan dipilah ke §16 dokumen desain. HARD-GATE dipatuhi (belum ada kode produk). |
| Perencanaan | Pengganti Context7 | Catatan rilis resmi React 19.3.1 dan Next.js 16.4.2 (GitHub) untuk keputusan versi |

Baris berikutnya ditambahkan seiring pekerjaan berjalan.
