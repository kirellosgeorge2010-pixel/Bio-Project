import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * MicroscopicLandscape: particle network + terrain mesh
 * representing the surface of a cell / metabolic pathway map.
 */
export default function MicroscopicLandscape() {
  const groupRef = useRef()
  const meshRef = useRef()
  const lineRef = useRef()

  // Grid terrain geometry
  const { positions, linePositions } = useMemo(() => {
    const rows = 28
    const cols = 28
    const spacing = 0.55
    const positions = []
    const linePositions = []

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - cols / 2) * spacing
        const z = (r - rows / 2) * spacing
        const y = (Math.sin(r * 0.4) * Math.cos(c * 0.4)) * 0.18
        positions.push(x, y, z)
      }
    }

    // Horizontal lines
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols - 1; c++) {
        const i = (r * cols + c) * 3
        const j = (r * cols + c + 1) * 3
        linePositions.push(
          positions[i], positions[i + 1], positions[i + 2],
          positions[j], positions[j + 1], positions[j + 2]
        )
      }
    }
    // Vertical lines
    for (let r = 0; r < rows - 1; r++) {
      for (let c = 0; c < cols; c++) {
        const i = (r * cols + c) * 3
        const j = ((r + 1) * cols + c) * 3
        linePositions.push(
          positions[i], positions[i + 1], positions[i + 2],
          positions[j], positions[j + 1], positions[j + 2]
        )
      }
    }

    return {
      positions: new Float32Array(positions),
      linePositions: new Float32Array(linePositions),
    }
  }, [])

  // Breathing / undulation animation
  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = Math.sin(t * 0.04) * 0.06
    groupRef.current.position.y = Math.sin(t * 0.3) * 0.04 - 1.6
  })

  return (
    <group ref={groupRef}>
      {/* Grid lines */}
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={linePositions}
            count={linePositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00c8ff"
          transparent
          opacity={0.055}
          depthWrite={false}
        />
      </lineSegments>

      {/* Vertex points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={positions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00c8ff"
          size={0.025}
          transparent
          opacity={0.35}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Ambient floating particles */}
      <FloatingParticles />
    </group>
  )
}

function FloatingParticles() {
  const ref = useRef()
  const count = 200

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const palette = [
      new THREE.Color('#00c8ff'),
      new THREE.Color('#3ddc84'),
      new THREE.Color('#c084fc'),
      new THREE.Color('#f7a04b'),
      new THREE.Color('#f472b6'),
    ]
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 14
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14
      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3]     = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return { positions: pos, colors: col }
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.rotation.y = t * 0.008
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  )
}
