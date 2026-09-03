# Automation Tester Path — ROADMAP

Short execution plan. Not a curriculum essay.

---

## Phase A (automation)

Ship / study order for the core automation path:

1. **JE 1–5** — JavaScript Essentials Parts 1–5  
2. **HTML & CSS Essentials Part 1** — before Playwright (DOM/layout literacy)  
3. **TypeScript for Testers** — thin kit (test-oriented TS only)  
4. **Playwright Essentials** — strategy + E2E  
5. **JE 6 → API & Data → Perf → automation-portfolio** — harden, deepen, show work  

> **Note:** Thin TS ≠ enough for TS-only develop jobs. Use Phase B for that.

---

## Phase B (develop + test)

After Phase A (or in parallel once Part 1 HTML/CSS + thin TS exist):

6. **HTML & CSS Parts 2–3** — deeper front-end literacy  
7. **TypeScript Develop + Test** ✅ — app + tests in TypeScript ([`../typescript-develop-test/`](../typescript-develop-test/))

| Part | Focus |
|---|---|
| 1 | Deeper TypeScript — modules, async, generics, strict tsconfig |
| 2 | TaskBoard mini-app — Express + TS API + vanilla UI |
| 3 | Playwright in TS — E2E + API tests + CI |

---

## Phase C (front-end depth ✅)

After Phase B (or css-advanced in parallel with late Phase B):

8. **CSS Advanced** ✅ · animations, transforms, variables, tokens intro  
9. **React Essentials** ✅ · components, hooks light, styling (CSS Modules, Tailwind overview)  
10. **Figma to Dev** ✅ · handoff, inspect, Code Connect concept  

| Kit | Focus | When | Status |
|---|---|---|---|
| [`css-advanced`](../css-advanced/) | Motion, transforms, CSS variables, preprocessors light, design tokens intro | After Phase B | BUILT ✅ |
| [`react-essentials`](../react-essentials/) | React basics, components, hooks light, styling | After Phase B | BUILT ✅ |
| [`figma-to-dev`](../figma-to-dev/) | Design handoff, spacing/tokens, inspect, Code Connect light | After React or parallel | BUILT ✅ |

> **React over Vue** for this path — more job ads. Vue = optional future sibling stub, not Phase C priority.

**Study order:** css-advanced → react-essentials → figma-to-dev.  
Parallel OK: css-advanced while finishing TypeScript Develop + Test Part 3.

---

## Multi-agent workstreams (this sprint)

| WS | Scope | Status |
|---|---|---|
| **WS1** | `html-css-essentials` | Parts 1–3, three editions, hub |
| **WS2** | `typescript-for-testers` | Thin kit ✅ |
| **WS3** | Path docs + Phase B/C kits | ROADMAP / README / START_HERE ✅ · `typescript-develop-test` **built** ✅ · Phase C **built** ✅ |

---

## Reminder

- Phase A = automation hire path.  
- Phase B = develop+test / stronger FE+TS.  
- Phase C = deeper CSS + React + optional design handoff (**stubs** — build later).  
- Thin TS kit alone does **not** qualify someone for TS-only develop roles.
