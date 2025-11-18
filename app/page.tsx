import Header from '@/components/header'
import HeroSection from '@/components/hero-section'
import SearchPanel from '@/components/search-panel'
import TopModels from '@/components/top-models'
import FeaturedShops from '@/components/featured-shops'
import RegistrationCTA from '@/components/registration-cta'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="bg-background">
      <Header />
      <HeroSection />
      <SearchPanel />
      <TopModels />
      <FeaturedShops />
      <RegistrationCTA />
      <Footer />
    </main>
  )
}
