'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { BookOpen, Users, Zap, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CTASection() {
  const { setAuthModalOpen, setAuthModalTab, isAuthenticated, navigateTo, language } = useAppStore()
  const isAr = language === 'ar'

  const t = {
    title: isAr ? 'لماذا تنضم إلينا؟' : 'Why Join Us?',
    readyTitle: isAr ? 'هل أنت مستعد للاكتشاف؟' : 'Ready to Discover?',
    readyDesc: isAr
      ? 'انضم إلى آلاف القراء في استكشاف أغنى مجموعة معرفة رقمية في مصر. سواء كنت طالباً أو باحثاً أو محب قراءة، ابحث عن قراءتك القادمة الآن.'
      : "Join thousands of readers exploring Egypt's richest collection of digital knowledge. Whether you're a student, researcher, or book lover, find your next great read today.",
    cta: isAr ? 'ابدأ رحلتك' : 'Start Your Journey',
    alreadyAuth: isAr ? 'هل أنت مستعد للاستكشاف؟ تفضل بزيارة مراكز المعرفة أعلاه!' : 'Ready to explore? Visit the Knowledge Hubs above!',
    benefits: [
      isAr ? '✓ أكثر من 50,000 كتاب من ناشرين موثوقين' : '✓ 50,000+ Books from trusted publishers',
      isAr ? '✓ اقرأ أونلاين أو حمّل للاستخدام دون اتصال' : '✓ Read online or download for offline use',
      isAr ? '✓ توصيات مخصصة بالكتب' : '✓ Personalized book recommendations',
      isAr ? '✓ انضم إلى فعاليات القراءة الحية' : '✓ Join live reading events',
    ],
    features: [
      { icon: BookOpen, title: isAr ? 'وصول فوري' : 'Instant Access', description: isAr ? 'تصفح آلاف الكتب فوراً' : 'Browse thousands of titles instantly' },
      { icon: Users, title: isAr ? 'التواصل' : 'Connect', description: isAr ? 'انضم لمجتمع القراء' : 'Join our reading community' },
      { icon: Zap, title: isAr ? 'التجربة' : 'Experience', description: isAr ? 'استمتع بقراءة رقمية سلسة' : 'Enjoy seamless digital reading' },
    ]
  }

  return (
    <section className="section-premium relative overflow-hidden bg-muted/30 dark:bg-[#060f1c] border-t border-border" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 blueprint-grid opacity-50" />
      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-br from-zewail-blue/3 via-transparent to-zewail-blue/3 pointer-events-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left / Right — Features list */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`lg:col-span-5 ${isAr ? 'text-right' : ''}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">{t.title}</h2>
            <div className="space-y-5">
              {t.features.map((f, i) => {
                const Icon = f.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isAr ? 24 : -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-4 rounded-xl hover:bg-background transition-colors duration-300"
                  >
                    <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-zewail-blue to-zewail-blue-dark text-white shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className={isAr ? 'text-right' : ''}>
                      <h3 className="font-bold text-foreground mb-1">{f.title}</h3>
                      <p className="text-muted-foreground text-sm">{f.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right — CTA card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-zewail-blue/20 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl blur-2xl transition-all duration-500" />
              <div className="relative bg-card border border-border rounded-3xl p-8 md:p-12 hover:border-zewail-blue/25 transition-all duration-300">
                {/* Floating icon */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="mb-6 inline-block"
                >
                  <div className="p-3 rounded-2xl bg-zewail-blue/10 dark:bg-zewail-blue/20 border border-zewail-blue/25">
                    <BookOpen className="w-8 h-8 text-zewail-blue" />
                  </div>
                </motion.div>

                <h3 className={`text-2xl md:text-3xl font-bold text-foreground mb-4`}>{t.readyTitle}</h3>
                <p className={`text-muted-foreground mb-8 leading-relaxed`}>{t.readyDesc}</p>

                <ul className="space-y-3 mb-8">
                  {t.benefits.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: isAr ? -16 : 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      className="flex items-center gap-3 text-foreground/80 font-medium text-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-zewail-blue shrink-0" />
                      {item.slice(2)}
                    </motion.li>
                  ))}
                </ul>

                {!isAuthenticated ? (
                  <Button
                    onClick={() => { setAuthModalTab('register'); setAuthModalOpen(true) }}
                    className="w-full bg-gradient-to-r from-zewail-blue to-zewail-blue-dark text-white py-6 text-lg font-semibold rounded-xl shadow-lg shadow-zewail-blue/25 hover:shadow-zewail-blue/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {t.cta}
                    <ArrowRight className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigateTo('visitor-dashboard')}
                    className="w-full bg-zewail-blue/10 dark:bg-zewail-blue/20 text-zewail-blue border border-zewail-blue/30 hover:bg-zewail-blue hover:text-white py-5 text-lg font-semibold rounded-xl transition-all duration-300"
                  >
                    {t.alreadyAuth}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
