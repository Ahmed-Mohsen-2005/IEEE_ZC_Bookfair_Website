'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { BookOpen, Star, Users, ChevronRight } from 'lucide-react'

const FEATURED_BOOKS = [
  {
    id: 'b1',
    titleEn: 'The Science of Everything',
    titleAr: 'علم كل شيء',
    authorEn: 'Prof. Ibrahim Al-Sayed',
    authorAr: 'أ.د. إبراهيم السيد',
    publisherEn: 'General Egyptian Book Organization',
    publisherAr: 'الهيئة المصرية العامة للكتاب',
    genreEn: 'Science',
    genreAr: 'علوم',
    year: 2024,
    rating: 4.8,
    readers: 12400,
    spineColor: '#00B4D1',
    coverColor: 'from-zewail-blue to-cyan-600',
    descEn: 'A comprehensive journey through the fundamental laws that govern our universe, written with academic rigor and accessible clarity.',
    descAr: 'رحلة شاملة عبر القوانين الأساسية التي تحكم كوننا، مكتوبة بصرامة أكاديمية ووضوح يسهل الوصول إليه.',
  },
  {
    id: 'b2',
    titleEn: 'The Arabic Novel in the Digital Age',
    titleAr: 'الرواية العربية في العصر الرقمي',
    authorEn: 'Dr. Layla Hassan',
    authorAr: 'د. ليلى حسن',
    publisherEn: 'Dar Al-Maaref',
    publisherAr: 'دار المعارف',
    genreEn: 'Literature',
    genreAr: 'أدب',
    year: 2024,
    rating: 4.6,
    readers: 8900,
    spineColor: '#8B5CF6',
    coverColor: 'from-purple-500 to-indigo-600',
    descEn: 'An analytical study of how digital platforms have transformed Arabic literary production and readership over the last decade.',
    descAr: 'دراسة تحليلية لكيفية تحويل المنصات الرقمية للإنتاج الأدبي العربي وقراءته خلال العقد الأخير.',
  },
  {
    id: 'b3',
    titleEn: 'Egypt: Memory of Civilization',
    titleAr: 'مصر: ذاكرة الحضارة',
    authorEn: 'National Archives Editorial Board',
    authorAr: 'الهيئة التحريرية للأرشيف القومي',
    publisherEn: 'National Library and Archives',
    publisherAr: 'دار الكتب والوثائق القومية',
    genreEn: 'History',
    genreAr: 'تاريخ',
    year: 2023,
    rating: 4.9,
    readers: 21000,
    spineColor: '#C4A35A',
    coverColor: 'from-amber-500 to-yellow-600',
    descEn: 'A monumental archive of Egypt\'s civilizational journey from ancient times to the modern era, richly illustrated with primary sources.',
    descAr: 'أرشيف ضخم للرحلة الحضارية لمصر من العصور القديمة إلى العصر الحديث، مزود بمصادر أولية غنية.',
  },
]

export default function BookShowcase() {
  const { language } = useAppStore()
  const isAr = language === 'ar'
  const [selected, setSelected] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const book = FEATURED_BOOKS[selected]

  const t = {
    badge: isAr ? 'المختارات المميزة' : 'Featured Selections',
    title: isAr ? 'أبرز إصدارات المعرض' : 'Fair Highlights',
    desc: isAr
      ? 'اكتشف الإصدارات الأكثر قراءة وتأثيراً في معرض الكتاب الرقمي لمدينة زويل.'
      : 'Discover the most read and impactful publications at the Zewail Digital Book Fair.',
    readers: isAr ? 'قارئ' : 'readers',
    readNow: isAr ? 'اقرأ الآن' : 'Read Now',
    flipHint: isAr ? 'انقر على الكتاب لعرض التفاصيل' : 'Click the book to see details',
  }

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-background border-y border-border">
      <div className="absolute inset-0 blueprint-grid opacity-40" />
      {/* Glow blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-zewail-blue/4 dark:bg-zewail-blue/8 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-zewail-blue/25 bg-zewail-blue/8 dark:bg-zewail-blue/15">
            <BookOpen className="w-3.5 h-3.5 text-zewail-blue" />
            <span className="text-xs font-bold tracking-wider text-zewail-blue uppercase">{t.badge}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-light">{t.desc}</p>
        </motion.div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isAr ? 'lg:grid-flow-dense' : ''}`}>
          {/* 3D Book */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Book selector tabs */}
              <div className={`flex gap-3 mb-8 ${isAr ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
                {FEATURED_BOOKS.map((b, i) => (
                  <button
                    key={b.id}
                    onClick={() => { setSelected(i); setFlipped(false) }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i === selected ? 'scale-125' : 'opacity-40 hover:opacity-70'
                    }`}
                    style={{ backgroundColor: FEATURED_BOOKS[i].spineColor }}
                  />
                ))}
              </div>

              {/* 3D Book visual */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, rotateY: -30 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: 30 }}
                  transition={{ duration: 0.5 }}
                  style={{ perspective: 1200 }}
                  onClick={() => setFlipped(!flipped)}
                  className="cursor-pointer"
                >
                  <motion.div
                    animate={{ rotateY: flipped ? 180 : 0 }}
                    transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}
                    style={{ transformStyle: 'preserve-3d', position: 'relative', width: 220, height: 300 }}
                  >
                    {/* Front cover */}
                    <div
                      className={`absolute inset-0 rounded-r-lg rounded-br-lg bg-gradient-to-br ${book.coverColor} shadow-2xl flex flex-col justify-between p-6`}
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      {/* Book spine shadow */}
                      <div className="absolute left-0 top-0 bottom-0 w-5 bg-black/20 rounded-l-lg" />
                      <div className="absolute left-5 top-0 bottom-0 w-1 bg-white/10" />

                      <div className="relative z-10">
                        <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div className="space-y-1.5">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-1 rounded-full bg-white/30" style={{ width: `${60 + i * 10}%` }} />
                          ))}
                        </div>
                      </div>

                      <div className="relative z-10">
                        <h3 className="text-white font-bold text-lg leading-tight mb-2">
                          {isAr ? book.titleAr : book.titleEn}
                        </h3>
                        <p className="text-white/70 text-xs">{isAr ? book.authorAr : book.authorEn}</p>
                      </div>

                      <div className="absolute bottom-3 right-3 text-white/30 text-6xl font-black select-none leading-none">
                        {book.year}
                      </div>
                    </div>

                    {/* Back (description) */}
                    <div
                      className="absolute inset-0 rounded-r-lg bg-card border border-border shadow-2xl p-6 flex flex-col justify-between"
                      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: book.spineColor }} />
                          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            {isAr ? book.genreAr : book.genreEn}
                          </span>
                        </div>
                        <h3 className={`font-bold text-foreground text-base leading-tight mb-3 ${isAr ? 'text-right' : ''}`}>
                          {isAr ? book.titleAr : book.titleEn}
                        </h3>
                        <p className={`text-xs text-muted-foreground leading-relaxed ${isAr ? 'text-right' : ''}`}>
                          {isAr ? book.descAr : book.descEn}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 pt-3 border-t border-border">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-bold text-foreground">{book.rating}</span>
                        <span className="text-xs text-muted-foreground ms-1">{book.readers.toLocaleString()} {t.readers}</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              <p className="text-center text-xs text-muted-foreground mt-4">
                {t.flipHint}
              </p>
            </div>
          </div>

          {/* Book details panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={book.id + '-details'}
              initial={{ opacity: 0, x: isAr ? -24 : 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isAr ? 24 : -24 }}
              transition={{ duration: 0.4 }}
              className={isAr ? 'text-right' : ''}
            >
              <div className={`inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider`}
                style={{ backgroundColor: book.spineColor + '18', color: book.spineColor, border: `1px solid ${book.spineColor}40` }}>
                {isAr ? book.genreAr : book.genreEn}
              </div>

              <h3 className="text-3xl font-bold text-foreground mb-2">
                {isAr ? book.titleAr : book.titleEn}
              </h3>
              <p className="text-muted-foreground mb-1 font-medium">{isAr ? book.authorAr : book.authorEn}</p>
              <p className="text-sm text-muted-foreground mb-6">{isAr ? book.publisherAr : book.publisherEn} · {book.year}</p>

              <p className="text-muted-foreground leading-relaxed mb-8">
                {isAr ? book.descAr : book.descEn}
              </p>

              <div className={`flex items-center gap-6 mb-8 ${isAr ? 'flex-row-reverse' : ''}`}>
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(book.rating) ? 'text-amber-400 fill-amber-400' : 'text-muted'}`} />
                  ))}
                  <span className="ms-2 text-sm font-bold text-foreground">{book.rating}</span>
                </div>
                <div className={`flex items-center gap-1.5 text-muted-foreground text-sm ${isAr ? 'flex-row-reverse' : ''}`}>
                  <Users className="w-4 h-4 text-zewail-blue" />
                  {book.readers.toLocaleString()} {t.readers}
                </div>
              </div>

              {/* Book selectors */}
              <div className={`flex gap-3 mb-8 ${isAr ? 'flex-row-reverse' : ''}`}>
                {FEATURED_BOOKS.map((b, i) => (
                  <motion.button
                    key={b.id}
                    onClick={() => { setSelected(i); setFlipped(false) }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 text-xs font-semibold transition-all ${
                      i === selected
                        ? 'text-white shadow-md'
                        : 'border-border bg-card text-muted-foreground hover:border-zewail-blue/30'
                    }`}
                    style={i === selected ? { backgroundColor: b.spineColor, borderColor: b.spineColor } : {}}
                  >
                    {isAr ? b.titleAr.split(' ').slice(0, 2).join(' ') + '...' : b.titleEn.split(' ').slice(0, 2).join(' ') + '...'}
                  </motion.button>
                ))}
              </div>

              <button
                className={`group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white shadow-md transition-all ${isAr ? 'flex-row-reverse' : ''}`}
                style={{ background: `linear-gradient(135deg, ${book.spineColor}, ${book.spineColor}cc)`, boxShadow: `0 4px 20px ${book.spineColor}40` }}
              >
                <BookOpen className="w-4 h-4" />
                {t.readNow}
                <ChevronRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isAr ? 'rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0' : ''}`} />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
