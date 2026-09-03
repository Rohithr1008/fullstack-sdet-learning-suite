---
name: learning-suite-manager
description: >-
  Guide and context repository for maintaining, auditing, and enhancing the 16 learning projects
  in the learning-projects folder (Full Stack Dev + SDET path). Use when working on content updates,
  ADHD/autism accessibility enhancements, or structural additions across the suite.
---

# Learning Suite Manager & Curriculum Guide

This skill provides full context, architecture details, audit findings, roadmap references, and enhancement guidelines for the **16 learning projects** located in `C:\Users\rohit\Documents\learning-projects`.

---

## 📌 Workspace & Directory Structure

Location: `C:\Users\rohit\Documents\learning-projects\`  
Master Roadmap: [learning_roadmap.html](file:///C:/Users/rohit/Documents/learning-projects/learning_roadmap.html)

| # | Folder Name | Type | Key Content / Target Role | Re-Audit Status |
|---|---|---|---|---|
| 1 | `javascript-essentials` | Study App (3 Parts) | JS Core, Async, DOM, Visualizers (Memory, Scope, Event Loop), Sandbox | 🟢 100% Verified |
| 2 | `typescript-for-testers` | Study App (2 Parts) | TS Types, Interfaces, TS for Playwright/Vitest, JS→TS Migration | 🟢 100% Verified |
| 3 | `automation-tester-path` | Career Roadmap | Roadmap for SDET/Automation Path, Testing Pyramid, Strategy | 🟢 100% Verified |
| 4 | `html-css-essentials` | Study App (3 Parts) | HTML/CSS Foundations, A11y, DevTools, Playwright Locators | 🟢 100% Verified |
| 5 | `css-advanced` | Study App (3 Parts) | Motion/Transforms, Selectors, Grid/Subgrid, Design Tokens | 🟢 100% Verified |
| 6 | `figma-to-dev` | Study App (1 Part) | Auto Layout → Flexbox, Design Token Mapping, Dev Mode | 🟢 100% Verified |
| 7 | `git-essentials` | Study App (3 Parts) | Version Control, Git CLI, Staging, Commits, Branching, Remotes, PRs | 🟢 100% Verified |
| 8 | `database-essentials` | Study App (3 Parts) | Relational DBs, SQL Queries, Joins, Schema Normalization, ORMs | 🟢 100% Verified |
| 9 | `playwright-essentials` | Study App (3 Parts) | Playwright E2E, Locators, Network Interception, Visual Regression, CI | 🟢 100% Verified |
| 10 | `api-data-essentials` | Study App + Mock Server | REST, HTTP, Auth Tokens, JSON Schema, k6 Load Testing | 🟢 100% Verified |
| 11 | `perf-basics` | Study App (3 Parts) | Core Web Vitals (LCP, INP, CLS), Lighthouse, DevTools Perf, k6 | 🟢 100% Verified |
| 12 | `node-express-essentials` | Study App (3 Parts) | Node Event Loop, Express Routing, Controllers, JWT Auth, Security | 🟢 100% Verified |
| 13 | `react-essentials` | Study App (3 Parts) | JSX, Components, Props, Hooks (useState, useEffect), RTL/Vitest | 🟢 100% Verified |
| 14 | `typescript-develop-test` | Study App + Real App | TS Build Tooling, Express+TS Server, POM Playwright E2E/API | 🟢 100% Verified |
| 15 | `automation-portfolio` | Capstone + Study App | Task Board App + Architecture & Test Suite Walkthrough | 🟢 100% Verified |
| 16 | `phase-bc-fullstack-app` | Capstone + Study App | React + Express App + Full-Stack Architecture Companion | 🟢 100% Verified |

---

## 🗺️ Custom Learning Path Sequence (6 Phases)

1. **Phase 1: JS & Tester Foundations** (`javascript-essentials` → `typescript-for-testers` → `automation-tester-path`)
2. **Phase 2: HTML, CSS & Design Basics** (`html-css-essentials` → `css-advanced` → `figma-to-dev`)
3. **Phase 3: Core Version Control & Data** (`git-essentials` → `database-essentials`)
4. **Phase 4: Test Automation & Performance** (`playwright-essentials` → `api-data-essentials` → `perf-basics`)
5. **Phase 5: Full Stack Development & Advanced Loops** (`node-express-essentials` → `react-essentials` → `typescript-develop-test`)
6. **Phase 6: Capstones** (`automation-portfolio` → `phase-bc-fullstack-app`)

---

## 💡 Protocol for Any Agent / Model Working on This Suite
1. **Always read `learning_roadmap.html` and `fixes_summary.md`** for full context.
2. **Preserve `localStorage` keys:** Always keep existing key formats (`p1-sec-1`, `sr-box-state`, etc.).
3. **Maintain Standalone Portability:** Study apps must work completely offline without relying on external CDN scripts.
