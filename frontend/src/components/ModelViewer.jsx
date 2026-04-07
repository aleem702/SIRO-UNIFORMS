import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF, useTexture } from '@react-three/drei';
import { Suspense, useEffect, useMemo } from 'react';
import * as THREE from 'three';

function ProductLayer({ modelPath, textureUrl, color }) {
  const { scene } = useGLTF(modelPath);
  const designTexture = useTexture(textureUrl);
  const targetColor = useMemo(() => new THREE.Color(color), [color]);

  useEffect(() => {
    if (designTexture) {
      designTexture.wrapS = designTexture.wrapT = THREE.RepeatWrapping;
      designTexture.repeat.set(4, 4);
      designTexture.colorSpace = THREE.SRGBColorSpace;
      designTexture.needsUpdate = true;
    }
  }, [designTexture]);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: targetColor,
          map: designTexture,
          roughness: 0.8,
          metalness: 0.1,
          side: THREE.DoubleSide,
        });
        child.material.needsUpdate = true;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    // Normalization: center and scale for the viewer
    scene.scale.setScalar(1);
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    
    scene.position.sub(center);
    
    // Scale product appropriately relative to viewport height
    const baseScale = 3.5 / size.y;
    scene.scale.setScalar(baseScale);

    // Align base of the model to the floor level (Y = -1)
    const finalBox = new THREE.Box3().setFromObject(scene);
    scene.position.y -= (finalBox.min.y - (-1.0));

  }, [scene, designTexture, targetColor]);

  return <primitive object={scene} />;
}

export default function ModelViewer({ modelType, textureUrl, color }) {
  const modelPath = `/models/${modelType}.glb`;
  
  // Preload to avoid jank on first render
  useGLTF.preload(modelPath);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const fov = isMobile ? 55 : 40;

  return (
    <Canvas
      shadows
      frameloop="demand"
      camera={{ position: [0, 0.5, 4.5], fov }}
      className="model-viewer-canvas"
      style={{ width: '100%', height: '100%', background: 'var(--surface-2)' }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

      <Suspense fallback={null}>
        <group rotation={[0, Math.PI / 8, 0]}>
          <ProductLayer 
            modelPath={modelPath} 
            textureUrl={textureUrl} 
            color={color} 
          />
        </group>
        <Environment preset="city" />
        <ContactShadows position={[0, -1.0, 0]} opacity={0.3} scale={10} blur={2.5} far={4} />
      </Suspense>

      <OrbitControls
        enablePan={false}
        minDistance={2}
        maxDistance={8}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
      />
    </Canvas>
  );
}
