'use client'
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const etapes = [
  {
    img: '/images/img1.jpg',
    label: 'WEST POKOT · 27 ANS',
    titre: 'Amina attend',
    texte: `Dans la chaleur sèche de West Pokot, au nord-ouest du Kenya, Amina pose les mains sur son ventre. Elle a 27 ans. Elle attend son troisième enfant. Dehors, la savane s'étend à perte de vue  belle et indifférente. Ici, donner la vie a toujours été une affaire de courage.`,
    stat: null
  },
  {
    img: '/images/img2.jpg',
    label: 'LA DISTANCE',
    titre: '31 kilomètres entre elle et les soins',
    texte: `Le centre de santé le plus proche est à 31 kilomètres. Sur des pistes de latérite, en saison des pluies, c'est deux heures de trajet   si elle trouve un véhicule. La plupart du temps, il n'y en a pas. La médiane nationale est de 18 km. Pour Amina, chaque kilomètre supplémentaire est une barrière de plus entre elle et la vie.`,
    stat: { gauche: 'Amina', gaucheVal: '31 km', droite: 'Médiane Kenya', droiteVal: '18 km', rouge: true }
  },
  {
    img: '/images/img3.jpg',
    label: 'LES CONSULTATIONS',
    titre: 'Trois visites. Pas assez.',
    texte: `Pendant neuf mois, Amina a vu une sage-femme trois fois. L'OMS en recommande huit. Au Kenya, la moyenne est déjà faible   3,6 visites. Mais dans les zones rurales de West Pokot, même cela devient un luxe. Chaque consultation manquée, c'est un signal d'alerte que personne ne verra.`,
    stat: { type: 'cercles', total: 8, remplis: 3 }
  },
  {
    img: '/images/img4.jpg',
    label: "LE JOUR J",
    titre: 'Elle accouche chez elle',
    texte: `Quand les contractions commencent, il est trop tard pour faire 31 kilomètres. Une voisine arrive. Pas de médecin, pas d'infirmière, pas d'équipement. C'est ainsi que naissent 33 % des enfants de West Pokot. Dans l'obscurité d'une maison en terre, Amina fait face seule à ce que la médecine moderne a appris à maîtriser.`,
    stat: { gauche: 'Établissement', gaucheVal: '67%', droite: 'Domicile', droiteVal: '33%', rouge: false }
  },
  {
    img: null,
    label: 'LE RISQUE',
    titre: null,
    texte: `Pour une femme avec le profil d'Amina   son âge, sa distance, ses consultations, son lieu d'accouchement   le modèle estime un risque de mortalité de 21 %. Une femme sur cinq dans cette situation ne survivra pas à son accouchement.`,
    stat: { type: 'chiffre', valeur: '21%', sous: 'risque estimé de mortalité' }
  },
  {
    img: '/images/img6.jpg',
    label: 'AILLEURS AU KENYA',
    titre: 'À 400 km, une autre réalité',
    texte: `À Kirinyaga, à l'est du Mont Kenya, le taux de mortalité maternelle est de 2,99 %. Même pays. Même année. Même enquête. La différence entre West Pokot et Kirinyaga n'est pas génétique, ni culturelle. Elle est systémique   le résultat de décennies d'inégalités dans l'accès aux soins, à l'éducation, aux infrastructures.`,
    stat: { gauche: 'West Pokot', gaucheVal: '25.2%', droite: 'Kirinyaga', droiteVal: '2.99%', rouge: true }
  },
]

function StatVisuel({ stat }) {
  if (!stat) return null

  if (stat.type === 'cercles') return (
    <div style={{ marginTop: 40, maxWidth: 640 }}>
      <p style={{ color: '#D4A853', fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16, fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>
        Consultations prénatales d'Amina
      </p>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        {Array.from({ length: stat.total }).map((_, i) => (
          <div key={i} style={{
            width: 28, height: 28, borderRadius: '50%',
            background: i < stat.remplis ? '#C0392B' : 'rgba(255,255,255,0.08)',
            border: i < stat.remplis ? '1px solid #C0392B' : '1px solid rgba(255,255,255,0.2)',
            transition: 'all 0.4s ease'
          }} />
        ))}
      </div>
      <p style={{ color: '#A3A3A3', fontSize: 14, marginTop: 14, fontFamily: "'Source Sans 3', sans-serif", fontStyle: 'italic' }}>
        3 sur 8 recommandées par l'OMS
      </p>
    </div>
  )

  if (stat.type === 'chiffre') return (
    <div style={{ textAlign: 'left', marginTop: 40, maxWidth: 640 }}>
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(80px, 12vw, 140px)',
        fontWeight: 700, color: '#C0392B', lineHeight: 1
      }}>{stat.valeur}</div>
      <p style={{ color: '#FAFAF8', opacity: 0.7, fontSize: 14, marginTop: 8, fontFamily: "'Source Sans 3', sans-serif", textTransform: 'uppercase', letterSpacing: 2 }}>
        {stat.sous}
      </p>
    </div>
  )

  return (
    <div style={{ display: 'flex', gap: 24, marginTop: 40, maxWidth: 640 }}>
      {[{ label: stat.gauche, val: stat.gaucheVal, rouge: stat.rouge }, { label: stat.droite, val: stat.droiteVal, rouge: false }].map(({ label, val, rouge }) => (
        <div key={label} style={{
          flex: 1, background: '#1E1E1E',
          padding: '28px 24px', textAlign: 'left',
          borderLeft: `3px solid ${rouge ? '#C0392B' : '#D4A853'}`,
          boxShadow: '0 4px 25px rgba(0,0,0,0.3)'
        }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 40, fontWeight: 700,
            color: '#FAFAF8', marginBottom: 6
          }}>{val}</div>
          <p style={{ color: '#A3A3A3', fontSize: 12, fontFamily: "'Source Sans 3', sans-serif", textTransform: 'uppercase', letterSpacing: 1 }}>{label}</p>
        </div>
      ))}
    </div>
  )
}

function Etape({ etape, actif, onClick, index }) {
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: false })
  useEffect(() => { if (inView) onClick(index) }, [inView])

  return (
    <div ref={ref} onClick={() => onClick(index)} style={{
      minHeight: '95vh', padding: '12vh 40px',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      opacity: actif ? 1 : 0.12, transition: 'opacity 0.6s ease', cursor: 'pointer'
    }}>
      <p style={{
        fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
        letterSpacing: 4, textTransform: 'uppercase',
        color: '#D4A853', marginBottom: 24, fontWeight: 600
      }}>{etape.label}</p>
      
      {etape.titre && (
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(44px, 6.5vw, 96px)', // S'adapte sur mobile mais atteint exactement 96px sur grand écran
          color: '#FAFAF8', 
          marginBottom: 32, 
          lineHeight: '1.15', // Proche du line-height 110px de Canva
          fontWeight: 700, 
          letterSpacing: '-0.04em' // Exactement ton réglage Canva
        }}>{etape.titre}</h3>
      )}
      
      <p style={{
        color: '#FAFAF8', 
        fontSize: 'clamp(20px, 2.2vw, 28px)', // S'adapte sur mobile mais atteint exactement 28px sur desktop
        lineHeight: '1.45', // Équivalent au line-height 39px de Canva
        maxWidth: 669, // Largeur exacte définie dans ton code Canva (669.071px)
        fontFamily: "'Playfair Display', serif",
        fontStyle: 'italic', // Style italique respecté
        fontWeight: 400,
        margin: 0
      }}>{etape.texte}</p>
      
      <StatVisuel stat={etape.stat} />
    </div>
  )
}

export default function Amina() {
  const [actif, setActif] = useState(0)

  return (
    <section style={{ background: '#1B1B1B', padding: '120px 0', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 60px' }}>
        
        {/* En-tête de section */}
        <div style={{ marginBottom: 40, textAlign: 'left', paddingLeft: '40px' }}>
          <p style={{
            fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
            letterSpacing: 4, textTransform: 'uppercase',
            color: '#C0392B', marginBottom: 12, fontWeight: 600
          }}>Une histoire parmi 606</p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(28px, 3.5vw, 40px)',
            color: '#FAFAF8', margin: 0,
            lineHeight: 1.2, fontWeight: 400
          }}>Le parcours d'Amina</h2>
        </div>

        {/* Grille Scrollytelling */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px', position: 'relative' }}>
          
          {/* Texte - Défilement */}
          <div style={{ paddingBottom: '30vh' }}>
            {etapes.map((etape, i) => (
              <Etape key={i} etape={etape} actif={actif === i} onClick={setActif} index={i} />
            ))}
          </div>

          {/* Image / Visuel - Sticky */}
          <div style={{ position: 'sticky', top: '10vh', height: '80vh', alignSelf: 'start', overflow: 'hidden' }}>
            {etapes[actif].img ? (
              <img
                key={actif}
                src={etapes[actif].img}
                alt={etapes[actif].label}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  borderRadius: 0,
                  animation: 'fadeIn 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards'
                }}
              />
            ) : (
              /* Bloc Risque Spécifique (21%) */
              <div style={{
                width: '100%', height: '100%', borderRadius: 0,
                background: '#1E1E1E', display: 'flex',
                flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                animation: 'fadeIn 0.8s ease forwards'
              }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(100px, 14vw, 180px)',
                  fontWeight: 700, color: '#C0392B', lineHeight: 1
                }}>21%</div>
                <p style={{
                  color: '#A3A3A3', fontSize: 13,
                  marginTop: 20, letterSpacing: 3, textTransform: 'uppercase',
                  fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600
                }}>risque estimé de mortalité</p>
              </div>
            )}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeIn { 
          from { opacity: 0; transform: scale(1.01); } 
          to { opacity: 1; transform: scale(1); } 
        }
      `}</style>
    </section>
  )
}
