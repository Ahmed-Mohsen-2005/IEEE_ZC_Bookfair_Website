'use client'

import { useState, useMemo } from 'react'
import { useAppStore } from '@/lib/store'
import { BOOKS, GENRES, LANGUAGES, PUBLISHERS, searchBooks, getBookCoverGradient } from '@/lib/data'
import { motion } from 'framer-motion'
import { Search, Filter, BookOpen, BookmarkPlus, Star, ArrowLeft, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import BookCard from '@/components/BookCard'

export default function VisitorDashboard() {
  const { user, navigateTo, searchQuery, setSearchQuery, searchFilters, setSearchFilters } = useAppStore()
  const [showFilters, setShowFilters] = useState(false)

  // Demo user book lists
  const readList = BOOKS.slice(0, 3)
  const wantToReadList = BOOKS.slice(4, 8)

  // Search results
  const results = useMemo(() => {
    return searchBooks(searchQuery, {
      genre: searchFilters.genre,
      language: searchFilters.language,
      year: searchFilters.year,
      publisher: searchFilters.publisher,
    })
  }, [searchQuery, searchFilters])

  // Recommendations based on read books
  const recommendations = useMemo(() => {
    const readGenres = readList.map(b => b.genre)
    return BOOKS.filter(b => 
      !readList.some(rb => rb.id === b.id) && 
      readGenres.includes(b.genre) &&
      b.publisherId !== readList[0]?.publisherId
    ).slice(0, 4)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/30 to-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateTo('home')}
              className="text-zewail-navy/50 hover:text-zewail-navy mb-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
            </Button>
            <h1 className="text-3xl font-bold text-zewail-navy">
              Welcome back, {user?.name || 'Reader'}
            </h1>
            <p className="text-zewail-navy/50 mt-1">Your personal discovery space</p>
          </div>
        </motion.div>

        {/* My Virtual Shelf */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold text-zewail-navy mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-zewail-blue" /> My Virtual Shelf
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Read List */}
            <div className="bg-white rounded-2xl border border-zewail-blue/10 p-6">
              <h3 className="text-sm font-medium text-zewail-navy/60 mb-4 flex items-center gap-2">
                <Star className="h-4 w-4 text-amber-500" /> Books I&apos;ve Read
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {readList.map(book => (
                  <BookCard key={book.id} book={book} compact />
                ))}
              </div>
            </div>

            {/* Want to Read */}
            <div className="bg-white rounded-2xl border border-zewail-blue/10 p-6">
              <h3 className="text-sm font-medium text-zewail-navy/60 mb-4 flex items-center gap-2">
                <BookmarkPlus className="h-4 w-4 text-zewail-blue" /> Want to Read
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {wantToReadList.map(book => (
                  <BookCard key={book.id} book={book} compact />
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Global Digital Search */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold text-zewail-navy mb-4 flex items-center gap-2">
            <Search className="h-5 w-5 text-zewail-blue" /> Global Digital Search
          </h2>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zewail-navy/30" />
            <Input
              placeholder="Search across all publishers — titles, authors, descriptions..."
              className="pl-12 pr-12 py-6 text-base rounded-2xl border-zewail-blue/20 focus:border-zewail-blue/40 bg-white shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 text-zewail-navy/50" />
            </Button>
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-10 top-1/2 -translate-y-1/2"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4 text-zewail-navy/50" />
              </Button>
            )}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 p-4 bg-white rounded-xl border border-zewail-blue/10"
            >
              <Select value={searchFilters.genre || 'All Genres'} onValueChange={(v) => setSearchFilters({ genre: v })}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  {GENRES.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select value={searchFilters.language || 'All Languages'} onValueChange={(v) => setSearchFilters({ language: v })}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select value={searchFilters.year || 'all'} onValueChange={(v) => setSearchFilters({ year: v === 'all' ? '' : v })}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                </SelectContent>
              </Select>

              <Select value={searchFilters.publisher || 'all'} onValueChange={(v) => setSearchFilters({ publisher: v === 'all' ? '' : v })}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Publisher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Publishers</SelectItem>
                  {PUBLISHERS.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </motion.div>
          )}

          {/* Search Results */}
          {searchQuery && (
            <div>
              <p className="text-sm text-zewail-navy/50 mb-4">
                {results.length} result{results.length !== 1 ? 's' : ''} found
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {results.map(book => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
              {results.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-zewail-navy/30 text-lg">No books found matching your criteria</p>
                </div>
              )}
            </div>
          )}
        </motion.section>

        {/* Recommendations */}
        {!searchQuery && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-zewail-navy mb-2 flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500" /> Recommended for You
            </h2>
            <p className="text-sm text-zewail-navy/40 mb-6">
              Based on your reading history — you read {readList[0]?.genre} from {readList[0]?.publisherName}, you might like these:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {recommendations.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}
