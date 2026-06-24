'use client'
import { useState } from 'react'

const createurs = [
  {
    img: '/images/jonathan.jpg',
    nom: 'Jonathan David Manga',
    role: 'Élève Ingénieur Statisticien Économiste',
    contribution: 'Modélisation statistique & Analyse des données'
  },
  {
    img: '/images/durel.jpg',
    nom: 'Durel Teumo',
    role: 'Élève Ingénieur Statisticien Économiste',
    contribution: 'Visualisation de données & Intégration UI'
  },
  {
    img: '/images/karel.jpg', // Remplace par le chemin de la photo du 3e membre
    nom: 'Karel Sodjinouti', // À personnaliser
    role: 'Élève Ingénieur Statisticien Économiste',
    contribution: 'Analyse exploratoire & Collecte des données' // À personnaliser
  }
]

export default function Equipe() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <section style={{ 
      background: '#1B1B1B', 
      padding: '160px 40px 120px 40px', 
      borderTop: '1px solid rgba(255,255,255,0.08)' 
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* En-tête de la Galerie */}
        <div style={{ marginBottom: 90, textAlign: 'center' }}>
          <p style={{
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 11,
            letterSpacing: 4, textTransform: 'uppercase',
            color: '#C0392B', marginBottom: 16, fontWeight: 600
          }}>
            Conception & Analyse de données
          </p>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(32px, 4vw, 54px)',
            color: '#FAFAF8', margin: 0,
            lineHeight: 1.2, fontWeight: 400, letterSpacing: '-0.02em'
          }}>
            L'Équipe de réalisation
          </h3>
          <div style={{ 
            width: 40, height: 1, background: '#D4A853', 
            margin: '24px auto 0 auto' 
          }} />
        </div>

        {/* Grille de la Galerie (S'aligne automatiquement sur 3 colonnes) */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '50px',
          justifyContent: 'center'
        }}>
          {createurs.map((c, i) => {
            const isAnotherHovered = hoveredIndex !== null && hoveredIndex !== i
            
            return (
              <div 
                key={i} 
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ 
                  textAlign: 'left',
                  cursor: 'pointer',
                  opacity: isAnotherHovered ? 0.35 : 1,
                  transition: 'opacity 0.5s ease'
                }}
              >
                {/* Cadre Photo de la Galerie */}
                <div style={{ 
                  width: '100%', 
                  height: 440, // Hauteur idéale pour le format portrait éditorial
                  overflow: 'hidden', 
                  marginBottom: 24, 
                  background: '#141414',
                  position: 'relative',
                  boxShadow: hoveredIndex === i ? '0 20px 40px rgba(0,0,0,0.5)' : '0 10px 25px rgba(0,0,0,0.2)',
                  transition: 'box-shadow 0.5s ease'
                }}>
                  <img 
                    src={c.img} 
                    alt={c.nom} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      filter: hoveredIndex === i ? 'grayscale(0%)' : 'grayscale(100%)',
                      transform: hoveredIndex === i ? 'scale(1.05)' : 'scale(1)',
                      transition: 'filter 0.6s ease, transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
                    }} 
                  />
                  {/* Overlay au survol avec la contribution */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(to bottom, transparent 50%, rgba(20,20,20,0.95))',
                    opacity: hoveredIndex === i ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                    display: 'flex', alignItems: 'flex-end', padding: 24
                  }}>
                    <p style={{ 
                      color: '#FAFAF8', fontFamily: "'Source Sans 3', sans-serif", 
                      fontSize: 13, margin: 0, fontStyle: 'italic', opacity: 0.9,
                      lineHeight: '1.4'
                    }}>
                      {c.contribution}
                    </p>
                  </div>
                </div>

                {/* Légendes de l'œuvre / du créateur */}
                <h4 style={{ 
                  fontFamily: "'Playfair Display', serif", 
                  fontSize: 24, 
                  color: '#FAFAF8', 
                  margin: '0 0 6px 0', 
                  fontWeight: 400,
                  letterSpacing: '-0.01em'
                }}>
                  {c.nom}
                </h4>
                
                <p style={{ 
                  fontFamily: "'Source Sans 3', sans-serif", 
                  fontSize: 11, 
                  color: '#D4A853', 
                  letterSpacing: 2, 
                  textTransform: 'uppercase', 
                  margin: 0, 
                  fontWeight: 600 
                }}>
                  {c.role}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}