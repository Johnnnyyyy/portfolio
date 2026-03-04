"use client";
import { Text as DreiText, Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
useGLTF.preload("/models/cyberpunk_character.glb");

function ModelLoader() {
  const [animatedProgress, setAnimatedProgress] = useState(1); // start at 1%
  
  useEffect(() => {
    const duration = 5000; // 5 seconds
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100); // clamp to 100%
      setAnimatedProgress(progress);

      if (progress < 100) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <>
    <Canvas>
      <ambientLight intensity={0.6} />
      <CyberpunkGridCube />
    </Canvas>
      {/* 3D Text */}
      <DreiText
        position={[0, -1.2, 0]}
        fontSize={0.1}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        LOADING CHARACTER
      </DreiText>

      <DreiText
        position={[0, -1, 0]}
        fontSize={0.1}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {animatedProgress.toFixed(0)}%
      </DreiText>
    </>
  );
}
function SkeletonPlaceholder() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y += 0.01;

    const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial
        color="#38bdf8"
        wireframe
        emissive="#38bdf8"
        emissiveIntensity={1}
      />
    </mesh>
  );
}

function CharacterModel(props: any) {
  const gltf = useGLTF("/models/cyberpunk_character.glb");

  if (!gltf?.scene) {
    return (
      <mesh {...props}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#38bdf8" />
      </mesh>
    );
  }

  return <primitive object={gltf.scene} {...props} />;
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
        <meshStandardMaterial
          color="#00ffff"
          wireframe
          emissive="#00ffff"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Inner Grid */}
      <mesh scale={0.8}>
        <boxGeometry args={[1.5, 1.5, 1.5, 8, 8, 8]} />
        <meshStandardMaterial
          color="#ff00ff"
          wireframe
          emissive="#ff00ff"
          emissiveIntensity={1.5}
        />
      </mesh>
    </group>
  );
}

function CharacterScene() {
  return (
    <>
    <Canvas>
          <ambientLight intensity={0.7} />
          <directionalLight position={[2, 4, 3]} intensity={1.2} />
      <Suspense fallback={<ModelLoader />}>
        <CharacterModel
          scale={0.7}
          position={[0, -1.2, 0]}
          rotation={[0, Math.PI, 0]}
        />
      </Suspense>
    </Canvas>
      <Environment preset="city" />
      <OrbitControls enableZoom={false} />
    </>
  );
}
export default function Experience() {
  const skills = [
    { label: "Swift", value: "Intermediate" },
    { label: "Java", value: "Expert" },
    { label: "Groovy", value: "Expert" },
    { label: "Python", value: "Intermediate" },
    { label: "JavaScript", value: "Expert" },
    { label: "PHP", value: "Expert" },
    { label: "SQL", value: "Advanced" },
    { label: "Shell Scripting", value: "Intermediate" },
    { label: "AI Automation", value: "Proficient" },
  ];

  return (
    <div className="character-experience-layout">
      <div className="character-3d-panel">
        <Canvas
          camera={{ position: [0, 1, 3], fov: 50 }}
          style={{ width: "100%", height: "100%" }}
        >
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
