# React Essentials — ROADMAP

**Status:** STUB — section outlines only.

Short execution plan. Not a curriculum essay.

---

## Goal

Give develop+test learners a **calm first React kit**: components, light hooks, and styling choices — enough to read job codebases and pair with design handoff.

## Audience

- Completed Phase B ([`typescript-develop-test`](../typescript-develop-test/))  
- Comfortable with HTML/CSS + TS; no prior React required  

---

## Parts (planned)

### Part 1 — Components & JSX

- Why React on this path (vs vanilla TaskBoard)  
- JSX rules, fragments, conditional render  
- Props, children, composition  
- Lists, keys, small component tree lab  

### Part 2 — State & hooks (light)

- `useState`, controlled inputs  
- `useEffect` — fetch on mount, cleanup habits  
- Lifting state, prop drilling vs context (mention only)  
- Lab: extend TaskBoard-style UI in React (read-only or CRUD light)  

### Part 3 — Styling

- CSS Modules in a Vite/React app  
- Tailwind overview — utility-first tradeoffs  
- a11y in components (labels, focus)  
- Where tests live — link Playwright component/E2E docs, don’t duplicate  

---

## Deliverables (when built)

| Artifact | Role |
|---|---|
| `React_essentials_partN_with_examples.md` | Plain / print |
| `React_essentials_partN_interactive.md` | VS Code preview |
| `React_essentials_partN_study_app.html` | Offline app |
| Sample Vite app (Part 2+) | Runnable labs |
| `index.html` | Hub |

---

## Out of scope

- Next.js App Router deep dive  
- State libraries (Redux, Zustand) beyond a footnote  
- Vue — deferred; see HANDOFF footnote  

---

*Phase C · STUB — build later.*
