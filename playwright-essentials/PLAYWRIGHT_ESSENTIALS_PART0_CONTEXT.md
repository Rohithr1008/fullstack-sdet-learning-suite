# PLAYWRIGHT_ESSENTIALS_PART0_CONTEXT

## Transfer notes
Part 0: **Testing Mindset (Strategy)**

### Audience
Beginner E2E learners who finished JE Parts 1–2 (async/DOM) minimum.

### Key teaching points
- Why testing strategy exists: Strategy decides *what* to automate so you don't drown in brittle E2E.
- The test pyramid: Many unit, fewer integration/API, fewest E2E — speed and signal.
- Risk-based selection: Automate paths that hurt customers or revenue when broken.
- When NOT to E2E: Pure logic, static pages, and anything already proven cheaper.
- Flake vs product bug: Triage intermittent failures before rewriting product code.

### Labs
Conceptual — apply mindset before writing labs in Part 1.

### Files
- Study app: `Playwright_essentials_part0_study_app.html`
- Plain: `Playwright_essentials_part0_with_examples.md`
- Interactive: `Playwright_essentials_part0_interactive.md`
- Plan: `PART0_PLAN.md`

### Dependencies / scope
This is the Strategy module (Part 0). Playwright Part 1 also repeats a short strategy slice.

### Verification
```bash
node verify-study-apps.js
node scripts/inline-shell.js --check
npx playwright test labs/part1
```
