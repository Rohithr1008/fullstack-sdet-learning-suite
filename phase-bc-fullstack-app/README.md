# Phase B & C Full-Stack Capstone App

A modern full-stack web application combining **Phase B** (TypeScript Express API + Playwright E2E/API test suite) and **Phase C** (React + Vite, CSS Advanced design tokens/motion, WCAG accessibility, and visual snapshot testing).

---

## Architecture Overview

* **Backend (`/server`)**: Node.js + Express REST API written in strict TypeScript.
* **Frontend (`/src`)**: React 18 + Vite client built with CSS Custom Property design tokens, smooth GPU-composited motion, dark mode theme engine, and accessibility controls.
* **Test Suite (`/tests`)**: Automated Playwright test suite covering:
  - API endpoint testing (`tests/api.spec.ts`)
  - End-to-end UI user journey testing (`tests/e2e.spec.ts`)
  - Automated WCAG accessibility scans with `@axe-core/playwright` (`tests/a11y.spec.ts`)

---

## Commands & Development Workflow

```bash
# 1. Install dependencies
npm install

# 2. Run backend API server (Port 3001)
npm run dev:server

# 3. Run frontend Vite dev server (Port 3000)
npm run dev:client

# 4. Build production bundle & compile TypeScript
npm run build

# 5. Execute Playwright automated test suite
npm run test
```
