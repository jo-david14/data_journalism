'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import shap from '../data/shap.json'

export default function ShapSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <section ref={ref} style={{ background: '#FAFAF8', padding: '100px 20px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <p style={{
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 13,
          letterSpacing: 4, textTransform: 'uppercase',
          color: '#C0392B', marginBottom: 16
        }}>Ce que le modèle révèle</p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(28px, 4vw, 42px)',
          color: '#1A1A1A', marginBottom: 16
        }}>Les vrais déterminants de la mortalité</h2>
        <p style={{
          color: '#1A1A1A', opacity: 0.6, maxWidth: 600,
          marginBottom: 64, fontSize: 18
        }}>
          Un modèle XGBoost entraîné sur 6 000 cas identifie les facteurs
          qui prédisent le mieux si une femme survivra à son accouchement.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          {/* Graphique */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <ResponsiveContainer width="100%" height={380}>
              <BarChart data={shap} layout="vertical" margin={{ left: 20, right: 30 }}>
                <XAxis type="number" hide />
                <YAxis
                  type="category" dataKey="feature" width={180}
                  tick={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fill: '#1A1A1A' }}
                  axisLine={false} tickLine={false}
                />
                <Tooltip
                  formatter={(v) => [v.toFixed(3), 'Impact SHAP']}
                  contentStyle={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    background: '#1A1A1A', border: 'none',
                    color: '#FAFAF8', borderRadius: 4
                  }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {shap.map((_, i) => (
                    <Cell key={i} fill={i < 3 ? '#C0392B' : '#2C3E50'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Explication */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 24, justifyContent: 'center' }}
          >
            {[
              { rang: '01', titre: 'La pauvreté avant tout', texte: 'Le taux de pauvreté du county est le prédicteur le plus puissant. Une femme dans un county pauvre a un risque structurellement plus élevé, indépendamment de ses choix individuels.' },
              { rang: '02', titre: "L'éducation protège", texte: "Le niveau d'éducation est le deuxième facteur. Chaque année de scolarisation supplémentaire réduit significativement le risque — un argument fort pour l'investissement en éducation." },
              { rang: '03', titre: 'La distance est mortelle', texte: 'Chaque kilomètre supplémentaire entre le domicile et un établissement de santé augmente le risque. Dans les zones rurales, cette distance est souvent fatale.' },
            ].map(({ rang, titre, texte }) => (
              <div key={rang} style={{
                borderLeft: '3px solid #C0392B', paddingLeft: 20
              }}>
                <span style={{
                  fontFamily: "'Source Sans 3', sans-serif", fontSize: 11,
                  letterSpacing: 3, color: '#C0392B', textTransform: 'uppercase'
                }}>{rang}</span>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 20, color: '#1A1A1A', margin: '4px 0 8px'
                }}>{titre}</h3>
                <p style={{ fontSize: 15, color: '#1A1A1A', opacity: 0.7, lineHeight: 1.6 }}>{texte}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}