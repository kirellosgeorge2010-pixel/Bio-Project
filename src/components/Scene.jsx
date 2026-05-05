import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, Environment } from '@react-three/drei'
import * as THREE from 'three'
import MicroscopicLandscape from './MicroscopicLandscape'
import MapNode from './MapNode'
import { NODES } from '../data'

const TARGET_POSITIONS = {
  default: { pos: new THREE.Vector3(0, 3.5, 9), look: new THREE.Vector3(0, 0, 0) },
  selected: { pos: new THREE.Vector3(-2.5, 2.8, 6.5), look: new THREE.Vector3(-1, 0, 0) },
}

export default function Scene({ selectedNode, onSelect }) {
  const orbitRef = useRef()
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3(0, 3.5, 9))
  const targetLook = useRef(new THREE.Vector3(0, 0, 0))
  const isAnimating = useRef(false)

  // Trigger camera transition when a node is selected
  useEffect(() => {
    if (selectedNode) {
      targetPos.current.copy(TARGET_POSITIONS.selected.pos)
      targetLook.current.copy(TARGET_POSITIONS.selected.look)
    } else {
      targetPos.current.copy(TARGET_POSITIONS.default.pos)
      targetLook.current.copy(TARGET_POSITIONS.default.look)
    }
    isAnimating.current = true
  }, [selectedNode])

  useFrame(() => {
    if (!isAnimating.current) return

    // Smoothly lerp camera position
    camera.position.lerp(targetPos.current, 0.06)

    // Smoothly lerp look-at
    if (orbitRef.current) {
      orbitRef.current.target.lerp(targetLook.current, 0.06)
      orbitRef.current.update()
    }

    const distPos = camera.position.distanceTo(targetPos.current)
    if (distPos < 0.01) {
      isAnimating.current = false
    }
  })

  return (
    <>
      {/* Orbit controls - subtle user panning */}
      <OrbitControls
        ref={orbitRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.25}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={Math.PI / 4}
      />

      {/* Lighting */}
      <ambientLight intensity={0.15} color="#0d1b3e" />
      <directionalLight position={[5, 8, 5]} intensity={0.6} color="#c0e8ff" />
      <pointLight position={[0, 3, 0]} intensity={1.2} color="#00c8ff" distance={12} decay={2} />
      <pointLight position={[3, 1, -2]} intensity={0.6} color="#c084fc" distance={10} decay={2} />
      <pointLight position={[-3, 1, 2]} intensity={0.5} color="#3ddc84" distance={10} decay={2} />

      {/* Background Stars */}
      <Stars radius={60} depth={30} count={2000} factor={2.5} saturation={0.6} fade speed={0.4} />

      {/* Terrain */}
      <MicroscopicLandscape />

      {/* All clickable nodes */}
      {NODES.map((node) => (
        <MapNode
          key={node.id}
          node={node}
          onSelect={onSelect}
          isSelected={selectedNode?.id === node.id}
        />
      ))}
    </>
  )
}
