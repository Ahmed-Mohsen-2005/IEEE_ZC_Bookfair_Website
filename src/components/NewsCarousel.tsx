'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Calendar, User, ArrowRight, BookOpen } from 'lucide-react'
import { useAppStore } from '@/lib/store'

export default function NewsCarousel() {
  const { language } = useAppStore()
  const isAr = language === 'ar'
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const t = {
    title: isAr ? 'أحدث الأخبار والتحديثات' : 'Latest News & Updates',
    desc: isAr
      ? 'ابقَ على اطلاع بآخر المستجدات في مجال النشر والأدب والابتكار الرقمي.'
      : 'Stay informed about the latest developments in publishing, literature, and digital innovation.',
    moreStories: isAr ? 'مزيد من القصص' : 'More Stories',
    readFull: isAr ? 'اقرأ القصة كاملة' : 'Read Full Story',
    categories: {
      'Awards': isAr ? 'جوائز' : 'Awards',
      'Innovation': isAr ? 'ابتكار' : 'Innovation',
      'Events': isAr ? 'فعاليات' : 'Events',
      'Technology': isAr ? 'تكنولوجيا' : 'Technology',
    }
  }

  const news = [
    {
      id: 1,
      title: isAr ? 'حفل جوائز الكتّاب المصريين يحتفي بالتميز الأدبي' : 'Egyptian Writers Award Ceremony Celebrates Literary Excellence',
      excerpt: isAr
        ? 'تستضيف مدينة زويل الحفل السنوي لجوائز الكتّاب المصريين، إحياءً لأبرز أعمال الأدب المعاصر والمنشورات البحثية.'
        : 'Zewail City hosts the annual Egyptian Writers Award, honoring the best contemporary literature and research publications.',
      date: '2025-11-12',
      author: isAr ? 'د. أحمد سيد' : 'Dr. Ahmed Sayed',
      color: 'from-zewail-blue to-cyan-500',
      category: 'Awards',
    },
    {
      id: 2,
      title: isAr ? 'معايير النشر الرقمي الجديدة تنطلق عبر مصر' : 'New Digital Publishing Standards Launched Across Egypt',
      excerpt: isAr
        ? 'مبادرة رائدة لتوحيد صيغ النشر الرقمي عبر دور النشر المصرية، لجعل المحتوى أكثر سهولة في الوصول.'
        : 'A groundbreaking initiative to standardize digital publishing formats across all Egyptian publishers, making content more accessible.',
      date: '2025-10-28',
      author: isAr ? 'لجنة النشر' : 'Publishing Committee',
      color: 'from-cyan-500 to-teal-500',
      category: 'Innovation',
    },
    {
      id: 3,
      title: isAr ? 'مؤتمر الكتّاب الشباب يجذب مشاركة دولية واسعة' : 'Young Authors Conference Attracts International Participation',
      excerpt: isAr
        ? 'أكثر من 500 كاتب شاب من 30 دولة يجتمعون لتبادل الأفكار والتعلم من كبار الكتّاب وخبراء الصناعة.'
        : 'Over 500 young writers from 30 countries gather to share ideas and learn from established authors and industry experts.',
      date: '2025-09-15',
      author: isAr ? 'سارة محمد' : 'Sarah Mohamed',
      color: 'from-teal-500 to-emerald-500',
      category: 'Events',
    },
    {
      id: 4,
      title: isAr ? 'توصيات القراءة بالذكاء الاصطناعي تُحدث نقلة في تجربة المستخدم' : 'AI-Powered Reading Recommendations Transform User Experience',
      excerpt: isAr
        ? 'خوارزميات التعلم الآلي المتطورة تُقدم الآن توصيات مخصصة بالكتب بناءً على أنماط القراءة والتفضيلات.'
        : 'Advanced machine learning algorithms now provide personalized book recommendations based on reading patterns and preferences.',
      date: '2025-08-22',
      author: isAr ? 'فريق التكنولوجيا' : 'Tech Team',
      color: 'from-emerald-500 to-green-400',
      category: 'Technology',
    },
  ]

  useEffect(() => {
    if (!autoplay) return
    const timer = setInterval(() => setCurrentIndex(p => (p + 1) % news.length), 6000)
    return () => clearInterval(timer)
  }, [autoplay, news.length])

  const cur = news[currentIndex]
  const prev = () => { setCurrentIndex(p => (p - 1 + news.length) % news.length); setAutoplay(false) }
  const next = () => { setCurrentIndex(p => (p + 1) % news.length); setAutoplay(false) }

  return (
    <section className="section-premium relative overflow-hidden bg-background">
      <div className="absolute inset-0 blueprint-grid" />
      {/* Rotating rings */}
      <div className="absolute pointer-events-none inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -right-40 w-96 h-96 border border-zewail-blue/8 dark:border-zewail-blue/15 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-40 -left-40 w-96 h-96 border border-zewail-blue/5 dark:border-zewail-blue/10 rounded-full"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zewail-blue/25 bg-zewail-blue/8 dark:bg-zewail-blue/15 mb-4">
            <BookOpen className="w-3.5 h-3.5 text-zewail-blue" />
            <span className="text-xs font-bold text-zewail-blue uppercase tracking-wider">
              {isAr ? 'المجتمع الأكاديمي' : 'Academic Community'}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">{t.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.desc}</p>
        </motion.div>

        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch ${isAr ? 'direction-rtl' : ''}`}>
          {/* Featured story */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 relative group"
          >
            <div className="relative bg-card border border-border rounded-3xl overflow-hidden h-full flex flex-col p-8 md:p-10
              hover:shadow-xl hover:shadow-zewail-blue/8 hover:border-zewail-blue/25 transition-all duration-300">
              <div className={`absolute top-0 right-0 w-72 h-72 bg-gradient-to-br ${cur.color} opacity-5 blur-3xl rounded-full -z-10`} />

              <div className={`flex items-center ${isAr ? 'flex-row-reverse' : ''} justify-between mb-6`}>
                <span className="px-3 py-1 rounded-full bg-zewail-blue/10 dark:bg-zewail-blue/20 border border-zewail-blue/25">
                  <span className="text-xs font-bold text-zewail-blue uppercase tracking-wider">
                    {t.categories[cur.category as keyof typeof t.categories]}
                  </span>
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1"
                >
                  <h3 className={`text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight ${isAr ? 'text-right' : ''}`}>
                    {cur.title}
                  </h3>
                  <p className={`text-muted-foreground leading-relaxed ${isAr ? 'text-right' : ''}`}>{cur.excerpt}</p>
                </motion.div>
              </AnimatePresence>

              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 mt-6 border-t border-border ${isAr ? 'sm:flex-row-reverse' : ''}`}>
                <div className={`flex gap-4 text-sm text-muted-foreground ${isAr ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-1.5 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <Calendar className="w-4 h-4 text-zewail-blue shrink-0" />
                    {new Date(cur.date).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <div className={`flex items-center gap-1.5 ${isAr ? 'flex-row-reverse' : ''}`}>
                    <User className="w-4 h-4 text-zewail-blue shrink-0" />
                    {cur.author}
                  </div>
                </div>
                <button className={`inline-flex items-center gap-2 text-zewail-blue font-semibold hover:gap-3 transition-all ${isAr ? 'flex-row-reverse' : ''}`}>
                  {t.readFull} <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* News list */}
          <div className="flex flex-col gap-4">
            <h3 className={`text-lg font-bold text-foreground mb-1 ${isAr ? 'text-right' : ''}`}>{t.moreStories}</h3>
            <div className="space-y-3 flex-1">
              {news.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => { setCurrentIndex(index); setAutoplay(false) }}
                  initial={{ opacity: 0, x: isAr ? -16 : 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-${isAr ? 'right' : 'left'} ${
                    index === currentIndex
                      ? 'border-zewail-blue bg-zewail-blue/8 dark:bg-zewail-blue/15'
                      : 'border-border bg-card hover:border-zewail-blue/30 hover:bg-muted/50'
                  }`}
                >
                  <p className="text-sm font-semibold text-foreground line-clamp-2 mb-1">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.categories[item.category as keyof typeof t.categories]}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className={`flex items-center justify-center gap-4 mt-10 ${isAr ? 'flex-row-reverse' : ''}`}>
          <button onClick={isAr ? next : prev} className="p-3 rounded-full border border-border bg-card hover:bg-zewail-blue hover:border-zewail-blue hover:text-white text-zewail-blue transition-all duration-300">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {news.map((_, i) => (
              <button key={i} onClick={() => { setCurrentIndex(i); setAutoplay(false) }}
                className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-zewail-blue w-7' : 'bg-border w-2 hover:bg-zewail-blue/40'}`}
              />
            ))}
          </div>
          <button onClick={isAr ? prev : next} className="p-3 rounded-full border border-border bg-card hover:bg-zewail-blue hover:border-zewail-blue hover:text-white text-zewail-blue transition-all duration-300">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
