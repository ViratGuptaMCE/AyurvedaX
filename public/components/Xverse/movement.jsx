'use client'
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

export const useMovement = () => {
  const keysPressed = useRef({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    w: false,
    a: false,
    s: false,
    d: false,
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key in keysPressed.current) {
        keysPressed.current[e.key] = true;
      }
    };

    const handleKeyUp = (e) => {
      if (e.key in keysPressed.current) {
        keysPressed.current[e.key] = false;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    const moveSpeed = 10 * delta;
    const { camera } = useThree();

    if (keysPressed.current.ArrowRight || keysPressed.current.d) {
      camera.translateX(moveSpeed); // Move right
    }
    if (keysPressed.current.ArrowLeft || keysPressed.current.a) {
      camera.translateX(-moveSpeed); // Move left
    }
    if (keysPressed.current.ArrowUp || keysPressed.current.w) {
      camera.translateZ(-moveSpeed); // Move forward
    }
    if (keysPressed.current.ArrowDown || keysPressed.current.s) {
      camera.translateZ(moveSpeed); // Move backward
    }
  });
};