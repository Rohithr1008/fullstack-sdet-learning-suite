# PART1_PLAN — Foundations

## Goal
Ship Part 1 of Playwright Essentials with three editions + labs alignment.

## Sections (14)
1. What E2E is vs unit/integration — E2E drives a real browser through user journeys.
2. Strategy slice — pyramid & when not to E2E — Keep E2E thin; push logic down the pyramid.
3. Why Playwright — Auto-wait, tracing, codegen, multi-browser.
4. Install & browsers — `npm i -D @playwright/test` then `npx playwright install`.
5. test() and expect() — Smallest green test structure.
6. First visit + assert — `goto`, `getByRole`, `toBeVisible`.
7. Codegen intro — Bootstrap then clean recordings.
8. Config basics — `baseURL`, projects, `webServer`.
9. Headed vs headless — Debug with `--headed` / UI mode.
10. Traces & screenshots on fail — `trace: 'on-first-retry'`.
11. Common pitfalls — Hard waits, brittle CSS, missing baseURL.
12. Practice — Run `labs/part1` against demo-app.
13. Challenges — Locator-style helper.
14. Answer key — Solutions.

## Deliverables
- `Playwright_essentials_part1_with_examples.md`
- `Playwright_essentials_part1_interactive.md`
- `Playwright_essentials_part1_study_app.html`
- `PLAYWRIGHT_ESSENTIALS_PART1_CONTEXT.md`
- Labs: `labs/part1/home.spec.js` — home heading + Shop now navigation.

## Pedagogy checklist
- [x] Why-it-matters per section
- [x] Quizzes / predicts / Spot-the-Bug
- [x] 7-day plan + certificate gate (study app)
- [x] ADHD-friendly chunking

## Notes
Requires Node + Playwright browsers. Study app mocks teach offline; labs prove skill.
