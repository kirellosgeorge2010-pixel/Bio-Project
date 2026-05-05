import { motion } from 'framer-motion'
import { REAL_LIFE, MAP_TEAM } from '../data'
import { Leaf, Zap, Info } from 'lucide-react'

export default function RealLifePage({ onBack }) {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #020810 0%, #061208 50%, #020810 100%)',
      overflowY: 'auto',
      position: 'relative',
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      {/* Hex/grid bg */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(61,220,132,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(61,220,132,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        zIndex: 0,
      }} />

      {/* Scan line overlay */}
      <div className="scan-overlay" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }} />

      {/* Corner brackets */}
      {['top-left','top-right','bottom-left','bottom-right'].map(c => (
        <div key={c} style={{
          position: 'fixed',
          [c.includes('top') ? 'top' : 'bottom']: 14,
          [c.includes('left') ? 'left' : 'right']: 14,
          width: 20, height: 20,
          borderTop: c.includes('top') ? '1.5px solid rgba(61,220,132,0.25)' : 'none',
          borderBottom: c.includes('bottom') ? '1.5px solid rgba(61,220,132,0.25)' : 'none',
          borderLeft: c.includes('left') ? '1.5px solid rgba(61,220,132,0.25)' : 'none',
          borderRight: c.includes('right') ? '1.5px solid rgba(61,220,132,0.25)' : 'none',
          zIndex: 5, pointerEvents: 'none',
        }} />
      ))}

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Back button */}
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          style={{
            background: 'rgba(61,220,132,0.07)',
            border: '1px solid rgba(61,220,132,0.2)',
            borderRadius: 8,
            color: '#3ddc84',
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
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgba(61,220,132,0.07)',
            border: '1px solid rgba(61,220,132,0.2)',
            borderRadius: 20,
            padding: '6px 18px',
            marginBottom: 20,
          }}>
            <Leaf size={13} color="#3ddc84" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', letterSpacing: '0.2em', color: '#3ddc84', textTransform: 'uppercase' }}>
              Field Observation Log — Real World
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
            Carbohydrates in Real Life
          </h1>
          <p style={{
            fontFamily: "'Baskervville', Georgia, serif",
            fontStyle: 'italic',
            fontSize: '1rem',
            color: '#475569',
            maxWidth: 560,
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Every meal tells a biochemical story. Here is where carbohydrates — monosaccharides, disaccharides, and polysaccharides — appear in the foods we eat every day.
          </p>
          <div style={{
            width: 60, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(61,220,132,0.4), transparent)',
            margin: '20px auto 0',
          }} />
        </motion.div>

        {/* Food cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 22,
          marginBottom: 60,
        }}>
          {REAL_LIFE.map((food, i) => (
            <motion.div
              key={food.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i, duration: 0.45 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              style={{
                background: 'rgba(6,18,8,0.75)',
                border: `1px solid ${food.color}22`,
                borderRadius: 16,
                overflow: 'hidden',
                backdropFilter: 'blur(16px)',
                position: 'relative',
              }}
            >
              {/* Top color bar */}
              <div style={{
                height: 3,
                background: `linear-gradient(90deg, ${food.color}00, ${food.color}cc, ${food.color}00)`,
              }} />

              <div style={{ padding: '20px 22px 22px' }}>
                {/* Emoji + name row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <div style={{
                    width: 52, height: 52,
                    borderRadius: 14,
                    background: `${food.color}12`,
                    border: `1px solid ${food.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.8rem',
                    flexShrink: 0,
                  }}>
                    {food.emoji}
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: "'Baskervville', Georgia, serif",
                      fontSize: '1.05rem',
                      color: '#e2e8f0',
                      fontWeight: 400,
                      marginBottom: 5,
                    }}>
                      {food.name}
                    </h3>
                    {/* Carb type badge */}
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      background: `${food.color}14`,
                      border: `1px solid ${food.color}35`,
                      borderRadius: 5,
                      padding: '2px 9px',
                    }}>
                      <span style={{
                        width: 5, height: 5, borderRadius: '50%',
                        background: food.color,
                        boxShadow: `0 0 6px ${food.color}`,
                        flexShrink: 0,
                        display: 'inline-block',
                      }} />
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '8px',
                        letterSpacing: '0.08em',
                        color: food.color,
                      }}>
                        {food.carbType}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p style={{
                  fontSize: '0.8rem',
                  lineHeight: 1.7,
                  color: '#64748b',
                  marginBottom: 16,
                  fontFamily: "'Baskervville', Georgia, serif",
                }}>
                  {food.description}
                </p>

                {/* Carbs per 100g highlight */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: `${food.color}0a`,
                  border: `1px solid ${food.color}20`,
                  borderRadius: 8,
                  padding: '9px 14px',
                  marginBottom: 14,
                }}>
                  <Zap size={12} color={food.color} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>
                    CARBS PER 100g:
                  </span>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '13px',
                    fontWeight: 600,
                    color: food.color,
                    textShadow: `0 0 10px ${food.color}55`,
                    marginLeft: 'auto',
                  }}>
                    {food.carbs_per_100g}
                  </span>
                </div>

                {/* Fun facts */}
                <div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    marginBottom: 8,
                  }}>
                    <Info size={10} color="rgba(0,200,255,0.4)" />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.14em', color: 'rgba(0,200,255,0.4)', textTransform: 'uppercase' }}>
                      Key Facts
                    </span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {food.facts.map((fact, fi) => (
                      <li key={fi} style={{
                        fontSize: '0.73rem',
                        color: '#475569',
                        padding: '3px 0',
                        borderBottom: fi < food.facts.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                        display: 'flex', alignItems: 'flex-start', gap: 6,
                      }}>
                        <span style={{ color: `${food.color}70`, flexShrink: 0, marginTop: 1 }}>–</span>
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Credit */}
                <div style={{
                  marginTop: 16,
                  paddingTop: 10,
                  borderTop: '1px solid rgba(255,255,255,0.04)',
                  display: 'flex', justifyContent: 'flex-end',
                }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '8px',
                    letterSpacing: '0.1em',
                    color: 'rgba(0,200,255,0.25)',
                  }}>
                    Researcher: Kirellos George
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          style={{
            background: 'rgba(61,220,132,0.04)',
            border: '1px solid rgba(61,220,132,0.15)',
            borderRadius: 14,
            padding: '28px 32px',
          }}
        >
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(61,220,132,0.5)', marginBottom: 12, textTransform: 'uppercase' }}>
            ◈ Summary Observation
          </div>
          <p style={{
            fontFamily: "'Baskervville', Georgia, serif",
            fontSize: '0.95rem',
            lineHeight: 1.8,
            color: '#64748b',
            fontStyle: 'italic',
            maxWidth: 820,
          }}>
            Carbohydrates are universal — from the glucose energizing your brain right now, to the cellulose in your notebook, to the lactose in your morning milk. Understanding carbohydrate biochemistry is not merely academic; it directly explains digestion, nutrition labels, fermentation, plant biology, and the very mechanism by which your cells produce ATP. Every carbohydrate you encounter tells the story of carbon, hydrogen, and oxygen working in biochemical harmony.
          </p>
          <div style={{ marginTop: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: 'rgba(0,200,255,0.3)', letterSpacing: '0.1em' }}>
            Discovery Log Compiled by: {MAP_TEAM.name} · Role: {MAP_TEAM.role} · {MAP_TEAM.version}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
