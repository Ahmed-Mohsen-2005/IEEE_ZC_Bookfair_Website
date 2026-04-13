'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { BOOKS } from '@/lib/data'
import { ArrowLeft, BookOpen, Clock, GraduationCap, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import BookCard from '@/components/BookCard'

export default function DarAlMaarefPavilion() {
  const { navigateTo } = useAppStore()
  const books = BOOKS.filter(b => b.publisherId === 'dar-al-maaref')

  const chronologicalCollections = [
    { era: '1890–1920', title: 'The Founding Era', description: 'Foundational academic works from the early Nahda period', count: 45, color: 'from-amber-800 to-amber-900' },
    { era: '1920–1960', title: 'The Golden Age', description: 'Classic literary and academic publications that shaped modern Arabic thought', count: 128, color: 'from-amber-700 to-amber-800' },
    { era: '1960–2000', title: 'The Modern Period', description: 'Innovative academic and literary works pushing boundaries', count: 234, color: 'from-amber-600 to-amber-700' },
    { era: '2000–Present', title: 'The Digital Renaissance', description: 'Contemporary academic excellence in the digital age', count: 485, color: 'from-green-700 to-green-800' },
  ]

  return (
    <div className="min-h-screen bg-publisher-cream relative">
      {/* Lighthouse watermark */}
      <div className="absolute inset-0 lighthouse-watermark pointer-events-none" />

      {/* Hero with Warm Aged-Paper Background */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <Button
            variant="ghost" size="sm"
            onClick={() => navigateTo('home')}
            className="text-zewail-navy/50 hover:text-zewail-navy mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Pavilions
          </Button>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-600/10 border border-green-600/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-600" />
              <span className="text-xs font-medium text-green-700">Dar Al-Maaref — Est. 1890</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-zewail-navy mb-4">
              A Lighthouse of
              <br />
              <span className="text-green-700">Knowledge Since 1890</span>
            </h1>

            <p className="text-lg text-zewail-navy/60 max-w-2xl mb-8 leading-relaxed">
              Established in 1890, Dar Al-Maaref stands as one of Egypt&apos;s oldest and most revered publishing houses, 
              illuminating the path of academic and literary excellence for over a century. Like a lighthouse guiding 
              sailors, our publications have guided generations of scholars and readers.
            </p>

            {/* Waves decorative element */}
            <div className="absolute bottom-0 left-0 right-0 opacity-[0.06]">
              <svg viewBox="0 0 1200 100" className="w-full">
                <path d="M0,50 Q150,20 300,50 T600,50 T900,50 T1200,50" fill="none" stroke="#2E7D32" strokeWidth="2" />
                <path d="M0,65 Q150,35 300,65 T600,65 T900,65 T1200,65" fill="none" stroke="#2E7D32" strokeWidth="1.5" />
                <path d="M0,80 Q150,50 300,80 T600,80 T900,80 T1200,80" fill="none" stroke="#2E7D32" strokeWidth="1" />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lighthouse SVG Illustration */}
      <div className="flex justify-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <svg width="120" height="200" viewBox="0 0 120 200" fill="none" className="opacity-20">
            <rect x="48" y="40" width="24" height="140" fill="#2E7D32" />
            <rect x="42" y="40" width="36" height="10" fill="#2E7D32" />
            <rect x="38" y="75" width="44" height="5" fill="#2E7D32" />
            <rect x="34" y="110" width="52" height="5" fill="#2E7D32" />
            <circle cx="60" cy="28" r="20" fill="#2E7D32" opacity="0.2" />
            <circle cx="60" cy="28" r="12" fill="#2E7D32" opacity="0.3" />
            {/* Light rays */}
            <line x1="60" y1="28" x2="20" y2="10" stroke="#2E7D32" strokeWidth="1" opacity="0.3" />
            <line x1="60" y1="28" x2="100" y2="10" stroke="#2E7D32" strokeWidth="1" opacity="0.3" />
            <line x1="60" y1="28" x2="10" y2="40" stroke="#2E7D32" strokeWidth="1" opacity="0.3" />
            <line x1="60" y1="28" x2="110" y2="40" stroke="#2E7D32" strokeWidth="1" opacity="0.3" />
            <rect x="30" y="180" width="60" height="12" rx="2" fill="#2E7D32" />
          </svg>
        </motion.div>
      </div>

      {/* Chronological Collections - Aged paper cards */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-zewail-navy mb-8 flex items-center gap-3">
            <Clock className="h-6 w-6 text-green-700" /> Chronological Collections
          </h2>

          <div className="space-y-4">
            {chronologicalCollections.map((collection, i) => (
              <motion.div
                key={collection.era}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-publisher-warm rounded-2xl border border-publisher-sand p-6 hover:shadow-lg transition-all cursor-pointer group flex items-center gap-6"
              >
                {/* Era Badge */}
                <div className={`flex-shrink-0 w-20 h-20 rounded-xl bg-gradient-to-br ${collection.color} flex flex-col items-center justify-center text-white`}>
                  <span className="text-xs font-bold">{collection.era}</span>
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-zewail-navy text-lg group-hover:text-green-700 transition-colors">
                    {collection.title}
                  </h3>
                  <p className="text-sm text-zewail-navy/50 mt-1">{collection.description}</p>
                  <span className="text-xs text-zewail-navy/40 mt-2 inline-block">{collection.count} titles</span>
                </div>

                <ChevronRight className="h-5 w-5 text-zewail-navy/20 group-hover:text-green-700 group-hover:translate-x-1 transition-all" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Excellence Section */}
      <section className="py-16 px-6 bg-green-50/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-zewail-navy mb-8 flex items-center gap-3">
            <GraduationCap className="h-6 w-6 text-green-700" /> Academic Excellence
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {books.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
