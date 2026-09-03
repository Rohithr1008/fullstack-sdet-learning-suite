# TypeScript for Testers — Part 2 (Planning)

Thin **Playwright-oriented** part: tsconfig overview, Playwright+TS, light POM/helper annotations, JS→TS migrate lab.

## Sections (10)

1. **tsconfig for testers** — what `strict`, `target`, `module` mean in a test repo
2. **Playwright + TypeScript overview** — `.ts` specs, `@playwright/test` types, codegen tip
3. **Light POM annotations** — class fields, constructor `Page`, method returns
4. **Helper annotations** — assert helpers, wait helpers, fixture-shaped objects
5. **JS→TS migrate exercise** — `labs/migrate-before.js` → `labs/migrate-after.ts`
6. **Reading TS errors** — common red squiggles and what to change
7. **Common pitfalls** — typing Playwright internals, `as any`, fighting the compiler
8. **Practice**
9. **Challenges**
10. **Answer key + where next** (Playwright kit · Phase B Develop+Test)

## Lab

- `labs/migrate-before.js` — untyped helper
- `labs/migrate-after.ts` — same helper with interfaces + unions

## Out of scope

- Full Playwright series content (lives in `playwright-essentials`)
- Building production apps in TS (Phase B)
