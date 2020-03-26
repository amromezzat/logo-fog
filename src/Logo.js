import React, { Suspense, useEffect, useRef, useState, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Logo({ visible, history }) {
    const { nodes, materials } = useLoader(GLTFLoader, '/resources/novartis-brandmark-logo.glb')
    const mesh = useRef()
    const [isVisible, setIsVisible] = useState(visible.current);
    const [hovered, setHovered] = useState(false);

    const material = useMemo(() => {
        return new THREE.MeshStandardMaterial({ color: new THREE.Color('#2a2a2a'), roughness: 1, metalness: 0.9 })
    }, [])

    useFrame(({ clock }) => {
        if (isVisible)
            mesh.current.rotation.x = mesh.current.rotation.y = mesh.current.rotation.z = Math.sin(clock.getElapsedTime()) * 0.1
        else if (visible.current)
            setIsVisible(true);
    })

    useEffect(() => {
        document.body.style.cursor = hovered && isVisible ? 'pointer' : 'move'
    }, [hovered])

    return (
        <group dispose={null}>
            <group onClick={() => isVisible && history.push("/about")} onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)} rotation={[1.57, 0, 0]} position={[0, -5, -5]} scale={[6, 6, 6]}>
                <mesh ref={mesh} material={materials['Material.001']} geometry={nodes.Novartis.geometry} receiveShadow castShadow />
                <mesh scale={[1, 1, 0.5]} visible={isVisible} position={[0, 0, 0.5]} material={materials.Material} geometry={nodes.banner.geometry} receiveShadow castShadow />
            </group>
        </group>
    )
} 