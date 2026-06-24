'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import kpis from '../data/kpis.json'

const stats = [
  { valeur: `${kpis.national_mortality_rate_pct}%`, label: 'Taux de mortalité national', rouge: true },
  { valeur: `${kpis.pct_home_delivery}%`, label: 'Accouchements à domicile', rouge: false },
  { valeur: `${kpis.pct_skilled_attendant}%`, label: 'Avec accompagnant qualifié', rouge: false },
  { valeur: `${kpis.highest_mortality_rate_pct}%`, label: `${kpis.county_with_highest_mortality} — le plus dangereux`, rouge: true },
  { valeur: `${kpis.lowest_mortality_rate_pct}%`, label: `${kpis.county_with_lowest_mortality} — le plus sûr`, rouge: false },
  { valeur: kpis.median_anc_visits, label: 'Consultations prénatales médianes', rouge: false },
]

function Stat({ valeur, label, rouge, delay }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{
        textAlign: 'center', padding: '40px 20px',
        borderTop: `3px solid ${rouge ? '#C0392B' : '#E8E8E4'}`
      }}
    >
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(42px, 7vw, 72px)',
        fontWeight: 700, color: rouge ? '#C0392B' : '#2C3E50',
        lineHeight: 1
      }}>{valeur}</div>
      <p style={{
        fontFamily: "'Source Sans 3', sans-serif",
        fontSize: 15, color: '#1A1A1A', opacity: 0.7,
        marginTop: 12, maxWidth: 180, margin: '12px auto 0'
      }}>{label}</p>
    </motion.div>
  )
}

export default function KPIs() {
  return (
    <section style={{ background: '#FAFAF8', padding: '100px 20px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <p style={{
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 13,
          letterSpacing: 4, textTransform: 'uppercase',
          color: '#C0392B', textAlign: 'center', marginBottom: 16
        }}>Les chiffres qui comptent</p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(28px, 4vw, 42px)',
          textAlign: 'center', marginBottom: 64, color: '#1A1A1A'
        }}>6 000 femmes. 606 décès. Un système qui faillit.</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '0 40px'
        }}>
          {stats.map((s, i) => <Stat key={i} {...s} delay={i * 0.1} />)}
        </div>
      </div>
    </section>
  )
}