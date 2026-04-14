'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { BookOpen, LogIn, Library, ArrowRight, Building, Sparkles } from 'lucide-react'

export default function HeroSection() {
  const { setAuthModalOpen, setAuthModalTab, navigateTo, setNavigationTarget, isAuthenticated, user, language } = useAppStore()

  const isAr = language === 'ar'
  const t = {
    badge: isAr ? 'مدينة زويل للعلوم والتكنولوجيا' : 'Zewail City of Science and Technology',
    tagline: isAr ? 'معرض الكتاب الرقمي' : 'Digital Book Fair',
    year: '2026',
    desc: isAr
      ? 'نظام بيئي أكاديمي متميز يربط بين البحث العلمي والتراث الأدبي. استكشف المنشورات المعتمدة والمجلات الأكاديمية والمجموعات الأدبية من أبرز مؤسسات مصر.'
      : "A premier academic ecosystem bridging scientific research and literary heritage. Explore verified publications, academic journals, and literary collections from Egypt's most distinguished institutions.",
    btnExplore: isAr ? 'استكشاف مراكز المعرفة' : 'Explore Knowledge Hubs',
    btnLogin: isAr ? 'دخول الطلاب / أعضاء الهيئة' : 'Faculty / Student Login',
    btnDashboard: isAr ? 'الوصول إلى لوحتي' : 'Access My Dashboard',
    repoTitle: isAr ? 'المستودع الرقمي' : 'Digital Repository',
    stat1Label: isAr ? 'عناوين معتمدة' : 'Verified Titles',
    stat1Val: '50K+',
    stat2Label: isAr ? 'باحثون نشطون' : 'Active Researchers',
    stat2Val: '100K+',
    stat3Label: isAr ? 'ناشرون مسجلون' : 'Registered Publishers',
    stat3Val: '500+',
    stat4Label: isAr ? 'الوصول المستمر' : 'System Access',
    stat4Val: '24/7',
    quote: isAr
      ? '"المعرفة هي النور الذي يضيء طريق الإنسانية." — د. أحمد زويل'
      : '"Knowledge is the light that illuminates the path of humanity." — Dr. Ahmed Zewail',
    welcome: isAr ? `مرحباً، ${user?.name || ''}` : `Welcome back, ${user?.name || ''}`,
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ── Background gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-50/60 to-white dark:from-[#060f1c] dark:via-[#0a1a30] dark:to-[#060f1c]" />

      {/* ── Blueprint grid ── */}
      <div className="absolute inset-0 blueprint-grid opacity-100" />

      {/* ── Soft glow blobs ── */}
      <div className="absolute top-10 right-1/4 h-96 w-96 rounded-full bg-zewail-blue/10 dark:bg-zewail-blue/5 blur-3xl" />
      <div className="absolute bottom-20 left-1/4 h-80 w-80 rounded-full bg-sky-400/8 dark:bg-zewail-blue/5 blur-3xl" />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-24 lg:grid-cols-2 lg:py-32">

        {/* Left — Text */}
        <div className={`flex flex-col justify-center ${isAr ? 'items-end text-right' : 'items-start text-left'}`}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-zewail-blue/30 bg-zewail-blue/8 dark:bg-zewail-blue/10 px-4 py-2"
          >
            <Building className="size-4 shrink-0 text-zewail-blue" />
            <span className="text-xs font-bold uppercase tracking-widest text-zewail-blue">{t.badge}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl font-bold leading-tight text-zewail-navy dark:text-white md:text-6xl lg:text-7xl mb-4"
          >
            {isAr ? (
              <>
                <span className="text-zewail-blue">{t.tagline}</span>
                <br />
                <span>{t.year}</span>
              </>
            ) : (
              <>
                <span className="block">Digital</span>
                <span className="text-zewail-blue">Book Fair</span>{' '}
                <span>{t.year}</span>
              </>
            )}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-10 max-w-xl text-lg font-light leading-relaxed text-zewail-navy/70 dark:text-white/65"
          >
            {t.desc}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            {!isAuthenticated ? (
              <>
                <Button
                  size="lg"
                  onClick={() => { setNavigationTarget('hubs-section'); navigateTo('home') }}
                  className="group relative h-14 overflow-hidden rounded-xl bg-zewail-blue px-8
                             hover:bg-zewail-blue-dark text-white text-lg font-semibold
                             shadow-lg shadow-zewail-blue/30 hover:shadow-zewail-blue/50 transition-all duration-300"
                >
                  <BookOpen className="me-2 size-5 group-hover:scale-110 transition-transform" />
                  {t.btnExplore}
                  <div className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent
                                  -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => { setAuthModalTab('login'); setAuthModalOpen(true) }}
                  className="h-14 rounded-xl border-2 border-zewail-navy/15 dark:border-white/20
                             text-zewail-navy dark:text-white px-8 text-lg font-semibold
                             hover:border-zewail-blue hover:bg-zewail-blue/8 dark:hover:bg-zewail-blue/15 transition-all duration-300"
                >
                  <LogIn className="me-2 size-5" />
                  {t.btnLogin}
                </Button>
              </>
            ) : (
              <Button
                size="lg"
                onClick={() => navigateTo(user?.role === 'publisher' ? 'publisher-dashboard' : 'visitor-dashboard')}
                className="h-14 rounded-xl bg-zewail-blue px-8 text-white text-lg font-semibold shadow-lg shadow-zewail-blue/30 hover:bg-zewail-blue-dark transition-all"
              >
                <Library className="me-2 size-5" />
                {t.btnDashboard}
                <ArrowRight className="ms-2 size-5" />
              </Button>
            )}
          </motion.div>

          {/* Sparkle note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex items-center gap-2 text-xs text-muted-foreground"
          >
            <Sparkles className="size-3 text-zewail-blue" />
            <span>{isAr ? 'مدعوم من IEEE ZC' : 'Powered by IEEE Zewail City'}</span>
          </motion.div>
        </div>

        {/* Right — Stats card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:flex items-center justify-center"
        >
          <div className="relative w-full max-w-md">
            {/* Tilted bg accent */}
            <div className="absolute inset-0 rounded-3xl bg-zewail-blue/8 dark:bg-zewail-blue/5 rotate-3 scale-105" />

            {/* Card */}
            <div className="relative rounded-3xl border border-zewail-navy/8 dark:border-zewail-blue/15
                            bg-white dark:bg-card shadow-xl dark:shadow-black/40 p-10">
              <h3 className="text-2xl font-bold text-zewail-navy dark:text-white mb-8 pb-4 border-b border-border">
                {t.repoTitle}
              </h3>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { label: t.stat1Label, value: t.stat1Val },
                  { label: t.stat2Label, value: t.stat2Val },
                  { label: t.stat3Label, value: t.stat3Val },
                  { label: t.stat4Label, value: t.stat4Val },
                ].map((s) => (
                  <div key={s.label} className="border-s-4 border-zewail-blue ps-4">
                    <div className="text-3xl font-bold text-zewail-blue mb-1" style={{ direction: 'ltr' }}>{s.value}</div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="rounded-xl bg-zewail-blue/6 dark:bg-zewail-blue/10 border border-zewail-blue/15 p-5">
                <p className="text-sm italic font-medium text-zewail-navy/80 dark:text-white/75 leading-relaxed">
                  {t.quote}
                </p>
              </div>

              {/* Decorative atom */}
              <div className="absolute -top-6 -right-6 size-20 rounded-full bg-gradient-to-br from-zewail-blue to-zewail-blue-dark opacity-15 blur-2xl" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
