---
target: landing page src/app/page.tsx
total_score: 29
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 1
target_identity: "file:/home/user/landing/src/app/page.tsx"
target_fingerprint: "sha256:9573daa8d0a8549638a2ccd33cb65b40bf9819784aa14847bfc71879cec19cda"
target_path: /home/user/landing/src/app/page.tsx
timestamp: 2026-10-22T21-49-33Z
slug: src-app-page-tsx
---
Method: dual-agent (A: design-review sub-agent · B: detector sub-agent)

## Design Health Score (Persuade)
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 4 | Prototype status always visible; demo narrates steps (role=status). Final status wraps and shifts layout 20px. |
| 2 | Match system / real world | 3 | "tab" and "satu lingkaran" unexplained; "Orang" named, never labelled. |
| 3 | User control and freedom | 3 | Anchors + replay fine; below 768px header keeps one link. |
| 4 | Consistency and standards | 3 | Hero splits at 1280 while other sections split at 1024; preview label above phone in hero, below elsewhere. |
| 5 | Error prevention | 3 | Header icons and plan chevron in previews look tappable; realistic QR. |
| 6 | Recognition rather than recall | 3 | Mobile hero notes precede the screen they describe. |
| 7 | Flexibility and efficiency | n/a | One-visit persuasion page. |
| 8 | Aesthetic and minimalist | 3 | Calm, but disclaimers repeat. |
| 9 | Error recovery | 4 | 404 explains and offers the way back; no-JS hides the demo button. |
| 10 | Help and documentation | 3 | Native FAQ, mostly repeats the page. |
| Total | | 29/36 | Good |

## Design Specificity Verdict
LLM: specific in content (verbatim app copy, faithful component previews, one consistent fictional story, page ends like Kabar, dots apart → met), generic in composition (repeated H2 cols 1–5 / content 7–12 skeleton; demo glyphs could explain AirDrop).
Deterministic: CLI regex scan 0 findings (undercount). Rendered scan exit 2: straggler ×1–2 (dd in "Yang sengaja tidak ada", SetelahBertemu.tsx:109), nested-cards ×4 at 390 (plinth wrapping preview cards), cream-palette (body canvas #F7F5F0). False positives: cream-palette is the documented brand canvas (DESIGN.md ivory-canvas); monotonous-spacing came from the detector's own overlay. Overlay ran headless; not user-visible.

## Priority Issues
1. [P1] Annotated hero only works at ≥1280: notes before phone <600; three-up note row 600–1279; leader lines 58px short at 1440 (justify-items:center); phone shadow spills past the stage. Fix: phone first then notes below stage <720; notes right of phone with leaders 720–1279; justify-self on wrappers; overflow-y:clip on stage. (/impeccable adapt)
2. [P2] Honesty turned into apology: "prototipe" ×14, "fiktif" ×7. Fix: cut footer status sentence, "Nama, tanggal… juga fiktif", FAQ simulation sentence; keep hero status, labels, status section, FAQ "Kapan". (/impeccable clarify)
3. [P2] Signature motion generic; brand motif never moves. App ShakeScreen.tsx:162-163 moves TwoDots apart→near→meet. Fix: drive TwoDots lg in the demo by phase; hairline on discs for dark mode. (/impeccable animate)
4. [P2] Repeated skeleton; nested panels on narrow screens (detector nested-cards agrees). Fix: one continuous full-bleed mist band for the exhibits <1024; Story stacked single column. (/impeccable layout)
5. [P3] The page does not get to end: seven links after "Selesai", footer ends on a hedge. Fix: footer = lockup + tagline + "Kembali ke atas". (/impeccable distill)

## Persona Red Flags
Jordan (first-timer, 390): reads three notes before any screen; "lingkaran" unexplained; tab Orang not tied to exhibit 3.
Casey (mobile): demo status wraps and shifts the caption; #prototipe anchor lands with the panel's top edge cropped.
Riley (stress tester): realistic QR (note says it cannot be scanned); fiction.codeCountdown unused.

## Minor Observations
dd lacks text-wrap: pretty; dark current-step tint 1.04:1; note "Akun lahir…" repeats the card title beside it; at 1280 "Tentang prototipe" wraps and sits 24px in.

## Questions to Consider
What if the hero phone itself became the demo? If "fades after a year" is the idea no other app has, why is it the third stop with equal weight?
