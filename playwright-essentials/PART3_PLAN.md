# PART3_PLAN — Architecture (POM, fixtures, auth)

## Goal
Ship Part 3 of Playwright Essentials with three editions + labs alignment.

## Sections (11)
1. Why architecture matters — Suites grow; structure keeps them maintainable.
2. Page Object Model — Page class owns locators + flows.
3. Fixtures — `test.extend` shared setup.
4. describe, hooks, projects — Organize + multi-browser.
5. env + baseURL — One config, many environments.
6. APIRequestContext overview — Depth deferred to API & Data Essentials kit.
7. Authentication + storageState — Login once, reuse storage.
8. Parallelization basics — Workers and isolation.
9. Practice — refactor to POM — `labs/part3`.
10. Challenges — Name POM methods.
11. Answer key — Solutions.

## Deliverables
- `Playwright_essentials_part3_with_examples.md`
- `Playwright_essentials_part3_interactive.md`
- `Playwright_essentials_part3_study_app.html`
- `PLAYWRIGHT_ESSENTIALS_PART3_CONTEXT.md`
- Labs: `labs/part3` — LoginPage POM, request smoke, storageState save.

## Pedagogy checklist
- [x] Why-it-matters per section
- [x] Quizzes / predicts / Spot-the-Bug
- [x] 7-day plan + certificate gate (study app)
- [x] ADHD-friendly chunking

## Notes
**API testing here is overview only.** For REST/SQL depth, use the future API & Data Essentials kit.
