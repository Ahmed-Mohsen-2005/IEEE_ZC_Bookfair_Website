'use client'

import { motion } from 'framer-motion'
import { Microscope, Award, BookOpen, Sparkles } from 'lucide-react'
import { useAppStore } from '@/lib/store'

export default function ZewailLegacy() {
  const { language } = useAppStore()
  const isAr = language === 'ar'

  const t = {
    badge: isAr ? 'الرؤية المؤسسة' : 'The Visionary',
    titleA: isAr ? 'نحمل راية' : 'Continuing the',
    titleB: isAr ? 'الإرث العلمي' : 'Legacy',
    quote: isAr
      ? '"المعرفة هي النور الذي يُضيء طريق الإنسانية." مستوحاةً من مسيرة د. أحمد زويل نحو التميز، تجمع هذه المنصة الرقمية بين الصرامة العلمية لمدينة زويل والحفاظ على الأدب العالمي.'
      : '"Knowledge is the light that illuminates the path of humanity." Inspired by Dr. Ahmed Zewail\'s pursuit of excellence, this digital hub perfectly aligns Zewail City\'s scientific rigor with preserving global literature.',
    cards: [
      {
        icon: Microscope,
        title: isAr ? 'الدقة العلمية' : 'Scientific Rigor',
        desc: isAr
          ? 'تطبيق منهجية علمية دقيقة في تنظيم المعرفة الرقمية. منصتنا تعالج البيانات الأكاديمية بكفاءة ودقة عالية.'
          : 'Applying precision to digital knowledge curation. Our platform processes academic data efficiently and accurately.',
      },
      {
        icon: Award,
        title: isAr ? 'التميز الأكاديمي' : 'Academic Excellence',
        desc: isAr
          ? 'نلتزم بأعلى المعايير العالمية. فقط أرقى دور النشر وأكثرها مصداقيةً تُضاف إلى شبكتنا المعتمدة.'
          : 'Holding ourselves to the highest global standards. Only the most prestigious publishers make it to our network.',
      },
      {
        icon: BookOpen,
        title: isAr ? 'إتاحة المعرفة' : 'Knowledge Accessibility',
        desc: isAr
          ? 'كسر حواجز الوصول إلى المعلومات. واجهة سلسة مُصممة لتقريب الأدب إلى الطلاب وأعضاء هيئة التدريس.'
          : 'Breaking the barriers of information access. A seamless interface designed to bring literature to students and faculty.',
      },
    ]
  }

  return (
    <section className="relative py-24 bg-muted/40 dark:bg-[#060f1c] overflow-hidden border-y border-border">
      {/* Hex grid */}
      <div className="absolute inset-0 z-0 opacity-[0.025] dark:opacity-[0.05]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex-grid" width="60" height="103" patternUnits="userSpaceOnUse">
              <path d="M30 0l30 17.32v34.64L30 69.28 0 51.96V17.32z" fill="none" stroke="#00B4D1" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zewail-blue/30 bg-zewail-blue/10 dark:bg-zewail-blue/15 mb-6"
          >
            <Sparkles className="w-4 h-4 text-zewail-blue" />
            <span className="text-xs font-bold text-zewail-blue tracking-widest uppercase">{t.badge}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-foreground mb-6"
          >
            {t.titleA} <span className="text-zewail-blue">{t.titleB}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed font-light italic"
          >
            {t.quote}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.cards.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative"
            >
              <div className="relative p-8 rounded-2xl bg-card border border-border h-full text-center
                hover:shadow-xl hover:shadow-zewail-blue/8 hover:border-zewail-blue/30 transition-all duration-300">
                {/* Gradient top border */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zewail-blue/30 to-transparent" />
                <div className="mx-auto w-16 h-16 rounded-2xl border border-border bg-muted flex items-center justify-center mb-6 text-zewail-blue
                  group-hover:scale-110 group-hover:bg-zewail-blue group-hover:text-white group-hover:border-zewail-blue transition-all duration-300">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
