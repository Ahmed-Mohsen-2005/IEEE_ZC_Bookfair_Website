'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { BOOKS } from '@/lib/data'
import { ArrowLeft, BookOpen, Scroll, Shield, Eye, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import BookCard from '@/components/BookCard'

export default function NationalLibraryPavilion() {
  const { navigateTo, setReadingBookId } = useAppStore()
  const books = BOOKS.filter(b => b.publisherId === 'national-library')

  const archiveSections = [
    {
      title: 'Rare Manuscripts Collection',
      icon: Scroll,
      description: 'High-resolution digital facsimiles of previously unpublished manuscripts spanning the Fatimid, Ayyubid, and Mamluk eras.',
      count: 47,
      items: ['Mamluk Court Documents', 'Fatimid Religious Texts', 'Ayyubid Scientific Treatises'],
    },
    {
      title: 'Historical Digital Facsimiles',
      icon: Eye,
      description: 'Digitized reproductions of rare historical documents with enhanced viewing capabilities for research and preservation.',
      count: 89,
      items: ['Ottoman Court Records', 'Papyrus Document Archive', 'Colonial-Era Correspondence'],
    },
    {
      title: 'National Memory Archive',
      icon: Shield,
      description: 'The definitive repository of Egypt\'s documentary heritage, preserving the nation\'s archival treasures for future generations.',
      count: 156,
      items: ['Independence Movement Documents', 'Royal Decrees & Edicts', 'Cultural Heritage Records'],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/20 to-white relative">
      {/* Papyrus column watermark */}
      <div className="absolute inset-0 papyrus-watermark pointer-events-none" />

      {/* Hero */}
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-600/10 border border-amber-600/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-amber-600" />
              <span className="text-xs font-medium text-amber-700">National Library and Archives of Egypt</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-zewail-navy mb-4">
              Gatekeepers of
              <br />
              <span className="text-amber-700">National Memory</span>
            </h1>

            <p className="text-lg text-zewail-navy/60 max-w-2xl mb-8 leading-relaxed">
              The guardian of Egypt&apos;s documentary heritage, preserving rare manuscripts, historical facsimiles, 
              and the nation&apos;s archival treasures for future generations. Step through the gates of time and 
              explore centuries of preserved knowledge.
            </p>

            {/* Ancient Egyptian decorative element */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-16 bg-amber-600/30" />
              <svg width="40" height="40" viewBox="0 0 40 40" className="opacity-20">
                {/* Papyrus column */}
                <rect x="16" y="5" width="8" height="28" fill="#B8860B" />
                <path d="M14 5 Q20 -2 26 5" fill="#B8860B" />
                <rect x="12" y="33" width="16" height="5" rx="1" fill="#B8860B" />
                {/* Winged sun disk */}
                <circle cx="20" cy="2" r="3" fill="#B8860B" />
              </svg>
              <div className="h-px w-16 bg-amber-600/30" />
            </div>

            <div className="flex flex-wrap gap-6">
              {[
                { label: 'Digital Facsimiles', value: '634' },
                { label: 'Rare Manuscripts', value: '47' },
                { label: 'Centuries Covered', value: '12' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-zewail-navy">{stat.value}</div>
                  <div className="text-xs text-zewail-navy/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Ancient Egyptian architectural forms - decorative */}
          <div className="absolute top-20 right-10 opacity-[0.03] hidden lg:block">
            <svg width="300" height="400" viewBox="0 0 300 400" fill="#B8860B">
              {/* Papyrus columns */}
              <rect x="40" y="60" width="16" height="280" />
              <path d="M32 60 Q48 40 64 60" fill="#B8860B" />
              <rect x="32" y="340" width="32" height="12" />
              
              <rect x="120" y="60" width="16" height="280" />
              <path d="M112 60 Q128 40 144 60" fill="#B8860B" />
              <rect x="112" y="340" width="32" height="12" />
              
              <rect x="200" y="60" width="16" height="280" />
              <path d="M192 60 Q208 40 224 60" fill="#B8860B" />
              <rect x="192" y="340" width="32" height="12" />
              
              {/* Winged sun */}
              <ellipse cx="128" cy="30" rx="50" ry="10" />
              <circle cx="128" cy="30" r="15" />
            </svg>
          </div>
        </div>
      </section>

      {/* Archive Sections with Facsimile Viewers */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-zewail-navy mb-8 flex items-center gap-3">
            <Scroll className="h-6 w-6 text-amber-700" /> Archival Collections
          </h2>

          <div className="space-y-6">
            {archiveSections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-2xl border border-amber-200/50 p-8 hover:shadow-lg hover:shadow-amber-500/5 transition-all"
              >
                <div className="flex items-start gap-5">
                  <div className="p-4 rounded-xl bg-amber-600/10 text-amber-700 flex-shrink-0">
                    <section.icon className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-zewail-navy">{section.title}</h3>
                      <span className="text-xs text-zewail-navy/40 bg-amber-50 px-3 py-1 rounded-full">{section.count} items</span>
                    </div>
                    <p className="text-sm text-zewail-navy/50 mb-4">{section.description}</p>
                    
                    {/* Sub-items */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {section.items.map(item => (
                        <button
                          key={item}
                          onClick={() => setReadingBookId(books[0]?.id)}
                          className="flex items-center gap-2 px-4 py-3 bg-amber-50/50 hover:bg-amber-100/50 rounded-xl text-sm text-zewail-navy/70 hover:text-amber-800 transition-colors border border-amber-100"
                        >
                          <Eye className="h-4 w-4 flex-shrink-0" />
                          <span>{item}</span>
                          <ChevronRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Manuscript Highlights */}
      <section className="py-16 px-6 bg-amber-50/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-zewail-navy mb-8 flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-amber-700" /> Digital Manuscripts
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
