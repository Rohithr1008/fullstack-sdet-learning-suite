# PLAYWRIGHT_ESSENTIALS_PART5_CONTEXT

## Transfer notes
Part 5: **CI, Scale & Professional Workflow**

### Audience
Beginner E2E learners who finished JE Parts 1–2 (async/DOM) minimum.

### Key teaching points
- GitHub Actions + Playwright: Install browsers and run tests in CI.
- Artifacts: report & traces: Upload on failure.
- Sharding overview: `--shard=k/n` across jobs.
- Tagging / grep: `@smoke` vs full suite.
- Cloud browsers overview: Hosted grids when self-hosted isn't enough.

### Labs
`labs/part5/ci-smoke.spec.js` — tagged smoke + download.

### Files
- Study app: `Playwright_essentials_part5_study_app.html`
- Plain: `Playwright_essentials_part5_with_examples.md`
- Interactive: `Playwright_essentials_part5_interactive.md`
- Plan: `PART5_PLAN.md`

### Dependencies / scope
Series certificate unlocks in the Part 5 study app at 100% section completion.

### Verification
```bash
node verify-study-apps.js
node scripts/inline-shell.js --check
npx playwright test labs/part5
```
