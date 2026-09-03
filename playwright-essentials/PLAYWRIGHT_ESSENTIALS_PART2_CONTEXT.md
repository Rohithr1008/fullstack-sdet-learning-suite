# PLAYWRIGHT_ESSENTIALS_PART2_CONTEXT

## Transfer notes
Part 2: **Locators & Actions**

### Audience
Beginner E2E learners who finished JE Parts 1–2 (async/DOM) minimum.

### Key teaching points
- Locator philosophy: Prefer user-facing queries over CSS soup.
- getByRole / Label / Text / TestId: Everyday locator toolkit.
- CSS & XPath sparingly: Escape hatches only.
- Clicks, fill, select, check: Actions that wait for actionability.
- Auto-waiting & timeouts: Know why a click timed out.

### Labs
`labs/part2/forms.spec.js` — cart, login, dialogs.

### Files
- Study app: `Playwright_essentials_part2_study_app.html`
- Plain: `Playwright_essentials_part2_with_examples.md`
- Interactive: `Playwright_essentials_part2_interactive.md`
- Plan: `PART2_PLAN.md`

### Dependencies / scope
Demo-app forms and dialogs exist for these labs.

### Verification
```bash
node verify-study-apps.js
node scripts/inline-shell.js --check
npx playwright test labs/part2
```
