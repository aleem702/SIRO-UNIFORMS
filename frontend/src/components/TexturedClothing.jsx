import { useGLTF, useTexture } from '@react-three/drei';
import { useEffect, Suspense } from 'react';
import * as THREE from 'three';

export default function TexturedClothing({ modelPath, textureUrl }) {
  const texture = useTexture(textureUrl || '/models/polo_shirt_texture.png');

  useEffect(() => {
    if (texture) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(4, 4);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.flipY = false;
      texture.needsUpdate = true;
    }
  }, [texture]);

  return (
    <Suspense fallback={null}>
      <ModelImplementation modelPath={modelPath} texture={texture} />
    </Suspense>
  );
}

function ModelImplementation({ modelPath, texture }) {
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.75,
          metalness: 0.0,
          side: THREE.DoubleSide,
        });
        child.material.needsUpdate = true;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene, texture]);

  // Auto-center and auto-scale the model to fit the viewport
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // Scale so tallest dimension fits in ~2 units
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2.0 / maxDim;
    scene.scale.setScalar(scale);

    // Re-center after scaling
    box.setFromObject(scene);
    box.getCenter(center);
    scene.position.set(-center.x, -center.y, -center.z);
  }, [scene]);

  return (
    <primitive
      object={scene}
      rotation={[0, Math.PI / 8, 0]}
    />
  );
}
