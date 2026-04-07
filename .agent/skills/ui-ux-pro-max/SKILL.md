---
name: ui-ux-pro-max
description: Advanced Design Intelligence for high-end component design, bento grids, and refined color systems.
---

# UI/UX Pro Max

## Core Intelligence
Achieve "Design-Led" engineering by prioritizing visual hierarchy and cognitive load reduction.

## Guidelines

### 1. Bento Grid Principles
- **Asymmetric Balance**: Use grid-cols with varying spans (e.g., `col-span-1` and `col-span-2`) to create a modern "Bento" look.
- **Inner Corner Radius**: In a grid, child elements should have a slightly smaller corner radius than their parent containers for a premium, nested feel.
- **Glassmorphism**: Use `backdrop-blur` and high-transparency backgrounds (`bg-white/10`) for a futuristic feel.

### 2. High-Fidelity Colors
- **Depth-First Design**: Use background colors that suggest depth (e.g., a darker background and slightly lighter cards).
- **Secondary Actions**: Gray should have a tint of the brand color (e.g., if the brand is blue, use `slate` or `blue-gray`, not pure gray).
- **Interactive States**: Every button should have a "Depress" effect (moving y down by 2-4px) rather than just changing opacity.

### 3. Progressive Disclosure
- **Reveal on Interaction**: Only show complex details (e.g., progress numbers) on hover or click to keep the dashboard clean.
- **Skeleton Loading**: Use high-quality skeleton loaders that mimic the final component's actual geometry.

### 4. Polish Checklist
- **1px Borders**: Use subtle, semi-transparent borders (`border border-slate-200/60`).
- **Soft Shadows**: Avoid sharp, dark shadows. Use multi-layered `box-shadow` or large blur radii.
- **SVG Mastery**: Ensure all custom SVGs (like the Path) use `stroke-linecap="round"` and `stroke-linejoin="round"` for high-fidelity rendering.

## Must Use
- When designing Product Catalog and Magazine pages.
- When creating interactive 3D components and UI overlays.
- To audit existing layouts for high-end visual hierarchy.
