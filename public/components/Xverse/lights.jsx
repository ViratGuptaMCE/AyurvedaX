import * as THREE from "three";
import { useHelper } from "@react-three/drei";

export const Lighting = () => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);

  const createSpotlight = (x, y, z, intensity, targetPosition) => {
    const spotlight = new THREE.SpotLight(0xffffff, intensity);
    spotlight.position.set(x, y, z);
    spotlight.target.position.copy(targetPosition);
    spotlight.castShadow = true;
    spotlight.angle = 1.57079;
    spotlight.penumbra = 0.2;
    spotlight.decay = 1;
    spotlight.distance = 40;
    spotlight.shadow.mapSize.width = 1024;
    spotlight.shadow.mapSize.height = 1024;
    return spotlight;
  };

  return (
    <>
      <primitive object={ambientLight} />
      <primitive
        object={createSpotlight(
          0,
          6.7,
          -25,
          0.948,
          new THREE.Vector3(0, 0, -20)
        )}
      />
      <primitive
        object={createSpotlight(0, 6.7, 25, 0.948, new THREE.Vector3(0, 0, 20))}
      />
      <primitive
        object={createSpotlight(
          -25,
          6.7,
          0,
          0.948,
          new THREE.Vector3(-20, 0, 0)
        )}
      />
      <primitive
        object={createSpotlight(25, 6.7, 0, 0.948, new THREE.Vector3(20, 0, 0))}
      />
    </>
  );
};
