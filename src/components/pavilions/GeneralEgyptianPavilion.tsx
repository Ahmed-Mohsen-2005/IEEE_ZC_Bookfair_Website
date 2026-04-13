'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { BOOKS } from '@/lib/data'
import { ArrowLeft, BookOpen, Award, Landmark, Archive, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import BookCard from '@/components/BookCard'

export default function GeneralEgyptianPavilion() {
  const { navigateTo } = useAppStore()
  const books = BOOKS.filter(b => b.publisherId === 'general-egyptian')

  const curatedCollections = [
    { title: 'State Prize Winners', icon: Award, description: 'Celebrating recipients of Egypt\'s highest literary honor', count: 23 },
    { title: 'Historical Archive', icon: Archive, description: 'Definitive works documenting Egypt\'s rich historical tapestry', count: 156 },
    { title: 'National Heritage Collection', icon: Landmark, description: 'Preserving the cultural and intellectual heritage of the nation', count: 89 },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero with Red Accent */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-white via-red-50/30 to-sky-50/20 overflow-hidden">
        <div className="absolute inset-0 pyramid-watermark opacity-30" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <Button
            variant="ghost" size="sm"
            onClick={() => navigateTo('home')}
            className="text-zewail-navy/50 hover:text-zewail-navy mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Pavilions
          </Button>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-xs font-medium text-red-700">General Egyptian Book Organization</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-zewail-navy mb-4">
              State Custodian<br />
              <span className="text-publisher-red">of Letters</span>
            </h1>

            <p className="text-lg text-zewail-navy/60 max-w-2xl mb-8 leading-relaxed">
              The foremost national institution dedicated to the preservation, production, and dissemination 
              of Egyptian literary and intellectual heritage. A pillar of state-sponsored cultural enrichment.
            </p>

            <div className="flex flex-wrap gap-6">
              {[
                { label: 'Digital Titles', value: '1,247' },
                { label: 'State Prize Winners', value: '23' },
                { label: 'Historical Volumes', value: '156' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-zewail-navy">{stat.value}</div>
                  <div className="text-xs text-zewail-navy/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Grand Library Columns SVG */}
          <div className="absolute top-10 right-10 opacity-[0.04] hidden lg:block">
            <svg width="200" height="300" viewBox="0 0 200 300" fill="#C41E3A">
              <rect x="20" y="50" width="12" height="200" />
              <path d="M14 50 Q26 35 38 50" fill="#C41E3A" />
              <rect x="14" y="250" width="24" height="8" />
              <rect x="70" y="50" width="12" height="200" />
              <path d="M64 50 Q76 35 88 50" fill="#C41E3A" />
              <rect x="64" y="250" width="24" height="8" />
              <rect x="120" y="50" width="12" height="200" />
              <path d="M114 50 Q126 35 138 50" fill="#C41E3A" />
              <rect x="114" y="250" width="24" height="8" />
              <polygon points="100,10 180,50 20,50" fill="none" stroke="#C41E3A" strokeWidth="2" />
              <rect x="10" y="258" width="140" height="12" />
            </svg>
          </div>
        </div>
      </section>

      {/* Curated Collections */}
      <section className="py-16 px-6 bg-zewail-navy/[0.02]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-zewail-navy mb-8 flex items-center gap-3">
            <Landmark className="h-6 w-6 text-publisher-red" /> Curated Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {curatedCollections.map((collection, i) => (
              <motion.div
                key={collection.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-2xl border border-red-100 p-6 hover:shadow-lg hover:shadow-red-500/5 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-red-500/10 text-publisher-red group-hover:bg-red-500 group-hover:text-white transition-colors">
                    <collection.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-zewail-navy">{collection.title}</h3>
                    <span className="text-xs text-zewail-navy/40">{collection.count} titles</span>
                  </div>
                </div>
                <p className="text-sm text-zewail-navy/50">{collection.description}</p>
                <div className="flex items-center gap-1 mt-4 text-sm text-publisher-red opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ChevronRight className="h-4 w-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Titles */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-zewail-navy mb-8 flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-publisher-red" /> Featured Titles
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {books.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      <div className="h-1 bg-gradient-to-r from-transparent via-publisher-red/30 to-transparent" />
    </div>
  )
}
