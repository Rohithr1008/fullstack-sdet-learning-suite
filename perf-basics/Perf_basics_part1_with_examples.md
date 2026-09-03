# Perf Basics — Part 1

A thin study guide for **performance literacy**: SLIs/SLOs, one k6 script, reading p95, and when perf ≠ functional E2E.

> 💡 **Study guide (plain edition):** quizzes are simple Q&A lists, glossary is open text, answers shown openly — no HTML. For the clickable version see `Perf_basics_part1_interactive.md`. For progress + certificate see `Perf_basics_part1_study_app.html`.

---

### 🗺 Your path — where Perf Basics fits

```
JE (JS/MERN) → Strategy → Playwright (E2E) → API & Data → Perf Basics (you are here)
                                                      ↘ JE Part 6 unit/CI (sibling)
```

You are here: **Perf Basics — Part 1** (single-part kit). This is literacy, not a full SRE career.

---

## Table of Contents

1. [What performance testing is (and isn't)](#1-what-performance-testing-is-and-isnt)
2. [SLIs & SLOs in plain language](#2-slis--slos-in-plain-language)
3. [Latency, throughput, and load](#3-latency-throughput-and-load)
4. [k6 hello-world](#4-k6-hello-world)
5. [Interpreting p95](#5-interpreting-p95)
6. [When perf ≠ functional E2E](#6-when-perf--functional-e2e)
7. [Glossary](#7-glossary)
8. [Common pitfalls](#8-common-pitfalls)
9. [Practice exercises](#9-practice-exercises)
10. [Challenges](#10-challenges)
11. [Answer key](#11-answer-key)
12. [Where to go next](#12-where-to-go-next)

**📈 Your progress** — tick as you go:

- [ ] Sections 1–3 (goals & numbers)
- [ ] Sections 4–6 (k6 + p95 + E2E boundary)
- [ ] Section 7–8 (glossary + pitfalls)
- [ ] Practice + challenges attempted
- [ ] Answers checked

---

## 1. What performance testing is (and isn't)

> 🚩 **Why it matters:** teams often say “we have tests” when they only have functional E2E. Perf answers a different question: *does it stay fast and stable under expected traffic?*

**Performance testing** checks whether a system meets **speed and capacity goals** under a defined load.

It is **not**:

- Proving every button works (that's functional / E2E)
- A substitute for unit tests
- “Open DevTools once and look at Network” as a full strategy (useful smoke, not load)

| Question | Tool family |
|---|---|
| Does the user journey work? | Playwright / functional E2E |
| Is the API contract right? | API tests |
| Can we handle N users / stay under X ms? | k6 / load tools |

### Real-world anchor

Checkout works for one QA engineer in a quiet staging env. Black Friday adds 50× traffic. Functional E2E still green; checkout p95 balloons to 8s and carts abandon. Perf would have caught the capacity gap.

### 🧪 Quiz

1. Can a suite of green Playwright tests guarantee your API stays under 300 ms at 200 RPS?  
   **Answer:** No — they don't generate that load (and shouldn't).
2. Name one question perf testing answers that unit tests don't.  
   **Answer:** How latency/error rate behave under concurrent load.

---

## 2. SLIs & SLOs in plain language

> 🚩 **Why it matters:** without a goal, “is it slow?” is endless opinion. SLIs/SLOs turn feelings into measurable agreements.

| Term | Plain meaning | Example |
|---|---|---|
| **SLI** (Service Level Indicator) | The thing you *measure* | HTTP request duration; error rate |
| **SLO** (Service Level Objective) | The *target* for that indicator | p95 latency &lt; 300 ms over 30 days |
| **SLA** (Agreement) | Contract with customers (often legal) | Credits if uptime &lt; 99.9% |

**Rule of thumb:** pick a few user-facing SLIs. Don't invent 40 dashboards before you have one clear SLO.

### Tiny example

- **SLI:** `http_req_duration` for `POST /checkout`  
- **SLO:** 95% of requests finish in under 400 ms during peak hours  
- **Action if broken:** investigate DB pool / slow query — not “add more E2E tests”

### 🧪 Quiz

1. SLI or SLO: “p95 &lt; 500 ms”? **Answer:** SLO (target).  
2. SLI or SLO: “request duration in milliseconds”? **Answer:** SLI (what you measure).

---

## 3. Latency, throughput, and load

> 🚩 **Why it matters:** people mix “slow” with “can't handle traffic.” Different numbers, different fixes.

| Concept | Means | Typical unit |
|---|---|---|
| **Latency** | How long one request takes | ms |
| **Throughput** | How many requests succeed per time | RPS (requests/sec) |
| **Load / concurrency** | How many users/scripts run at once | VUs (virtual users) |

Raising VUs without watching error rate and latency is how you accidentally DDoS your own staging box.

### 🧪 Quiz

1. 1000 RPS with 50 ms p95 — is that “slow”? **Answer:** Usually no — high throughput + low latency is healthy.  
2. 5 RPS with 4 s p95 — problem? **Answer:** Yes — low traffic but terrible latency.

---

## 4. k6 hello-world

> 🚩 **Why it matters:** reading about load tools teaches nothing until you run one script and see a results table.

Install: see [k6 installation docs](https://k6.io/docs/get-started/installation/).

Lab file in this kit: `labs/hello.js`

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
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}
```

Run:

```bash
k6 run labs/hello.js
```

**What to look for in the output:**

- `checks` — did status===200 hold?
- `http_req_duration` — avg, med, p(90), p(95)
- `thresholds` — pass/fail against your goals

> Never point an early script at production. Use `test.k6.io`, mocks, or a dedicated non-prod env.

### 🧪 Quiz

1. What does `vus: 1` mean? **Answer:** One virtual user (concurrent script instance).  
2. What fails the run if p95 is 800 ms and threshold is `p(95)<500`? **Answer:** The `http_req_duration` threshold.

---

## 5. Interpreting p95

> 🚩 **Why it matters:** averages hide pain. Users live in the tail.

Imagine 100 request times (ms): ninety are ~100 ms, ten are ~2000 ms.

| Stat | Rough value | Feels like |
|---|---|---|
| Mean (avg) | ~290 ms | “Pretty ok?” |
| Median (p50) | ~100 ms | Most users fine |
| **p95** | ~2000 ms | 1 in 20 users wait ~2s |

**p95** = 95% of requests were *faster* than this number; 5% were slower (or equal).

**Why teams use p95/p99:** product owners care about the slow minority who abandon carts — not the happy average.

### Predict

Sample: times = `[80, 90, 100, 110, 120, 900]`. Is p95 closer to 120 or 900?  
**Answer:** Closer to **900** (the tail). Mean is dragged up too, but p95 specifically flags that long request.

### 🧪 Quiz

1. If mean is fine but p95 is terrible, what's going on? **Answer:** A small % of requests are very slow (outliers / tail latency).  
2. Should an SLO usually be on mean or p95? **Answer:** Prefer percentile (p95/p99) for user-facing latency.

---

## 6. When perf ≠ functional E2E

> 🚩 **Why it matters:** using Playwright to “load test” burns CI minutes, flakes, and still doesn't model real concurrency well.

| Goal | Prefer | Avoid |
|---|---|---|
| User journey correctness | Playwright E2E | Generating 500 browsers for “load” |
| API latency under N VUs | k6 / Gatling / etc. | Clicking through UI 500 times |
| One smoke timing on critical path | Light E2E or synthetic check | Calling it a full perf program |

**Honest split:**

- **Functional E2E** → “Does checkout work?”  
- **Perf** → “Does checkout stay under SLO when 200 VUs hit the APIs?”

They complement each other. Neither replaces the other.

### 🧪 Quiz

1. Your boss asks for “perf tests” and you only have Playwright. What's the risk? **Answer:** You may only measure UI timing for a few users — not capacity.  
2. Can k6 replace all E2E? **Answer:** No — it won't click the SPA like a user unless you invest heavily; keep E2E for journeys.

---

## 7. Glossary

> 🚩 **Why it matters:** interviews and standups use these words loosely. Shared definitions prevent false confidence.

| Term | Meaning |
|---|---|
| **SLI** | Metric you measure (latency, error rate, availability) |
| **SLO** | Target on an SLI (e.g. p95 &lt; 300 ms) |
| **SLA** | External/contractual commitment (often with penalties) |
| **VU** | Virtual user — concurrent executor in a load tool |
| **RPS** | Requests per second (throughput) |
| **Latency** | Time to complete a request |
| **Throughput** | Successful work per unit time |
| **Check** (k6) | Pass/fail assertion on a response (doesn't stop VUs by itself) |
| **Threshold** | Pass/fail gate on aggregated metrics (can fail the run) |
| **p95 / p99** | 95th / 99th percentile of a distribution |
| **Tail latency** | The slow end of the distribution |
| **Soak / spike / stress** | Longer, sudden, or beyond-limit load patterns (learn later) |

---

## 8. Common pitfalls

> 🚩 **Why it matters:** bad perf tests create false green or real outages.

1. **Load-testing production by accident** — always confirm URL/env.  
2. **Tiny sample sizes** — 12 requests ≠ a p95 you can trust.  
3. **Only reporting the mean** — hides the painful 5%.  
4. **Using E2E browsers as a load generator** — expensive and unrealistic.  
5. **No SLO before scripting** — you'll tune forever with no “done.”  
6. **Ignoring errors while celebrating RPS** — high throughput with 40% failures is not a win.  
7. **Warm cache only** — first-hit vs steady-state differ; say which you measured.

### 🧪 Quiz

1. Why is “avg 120 ms” alone a weak status report? **Answer:** Tail (p95/p99) and errors can still be bad.  
2. Name one env safety habit. **Answer:** Non-prod targets; explicit base URL; peer review of scripts.

---

## 9. Practice exercises

<span class="badge">🟢 easy</span> · ~15–20 min

1. Write one SLI and one SLO for a login API in plain sentences.  
2. Label each: (a) 250 RPS (b) 180 ms p95 (c) 50 VUs — throughput, latency, or load?  
3. Sketch (on paper) a k6 `options` block with 5 VUs for 30s and a p95 threshold of 400 ms.  
4. Explain to a friend why Playwright green ≠ Black Friday ready.  
5. Given times `[50,55,60,60,70,80,90,200,800,900]`, which feels closer to p95 — 90 or 900?

---

## 10. Challenges

<span class="badge">🟡 medium</span>

**C1.** A report shows: avg 90 ms, p95 90 ms, p99 2.5 s, error rate 0%. What do you tell the product owner?

**C2.** Rewrite this bad goal into an SLO: “The site should feel fast.”

**C3.** Your team wants 1000 Playwright workers in CI “for perf.” Propose a better plan in 3 bullets.

---

## 11. Answer key

**Practice**

1. Example: SLI = login HTTP duration; SLO = p95 &lt; 300 ms over a rolling week.  
2. (a) throughput (b) latency (c) load/concurrency.  
3. Example: `{ vus: 5, duration: '30s', thresholds: { http_req_duration: ['p(95)<400'] } }`.  
4. E2E checks journeys for few users; not capacity/SLO under load.  
5. Closer to **900** (high percentile sits in the tail).

**Challenges**

**C1.** Most users are fine, but ~1% are terrible (p99). Ask whether that cohort matters (checkout, mobile, region) and dig into slow outliers — don't declare victory on avg/p95 alone if p99 is a product risk.

**C2.** Example: “99.9% of `GET /home` requests complete in &lt; 400 ms over 30 days” (SLI implied = request duration).

**C3.** (1) Keep Playwright for critical journeys. (2) Add k6 (or similar) against APIs/staging with clear VUs + thresholds. (3) Report p95/error rate, not browser count.

---

## 12. Where to go next

> 🚩 **Why it matters:** this kit is literacy. Careers go deeper — know the map without pretending you're done.

**Deeper learning (link out):**

- [k6 docs](https://k6.io/docs/) — scenarios, executors, thresholds  
- [Google SRE book — Service Level Objectives](https://sre.google/sre-book/service-level-objectives/) — SLI/SLO/SLA thinking  
- Grafana / observability intros — metrics, traces, dashboards  

**Still out of this path's core claim:** full capacity engineering, chaos engineering careers, native mobile perf, enterprise Gatling certifications.

**Sibling kits:** JavaScript Essentials · Playwright Essentials · API & Data Essentials · Strategy module.

---

## 🎉 Congratulations

You can now: state an SLI/SLO in plain language, run a k6 hello-world, read a p95, and refuse to confuse functional E2E with load testing.

<!--P1-END-->
