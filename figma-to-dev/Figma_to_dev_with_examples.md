# Figma to Dev — Part 1: Handoff & Dev Mode (Plain Edition)

> **Module:** Figma to Dev · **Part:** 1 of 1 (Mini Kit)  
> **Topic:** Figma Structures, Frames, Auto Layout, Components/Variants, Spacing Scales, Design Tokens, & Code Connect

---

## 1. Why Figma Literacy Matters for Developers & QA

Design handoff is the bridge between product design specifications and software execution. Understanding Figma enables developers and QA engineers to:
- Translate design tokens (spacing, typography, color styles) directly into CSS/React code.
- Verify UI component states against Figma Component Variants.
- Audit visual regressions and file high-quality, actionable visual bug reports.

---

## 2. Figma Anatomy & Mental Model

- **Frames**: The primary layout container in Figma (similar to `<div>` or `<section>` tags in HTML).
- **Auto Layout**: Figma's implementation of CSS Flexbox (controls direction, alignment, gap spacing, and padding).
- **Components & Variants**: Reusable UI elements with state variations (e.g. `Button` with variants: `Primary`, `Secondary`, `Hover`, `Disabled`).

---

## 3. Design Tokens & Inspect / Dev Mode

### Token Mapping
In Figma, colors, typography, and spacing are defined as Variables and Styles.

| Figma Variable | CSS Custom Property |
|---|---|
| `Color/Primary` | `--color-brand-primary: #1d4f91` |
| `Spacing/4` | `--space-4: 16px` |
| `Typography/Heading-MD` | `font-size: 1.25rem; font-weight: 700;` |

### Reading CSS Export in Dev Mode
Figma's Dev Mode exposes CSS box model properties. Always verify that exported absolute pixel values match responsive token variables before pasting into codebases.

---

## 4. Figma Code Connect Concept

Figma Code Connect bridges design components in Figma with actual codebase components (e.g. React components in Storybook or production repos), ensuring that Dev Mode displays live implementation code snippets alongside design specs.

---

## 5. QA & Developer Handoff Checklist

- [ ] **Typography**: Font family, size, line-height, and font-weight match token definitions.
- [ ] **Spacing & Padding**: Spacing scale (e.g. 4px / 8px grid) applied consistently.
- [ ] **Interactive States**: Hover, focus, active, disabled, and loading variants defined.
- [ ] **Responsive Frames**: Behavior on mobile, tablet, and desktop viewport breakpoints specified.
- [ ] **Accessibility (a11y)**: Color contrast ratio meets WCAG AA standards (4.5:1 minimum for normal text).
