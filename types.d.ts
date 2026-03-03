/// <reference types="@react-three/fiber" />
import { JSX as JSXNamespace } from '@react-three/fiber';
declare global {
  namespace JSX {
    interface IntrinsicElements extends JSXNamespace.IntrinsicElements {}
  }
}