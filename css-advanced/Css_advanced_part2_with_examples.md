# CSS Advanced — Part 2: Transforms & Layering (Plain Edition)

> **Module:** CSS Advanced · **Part:** 2 of 3  
> **Topic:** 2D/3D Transforms, `transform-origin`, Stacking Contexts (`z-index`), and Clipping/Masking

---

## 1. 2D & 3D Transforms

CSS `transform` allows elements to be translated, rotated, scaled, or skewed in 2D or 3D space without altering document layout flow.

```css
/* 2D Transformations */
.card-hover {
  transform: translate(10px, -5px) rotate(2deg) scale(1.05);
  transition: transform 0.3s ease;
}

/* 3D Transformations */
.card-perspective {
  perspective: 1000px;
}

.card-inner {
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
}

.card-perspective:hover .card-inner {
  transform: rotateY(180deg);
}
```

---

## 2. Understanding `transform-origin`

By default, elements transform around their visual center (`50% 50%`). You can shift the anchor point using `transform-origin`.

```css
.pin-top-left {
  transform-origin: top left; /* Or 0% 0% */
  transform: scale(1.2);
}
```

---

## 3. Stacking Contexts & `z-index` Sanity

`z-index` only works on positioned elements (`relative`, `absolute`, `fixed`, `sticky`) or elements inside a flex/grid container.

### What Creates a Stacking Context?
A new stacking context isolates `z-index` children from the rest of the document tree when an element has:
- `position: relative / absolute / fixed / sticky` with a non-`auto` `z-index`
- `opacity` less than `1`
- `transform` or `filter` property set
- `isolation: isolate` (Recommended for modal overlays and component isolation)

```css
/* Modal overlay backdrop isolation */
.modal-container {
  isolation: isolate;
  z-index: 1000;
}
```

---

## 4. Clipping & Masking

- **`clip-path`**: Shapes the visible area of an element (e.g. circles, polygons, SVG paths).
- **`mask` / `-webkit-mask`**: Uses an image or gradient alpha channel to control element visibility.

```css
/* Custom badge shape using clip-path */
.badge-ribbon {
  clip-path: polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%);
  background: #1d4f91;
  color: #fff;
  padding: 8px 16px;
}
```

---

## 5. Summary & Best Practices

1. Use `perspective` on parent containers to enable 3D card flips.
2. Use `isolation: isolate` to prevent `z-index` leakage across component boundaries.
3. Use `clip-path: polygon()` for crisp, responsive geometric element masks.
