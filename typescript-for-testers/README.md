# TypeScript for Testers

Thin, ADHD-friendly kit: **TypeScript for writing and maintaining automation** — not a full TS developer bootcamp.

> **Progress:** Part 1 (Basics) ✅ · Part 2 (Playwright-oriented) ✅  
> **Path:** [Automation Tester Path](../automation-tester-path/README.md) · [`START_HERE`](START_HERE.md)

### ⚠️ Scope (read this)

**This kit is NOT enough for full TypeScript-only develop jobs.** It teaches the types you need for helpers, fixtures, and Playwright page objects.

**Phase B — TypeScript Develop + Test** ([`../typescript-develop-test/`](../typescript-develop-test/) ✅) is the deeper kit for building apps *and* tests in TypeScript. Finish Phase A (this kit → Playwright → harden/API/perf) before treating TS as a career track. **Start Phase B:** [`../typescript-develop-test/START_HERE.md`](../typescript-develop-test/START_HERE.md)

### Path navigation

| | |
|---|---|
| **Umbrella** | [`../automation-tester-path/README.md`](../automation-tester-path/README.md) · [`START_HERE` (path)](../automation-tester-path/START_HERE.md) |
| **Previous** | [HTML & CSS Essentials](../html-css-essentials/) (Part 1) · or [JavaScript Essentials](../javascript-essentials/README.md) |
| **Next** | [Playwright Essentials](../playwright-essentials/README.md) |
| **Phase B** | [TypeScript Develop + Test](../typescript-develop-test/) ✅ — hub [`index.html`](../typescript-develop-test/index.html) |
| **Siblings** | JE · Playwright · API & Data · Perf Basics |

---

## Choose your path

| Part | Title | Study app |
|---|---|---|
| 1 | Basics for testers | [Open](Typescript_for_testers_part1_study_app.html) |
| 2 | Playwright-oriented TS | [Open](Typescript_for_testers_part2_study_app.html) |

**Hub:** [`index.html`](index.html)

Each part ships three editions:

| Edition | Best for | Part 1 | Part 2 |
|---|---|---|---|
| Study app | Offline browser — progress, drills, certificate | [App](Typescript_for_testers_part1_study_app.html) | [App](Typescript_for_testers_part2_study_app.html) |
| Interactive Markdown | VS Code preview (`Ctrl+Shift+V`) | [MD](Typescript_for_testers_part1_interactive.md) | [MD](Typescript_for_testers_part2_interactive.md) |
| Plain Markdown | Print / PDF / distraction-free | [Plain](Typescript_for_testers_part1_with_examples.md) | [Plain](Typescript_for_testers_part2_with_examples.md) |

---

## What's covered

**Part 1 — Basics (10 sections)**  
Why TS in automation · primitives · interfaces · unions · optional · type aliases · pitfalls · practice · challenges · answers

**Part 2 — Playwright-oriented (10 sections)**  
tsconfig overview · Playwright+TS · light POM annotations · helpers · JS→TS migrate lab · reading errors · pitfalls · practice · challenges · next steps

---

## Quick start

1. Open [`index.html`](index.html) or a study app in any browser.  
2. Or preview an `.md` in VS Code (`Ctrl+Shift+V`).  
3. Migrate lab (read + compare):

```text
labs/migrate-before.js   →  labs/migrate-after.ts
```

No install required for the study materials. Playwright itself lives in the Playwright Essentials kit.

---

## Hub files

| File | Purpose |
|---|---|
| [`START_HERE.md`](START_HERE.md) | First open |
| [`HANDOFF.md`](HANDOFF.md) | Conventions for humans/agents |
| [`PART1_PLAN.md`](PART1_PLAN.md) / [`PART2_PLAN.md`](PART2_PLAN.md) | Section plans |
| [`labs/`](labs/) | Tiny JS→TS migrate pair |

---

*Made for hands-on learning — annotate a helper, fix a red squiggle, migrate one file, then go write Playwright tests.*
