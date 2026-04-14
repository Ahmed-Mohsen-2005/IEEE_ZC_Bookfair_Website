'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Book, getBookCoverGradient } from '@/lib/data'
import { useAppStore } from '@/lib/store'
import { BookOpen, Eye, Star, Users } from 'lucide-react'

interface BookCardProps {
  book: Book
  compact?: boolean
  onReadClick?: () => void
}

export default function BookCard({ book, compact = false, onReadClick }: BookCardProps) {
  const { setReadingBookId, language } = useAppStore()
  const [hovered, setHovered] = useState(false)
  const isAr = language === 'ar'

  const handleRead = () => {
    if (onReadClick) onReadClick()
    else setReadingBookId(book.id)
  }

  const gradient = getBookCoverGradient(book.title)
  // Pseudo-random star rating from readCount
  const stars = (((book.readCount % 5) + 12) / 4).toFixed(1)

  if (compact) {
    return (
      <div className="group cursor-pointer flex-shrink-0 w-32 sm:w-36" onClick={handleRead}>
        <div className={`aspect-[3/4] rounded-lg bg-gradient-to-br ${gradient} relative overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1.5`}
          style={{ boxShadow: hovered ? `0 16px 40px rgba(0,180,209,0.25), -4px 0 0 rgba(0,0,0,0.25)` : undefined }}
          onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          {/* Spine */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-white">
            <span className="text-[9px] font-medium opacity-70 mb-1 text-center line-clamp-1">{book.author}</span>
            <span className="text-xs font-bold text-center leading-tight line-clamp-3">{book.title}</span>
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <BookOpen className="h-6 w-6 text-white drop-shadow" />
          </div>
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground line-clamp-1 text-center">{book.title}</p>
      </div>
    )
  }

  return (
    <motion.div
      className="group cursor-pointer"
      style={{ perspective: 800 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleRead}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
    >
      {/* 3D Book Cover */}
      <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
        <motion.div
          animate={{ rotateY: hovered ? -12 : 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{ transformStyle: 'preserve-3d', transformOrigin: 'left center' }}
          className="relative"
        >
          {/* Spine (left face visible when rotated) */}
          <div
            className="absolute left-0 top-0 bottom-0 w-5 origin-left"
            style={{
              transform: 'rotateY(-90deg) translateX(-10px)',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6))',
              width: '20px',
            }}
          />

          {/* Front cover */}
          <div className={`aspect-[3/4] rounded-r-lg bg-gradient-to-br ${gradient} relative overflow-hidden`}
            style={{
              boxShadow: hovered
                ? '-6px 6px 24px rgba(0,0,0,0.35), -2px 0 8px rgba(0,0,0,0.2)'
                : '-3px 3px 12px rgba(0,0,0,0.2)',
            }}>
            {/* Spine shadow */}
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/30 to-transparent" />

            {/* Decorative */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-5 left-6 right-5 bottom-16 border border-white/50 rounded-sm" />
              <div className="absolute bottom-6 left-6 right-5 space-y-1">
                <div className="h-px bg-white/60" />
                <div className="h-px bg-white/40 w-3/4" />
                <div className="h-px bg-white/30 w-1/2" />
              </div>
            </div>

            {/* Cover text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-white z-10">
              <span className="text-[10px] font-medium opacity-60 mb-2 text-center line-clamp-1">{book.author}</span>
              <span className="text-sm font-bold text-center leading-snug line-clamp-4">{book.title}</span>
              <span className="mt-3 text-[10px] opacity-40">{book.year}</span>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 z-20">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-zewail-navy text-xs font-bold shadow-lg">
                <Eye className="h-3.5 w-3.5" />
                {isAr ? 'معاينة' : 'Preview'}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Info panel */}
      <div className="mt-3 px-1">
        <h4 className="font-semibold text-foreground text-sm line-clamp-1 group-hover:text-zewail-blue transition-colors">
          {book.title}
        </h4>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{book.author}</p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full truncate max-w-[80px]">
            {book.genre}
          </span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-[10px] text-muted-foreground">{stars}</span>
          </div>
        </div>

        {/* Read count bar */}
        <div className="mt-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] text-muted-foreground flex items-center gap-0.5">
              <Users className="h-2.5 w-2.5" /> {book.readCount.toLocaleString()}
            </span>
          </div>
          <div className="h-0.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-gradient-to-r from-zewail-blue to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (book.readCount / 100))}%` }} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
