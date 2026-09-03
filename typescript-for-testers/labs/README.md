# Labs — TypeScript for Testers

Tiny **JS → TS migrate** pair (Part 2 §5).

| File | Role |
|---|---|
| [`migrate-before.js`](migrate-before.js) | Untyped helpers |
| [`migrate-after.ts`](migrate-after.ts) | Same helpers with interface / union / optional |

**How to study:** open both side-by-side. Do not need a full Playwright project here.

Optional (if TypeScript is installed globally or via npx):

```bash
npx --yes -p typescript@5.6.3 tsc --noEmit --strict --target ES2020 --module commonjs labs/migrate-after.ts
```

(May warn about `module` settings — the point is reading the annotations, not shipping a build.)
