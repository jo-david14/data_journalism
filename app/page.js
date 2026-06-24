import Hero from './components/Hero'
import Introduction from './components/Introduction'
import Amina from './components/Amina'
import Resultats from './components/Resultats'
import Equipe from './components/Equipe'
import MapSection from './components/MapSection'

import Calculator from './components/Calculator'
import Footer from './components/Footer'

export default function Page() {
  return (
    <main>
      <Hero />
      <Introduction />
      <Amina />
      <Resultats />
      
      <MapSection />
      
      <Calculator />
      <Footer />
	<Equipe />
    </main>
  )
}