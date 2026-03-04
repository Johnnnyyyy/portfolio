// types/react-three-fiber.d.ts
import '@react-three/fiber';
import { ReactThreeFiber } from "@react-three/fiber";
import * as THREE from "three";
declare module '@react-three/fiber' {
  // This is usually optional; most things are already typed.
}
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: ReactThreeFiber.Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>;
      directionalLight: ReactThreeFiber.Object3DNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>;
      pointLight: ReactThreeFiber.Object3DNode<THREE.PointLight, typeof THREE.PointLight>;
      spotLight: ReactThreeFiber.Object3DNode<THREE.SpotLight, typeof THREE.SpotLight>;
      mesh: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
      // add more Three.js elements you use
    }
  }
}