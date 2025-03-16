import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { paints } from "./paintingData";

export const Paintings = () => {
  return (
    <>
      {paints.map((p, idx) => {
        const texture = useLoader(THREE.TextureLoader, p.src);
        return (
          <mesh
            key={idx}
            position={[p.x, 0, p.z]}
            rotation={[0, p.rotationY, 0]}
            castShadow
            receiveShadow
          >
            <planeGeometry args={[p.width, p.height]} />
            <meshBasicMaterial map={texture} />
          </mesh>
        );
      })}
    </>
  );
};
