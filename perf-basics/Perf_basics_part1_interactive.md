# Perf Basics — Part 1

A thin study guide for **performance literacy**: SLIs/SLOs, one k6 script, reading p95, and when perf ≠ functional E2E.

<div class="interactive-note">💡 <strong>Interactive edition:</strong> quizzes, flashcards, predict cards, mood checks, Spot-the-Bug. Best in <strong>VS Code preview</strong> (<code>Ctrl+Shift+V</code>). The <strong>study app</strong> adds progress, Focus Mode, live mocks, and an optional certificate.</div>

<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;background:#134e4a;color:#e2e8f0;padding:8px 12px;border-radius:8px;margin:10px 0;font-size:0.95rem;">
  <a href="index.html" style="color:#5eead4;font-weight:600;text-decoration:none;">Hub</a>
  <strong style="color:#fff;">1 Perf Basics</strong>
  <span style="color:#99f6e4;">(single-part kit)</span>
</div>

<style>
h2 { border-bottom: 3px solid #0f766e; padding-bottom: 6px; }
.interactive-note { background: #ecfdf5; border-left: 4px solid #0f766e; padding: 10px 14px; border-radius: 6px; }
.tip    { background: #f0fff4; border-left: 4px solid #38a169; padding: 10px 14px; border-radius: 6px; }
.why    { background:#e6fffa; border-left:4px solid #319795; padding:6px 12px; border-radius:6px; margin:6px 0 10px 0; font-size:0.92rem; }
.warn   { background: #fffaf0; border-left: 4px solid #dd6b20; padding: 10px 14px; border-radius: 6px; }
.quiz-box { background: #f7faf9; border: 2px solid #0f766e; border-radius: 10px; padding: 14px 18px; margin: 18px 0; }
.quiz-box h3 { margin-top: 0; color: #0f766e; }
.quiz-box details { background: #ffffff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 8px 12px; margin: 8px 0; }
.quiz-box summary { cursor: pointer; font-weight: 600; }
.quiz-correct { color: #276749; font-weight: 700; }
.flashcard { background: #fffbeb; border: 2px solid #d69e2e; border-radius: 10px; padding: 10px 14px; margin: 10px 0; }
.flashcard summary { cursor: pointer; font-weight: 700; color: #744210; }
.badge { display: inline-block; font-size: 12px; padding: 2px 9px; border-radius: 999px; margin-left: 6px; font-weight: 700; }
.b-green  { background: #c6f6d5; color: #22543d; }
.b-yellow { background: #fefcbf; color: #744210; }
.b-time   { background: #e2e8f0; color: #2d3748; font-weight: 600; }
.predict { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 10px; margin: 14px 0; }
.predict details { background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 8px 12px; }
.predict summary { cursor: pointer; font-weight: 600; }
.hint { background: #fffbeb; border: 1px dashed #d69e2e; border-radius: 8px; padding: 8px 12px; margin: 10px 0; }
.hint summary { cursor: pointer; font-weight: 700; color: #744210; }
.mood { margin-top: 12px; display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.mood > span { font-weight: 700; margin-right: 4px; }
.mood input { display: none; }
.mood label { cursor: pointer; border: 1px solid #a0aec0; border-radius: 999px; padding: 4px 12px; background: #fff; font-size: 14px; user-select: none; }
.mood input:checked + label { background: #0f766e; border-color: #0f766e; color: #fff; font-weight: 700; }
.study-plan { background: #ecfdf5; border: 1px solid #0f766e; border-radius: 10px; padding: 10px 16px; margin: 14px 0; }
.study-plan summary { cursor: pointer; font-weight: 700; color: #0f766e; font-size: 1.05em; }
.cert { background: linear-gradient(135deg, #0f766e, #115e59); color: #fff; border-radius: 14px; padding: 26px; text-align: center; margin: 30px 0; }
.cert h2 { color: #fff; border-bottom: none; }
.footer { text-align: center; padding: 18px; margin-top: 30px; background: #0f766e; color: #fff; border-radius: 10px; }
@media (prefers-color-scheme: dark) {
  .interactive-note { background: #0f1f1c; }
  .quiz-box { background: #12201a; border-color: #0f766e; }
  .quiz-box details, .predict details { background: #0c1612; border-color: #243830; color: #e2e8f0; }
  .flashcard, .hint { background: #241d0e; color: #e2e8f0; }
  .mood label { background: #12201a; color: #cbd5e0; border-color: #243830; }
  .study-plan { background: #12201a; color: #e2e8f0; }
}
</style>

---

## Table of Contents

1. [What performance testing is](#1-what-performance-testing-is-and-isnt)
2. [SLIs & SLOs](#2-slis--slos-in-plain-language)
3. [Latency, throughput, load](#3-latency-throughput-and-load)
4. [k6 hello-world](#4-k6-hello-world)
5. [Interpreting p95](#5-interpreting-p95)
6. [When perf ≠ functional E2E](#6-when-perf--functional-e2e)
7. [Glossary](#7-glossary)
8. [Common pitfalls](#8-common-pitfalls)
9. [Practice](#9-practice-exercises)
10. [Challenges](#10-challenges)
11. [Answer key](#11-answer-key)
12. [Where to go next](#12-where-to-go-next)

<details class="study-plan">
<summary>📅 Suggested 7-day study plan</summary>
<ol>
<li><strong>Day 1:</strong> §§1–2 — what perf is + SLI/SLO. Do Self-Tests.</li>
<li><strong>Day 2:</strong> §3 — latency vs throughput vs load.</li>
<li><strong>Day 3:</strong> §4 — install k6 (optional) and run <code>labs/hello.js</code>.</li>
<li><strong>Day 4:</strong> §5 — p95 predict cards.</li>
<li><strong>Day 5:</strong> §6 — E2E boundary + flashcards.</li>
<li><strong>Day 6:</strong> §§7–8 — glossary + pitfalls / Spot-the-Bug.</li>
<li><strong>Day 7:</strong> Practice + challenges; claim certificate in the study app.</li>
</ol>
</details>

---

## 1. What performance testing is (and isn't)

<div class="why">🚩 <strong>Why it matters:</strong> green functional tests ≠ capacity. Perf answers whether speed/stability hold under expected traffic.</div>

Performance testing checks **speed and capacity goals** under defined load — not “does every button work?”

| Question | Tool family |
|---|---|
| User journey works? | Playwright / E2E |
| API contract right? | API tests |
| Stay under X ms at N users? | k6 / load tools |

<div class="quiz-box">
<h3>🧪 Self-test</h3>
<details><summary>Can Playwright alone guarantee p95 &lt; 300 ms at 200 RPS?</summary>
<p class="quiz-correct">No — it doesn't generate that load (and shouldn't).</p>
</details>
<details><summary>Name one question perf answers that unit tests don't.</summary>
<p class="quiz-correct">How latency/error rate behave under concurrent load.</p>
</details>
</div>

<div class="mood"><span>Mood:</span>
<input type="radio" name="m1" id="m1a"><label for="m1a">😅 shaky</label>
<input type="radio" name="m1" id="m1b"><label for="m1b">🙂 ok</label>
<input type="radio" name="m1" id="m1c"><label for="m1c">😎 clear</label>
</div>

---

## 2. SLIs & SLOs in plain language

<div class="why">🚩 <strong>Why it matters:</strong> without a goal, “is it slow?” is endless opinion.</div>

| Term | Plain meaning |
|---|---|
| **SLI** | What you *measure* (e.g. request duration) |
| **SLO** | The *target* (e.g. p95 &lt; 300 ms) |
| **SLA** | Customer/contract promise (often legal) |

<div class="flashcard"><details><summary>🃏 SLI vs SLO?</summary><div class="back">SLI = metric. SLO = goal on that metric.</div></details></div>

<div class="quiz-box">
<h3>🧪 Self-test</h3>
<details><summary>“p95 &lt; 500 ms” — SLI or SLO?</summary><p class="quiz-correct">SLO (target).</p></details>
<details><summary>“Request duration in ms” — SLI or SLO?</summary><p class="quiz-correct">SLI (what you measure).</p></details>
</div>

---

## 3. Latency, throughput, and load

<div class="why">🚩 <strong>Why it matters:</strong> “slow” and “can't handle traffic” are different problems.</div>

| Concept | Means | Unit |
|---|---|---|
| Latency | Time for one request | ms |
| Throughput | Successful work / time | RPS |
| Load | Concurrent executors | VUs |

<div class="predict">
<details><summary>🤔 1000 RPS + 50 ms p95 — slow?</summary><p>Usually <strong>no</strong> — high throughput, low latency.</p></details>
<details><summary>🤔 5 RPS + 4 s p95 — problem?</summary><p><strong>Yes</strong> — little traffic but terrible latency.</p></details>
</div>

---

## 4. k6 hello-world

<div class="why">🚩 <strong>Why it matters:</strong> one real script beats ten articles.</div>

Lab: `labs/hello.js` · Run: `k6 run labs/hello.js` · Install: [k6 docs](https://k6.io/docs/get-started/installation/)

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '10s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500'],
  },
};

export default function () {
  const res = http.get('https://test.k6.io');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
```

<div class="warn">⚠️ Never aim early scripts at production. Use test.k6.io, mocks, or non-prod.</div>

<div class="quiz-box">
<h3>🧪 Self-test</h3>
<details><summary>What does <code>vus: 1</code> mean?</summary><p class="quiz-correct">One virtual user / concurrent script instance.</p></details>
<details><summary>p95 is 800 ms, threshold <code>p(95)&lt;500</code> — what happens?</summary><p class="quiz-correct">The duration threshold fails the run.</p></details>
</div>

---

## 5. Interpreting p95

<div class="why">🚩 <strong>Why it matters:</strong> averages hide the users who abandon.</div>

**p95** = 95% of requests were faster than this number; ~5% were slower.

<div class="predict">
<details><summary>🤔 Times [80,90,100,110,120,900] — is p95 closer to 120 or 900?</summary><p>Closer to <strong>900</strong> (tail).</p></details>
<details><summary>🤔 Mean fine, p95 terrible — meaning?</summary><p>A small % of requests are very slow (tail latency).</p></details>
</div>

<div class="flashcard"><details><summary>🃏 Why prefer p95 over mean for SLOs?</summary><div class="back">User pain lives in the tail; means get pulled by either side and hide minorities.</div></details></div>

---

## 6. When perf ≠ functional E2E

<div class="why">🚩 <strong>Why it matters:</strong> Playwright-as-load-test burns CI and still models concurrency poorly.</div>

| Goal | Prefer |
|---|---|
| Journey correctness | Playwright E2E |
| Latency under N VUs | k6 (or similar) |
| One smoke timing | Light check — don't call it a perf program |

<div class="quiz-box">
<details><summary>Boss wants “perf” but you only have Playwright — risk?</summary><p class="quiz-correct">You may only measure a few UI timings, not capacity/SLO under load.</p></details>
<details><summary>Can k6 replace all E2E?</summary><p class="quiz-correct">No — keep E2E for real user journeys.</p></details>
</div>

---

## 7. Glossary

| Term | Meaning |
|---|---|
| SLI / SLO / SLA | Measure / target / contract |
| VU | Virtual user |
| RPS | Requests per second |
| Check vs threshold (k6) | Per-response assert vs aggregate gate |
| p95 / p99 | High percentiles; tail latency |

<div class="flashcard"><details><summary>🃏 Check vs threshold in k6?</summary><div class="back">Checks assert on individual responses; thresholds gate aggregated metrics and can fail the run.</div></details></div>

---

## 8. Common pitfalls

1. Load-testing prod by accident  
2. Tiny samples for “p95”  
3. Reporting only the mean  
4. E2E browsers as load generators  
5. No SLO before scripting  
6. Celebrating RPS while errors soar  
7. Measuring only warm-cache steady state without saying so  

<div class="quiz-box">
<h3>🐞 Spot-the-Bug</h3>
<details><summary>Report: “Perf OK — average 120 ms” (no p95, no errors, 15 samples). What's wrong?</summary>
<p class="quiz-correct">Sample too small; mean-only hides tail; missing error rate / SLO context.</p>
</details>
<details><summary>CI job: 500 Playwright workers hitting staging “for load.” Bug?</summary>
<p class="quiz-correct">Wrong tool for load; costly/flaky; use k6 against APIs/non-prod instead.</p>
</details>
</div>

---

## 9. Practice exercises

<span class="badge b-green">easy</span> <span class="badge b-time">~20 min</span>

1. Write one SLI + one SLO for login.  
2. Label: 250 RPS · 180 ms p95 · 50 VUs.  
3. Sketch k6 options: 5 VUs, 30s, p95 &lt; 400.  
4. Why Playwright green ≠ Black Friday ready.  
5. Times `[50,55,60,60,70,80,90,200,800,900]` — p95 nearer 90 or 900?

<details class="hint"><summary>💡 Hint for #5</summary>High percentiles sit in the slow tail.</details>

---

## 10. Challenges

<span class="badge b-yellow">medium</span>

**C1.** avg 90 · p95 90 · p99 2.5s · errors 0% — what do you tell product?  
**C2.** Turn “the site should feel fast” into an SLO.  
**C3.** Replace “1000 Playwright workers for perf” with a 3-bullet better plan.

---

## 11. Answer key

1. Example: SLI = login duration; SLO = p95 &lt; 300 ms / week.  
2. Throughput · latency · load.  
3. `{ vus:5, duration:'30s', thresholds:{ http_req_duration:['p(95)<400'] } }`.  
4. E2E ≠ capacity under load.  
5. **900**.  

**C1.** Tail risk at p99 — investigate outliers if that cohort matters.  
**C2.** e.g. 99.9% of `GET /home` &lt; 400 ms over 30 days.  
**C3.** Keep E2E for journeys; add k6 + thresholds; report p95/errors.

---

## 12. Where to go next

- [k6 docs](https://k6.io/docs/) · [Google SRE — SLOs](https://sre.google/sre-book/service-level-objectives/)  
- Sibling kits: JE · Playwright · API & Data · Strategy  

<div class="cert">
<h2>🏆 Certificate</h2>
<p>Open <strong>Perf_basics_part1_study_app.html</strong>, mark all sections complete, and unlock the optional certificate there.</p>
</div>

<div class="footer">Perf Basics · Part 1 · Automation Tester Path</div>

<!--P1I-END-->
