"use client";

import { Environment, useGLTF } from "@react-three/drei";
import { Suspense } from "react";



function ScientistModel(props: any) {
  const { scene } = useGLTF("/models/destiny_2_character_bust.glb");
  return <primitive object={scene} {...props} />;
}

export default function Experience() {
  return (
    <>
      {/* Lighting for the model */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 4, 3]} intensity={1.2} castShadow />
      <Suspense fallback={null}>
        <group position={[0, 0, 0]}>
          <ScientistModel scale={0.3} />
        </group>
      </Suspense>
      <Environment preset="city" />
    </>
  );
}

// Preload the model for performance
useGLTF.preload("/models/destiny_2_character_bust.glb");