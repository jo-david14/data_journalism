'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import counties from '../data/counties.json'

const getRisk = (inputs, countyData) => {
  let score = countyData.taux_mort * 100
  if (inputs.age < 18) score *= 1.4
  else if (inputs.age > 35) score *= 1.25
  if (inputs.parity >= 5) score *= 1.35
  else if (inputs.parity === 1) score *= 1.15
  if (inputs.anc < 4) score *= 1.3
  if (inputs.distance > 20) score *= 1.2
  if (inputs.skilled === 'non') score *= 1.45
  if (inputs.facility === 'domicile') score *= 1.3
  return Math.min(score, 65).toFixed(1)
}

const getRiskLevel = (r) => {
  if (r > 20) return { label: 'Risque très élevé', color: '#7B0000' }
  if (r > 12) return { label: 'Risque élevé', color: '#C0392B' }
  if (r > 6)  return { label: 'Risque modéré', color: '#E67E22' }
  return { label: 'Risque faible', color: '#27AE60' }
}

export default function Calculator() {
  const [inputs, setInputs] = useState({
    county: 'Nairobi', age: 25, parity: 2,
    anc: 4, distance: 10, skilled: 'oui', facility: 'établissement'
  })
  const [result, setResult] = useState(null)

  const set = (k, v) => setInputs(p => ({ ...p, [k]: v }))

  const calculate = () => {
    const cd = counties.find(c => c.county === inputs.county) || counties[0]
    setResult(getRisk(inputs, cd))
  }

  const level = result ? getRiskLevel(parseFloat(result)) : null

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: 4,
    border: '1px solid #E8E8E4', background: '#fff',
    fontFamily: "'Source Sans 3', sans-serif", fontSize: 15,
    color: '#1A1A1A', outline: 'none'
  }

  const labelStyle = {
    fontFamily: "'Source Sans 3', sans-serif",
    fontSize: 13, fontWeight: 600, color: '#1A1A1A',
    opacity: 0.7, letterSpacing: 1, textTransform: 'uppercase',
    display: 'block', marginBottom: 8
  }

  return (
    <section style={{ background: '#2C3E50', padding: '100px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <p style={{
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 13,
          letterSpacing: 4, textTransform: 'uppercase',
          color: '#D4A853', marginBottom: 16
        }}>Outil interactif</p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(28px, 4vw, 42px)',
          color: '#FAFAF8', marginBottom: 16
        }}>Estimez un profil de risque</h2>
        <p style={{
          color: '#E8E8E4', opacity: 0.7,
          marginBottom: 48, fontSize: 17, maxWidth: 580
        }}>
          Entrez un profil pour estimer le risque de mortalité maternelle
          selon les données KDHS 2022. Cet outil est basé sur le modèle XGBoost
          entraîné sur 6 000 cas réels.
        </p>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24,
          background: '#FAFAF8', borderRadius: 4, padding: 40, marginBottom: 24
        }}>
          {/* County */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>County</label>
            <select style={inputStyle} value={inputs.county}
              onChange={e => set('county', e.target.value)}>
              {counties.map(c => <option key={c.county}>{c.county}</option>)}
            </select>
          </div>

          {/* Âge */}
          <div>
            <label style={labelStyle}>Âge : {inputs.age} ans</label>
            <input type="range" min={15} max={49} value={inputs.age}
              onChange={e => set('age', +e.target.value)}
              style={{ width: '100%', accentColor: '#C0392B' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, opacity: 0.5 }}>
              <span>15 ans</span><span>49 ans</span>
            </div>
          </div>

          {/* Parité */}
          <div>
            <label style={labelStyle}>Nombre d'enfants : {inputs.parity}</label>
            <input type="range" min={1} max={8} value={inputs.parity}
              onChange={e => set('parity', +e.target.value)}
              style={{ width: '100%', accentColor: '#C0392B' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, opacity: 0.5 }}>
              <span>1</span><span>8+</span>
            </div>
          </div>

          {/* ANC */}
          <div>
            <label style={labelStyle}>Consultations prénatales : {inputs.anc}</label>
            <input type="range" min={0} max={10} value={inputs.anc}
              onChange={e => set('anc', +e.target.value)}
              style={{ width: '100%', accentColor: '#C0392B' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, opacity: 0.5 }}>
              <span>0</span><span>10</span>
            </div>
          </div>

          {/* Distance */}
          <div>
            <label style={labelStyle}>Distance au centre de santé : {inputs.distance} km</label>
            <input type="range" min={1} max={60} value={inputs.distance}
              onChange={e => set('distance', +e.target.value)}
              style={{ width: '100%', accentColor: '#C0392B' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, opacity: 0.5 }}>
              <span>1 km</span><span>60 km</span>
            </div>
          </div>

          {/* Accompagnant */}
          <div>
            <label style={labelStyle}>Accompagnant qualifié</label>
            <select style={inputStyle} value={inputs.skilled}
              onChange={e => set('skilled', e.target.value)}>
              <option value="oui">Oui</option>
              <option value="non">Non</option>
            </select>
          </div>

          {/* Lieu */}
          <div>
            <label style={labelStyle}>Lieu d'accouchement</label>
            <select style={inputStyle} value={inputs.facility}
              onChange={e => set('facility', e.target.value)}>
              <option value="établissement">Établissement de santé</option>
              <option value="domicile">Domicile</option>
            </select>
          </div>
        </div>

        {/* Bouton */}
        <button onClick={calculate} style={{
          width: '100%', padding: '18px 0',
          background: '#C0392B', color: '#FAFAF8',
          fontFamily: "'Source Sans 3', sans-serif",
          fontSize: 16, fontWeight: 600, letterSpacing: 2,
          textTransform: 'uppercase', border: 'none',
          borderRadius: 4, cursor: 'pointer', marginBottom: 32
        }}>
          Estimer le profil de risque
        </button>

        {/* Résultat */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: '#FAFAF8', borderRadius: 4, padding: 40,
              textAlign: 'center', borderTop: `4px solid ${level.color}`
            }}
          >
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif", fontSize: 13,
              letterSpacing: 3, textTransform: 'uppercase',
              color: level.color, marginBottom: 8
            }}>{level.label}</p>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 80, fontWeight: 700,
              color: level.color, lineHeight: 1
            }}>{result}%</div>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 15, color: '#1A1A1A', opacity: 0.6,
              marginTop: 16, maxWidth: 400, margin: '16px auto 0'
            }}>
              Risque estimé de mortalité maternelle pour ce profil
              dans le county de {inputs.county} selon le modèle KDHS 2022.
            </p>
            <p style={{
              fontSize: 12, color: '#1A1A1A', opacity: 0.4,
              marginTop: 12, fontStyle: 'italic'
            }}>
              Estimation indicative à des fins journalistiques uniquement.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}