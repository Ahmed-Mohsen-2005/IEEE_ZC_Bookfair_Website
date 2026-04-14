'use client'

import { motion } from 'framer-motion'
import { EVENTS } from '@/lib/data'
import { useAppStore } from '@/lib/store'
import { Calendar, Clock, Mic, Monitor, Presentation } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const TYPE_ICONS = {
  workshop: <Monitor className="w-4 h-4" />,
  panel: <Presentation className="w-4 h-4" />,
  talk: <Mic className="w-4 h-4" />,
}

const TYPE_COLORS: Record<string, string> = {
  workshop: 'bg-gradient-to-r from-zewail-blue to-cyan-500',
  panel: 'bg-gradient-to-r from-purple-500 to-indigo-500',
  talk: 'bg-gradient-to-r from-amber-500 to-orange-500',
}

export default function ActivityCalendar() {
  const { navigateTo, setCurrentEventId, language } = useAppStore()
  const isAr = language === 'ar'

  const t = {
    badge: isAr ? 'جدول الفعاليات' : 'Event Schedule',
    title: isAr ? 'التقويم الأكاديمي' : 'Activity Calendar',
    desc: isAr
      ? 'سجّل في الجلسات الرقمية القادمة، واحصل على إشعارات، وانضم إلى قادة الفكر والمعرفة.'
      : 'Register for upcoming digital sessions, get notified, and join thought leaders.',
    cairoTime: isAr ? 'بتوقيت القاهرة' : 'Cairo Time',
    typeLabels: {
      workshop: isAr ? 'ورشة عمل' : 'Workshop',
      panel: isAr ? 'حلقة نقاش' : 'Panel',
      talk: isAr ? 'محاضرة' : 'Talk',
    },
  }

  const eventsByDate = EVENTS.reduce<Record<string, typeof EVENTS>>((acc, event) => {
    const key = event.date.split('T')[0]
    if (!acc[key]) acc[key] = []
    acc[key].push(event)
    return acc
  }, {})

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  const formatTime = (d: string) =>
    new Date(d).toLocaleTimeString(isAr ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <section id="calendar-section" className="py-20 px-6 relative overflow-hidden bg-muted/30 dark:bg-[#060f1c]" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 blueprint-grid" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zewail-blue/30 to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-zewail-blue/25 bg-zewail-blue/8 dark:bg-zewail-blue/15">
            <Calendar className="w-3.5 h-3.5 text-zewail-blue" />
            <span className="text-xs font-bold tracking-wider text-zewail-blue uppercase">{t.badge}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">{t.desc}</p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-12">
          {Object.entries(eventsByDate).map(([date, dayEvents]) => (
            <div key={date}>
              {/* Date header */}
              <div className="flex items-center gap-4 mb-5">
                <h3 className="text-lg font-semibold text-foreground">{formatDate(date)}</h3>
                <div className="h-px bg-border flex-1" />
              </div>

              <div className="space-y-4 ml-6 border-l-2 border-zewail-blue/15 dark:border-zewail-blue/20 pl-6 pb-10">
                {dayEvents.map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    onClick={() => { setCurrentEventId(event.id); navigateTo('event-detail') }}
                    className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg hover:shadow-zewail-blue/8 hover:border-zewail-blue/25 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-start gap-4">
                      {/* Time + type */}
                      <div className="flex flex-col items-center gap-2 min-w-[70px] shrink-0">
                        <span className="text-sm font-semibold text-foreground" dir="ltr">{formatTime(event.date)}</span>
                        <div className={`p-1.5 rounded-lg text-white shrink-0 ${TYPE_COLORS[event.type as keyof typeof TYPE_COLORS] || 'bg-zewail-blue'}`}>
                          {TYPE_ICONS[event.type as keyof typeof TYPE_ICONS]}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge className="bg-zewail-blue/10 dark:bg-zewail-blue/20 text-zewail-blue dark:text-zewail-blue hover:bg-zewail-blue/20 border-none">
                            <span className="uppercase text-[10px] tracking-wider">
                              {t.typeLabels[event.type as keyof typeof t.typeLabels] || event.type}
                            </span>
                          </Badge>
                          {event.publisherName && (
                            <Badge variant="outline" className="border-border text-muted-foreground">
                              {event.publisherName}
                            </Badge>
                          )}
                        </div>

                        <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-zewail-blue transition-colors">
                          {isAr ? event.titleAr : event.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {isAr ? event.descriptionAr : event.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-zewail-blue" />
                            {isAr ? event.durationAr : event.duration} • {t.cairoTime}
                          </div>
                          {event.speaker && (
                            <div className="flex items-center gap-1 border-l border-border pl-4">
                              <Mic className="w-3 h-3 text-zewail-blue" />
                              {event.speaker}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
