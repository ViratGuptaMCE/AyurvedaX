'use client'
import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import { Floor } from "./floor";
import { Lighting } from "./lights";
import { Walls } from "./walls";
import { Paintings } from "./paintings";
import { useMovement } from "./movement";

const Scene = () => {
  const { camera, controls } = useMovement();

  return (
    <>
      <Floor />
      <Lighting />
      <Walls />
      <Paintings />
      <PointerLockControls />
    </>
  );
};

export const App = () => {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
};
