import { useRef, useState, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html, Sphere } from '@react-three/drei'
import * as THREE from 'three'

/**
 * MapNode: A single 3D Point of Interest.
 * - Gentle breathing/bob via useFrame
 * - Hover: bobs upward, glow intensifies
 * - Click: fires onSelect callback
 * - Renders coordinate label & name via Html overlay
 */
export default function MapNode({ node, onSelect, isSelected }) {
  const meshRef = useRef()
  const ringRef = useRef()
  const glowRef = useRef()
  const [hovered, setHovered] = useState(false)

  const baseY = node.position[1]
  const color = useMemo(() => new THREE.Color(node.color), [node.color])
  const emissive = useMemo(() => new THREE.Color(node.emissive), [node.emissive])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (!meshRef.current) return

    // Breathing bob
    const breath = Math.sin(t * 1.1 + node.position[0]) * 0.08
    const hoverLift = hovered ? 0.22 : 0
    const selectedLift = isSelected ? 0.15 : 0
    meshRef.current.position.y = baseY + breath + hoverLift + selectedLift

    // Rotation
    meshRef.current.rotation.y = t * 0.6
    meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.12

    // Glow pulse
    if (glowRef.current) {
      const pulse = 0.5 + Math.sin(t * 2.2 + node.position[2]) * 0.5
      glowRef.current.material.emissiveIntensity = hovered || isSelected
        ? 1.2 + pulse * 0.6
        : 0.4 + pulse * 0.3
    }

    // Ring scale breathe
    if (ringRef.current) {
      const s = 1 + Math.sin(t * 1.8) * 0.07
      ringRef.current.scale.set(s, s, s)
      ringRef.current.rotation.z = t * 0.3
    }
  })

  const { gl } = useThree()

  return (
    <group position={node.position}>
      {/* Outer glow ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[node.size * 1.45, node.size * 0.06, 8, 48]} />
        <meshBasicMaterial color={node.color} transparent opacity={hovered ? 0.55 : 0.2} depthWrite={false} />
      </mesh>

      {/* Core node sphere */}
      <mesh
        ref={glowRef}
        onClick={(e) => { e.stopPropagation(); onSelect(node) }}
        onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); gl.domElement.style.cursor = 'pointer' }}
        onPointerLeave={(e) => { e.stopPropagation(); setHovered(false); gl.domElement.style.cursor = 'auto' }}
      >
        <sphereGeometry args={[node.size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.8}
          roughness={0.15}
          metalness={0.6}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Inner bright core */}
      <mesh>
        <sphereGeometry args={[node.size * 0.45, 16, 16]} />
        <meshBasicMaterial color="white" transparent opacity={hovered ? 0.6 : 0.25} />
      </mesh>

      {/* Primary node: extra halo */}
      {node.isPrimary && (
        <mesh>
          <sphereGeometry args={[node.size * 1.8, 24, 24]} />
          <meshBasicMaterial color={node.color} transparent opacity={0.04} depthWrite={false} side={THREE.BackSide} />
        </mesh>
      )}

      {/* HTML label overlay */}
      <Html
        center
        distanceFactor={7}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
        position={[0, node.size * 2.2, 0]}
      >
        <div style={{
          textAlign: 'center',
          transition: 'opacity 0.3s',
          opacity: hovered || isSelected ? 1 : 0.7,
        }}>
          <div style={{
            fontFamily: "'Baskervville', Georgia, serif",
            fontSize: node.isPrimary ? '13px' : '10px',
            fontWeight: node.isPrimary ? '600' : '400',
            color: node.color,
            textShadow: `0 0 12px ${node.color}`,
            whiteSpace: 'nowrap',
            letterSpacing: '0.04em',
          }}>
            {node.label}
          </div>
          {node.isPrimary && (
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '8px',
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.1em',
              marginTop: '2px',
            }}>
              {node.sublabel.toUpperCase()}
            </div>
          )}
          {/* Coordinate display */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '7.5px',
            color: 'rgba(0,200,255,0.6)',
            marginTop: '3px',
            letterSpacing: '0.08em',
          }}>
            X:{node.coords.x} Y:{node.coords.y}
          </div>
        </div>
      </Html>
    </group>
  )
}
