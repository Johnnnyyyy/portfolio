'use client';

import { Text as DreiText, Environment, Html, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

useGLTF.preload('/models/cyberpunk_character.glb');

interface CharacterModelProps {
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  onLoad?: () => void;
}

function ModelLoader({ onComplete }: { onComplete?: () => void }) {
  const [animatedProgress, setAnimatedProgress] = useState(1); // start at 1%

  useEffect(() => {
    const duration = 6000; // 6 seconds
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setAnimatedProgress(progress);

      if (progress < 100) {
        requestAnimationFrame(animate);
      } else if (onComplete) {
        onComplete();
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <>
      {/* 3D Text */}
      <DreiText position={[0, -1.2, 0]} fontSize={0.1} color="#00ffff" anchorX="center" anchorY="middle">
        LOADING CHARACTER
      </DreiText>

      <DreiText position={[0, -1, 0]} fontSize={0.1} color="#ffffff" anchorX="center" anchorY="middle">
        {animatedProgress.toFixed(0)}%
      </DreiText>
    </>
  );
}

function CharacterModel({ scale = 1, position = [0, 0, 0], rotation = [0, 0, 0], onLoad }: CharacterModelProps) {
  const gltf = useGLTF('/models/cyberpunk_character.glb');

  useEffect(() => {
    if (gltf?.scene && onLoad) {
      onLoad();
    }
  }, [gltf?.scene, onLoad]);

  // Fallback: show a simple loading box using Drei's Html overlay
  if (!gltf?.scene) {
  return (
    <Html center position={position}>
      <div
        style={{
          width: 80,
          height: 80,
          background: '#38bdf8',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        Loading...
      </div>
    </Html>
  );
}

  return <primitive object={gltf.scene} scale={scale} position={position} rotation={rotation} />;
}

function CyberpunkGridCube() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += 0.01;
    groupRef.current.rotation.x += 0.003;

    const float = Math.sin(state.clock.elapsedTime * 2) * 0.05;
    groupRef.current.position.y = float;
  });

  return (
    <group ref={groupRef} scale={0.6}>
      {/* Outer Wireframe */}
      <mesh>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#00ffff" wireframe emissive="#00ffff" emissiveIntensity={2} />
      </mesh>

      {/* Inner Grid */}
      <mesh scale={0.8}>
        <boxGeometry args={[1.5, 1.5, 1.5, 8, 8, 8]} />
        <meshStandardMaterial color="#ff00ff" wireframe emissive="#ff00ff" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

function CharacterScene() {
  const [showCube, setShowCube] = useState(true);

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 4, 3]} intensity={1.2} />
      <Suspense fallback={<ModelLoader onComplete={() => setShowCube(false)} />}>
        <CharacterModel scale={0.7} position={[0, -1.2, 0]} rotation={[0, Math.PI, 0]} onLoad={() => setShowCube(false)} />
      </Suspense>
      {showCube && <CyberpunkGridCube />}
      <Environment preset="city" />
      <OrbitControls enableZoom={false} />
    </>
  );
}

export default function Experience() {
  const skills = [
    { label: 'Swift', value: 'Intermediate' },
    { label: 'Java', value: 'Expert' },
    { label: 'Groovy', value: 'Expert' },
    { label: 'Python', value: 'Intermediate' },
    { label: 'JavaScript', value: 'Expert' },
    { label: 'PHP', value: 'Expert' },
    { label: 'SQL', value: 'Advanced' },
    { label: 'Shell Scripting', value: 'Intermediate' },
    { label: 'AI Automation', value: 'Proficient' },
  ];

  return (
    <div className="character-experience-layout">
      <div className="character-3d-panel">
        <Canvas camera={{ position: [0, 1, 3], fov: 50 }} style={{ width: '100%', height: '100%' }}>
          <CharacterScene />
        </Canvas>
      </div>

      <div className="character-stats-panel">
        <h2 className="character-stats-title">Skills</h2>
        <ul className="character-stats-list">
          {skills.map((skill) => (
            <li key={skill.label} className="character-stat-item">
              <span className="character-stat-label">{skill.label}</span>
              <span className="character-stat-value">{skill.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}