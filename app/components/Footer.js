'use client'

export default function Footer() {
  return (
    <footer style={{ background: '#1A1A1A', padding: '80px 20px 40px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        {/* Titre */}
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(24px, 3vw, 36px)',
          color: '#FAFAF8', marginBottom: 24
        }}>Méthodologie</h2>

        {/* Blocs */}
        {[
          {
            titre: 'Source des données',
            texte: 'Kenya Demographic and Health Survey (KDHS) 2022. Enquête nationale représentative portant sur 6 000 femmes en âge de procréer à travers les 47 counties du Kenya.'
          },
          {
            titre: 'Modèle prédictif',
            texte: 'Modèle XGBoost entraîné sur 20 variables socio-démographiques et sanitaires. AUC-PR utilisé comme métrique principale en raison du déséquilibre des classes (10,1 % de décès). SMOTE appliqué pour rééquilibrer l\'échantillon d\'entraînement.'
          },
          {
            titre: 'Interprétabilité',
            texte: 'Les valeurs SHAP (SHapley Additive exPlanations) mesurent la contribution de chaque variable à la prédiction. Elles permettent une interprétation causale robuste des résultats du modèle.'
          },
          {
            titre: 'Limites',
            texte: 'Le calculateur de risque est un outil d\'illustration journalistique. Les estimations sont indicatives et ne constituent pas un diagnostic médical. Les données agrégées par county masquent des disparités infra-territoriales.'
          },
        ].map(({ titre, texte }) => (
          <div key={titre} style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            padding: '24px 0'
          }}>
            <h3 style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 13, letterSpacing: 3,
              textTransform: 'uppercase', color: '#D4A853',
              marginBottom: 10
            }}>{titre}</h3>
            <p style={{
              color: '#E8E8E4', opacity: 0.6,
              fontSize: 15, lineHeight: 1.7, maxWidth: 680
            }}>{texte}</p>
          </div>
        ))}

        {/* Bas de page */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: 32, marginTop: 16,
          display: 'flex', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16
        }}>
          <p style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: 13, color: '#E8E8E4', opacity: 0.4
          }}>
            Compétition de datajournalisme · Mortalité Maternelle Kenya · 2022
          </p>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 13, color: '#D4A853', opacity: 0.7,
            fontStyle: 'italic'
          }}>
            606 femmes. Une histoire que les données racontent.
          </p>
        </div>
      </div>
    </footer>
  )
}