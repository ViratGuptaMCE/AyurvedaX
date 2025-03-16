'use client'
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

export const Floor = () => {
  const floorTexture = useLoader(THREE.TextureLoader, "img/FloorTexture.jpg");

  return (
    <>
      <mesh position={[0, -10, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial map={floorTexture} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 10, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial color="grey" side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};
