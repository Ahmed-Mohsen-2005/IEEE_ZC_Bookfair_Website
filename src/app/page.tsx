'use client'

import { useEffect } from 'react'
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
import FeaturesSection from '@/components/FeaturesSection'
import StatisticsSection from '@/components/StatisticsSection'
import NewsCarousel from '@/components/NewsCarousel'
import CTASection from '@/components/CTASection'
import ZewailLegacy from '@/components/ZewailLegacy'
import ZewailAssistant from '@/components/ZewailAssistant'
import EventDetail from '@/components/EventDetail'
import BookFairBackground from '@/components/BookFairBackground'
import BookShowcase from '@/components/BookShowcase'
import AdminDashboard from '@/components/AdminDashboard'
import ZewailAboutSection from '@/components/ZewailAboutSection'
import AIBookRecommender from '@/components/AIBookRecommender'
import FloatingBooksShowcase from '@/components/FloatingBooksShowcase'
import PageTransition from '@/components/PageTransition'

const PAVILION_COMPONENTS: Record<string, React.ComponentType> = {
  'pavilion-general-egyptian': GeneralEgyptianPavilion,
  'pavilion-dar-al-maaref': DarAlMaarefPavilion,
  'pavilion-national-library': NationalLibraryPavilion,
  'pavilion-al-ahram': AlAhramPavilion,
}

function PageRenderer({ page }: { page: PageView }) {
  if (page.startsWith('pavilion-')) {
    const PavilionComponent = PAVILION_COMPONENTS[page]
    if (PavilionComponent) return <PavilionComponent />
  }

  switch (page) {
    case 'visitor-dashboard':
      return <VisitorDashboard />
    case 'publisher-dashboard':
      return <PublisherDashboard />
    case 'admin-dashboard':
      return <AdminDashboard />
    case 'event-detail':
      return <EventDetail />
    default:
      return (
        <>
          <HeroSection />
          <FeaturesSection />
          <FloatingBooksShowcase />
          <AIBookRecommender />
          <BookShowcase />
          <ZewailLegacy />
          <ZewailAboutSection />
          <StatisticsSection />
          <NewsCarousel />
          <PavilionsGrid />
          <ActivityCalendar />
          <CTASection />
        </>
      )
  }
}

export default function Home() {
  const { currentPage, navigationTarget, setNavigationTarget } = useAppStore()

  useEffect(() => {
    if (navigationTarget && currentPage === 'home') {
      const element = document.getElementById(navigationTarget)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 150)
      }
      setNavigationTarget(null)
    }
  }, [navigationTarget, currentPage, setNavigationTarget])

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground">
      {/* Floating book fair canvas animations — fixed, behind everything */}
      <BookFairBackground />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <PageTransition pageKey={currentPage}>
            <PageRenderer page={currentPage} />
          </PageTransition>
        </main>
        <Footer />
      </div>

      <AuthModal />
      <ZewailAssistant />
      <DigitalReadingPane />
    </div>
  )
}
