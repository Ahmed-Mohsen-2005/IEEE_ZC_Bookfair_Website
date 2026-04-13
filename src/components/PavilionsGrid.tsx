'use client'

import { motion } from 'framer-motion'
import { useAppStore, type PageView } from '@/lib/store'
import { PUBLISHERS } from '@/lib/data'
import { BookOpen, Users, ChevronRight, Library } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const PAVILION_PAGES: Record<string, PageView> = {
  'general-egyptian': 'pavilion-general-egyptian',
  'dar-al-maaref': 'pavilion-dar-al-maaref',
  'national-library': 'pavilion-national-library',
  'al-ahram': 'pavilion-al-ahram',
}

const PAVILION_ICONS: Record<string, React.ReactNode> = {
  'general-egyptian': <Library className="h-8 w-8" />,
  'dar-al-maaref': <BookOpen className="h-8 w-8" />,
  'national-library': <Users className="h-8 w-8" />,
  'al-ahram': <BookOpen className="h-8 w-8" />,
}

export default function PavilionsGrid() {
  const { navigateTo } = useAppStore()

  return (
    <section className="py-20 px-6 bg-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-zewail-navy mb-4">
              Digital Pavilions
            </h2>
            <p className="text-zewail-navy/50 text-lg max-w-2xl mx-auto">
              Four distinguished Egyptian publishers, each offering a unique gateway to knowledge and culture
            </p>
          </motion.div>
        </div>

        {/* Pavilion Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {PUBLISHERS.map((publisher, index) => (
            <motion.div
              key={publisher.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="pavilion-card cursor-pointer"
              onClick={() => navigateTo(PAVILION_PAGES[publisher.id])}
            >
              <Card className="group relative overflow-hidden border-2 hover:border-opacity-100 transition-all duration-500 hover:shadow-2xl hover:shadow-zewail-blue/10"
                style={{ borderColor: `${publisher.accentColor}30` }}
              >
                {/* Accent strip */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-500 group-hover:h-2"
                  style={{ backgroundColor: publisher.accentColor }}
                />

                <CardContent className="p-8 pt-10">
                  <div className="flex items-start gap-5">
                    {/* Icon */}
                    <div
                      className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-white transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundColor: publisher.accentColor }}
                    >
                      {PAVILION_ICONS[publisher.id]}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-zewail-navy mb-1 group-hover:text-zewail-accent transition-colors">
                        {publisher.name}
                      </h3>
                      <p className="text-sm italic mb-3" style={{ color: publisher.accentColor }}>
                        {publisher.tagline}
                      </p>
                      <p className="text-sm text-zewail-navy/50 line-clamp-2 mb-4">
                        {publisher.description}
                      </p>

                      <div className="flex items-center justify-between">
                        {/* Live count badge */}
                        <div className="flex items-center gap-2">
                          <div className="relative flex items-center justify-center">
                            <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75 animate-ping" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                          </div>
                          <span className="text-sm font-medium text-zewail-navy/70">
                            {publisher.bookCount.toLocaleString()} digital titles
                          </span>
                        </div>

                        {/* Arrow */}
                        <ChevronRight className="h-5 w-5 text-zewail-navy/30 group-hover:text-zewail-accent group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Subtle book open effect on hover */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500">
                    <svg viewBox="0 0 100 100" fill="currentColor" className="text-zewail-navy">
                      <path d="M50,10 L50,90 M50,10 C30,20 10,15 5,25 L5,85 C10,75 30,80 50,90 M50,10 C70,20 90,15 95,25 L95,85 C90,75 70,80 50,90" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
