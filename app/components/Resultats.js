'use client'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

function GraphiquePlotly({ fichier, hauteur = 480 }) {
  const [Plot, setPlot] = useState(null)
  const [fig, setFig]   = useState(null)
  const [ref, inView]   = useInView({ triggerOnce: true, threshold: 0.05 })

  useEffect(() => {
    import('react-plotly.js').then(m => setPlot(() => m.default))
  }, [])

  useEffect(() => {
    if (!inView) return
    fetch(`/charts/${fichier}.json`).then(r => r.json()).then(setFig).catch(() => {})
  }, [inView, fichier])

  return (
    <div ref={ref} style={{
      borderTop: '2px solid #E8E8E4', borderBottom: '2px solid #E8E8E4',
      margin: '40px 0', padding: '8px 0',
      minHeight: hauteur, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#fff'
    }}>
      {!Plot || !fig ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, opacity: 0.25 }}>
          <div style={{
            width: 28, height: 28, border: '2px solid #C0392B',
            borderTopColor: 'transparent', borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
          }} />
          <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: '#1A1A1A' }}>
            Chargement…
          </span>
        </div>
      ) : (
        <Plot
          data={fig.data}
          layout={{
            ...fig.layout,
            autosize: true,
            paper_bgcolor: '#ffffff',
            plot_bgcolor: '#ffffff',
            margin: { l: 60, r: 40, t: 70, b: 60 },
            font: { family: "'Source Sans 3', sans-serif", color: '#1A1A1A', size: 12 },
          }}
          config={{ responsive: true, displayModeBar: false }}
          style={{ width: '100%' }}
        />
      )}
    </div>
  )
}

function Legende({ texte }) {
  return (
    <p style={{
      fontFamily: "'Source Sans 3', sans-serif",
      fontSize: 12, color: '#1A1A1A', opacity: 0.4,
      fontStyle: 'italic', marginBottom: 56, marginTop: -24,
      textAlign: 'center'
    }}>
      {texte} · KDHS 2022
    </p>
  )
}

function Chapeau({ numero, titre }) {
  return (
    <div style={{ marginBottom: 24, marginTop: 72 }}>
      <p style={{
        fontFamily: "'Source Sans 3', sans-serif",
        fontSize: 11, letterSpacing: 4, textTransform: 'uppercase',
        color: '#C0392B', marginBottom: 10
      }}>{numero}</p>
      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(22px, 3vw, 30px)',
        color: '#1A1A1A', lineHeight: 1.25, margin: 0,
        borderBottom: '1px solid #E8E8E4', paddingBottom: 20
      }}>{titre}</h3>
    </div>
  )
}

// Chiffre en incrustation dans le texte  pas isolé, juste mis en valeur
function Incrustation({ valeur, contexte }) {
  return (
    <span style={{
      display: 'inline-block',
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700, color: '#C0392B',
      fontSize: '1.1em'
    }}>
      {valeur}
    </span>
  )
}

// Encadré latéral pour les chiffres clés  intégré dans le flux
function Encadre({ valeur, label, rouge = true }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })
  return (
    <div ref={ref} style={{
      float: 'right', margin: '4px 0 20px 36px',
      width: 180, textAlign: 'center',
      borderLeft: `3px solid ${rouge ? '#C0392B' : '#2C3E50'}`,
      paddingLeft: 20
    }}>
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 48, fontWeight: 700,
        color: rouge ? '#C0392B' : '#2C3E50',
        lineHeight: 1,
        opacity: inView ? 1 : 0,
        transition: 'opacity 0.8s ease'
      }}>{valeur}</div>
      <p style={{
        fontFamily: "'Source Sans 3', sans-serif",
        fontSize: 12, color: '#1A1A1A', opacity: 0.55,
        marginTop: 8, lineHeight: 1.5
      }}>{label}</p>
    </div>
  )
}

export default function Resultats() {
  return (
    <section style={{ background: '#FAFAF8', padding: '100px 20px' }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .texte-article p { 
  font-family: 'Source Sans 3', sans-serif;
  font-size: 17px;
  line-height: 1.65;
  color: #1A1A1A;
  opacity: 0.82;
  margin-bottom: 16px;
}
        .texte-article::after { content: ''; display: table; clear: both; }
      `}</style>

      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        {/* En-tête */}
        <p style={{
  fontFamily: "'Source Sans 3', sans-serif",
  fontSize: 16, lineHeight: 1.6,
  color: '#1A1A1A', opacity: 0.6,
  textAlign: 'center', marginBottom: 72
}}>
  Les graphiques ci-dessous sont interactifs  survole, clique, zoome.
</p>

        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(30px, 5vw, 48px)',
          color: '#1A1A1A', textAlign: 'center',
          marginBottom: 20, lineHeight: 1.2
        }}>Ce que 6 000 femmes nous ont appris</h2>

        <p style={{
          fontFamily: "'Source Sans 3', sans-serif",
          fontSize: 17, lineHeight: 1.8,
          color: '#1A1A1A', opacity: 0.6,
          textAlign: 'center', marginBottom: 72
        }}>
          Les graphiques ci-dessous sont interactifs  survole, clique, zoome.
        </p>

        {/* ══ 1. COUNTIES ══ */}
        <Chapeau numero="Premier résultat" titre="L'adresse détermine le destin" />

        <div className="texte-article">
          <Encadre valeur="×8" label="écart entre le county le plus sûr et le plus dangereux" />
          <p>
            Avant même d'analyser les comportements individuels ou l'accès aux soins,
            une donnée s'impose avec une brutalité statistique : là où une femme vit
            décide en grande partie si elle survivra à son accouchement. Les 47 counties
            du Kenya ne sont pas égaux devant la mort. West Pokot affiche un taux de
            mortalité de <Incrustation valeur="25,2 %" />  Kirinyaga descend à <Incrustation valeur="2,99 %" />.
            Même pays. Même année. Même enquête nationale.
          </p>
          <p>
            Cet écart de 1 à 8 n'est pas un accident statistique. Il est le résultat
            mesurable de décennies d'inégalités dans l'accès aux soins, à l'éducation
            et aux infrastructures de base. Le graphique ci-dessous classe les 47 counties
            du plus sûr au plus dangereux.
          </p>
        </div>
      </div>

      {/* Graphique counties  pleine largeur pour respirer */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 20px' }}>
        <GraphiquePlotly fichier="county_ranking" hauteur={900} />
        <Legende texte="Taux de mortalité maternelle par county (%), classement des 47 counties" />
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        {/* ══ 2. ÂGE × PARITÉ ══ */}
        <Chapeau numero="Deuxième résultat" titre="Les oubliées que la moyenne cache" />

        <div className="texte-article">
          <Encadre valeur="60%" label="mortalité chez les adolescentes de 15-17 ans à leur 6e enfant ou plus" />
          <p>
            Le taux national de 10,1 % est déjà alarmant. Mais il masque une réalité
            bien plus violente pour certains groupes. En croisant l'âge et le nombre
            d'enfants  ce que les statisticiens appellent la parité  on découvre
            des zones de danger extrême que les moyennes nationales ne permettent pas
            de voir.
          </p>
          <p>
            Les adolescentes de 15 à 17 ans qui en sont à leur sixième enfant ou plus
            atteignent un taux de mortalité de 60 %. Six fois la moyenne nationale.
            La heatmap ci-dessous rend ce phénomène visible : plus on va vers le coin
            inférieur droit  jeune âge, grande parité  plus la couleur vire au rouge sombre.
          </p>
        </div>

        <GraphiquePlotly fichier="heatmap_age_parite" hauteur={520} />
        <Legende texte="Taux de mortalité (%) selon l'âge et le rang de naissance" />

        <div className="texte-article">
          <p>
            La mortalité par groupe d'âge seul révèle une courbe en U : les très jeunes
            et les femmes de 40 ans et plus paient un tribut disproportionné. Ce résultat,
            cohérent avec la littérature médicale internationale, prend au Kenya une
            dimension particulièrement aiguë en raison de la prévalence des grossesses
            précoces dans les zones rurales les plus pauvres.
          </p>
        </div>

        <GraphiquePlotly fichier="mortalite_age" hauteur={400} />
        <Legende texte="Taux de mortalité maternelle (%) par groupe d'âge" />

        <div className="texte-article">
          <p>
            La parité suit une logique similaire, avec une rupture brutale à partir
            du quatrième enfant. Jusqu'au troisième, le taux reste proche de la moyenne nationale.
            À partir du sixième, il dépasse <Incrustation valeur="25 %" />.
            La grande multiparité n'est pas une fatalité biologique  c'est la conséquence
            d'un accès insuffisant à la contraception et à l'éducation.
          </p>
        </div>

        <GraphiquePlotly fichier="mortalite_parite" hauteur={400} />
        <Legende texte="Taux de mortalité maternelle (%) selon le rang de naissance" />

        {/* ══ 3. RICHESSE ══ */}
        <Chapeau numero="Troisième résultat" titre="La pauvreté tue. Les chiffres le prouvent." />

        <div className="texte-article">
          <Encadre valeur="×3" label="risque supplémentaire pour le quintile le plus pauvre" rouge={false} />
          <p>
            Le prédicteur le plus puissant de la mortalité maternelle au Kenya n'est pas
            un acte médical. C'est le quintile de richesse du ménage. La courbe ci-dessous
            est d'une clarté implacable : du quintile le plus pauvre au plus riche, le taux
            de mortalité décroît presque linéairement. Une femme du quintile inférieur a
            un risque deux à trois fois supérieur à celui d'une femme du quintile supérieur.
          </p>
          <p>
            Ce n'est pas une corrélation anodine. C'est un verdict sur les inégalités
            structurelles du système de santé kényan.
          </p>
        </div>

        <GraphiquePlotly fichier="richesse_mortalite" hauteur={400} />
        <Legende texte="Taux de mortalité maternelle (%) par quintile de richesse du ménage" />

        {/* ══ 4. ANC ══ */}
        <Chapeau numero="Quatrième résultat" titre="Chaque consultation prénatale sauve des vies" />

        <div className="texte-article">
          <p>
            S'il est un levier d'action direct et immédiatement actionnable, c'est celui-là.
            Le nombre de consultations prénatales est inversement corrélé au taux de mortalité
            de manière presque mécanique. L'OMS recommande un minimum de quatre visites.
            Au Kenya, la médiane nationale est de <Incrustation valeur="3,6" />. Dans les zones
            rurales les plus défavorisées, elle tombe à 2.
          </p>
          <p>
            La ligne verticale en pointillés marque le seuil OMS. À gauche de cette ligne,
            les taux de mortalité sont systématiquement plus élevés. C'est l'argument le plus
            simple et le plus fort en faveur d'un investissement dans les soins prénataux de proximité.
          </p>
        </div>

        <GraphiquePlotly fichier="anc_mortalite" hauteur={400} />
        <Legende texte="Taux de mortalité maternelle (%) selon le nombre de consultations prénatales (ANC)" />

        {/* ══ 5. LIEU ══ */}
        <Chapeau numero="Cinquième résultat" titre="Où l'on accouche décide si l'on survit" />

        <div className="texte-article">
          <p>
            Le lieu d'accouchement et la présence d'un accompagnant qualifié constituent
            deux des variables les plus déterminantes du modèle. Leur croisement produit
            quatre scénarios aux résultats radicalement différents. À un extrême,
            l'accouchement en établissement avec un professionnel formé. À l'autre,
            l'accouchement à domicile sans aide qualifiée  le scénario encore le plus
            fréquent dans certaines zones rurales.
          </p>
        </div>

        <GraphiquePlotly fichier="lieu_accouchement" hauteur={420} />
        <Legende texte="Mortalité maternelle selon le lieu d'accouchement et la présence d'un accompagnant qualifié" />

        {/* ══ 6. MODÈLE ══ */}
        <Chapeau numero="Sixième résultat" titre="Ce que le modèle prédit  et pourquoi on lui fait confiance" />

        <div className="texte-article">
          <p>
            Trois modèles d'apprentissage automatique ont été entraînés sur les données
            KDHS 2022 : régression logistique, forêt aléatoire, et XGBoost.
            Ce dernier obtient les meilleures performances sur l'ensemble des métriques.
            Un avertissement méthodologique s'impose : avec un taux de mortalité de 10,1 %,
            les données sont fortement déséquilibrées. Nous avons appliqué la technique SMOTE
            pour rééquilibrer l'échantillon d'entraînement, et retenu l'AUC-PR comme
            métrique principale  plus adaptée aux problèmes de classes déséquilibrées.
          </p>
        </div>

        <GraphiquePlotly fichier="model_comparison" hauteur={400} />
        <Legende texte="Comparaison des performances des trois modèles sur l'ensemble de test" />

        <div className="texte-article">
          <p>
            Les valeurs SHAP mesurent la contribution de chaque variable à la prédiction.
            La pauvreté arrive en tête, suivie de l'éducation et de la distance à
            l'établissement de santé. Ces trois variables expliquent à elles seules
            une part majeure des inégalités observées dans les données.
          </p>
        </div>

        <GraphiquePlotly fichier="shap_importance" hauteur={480} />
        <Legende texte="Importance des variables selon les valeurs SHAP · modèle XGBoost" />

      </div>
    </section>
  )
}
