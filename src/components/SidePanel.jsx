import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, FlaskConical, Dna, Atom, Layers, Microscope, Zap, User } from 'lucide-react'

const LOG_ICONS = {
  '01': Microscope,
  '02': Atom,
  '03': Layers,
  '04': Dna,
}

export default function SidePanel({ node, onClose }) {
  if (!node) return null

  return (
    <AnimatePresence>
      <motion.div
        key={node.id}
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 36 }}
        className="glass-panel"
        style={{
          position: 'absolute',
          top: 0, right: 0,
          width: '100%',
          height: '100%',
          overflowY: 'auto',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── Sticky Header ── */}
        <div style={{
          padding: '20px 22px 14px',
          borderBottom: '1px solid rgba(0,200,255,0.12)',
          position: 'sticky', top: 0, zIndex: 2,
          background: 'rgba(4,14,30,0.95)',
          backdropFilter: 'blur(20px)',
          flexShrink: 0,
        }}>
          {/* Top bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.18em', color: 'rgba(0,200,255,0.6)', textTransform: 'uppercase' }}>
              ◈ Discovery Log — Scanning Complete
            </span>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(0,200,255,0.07)',
                border: '1px solid rgba(0,200,255,0.2)',
                borderRadius: 6,
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '4px 10px',
                display: 'flex', alignItems: 'center', gap: 4,
                fontSize: '10px',
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.08em',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,200,255,0.45)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,200,255,0.2)'; e.currentTarget.style.color = '#94a3b8' }}
            >
              <X size={11} /> Close
            </button>
          </div>

          {/* Location */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <div style={{
              width: 10, height: 10, borderRadius: '50%',
              background: node.color,
              boxShadow: `0 0 14px ${node.color}`,
              marginTop: 7, flexShrink: 0,
            }} />
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: 'rgba(0,200,255,0.5)', letterSpacing: '0.12em', marginBottom: 4 }}>
                LOCATION IDENTIFIED
              </div>
              <h1 style={{
                fontFamily: "'Baskervville', Georgia, serif",
                fontSize: '1.5rem',
                color: node.color,
                textShadow: `0 0 20px ${node.color}50`,
                lineHeight: 1.2, marginBottom: 3,
              }}>
                {node.label}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ color: '#475569', fontSize: '11px', fontStyle: 'italic', fontFamily: "'Baskervville', serif" }}>
                  {node.sublabel}
                </span>
                <span style={{ color: '#1e3a5f', fontSize: '10px' }}>·</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: 'rgba(0,200,255,0.4)', letterSpacing: '0.08em' }}>
                  X:{node.coords.x} Y:{node.coords.y} Z:{node.coords.z}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Log Entries ── */}
        <div style={{ padding: '16px 18px', flex: 1 }}>
          {node.logs.map((log, i) => {
            const Icon = LOG_ICONS[log.id] || FlaskConical
            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.38 }}
                className="discovery-card"
              >
                {/* Log header row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10, flexWrap: 'wrap' }}>
                  <Icon size={12} color={node.color} strokeWidth={1.5} />
                  <span className="log-id" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.15em', color: 'rgba(0,200,255,0.7)', textTransform: 'uppercase' }}>
                    Discovery Log {log.id}
                  </span>
                  <ChevronRight size={9} color="rgba(0,200,255,0.35)" />
                  <span style={{ fontFamily: "'Baskervville', Georgia, serif", fontSize: '0.98rem', color: '#e2e8f0', fontWeight: 400 }}>
                    {log.title}
                  </span>
                </div>

                {/* ── TEXT ── */}
                {log.type === 'text' && (
                  <p style={{
                    fontSize: '0.8rem', lineHeight: 1.75, color: '#94a3b8',
                    borderLeft: log.highlight ? `2px solid ${node.color}60` : 'none',
                    paddingLeft: log.highlight ? 10 : 0,
                    fontStyle: log.highlight ? 'italic' : 'normal',
                  }}>
                    {log.content}
                  </p>
                )}

                {/* ── ATOMS ── */}
                {log.type === 'atoms' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {log.atoms.map((atom) => (
                      <div key={atom.symbol} style={{
                        display: 'flex', alignItems: 'flex-start', gap: 10,
                        padding: '9px 11px',
                        background: 'rgba(255,255,255,0.018)',
                        borderRadius: 8,
                        border: `1px solid ${atom.color}20`,
                      }}>
                        <div style={{
                          width: 34, height: 34, borderRadius: '50%',
                          background: `${atom.color}15`,
                          border: `1.5px solid ${atom.color}50`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '9px', fontWeight: 600, color: atom.color,
                        }}>
                          {atom.symbol.length > 3 ? atom.symbol.slice(0,3) : atom.symbol}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 500, marginBottom: 3, fontFamily: "'Baskervville', serif" }}>
                            {atom.name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.6 }}>
                            {atom.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ── CLASSIFICATION + TABLE ── */}
                {log.type === 'classification' && (
                  <>
                    {log.groups && log.groups.map((grp) => (
                      <div key={grp.label} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: node.color, flexShrink: 0, display: 'inline-block' }} />
                          <span style={{ fontSize: '0.82rem', color: '#cbd5e1', fontFamily: "'Baskervville', serif" }}>{grp.label}</span>
                        </div>
                        <p style={{ fontSize: '0.73rem', color: '#64748b', marginBottom: 4, paddingLeft: 12 }}>{grp.desc}</p>
                        <ul style={{ paddingLeft: 24, margin: 0 }}>
                          {grp.examples.map((ex) => (
                            <li key={ex} style={{ fontSize: '0.72rem', color: '#475569', listStyle: 'none', marginBottom: 2 }}>
                              <span style={{ color: `${node.color}90`, marginRight: 6 }}>–</span>{ex}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {log.table && (
                      <>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.14em', color: 'rgba(0,200,255,0.5)', textTransform: 'uppercase', marginTop: log.groups?.length ? 12 : 0, marginBottom: 8 }}>
                          ◈ Functional Reference Table
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                          <table className="func-table">
                            <thead>
                              <tr>
                                <th>Function</th>
                                <th>Molecule</th>
                                <th>Location</th>
                              </tr>
                            </thead>
                            <tbody>
                              {log.table.map((row) => (
                                <tr key={row.function}>
                                  <td style={{ color: node.color, fontWeight: 500 }}>{row.function}</td>
                                  <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem' }}>{row.molecule}</td>
                                  <td style={{ fontSize: '0.72rem' }}>{row.location}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* ── Per-Log Credit ── */}
                {log.credit && (
                  <div style={{
                    marginTop: 12,
                    paddingTop: 9,
                    borderTop: '1px solid rgba(255,255,255,0.04)',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                    <User size={9} color="rgba(0,200,255,0.3)" />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: 'rgba(0,200,255,0.3)', letterSpacing: '0.1em' }}>
                      Researcher: {log.credit}
                    </span>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* ── Panel Footer ── */}
        <div style={{
          padding: '12px 18px',
          borderTop: '1px solid rgba(0,200,255,0.07)',
          background: 'rgba(2,8,16,0.6)',
          flexShrink: 0,
        }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7.5px', color: 'rgba(0,200,255,0.35)', letterSpacing: '0.15em', marginBottom: 4 }}>
            ◈ DISCOVERY LOG COMPILED BY
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
            <div style={{ fontSize: '0.78rem', color: '#334155' }}>
              <span style={{ color: '#94a3b8', fontFamily: "'Baskervville', serif" }}>Kirellos George</span>
              <span style={{ margin: '0 8px', color: '#1e293b' }}>|</span>
              <span style={{ fontStyle: 'italic', fontFamily: "'Baskervville', serif" }}>Lead Researcher</span>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7.5px', color: 'rgba(0,200,255,0.2)', letterSpacing: '0.08em' }}>
              v2.1.0
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
