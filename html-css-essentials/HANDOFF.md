# Handoff — HTML & CSS Essentials

> Read this before editing. Match the JavaScript Essentials three-edition pattern.

## Overview
ADHD/autistic-friendly kit teaching HTML/CSS **for automation testers**.

| Part | Title | Sections | Covers |
|---|---|---|---|
| 1 | For testers | 12 | DOM, forms, testids, DevTools, selectors, visibility, box model |
| 2 | Layout & a11y | 10 | Flex/Grid, responsive, specificity, a11y, focus |
| 3 | Mini page + checklist | 9 | LabCard build + Playwright-oriented checklist (link out) |

**Repo:** https://github.com/Rohithr1008/html-css-essentials

## Naming
- `Html_css_essentials_partN_with_examples.md` — plain
- `Html_css_essentials_partN_interactive.md` — interactive MD
- `Html_css_essentials_partN_study_app.html` — offline study app
- Sentinels: `<!--PN-END-->`, `<!--PNI-END-->`, `<!--PNH-END-->`

## Study-app features (keep consistent)
Theme toggle, font zoom, progress (`pN-sec-N`), XP/streak, learning path, flashcards, Focus Mode, certificate, skip link, one inline `<script>` block.

## Generate
```bash
node _generate.js
```
Prefer editing `_generate.js` section data, then regenerate — don’t hand-drift three editions forever.

## Path links
- Umbrella: `../automation-tester-path/`
- Sibling: `../javascript-essentials/`
- Next E2E: `../playwright-essentials/` (do **not** re-teach Playwright here)

## Do not
- Edit `typescript-for-testers` or `automation-tester-path` from this workstream unless asked
