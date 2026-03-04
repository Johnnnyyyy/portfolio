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
  hoveredSkill?: string | null;
}

function ModelLoader() {
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
      }
    };

    requestAnimationFrame(animate);
  }, []);

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

function CharacterModel({ scale = 1, position = [0, 0, 0], rotation = [0, 0, 0], onLoad, hoveredSkill = null }: CharacterModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const gltf = useGLTF('/models/cyberpunk_character.glb');
  const targetRotation = useRef(rotation[1]);
  const isSpinningRef = useRef(false);
  const prevSkillRef = useRef<string | null>(null);

  useEffect(() => {
    if (gltf?.scene && onLoad) {
      onLoad();
    }
  }, [gltf?.scene, onLoad]);

  // Set up animations if available
  useEffect(() => {
    if (gltf?.animations && gltf.animations.length > 0) {
      mixerRef.current = new THREE.AnimationMixer(gltf.scene);
      // Play the first animation (usually idle or dance)
      const action = mixerRef.current.clipAction(gltf.animations[0]);
      action.play();
    }
    
    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }
    };
  }, [gltf]);

  // Handle spin trigger - reset and start new spin when skill changes
  useEffect(() => {
    if (hoveredSkill !== null) {
      // New skill hovered or skill changed - reset to front and start spin
      if (groupRef.current) {
        groupRef.current.rotation.y = rotation[1]; // Reset to front
      }
      isSpinningRef.current = true;
      targetRotation.current = rotation[1] + (350 * Math.PI / 180); // 350 degrees from front
      prevSkillRef.current = hoveredSkill;
    } else {
      // No skill hovered - reset to front position
      if (groupRef.current) {
        groupRef.current.rotation.y = rotation[1];
      }
      isSpinningRef.current = false;
      prevSkillRef.current = null;
    }
  }, [hoveredSkill, rotation]);

  // Update animation mixer each frame, or apply procedural animation
  useFrame((state, delta) => {
    // Update animation mixer if it exists
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
    
    if (groupRef.current) {
      // Handle spinning
      if (isSpinningRef.current) {
        const currentRotation = groupRef.current.rotation.y;
        const diff = targetRotation.current - currentRotation;
        
        if (Math.abs(diff) > 0.01) {
          // Smooth rotation with easing
          groupRef.current.rotation.y += diff * 0.08;
        } else {
          // Snap to target and reset
          groupRef.current.rotation.y = rotation[1];
          isSpinningRef.current = false;
        }
      } else if (!mixerRef.current) {
        // Subtle idle breathing animation if no built-in animations and not spinning
        const t = state.clock.elapsedTime;
        groupRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.02;
      }
    }
  });

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

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <primitive object={gltf.scene} scale={scale} />
    </group>
  );
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

type SkillLevel = 'Intermediate' | 'Proficient' | 'Advanced' | 'Expert' | null;

function AuraEffect({ isActive, skillLevel }: { isActive: boolean; skillLevel: SkillLevel }) {
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const ringRef3 = useRef<THREE.Mesh>(null);
  const ringRef4 = useRef<THREE.Mesh>(null);

  // Define aura configurations based on skill level
  const auraConfig = {
    Intermediate: {
      rings: 1,
      colors: ['#ffaa00'], // Orange/yellow
      intensity: 2,
      speed: 1,
    },
    Proficient: {
      rings: 2,
      colors: ['#00ff88', '#00ffcc'], // Green/teal
      intensity: 2.5,
      speed: 1.5,
    },
    Advanced: {
      rings: 3,
      colors: ['#0088ff', '#00ccff', '#00ffff'], // Blue/cyan
      intensity: 3,
      speed: 2,
    },
    Expert: {
      rings: 4,
      colors: ['#ff0080', '#ff00ff', '#8800ff', '#00ffff'], // Pink/purple/cyan
      intensity: 4,
      speed: 2.5,
    },
  };

  const config = skillLevel ? auraConfig[skillLevel] : auraConfig.Intermediate;

  useFrame((state) => {
    if (!isActive) return;
    const t = state.clock.elapsedTime * config.speed;
    
    if (ringRef1.current) {
      ringRef1.current.rotation.z = t * 2;
      ringRef1.current.scale.setScalar(1 + Math.sin(t * 3) * 0.15);
    }
    if (ringRef2.current && config.rings >= 2) {
      ringRef2.current.rotation.z = -t * 1.5;
      ringRef2.current.scale.setScalar(1 + Math.sin(t * 3 + 1) * 0.15);
    }
    if (ringRef3.current && config.rings >= 3) {
      ringRef3.current.rotation.z = t * 1;
      ringRef3.current.scale.setScalar(1 + Math.sin(t * 3 + 2) * 0.15);
    }
    if (ringRef4.current && config.rings >= 4) {
      ringRef4.current.rotation.z = -t * 2.5;
      ringRef4.current.scale.setScalar(1 + Math.sin(t * 3 + 3) * 0.2);
    }
  });

  if (!isActive) return null;

  return (
    <group position={[0, -1.2, 0]}>
      {/* Ring 1 - always visible */}
      <mesh ref={ringRef1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.025, 16, 100]} />
        <meshStandardMaterial 
          color={config.colors[0]} 
          emissive={config.colors[0]} 
          emissiveIntensity={config.intensity} 
          transparent 
          opacity={0.9} 
        />
      </mesh>
      
      {/* Ring 2 - Proficient+ */}
      {config.rings >= 2 && (
        <mesh ref={ringRef2} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.7, 0.02, 16, 100]} />
          <meshStandardMaterial 
            color={config.colors[1] || config.colors[0]} 
            emissive={config.colors[1] || config.colors[0]} 
            emissiveIntensity={config.intensity * 0.8} 
            transparent 
            opacity={0.7} 
          />
        </mesh>
      )}
      
      {/* Ring 3 - Advanced+ */}
      {config.rings >= 3 && (
        <mesh ref={ringRef3} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.9, 0.015, 16, 100]} />
          <meshStandardMaterial 
            color={config.colors[2] || config.colors[0]} 
            emissive={config.colors[2] || config.colors[0]} 
            emissiveIntensity={config.intensity * 0.6} 
            transparent 
            opacity={0.5} 
          />
        </mesh>
      )}
      
      {/* Ring 4 - Expert only */}
      {config.rings >= 4 && (
        <mesh ref={ringRef4} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.1, 0.012, 16, 100]} />
          <meshStandardMaterial 
            color={config.colors[3] || config.colors[0]} 
            emissive={config.colors[3] || config.colors[0]} 
            emissiveIntensity={config.intensity * 0.5} 
            transparent 
            opacity={0.4} 
          />
        </mesh>
      )}
    </group>
  );
}

function CharacterScene({ hoveredSkill, skillLevel }: { hoveredSkill: string | null; skillLevel: SkillLevel }) {
  const [modelLoaded, setModelLoaded] = useState(false);

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 4, 3]} intensity={1.2} />
      <Suspense fallback={null}>
        <CharacterModel scale={0.7} position={[0, -1.2, 0]} rotation={[0, Math.PI, 0]} onLoad={() => setModelLoaded(true)} hoveredSkill={hoveredSkill} />
        <AuraEffect isActive={hoveredSkill !== null} skillLevel={skillLevel} />
      </Suspense>
      {!modelLoaded && (
        <>
          <ModelLoader />
          <CyberpunkGridCube />
        </>
      )}
      <Environment preset="city" />
      <OrbitControls enableZoom={false} />
    </>
  );
}

export default function Experience() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredLevel, setHoveredLevel] = useState<SkillLevel>(null);
  
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
          <CharacterScene hoveredSkill={hoveredSkill} skillLevel={hoveredLevel} />
        </Canvas>
      </div>

      <div className="character-stats-panel">
        <h2 className="character-stats-title">Skills</h2>
        <ul className="character-stats-list">
          {skills.map((skill) => (
            <li 
              key={skill.label} 
              className={`character-stat-item ${hoveredSkill === skill.label ? 'skill-hovered' : ''}`}
              onMouseEnter={() => {
                setHoveredSkill(skill.label);
                setHoveredLevel(skill.value as SkillLevel);
              }}
              onMouseLeave={() => {
                setHoveredSkill(null);
                setHoveredLevel(null);
              }}
            >
              <span className="character-stat-label">{skill.label}</span>
              <span className="character-stat-value">{skill.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}