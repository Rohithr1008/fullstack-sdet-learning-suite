# PLAYWRIGHT_ESSENTIALS_PART3_CONTEXT

## Transfer notes
Part 3: **Architecture (POM, fixtures, auth)**

### Audience
Beginner E2E learners who finished JE Parts 1–2 (async/DOM) minimum.

### Key teaching points
- Why architecture matters: Suites grow; structure keeps them maintainable.
- Page Object Model: Page class owns locators + flows.
- Fixtures: `test.extend` shared setup.
- describe, hooks, projects: Organize + multi-browser.
- env + baseURL: One config, many environments.

### Labs
`labs/part3` — LoginPage POM, request smoke, storageState save.

### Files
- Study app: `Playwright_essentials_part3_study_app.html`
- Plain: `Playwright_essentials_part3_with_examples.md`
- Interactive: `Playwright_essentials_part3_interactive.md`
- Plan: `PART3_PLAN.md`

### Dependencies / scope
**API testing here is overview only.** For REST/SQL depth, use the future API & Data Essentials kit.

### Verification
```bash
node verify-study-apps.js
node scripts/inline-shell.js --check
npx playwright test labs/part3
```
