#!/usr/bin/env node
/** Generate PART plans, context docs, with_examples + interactive markdown. */
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");

const PART_META = [
  {
    n: 0,
    title: "Testing Mindset (Strategy)",
    fileBase: "Playwright_essentials_part0",
    sections: [
      ["Why testing strategy exists", "Strategy decides *what* to automate so you don't drown in brittle E2E."],
      ["The test pyramid", "Many unit, fewer integration/API, fewest E2E — speed and signal."],
      ["Risk-based selection", "Automate paths that hurt customers or revenue when broken."],
      ["When NOT to E2E", "Pure logic, static pages, and anything already proven cheaper."],
      ["Flake vs product bug", "Triage intermittent failures before rewriting product code."],
      ["Bug reports that help", "Repro, expected vs actual, environment, artifacts."],
      ["Definition of done for tests", "Deterministic, CI-green, readable failure messages."],
      ["Common strategy pitfalls", "100% E2E, testing implementation details, ignoring ROI."],
      ["Practice", "Map one feature across pyramid layers."],
      ["Challenges", "Classify scenarios into unit / api / e2e."],
      ["Answer key", "Compare classifications."],
    ],
    labs: "Conceptual — apply mindset before writing labs in Part 1.",
    extra: "This is the Strategy module (Part 0). Playwright Part 1 also repeats a short strategy slice.",
  },
  {
    n: 1,
    title: "Foundations",
    fileBase: "Playwright_essentials_part1",
    sections: [
      ["What E2E is vs unit/integration", "E2E drives a real browser through user journeys."],
      ["Strategy slice — pyramid & when not to E2E", "Keep E2E thin; push logic down the pyramid."],
      ["Why Playwright", "Auto-wait, tracing, codegen, multi-browser."],
      ["Install & browsers", "`npm i -D @playwright/test` then `npx playwright install`."],
      ["test() and expect()", "Smallest green test structure."],
      ["First visit + assert", "`goto`, `getByRole`, `toBeVisible`."],
      ["Codegen intro", "Bootstrap then clean recordings."],
      ["Config basics", "`baseURL`, projects, `webServer`."],
      ["Headed vs headless", "Debug with `--headed` / UI mode."],
      ["Traces & screenshots on fail", "`trace: 'on-first-retry'`."],
      ["Common pitfalls", "Hard waits, brittle CSS, missing baseURL."],
      ["Practice", "Run `labs/part1` against demo-app."],
      ["Challenges", "Locator-style helper."],
      ["Answer key", "Solutions."],
    ],
    labs: "`labs/part1/home.spec.js` — home heading + Shop now navigation.",
    extra: "Requires Node + Playwright browsers. Study app mocks teach offline; labs prove skill.",
  },
  {
    n: 2,
    title: "Locators & Actions",
    fileBase: "Playwright_essentials_part2",
    sections: [
      ["Locator philosophy", "Prefer user-facing queries over CSS soup."],
      ["getByRole / Label / Text / TestId", "Everyday locator toolkit."],
      ["CSS & XPath sparingly", "Escape hatches only."],
      ["Clicks, fill, select, check", "Actions that wait for actionability."],
      ["Auto-waiting & timeouts", "Know why a click timed out."],
      ["Frames, dialogs, downloads", "Special Playwright events."],
      ["Soft assertions", "Collect multiple failures."],
      ["Flaky locator Spot-the-Bug", "Tighten selectors."],
      ["Practice on ShopLite forms", "`labs/part2`."],
      ["Challenges", "Score locator quality."],
      ["Answer key", "Solutions."],
    ],
    labs: "`labs/part2/forms.spec.js` — cart, login, dialogs.",
    extra: "Demo-app forms and dialogs exist for these labs.",
  },
  {
    n: 3,
    title: "Architecture (POM, fixtures, auth)",
    fileBase: "Playwright_essentials_part3",
    sections: [
      ["Why architecture matters", "Suites grow; structure keeps them maintainable."],
      ["Page Object Model", "Page class owns locators + flows."],
      ["Fixtures", "`test.extend` shared setup."],
      ["describe, hooks, projects", "Organize + multi-browser."],
      ["env + baseURL", "One config, many environments."],
      ["APIRequestContext overview", "Depth deferred to API & Data Essentials kit."],
      ["Authentication + storageState", "Login once, reuse storage."],
      ["Parallelization basics", "Workers and isolation."],
      ["Practice — refactor to POM", "`labs/part3`."],
      ["Challenges", "Name POM methods."],
      ["Answer key", "Solutions."],
    ],
    labs: "`labs/part3` — LoginPage POM, request smoke, storageState save.",
    extra: "**API testing here is overview only.** For REST/SQL depth, use the future API & Data Essentials kit.",
  },
  {
    n: 4,
    title: "Reliability & Quality",
    fileBase: "Playwright_essentials_part4",
    sections: [
      ["Network mocking / routing", "`page.route` stubs backends."],
      ["Clock / time", "Deterministic time-based UI."],
      ["Visual comparisons (light)", "Optional screenshot guards."],
      ["Accessibility with axe", "Gate serious a11y regressions."],
      ["Mobile projects", "Device descriptors."],
      ["Debugging: UI mode, trace, --debug", "See what failed."],
      ["Flake triage", "Isolate, quarantine, fix root cause."],
      ["Test data strategies", "Factories, seeds, cleanup."],
      ["Practice", "`labs/part4`."],
      ["Challenges", "Impact severity helper."],
      ["Answer key", "Solutions."],
    ],
    labs: "`labs/part4/network-a11y.spec.js` — mock checkout + axe.",
    extra: "Uses `@axe-core/playwright` like JE a11y patterns.",
  },
  {
    n: 5,
    title: "CI, Scale & Professional Workflow",
    fileBase: "Playwright_essentials_part5",
    sections: [
      ["GitHub Actions + Playwright", "Install browsers and run tests in CI."],
      ["Artifacts: report & traces", "Upload on failure."],
      ["Sharding overview", "`--shard=k/n` across jobs."],
      ["Tagging / grep", "`@smoke` vs full suite."],
      ["Cloud browsers overview", "Hosted grids when self-hosted isn't enough."],
      ["Reporting & definition of done", "Readable failures for teammates."],
      ["Common CI pitfalls", "Missing deps, no artifacts, silent flakes."],
      ["Component testing overview", "Optional short — know it exists."],
      ["Practice — kit workflow", "`.github/workflows/verify.yml`."],
      ["Challenges + certificate", "Finish the series."],
      ["Answer key", "Solutions."],
    ],
    labs: "`labs/part5/ci-smoke.spec.js` — tagged smoke + download.",
    extra: "Series certificate unlocks in the Part 5 study app at 100% section completion.",
  },
];

function plainMd(p) {
  let out = `# Playwright Essentials — Part ${p.n}: ${p.title}

> Plain study guide (print/PDF friendly). Same curriculum as the interactive markdown and study app.

### 🗺 Your path — where Part ${p.n} fits

\`\`\`
Part 0 Strategy → Part 1 Foundations → Part 2 Locators → Part 3 Architecture → Part 4 Reliability → Part 5 CI
\`\`\`

${p.extra}

## Table of Contents

${p.sections.map((s, i) => `${i + 1}. ${s[0]}`).join("\n")}

`;

  p.sections.forEach((s, i) => {
    const n = i + 1;
    out += `## ${n}. ${s[0]}

> 🚩 **Why it matters:** ${s[1]}

`;
    if (n === 1 && p.n === 0) {
      out += `Testing without a strategy turns into "automate everything in the browser." That feels productive for a week, then CI is red for mysterious reasons.

**Rule of thumb:** ask *what decision does this test help us make?* If the answer is unclear, don't automate it yet.

`;
    }
    if (s[0].toLowerCase().includes("pyramid")) {
      out += `| Layer | Speed | What it catches | Count |
|---|---|---|---|
| Unit | Fastest | Pure logic bugs | Many |
| Integration / API | Medium | Wiring, contracts | Some |
| E2E (Playwright) | Slowest | Real user flows | Few |

`;
    }
    if (s[0].toLowerCase().includes("when not")) {
      out += `Skip E2E when:

1. The behavior is a pure function (unit test).
2. You're only checking HTTP status/body (API test).
3. The UI is static marketing copy with no behavior.
4. A cheaper test already covers the risk.

`;
    }
    if (s[0].toLowerCase().includes("install")) {
      out += `\`\`\`bash
npm i -D @playwright/test
npx playwright install
npx playwright test labs/part1
\`\`\`

`;
    }
    if (s[0].toLowerCase().includes("first visit") || s[0].toLowerCase().includes("test()")) {
      out += `\`\`\`js
const { test, expect } = require('@playwright/test');

test('home loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /ShopLite/i })).toBeVisible();
});
\`\`\`

`;
    }
    if (s[0].toLowerCase().includes("getByRole")) {
      out += `\`\`\`js
await page.getByRole('button', { name: 'Sign in' }).click();
await page.getByLabel('Email').fill('a@b.com');
await page.getByTestId('login-submit').click();
\`\`\`

`;
    }
    if (s[0].toLowerCase().includes("page object") || s[0].includes("POM")) {
      out += `\`\`\`js
// labs/part3/pages/LoginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.getByLabel('Email');
    this.password = page.getByLabel('Password');
    this.submit = page.getByTestId('login-submit');
  }
  async signIn(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
  }
}
\`\`\`

`;
    }
    if (s[0].toLowerCase().includes("api") && p.n === 3) {
      out += `> **Scope note:** Part 3 shows \`APIRequestContext\` / \`request.get\` as a *smoke* alongside UI. Deep REST assertions, auth matrices, schema/contract checks, and SQL-for-testers belong in **API & Data Essentials** (separate kit).

`;
    }
    if (s[0].toLowerCase().includes("network") || s[0].toLowerCase().includes("mock")) {
      out += `\`\`\`js
await page.route('**/api/checkout', async route => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ orderId: 'PW-42' }),
  });
});
\`\`\`

`;
    }
    if (s[0].toLowerCase().includes("github actions") || s[0].toLowerCase().includes("sharding")) {
      out += `See \`.github/workflows/verify.yml\` in this repo for a working pattern:

- \`npm ci\`
- \`npx playwright install --with-deps chromium\`
- \`npx playwright test\`
- Upload \`playwright-report/\` and \`test-results/\` on failure

Sharding (overview):

\`\`\`bash
npx playwright test --shard=1/2
npx playwright test --shard=2/2
\`\`\`

Cloud browsers (overview): vendors host browsers/OS matrices (e.g. BrowserStack, Azure Playwright Testing). Use when self-hosted runners can't cover the matrix — evaluate cost, debug UX, and secrets handling; this series does not require a vendor account.

`;
    }
    if (s[0].toLowerCase().includes("practice")) {
      out += `**Lab:** ${p.labs}

\`\`\`bash
npm test -- labs/part${p.n === 0 ? 1 : p.n}
\`\`\`

`;
    }
    if (s[0].toLowerCase().includes("challenge")) {
      out += `Open the study app challenges for auto-graded pure functions (same ideas as JE).

`;
    }
    if (s[0].toLowerCase().includes("answer key")) {
      out += `Challenge solutions are embedded in each study app as \`window.PW${p.n}_SOLUTIONS\` (console) and mirrored in interactive edition hints.

### 🧪 Quiz (sample)

1. What belongs at the top of the pyramid? → Few critical E2E journeys.
2. Prefer \`getByRole\` over long CSS? → Yes.
3. Part 3 API depth? → Overview only; deeper kit later.

`;
    }
    out += `### 🧪 Quiz

Think: how would you explain this section to a teammate in one sentence?

---

`;
  });

  out += `## 🎉 Congratulations

You finished the plain edition of Part ${p.n}. Next: open the study app, run the labs, then continue the path.

<!--P${p.n}-END-->
`;
  return out;
}

function interactiveMd(p) {
  let out = `# Playwright Essentials — Part ${p.n}: ${p.title} (Interactive)

<style>
.tip{background:#f0fff4;border-left:4px solid #38a169;padding:10px 14px;margin:8px 0;color:#1a202c;}
.warn{background:#fffaf0;border-left:4px solid #dd6b20;padding:10px 14px;margin:8px 0;color:#1a202c;}
.chall{background:#f5f3ff;border-left:4px solid #6b46c1;padding:10px 14px;margin:8px 0;color:#1a202c;}
.why{background:#eef2ff;border-left:4px solid #5a67d8;padding:6px 12px;margin:6px 0 10px;font-size:0.92rem;color:#1a202c;}
.quiz-box{background:#f7f9fc;border:2px solid #4299e1;border-radius:10px;padding:14px 18px;margin:18px 0;}
.quiz-correct{color:#276749;font-weight:700;}
.quiz-wrong{color:#9b2c2c;}
.flashcard{background:#fff;border:1px solid #cbd5e0;border-radius:8px;padding:12px;margin:8px 0;cursor:pointer;}
.mood{margin:12px 0;}
.predict details{background:#fff;border:1px solid #cbd5e0;border-radius:8px;padding:8px 12px;margin:6px 0;}
.partnav{display:flex;gap:8px;flex-wrap:wrap;background:#2d3748;color:#e2e8f0;padding:8px 12px;border-radius:8px;}
.partnav a{color:#7dd3fc;}
@media (prefers-color-scheme:dark){
  .tip,.warn,.chall,.why,.quiz-box,.flashcard,.predict details{color:#e2e8f0;}
  .tip{background:#132a1c;} .warn{background:#2b2013;} .chall{background:#2b1420;} .why{background:#1c2333;}
  .quiz-box{background:#141c28;} .flashcard,.predict details{background:#0f1622;}
}
</style>

<div class="partnav" aria-label="Part navigation">
  <a href="index.html">Hub</a>
  <strong>Part ${p.n}</strong>
  <a href="Playwright_essentials_part${p.n}_study_app.html">Study app</a>
  <a href="Playwright_essentials_part${p.n}_with_examples.md">Plain</a>
</div>

> Interactive markdown — open with VS Code preview (\`Ctrl+Shift+V\`). Full mocks/SRS/certificate live in the study app.

${p.extra}

`;

  p.sections.forEach((s, i) => {
    out += `## ${i + 1}. ${s[0]}

<div class="why">🚩 <strong>Why it matters:</strong> ${s[1]}</div>

`;
    if (i % 3 === 0) {
      out += `<div class="quiz-box"><h3>Quick check</h3><p>Can you restate this section's why-it-matters?</p>
<details><summary>Reveal</summary><p class="quiz-correct">✓ ${s[1]}</p><p class="quiz-wrong">✗ Skipping the "why" makes facts forgettable.</p></details></div>

`;
    }
    if (i === 1) {
      out += `<div class="predict"><details><summary>Predict: 200 E2E and almost no unit tests — what happens?</summary><p>Slow CI, frequent flakes, late feedback.</p></details></div>

`;
    }
  });

  out += `## Spot-the-Bug

<div class="chall">
<details><summary>🐞 Only CSS nth-child locators everywhere</summary><p>Prefer role/label/test id; CSS breaks on layout churn.</p></details>
<details><summary>🐞 \`waitForTimeout(5000)\` before every click</summary><p>Use auto-waiting assertions/actions instead.</p></details>
</div>

## Flashcards

<div class="flashcard" onclick="this.classList.toggle('open')"><strong>Q:</strong> What is storageState?<br><em>A: Saved cookies/localStorage to reuse auth.</em></div>
<div class="flashcard"><strong>Q:</strong> When not to E2E?<br><em>A: Pure logic / static content / cheaper coverage exists.</em></div>

<div class="mood"><span>Mood check:</span> 😅 / 😐 / 😄 — be honest, then revisit tough sections.</div>

## Lab

${p.labs}

\`\`\`bash
npm test -- labs/part${Math.max(1, p.n)}
\`\`\`

<script>
function p${p.n}iExpand(on){
  document.querySelectorAll('.quiz-box details,.predict details').forEach(function(d){ d.open=!!on; });
}
</script>

<!--P${p.n}I-END-->
`;
  return out;
}

function planMd(p) {
  return `# PART${p.n}_PLAN — ${p.title}

## Goal
Ship Part ${p.n} of Playwright Essentials with three editions + labs alignment.

## Sections (${p.sections.length})
${p.sections.map((s, i) => `${i + 1}. ${s[0]} — ${s[1]}`).join("\n")}

## Deliverables
- \`${p.fileBase}_with_examples.md\`
- \`${p.fileBase}_interactive.md\`
- \`${p.fileBase}_study_app.html\`
- \`PLAYWRIGHT_ESSENTIALS_PART${p.n}_CONTEXT.md\`
- Labs: ${p.labs}

## Pedagogy checklist
- [x] Why-it-matters per section
- [x] Quizzes / predicts / Spot-the-Bug
- [x] 7-day plan + certificate gate (study app)
- [x] ADHD-friendly chunking

## Notes
${p.extra}
`;
}

function contextMd(p) {
  return `# PLAYWRIGHT_ESSENTIALS_PART${p.n}_CONTEXT

## Transfer notes
Part ${p.n}: **${p.title}**

### Audience
Beginner E2E learners who finished JE Parts 1–2 (async/DOM) minimum.

### Key teaching points
${p.sections
  .slice(0, 5)
  .map((s) => `- ${s[0]}: ${s[1]}`)
  .join("\n")}

### Labs
${p.labs}

### Files
- Study app: \`${p.fileBase}_study_app.html\`
- Plain: \`${p.fileBase}_with_examples.md\`
- Interactive: \`${p.fileBase}_interactive.md\`
- Plan: \`PART${p.n}_PLAN.md\`

### Dependencies / scope
${p.extra}

### Verification
\`\`\`bash
node verify-study-apps.js
node scripts/inline-shell.js --check
npx playwright test labs/part${Math.max(1, p.n)}
\`\`\`
`;
}

for (const p of PART_META) {
  fs.writeFileSync(path.join(ROOT, `${p.fileBase}_with_examples.md`), plainMd(p));
  fs.writeFileSync(path.join(ROOT, `${p.fileBase}_interactive.md`), interactiveMd(p));
  fs.writeFileSync(path.join(ROOT, `PART${p.n}_PLAN.md`), planMd(p));
  fs.writeFileSync(
    path.join(ROOT, `PLAYWRIGHT_ESSENTIALS_PART${p.n}_CONTEXT.md`),
    contextMd(p)
  );
  console.log("Wrote part", p.n, "markdown suite");
}
console.log("Markdown generation complete.");
