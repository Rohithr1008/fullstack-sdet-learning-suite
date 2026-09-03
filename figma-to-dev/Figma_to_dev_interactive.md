# Figma to Dev — Part 1: Handoff & Dev Mode (Interactive Edition)

> **Module:** Figma to Dev · **Part:** 1 of 1 (Mini Kit)  
> **Interactive Preview:** Open in VS Code (Ctrl+Shift+V / Cmd+Shift+V)

---

## Interactive Quiz & Knowledge Check

### Section 1: Figma Layout Concepts

- [ ] **Q1:** Which Figma feature corresponds directly to CSS Flexbox layout properties?
  - A) Constraints
  - B) Auto Layout
  - C) Vector Networks
  - D) Smart Animate
  *(Answer: B — Auto Layout manages direction, gap, and padding like CSS Flexbox).*

- [ ] **Q2:** How are component state variations (such as Hover, Active, or Disabled) represented in Figma component libraries?
  - A) Separate independent files
  - B) Component Variants
  - C) Mask Layers
  - D) Text Styles
  *(Answer: B — Component Variants group different state styles under a single component family).*

---

### Section 2: Design Tokens & Handoff

- [ ] **Q3:** Why should developers map Figma design variables to CSS Custom Properties rather than copying hardcoded hex values?
  - A) Hex values do not work in modern browsers.
  - B) Custom properties enable central theme management and prevent design system drift.
  - C) CSS Custom Properties speed up initial page load by 50%.
  - D) Hardcoded hex values are invalid in CSS.
  *(Answer: B — Custom properties maintain design token alignment across design and code).*

---

## Design-to-Code Audit Checklist

- [ ] 1. Verify component variants against Playwright visual screenshot assertions (`toHaveScreenshot()`).
- [ ] 2. Audit focus ring visibility and touch target sizes (minimum 44x44px for mobile targets).
