import { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import Scene from './components/Scene'
import SidePanel from './components/SidePanel'
import OverlayUI from './components/OverlayUI'
import CreditsPage from './pages/CreditsPage'
import RealLifePage from './pages/RealLifePage'
import useIsMobile from './hooks/useIsMobile'

export default function App() {
  const [selectedNode, setSelectedNode] = useState(null)
  const [currentPage, setCurrentPage] = useState('map')
  const isMobile = useIsMobile()

  const handleSelect = useCallback((node) => {
    setSelectedNode((prev) => (prev?.id === node.id ? null : node))
  }, [])

  const handleClose = useCallback(() => setSelectedNode(null), [])

  const handleNavigate = useCallback((page) => {
    setCurrentPage(page)
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
            style={{ width: '100%', height: '100%', display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              position: 'relative',
            }}
          >
            {/* ── 3D Canvas ── */}
            <motion.div
              animate={isMobile
                ? { height: selectedNode ? '35%' : '100%' }
                : { width: selectedNode ? '50%' : '100%' }
              }
              transition={{ type: 'spring', stiffness: 200, damping: 28 }}
              style={{
                flexShrink: 0,
                position: 'relative',
                ...(isMobile ? { width: '100%' } : { height: '100%' }),
              }}
            >
              <Canvas
                camera={{ position: [0, 3.5, 9], fov: isMobile ? 65 : 52 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: false }}
                style={{ background: 'transparent', width: '100%', height: '100%' }}
              >
                <Scene selectedNode={selectedNode} onSelect={handleSelect} />
              </Canvas>

              {/* Dim overlay on mobile when panel open */}
              {isMobile && selectedNode && (
                <div
                  onClick={handleClose}
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(2,8,16,0.5)',
                    zIndex: 4,
                    cursor: 'pointer',
                  }}
                />
              )}

              <OverlayUI
                selectedNode={selectedNode}
                onNodeSelect={handleSelect}
                currentPage={currentPage}
                onNavigate={handleNavigate}
                isMobile={isMobile}
              />
            </motion.div>

            {/* ── Side / Bottom Panel ── */}
            <AnimatePresence>
              {selectedNode && (
                <motion.div
                  key={selectedNode.id}
                  initial={isMobile ? { y: '100%', opacity: 0 } : { width: 0, opacity: 0 }}
                  animate={isMobile ? { y: 0, opacity: 1 } : { width: '50%', opacity: 1 }}
                  exit={isMobile ? { y: '100%', opacity: 0 } : { width: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 28 }}
                  style={isMobile
                    ? {
                        position: 'absolute',
                        bottom: 0, left: 0, right: 0,
                        height: '68%',
                        zIndex: 20,
                        overflow: 'hidden',
                      }
                    : {
                        height: '100%',
                        flexShrink: 0,
                        position: 'relative',
                        overflow: 'hidden',
                      }
                  }
                >
                  <SidePanel node={selectedNode} onClose={handleClose} isMobile={isMobile} />
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
            transition={{ duration: 0.35 }}
            style={{ width: '100%', height: '100%' }}
          >
            <RealLifePage onBack={() => handleNavigate('map')} isMobile={isMobile} />
            <PageNavBar currentPage={currentPage} onNavigate={handleNavigate} isMobile={isMobile} />
          </motion.div>
        )}

        {/* ── CREDITS PAGE ── */}
        {currentPage === 'credits' && (
          <motion.div
            key="credits"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            style={{ width: '100%', height: '100%' }}
          >
            <CreditsPage onBack={() => handleNavigate('map')} isMobile={isMobile} />
            <PageNavBar currentPage={currentPage} onNavigate={handleNavigate} isMobile={isMobile} />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}

// Persistent top nav bar for non-map pages
function PageNavBar({ currentPage, onNavigate, isMobile }) {
  const pages = [
    { key: 'map',      label: isMobile ? '← MAP' : '← Back to Map',  color: '#00c8ff' },
    { key: 'reallife', label: isMobile ? 'REAL LIFE' : 'Real Life',   color: '#3ddc84' },
    { key: 'credits',  label: 'Credits',                               color: '#f472b6' },
  ]
  return (
    <div style={{
      position: 'fixed',
      top: isMobile ? 10 : 16,
      left: '50%', transform: 'translateX(-50%)',
      zIndex: 100,
      display: 'flex', gap: isMobile ? 4 : 6,
      background: 'rgba(4,14,30,0.88)',
      border: '1px solid rgba(0,200,255,0.14)',
      borderRadius: 10, padding: isMobile ? '4px 4px' : '5px 6px',
      backdropFilter: 'blur(16px)',
      maxWidth: '95vw',
    }}>
      {pages.map(({ key, label, color }) => (
        <button
          key={key}
          onClick={() => onNavigate(key)}
          style={{
            background: currentPage === key ? `${color}18` : 'transparent',
            border: `1px solid ${currentPage === key ? color : 'transparent'}`,
            borderRadius: 7,
            padding: isMobile ? '5px 10px' : '5px 14px',
            cursor: 'pointer',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: isMobile ? '8px' : '9px',
            letterSpacing: '0.08em',
            color: currentPage === key ? color : '#475569',
            transition: 'all 0.18s',
            whiteSpace: 'nowrap',
          }}
        >
          {label.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
