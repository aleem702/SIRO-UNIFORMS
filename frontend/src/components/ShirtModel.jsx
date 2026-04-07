import { useGLTF } from '@react-three/drei';
import { useEffect, Suspense } from 'react';
import * as THREE from 'three';

const DEFAULT_MODEL = '/models/siro_tshirt.glb';

// Sub-component to handle direct material updates safely within Suspense
function ModelContent({ color, scene }) {
  // Perform property updates directly on the cached scene
  // 1. Material Update: Runs on color changes
  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const material = child.material;
        
        if (color) {
          material.color.set(color);
        } else {
          material.color.set('#ffffff');
        }
        
        material.needsUpdate = true;
      }
    });
  }, [scene, color]);

  // 2. Auto-Centering & Scaling: Runs ONCE when scene loads
  useEffect(() => {
    if (!scene) return;

    // Reset transformations to ensure idempotent bounding box calculation
    scene.position.set(0, 0, 0);
    scene.scale.setScalar(1);
    scene.updateMatrixWorld();

    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    
    // Applying stable centering (with custom Y-offset to align base at the marked spot)
    scene.position.set(-center.x, -center.y - 0.5, -center.z);
    
    // Applying stable scaling (reduced to fit better on screen)
    const baseScale = 2.8 / (size.y || 1);
    scene.scale.setScalar(baseScale);
  }, [scene]);

  return <primitive object={scene} />;
}

export default function ShirtModel({ color }) {
  const { scene } = useGLTF(DEFAULT_MODEL);

  if (!scene) return null;

  return (
    <Suspense fallback={null}>
      <ModelContent 
        scene={scene} 
        color={color} 
      />
    </Suspense>
  );
}

useGLTF.preload(DEFAULT_MODEL);
