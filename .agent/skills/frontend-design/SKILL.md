---
name: frontend-design
description: Guidelines for high-end, professional-grade user interface design and aesthetics.
---

# Frontend Design

## Core Philosophy
Avoid "AI-default" aesthetics (e.g., standard Inter font, purple-to-blue gradients, generic cards). Push for distinctive, world-class designs that look like they were built by a lead designer at a top startup.

## Guidelines

### 1. Typography
- **Don't use browser defaults**: Choose fonts that have personality (e.g., Outfit, Roboto, or Space Grotesk).
- **Hierarchy is King**: Use intentional, large font-size steps to create a clear reading path.
- **Bold Choices**: Don't be afraid of `font-black` (900) for headers to create impact.

### 2. Color Systems
- **Vibrant & Purposeful**: Use high-saturation colors only for accents.
- **Surface Layering**: Use background colors like `bg-slate-50` or `bg-zinc-50` to create a "depth" hierarchy for cards.
- **Accent Glows**: Use subtle inner-glows and shadows to make elements feel physical.

### 3. Layout & Spacing
- **Editorial Layouts**: Use magazine-style grids for Landing and Lookbook pages.
- **Dynamic Padding**: Ensure mobile and desktop have distinct, optimized padding systems.
- **Museum Aesthetic**: Prefer large white space and high-contrast typography for a premium Feel.

### 4. Interactive Motion
- **Micro-animations**: Every hover, tap, and transition should feel alive.
- **Physics-based Transitions**: Use spring physics (`framer-motion`) rather than linear eases.
- **State Changes**: When a node is clicked, it should provide tactile visual feedback (e.g., the 3D 'depress' effect).

## Execution Rules
- **CSS Variables**: Always use them for consistency.
- **Component Hygiene**: One concern per component.
- **High-End Polish**: Final check for 1px borders, subtle gradients, and rounded corner harmony.
