import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

export const Walls = () => {
  const wallTexture = useLoader(THREE.TextureLoader, "img/WallTexture.jpeg");

  return (
    <>
      <mesh position={[0, 0, -25]}>
        <boxGeometry args={[50, 20, 0.01]} />
        <meshBasicMaterial map={wallTexture} />
      </mesh>
      <mesh position={[0, 0, 25]}>
        <boxGeometry args={[50, 20, 0.01]} />
        <meshBasicMaterial map={wallTexture} />
      </mesh>
      <mesh position={[-25, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[50, 20, 0.01]} />
        <meshBasicMaterial map={wallTexture} />
      </mesh>
      <mesh position={[25, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[50, 20, 0.01]} />
        <meshBasicMaterial map={wallTexture} />
      </mesh>
    </>
  );
};
