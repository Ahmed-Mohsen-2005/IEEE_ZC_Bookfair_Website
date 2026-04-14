'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { Atom, FlaskConical, Microscope, Globe, Award, GraduationCap, BrainCircuit, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

const FACTS = [
  { numEn: '30+', numAr: '+٣٠', labelEn: 'Research Centers', labelAr: 'مركز بحثي', icon: FlaskConical, color: '#00B4D1' },
  { numEn: '5,000+', numAr: '+٥٬٠٠٠', labelEn: 'Alumni Worldwide', labelAr: 'خريج حول العالم', icon: GraduationCap, color: '#C4A35A' },
  { numEn: '120+', numAr: '+١٢٠', labelEn: 'International Partners', labelAr: 'شريك دولي', icon: Globe, color: '#7C3AED' },
  { numEn: '8', numAr: '٨', labelEn: 'Academic Programs', labelAr: 'برامج أكاديمية', icon: Award, color: '#059669' },
]

const PILLARS = [
  {
    icon: BrainCircuit,
    titleEn: 'Founded by a Nobel Laureate',
    titleAr: 'تأسست على يد حائز نوبل',
    descEn: 'Established in 2011 under the vision of Nobel Prize laureate Dr. Ahmed Zewail — the father of femtochemistry.',
    descAr: 'تأسست عام ٢٠١١ بإشراف مباشر من الدكتور أحمد زويل الحائز على جائزة نوبل، أبو الفيمتوكيمياء.',
  },
  {
    icon: Microscope,
    titleEn: 'STEM Excellence',
    titleAr: 'التميز في العلوم والتقنية',
    descEn: 'A beacon of science, technology, engineering and mathematics education in the Arab world, producing the next generation of innovators.',
    descAr: 'منارة تعليم العلوم والتقنية والهندسة والرياضيات في العالم العربي، تُخرّج جيل المبتكرين القادم.',
  },
  {
    icon: Globe,
    titleEn: 'Global Vision',
    titleAr: 'رؤية عالمية',
    descEn: 'Partnering with MIT, Caltech, and leading universities worldwide to bring international excellence to Egypt.',
    descAr: 'شراكات مع MIT وCaltech وأبرز الجامعات العالمية لإحضار التميز الدولي إلى مصر.',
  },
  {
    icon: Atom,
    titleEn: 'Research-First Culture',
    titleAr: 'ثقافة البحث أولاً',
    descEn: 'Every student engages in hands-on research from day one, turning theory into real-world breakthroughs.',
    descAr: 'كل طالب يمارس البحث التطبيقي منذ اليوم الأول، محوّلاً النظرية إلى اكتشافات حقيقية.',
  },
]

// Real Zewail City & science campus photos (Local Assets)
const GALLERY = [
  {
    url: '/gallery/campus-main.jpg',
    captionEn: 'Modern Research Campus',
    captionAr: 'حرم الأبحاث الحديث',
  },
  {
    url: '/gallery/academic-excellence.jpg',
    captionEn: 'Academic Excellence',
    captionAr: 'التميز الأكاديمي',
  },
  {
    url: '/gallery/laboratories.jpg',
    captionEn: 'State-of-the-art Laboratories',
    captionAr: 'مختبرات متطورة',
  },
  {
    url: '/gallery/innovation-hub.jpg',
    captionEn: 'Innovation Hub',
    captionAr: 'مركز الابتكار',
  },
  {
    url: '/gallery/library.jpg',
    captionEn: 'Library & Knowledge Center',
    captionAr: 'المكتبة ومركز المعرفة',
  },
]

export default function ZewailAboutSection() {
  const { language } = useAppStore()
  const isAr = language === 'ar'
  const [activeImg, setActiveImg] = useState(0)

  const t = {
    eyebrow: isAr ? 'معرفة مكان المعرض' : 'About the Venue',
    title: isAr ? 'مدينة زويل للعلوم والتكنولوجيا' : 'Zewail City of Science & Technology',
    subtitle: isAr
      ? 'صرح علمي مصري استثنائي يجمع الأكاديمية والبحث والابتكار في قلب منطقة الأهرامات.'
      : 'An extraordinary Egyptian scientific landmark uniting academia, research, and innovation at the heart of the Pyramids Plateau.',
    galleryTitle: isAr ? 'معرض الصور' : 'Photo Gallery',
    quote: isAr
      ? '"علم بلا حدود، وإبداع بلا قيود — هذا هو جوهر مدينة زويل."'
      : '"Science without borders, creativity without limits — this is the essence of Zewail City."',
    quoteBy: isAr ? '— الدكتور أحمد زويل، مؤسس المدينة' : '— Dr. Ahmed Zewail, Founder',
    learnMore: isAr ? 'زيارة الموقع الرسمي' : 'Visit Official Site',
    pillarsTitle: isAr ? 'ما يميّز مدينة زويل' : 'What Makes Zewail City Unique',
    prev: isAr ? 'السابق' : 'Previous',
    next: isAr ? 'التالي' : 'Next',
  }

  const nextImg = () => setActiveImg(i => (i + 1) % GALLERY.length)
  const prevImg = () => setActiveImg(i => (i - 1 + GALLERY.length) % GALLERY.length)

  return (
    <section id="about-zewail" className="py-24 px-6 relative overflow-hidden bg-[#0B1D35]">
      {/* Pyramid silhouette */}
      <svg className="absolute bottom-0 left-0 right-0 w-full opacity-[0.07] pointer-events-none" viewBox="0 0 1200 220" preserveAspectRatio="none">
        <polygon points="0,220 200,40 400,220" fill="#00B4D1" />
        <polygon points="300,220 550,10 800,220" fill="#00B4D1" />
        <polygon points="700,220 900,60 1100,220" fill="#00B4D1" />
        <polygon points="1050,220 1200,90 1400,220" fill="#00B4D1" />
      </svg>
      {/* Blueprint grid */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.03]" />
      {/* Top gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zewail-blue/50 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Eyebrow */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zewail-blue/30 bg-zewail-blue/10 ${isAr ? 'flex-row-reverse' : ''}`}>
            <Atom className="w-3.5 h-3.5 text-zewail-blue" />
            <span className="text-xs font-bold tracking-widest text-zewail-blue uppercase">{t.eyebrow}</span>
          </motion.div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-center text-white mb-4 leading-tight"
        >{t.title}</motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="text-center text-white/60 max-w-2xl mx-auto mb-16 leading-relaxed text-lg"
        >{t.subtitle}</motion.p>

        {/* ── Main two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20" dir={isAr ? 'rtl' : 'ltr'}>

          {/* Image Gallery */}
          <motion.div initial={{ opacity: 0, x: isAr ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className={`text-xs font-bold tracking-widest text-zewail-blue uppercase mb-4 ${isAr ? 'text-right' : ''}`}>{t.galleryTitle}</p>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl shadow-black/40 border border-white/10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={GALLERY[activeImg].url}
                  alt={isAr ? GALLERY[activeImg].captionAr : GALLERY[activeImg].captionEn}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              {/* Caption overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-5 py-4">
                <p className={`text-white text-sm font-semibold ${isAr ? 'text-right' : ''}`}>
                  {isAr ? GALLERY[activeImg].captionAr : GALLERY[activeImg].captionEn}
                </p>
              </div>
              {/* Prev / Next */}
              <button onClick={prevImg} aria-label={t.prev}
                className={`absolute ${isAr ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white transition-all backdrop-blur-sm`}>
                <ChevronLeft className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
              </button>
              <button onClick={nextImg} aria-label={t.next}
                className={`absolute ${isAr ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white transition-all backdrop-blur-sm`}>
                <ChevronRight className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {/* Thumbnail dots */}
            <div className={`flex gap-2 mt-4 ${isAr ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
              {GALLERY.map((g, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`rounded-full transition-all overflow-hidden border-2 ${i === activeImg ? 'border-zewail-blue w-8 h-2' : 'border-transparent w-2 h-2 bg-white/30'}`}
                  style={i === activeImg ? { backgroundColor: '#00B4D1' } : {}}
                />
              ))}
            </div>
          </motion.div>

          {/* Pillars */}
          <motion.div initial={{ opacity: 0, x: isAr ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className={`text-xs font-bold tracking-widest text-zewail-blue uppercase mb-6 ${isAr ? 'text-right' : ''}`}>{t.pillarsTitle}</p>
            <div className="space-y-4">
              {PILLARS.map((p, i) => (
                <motion.div key={p.titleEn}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className={`flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 hover:border-zewail-blue/30 transition-all group ${isAr ? 'flex-row-reverse text-right' : ''}`}
                >
                  <div className="p-2.5 rounded-xl bg-zewail-blue/15 shrink-0 h-fit group-hover:bg-zewail-blue/25 transition-colors">
                    <p.icon className="w-5 h-5 text-zewail-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1 text-sm">{isAr ? p.titleAr : p.titleEn}</h4>
                    <p className="text-xs text-white/55 leading-relaxed">{isAr ? p.descAr : p.descEn}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {FACTS.map((f, i) => (
            <motion.div key={f.labelEn}
              initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center group hover:border-white/25 transition-colors overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 50%, ${f.color}, transparent)` }} />
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3" style={{ backgroundColor: f.color + '20' }}>
                <f.icon className="w-5 h-5" style={{ color: f.color }} />
              </div>
              <div className="text-3xl font-black text-white mb-1">{isAr ? f.numAr : f.numEn}</div>
              <div className="text-xs font-semibold text-white/50 uppercase tracking-wide">{isAr ? f.labelAr : f.labelEn}</div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <div className="inline-block max-w-2xl px-8 py-6 rounded-2xl border border-zewail-blue/20 bg-zewail-blue/5 relative">
            <div className="absolute -top-3 left-8 text-5xl text-zewail-blue/20 font-serif leading-none select-none">"</div>
            <p className={`text-lg font-medium text-white/80 italic mb-3 ${isAr ? 'text-right' : ''}`}>{t.quote}</p>
            <p className={`text-sm text-zewail-blue font-semibold ${isAr ? 'text-right' : ''}`}>{t.quoteBy}</p>
          </div>
          <div className="mt-8">
            <a href="https://www.zewailcity.edu.eg/" target="_blank" rel="noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zewail-blue text-white font-semibold text-sm hover:bg-zewail-blue/90 transition-colors shadow-lg shadow-zewail-blue/25 ${isAr ? 'flex-row-reverse' : ''}`}>
              <ExternalLink className="w-4 h-4" />
              {t.learnMore}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
