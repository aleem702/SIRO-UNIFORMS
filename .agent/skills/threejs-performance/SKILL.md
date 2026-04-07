---
name: threejs-performance
description: High-performance React-Three-Fiber patterns for scalable 3D garment visualization.
---

# 3D Performance & Visualization

## Core Philosophy
Deliver a premium, lag-free 3D experience by optimizing asset delivery, rendering pipelines, and material realism.

## Guidelines

### 1. GLB & Asset Optimization
- **Draco Compression**: Always use Draco-compressed models. Use `@react-three/drei`'s `useGLTF` with the DRACO loader.
- **Level of Detail (LOD)**: Implement `LOD` for complex uniform meshes when viewing in a grid or distant view.
- **Texture Atlasing**: Combine multiple textures for a single garment into a single atlas to reduce draw calls.

### 2. Rendering Optimization
- **Instanced Mesh**: Use `InstancedMesh` if rendering many identical items (e.g., in a warehouse view).
- **Shadow Management**: Disable expensive shadows on mobile; use `contactShadows` from Drei for a high-end look without the cost.
- **Camera Frustum**: Ensure objects outside the view are culled correctly.

### 3. Material Realism
- **PBR Materials**: Use `MeshStandardMaterial` or `MeshPhysicalMaterial` for realistic fabric (cotton, silk, metallic highlights).
- **Normal Maps**: Crucial for uniform texture without adding geometry.
- **Clearcoat & Sheen**: Use these physical properties for high-end suit fabrics or athletic wear.

### 4. Interactive Performance
- **Throttling**: Throttle raycasting/mouse events for 3D interactions.
- **Transition States**: Use `framer-motion-3d` for animating 3D properties like rotation or scale.

## Must Use
- When editing `ModelViewer.jsx` or any R3F component.
- When adding new garment models to the catalog.
- For optimizing mobile 3D performance.
