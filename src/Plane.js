import ReactDOM from "react-dom";
import React, { useRef, useMemo, useState, Component, useCallback } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import * as THREE from "three";

export default function Plane({ position: initialPos, mouse, color, liveColor, isCoveringLogo, uncoveredLogo }) {
  const [visible, SetVisible] = useState(true);
  const mesh = useRef();
  const speed = useRef([0, 0]);
  const position = useRef([...initialPos]);
  const constants = useRef({
    initialPos,
    lastPos: [...initialPos],
    color: liveColor
  });

  const [hovered, setHovered] = useState(false);

  function getSqrMagnitude([a, b]) {
    return a * a + b * b;
  }

  function getMagnitude(v) {
    return Math.sqrt(getSqrMagnitude(v));
  }

  function sqrDistance(v1, v2) {
    let dx = v1[0] - v2[0];
    let dy = v1[1] - v2[1];
    return dx * dx + dy * dy;
  }

  useFrame(state => {
    if (visible) {
      if (hovered) {
        let mag = getMagnitude(mouse.current);
        let sign = 1;

        if (getSqrMagnitude(position.current) > 200)
          sign = -1;

        speed.current = mouse.current.map(pos => pos * sign * 0.05 / mag);
        mesh.current.material.color.setHex(0xffffff);
      }
      if (getSqrMagnitude(speed.current) > 0.0001) {
        position.current[0] += speed.current[0];
        position.current[1] -= speed.current[1];
        mesh.current.position.set(...position.current);
      }
      else if (Math.random() > 0.9999) {
        speed.current = [Math.random() * 0.04 - 0.02, Math.random() * 0.04 - 0.02];
        constants.current.lastPos = [...position.current];
      }

      if (sqrDistance(position.current, constants.current.lastPos) > 25) {
        constants.current.lastPos = [...position.current];
        mesh.current.material.color.set(constants.current.color);
        speed.current = [0, 0];
      }

      if (getSqrMagnitude(position.current) > 900) {
        SetVisible(false);
      }
      else if (isCoveringLogo && getSqrMagnitude(position.current) > 50) {
        isCoveringLogo = false;
        uncoveredLogo();
      }
    }
  })

  if (!visible) {
    return null;
  }

  return (
    <mesh
      ref={mesh}
      position={initialPos}
      onPointerOver={e => setHovered(true)}
      onPointerOut={e => setHovered(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 0.1]} />
      <meshPhongMaterial
        attach="material"
        color={color}
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
}
