import { Canvas } from "@react-three/fiber";

export const Scene = ({ children }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75, near: 1, far: 1000 }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
    >
      {children}
    </Canvas>
  );
};
