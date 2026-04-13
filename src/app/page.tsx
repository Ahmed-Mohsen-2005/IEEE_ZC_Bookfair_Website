'use client'

import { useAppStore, type PageView } from '@/lib/store'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import PavilionsGrid from '@/components/PavilionsGrid'
import ActivityCalendar from '@/components/ActivityCalendar'
import AuthModal from '@/components/AuthModal'
import DigitalReadingPane from '@/components/DigitalReadingPane'
import VisitorDashboard from '@/components/VisitorDashboard'
import PublisherDashboard from '@/components/PublisherDashboard'
import GeneralEgyptianPavilion from '@/components/pavilions/GeneralEgyptianPavilion'
import DarAlMaarefPavilion from '@/components/pavilions/DarAlMaarefPavilion'
import NationalLibraryPavilion from '@/components/pavilions/NationalLibraryPavilion'
import AlAhramPavilion from '@/components/pavilions/AlAhramPavilion'

const PAVILION_COMPONENTS: Record<string, React.ComponentType> = {
  'pavilion-general-egyptian': GeneralEgyptianPavilion,
  'pavilion-dar-al-maaref': DarAlMaarefPavilion,
  'pavilion-national-library': NationalLibraryPavilion,
  'pavilion-al-ahram': AlAhramPavilion,
}

function PageRenderer({ page }: { page: PageView }) {
  // Pavilion pages
  if (page.startsWith('pavilion-')) {
    const PavilionComponent = PAVILION_COMPONENTS[page]
    if (PavilionComponent) return <PavilionComponent />
  }

  switch (page) {
    case 'visitor-dashboard':
      return <VisitorDashboard />
    case 'publisher-dashboard':
      return <PublisherDashboard />
    default:
      return (
        <>
          <HeroSection />
          <PavilionsGrid />
          <ActivityCalendar />
        </>
      )
  }
}

export default function Home() {
  const { currentPage } = useAppStore()

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <PageRenderer page={currentPage} />
      </main>
      <Footer />
      <AuthModal />
      <DigitalReadingPane />
    </div>
  )
}
