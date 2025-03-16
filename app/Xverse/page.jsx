// 'use client'
// import React, { useRef, useState, useEffect } from "react";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import {
//   OrbitControls,
//   PerspectiveCamera,
//   Environment,
//   Text,
// } from "@react-three/drei";
// import * as THREE from "three";

// // Main App Component
// const VirtualGallery = () => {
//   return (
//     <div className="w-full h-screen">
//       <Canvas shadows>
//         <Environment preset="warehouse" />
//         <color attach="background" args={["#f0f0f0"]} />
//         <fog attach="fog" args={["#f0f0f0", 5, 30]} />
//         <ambientLight intensity={0.5} />
//         <directionalLight
//           position={[10, 10, 10]}
//           intensity={1}
//           castShadow
//           shadow-mapSize-width={1024}
//           shadow-mapSize-height={1024}
//         />
//         <Gallery />
//         <PlayerControls />
//       </Canvas>
//     </div>
//   );
// };

// // Gallery Component including walls and art pieces
// const Gallery = () => {
//   return (
//     <group>
//       {/* Floor */}
//       <mesh
//         rotation={[-Math.PI / 2, 0, 0]}
//         position={[0, -0.5, 0]}
//         receiveShadow
//       >
//         <planeGeometry args={[40, 40]} />
//         <meshStandardMaterial color="#e0e0e0" />
//       </mesh>

//       {/* Walls */}
//       <Wall position={[0, 2, -10]} rotation={[0, 0, 0]} size={[20, 5, 0.5]} />
//       <Wall position={[0, 2, 10]} rotation={[0, 0, 0]} size={[20, 5, 0.5]} />
//       <Wall
//         position={[-10, 2, 0]}
//         rotation={[0, Math.PI / 2, 0]}
//         size={[20, 5, 0.5]}
//       />
//       <Wall
//         position={[10, 2, 0]}
//         rotation={[0, Math.PI / 2, 0]}
//         size={[20, 5, 0.5]}
//       />

//       {/* Art pieces on walls */}
//       <ArtPiece
//         position={[-5, 2, -9.7]}
//         rotation={[0, 0, 0]}
//         size={[3, 2, 0.1]}
//         color="#ff4444"
//       />
//       <ArtPiece
//         position={[0, 2, -9.7]}
//         rotation={[0, 0, 0]}
//         size={[3, 2, 0.1]}
//         color="#44ff44"
//       />
//       <ArtPiece
//         position={[5, 2, -9.7]}
//         rotation={[0, 0, 0]}
//         size={[3, 2, 0.1]}
//         color="#4444ff"
//       />

//       <ArtPiece
//         position={[-5, 2, 9.7]}
//         rotation={[0, Math.PI, 0]}
//         size={[3, 2, 0.1]}
//         color="#ffff44"
//       />
//       <ArtPiece
//         position={[0, 2, 9.7]}
//         rotation={[0, Math.PI, 0]}
//         size={[3, 2, 0.1]}
//         color="#ff44ff"
//       />
//       <ArtPiece
//         position={[5, 2, 9.7]}
//         rotation={[0, Math.PI, 0]}
//         size={[3, 2, 0.1]}
//         color="#44ffff"
//       />

//       <ArtPiece
//         position={[-9.7, 2, -5]}
//         rotation={[0, Math.PI / 2, 0]}
//         size={[3, 2, 0.1]}
//         color="#ff8844"
//       />
//       <ArtPiece
//         position={[-9.7, 2, 0]}
//         rotation={[0, Math.PI / 2, 0]}
//         size={[3, 2, 0.1]}
//         color="#88ff44"
//       />
//       <ArtPiece
//         position={[-9.7, 2, 5]}
//         rotation={[0, Math.PI / 2, 0]}
//         size={[3, 2, 0.1]}
//         color="#4488ff"
//       />

//       <ArtPiece
//         position={[9.7, 2, -5]}
//         rotation={[0, -Math.PI / 2, 0]}
//         size={[3, 2, 0.1]}
//         color="#ff4488"
//       />
//       <ArtPiece
//         position={[9.7, 2, 0]}
//         rotation={[0, -Math.PI / 2, 0]}
//         size={[3, 2, 0.1]}
//         color="#44ff88"
//       />
//       <ArtPiece
//         position={[9.7, 2, 5]}
//         rotation={[0, -Math.PI / 2, 0]}
//         size={[3, 2, 0.1]}
//         color="#8844ff"
//       />

//       {/* Sculptures in the middle */}
//       <Sculpture position={[-4, 0, -4]} color="#8888ff" />
//       <Sculpture position={[4, 0, 4]} color="#ff8888" />
//       <Sculpture position={[-4, 0, 4]} color="#88ff88" />
//       <Sculpture position={[4, 0, -4]} color="#ffff88" />
//     </group>
//   );
// };

// // Wall component
// const Wall = ({ position, rotation, size }) => {
//   return (
//     <mesh position={position} rotation={rotation} castShadow receiveShadow>
//       <boxGeometry args={size} />
//       <meshStandardMaterial color="#ffffff" />
//     </mesh>
//   );
// };

// // Art piece component
// const ArtPiece = ({ position, rotation, size, color }) => {
//   const frame = useRef();

//   useEffect(() => {
//     if (frame.current) {
//       frame.current.lookAt(0, 2, 0);
//     }
//   }, []);

//   return (
//     <group position={position} rotation={rotation} ref={frame}>
//       <mesh castShadow receiveShadow>
//         <boxGeometry args={size} />
//         <meshStandardMaterial color={color} />
//       </mesh>
//       <Text
//         position={[0, 0, 0.06]}
//         rotation={[0, Math.PI, 0]}
//         fontSize={0.2}
//         color="black"
//         anchorX="center"
//         anchorY="middle"
//       >
//         Artwork
//       </Text>
//     </group>
//   );
// };

// // Sculpture component
// const Sculpture = ({ position, color }) => {
//   const sculptureRef = useRef();

//   useFrame((state) => {
//     if (sculptureRef.current) {
//       sculptureRef.current.rotation.y += 0.005;
//     }
//   });

//   return (
//     <mesh position={position} castShadow ref={sculptureRef}>
//       <dodecahedronGeometry args={[1, 0]} />
//       <meshStandardMaterial color={color} />
//     </mesh>
//   );
// };

// // Player controls component
// const PlayerControls = () => {
//   const { camera } = useThree();
//   const [moveForward, setMoveForward] = useState(false);
//   const [moveBackward, setMoveBackward] = useState(false);
//   const [moveLeft, setMoveLeft] = useState(false);
//   const [moveRight, setMoveRight] = useState(false);
//   const [lookDelta, setLookDelta] = useState({ x: 0, y: 0 });
//   const velocity = useRef(new THREE.Vector3());

//   // Initialize player position
//   useEffect(() => {
//     camera.position.set(0, 1.7, 0);
//     camera.lookAt(0, 1.7, -5);
//   }, [camera]);

//   // Handle keyboard controls
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       switch (e.code) {
//         case "KeyW":
//           setMoveForward(true);
//           break;
//         case "KeyS":
//           setMoveBackward(true);
//           break;
//         case "KeyA":
//           setMoveLeft(true);
//           break;
//         case "KeyD":
//           setMoveRight(true);
//           break;
//         default:
//           break;
//       }
//     };

//     const handleKeyUp = (e) => {
//       switch (e.code) {
//         case "KeyW":
//           setMoveForward(false);
//           break;
//         case "KeyS":
//           setMoveBackward(false);
//           break;
//         case "KeyA":
//           setMoveLeft(false);
//           break;
//         case "KeyD":
//           setMoveRight(false);
//           break;
//         default:
//           break;
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     window.addEventListener("keyup", handleKeyUp);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       window.removeEventListener("keyup", handleKeyUp);
//     };
//   }, []);

//   // Handle mouse movement for looking around
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setLookDelta({
//         x: e.movementX / 100,
//         y: e.movementY / 100,
//       });
//     };

//     const handlePointerLock = () => {
//       document.addEventListener("mousemove", handleMouseMove);
//     };

//     const handlePointerUnlock = () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//     };

//     document.addEventListener("click", () => {
//       document.body.requestPointerLock();
//     });

//     document.addEventListener("pointerlockchange", () => {
//       if (document.pointerLockElement) {
//         handlePointerLock();
//       } else {
//         handlePointerUnlock();
//       }
//     });

//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("pointerlockchange", handlePointerLock);
//     };
//   }, []);

//   // Update movement and rotation each frame
//   useFrame(() => {
//     // Update camera rotation based on mouse movement
//     if (lookDelta.x || lookDelta.y) {
//       camera.rotation.y -= lookDelta.x;

//       // Limit vertical rotation to prevent flipping
//       const nextXRotation = camera.rotation.x - lookDelta.y;
//       if (nextXRotation < Math.PI / 2 && nextXRotation > -Math.PI / 2) {
//         camera.rotation.x = nextXRotation;
//       }

//       setLookDelta({ x: 0, y: 0 });
//     }

//     // Apply movement based on keyboard input
//     const direction = new THREE.Vector3();
//     const frontVector = new THREE.Vector3(
//       0,
//       0,
//       Number(moveBackward) - Number(moveForward)
//     );
//     const sideVector = new THREE.Vector3(
//       Number(moveLeft) - Number(moveRight),
//       0,
//       0
//     );

//     direction
//       .subVectors(frontVector, sideVector)
//       .normalize()
//       .multiplyScalar(0.1);

//     // Apply rotation to movement direction
//     direction.applyEuler(new THREE.Euler(0, camera.rotation.y, 0));

//     // Update position
//     camera.position.add(direction);

//     // Boundary checks - prevent walking through walls
//     if (camera.position.x < -9) camera.position.x = -9;
//     if (camera.position.x > 9) camera.position.x = 9;
//     if (camera.position.z < -9) camera.position.z = -9;
//     if (camera.position.z > 9) camera.position.z = 9;

//     // Keep the camera at a fixed height
//     camera.position.y = 1.7;
//   });

//   return null;
// };

// export default VirtualGallery;

'use client'
import React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import { App } from "@/public/components/Xverse/app";

export default function Page() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75, near: 1, far: 1000 }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap; // Ensure THREE is imported
        }}
      >
        <App />
        <PointerLockControls />
      </Canvas>

      <div
        id="menu"
        style={{ position: "absolute", top: "20px", left: "20px" }}
      >
        <button
          id="play_button"
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        >
          Start Experience
        </button>
      </div>
    </div>
  );
}