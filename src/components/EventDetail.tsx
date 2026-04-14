'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { EVENTS } from '@/lib/data'
import { Calendar, Clock, Mic, ArrowLeft, Users, Monitor, Presentation, CheckCircle, Share2, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const TYPE_ICONS = {
  workshop: <Monitor className="h-4 w-4" />,
  panel:    <Presentation className="h-4 w-4" />,
  talk:     <Mic className="h-4 w-4" />,
}

export default function EventDetail() {
  const { currentEventId, navigateTo, setNavigationTarget, isAuthenticated, setAuthModalTab, setAuthModalOpen, language } = useAppStore()
  const isAr = language === 'ar'

  const t = {
    notFound:     isAr ? 'الفعالية غير موجودة' : 'Event Not Found',
    returnHome:   isAr ? 'العودة للرئيسية'      : 'Return Home',
    backCalendar: isAr ? 'العودة للتقويم'        : 'Back to Calendar',
    regOpen:      isAr ? 'التسجيل مفتوح'         : 'Registration Open',
    aboutSession: isAr ? 'عن هذه الجلسة'         : 'About this Session',
    sessionDesc1: isAr
      ? 'انضم إلينا في استكشاف أكاديمي حصري يتماشى مع رؤية مدينة زويل. تركز هذه الجلسة على ربط المنهجيات المعاصرة بمنظومات المعرفة الأساسية.'
      : 'Join us for an exclusive academic exploration deeply aligned with the Zewail City ethos. This session focuses on bridging contemporary methodologies with foundational knowledge schemas.',
    sessionDesc2: isAr
      ? 'سيكتسب المشاركون رؤى هيكلية حول نماذج الأدب المتقدمة، ويشاركون في جلسة أسئلة وأجوبة مع علماء راسخين، ويصلون إلى مواد المستودع الحصرية فور انتهاء البث.'
      : 'Participants will gain structural insights into advanced literature paradigms, engage in Q&A with established scholars, and access exclusive repository materials immediately following the broadcast.',
    dateLabel:    isAr ? 'التاريخ'       : 'Date',
    timeLabel:    isAr ? 'الوقت'         : 'Time',
    formatLabel:  isAr ? 'الصيغة'        : 'Format',
    formatVal:    isAr ? 'جلسة افتراضية حية' : 'Live Virtual Session',
    capLabel:     isAr ? 'الطاقة الاستيعابية' : 'Capacity',
    capVal:       isAr ? 'غير محدودة'    : 'Unlimited',
    statusLabel:  isAr ? 'الحالة'        : 'Status',
    available:    isAr ? 'متاح'          : 'Available',
    loginToReg:   isAr ? 'سجّل الدخول للتسجيل' : 'Login to Register',
    loginNote:    isAr
      ? 'يلزم وجود بيانات اعتماد مدينة زويل للوصول إلى البث التفاعلي.'
      : 'A Zewail City active credential is required to access the interactive broadcast.',
    secureSpot:   isAr ? 'احجز مكانك'   : 'Secure Your Spot',
    shareEvent:   isAr ? 'شارك الفعالية' : 'Share Event',
    speaker:      isAr ? 'المتحدث الرئيسي' : 'Keynote Speaker',
    speakerRole:  isAr ? 'كادر أكاديمي / مؤلف متميز' : 'Faculty / Distinguished Author',
    typeLabels: { workshop: isAr ? 'ورشة عمل' : 'Workshop', panel: isAr ? 'حلقة نقاش' : 'Panel', talk: isAr ? 'محاضرة' : 'Talk' }
  }

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const event = EVENTS.find(e => e.id === currentEventId)
  if (!event) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className={`text-center ${isAr ? 'text-right' : ''}`}>
        <h2 className="text-2xl font-bold text-foreground mb-4">{t.notFound}</h2>
        <Button onClick={() => navigateTo('home')} className="bg-zewail-blue text-white">{t.returnHome}</Button>
      </div>
    </div>
  )

  const date = new Date(event.date)
  const locale = isAr ? 'ar-EG' : 'en-US'

  return (
    <div className="min-h-screen bg-background pt-24 pb-12" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back */}
        <button
          onClick={() => { setNavigationTarget('calendar-section'); navigateTo('home') }}
          className={`group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-zewail-blue mb-8 transition-colors ${isAr ? 'flex-row-reverse' : ''}`}
        >
          <div className="p-1.5 rounded-md bg-card border border-border group-hover:border-zewail-blue/30 group-hover:bg-zewail-blue/5 transition-all">
            <ArrowLeft className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
          </div>
          {t.backCalendar}
        </button>

        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${isAr ? '' : ''}`}>

          {/* Main */}
          <div className="lg:col-span-2 space-y-6">

            {/* Header card */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-3xl p-8 border border-border shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-zewail-blue/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />

              <div className="relative z-10">
                <div className={`flex flex-wrap items-center gap-3 mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <Badge className="bg-zewail-blue/10 text-zewail-blue hover:bg-zewail-blue/20 border-none">
                    <span className="uppercase text-[10px] tracking-wider font-bold">
                      {t.typeLabels[event.type as keyof typeof t.typeLabels] || event.type}
                    </span>
                  </Badge>
                  {event.publisherName && (
                    <Badge variant="outline" className="border-border text-muted-foreground">{event.publisherName}</Badge>
                  )}
                  <Badge className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    {t.regOpen}
                  </Badge>
                </div>

                <h1 className={`text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight ${isAr ? 'text-right' : ''}`}>
                  {isAr && (event as { titleAr?: string }).titleAr ? (event as { titleAr?: string }).titleAr : event.title}
                </h1>
                <p className={`text-lg text-muted-foreground leading-relaxed font-light mb-8 ${isAr ? 'text-right' : ''}`}>
                  {isAr && (event as { descriptionAr?: string }).descriptionAr ? (event as { descriptionAr?: string }).descriptionAr : event.description}
                </p>

                {/* Meta grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-4 rounded-2xl bg-muted/50 dark:bg-muted border border-border">
                  {[
                    { label: t.dateLabel,   icon: <Calendar className="w-4 h-4" />, val: date.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' }) },
                    { label: t.timeLabel,   icon: <Clock className="w-4 h-4" />,    val: date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }) },
                    { label: t.formatLabel, icon: <Monitor className="w-4 h-4" />,  val: t.formatVal },
                    { label: t.capLabel,    icon: <Users className="w-4 h-4" />,    val: t.capVal },
                  ].map(item => (
                    <div key={item.label} className={`flex flex-col gap-1 p-2 ${isAr ? 'items-end text-right' : ''}`}>
                      <div className={`flex items-center gap-1 text-zewail-blue mb-1 ${isAr ? 'flex-row-reverse' : ''}`}>
                        {item.icon}
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{item.label}</span>
                      </div>
                      <span className="text-sm font-semibold text-foreground">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* About */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-card rounded-3xl p-8 border border-border shadow-sm">
              <h2 className={`text-xl font-bold text-foreground mb-4 border-b border-border pb-4 ${isAr ? 'text-right' : ''}`}>
                {t.aboutSession}
              </h2>
              <div className={`space-y-4 text-muted-foreground leading-relaxed ${isAr ? 'text-right' : ''}`}>
                <p>{t.sessionDesc1}</p>
                <p>{t.sessionDesc2}</p>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Action card */}
            <motion.div initial={{ opacity: 0, x: isAr ? -16 : 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
              className="bg-card rounded-3xl p-6 border border-border shadow-lg shadow-zewail-blue/5 sticky top-24">
              <div className={`flex items-center justify-between mb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{t.statusLabel}</span>
                <Badge variant="outline" className="border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30">
                  <CheckCircle className="w-3 h-3 me-1" /> {t.available}
                </Badge>
              </div>

              {!isAuthenticated ? (
                <div className="space-y-4">
                  <Button onClick={() => { setAuthModalTab('login'); setAuthModalOpen(true) }}
                    className="w-full bg-gradient-to-r from-zewail-blue to-zewail-blue-dark text-white h-14 rounded-xl text-lg">
                    {t.loginToReg}
                  </Button>
                  <p className={`text-xs text-center text-muted-foreground px-2 font-medium ${isAr ? 'text-right' : ''}`}>
                    {t.loginNote}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-zewail-blue to-zewail-blue-dark text-white h-14 rounded-xl text-lg font-bold group">
                    <BookOpen className={`w-5 h-5 ${isAr ? 'ms-2' : 'me-2'} group-hover:scale-110 transition-transform`} />
                    {t.secureSpot}
                  </Button>
                  <Button variant="outline" className="w-full h-12 rounded-xl text-foreground border-border hover:bg-muted transition-all font-semibold">
                    <Share2 className={`w-4 h-4 ${isAr ? 'ms-2' : 'me-2'} text-zewail-blue`} />
                    {t.shareEvent}
                  </Button>
                </div>
              )}
            </motion.div>

            {/* Speaker card */}
            {event.speaker && (
              <motion.div initial={{ opacity: 0, x: isAr ? -16 : 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
                className="bg-muted/50 rounded-3xl p-6 border border-border">
                <h3 className={`text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4 ${isAr ? 'text-right' : ''}`}>
                  {t.speaker}
                </h3>
                <div className={`flex items-center gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-zewail-blue/30 to-zewail-blue flex items-center justify-center text-white shadow-inner shrink-0">
                    <Mic className="w-6 h-6 opacity-80" />
                  </div>
                  <div className={isAr ? 'text-right' : ''}>
                    <h4 className="font-bold text-foreground text-base">{event.speaker}</h4>
                    <p className="text-sm text-muted-foreground">{t.speakerRole}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
