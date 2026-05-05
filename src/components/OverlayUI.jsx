import { motion } from 'framer-motion'
import { NODES, MAP_TEAM } from '../data'
import { Map, Leaf, Users } from 'lucide-react'

export default function OverlayUI({ selectedNode, onNodeSelect, currentPage, onNavigate }) {
  return (
    <>
      {/* ── Top Header Bar ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        zIndex: 5,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        padding: '16px 20px',
        background: 'linear-gradient(to bottom, rgba(2,8,16,0.88) 0%, transparent 100%)',
        pointerEvents: 'none',
      }}>
        {/* Title */}
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(0,200,255,0.5)', marginBottom: 4, textTransform: 'uppercase' }}>
            ◈ Bio-Map System v2.1 — Active Scan
          </div>
          <h1 style={{ fontFamily: "'Baskervville', Georgia, serif", fontSize: '1.45rem', color: '#e2e8f0', fontWeight: 400, letterSpacing: '0.03em', lineHeight: 1.2 }}>
            The Carbohydrate Map
          </h1>
          <p style={{ fontFamily: "'Baskervville', Georgia, serif", fontStyle: 'italic', fontSize: '0.75rem', color: '#475569', marginTop: 2 }}>
            An Interactive Discovery Experience
          </p>
        </div>

        {/* Status readout */}
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: 'rgba(0,200,255,0.4)', letterSpacing: '0.1em', textAlign: 'right', lineHeight: 1.9 }}>
          <div>SYS: ONLINE</div>
          <div>NODES: {NODES.length} DETECTED</div>
          <div>GRID: 28×28</div>
        </div>
      </div>

      {/* ── Page Navigation (top-center) ── */}
      <div style={{
        position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)',
        zIndex: 6,
        display: 'flex', alignItems: 'center', gap: 6,
        background: 'rgba(4,14,30,0.75)',
        border: '1px solid rgba(0,200,255,0.14)',
        borderRadius: 10,
        padding: '5px 6px',
        backdropFilter: 'blur(16px)',
      }}>
        {[
          { key: 'map', label: 'MAP', Icon: Map, color: '#00c8ff' },
          { key: 'reallife', label: 'REAL LIFE', Icon: Leaf, color: '#3ddc84' },
          { key: 'credits', label: 'CREDITS', Icon: Users, color: '#f472b6' },
        ].map(({ key, label, Icon, color }) => (
          <motion.button
            key={key}
            onClick={() => onNavigate(key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: currentPage === key ? `${color}18` : 'transparent',
              border: `1px solid ${currentPage === key ? color : 'transparent'}`,
              borderRadius: 7,
              padding: '5px 13px',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
              transition: 'all 0.18s',
            }}
          >
            <Icon size={11} color={currentPage === key ? color : '#334155'} strokeWidth={1.5} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.12em',
              color: currentPage === key ? color : '#334155',
              transition: 'color 0.18s',
            }}>
              {label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* ── Node Navigation Pills (bottom left) ── */}
      <div style={{
        position: 'absolute', bottom: 52, left: 16,
        zIndex: 5,
        display: 'flex', flexDirection: 'column', gap: 6,
      }}>
        {NODES.map((node) => (
          <motion.button
            key={node.id}
            onClick={() => onNodeSelect(node)}
            whileHover={{ scale: 1.06, x: 3 }}
            whileTap={{ scale: 0.96 }}
            style={{
              background: selectedNode?.id === node.id ? `${node.color}18` : 'rgba(4,14,30,0.72)',
              border: `1px solid ${selectedNode?.id === node.id ? node.color : 'rgba(0,200,255,0.12)'}`,
              borderRadius: 8,
              padding: '5px 12px',
              display: 'flex', alignItems: 'center', gap: 8,
              cursor: 'pointer',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.18s',
              boxShadow: selectedNode?.id === node.id ? `0 0 12px ${node.color}25` : 'none',
            }}
          >
            <div style={{
              width: 7, height: 7, borderRadius: '50%',
              background: node.color,
              boxShadow: `0 0 8px ${node.color}`,
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '8.5px', letterSpacing: '0.08em',
              color: selectedNode?.id === node.id ? node.color : '#334155',
              whiteSpace: 'nowrap',
            }}>
              {node.label.toUpperCase()}
            </span>
          </motion.button>
        ))}
      </div>

      {/* ── Instruction hint ── */}
      {!selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          style={{
            position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)',
            fontFamily: "'JetBrains Mono', monospace", fontSize: '8.5px',
            letterSpacing: '0.18em', color: 'rgba(0,200,255,0.35)', textTransform: 'uppercase',
            zIndex: 5, pointerEvents: 'none', textAlign: 'center', whiteSpace: 'nowrap',
          }}
        >
          ◈ Click any node to open Discovery Log · Drag to rotate
        </motion.div>
      )}

      {/* ── Footer ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        zIndex: 5,
        padding: '8px 18px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'linear-gradient(to top, rgba(2,8,16,0.75) 0%, transparent 100%)',
        pointerEvents: 'none',
      }}>
        <span style={{ fontFamily: "'Baskervville', Georgia, serif", fontSize: '0.7rem', color: '#1e293b', fontStyle: 'italic' }}>
          Discovery Log Compiled by: {MAP_TEAM.name}
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7.5px', color: 'rgba(0,200,255,0.25)', letterSpacing: '0.1em' }}>
          Role: {MAP_TEAM.role} · {MAP_TEAM.version}
        </span>
      </div>

      {/* ── Scan line ── */}
      <div className="scan-overlay" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }} />

      {/* ── Corner brackets ── */}
      {['top-left','top-right','bottom-left','bottom-right'].map((corner) => (
        <div key={corner} style={{
          position: 'absolute',
          [corner.includes('top') ? 'top' : 'bottom']: 10,
          [corner.includes('left') ? 'left' : 'right']: 10,
          width: 16, height: 16,
          borderTop: corner.includes('top') ? '1.5px solid rgba(0,200,255,0.2)' : 'none',
          borderBottom: corner.includes('bottom') ? '1.5px solid rgba(0,200,255,0.2)' : 'none',
          borderLeft: corner.includes('left') ? '1.5px solid rgba(0,200,255,0.2)' : 'none',
          borderRight: corner.includes('right') ? '1.5px solid rgba(0,200,255,0.2)' : 'none',
          zIndex: 5, pointerEvents: 'none',
        }} />
      ))}
    </>
  )
}
