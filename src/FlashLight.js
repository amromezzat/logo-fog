import * as THREE from 'three'
import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from 'react-three-fiber'

export default function FlashLight({mouse }) {
  const light = useRef()
  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width

  // The innards of this hook will run every frame
  useFrame(state => {
    // Makes the light follow the mouse
    light.current.position.set(mouse.current[0] / aspect, -mouse.current[1] / aspect, 0)
  })
  return (
    <>
      <pointLight ref={light} distance={40} intensity={0.5} color="lightblue" />
    </>
  )
}
