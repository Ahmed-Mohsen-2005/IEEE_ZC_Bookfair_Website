'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { BookOpen, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  const { setAuthModalOpen, setAuthModalTab, navigateTo, isAuthenticated, user } = useAppStore()

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-sky-50 to-blue-50">
      {/* Background SVG Art - Pyramids + Atomic Structure */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Pyramid line art */}
        <svg className="absolute bottom-0 left-0 w-full h-[70%] opacity-[0.04]" viewBox="0 0 1200 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="250,80 450,450 50,450" stroke="#0A1628" strokeWidth="1.5" fill="none" />
          <polygon points="600,30 850,450 350,450" stroke="#0A1628" strokeWidth="2" fill="none" />
          <polygon points="950,120 1150,450 750,450" stroke="#0A1628" strokeWidth="1.5" fill="none" />
          {/* Light wave data lines */}
          <path d="M0,300 Q150,280 300,300 T600,300 T900,300 T1200,300" stroke="#87CEEB" strokeWidth="1" opacity="0.15" fill="none" />
          <path d="M0,320 Q150,290 300,320 T600,320 T900,320 T1200,320" stroke="#87CEEB" strokeWidth="1" opacity="0.1" fill="none" />
          <path d="M0,340 Q150,310 300,340 T600,340 T900,340 T1200,340" stroke="#87CEEB" strokeWidth="0.8" opacity="0.08" fill="none" />
          <path d="M0,360 Q150,330 300,360 T600,360 T900,360 T1200,360" stroke="#87CEEB" strokeWidth="0.8" opacity="0.06" fill="none" />
        </svg>

        {/* Atomic structure - top right */}
        <svg className="absolute top-10 right-10 w-80 h-80 opacity-[0.05]" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="100" cy="100" rx="90" ry="30" stroke="#87CEEB" strokeWidth="1" transform="rotate(0 100 100)" />
          <ellipse cx="100" cy="100" rx="90" ry="30" stroke="#87CEEB" strokeWidth="1" transform="rotate(60 100 100)" />
          <ellipse cx="100" cy="100" rx="90" ry="30" stroke="#87CEEB" strokeWidth="1" transform="rotate(120 100 100)" />
          <circle cx="100" cy="100" r="6" fill="#87CEEB" />
        </svg>

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-zewail-blue/20 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-zewail-blue/15 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-zewail-navy/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* IEEE Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zewail-navy/5 border border-zewail-blue/20 mb-8"
        >
          <span className="text-xs font-medium text-zewail-navy/70 tracking-wider uppercase">Powered by IEEE Zewail City</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-zewail-navy leading-tight mb-6"
        >
          Explore Zewail&apos;s
          <br />
          <span className="gradient-text">Knowledge Pavilions</span>
        </motion.h1>

        {/* Subtitle with Zewail tribute */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-zewail-navy/60 max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          A digital book fair bringing together Egypt&apos;s most prestigious publishers 
          under one virtual roof — honoring the legacy of Dr. Ahmed Zewail&apos;s pursuit of knowledge.
        </motion.p>

        {/* Zewail Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-sm italic text-zewail-blue/70 mb-10"
        >
          &ldquo;Knowledge is the light that illuminates the path of humanity&rdquo; — Dr. Ahmed Zewail
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {!isAuthenticated ? (
            <>
              <Button
                onClick={() => {
                  setAuthModalTab('register')
                  setAuthModalOpen(true)
                }}
                size="lg"
                className="bg-zewail-blue hover:bg-zewail-blue/90 text-zewail-navy font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-zewail-blue/25 transition-all hover:shadow-xl hover:shadow-zewail-blue/30 hover:-translate-y-0.5"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Register as Visitor
              </Button>
              <Button
                onClick={() => {
                  setAuthModalTab('login')
                  setAuthModalOpen(true)
                }}
                size="lg"
                variant="outline"
                className="border-zewail-navy text-zewail-navy hover:bg-zewail-navy hover:text-white font-semibold px-8 py-6 text-lg rounded-xl transition-all hover:-translate-y-0.5"
              >
                <LogIn className="mr-2 h-5 w-5" />
                Login to My Dashboard
              </Button>
            </>
          ) : (
            <Button
              onClick={() => navigateTo(user?.role === 'publisher' ? 'publisher-dashboard' : 'visitor-dashboard')}
              size="lg"
              className="bg-zewail-navy hover:bg-zewail-navy/90 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Go to My Dashboard
            </Button>
          )}
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {[
            { label: 'Digital Titles', value: '3,829+' },
            { label: 'Publishers', value: '4' },
            { label: 'Live Events', value: '8' },
            { label: 'Visitors', value: '12,000+' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-zewail-navy">{stat.value}</div>
              <div className="text-sm text-zewail-navy/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
