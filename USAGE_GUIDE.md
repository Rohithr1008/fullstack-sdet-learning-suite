# 📖 File Usage Guide — Where & How to Use Every File

> **Workspace Location:** `C:\Users\rohit\Documents\learning-projects\`  
> **Master Live Launchpad:** [https://rohithr1008.github.io/fullstack-sdet-learning-suite/](https://rohithr1008.github.io/fullstack-sdet-learning-suite/)

---

## 📌 Summary: Which File Type to Use Where?

| File Extension / Pattern | Primary Environment | Recommended Tool | Purpose & Usage |
|---|---|---|---|
| **`*_study_app.html`** | 🌐 Web / Offline | Web Browser (Chrome/Edge) or Live Demo | **Primary Study Material.** Full interactive lessons with Focus Mode, Pomodoro timers, Spaced Repetition flashcards, and progress tracking. |
| **`*.interactive.md`** | 💻 VS Code Local | VS Code (`Ctrl + Shift + V`) | **VS Code Interactive Notes.** Markdown notes with embedded HTML quiz cards designed specifically for VS Code's Markdown Preview extension. |
| **`index.html`** | 🌐 Web / Offline | Web Browser / GitHub Pages | **Master Launchpad Dashboard.** Central entry point linking all 16 projects and 42 study apps. |
| **`learning_roadmap.html`** | 🌐 Web / Offline | Web Browser / GitHub Pages | **Visual Learning Flowchart.** Rendered interactive Mermaid diagram showing your 6-phase learning sequence. |
| **`README.md`** | 🐙 GitHub | GitHub Web / VS Code | **Project Overview.** Standard GitHub repo description and links. |
| **`HANDOFF.md`** | 🤖 AI Assistant | VS Code / AI Prompt | **Session Transition Guide.** Context guide for AI assistants across chat sessions. |

---

## 🛠️ Detailed Usage Scenarios

### Scenario 1: Daily Study & Learning Lessons
* **Best File to Use:** `*_study_app.html` files
* **How to open:**
  - **Option A (Web):** Open [Live Demo Website](https://rohithr1008.github.io/fullstack-sdet-learning-suite/) in Chrome/Edge and click any project link.
  - **Option B (Offline):** Double-click any `*_study_app.html` file inside project subfolders on your computer to open in your browser.

---

### Scenario 2: Reading Notes inside VS Code
* **Best File to Use:** `*.interactive.md` files
* **How to open:**
  1. Open VS Code in `C:\Users\rohit\Documents\learning-projects`.
  2. Open any `.interactive.md` file (e.g. `Html_css_essentials_part1_interactive.md`).
  3. Press **`Ctrl` + `Shift` + `V`** (or click the preview icon in the top right corner of VS Code).
  *The embedded `<style>` tags will render custom card boxes inside VS Code.*

---

### Scenario 3: Hands-on Coding & Running Tests
* **Best Files to Use:** Project source code files (`src/`, `server/`, `tests/`)
* **How to open & run:**
  1. Open VS Code in the project directory (e.g. `automation-portfolio`).
  2. Open terminal in VS Code (`Ctrl` + `` ` ``).
  3. Run local server: `npm start` or `npm run dev`.
  4. Run automated tests: `npx playwright test`.

---

### Scenario 4: Switching AI Models or Starting a New Chat Session
* **Best Files to Use:** `HANDOFF.md` and `.agents/skills/learning-suite-manager/SKILL.md`
* **What happens:**
  - Any AI assistant (Gemini, Claude, GPT) opening this workspace will automatically read `AGENTS.md` and `HANDOFF.md` to pick up 100% of the project context, audit findings, and guidelines.
