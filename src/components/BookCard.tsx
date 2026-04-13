'use client'

import { Book, getBookCoverGradient } from '@/lib/data'
import { useAppStore } from '@/lib/store'
import { BookOpen, Eye } from 'lucide-react'

interface BookCardProps {
  book: Book
  compact?: boolean
  onReadClick?: () => void
}

export default function BookCard({ book, compact = false, onReadClick }: BookCardProps) {
  const { setReadingBookId } = useAppStore()

  const handleRead = () => {
    if (onReadClick) {
      onReadClick()
    } else {
      setReadingBookId(book.id)
    }
  }

  if (compact) {
    return (
      <div
        className="group cursor-pointer flex-shrink-0 w-32 sm:w-36"
        onClick={handleRead}
      >
        {/* Book Cover */}
        <div className={`aspect-[3/4] rounded-lg bg-gradient-to-br ${getBookCoverGradient(book.title)} relative overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1`}>
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-4 right-4 bottom-16 border border-white/30 rounded" />
            <div className="absolute bottom-4 left-4 right-4 h-0.5 bg-white/40" />
          </div>
          {/* Title on cover */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-white">
            <span className="text-[10px] font-medium opacity-70 mb-1 text-center line-clamp-1">{book.author}</span>
            <span className="text-xs font-bold text-center leading-tight line-clamp-3">{book.title}</span>
          </div>
          {/* Read icon overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
        </div>
        <p className="mt-2 text-[11px] text-zewail-navy/60 line-clamp-1 text-center">{book.title}</p>
      </div>
    )
  }

  return (
    <div
      className="group cursor-pointer bg-white rounded-xl border border-zewail-blue/10 overflow-hidden hover:shadow-lg hover:shadow-zewail-blue/5 transition-all duration-300 hover:-translate-y-0.5"
      onClick={handleRead}
    >
      {/* Book Cover */}
      <div className={`aspect-[3/4] bg-gradient-to-br ${getBookCoverGradient(book.title)} relative overflow-hidden`}>
        {/* Decorative lines on cover */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-6 left-5 right-5 bottom-20 border border-white/40 rounded-sm" />
          <div className="absolute bottom-6 left-5 right-5 space-y-1.5">
            <div className="h-px bg-white/50" />
            <div className="h-px bg-white/30 w-3/4" />
            <div className="h-px bg-white/30 w-1/2" />
          </div>
        </div>
        {/* Title on cover */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-white">
          <span className="text-xs font-medium opacity-60 mb-2 text-center line-clamp-1">{book.author}</span>
          <span className="text-sm font-bold text-center leading-snug line-clamp-4">{book.title}</span>
          <span className="mt-3 text-[10px] opacity-50">{book.year}</span>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-zewail-navy text-sm font-medium">
            <Eye className="h-4 w-4" /> Preview
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h4 className="font-semibold text-zewail-navy text-sm line-clamp-1 group-hover:text-zewail-accent transition-colors">
          {book.title}
        </h4>
        <p className="text-xs text-zewail-navy/50 mt-1">{book.author}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-[10px] text-zewail-navy/40 bg-zewail-blue/5 px-2 py-1 rounded-full">{book.genre}</span>
          <span className="text-[10px] text-zewail-navy/40 flex items-center gap-1">
            <BookOpen className="h-3 w-3" /> {book.readCount.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}
