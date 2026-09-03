# 📌 Project Handoff — JavaScript Essentials (6-Part Series)

> **Purpose:** Everything a fresh session (human or AI) needs to continue this repo confidently — rules, conventions, architecture, verification steps, and what's done vs. left for later. Read this first.

---

## 1. Project Overview

A complete, beginner-friendly, **ADHD/autistic-friendly** study guide that teaches JavaScript → MERN apps → production. Everything ships in a **consistent three-edition format** per part.

| Part | Title | Sections | Covers |
|---|---|---|---|
| 1 | Core | 16 | variables, control flow, functions/closures, arrays, strings, objects, pitfalls |
| 2 | Async/OOP | 9 | promises, async/await, error handling, classes, modules |
| 3 | MERN Bridge | 10 | Map/Set, generators, regex, DOM/events, fetch, Node core |
| 4 | MERN Foundations | 17 | Express, Mongoose/MongoDB, React, fetch, CORS, Node, TypeScript + 2 mini-projects |
| 5 | Production | 16 | bcrypt hashing, JWT, protected routes, React token flow, deployment (Render/Vercel/Atlas), testing, React Router |
| 6 | Hardening | 16 | Vitest/Jest, Express/RTL tests, coverage/TDD, GitHub Actions CI/CD, secrets, monitoring, perf, refresh/rate-limit/RBAC, scale |

**Status:** ✅ Complete through Part 6. Prefer leaving working-tree changes for the coordinator unless asked to commit.

**Repo:** https://github.com/Rohithr1008/javascript-essentials

### Automation Tester Path

| | |
|---|---|
| Umbrella | [`../automation-tester-path/README.md`](../automation-tester-path/README.md) · [`START_HERE`](../automation-tester-path/START_HERE.md) |
| Role | Fundamentals (Parts 1–5) → after Playwright, Part 6 hardening |
| Previous kit | — (path start) |
| Next kit | [`../playwright-essentials/`](../playwright-essentials/README.md) |
| After Part 6 | [`../api-data-essentials/`](../api-data-essentials/README.md) → [`../perf-basics/`](../perf-basics/README.md) |
| E2E depth | Playwright Essentials (not Part 6) |

---

## 2. File Naming Convention (learn this — everything follows it)

For each Part N:
- `Javascript_essentials_partN_with_examples.md` — **plain** Markdown (no HTML; print/PDF friendly)
- `Javascript_essentials_partN_interactive.md` — **interactive** Markdown (`<style>`, quiz-boxes, flashcards, sandboxes, mood checks, embedded `<script>`)
- `Javascript_essentials_partN_study_app.html` — **standalone** study app (self-contained, runs offline)
- `PARTN_PLAN.md` — planning doc
- `JAVASCRIPT_ESSENTIALS_PARTN_CONTEXT.md` — context/transfer doc (per-part)
- `index.html` — landing page with a card per part × edition
- `README.md` — top-level doc with a section per part

---

## 3. Per-Edition Structure

### Plain markdown (`with_examples.md`)
```markdown
# JavaScript Essentials — Part N (title)
> Study guide note (plain edition)...
### 🗺 Your path — where Part N fits
## Table of Contents
## N. <section heading>   ← one per section
> 🚩 **Why it matters:** ...
...code blocks, tables, real-world anchors...
### 🧪 Quiz
## Practice / Challenges / Answer key
<!--PN-END-->                    ← sentinel at EOF
```

### Interactive markdown
- A `<style>` block near the top defining: `.tip`, `.warn`, `.chall`, `.why`, `.quiz-box`, `.flashcard`, `.mood`, `.sandbox`, `.layer-legend`, dark-mode `@media`.
- A **part-navigation bar** linking Parts 1→N.
- `quiz-box` = click-to-reveal `<details>`; `flashcard` = flip; `mood` = radio self-check.
- A final `<script>` block with demo functions (named like `p5iDemoX`, `p5iExpand`, `p5iFocus`).
- Sentinel `<!--PNI-END-->` at EOF.

### Study app (`.html`)
- Single `<script>` pair (never more). Self-contained (inline CSS + JS, no external deps).
- Feature set reused across ALL parts (see §5) — keep it consistent.
- Sentinel `<!--PNH-END-->` at EOF (Parts 2–6; Part 1 historically has none — don't add one there).
- **Skip link**: `<a class="skip-link" href="#progressBar">Skip to content</a>` right after `<body>`.

---

## 4. The Section Canon (same order every part)
1. Foundation / intro concept that shows "why it matters"
2. ...through...
N. Common pitfalls
N+1. Practice exercises
N+2. Auto-graded challenges (pure functions)
N+3. Answer key
Then a 🎉 Congratulations closing.

Every section opens with a **`> 🚩 Why it matters:`** line (the ADHD/context anchor).

---

## 5. Study-App Feature Set (apply to every app — consistency is an accessibility feature)

- 🌙 **Theme toggle** (`force-dark`/`force-light`) with `applySysDark()` on load
- 🔤 **Font zoom** (A−/A/A+): classes `font-sm/font-md/font-lg`
- 📊 **Progress bar** + "Mark Complete" via `toggleSection(n)` (localStorage keys `pN-sec-N`) — Part 1 uses the same `p1-sec-N` keys (legacy `js-progress` is migrated once on load)
- 🧭 **Learning Path** recommendations (`updateLearningPathN`)
- 🃏 **SRS flashcards** (new→learning→mastered) + shuffle; keys `pN-sr`, `pN-sr-shuffle`
- ⚡ **XP / streak / confetti / toast**; keys `pN-boost`
- 🧠 **Focus sprint timer**, 🎲 **Surprise** jump button
- 🧘 **Focus Mode** (`focusModeN(btn)`): hides Progress/Boost/LearningPath/SRS panels, closes all details, adds `body.focus-mode`
- 📖/📕 **Collapse / Expand-all** (`collapseAllN`)
- 🝀 **Accessibility**: `aria-pressed`, `role="status"`, `@media (prefers-reduced-motion)`, `@media print`, skip link
- Per-part **live in-page mock** (learners interact with zero install):
  - Part 4: mock MERN server (`mockRun`) + animated layer diagram (`layerLit4`, `mockAutoplay`) + 2 mini-app demos
  - Part 5: mock auth server (`authDemo`) + JWT viewer (3 chips)
  - Part 6: mock CI runner (`ciDemo`) + coverage sim (`covDemo`) + logger/rate-limit/RBAC (`secDemo`)
- **Auto-graded challenges**: `runTest(n)` builds a `new Function` harness combining user code + `PN_TESTS[n]`, plus XP/confetti on pass.

**Naming rule:** every global in app N is suffixed with its part (`fontZoom3`, `boostSurprise4`, `focusMode5`, etc.) to keep the parts isolated.
---

## 5b. Interactive-Features Inventory (per part — the "what's actually in each file")

> This is the menu of interactive things a learner can *do* in each edition. Counts are from a real audit of each study app. Use it to know what a given part offers and to keep additions consistent.

### 🧩 Legend
- **App** = standalone study app (`study_app.html`) · **MD** = interactive markdown
- `quiz-box` = click-to-reveal question boxes · `flashcard` = click-to-flip cards
- `sandbox/playground/tester` = live editable runnable demos · `mock` = in-page simulated server
- `predict` = "guess the output" cards · `badge` = difficulty/time/mood tags · `hint` = collapsible hints
- SRS = spaced-repetition flashcards (engine, in every app)

### Part 1 — Core (richest variety)
- **26 quiz-boxes**, **30 flashcard slots** (+ symbol drills), **16 predict-the-output** cards
- **Difficulty & time badges** (105 badge references) + 💡 hints (40) on exercises/challenges
- **"Spot-the-bug" final boss quiz** · **Mood checks** · **7-day study plan** · **completion certificate**
- *(app)* 🌙 dark mode · 📊 progress (localStorage) · 🧭 scrollspy-style nav · 📋 copy buttons

### Part 2 — Async/OOP
- **18 quiz-boxes**, **8 flashcards**, **7 predict-the-output** cards
- **Promise Simulator** (3 refs) + **code sandbox** (10) — the signature interactive demo
- Hints (5), challenges (13), badges (19), copy buttons

### Part 3 — MERN Bridge
- **15 quiz-boxes**, **5 flashcards**, **Map/Set Playground**, **RegExp tester** (`rx-`)
- DOM demo + fetch demo (live buttons) · hints (5) · challenges (14) · badges (18)

### Part 4 — MERN Foundations (mock-first)
- **24 quiz-boxes** · **SRS flashcards engine** (srCards data, `startSRReview`) — NOTE: no inline `<div class="flashcard">` markup & no `<div class="hint">` per challenge (differs from Parts 1–3)
- **Live mock MERN server** (`mockRun`, 15 refs) + **animated layer diagram** + "Watch the full loop" autoplay
- **Two mini-app demos**: Notes app (POST/GET/DELETE) and Product Store with Reviews
- Layer-colour legend · 6 auto-graded challenges

### Part 5 — Production (mock auth)
- **22 quiz-boxes** · **SRS flashcards engine** — again no inline `<div class="flashcard">` / `<div class="hint">` (matches Part 4 pattern)
- **Live mock auth server** (`authDemo`): Register / Login / Get /api/me / Logout / Watch-the-flow
- **JWT viewer** (3 colour chips: header·payload·signature) · **hash demo**
- Auth/deploy jargon glossary (4) · 5 auto-graded challenges

### Part 6 — Hardening (mock CI / coverage / RBAC)
- **Quiz-boxes** with `quiz-correct` + `quiz-wrong` · **SRS flashcards engine** · predict cards · Spot-the-Bug · 7-day plan · certificate · scrollspy
- **Live mock CI/CD runner** (`ciDemo`): Push / fail-lint / reset — lint→test→build→deploy
- **Coverage simulator** (`covDemo`) · **Logger / rate-limit / RBAC panel** (`secDemo`)
- Hardening jargon glossary · 5 auto-graded challenges (`testAssert`, `ciStepsOrder`, `statusFromLint`, `tokenRefresh`, `rbacAllowed`)
- Links out to **Playwright Essentials** for deep browser E2E (not re-taught here)

### 📋 Interaction consistency (now at parity)
- **Every app has all of these,** verified in the parity pass: predict-the-output cards, difficulty/time badges, per-challenge hints, mood checks, 7-day study plan, Spot-the-Bug final quiz, completion certificate (unlocks at 100%), 🧭 scrollspy nav — plus the shared engine (quiz-boxes, SRS flashcards, progress + Mark Complete, learning path, Focus Mode, collapse/expand, theme, font zoom, XP/streak/confetti, skip link).
- Parts 1–6 previously differed in *which* of these each had; the parity pass brought Parts 4–6 level with Parts 1–3 (and gave Parts 2–3 the certificate/scrollspy they lacked).
- **Content is part-specific:** predict cards, 7-day plans, Spot-the-Bug questions, badges and hints are tailored to each part's material (e.g. Part 4 → MERN; Part 5 → auth/deploy; Part 6 → CI/testing/security). When you add/change one, keep each part's version distinct and re-run the inventory audit.
- **App-primary practice (Parts 2–6):** live mocks, SRS engine, and the completion certificate stay primarily in the **study apps**. Interactive Markdown for Parts 2–6 now also includes **Spot-the-Bug** + dedicated **predict-the-output** decks (static details/summary — same Q&A substance as the apps). Plain Markdown keeps quizzes and why-it-matters without full app parity.

---
---

## 6. Key Implementation Rules / Gotchas

1. **Never store plain-text passwords** — always `bcrypt.hash`. `findByIdAndUpdate(id, upd, { new: true })` returns the NEW doc; omitting `{new}` returns the old.
2. **JWT must be exactly 3 dot-separated parts.** (Fixed a bug where a signature containing a `.` in an email made it 4 parts.) Use base64url (`.replace(/[+/=]/g,...)`) and a dot-free signature.
3. **Challenges = pure functions only** so they're auto-gradable via `new Function`. Canonical solutions live in the answer-key section AND are validated.
4. **Challenge test data must be self-consistent** (earlier a freq test expected `the=1` on a string with "the" twice — validate expected counts).
5. **`new Function(harness)`** (NOT `new Function("return " + harness)` which gives `return return`) — a bug hit in Part 2 & 3 and fixed.
6. **Every JS snippet in the guides is Node-validated** — output comments must match real `node` output. Run anything you add.
7. Keep **huge apps as a single `<script>` block**; edit incrementally in small chunks (files are large — P1 ~290 KB).

---

## 7. Verification Checklist (run before any "done" claim)

```powershell
# Preferred smoke (also what CI runs):
npm ci
node verify-study-apps.js
node scripts/inline-shell.js --check
npx playwright install chromium   # once per machine / in CI
npx playwright test

# After editing shared/study-shell.css or shared/study-shell.js:
node scripts/inline-shell.js

# 1. JS compiles (extract the app's single script)
$c  = Get-Content "Javascript_essentials_partN_study_app.html" -Raw
$m  = [regex]::Match($c,'(?s)<script>(.*?)</script>')
Set-Content _v.js $m.Groups[1].Value -NoNewline
node --check _v.js

# 2. Interactive md scripts compile (extract every <script> block and node --check them)

# 3. Structural: 1 script pair, DOCTYPE, </body>, </html>, sentinel present, no stray temp files

# 4. Functional (DOM-mock): load each app's real JS; check toggleSection, markButtons,
#    updateProgress, SRS start, focusMode toggle, part mock, and challenge solutions

# 5. Clean up: Remove-Item any `_*.cjs` / `_*.ps1` temp test files BEFORE committing
```

**Known environment quirk:** PowerShell one-liners with `[` / `{` / `|` can break parsing. When in doubt write a small `.ps1`/`.cjs` file and run it, then delete it. Also watch for a recurring **path typo** `C:\Users\rohit\.clinete\...` (a stray folder was created once and removed) — always double-check the path.

---

## 8. What's Done vs. Later

### ✅ Done
- Parts 1–6, three editions each (Part 6: hardening — unit/CI/CD/security/scale)
- Part 4 + 5 polish (animated mock demos, glossaries, onboarding, skip links)
- Part 6 mocks: CI runner, coverage simulator, logger/rate-limit/RBAC panel; Playwright Essentials linked for E2E
- Full smoke test: `node verify-study-apps.js` (Parts 1–6); shared-shell `--check`; challenge solutions for Part 6 validated
- **Feature parity (2026):** the Part 1 feature set (predict-the-output cards, difficulty/time badges, per-challenge hints, mood checks, 7-day study plan, Spot-the-Bug quiz, completion certificate, scrollspy nav) is now in **Parts 2–6 study apps** too — no two parts share identical interactivity; each is content-tailored.
- **Part 4/5/6 interactive content tailored** to MERN (Part 4), Auth/Deploy (Part 5), and CI/testing/security (Part 6).
- **Audit fixes (2026-09-03):**
  - P0: Part 4 pitfalls markup restored; Part 3 certificate UTF-8 fixed; Hub + Parts 1–5 nav on all apps + interactive MD; premature `</body>` removed (P4/P5).
  - P1/P2: Part 1 storage migrated to `p1-*` (+ legacy migration); progress-gated Part 1 certificate; aria-labels on P3–P5 toolbar; duplicate Part 2 `.predict` CSS removed; `index.html` local MD links + series progress; Part 1 sandbox uses `new Function` (no `eval`); `verify-study-apps.js` for syntax/structure smoke checks (`node verify-study-apps.js`).
- **Deferred follow-ups landed (2026-09-03):**
  - **Shared shell CSS:** edit `shared/study-shell.css`, then `node scripts/inline-shell.js` before commit. Markers `SHARED-SHELL-CSS:START/END` in Parts 1–6; `node scripts/inline-shell.js --check` fails if HTML drifts. Apps stay self-contained (offline single-file).
  - **Shared shell JS:** edit `shared/study-shell.js` (theme / font zoom / focus / collapse / a11y labels). Markers `SHARED-SHELL-JS:START/END`; same inliner writes both CSS + JS.
  - **Why-right/wrong quizzes:** Parts 2–6 study apps use `quiz-wrong` + `quiz-correct` explanations (interactive `.md` unchanged).
  - **CI:** `.github/workflows/verify.yml` runs structural verify, shared-shell `--check`, then Playwright (axe a11y + keyboard/mobile E2E). Axe `color-contrast` is gated (chrome fixed in `study-shell.css`; decorative badges/chips/layer pills/code excluded in `tests/a11y.spec.js`).
  - Verify also asserts shared-shell markers and Parts 2–6 `quiz-wrong` presence.
  - **Content-audit P0/P1 (2026-09-03):** Part 5 localStorage honesty + toyHash (not reverse-as-hash); Part 1 join typo; README edition differences + app-primary practice note; Part 4 series next→Part 5; Part 4 functional `setNotes((prev)=>…)`; Part 5 first-ship / real-prod next tip.

### 🔜 Natural next steps (not started — only continue if asked)
- **Deploy-to-cloud walkthrough** with a real (free) account, or a "deploy one real project" applied exercise
- Optional: dark-theme force scan for contrast; further decorative-token cleanup outside excluded regions

### ✅ Path cross-links
- Sibling kits + umbrella: [`../automation-tester-path/`](../automation-tester-path/README.md) (Playwright, API & Data, Perf Basics)

---

## 9. Quick Pitfalls from this session (memories to reuse)
- A **focus-mode harness false-positive** was a mock artifact — isolate the function in a minimal test to confirm app code is fine.
- **README/interactive demos** that show `node -e` output should be run once to confirm the comment matches.
- "Part N complete" was corrected twice when the **context doc / index.html / README** were still missing Part N — always update those three together with a new part.
- **Certificate must reset on lock too:** an earned certificate turned green stays green unless the locked branch also clears the background — set `panel.style.background = ""` in the "incomplete" path (fixed across Parts 2–6).
- **Challenge-runner tests need a real canvas mock:** when evaluating `runTest` in Node, the confetti path calls `canvas.getContext("2d")`. Without it the promise rejects and "result pass" is overwritten to "result fail" — a harness artifact, not an app bug. Provide a `getContext` stub.
- **Watch the path** — the recurring `.cline` vs `.clinete` typo creates a stray temp folder; always type `C:\Users\rohit\.cline\data\workspaces\chat\javascript-essentials` exactly.

---

*Handoff created: 2026-09-02 · Series complete · Repo clean on `main`.*