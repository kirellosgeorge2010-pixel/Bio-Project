import { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import Scene from './components/Scene'
import SidePanel from './components/SidePanel'
import OverlayUI from './components/OverlayUI'
import CreditsPage from './pages/CreditsPage'
import RealLifePage from './pages/RealLifePage'

export default function App() {
  const [selectedNode, setSelectedNode] = useState(null)
  // page: 'map' | 'reallife' | 'credits'
  const [currentPage, setCurrentPage] = useState('map')

  const handleSelect = useCallback((node) => {
    setSelectedNode((prev) => (prev?.id === node.id ? null : node))
  }, [])

  const handleClose = useCallback(() => {
    setSelectedNode(null)
  }, [])

  const handleNavigate = useCallback((page) => {
    setCurrentPage(page)
    // Close side panel when leaving map page
    if (page !== 'map') setSelectedNode(null)
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#020810', position: 'relative' }}>
      <AnimatePresence mode="wait">

        {/* ── MAP PAGE ── */}
        {currentPage === 'map' && (
          <motion.div
            key="map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{ width: '100%', height: '100%', display: 'flex', position: 'relative' }}
          >
            {/* 3D Canvas — shrinks from 100% → 50% */}
            <motion.div
              animate={{ width: selectedNode ? '50%' : '100%' }}
              transition={{ type: 'spring', stiffness: 210, damping: 30 }}
              style={{ height: '100%', flexShrink: 0, position: 'relative' }}
            >
              <Canvas
                camera={{ position: [0, 3.5, 9], fov: 52 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: false }}
                style={{ background: 'transparent' }}
              >
                <Scene selectedNode={selectedNode} onSelect={handleSelect} />
              </Canvas>

              {/* HUD overlays on top of canvas */}
              <OverlayUI
                selectedNode={selectedNode}
                onNodeSelect={handleSelect}
                currentPage={currentPage}
                onNavigate={handleNavigate}
              />
            </motion.div>

            {/* Side Panel — 50% width */}
            <AnimatePresence>
              {selectedNode && (
                <motion.div
                  key={selectedNode.id}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '50%', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 210, damping: 30 }}
                  style={{ height: '100%', flexShrink: 0, position: 'relative', overflow: 'hidden' }}
                >
                  <SidePanel node={selectedNode} onClose={handleClose} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── REAL LIFE PAGE ── */}
        {currentPage === 'reallife' && (
          <motion.div
            key="reallife"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{ width: '100%', height: '100%' }}
          >
            <RealLifePage onBack={() => handleNavigate('map')} />
            {/* Keep nav accessible on other pages too */}
            <NavBar currentPage={currentPage} onNavigate={handleNavigate} />
          </motion.div>
        )}

        {/* ── CREDITS PAGE ── */}
        {currentPage === 'credits' && (
          <motion.div
            key="credits"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{ width: '100%', height: '100%' }}
          >
            <CreditsPage onBack={() => handleNavigate('map')} />
            <NavBar currentPage={currentPage} onNavigate={handleNavigate} />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}

// Persistent top-center nav bar for non-map pages
function NavBar({ currentPage, onNavigate }) {
  const { Map, Leaf, Users } = { Map: () => null, Leaf: () => null, Users: () => null }
  const pages = [
    { key: 'map', label: '← Back to Map', color: '#00c8ff' },
    { key: 'reallife', label: 'Real Life', color: '#3ddc84' },
    { key: 'credits', label: 'Credits', color: '#f472b6' },
  ]
  return (
    <div style={{
      position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)',
      zIndex: 100,
      display: 'flex', gap: 6,
      background: 'rgba(4,14,30,0.85)',
      border: '1px solid rgba(0,200,255,0.14)',
      borderRadius: 10, padding: '5px 6px',
      backdropFilter: 'blur(16px)',
    }}>
      {pages.map(({ key, label, color }) => (
        <button
          key={key}
          onClick={() => onNavigate(key)}
          style={{
            background: currentPage === key ? `${color}18` : 'transparent',
            border: `1px solid ${currentPage === key ? color : 'transparent'}`,
            borderRadius: 7, padding: '5px 14px',
            cursor: 'pointer',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px', letterSpacing: '0.1em',
            color: currentPage === key ? color : '#475569',
            transition: 'all 0.18s',
          }}
        >
          {label.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
