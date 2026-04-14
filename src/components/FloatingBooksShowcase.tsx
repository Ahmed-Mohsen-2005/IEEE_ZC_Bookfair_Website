'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { BOOKS, getBookCoverGradient } from '@/lib/data'
import { BookOpen, Sparkles } from 'lucide-react'

// Pastel gradient pairs for CSS 3D books
const COVER_PAIRS: [string, string][] = [
  ['#0B1D35', '#00B4D1'], ['#1a1150', '#7C3AED'], ['#0d3321', '#059669'],
  ['#3d1a00', '#C4A35A'], ['#1a0030', '#EC4899'], ['#001a2e', '#0EA5E9'],
]

const FEATURED = BOOKS.slice(0, 9)

function CSSBook({ book, index, onClick }: { book: typeof BOOKS[0]; index: number; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const pair = COVER_PAIRS[index % COVER_PAIRS.length]

  const handleClick = () => {
    setFlipped(f => !f)
    setTimeout(onClick, 300)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      style={{ perspective: 800 }}
      className="cursor-pointer select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <motion.div
        animate={{
          rotateY: flipped ? 180 : hovered ? -15 : 0,
          y: hovered ? -12 : 0,
          scale: hovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
        className="relative w-32 h-44 md:w-36 md:h-52"
      >
        {/* Front */}
        <div className="absolute inset-0 rounded-r-lg overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            background: `linear-gradient(135deg, ${pair[0]}, ${pair[1]})`,
            boxShadow: hovered
              ? `-8px 12px 30px rgba(0,0,0,0.4), -2px 0 0 rgba(0,0,0,0.3)`
              : `-4px 6px 16px rgba(0,0,0,0.25), -1px 0 0 rgba(0,0,0,0.2)`,
          }}>
          {/* Spine shadow */}
          <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/40 to-transparent" />
          {/* Decorative lines */}
          <div className="absolute inset-0 p-4 flex flex-col">
            <div className="flex-1 border border-white/15 rounded-sm mb-3" />
            <div className="space-y-1.5">
              <div className="h-px bg-white/30" />
              <div className="h-px bg-white/20 w-3/4" />
            </div>
          </div>
          {/* Title on cover */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
            <p className="text-[10px] font-medium opacity-60 text-center line-clamp-1 mb-2">{book.author}</p>
            <p className="text-xs font-bold text-center leading-snug line-clamp-4">{book.title}</p>
            <p className="text-[9px] opacity-40 mt-3">{book.year}</p>
          </div>
          {/* Hover shimmer */}
          <motion.div className="absolute inset-0 rounded-r-lg"
            animate={{ opacity: hovered ? 0.12 : 0 }}
            style={{ background: 'linear-gradient(135deg, white, transparent)' }} />
        </div>

        {/* Back (flipped) */}
        <div className="absolute inset-0 rounded-r-lg flex items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(135deg, ${pair[1]}, ${pair[0]})`,
          }}>
          <div className="text-center p-4">
            <BookOpen className="w-8 h-8 text-white/60 mx-auto mb-2" />
            <p className="text-white text-[10px] font-semibold">Click to read</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function FloatingBooksShowcase() {
  const { setReadingBookId, language } = useAppStore()
  const isAr = language === 'ar'

  const t = {
    eyebrow: isAr ? 'مجموعة المعرض' : 'Fair Collection',
    title: isAr ? 'الكتب في بُعد ثالث' : 'Books in 3D',
    subtitle: isAr
      ? 'تصفّح مجموعة الكتب بتصميم ثلاثي الأبعاد تفاعلي — اضغط على أي كتاب لمعاينته.'
      : 'Browse the fair collection in an interactive 3D layout — click any book to preview it.',
  }

  return (
    <section className="py-20 px-6 overflow-hidden bg-muted/30 dark:bg-[#060f1c] relative">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] opacity-10 pointer-events-none bg-zewail-blue" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zewail-blue/25 bg-zewail-blue/8 mb-5 ${isAr ? 'flex-row-reverse' : ''}`}>
            <Sparkles className="w-3.5 h-3.5 text-zewail-blue" />
            <span className="text-xs font-bold tracking-widest text-zewail-blue uppercase">{t.eyebrow}</span>
          </div>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-foreground mb-4">{t.title}</motion.h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">{t.subtitle}</p>
        </div>

        {/* 3D Book Grid — perspective tilt on scroll */}
        <motion.div
          initial={{ rotateX: 20, opacity: 0 }}
          whileInView={{ rotateX: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ perspective: 1200 }}
        >
          <div className={`flex flex-wrap gap-6 justify-center items-end ${isAr ? 'flex-row-reverse' : ''}`}>
            {FEATURED.map((book, i) => (
              <CSSBook
                key={book.id}
                book={book}
                index={i}
                onClick={() => setReadingBookId(book.id)}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom shelf */}
        <div className="mt-8 h-3 bg-gradient-to-b from-zewail-navy/20 to-transparent rounded-full blur-sm mx-auto w-3/4" />
      </div>
    </section>
  )
}
