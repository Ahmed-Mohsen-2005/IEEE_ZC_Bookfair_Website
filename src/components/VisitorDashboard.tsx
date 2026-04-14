'use client'

import { useState, useMemo } from 'react'
import { useAppStore } from '@/lib/store'
import { BOOKS, GENRES, LANGUAGES, PUBLISHERS, searchBooks, getBookCoverGradient } from '@/lib/data'
import { motion } from 'framer-motion'
import { Search, Filter, BookOpen, BookmarkPlus, Star, ArrowLeft, X, Home } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import BookCard from '@/components/BookCard'

export default function VisitorDashboard() {
  const { user, navigateTo, searchQuery, setSearchQuery, searchFilters, setSearchFilters, language } = useAppStore()
  const [showFilters, setShowFilters] = useState(false)
  const isAr = language === 'ar'

  const t = {
    back: isAr ? 'الرئيسية' : 'Back to Home',
    welcome: isAr ? `مرحباً بعودتك، ${user?.name || 'القارئ'}` : `Welcome back, ${user?.name || 'Reader'}`,
    subtitle: isAr ? 'مساحتك الشخصية للاكتشاف والقراءة' : 'Your personal discovery space',
    myShelf: isAr ? 'رفّ كتبي الافتراضي' : 'My Virtual Shelf',
    read: isAr ? 'كتب قرأتها' : "Books I've Read",
    wantToRead: isAr ? 'أريد القراءة' : 'Want to Read',
    search: isAr ? 'البحث الرقمي الشامل' : 'Global Digital Search',
    searchPlaceholder: isAr
      ? 'ابحث عبر كل الناشرين — عناوين، مؤلفون، أوصاف...'
      : 'Search across all publishers — titles, authors, descriptions...',
    results: (n: number) => isAr ? `تم العثور على ${n} نتيجة` : `${n} result${n !== 1 ? 's' : ''} found`,
    noResults: isAr ? 'لا توجد كتب تطابق معايير البحث' : 'No books found matching your criteria',
    recommended: isAr ? 'موصى به لك' : 'Recommended for You',
    recDesc: isAr
      ? `بناءً على سجل قراءتك — قرأت ${BOOKS[0]?.genre} من ${BOOKS[0]?.publisherName}، ربما يعجبك هذا:`
      : `Based on your reading history — you read ${BOOKS[0]?.genre} from ${BOOKS[0]?.publisherName}, you might like these:`,
    genre: isAr ? 'النوع' : 'Genre',
    lang: isAr ? 'اللغة' : 'Language',
    year: isAr ? 'السنة' : 'Year',
    publisher: isAr ? 'الناشر' : 'Publisher',
    allGenres: isAr ? 'كل الأنواع' : 'All Genres',
    allLangs: isAr ? 'كل اللغات' : 'All Languages',
    allYears: isAr ? 'كل السنوات' : 'All Years',
    allPublishers: isAr ? 'كل الناشرين' : 'All Publishers',
  }

  const readList = BOOKS.slice(0, 3)
  const wantToReadList = BOOKS.slice(4, 8)
  const results = useMemo(() => searchBooks(searchQuery, {
    genre: searchFilters.genre, language: searchFilters.language,
    year: searchFilters.year, publisher: searchFilters.publisher,
  }), [searchQuery, searchFilters])
  const recommendations = useMemo(() => {
    const readGenres = readList.map(b => b.genre)
    return BOOKS.filter(b => !readList.some(rb => rb.id === b.id) && readGenres.includes(b.genre)).slice(0, 4)
  }, [])

  return (
    <div className="min-h-screen bg-background" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8">
          <div>
            <Button variant="ghost" size="sm" onClick={() => navigateTo('home')}
              className="text-muted-foreground hover:text-foreground mb-2 flex items-center gap-1">
              {isAr ? <ArrowLeft className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
              {t.back}
            </Button>
            <h1 className="text-3xl font-bold text-foreground">{t.welcome}</h1>
            <p className="text-muted-foreground mt-1">{t.subtitle}</p>
          </div>
        </motion.div>

        {/* My Virtual Shelf */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-zewail-blue" /> {t.myShelf}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: t.read,       icon: <Star className="h-4 w-4 text-amber-500" />,        books: readList },
              { label: t.wantToRead, icon: <BookmarkPlus className="h-4 w-4 text-zewail-blue" />, books: wantToReadList },
            ].map(shelf => (
              <div key={shelf.label} className="bg-card rounded-2xl border border-border p-6 hover:shadow-md transition-shadow">
                <h3 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
                  {shelf.icon} {shelf.label}
                </h3>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {shelf.books.map(book => <BookCard key={book.id} book={book} compact />)}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Global Digital Search */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Search className="h-5 w-5 text-zewail-blue" /> {t.search}
          </h2>

          {/* Search input */}
          <div className="relative mb-4">
            <Search className="absolute top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground start-4" />
            <Input
              placeholder={t.searchPlaceholder}
              className="px-12 py-6 text-base rounded-2xl border-border bg-card text-foreground placeholder:text-muted-foreground focus-visible:border-zewail-blue"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <div className="absolute top-1/2 -translate-y-1/2 flex gap-1 end-2">
              {searchQuery && (
                <Button variant="ghost" size="sm" onClick={() => setSearchQuery('')}>
                  <X className="h-4 w-4 text-muted-foreground" />
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 p-4 bg-card rounded-xl border border-border">
              <Select value={searchFilters.genre || 'all'} onValueChange={v => setSearchFilters({ genre: v === 'all' ? '' : v })}>
                <SelectTrigger className="rounded-lg bg-background border-border text-foreground"><SelectValue placeholder={t.genre} /></SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all">{t.allGenres}</SelectItem>
                  {GENRES.slice(1).map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={searchFilters.language || 'all'} onValueChange={v => setSearchFilters({ language: v === 'all' ? '' : v })}>
                <SelectTrigger className="rounded-lg bg-background border-border text-foreground"><SelectValue placeholder={t.lang} /></SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all">{t.allLangs}</SelectItem>
                  {LANGUAGES.slice(1).map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={searchFilters.year || 'all'} onValueChange={v => setSearchFilters({ year: v === 'all' ? '' : v })}>
                <SelectTrigger className="rounded-lg bg-background border-border text-foreground"><SelectValue placeholder={t.year} /></SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all">{t.allYears}</SelectItem>
                  {['2024','2023','2022','2021','2020'].map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={searchFilters.publisher || 'all'} onValueChange={v => setSearchFilters({ publisher: v === 'all' ? '' : v })}>
                <SelectTrigger className="rounded-lg bg-background border-border text-foreground"><SelectValue placeholder={t.publisher} /></SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="all">{t.allPublishers}</SelectItem>
                  {PUBLISHERS.map(p => <SelectItem key={p.id} value={p.id}>{isAr ? p.nameAr : p.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </motion.div>
          )}

          {searchQuery && (
            <div>
              <p className="text-sm text-muted-foreground mb-4">{t.results(results.length)}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {results.map(book => <BookCard key={book.id} book={book} />)}
              </div>
              {results.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">{t.noResults}</p>
                </div>
              )}
            </div>
          )}
        </motion.section>

        {/* Recommendations */}
        {!searchQuery && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500" /> {t.recommended}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">{t.recDesc}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {recommendations.map(book => <BookCard key={book.id} book={book} />)}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}
