import { motion } from 'framer-motion'
import { TEAM, MAP_TEAM } from '../data'
import { Users, Award, Microscope, Star } from 'lucide-react'

const ROLE_ICONS = {
  'Lead Researcher': Microscope,
  'Data Analyst': Star,
  'default': Award,
}

export default function CreditsPage({ onBack }) {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #020810 0%, #040e1e 50%, #020810 100%)',
      overflowY: 'auto',
      position: 'relative',
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      {/* Grid bg */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(0,200,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,200,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        zIndex: 0,
      }} />

      {/* Scan line */}
      <div className="scan-overlay" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }} />

      {/* Corner brackets */}
      {['top-left','top-right','bottom-left','bottom-right'].map(c => (
        <div key={c} style={{
          position: 'fixed',
          [c.includes('top') ? 'top' : 'bottom']: 14,
          [c.includes('left') ? 'left' : 'right']: 14,
          width: 20, height: 20,
          borderTop: c.includes('top') ? '1.5px solid rgba(0,200,255,0.25)' : 'none',
          borderBottom: c.includes('bottom') ? '1.5px solid rgba(0,200,255,0.25)' : 'none',
          borderLeft: c.includes('left') ? '1.5px solid rgba(0,200,255,0.25)' : 'none',
          borderRight: c.includes('right') ? '1.5px solid rgba(0,200,255,0.25)' : 'none',
          zIndex: 5, pointerEvents: 'none',
        }} />
      ))}

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 960, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Back button */}
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          style={{
            background: 'rgba(0,200,255,0.07)',
            border: '1px solid rgba(0,200,255,0.2)',
            borderRadius: 8,
            color: '#00c8ff',
            fontSize: '11px',
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: '0.12em',
            padding: '8px 18px',
            cursor: 'pointer',
            marginBottom: 36,
            display: 'flex', alignItems: 'center', gap: 8,
          }}
        >
          ← RETURN TO MAP
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgba(0,200,255,0.06)',
            border: '1px solid rgba(0,200,255,0.15)',
            borderRadius: 20,
            padding: '6px 18px',
            marginBottom: 20,
          }}>
            <Users size={13} color="#00c8ff" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.2em', color: '#00c8ff', textTransform: 'uppercase' }}>
              Discovery Team — {MAP_TEAM.version}
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Baskervville', Georgia, serif",
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            color: '#e2e8f0',
            fontWeight: 400,
            letterSpacing: '0.03em',
            lineHeight: 1.15,
            marginBottom: 14,
          }}>
            Project Credits
          </h1>
          <p style={{
            fontFamily: "'Baskervville', Georgia, serif",
            fontStyle: 'italic',
            fontSize: '1rem',
            color: '#475569',
            maxWidth: 520,
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            "The Carbohydrate Map" — An Interactive 3D Discovery Experience
          </p>
          <div style={{
            width: 60, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(0,200,255,0.4), transparent)',
            margin: '20px auto 0',
          }} />
        </motion.div>

        {/* Team cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 20,
          marginBottom: 60,
        }}>
          {TEAM.map((member, i) => {
            const Icon = ROLE_ICONS[member.role] || ROLE_ICONS['default']
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                style={{
                  background: 'rgba(8,22,48,0.7)',
                  border: `1px solid ${member.color}25`,
                  borderRadius: 14,
                  padding: '28px 24px',
                  backdropFilter: 'blur(16px)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Top glow accent */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, transparent, ${member.color}90, transparent)`,
                }} />

                {/* Member avatar initial */}
                <div style={{
                  width: 52, height: 52,
                  borderRadius: '50%',
                  background: `${member.color}18`,
                  border: `2px solid ${member.color}50`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 16,
                  boxShadow: `0 0 20px ${member.color}22`,
                }}>
                  <span style={{
                    fontFamily: "'Baskervville', serif",
                    fontSize: '1.1rem',
                    color: member.color,
                    fontWeight: 600,
                  }}>
                    {member.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </span>
                </div>

                {/* Name */}
                <h3 style={{
                  fontFamily: "'Baskervville', Georgia, serif",
                  fontSize: '1.05rem',
                  color: '#e2e8f0',
                  fontWeight: 400,
                  marginBottom: 6,
                }}>
                  {member.name}
                </h3>

                {/* Role badge */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  background: `${member.color}14`,
                  border: `1px solid ${member.color}35`,
                  borderRadius: 6,
                  padding: '3px 10px',
                  marginBottom: 10,
                }}>
                  <Icon size={10} color={member.color} strokeWidth={1.5} />
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '9px',
                    letterSpacing: '0.1em',
                    color: member.color,
                    textTransform: 'uppercase',
                  }}>
                    {member.role}
                  </span>
                </div>

                {/* Field */}
                <p style={{
                  fontFamily: "'Baskervville', Georgia, serif",
                  fontStyle: 'italic',
                  fontSize: '0.8rem',
                  color: '#475569',
                  marginTop: 4,
                }}>
                  {member.field}
                </p>

                {/* Member number */}
                <div style={{
                  position: 'absolute', bottom: 14, right: 16,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '9px',
                  color: 'rgba(0,200,255,0.2)',
                  letterSpacing: '0.1em',
                }}>
                  #{String(member.id).padStart(2, '0')}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Project details banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{
            background: 'rgba(0,200,255,0.04)',
            border: '1px solid rgba(0,200,255,0.12)',
            borderRadius: 14,
            padding: '28px 32px',
          }}
        >
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(0,200,255,0.5)', marginBottom: 16, textTransform: 'uppercase' }}>
            ◈ Project Information
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 20 }}>
            {[
              { label: 'Project Title', value: 'The Carbohydrate Map' },
              { label: 'Subject', value: 'Biology — Biomolecules' },
              { label: 'Version', value: MAP_TEAM.version },
              { label: 'Date', value: MAP_TEAM.timestamp },
              { label: 'Technology', value: 'React · Three.js · Framer Motion' },
              { label: 'Compiled By', value: MAP_TEAM.name },
            ].map(item => (
              <div key={item.label}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: 'rgba(0,200,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: "'Baskervville', Georgia, serif", fontSize: '0.88rem', color: '#94a3b8' }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <p style={{ fontFamily: "'Baskervville', Georgia, serif", fontStyle: 'italic', fontSize: '0.8rem', color: '#1e3a5f' }}>
            Discovery Log Compiled by: {MAP_TEAM.name} · Role: {MAP_TEAM.role}
          </p>
        </div>
      </div>
    </div>
  )
}
