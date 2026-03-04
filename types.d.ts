import '@react-three/fiber';
import type {
  AmbientLightProps,
  BoxGeometryProps,
  DirectionalLightProps,
  GroupProps,
  MeshProps,
  MeshStandardMaterialProps,
  PointLightProps,
  PrimitiveProps,
  SphereGeometryProps,
  SpotLightProps,
} from '@react-three/fiber';
import type { Object3D } from 'three';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      mesh: MeshProps;
      group: GroupProps;
      sphereGeometry: SphereGeometryProps;
      boxGeometry: BoxGeometryProps;
      meshStandardMaterial: MeshStandardMaterialProps;
      primitive: PrimitiveProps<Object3D>;
      ambientLight: AmbientLightProps;
      directionalLight: DirectionalLightProps;
      pointLight: PointLightProps;
      spotLight: SpotLightProps;
    }
  }
}