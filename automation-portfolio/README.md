# TaskBoard — automation portfolio

Small **real** app used to show job-ready automation skills: UI + API + Playwright tests + GitHub Actions CI with HTML report artifacts.

Complements the [Automation Tester Path](../automation-tester-path/) study kits (those teach; this is the portfolio piece). After Phase B, learners build similar skills in [`typescript-develop-test`](../typescript-develop-test/) — this repo is the hire-ready packaging of that pattern.

### Path

| | |
|---|---|
| **Umbrella** | [Automation Tester Path](../automation-tester-path/README.md) · [`START_HERE`](../automation-tester-path/START_HERE.md) |
| **Roadmap** | Phase A/B + workstreams → [`../automation-tester-path/ROADMAP.md`](../automation-tester-path/ROADMAP.md) |
| **Role** | Show the work after the study kits (not a curriculum) |

---

## TL;DR

1. `npm install`
2. `npm start` → open http://localhost:4173 (login `demo` / `demo123`)
3. `npm test` → Playwright E2E + API tests (starts the server for you)
4. `npm run test:report` → open the HTML report

---

## CI badge

Once the repo is on GitHub:

[![CI](https://github.com/Rohithr1008/automation-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Rohithr1008/automation-portfolio/actions/workflows/ci.yml)

---

## What's included

| Piece | What it is |
| --- | --- |
| Web app | Vanilla TaskBoard UI (login, list, add, update status, delete) |
| API | Express + in-memory store; Bearer token auth; seeded data |
| E2E tests | Playwright: login, CRUD happy path, bad-password negative |
| API tests | Playwright `request`: status codes, auth header, create/list, 401/404 |
| CI | GitHub Actions: install → test → upload HTML report + JUnit |

---

## Skills demonstrated

- End-to-end testing with Playwright (browser + locators + assertions)
- API testing (auth headers, CRUD, negative 401/404)
- Testable app design (deterministic seed data, stable selectors)
- CI: fail on red tests, publish Playwright HTML report as an artifact
- Basic auth flow (login → token → protected routes)

---

## Run locally

**App only**

```bash
npm install
npm start
```

Open http://localhost:4173 — demo user `demo` / `demo123`.

**Tests** (Playwright starts the server via `webServer`)

```bash
npm install
npx playwright install chromium
npm test
```

Useful scripts:

- `npm run test:e2e` — browser tests only
- `npm run test:api` — API tests only
- `npm run test:report` — open last HTML report

---

## API cheat sheet

| Method | Path | Auth | Notes |
| --- | --- | --- | --- |
| GET | `/api/health` | no | liveness |
| POST | `/api/login` | no | `{ username, password }` → token |
| GET/POST | `/api/tasks` | Bearer | list / create |
| GET/PATCH/DELETE | `/api/tasks/:id` | Bearer | read / update / delete |

Seed tasks reset whenever the server process starts.

---

## Quick path

See [START_HERE.md](START_HERE.md) for a short numbered checklist.

---

## License

MIT — demo project for portfolio / learning use.
