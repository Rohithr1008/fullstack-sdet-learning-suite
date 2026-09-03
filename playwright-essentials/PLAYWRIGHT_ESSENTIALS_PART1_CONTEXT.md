# PLAYWRIGHT_ESSENTIALS_PART1_CONTEXT

## Transfer notes
Part 1: **Foundations**

### Audience
Beginner E2E learners who finished JE Parts 1–2 (async/DOM) minimum.

### Key teaching points
- What E2E is vs unit/integration: E2E drives a real browser through user journeys.
- Strategy slice — pyramid & when not to E2E: Keep E2E thin; push logic down the pyramid.
- Why Playwright: Auto-wait, tracing, codegen, multi-browser.
- Install & browsers: `npm i -D @playwright/test` then `npx playwright install`.
- test() and expect(): Smallest green test structure.

### Labs
`labs/part1/home.spec.js` — home heading + Shop now navigation.

### Files
- Study app: `Playwright_essentials_part1_study_app.html`
- Plain: `Playwright_essentials_part1_with_examples.md`
- Interactive: `Playwright_essentials_part1_interactive.md`
- Plan: `PART1_PLAN.md`

### Dependencies / scope
Requires Node + Playwright browsers. Study app mocks teach offline; labs prove skill.

### Verification
```bash
node verify-study-apps.js
node scripts/inline-shell.js --check
npx playwright test labs/part1
```
