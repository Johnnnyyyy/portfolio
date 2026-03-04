import '@react-three/fiber';
import { BoxGeometryProps, MeshProps, MeshStandardMaterialProps, PrimitiveProps, SphereGeometryProps } from '@react-three/fiber';
import { Group, Object3D } from 'three';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      mesh: MeshProps & { children?: React.ReactNode };
      sphereGeometry: SphereGeometryProps;
      boxGeometry: BoxGeometryProps;
      meshStandardMaterial: MeshStandardMaterialProps;
      group: { children?: React.ReactNode } & Partial<Group>;
      primitive: PrimitiveProps<Object3D>;
    }
  }
}