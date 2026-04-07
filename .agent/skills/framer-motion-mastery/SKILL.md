---
name: framer-motion-mastery
description: Advanced Animation skill for high-fidelity SVG path drawing and spring-physics micro-interactions.
---

# Framer Motion Mastery

## Philosophy
Treat animation as a first-class feature for high-end SaaS interaction design. Every movement should feel deliberate, weighted, and smooth.

## Guidelines

### 1. Spring Physics First
- **Avoid Duration-based eases**: Use `type: "spring"` for everything interactive (hover, click, modal).
- **Recommended Stiff Spring**: `{ stiffness: 260, damping: 20 }` for crisp reaction.
- **Recommended Soft Spring**: `{ stiffness: 100, damping: 10 }` for playful, bouncy elements.

### 2. SVG Path Animation
- **`pathLength` mastery**: Use `initial={{ pathLength: 0 }}` and `animate={{ pathLength: 1 }}` for path-drawing effects.
- **Viewport Triggers**: Use `whileInView` for paths that "draw" as they come into the user's scroll.
- **Stroke Transitions**: Smoothly animate `strokeWidth` and `stroke` color between states.

### 3. Layout Transitions
- **`layoutId` Magic**: Use `layoutId` for smooth transitions when components move between containers.
- **Layout Animations**: Apply `layout` to elements that change size or position dynamically.

### 4. Micro-interactions
- **The "Depress" Effect**: `whileTap={{ y: 2 }}` and `whileHover={{ y: -2 }}` for tactile buttons.
- **Pulse Indicators**: Animate `scale: [1, 1.2, 1]` and `opacity: [0.5, 0, 0.5]` for active focal points.

### 5. Best Practices
- **`AnimatePresence`**: Use it for enter/exit animations (e.g., modals, popovers).
- **Reduced Motion**: Respect system settings (`useReducedMotion` hook).
- **Performance**: Use `transform` and `opacity` for 60fps smoothness. Avoid animating `width`, `height`, or `top/left/right/bottom` if possible.

## Use Cases
- High-fidelity Magazine Page Flips.
- Interactive Model Selector transitions.
- Smooth catalog grid entry animations.
- Hover-based detail reveals on product cards.
