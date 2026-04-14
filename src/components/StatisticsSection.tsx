'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { TrendingUp, Users, BookMarked, Award } from 'lucide-react'
import { useAppStore } from '@/lib/store'

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const increment = value / (duration * 60)
    const timer = setInterval(() => {
      start += increment
      if (start > value) { setCount(value); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [isInView, value, duration])

  return <span ref={ref}>{count.toLocaleString()}</span>
}

export default function StatisticsSection() {
  const { language } = useAppStore()
  const isAr = language === 'ar'

  const t = {
    title: isAr ? 'بالأرقام' : 'By The Numbers',
    desc: isAr
      ? 'انضم إلى آلاف القراء والباحثين والناشرين في أكبر منظومة معرفة رقمية في مصر.'
      : "Join thousands of readers, researchers, and publishers in Egypt's largest digital knowledge ecosystem.",
    growing: isAr ? 'نمو يومي' : 'Growing Daily',
    stats: [
      { icon: BookMarked, label: isAr ? 'كتاب متاح' : 'Books Available', value: 50000, suffix: '+', color: 'from-zewail-blue to-cyan-500' },
      { icon: Users, label: isAr ? 'قارئ نشط' : 'Active Readers', value: 100000, suffix: '+', color: 'from-cyan-500 to-teal-500' },
      { icon: TrendingUp, label: isAr ? 'ناشر شريك' : 'Publisher Partners', value: 500, suffix: '+', color: 'from-teal-500 to-emerald-500' },
      { icon: Award, label: isAr ? 'جائزة أكاديمية' : 'Academic Awards', value: 999, suffix: '+', color: 'from-emerald-500 to-green-500' },
    ]
  }

  return (
    <section className="section-premium relative overflow-hidden bg-[#0B1D35] dark:bg-[#030b16]">
      {/* Animated grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg className="w-full h-full" width="100%" height="100%">
          <defs>
            <pattern id="stats-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00B4D1" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stats-grid)" />
        </svg>
      </div>
      {/* Top gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zewail-blue/50 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            <span className="text-zewail-blue">{t.title}</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">{t.desc}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 flex flex-col items-center text-center
                  hover:border-zewail-blue/40 hover:bg-white/10 hover:shadow-xl hover:shadow-zewail-blue/20 transition-all duration-300">
                  <div className={`mb-5 p-4 rounded-2xl bg-gradient-to-br ${stat.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-zewail-blue mb-2" style={{ direction: 'ltr' }}>
                    <AnimatedCounter value={stat.value} />
                    <span>{stat.suffix}</span>
                  </div>
                  <p className="text-white/70 font-medium text-sm">{stat.label}</p>
                  <div className="mt-4 pt-4 border-t border-white/10 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-xs text-zewail-blue font-semibold uppercase tracking-wider">{t.growing}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
