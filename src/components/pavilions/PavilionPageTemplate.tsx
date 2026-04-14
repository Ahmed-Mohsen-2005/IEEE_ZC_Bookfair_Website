'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { BOOKS, PUBLISHERS } from '@/lib/data'
import { ArrowLeft, BookOpen, Award, Landmark, Archive, ChevronRight, Users, TrendingUp, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import BookCard from '@/components/BookCard'
import { useState } from 'react'

interface Collection {
  titleEn: string; titleAr: string
  icon: React.ElementType
  descEn: string;  descAr: string
  count: number
}

interface PavilionPageTemplateProps {
  publisherId: string
  accentHex: string
  collections: Collection[]
  statsEn: { label: string; value: string }[]
  statsAr: { label: string; value: string }[]
  badgeEn: string; badgeAr: string
}

export default function PavilionPageTemplate({ publisherId, accentHex, collections, statsEn, statsAr, badgeEn, badgeAr }: PavilionPageTemplateProps) {
  const { navigateTo, language } = useAppStore()
  const isAr = language === 'ar'
  const [query, setQuery] = useState('')

  const publisher = PUBLISHERS.find(p => p.id === publisherId)
  const books = BOOKS.filter(b => b.publisherId === publisherId)
  const filtered = query ? books.filter(b => b.title.toLowerCase().includes(query.toLowerCase()) || b.author.toLowerCase().includes(query.toLowerCase())) : books

  const t = {
    back: isAr ? 'العودة إلى المعارض' : 'Back to Pavilions',
    badge: isAr ? badgeAr : badgeEn,
    name: isAr && publisher?.nameAr ? publisher.nameAr : (publisher?.name || ''),
    desc: isAr && publisher?.descriptionAr ? publisher.descriptionAr : (publisher?.description || ''),
    collections: isAr ? 'المجموعات المنسّقة' : 'Curated Collections',
    featured: isAr ? 'الإصدارات المميزة' : 'Featured Titles',
    explore: isAr ? 'استكشاف المجموعة' : 'Explore Collection',
    searchPlaceholder: isAr ? 'ابحث في كتب هذا الناشر...' : 'Search titles & authors...',
    stats: isAr ? statsAr : statsEn,
    titles: isAr ? 'عدد العناوين' : 'titles',
  }

  return (
    <div className="min-h-screen bg-background relative" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Blueprint grid */}
      <div className="absolute inset-0 z-0 blueprint-grid" />

      {/* Hero */}
      <section className="relative pt-28 pb-20 px-6 overflow-hidden">
        {/* Accent glow */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 80% 20%, ${accentHex}, transparent 70%)` }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <Button variant="ghost" size="sm" onClick={() => navigateTo('home')}
            className="text-muted-foreground hover:text-foreground mb-6 flex items-center gap-1.5">
            <ArrowLeft className={`h-4 w-4 ${isAr ? 'rotate-180' : ''}`} /> {t.back}
          </Button>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {publisher?.logoUrl && (
              <div id={`logo-${publisher.id}`} className="mb-6 flex items-center justify-start">
                <div className="w-20 h-20 rounded-2xl bg-white p-3 shadow-sm border border-border flex items-center justify-center">
                  <img 
                    src={publisher.logoUrl} 
                    alt={t.name} 
                    className="max-w-full max-h-full object-contain"
                    onError={() => {
                      const container = document.getElementById(`logo-${publisher.id}`);
                      if (container) container.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}
            
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6`}
              style={{ backgroundColor: accentHex + '15', borderColor: accentHex + '40' }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentHex }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accentHex }}>{t.badge}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4 leading-tight">
              {t.name}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed font-light">
              {t.desc}
            </p>

            {/* Stats bar */}
            <div className="flex flex-wrap gap-8 p-6 bg-card border border-border rounded-2xl shadow-sm max-w-fit">
              {t.stats.map((stat, i) => (
                <div key={stat.label} className={`text-center px-6 ${i !== t.stats.length - 1 ? 'border-r border-border rtl:border-r-0 rtl:border-l' : ''}`}>
                  <div className="text-2xl font-bold mb-1" style={{ color: accentHex }}>{stat.value}</div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Curated Collections */}
      <section className="py-16 px-6 bg-muted/40 dark:bg-muted/10 border-t border-border relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
            <Landmark className="h-6 w-6" style={{ color: accentHex }} /> {t.collections}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections.map((col, i) => (
              <motion.div key={col.titleEn}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className={`bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-xl hover:border-[${accentHex}]/30 transition-all cursor-pointer group`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl transition-colors duration-300 group-hover:text-white"
                    style={{ backgroundColor: accentHex + '18', color: accentHex }}>
                    <col.icon className="h-6 w-6 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{isAr ? col.titleAr : col.titleEn}</h3>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {col.count} {t.titles}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  {isAr ? col.descAr : col.descEn}
                </p>
                <div className="flex items-center gap-1 mt-5 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: accentHex }}>
                  {t.explore} <ChevronRight className={`h-4 w-4 ${isAr ? 'rotate-180' : ''}`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Titles */}
      <section className="py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <BookOpen className="h-6 w-6" style={{ color: accentHex }} /> {t.featured}
            </h2>
            {/* Search */}
            <div className="relative w-64">
              <Search className="absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground start-3" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full h-9 ps-9 pe-3 text-sm rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-zewail-blue"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {filtered.map(book => <BookCard key={book.id} book={book} />)}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-16">
              {isAr ? 'لا توجد نتائج' : 'No results found'}
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
