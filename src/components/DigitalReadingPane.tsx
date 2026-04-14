'use client'

import { useAppStore } from '@/lib/store'
import { BOOKS } from '@/lib/data'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X, ChevronLeft, ChevronRight, List, BookOpen, ZoomIn, ZoomOut } from 'lucide-react'
import { useState } from 'react'

export default function DigitalReadingPane() {
  const { readingBookId, setReadingBookId } = useAppStore()
  const [currentPage, setCurrentPage] = useState(1)
  const [zoom, setZoom] = useState(100)
  const [showToc, setShowToc] = useState(false)

  const book = readingBookId ? BOOKS.find(b => b.id === readingBookId) : null

  if (!book) return null

  const totalPages = 42 // Demo total

  const tocItems = [
    { title: 'Cover', page: 1 },
    { title: 'Table of Contents', page: 3 },
    { title: 'Preface', page: 5 },
    { title: 'Chapter 1: Introduction', page: 8 },
    { title: 'Chapter 2: Historical Context', page: 15 },
    { title: 'Chapter 3: Analysis & Discussion', page: 22 },
    { title: 'Chapter 4: Findings', page: 30 },
    { title: 'Conclusion', page: 38 },
    { title: 'References', page: 40 },
  ]

  return (
    <Dialog open={!!readingBookId} onOpenChange={() => setReadingBookId(null)}>
      <DialogContent className="max-w-5xl h-[85vh] p-0 gap-0 overflow-hidden bg-zewail-navy">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-zewail-navy border-b border-white/10">
          <div className="flex items-center gap-3">
            <BookOpen className="h-4 w-4 text-zewail-blue" />
            <span className="text-sm text-white font-medium truncate max-w-md">{book.title}</span>
            <span className="text-xs text-white/40">by {book.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10 h-8" onClick={() => setShowToc(!showToc)}>
              <List className="h-4 w-4 mr-1" /> TOC
            </Button>
            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10 h-8" onClick={() => setZoom(Math.max(50, zoom - 10))}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-xs text-white/40 min-w-[40px] text-center">{zoom}%</span>
            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10 h-8" onClick={() => setZoom(Math.min(200, zoom + 10))}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10 h-8" onClick={() => setReadingBookId(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden" style={{ height: 'calc(85vh - 48px - 44px)' }}>
          {/* Table of Contents Sidebar */}
          {showToc && (
            <div className="w-64 bg-zewail-navy-light border-r border-white/10 overflow-y-auto flex-shrink-0">
              <div className="p-4">
                <h3 className="text-sm font-semibold text-white/80 mb-3">Table of Contents</h3>
                <div className="space-y-1">
                  {tocItems.map((item) => (
                    <button
                      key={item.page}
                      onClick={() => { setCurrentPage(item.page); setShowToc(false) }}
                      className="w-full text-left px-3 py-2 text-xs text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center justify-between"
                    >
                      <span>{item.title}</span>
                      <span className="text-white/30">{item.page}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Page Viewer */}
          <div className="flex-1 overflow-auto flex items-center justify-center bg-zewail-navy/50">
            <div
              className="bg-white shadow-2xl transition-transform duration-200"
              style={{
                width: `${zoom * 4.8}px`,
                minHeight: `${zoom * 6.8}px`,
                transform: `scale(${zoom / 100})`,
              }}
            >
              <div className="p-12 max-w-2xl mx-auto">
                {currentPage === 1 ? (
                  <>
                    <div className="text-center mb-8">
                      <div className="text-6xl font-bold text-zewail-navy/10 mb-4">{book.title.charAt(0)}</div>
                      <h1 className="text-2xl font-bold text-zewail-navy mb-2">{book.title}</h1>
                      <p className="text-zewail-navy/50">{book.author}</p>
                      <p className="text-xs text-zewail-navy/30 mt-2">{book.publisherName} • {book.year}</p>
                    </div>
                    <div className="h-px bg-zewail-navy/10 my-6" />
                    <p className="text-sm text-zewail-navy/40 text-center italic">&ldquo;{book.description}&rdquo;</p>
                  </>
                ) : (
                  <>
                    <div className="text-xs text-zewail-navy/30 mb-8">{book.title} — Page {currentPage}</div>
                    <div className="space-y-4 text-sm text-zewail-navy/70 leading-relaxed">
                      <p>
                        This is a demonstration of the digital reading pane for &ldquo;{book.title}&rdquo; by {book.author}. 
                        In a production environment, this area would render the actual PDF or EPUB content using a dedicated document viewer.
                      </p>
                      <p>
                        The content displayed here represents the {book.genre} genre, published by {book.publisherName} in {book.year}. 
                        This work is available in {book.language} and has been read by {book.readCount.toLocaleString()} visitors to the Zewail Digital Knowledge Hubs.
                      </p>
                      <p>
                        The Zewail Knowledge Hubs, powered by IEEE Zewail City, brings together Egypt&apos;s most prestigious publishers 
                        under one virtual roof. This platform honors the legacy of Dr. Ahmed Zewail, Nobel Laureate and pioneer of femtochemistry, 
                        whose dedication to the pursuit of knowledge continues to inspire generations of scholars and readers.
                      </p>
                      <p>
                        Navigate between pages using the controls below, or open the table of contents to jump to a specific chapter. 
                        Use the zoom controls to adjust the text size for comfortable reading.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-zewail-navy border-t border-white/10">
          <span className="text-xs text-white/40">
            Powered by IEEE Zewail City
          </span>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost" size="sm"
              className="text-white/60 hover:text-white hover:bg-white/10 h-8"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <span className="text-xs text-white/60">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="ghost" size="sm"
              className="text-white/60 hover:text-white hover:bg-white/10 h-8"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
