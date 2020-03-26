import React, { Suspense, Component, useMemo, useCallback, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from 'react-three-fiber';
import { useHistory } from "react-router-dom";
import * as THREE from 'three'
import Plane from "./Plane";
import niceColors from 'nice-color-palettes'
import Effects from "./Effects"
import FlashLight from './FlashLight'
import Logo from './Logo'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function LogoScene() {
  function randomRange(min, max) {
    return Math.floor(Math.abs(Math.random()) * (1 + max - min) + min);
  }

  function getSqrMagnitude([a, b]) {
    return a * a + b * b;
  }

  const coveringPlanesCount = useRef(0);
  const isUncovered = useRef(false);

  const uncoveredLogo = React.useCallback(() => {
    coveringPlanesCount.current--;
    if (coveringPlanesCount.current < 1) {
      isUncovered.current = true;
    }
  }, []);

  function createPlane(xRange, yRange, key) {
    let randNum = Math.floor(Math.random() * 5);

    let position = [
      randomRange(-xRange, xRange),
      randomRange(-yRange, yRange),
      randomRange(1, 5)
    ];

    let coveringPlane = getSqrMagnitude(position) < 50;

    if (coveringPlane){
      coveringPlanesCount.current++;

    }

    return <Plane
      position={position}
      key={key}
      mouse={mouse}
      color={niceColors[22][randNum]}
      liveColor={niceColors[24][randNum]}
      isCoveringLogo={coveringPlane}
      uncoveredLogo={uncoveredLogo}
    />
  }

  const mouse = useRef([0, 0]);
  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]), [])

  const planesCount = 150;
  const planes = useMemo(() => {
    let planes = [];
    let key = 0;
    for (let i = 0; i < planesCount; i++) {
      planes.push(
        createPlane(4, 4, key++)
      );
    }
    for (let i = 0; i < planesCount; i++) {
      planes.push(
        createPlane(12, 12, key++)
      );
    }
    for (let i = 0; i < planesCount; i++) {
      planes.push(
        createPlane(30, 10, key++)
      );
    }
    return planes;
  });
  const history = useHistory();

  return (
    <Canvas onMouseMove={onMouseMove}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 15], near: 5, far: 20 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.Uncharted2ToneMapping
        gl.setClearColor(new THREE.Color('#020207'))
      }}
    >
      <Effects />
      <fog attach="fog" args={['white', 50, 190]} />
      <FlashLight count={10000} mouse={mouse} />
      <ambientLight intensity={0.05} />
      <pointLight position={[0, 0, 10]} distance={10} intensity={0.2} color="white" />
      <Suspense fallback={null}>
        {planes}
        <Logo visible={isUncovered} history={history} />
      </Suspense>
    </Canvas>
  );
}
