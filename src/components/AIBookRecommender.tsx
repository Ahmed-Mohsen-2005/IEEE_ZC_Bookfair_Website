'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { BOOKS, GENRES } from '@/lib/data'
import { BrainCircuit, Sparkles, BookOpen, RefreshCw, ChevronRight, Star } from 'lucide-react'

// ----- Simple client-side AI recommendation engine -----
function scoreBook(book: typeof BOOKS[0], prefGenre: string, prefLang: string, prefEra: 'classic' | 'modern' | 'any') {
  let score = 0
  if (prefGenre && book.genre.toLowerCase().includes(prefGenre.toLowerCase())) score += 40
  if (prefLang && book.language.toLowerCase() === prefLang.toLowerCase()) score += 20
  if (prefEra === 'classic' && book.year < 2000) score += 20
  if (prefEra === 'modern' && book.year >= 2010) score += 20
  score += Math.min(30, book.readCount / 500) // popularity boost
  return score
}

function getRecommendations(genre: string, lang: string, era: 'classic' | 'modern' | 'any') {
  return [...BOOKS]
    .map(b => ({ ...b, score: scoreBook(b, genre, lang, era) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
}

const SUGGESTION_CHIPS_EN = ['Science & History', 'Arabic Poetry', 'Political Science', 'Modern Novels', 'Academic Texts']
const SUGGESTION_CHIPS_AR = ['العلوم والتاريخ', 'الشعر العربي', 'العلوم السياسية', 'الروايات الحديثة', 'النصوص الأكاديمية']

export default function AIBookRecommender() {
  const { setReadingBookId, language } = useAppStore()
  const isAr = language === 'ar'

  const [genre, setGenre] = useState('')
  const [lang, setLang] = useState('')
  const [era, setEra] = useState<'classic' | 'modern' | 'any'>('any')
  const [results, setResults] = useState<ReturnType<typeof getRecommendations>>([])
  const [loading, setLoading] = useState(false)
  const [asked, setAsked] = useState(false)

  const t = {
    eyebrow: isAr ? 'تقنية الذكاء الاصطناعي' : 'AI-Powered',
    title: isAr ? 'مُوصي الكتب الذكي' : 'AI Book Recommender',
    subtitle: isAr
      ? 'أخبرنا بتفضيلاتك وسيختار نظامنا أفضل الكتب لك من المعرض.'
      : 'Tell us your reading preferences and our AI engine will handpick the best titles from the fair.',
    genreLabel: isAr ? 'النوع الأدبي' : 'Genre Interest',
    langLabel: isAr ? 'اللغة المفضلة' : 'Preferred Language',
    eraLabel: isAr ? 'الحقبة الزمنية' : 'Era Preference',
    eras: {
      any: isAr ? 'أي حقبة' : 'Any Era',
      classic: isAr ? 'كلاسيكي (قبل ٢٠٠٠)' : 'Classic (Pre-2000)',
      modern: isAr ? 'حديث (٢٠١٠+)' : 'Modern (2010+)',
    },
    recommend: isAr ? 'احصل على توصيات' : 'Get Recommendations',
    thinking: isAr ? 'يحلل الذكاء الاصطناعي...' : 'AI is thinking...',
    resultsTitle: isAr ? 'كتبك المُوصى بها' : 'Your AI Picks',
    readNow: isAr ? 'اقرأ الآن' : 'Preview',
    reset: isAr ? 'إعادة البحث' : 'New Search',
    chips: isAr ? SUGGESTION_CHIPS_AR : SUGGESTION_CHIPS_EN,
    chipsLabel: isAr ? 'اقتراحات سريعة:' : 'Quick suggestions:',
    allLangs: isAr ? 'كل اللغات' : 'All Languages',
    allGenres: isAr ? 'كل الأنواع' : 'All Genres',
    readers: isAr ? 'قارئ' : 'readers',
  }

  const run = useCallback(() => {
    setLoading(true)
    // Simulate AI processing delay
    setTimeout(() => {
      setResults(getRecommendations(genre, lang, era))
      setLoading(false)
      setAsked(true)
    }, 1200)
  }, [genre, lang, era])

  const reset = () => { setResults([]); setAsked(false); setGenre(''); setLang(''); setEra('any') }

  const applyChip = (chip: string) => {
    // Map chip to genre loosely
    const en = SUGGESTION_CHIPS_EN[SUGGESTION_CHIPS_AR.indexOf(chip)] || chip
    setGenre(en.split(' ')[0])
    run()
  }

  const selectCls = `h-10 px-3 rounded-xl border border-border bg-card text-foreground text-sm w-full focus:outline-none focus:border-zewail-blue cursor-pointer ${isAr ? 'text-right' : ''}`

  return (
    <section className="py-20 px-6 relative overflow-hidden bg-background" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 blueprint-grid opacity-[0.03]" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/25 bg-purple-500/8 mb-5">
            <BrainCircuit className="w-3.5 h-3.5 text-purple-500" />
            <span className="text-xs font-bold tracking-widest text-purple-500 uppercase">{t.eyebrow}</span>
          </div>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-foreground mb-4">
            {t.title}
          </motion.h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">{t.subtitle}</p>
        </div>

        <AnimatePresence mode="wait">
          {!asked ? (
            <motion.div key="form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              className="bg-card border border-border rounded-3xl p-8 shadow-xl shadow-purple-500/5">
              {/* Quick chip suggestions */}
              <div className="mb-6">
                <p className="text-xs text-muted-foreground font-semibold mb-3">{t.chipsLabel}</p>
                <div className="flex flex-wrap gap-2">
                  {t.chips.map((chip) => (
                    <button key={chip} onClick={() => applyChip(chip)}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold border border-border bg-muted hover:border-purple-500/50 hover:text-purple-500 transition-colors">
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">{t.genreLabel}</label>
                  <select value={genre} onChange={e => setGenre(e.target.value)} className={selectCls} dir={isAr ? 'rtl' : 'ltr'}>
                    <option value="">{t.allGenres}</option>
                    {GENRES.slice(1).map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">{t.langLabel}</label>
                  <select value={lang} onChange={e => setLang(e.target.value)} className={selectCls} dir={isAr ? 'rtl' : 'ltr'}>
                    <option value="">{t.allLangs}</option>
                    <option value="Arabic">{isAr ? 'عربية' : 'Arabic'}</option>
                    <option value="English">{isAr ? 'إنجليزية' : 'English'}</option>
                    <option value="Multilingual">{isAr ? 'متعددة' : 'Multilingual'}</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">{t.eraLabel}</label>
                  <select value={era} onChange={e => setEra(e.target.value as 'classic' | 'modern' | 'any')} className={selectCls} dir={isAr ? 'rtl' : 'ltr'}>
                    <option value="any">{t.eras.any}</option>
                    <option value="classic">{t.eras.classic}</option>
                    <option value="modern">{t.eras.modern}</option>
                  </select>
                </div>
              </div>

              <button onClick={run} disabled={loading}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20">
                {loading ? (
                  <><RefreshCw className="w-4 h-4 animate-spin" /> {t.thinking}</>
                ) : (
                  <><Sparkles className="w-4 h-4" /> {t.recommend}</>
                )}
              </button>
            </motion.div>
          ) : (
            <motion.div key="results" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {/* Results header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <h3 className="font-bold text-foreground">{t.resultsTitle}</h3>
                </div>
                <button onClick={reset}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <RefreshCw className="w-4 h-4" /> {t.reset}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.map((book, i) => (
                  <motion.div key={book.id}
                    initial={{ opacity: 0, x: isAr ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                    className="bg-card border border-border rounded-2xl p-4 flex gap-4 hover:shadow-lg hover:border-purple-500/20 transition-all"
                  >
                    {/* Mini cover */}
                    <div className="w-14 h-20 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-700 shrink-0 flex items-center justify-center shadow-md">
                      <BookOpen className="w-6 h-6 text-white/60" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 mb-1">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} className={`w-3 h-3 ${s <= 4 ? 'fill-amber-400 text-amber-400' : 'text-muted'}`} />
                        ))}
                      </div>
                      <h4 className="font-bold text-foreground text-sm line-clamp-2 mb-0.5">{book.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{book.author}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground">{book.readCount.toLocaleString()} {t.readers}</span>
                        <button onClick={() => setReadingBookId(book.id)}
                          className="flex items-center gap-1 text-xs font-semibold text-purple-500 hover:text-purple-400 transition-colors">
                          {t.readNow} <ChevronRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
