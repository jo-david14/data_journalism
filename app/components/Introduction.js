'use client'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

export default function Introduction() {
  const [refCitation, inViewCitation] = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section style={{ background: '#FAFAF8', padding: '100px 20px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        <p style={{
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 12,
          letterSpacing: 4, textTransform: 'uppercase',
          color: '#C0392B', marginBottom: 20, textAlign: 'center'
        }}>Enquête · Kenya · KDHS 2022</p>

        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(28px, 5vw, 48px)',
          color: '#1A1A1A', textAlign: 'center',
          lineHeight: 1.2, marginBottom: 20
        }}>
          Au Kenya, survivre à son accouchement<br />
          dépend de l'endroit où l'on vit
        </h2>

        <p style={{
          fontFamily: "'Source Sans 3', sans-serif",
          fontSize: 17, lineHeight: 1.65,
          color: '#1A1A1A', opacity: 0.65,
          textAlign: 'center', maxWidth: 600,
          margin: '0 auto 80px'
        }}>
          Le ratio de mortalité maternelle au Kenya stagne depuis dix ans autour de
          355 pour 100 000 naissances  soit cinq fois l'objectif des Nations Unies pour 2030.
          Derrière ce chiffre national, des écarts vertigineux entre comtés que les moyennes officielles
          ont longtemps invisibilisés.
        </p>

        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <p style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: 17, lineHeight: 1.65,
            color: '#1A1A1A', opacity: 0.82,
            marginBottom: 24
          }}>
            Hémorragies post-partum, dystocie, éclampsie  les causes médicales sont connues
            depuis des décennies. Ce qui persiste, ce ne sont pas les pathologies : c'est
            l'incapacité du système à y répondre. Pénurie de sages-femmes qualifiées, ruptures
            de stock en oxytocine, absence de sang disponible en urgence, hôpitaux de district
            sans anesthésiste. Des défaillances documentées, répétées, évitables.
          </p>
          <p style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: 17, lineHeight: 1.65,
            color: '#1A1A1A', opacity: 0.82,
            marginBottom: 24
          }}>
            Le comté de Mandera affiche un ratio supérieur à 2 700 pour 100 000. Kirinyaga,
            à moins de 200. Même pays, même année, même enquête nationale. Cet écart de 1 à 14
            n'est pas le fruit du hasard géographique : il est la conséquence mesurable de
            décennies d'inégalités dans la répartition des ressources médicales, des infrastructures
            de transport, et du niveau d'instruction des femmes.
          </p>
          <p style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: 17, lineHeight: 1.65,
            color: '#1A1A1A', opacity: 0.82,
            marginBottom: 48
          }}>
            La politique de gratuité des soins maternels  le programme <em>Linda Mama</em>,
            lancé en 2013  avait commencé à inverser la tendance. Son remplacement en 2024
            par un nouveau régime d'assurance (SHIF) a brisé cette dynamique : des femmes
            qui accouchaient en établissement sont revenues aux accouchements à domicile,
            faute de pouvoir payer. Les données de la KDHS 2022 en portent déjà les premières
            traces.
          </p>

          <motion.blockquote
            ref={refCitation}
            initial={{ opacity: 0, x: -16 }}
            animate={inViewCitation ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{
              borderLeft: '3px solid #C0392B',
              paddingLeft: 24, margin: 0,
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(18px, 2.5vw, 22px)',
              fontStyle: 'italic', color: '#1A1A1A',
              lineHeight: 1.55, opacity: 0.85
            }}
          >
            Ces femmes ne meurent pas parce que la médecine ne sait pas les sauver.
            Elles meurent parce que le système a décidé, par omission, qu'elles n'en valaient pas la peine.
          </motion.blockquote>
        </div>

      </div>
    </section>
  )
}
