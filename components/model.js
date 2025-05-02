import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";

export const Model = ({onClick}) => {
  const modelRef = useRef();
  const { scene, animations } = useGLTF("/model/sasblue.glb");
  const [keysPressed, setKeysPressed] = useState({});
  const { actions } = useAnimations(animations, modelRef);

  useEffect(() => {
    actions.Idle?.play()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) =>
      setKeysPressed((prev) => ({ ...prev, [e.key]: true }));
    const handleKeyUp = (e) =>
      setKeysPressed((prev) => ({ ...prev, [e.key]: false }));

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  console.log("glb model:", modelRef.current, actions, keysPressed);

  // Play "Walk" animation when any movement key is pressed
  useEffect(() => {
    const isWalking =
      keysPressed["ArrowUp"] ||
      keysPressed["ArrowDown"] ||
      keysPressed["ArrowLeft"] ||
      keysPressed["ArrowRight"];
    if (isWalking) {
      actions['eye_test']?.reset().fadeIn(0.2).play();
    } else {
      actions['eye_test']?.fadeOut(0.2);
    }
  }, [keysPressed, actions]);

  // Move model each frame
  useFrame(() => {
    if (!modelRef.current) return;

    if (keysPressed["ArrowUp"]) modelRef.current.position.z += 0.05;
    if (keysPressed["ArrowDown"]) modelRef.current.position.z -= 0.05;
    if (keysPressed["ArrowLeft"]) modelRef.current.position.x += 0.05;
    if (keysPressed["ArrowRight"]) modelRef.current.position.x -= 0.05;
  });

  return <primitive onClick={onClick} ref={modelRef} object={scene} scale={1} />;
};
