# Full-Stack Infrastructure, Free Cloud Deployment, & CI/CD Testing Guide

> **Project:** Phase B & C Full-Stack Capstone App  
> **Stack:** Node.js + Express API (TS) | React 18 + Vite | Playwright E2E, API & WCAG A11y | GitHub Actions | Render / Vercel

---

## 1. Infrastructure Architecture & Environment Setup

When deploying a full-stack application with a separate Express API and React frontend:

```mermaid
graph TD
    Client[React Frontend<br/>Hosted on Vercel / Render Static] -->|REST API Requests<br/>(CORS Enabled)| API[Express API Server<br/>Hosted on Render Web Service]
    
    subgraph GitHub Actions CI/CD Pipeline
        Build[1. Compile TS & Build Bundle] --> Test[2. Run Playwright API, E2E & A11y]
        Test --> Deploy[3. Trigger Cloud Deployment]
        Deploy --> Smoke[4. Run Staging E2E Smoke Tests]
    end
```

---

## 2. Zero-Cost Free Cloud Deployment Steps

### Option A: Render (Recommended for Full-Stack)
Render provides free web service hosting for Node.js APIs and free static site hosting for Vite React frontends.

#### Step 1: Deploy Backend API (Express)
1. Push your repository to GitHub.
2. Sign in to [Render.com](https://render.com) and click **New +** $\rightarrow$ **Web Service**.
3. Connect your GitHub repository.
4. Set Configuration:
   - **Root Directory**: `phase-bc-fullstack-app`
   - **Build Command**: `npm install && npx tsc`
   - **Start Command**: `npm run dev:server` (or `node dist/server/index.js`)
   - **Environment Variable**: `PORT = 3001`
5. Click **Create Web Service**. Your API URL will be live at `https://<your-app-api>.onrender.com`.

#### Step 2: Deploy Frontend Client (React + Vite)
1. On Render.com, click **New +** $\rightarrow$ **Static Site**.
2. Connect the same GitHub repository.
3. Set Configuration:
   - **Root Directory**: `phase-bc-fullstack-app`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Environment Variable**: `VITE_API_URL = https://<your-app-api>.onrender.com`

---

## 3. GitHub Actions CI/CD Workflow (`.github/workflows/ci-cd.yml`)

Our repository includes a complete GitHub Actions CI/CD pipeline:

```yaml
name: Phase B & C Full-Stack CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci
        working-directory: phase-bc-fullstack-app

      - name: Build App & Compile TS
        run: npm run build
        working-directory: phase-bc-fullstack-app

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
        working-directory: phase-bc-fullstack-app

      - name: Run Full Playwright Test Suite (API, E2E, A11y)
        run: npm test
        working-directory: phase-bc-fullstack-app

      - name: Upload Test Report
        uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: playwright-report
          path: phase-bc-fullstack-app/playwright-report/
```

---

## 4. Testing Live Production / Staging Endpoints with Playwright

You can run your Playwright E2E suite against any live URL (e.g. Render staging server) without starting a local server:

```bash
# Run Playwright E2E tests against live free staging URL
PLAYWRIGHT_TEST_BASE_URL=https://phase-bc-fullstack-app.onrender.com npx playwright test
```

### Playwright Config Parameterization
In `playwright.config.ts`, Playwright respects the environment override:

```typescript
use: {
  baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000',
}
```

---

## 5. Summary of Dev & Test Pipeline Lifecycle

1. **Local Development**: Developer creates features & styling components in React/Express.
2. **Build Verification**: `npm run build` compiles TypeScript and creates optimized dist bundle.
3. **Local Automated Testing**: `npm test` launches Playwright running 16 API, E2E UI, and WCAG accessibility tests.
4. **Git Push**: Push triggers GitHub Actions CI.
5. **Continuous Deployment**: Render/Vercel pulls code on green build and deploys to production servers.
6. **Production Smoke Testing**: Automated Playwright run verifies live deployed staging/production URLs.
