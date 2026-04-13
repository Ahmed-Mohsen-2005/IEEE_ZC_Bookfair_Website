'use client'

import { motion } from 'framer-motion'
import { EVENTS } from '@/lib/data'
import { Calendar, Clock, Mic, Monitor, Presentation } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const TYPE_ICONS = {
  workshop: <Monitor className="h-4 w-4" />,
  panel: <Presentation className="h-4 w-4" />,
  talk: <Mic className="h-4 w-4" />,
}

const TYPE_COLORS = {
  workshop: 'bg-emerald-500',
  panel: 'bg-blue-500',
  talk: 'bg-amber-500',
}

export default function ActivityCalendar() {
  // Group events by date
  const eventsByDate = EVENTS.reduce<Record<string, typeof EVENTS>>((acc, event) => {
    const dateKey = event.date.split('T')[0]
    if (!acc[dateKey]) acc[dateKey] = []
    acc[dateKey].push(event)
    return acc
  }, {})

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  }

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background with atomic watermark */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50/50 to-white atomic-watermark" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-zewail-navy mb-4">
              Activity Calendar
            </h2>
            <p className="text-zewail-navy/50 text-lg max-w-2xl mx-auto">
              Digital workshops, live speaker panels, and interactive sessions throughout the fair
            </p>
          </motion.div>
        </div>

        {/* Event Timeline */}
        <div className="space-y-12">
          {Object.entries(eventsByDate).map(([dateKey, events], dateIndex) => (
            <motion.div
              key={dateKey}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: dateIndex * 0.2 }}
            >
              {/* Date Header */}
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="h-5 w-5 text-zewail-blue" />
                <h3 className="text-xl font-semibold text-zewail-navy">{formatDate(dateKey)}</h3>
                <div className="flex-1 h-px bg-zewail-blue/20" />
              </div>

              {/* Events for this date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 md:pl-8">
                {events.map((event, eventIndex) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: eventIndex * 0.1 }}
                    className="glass rounded-2xl p-5 hover:shadow-lg transition-all duration-300 cursor-pointer group border border-zewail-blue/10"
                  >
                    <div className="flex items-start gap-4">
                      {/* Time & Type */}
                      <div className="flex flex-col items-center gap-2 min-w-[70px]">
                        <span className="text-sm font-semibold text-zewail-navy">{formatTime(event.date)}</span>
                        <div className={`p-1.5 rounded-lg text-white ${TYPE_COLORS[event.type]}`}>
                          {TYPE_ICONS[event.type]}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-zewail-navy group-hover:text-zewail-accent transition-colors line-clamp-1">
                          {event.title}
                        </h4>
                        <p className="text-sm text-zewail-navy/50 mt-1 line-clamp-2">{event.description}</p>
                        
                        <div className="flex items-center gap-3 mt-3">
                          {event.speaker && (
                            <span className="text-xs text-zewail-navy/60 flex items-center gap-1">
                              <Mic className="h-3 w-3" /> {event.speaker}
                            </span>
                          )}
                          <span className="text-xs text-zewail-navy/60 flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {event.duration}
                          </span>
                        </div>

                        {event.publisherName && (
                          <Badge variant="secondary" className="mt-2 text-xs bg-zewail-blue/10 text-zewail-navy/70 border-0">
                            {event.publisherName}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
