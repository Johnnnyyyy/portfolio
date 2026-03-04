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
import type { Object3D, TorusGeometry } from 'three';

type TorusGeometryProps = JSX.IntrinsicElements['torusGeometry'] extends undefined 
  ? { args?: ConstructorParameters<typeof TorusGeometry> }
  : JSX.IntrinsicElements['torusGeometry'];

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      mesh: MeshProps;
      group: GroupProps;
      sphereGeometry: SphereGeometryProps;
      boxGeometry: BoxGeometryProps;
      torusGeometry: TorusGeometryProps;
      meshStandardMaterial: MeshStandardMaterialProps;
      primitive: PrimitiveProps<Object3D>;
      ambientLight: AmbientLightProps;
      directionalLight: DirectionalLightProps;
      pointLight: PointLightProps;
      spotLight: SpotLightProps;
    }
  }
}