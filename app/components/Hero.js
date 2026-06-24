'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh', display: 'flex',
      flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
      textAlign: 'left', padding: '0 80px', // Plus de padding sur les côtés pour la mise en page de gauche
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Image de fond avec objectPosition: 'right' pour la femme */}
      <Image
        src="/images/hero.png" // Assurez-vous d'avoir ce fichier dans /public/images/
        alt="Dignified Kenyan woman with child" // Texte alternatif descriptif
        fill
        priority
        style={{ objectFit: 'cover', objectPosition: 'right center' }}
      />
      {/* Overlay sombre subtil pour la lisibilité du texte */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.3)'
      }}/>

      <motion.div
        initial={{ opacity: 0, x: -40 }} // Animation d'arrivée par la gauche
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
        style={{ position: 'relative', zIndex: 1, maxWidth: 600 }}
      >
        {/* Surtitre retiré pour correspondre à l'image */}

        <h1 style={{
          fontFamily: "'Source Sans 3', sans-serif", // Police sans-serif moderne pour le titre
          fontSize: 'clamp(36px, 7vw, 72px)',
          color: '#FFFFFF', // Blanc pur pour un contraste maximal
          lineHeight: 1.15, marginBottom: 32, fontWeight: 700
        }}>
          Donner la vie,<br/>
          protéger la vie
        </h1>

        <p style={{
          fontFamily: "'Source Sans 3', sans-serif",
          fontSize: 'clamp(16px, 2vw, 19px)',
          color: '#FFFFFF', // Texte plus blanc et net
          opacity: 1, // Moins d'opacité pour plus de lisibilité
          maxWidth: 600, margin: '0 0 56px 0', // Pas de 'auto' pour l'aligner à gauche
          lineHeight: 1.7
        }}>
          Chaque jour, de trop nombreuses femmes perdent la vie en donnant la vie au Kenya,
          souvent en raison d'un manque d'accès aux soins de santé essentiels. Ce projet
          met en lumière les réalités du terrain, analyse les causes majeures de cette crise
          silencieuse et propose des solutions concrètes pour que la maternité ne soit plus
          un danger, mais une célébration.
        </p>


      </motion.div>
    </section>
  )
}