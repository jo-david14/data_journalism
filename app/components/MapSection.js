'use client'
import { useEffect, useState } from 'react'
import counties from '../data/counties.json'

const getColor = (t) => t > 20 ? '#7B0000' : t > 15 ? '#C0392B' : t > 10 ? '#E74C3C' : t > 5 ? '#F1948A' : '#FADBD8'

const CENTERS = {
  "Mombasa": [-4.05, 39.67], "Kwale": [-4.18, 39.45], "Kilifi": [-3.51, 39.85],
  "Tana River": [-1.8, 39.5], "Lamu": [-2.27, 40.9], "Taita Taveta": [-3.4, 38.0],
  "Garissa": [-0.45, 39.65], "Wajir": [1.75, 40.06], "Mandera": [3.94, 41.86],
  "Marsabit": [2.33, 37.99], "Isiolo": [0.35, 38.0], "Meru": [0.05, 37.65],
  "Tharaka-Nithi": [-0.3, 37.9], "Embu": [-0.53, 37.45], "Kitui": [-1.37, 38.0],
  "Machakos": [-1.52, 37.27], "Makueni": [-2.25, 37.62], "Nyandarua": [-0.52, 36.52],
  "Nyeri": [-0.42, 36.95], "Kirinyaga": [-0.66, 37.28], "Murang'a": [-0.72, 37.03],
  "Kiambu": [-1.17, 36.83], "Turkana": [3.1, 35.6], "West Pokot": [1.62, 35.12],
  "Samburu": [1.2, 37.1], "Trans Nzoia": [1.05, 34.95], "Uasin Gishu": [0.55, 35.3],
  "Elgeyo-Marakwet": [0.79, 35.51], "Nandi": [0.18, 35.18], "Baringo": [0.85, 36.08],
  "Laikipia": [0.36, 36.78], "Nakuru": [-0.3, 36.07], "Narok": [-1.08, 35.87],
  "Kajiado": [-2.1, 36.78], "Kericho": [-0.37, 35.28], "Bomet": [-0.8, 35.34],
  "Kakamega": [0.28, 34.75], "Vihiga": [0.08, 34.72], "Bungoma": [0.56, 34.55],
  "Busia": [0.46, 34.11], "Siaya": [0.06, 34.29], "Kisumu": [-0.1, 34.76],
  "Homa Bay": [-0.62, 34.45], "Migori": [-1.06, 34.47], "Kisii": [-0.68, 34.77],
  "Nyamira": [-0.56, 35.0], "Nairobi": [-1.29, 36.82]
}

export default function MapSection() {
  const [mounted, setMounted] = useState(false)
  const [selected, setSelected] = useState(null)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mounted) return
    let map
    const init = async () => {
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')
      const el = document.getElementById('kenya-map')
      if (!el || el._leaflet_id) return
      map = L.map('kenya-map').setView([0.02, 37.9], 6)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map)

      counties.forEach(county => {
        const center = CENTERS[county.county]
        if (!center) return
        const circle = L.circleMarker(center, {
          radius: 10 + county.taux_mort_pct * 0.5,
          fillColor: getColor(county.taux_mort_pct),
          color: '#fff', weight: 1.5,
          fillOpacity: 0.85
        }).addTo(map)

        circle.bindTooltip(`<b>${county.county}</b><br/>${county.taux_mort_pct.toFixed(1)}%`, {
          className: 'leaflet-tooltip-custom'
        })

        circle.on('click', () => setSelected(county))
        circle.on('mouseover', function() { this.setStyle({ radius: 14 + county.taux_mort_pct * 0.5, weight: 2.5 }) })
        circle.on('mouseout', function() { this.setStyle({ radius: 10 + county.taux_mort_pct * 0.5, weight: 1.5 }) })
      })
    }
    init()
    return () => { if (map) map.remove() }
  }, [mounted])

  return (
    <section style={{ background: '#1A1A1A', padding: '100px 20px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, letterSpacing: 4, textTransform: 'uppercase', color: '#D4A853', marginBottom: 16 }}>Analyse géographique</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 42px)', color: '#FAFAF8', marginBottom: 16 }}>La géographie de l'injustice</h2>
        <p style={{ color: '#E8E8E4', opacity: 0.7, maxWidth: 600, marginBottom: 48, fontSize: 18 }}>
          Chaque cercle représente un county. Sa taille et sa couleur reflètent le taux de mortalité.
          Clique pour voir les détails.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32 }}>
          <div style={{ height: 520, borderRadius: 4, overflow: 'hidden', background: '#2C3E50' }}>
            {mounted
              ? <div id="kenya-map" style={{ height: '100%', width: '100%' }} />
              : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <p style={{ color: '#E8E8E4', opacity: 0.5 }}>Chargement...</p>
                </div>
            }
          </div>
          <div style={{ background: '#2C3E50', borderRadius: 4, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {selected ? (<>
              <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: '#D4A853', marginBottom: 8 }}>County sélectionné</p>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#FAFAF8', marginBottom: 24 }}>{selected.county}</h3>
              {[
                ['Taux de mortalité', `${selected.taux_mort_pct.toFixed(1)}%`, true],
                ['Consultations prénatales', selected.anc_moy.toFixed(1), false],
                ['Distance établissement', `${selected.dist_moy.toFixed(0)} km`, false],
                ['Accouchements à domicile', `${(selected.pct_home * 100).toFixed(0)}%`, false],
                ['Prévalence VIH', `${selected.hiv_prev.toFixed(1)}%`, false],
              ].map(([label, val, rouge]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ color: '#E8E8E4', opacity: 0.7, fontSize: 14 }}>{label}</span>
                  <span style={{ fontWeight: 600, fontSize: 16, color: rouge ? '#C0392B' : '#FAFAF8' }}>{val}</span>
                </div>
              ))}
            </>) : (
              <p style={{ color: '#E8E8E4', opacity: 0.5, fontStyle: 'italic', fontFamily: "'Playfair Display', serif", fontSize: 18 }}>Clique sur un cercle pour voir les données du county</p>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 24, flexWrap: 'wrap' }}>
          {[['> 20%','#7B0000'],['15–20%','#C0392B'],['10–15%','#E74C3C'],['5–10%','#F1948A'],['< 5%','#FADBD8']].map(([label, color]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 16, height: 16, background: color, borderRadius: '50%' }}/>
              <span style={{ color: '#E8E8E4', fontSize: 13, opacity: 0.7 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}