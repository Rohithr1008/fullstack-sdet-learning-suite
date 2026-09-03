# TypeScript for Testers — Part 1 (Planning)

Thin **basics** part: why TS in automation + types/interfaces/unions/optional. Pedagogy mirrors Perf Basics / JE three-edition format.

## Sections (10)

1. **Why TypeScript in automation** — catch wrong args before CI; safer refactors of helpers/POM
2. **Primitive types & annotations** — `string`, `number`, `boolean`, `void`; annotate params/returns
3. **Interfaces** — shape of page data, API fixtures, locator options objects
4. **Unions** — `'pass' | 'fail' | 'skip'`; status codes you care about
5. **Optional properties** — `timeout?`, `strict?`; `| undefined` vs `?`
6. **Type aliases (light)** — `type` vs `interface` rule of thumb for testers
7. **Common pitfalls** — `any` spam, over-typing DOM, ignoring errors
8. **Practice exercises** — annotate helpers; tiny JS→TS warm-up
9. **Challenges** — pure type-shape drills
10. **Answer key**

## Editions

| File | Purpose |
|------|---------|
| `Typescript_for_testers_part1_with_examples.md` | Plain |
| `Typescript_for_testers_part1_interactive.md` | Interactive MD |
| `Typescript_for_testers_part1_study_app.html` | Study app |

## Out of scope (Part 1)

- Generics deep-dives, decorators, advanced mapped types
- Full app architecture — Phase B (`typescript-develop-test`)
- Playwright config / POM — Part 2
