'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { BOOKS } from '@/lib/data'
import { ArrowLeft, BookOpen, Globe, Flame, Newspaper, TrendingUp, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import BookCard from '@/components/BookCard'

export default function AlAhramPavilion() {
  const { navigateTo } = useAppStore()
  const books = BOOKS.filter(b => b.publisherId === 'al-ahram')

  const [activeCategory, setActiveCategory] = useState<'all' | 'politics' | 'science' | 'current'>('all')

  const newsGridSections = [
    {
      title: 'Political & Scientific Thought',
      icon: Globe,
      description: 'In-depth analysis of the intersection between political discourse and scientific advancement in the Arab world.',
      featured: books.filter(b => b.genre === 'Political Science' || b.genre === 'Science & Philosophy'),
      color: 'border-l-publisher-red',
    },
    {
      title: 'Current Affairs Publications',
      icon: Newspaper,
      description: 'Authoritative coverage and analysis of regional and global current affairs from the Arab world\'s leading editorial voice.',
      featured: books.filter(b => b.genre === 'Current Affairs'),
      color: 'border-l-red-600',
    },
  ]

  const trendingTopics = [
    'Femtochemistry & Literature',
    'Digital Transformation in Publishing',
    'Egypt\'s Scientific Renaissance',
    'Climate Change in the Nile Delta',
    'AI and Arabic Language Processing',
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero - Dynamic, News-Grid Inspired */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-zewail-navy via-zewail-navy-light to-zewail-navy overflow-hidden text-white">
        {/* Dynamic grid pattern background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="grid grid-cols-8 gap-1 h-full">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="border border-white/20 rounded-sm" />
            ))}
          </div>
        </div>

        {/* Red accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-publisher-red" />

        <div className="max-w-6xl mx-auto relative z-10">
          <Button
            variant="ghost" size="sm"
            onClick={() => navigateTo('home')}
            className="text-white/50 hover:text-white hover:bg-white/10 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Pavilions
          </Button>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-publisher-red/20 border border-publisher-red/30 mb-6">
              <div className="w-2 h-2 rounded-full bg-publisher-red animate-pulse" />
              <span className="text-xs font-medium text-red-300">Al-Ahram — Live</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              At the Peak
              <br />
              <span className="text-publisher-red">of Thought</span>
            </h1>

            <p className="text-lg text-white/60 max-w-2xl mb-8 leading-relaxed">
              Egypt&apos;s most prominent publishing institution, shaping public discourse through authoritative 
              political analysis, scientific commentary, and cultural thought leadership.
            </p>

            <div className="flex flex-wrap gap-6">
              {[
                { label: 'Digital Titles', value: '1,056' },
                { label: 'Active Readers', value: '8,910' },
                { label: 'Weekly Articles', value: '45+' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-white/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trending Topics Bar */}
      <section className="bg-zewail-navy/5 border-b border-zewail-blue/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4 overflow-x-auto">
            <TrendingUp className="h-4 w-4 text-publisher-red flex-shrink-0" />
            <span className="text-xs font-medium text-zewail-navy/50 flex-shrink-0">Trending:</span>
            {trendingTopics.map((topic, i) => (
              <Badge
                key={topic}
                variant="secondary"
                className="bg-white text-zewail-navy/60 border border-zewail-blue/10 text-xs whitespace-nowrap cursor-pointer hover:bg-publisher-red/10 hover:text-publisher-red hover:border-publisher-red/20 transition-colors"
              >
                {i === 0 && <Flame className="h-3 w-3 mr-1 text-publisher-red" />}
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid Layout - Category Filter */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-zewail-navy flex items-center gap-3">
              <Newspaper className="h-6 w-6 text-publisher-red" /> Featured Sections
            </h2>
            <div className="flex gap-2">
              {[
                { key: 'all', label: 'All' },
                { key: 'politics', label: 'Political' },
                { key: 'science', label: 'Science' },
                { key: 'current', label: 'Current' },
              ].map(cat => (
                <Button
                  key={cat.key}
                  variant={activeCategory === cat.key ? 'default' : 'outline'}
                  size="sm"
                  className={activeCategory === cat.key ? 'bg-publisher-red text-white hover:bg-publisher-red/90' : 'border-zewail-blue/20'}
                  onClick={() => setActiveCategory(cat.key as typeof activeCategory)}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>

          {/* News Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {newsGridSections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`bg-white rounded-2xl border border-zewail-blue/10 overflow-hidden hover:shadow-lg transition-all border-l-4 ${section.color}`}
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <section.icon className="h-5 w-5 text-publisher-red" />
                    <h3 className="font-semibold text-zewail-navy text-lg">{section.title}</h3>
                  </div>
                  <p className="text-sm text-zewail-navy/50 mb-4">{section.description}</p>
                  
                  {/* Featured books in this section */}
                  <div className="space-y-3">
                    {section.featured.map(book => (
                      <div
                        key={book.id}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-zewail-blue/5 cursor-pointer transition-colors group"
                        onClick={() => navigateTo('home')}
                      >
                        <div className="w-10 h-14 rounded bg-gradient-to-br from-red-400 to-red-600 flex-shrink-0 flex items-center justify-center">
                          <BookOpen className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-zewail-navy group-hover:text-publisher-red transition-colors line-clamp-1">
                            {book.title}
                          </p>
                          <p className="text-xs text-zewail-navy/40">{book.author} • {book.year}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-zewail-navy/20 group-hover:text-publisher-red transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Publications Grid */}
      <section className="py-16 px-6 bg-zewail-navy/[0.02]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-zewail-navy mb-8 flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-publisher-red" /> All Publications
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {books.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Red accent divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-publisher-red/30 to-transparent" />
    </div>
  )
}
