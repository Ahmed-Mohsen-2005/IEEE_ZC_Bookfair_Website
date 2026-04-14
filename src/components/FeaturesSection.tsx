'use client'

import { motion } from 'framer-motion'
import { BookOpen, Lightbulb, Users, Award, Sparkles, Database, Search, Shield } from 'lucide-react'
import { useAppStore } from '@/lib/store'

export default function FeaturesSection() {
  const { language } = useAppStore()
  const isAr = language === 'ar'

  const t = {
    badge: isAr ? 'المزايا الأكاديمية' : 'Academic Core Features',
    title: isAr ? 'إمكانيات المنصة' : 'Platform Capabilities',
    desc: isAr
      ? 'إطار متطور مصمم لرفع تجربة معرض الكتاب التقليدي إلى مستوى مستودع أكاديمي متكامل لطلاب وأعضاء هيئة التدريس في مدينة زويل.'
      : "A state-of-the-art framework designed to elevate the traditional book fair experience into an integrated academic repository for Zewail City students and faculty.",
    explore: isAr ? 'استكشاف' : 'Explore',
    features: [
      {
        icon: BookOpen,
        title: isAr ? 'مكتبة واسعة' : 'Extensive Library',
        description: isAr
          ? 'الوصول إلى آلاف الكتب المسجلة من أكثر دور النشر المرموقة في مصر عبر منصة موحدة.'
          : "Access thousands of registered books from Egypt's most prestigious publishers in one unified platform.",
      },
      {
        icon: Users,
        title: isAr ? 'مجتمع أكاديمي' : 'Academic Community',
        description: isAr
          ? 'تواصل مع الطلاب والباحثين والمؤلفين وأعضاء هيئة التدريس. شارك الأفكار وابنِ علاقات دائمة.'
          : 'Connect with students, researchers, authors, and faculty members. Share insights and build lasting relationships.',
      },
      {
        icon: Lightbulb,
        title: isAr ? 'مركز الابتكار' : 'Innovation Hub',
        description: isAr
          ? 'اكتشف أحدث الأفكار وأبرز المنشورات البحثية من المؤسسات المصرية الرائدة.'
          : "Discover cutting-edge ideas and latest research publications from Egypt's leading institutions.",
      },
      {
        icon: Award,
        title: isAr ? 'الامتياز الأكاديمي' : 'Excellence Recognition',
        description: isAr
          ? 'استكشف الأدبيات التي شكّلت البصمة الأكاديمية والمناهج العلمية على مر العقود.'
          : 'Explore literature that has shaped the academic footprint and scientific methods.',
      },
      {
        icon: Search,
        title: isAr ? 'بحث ذكي' : 'Smart Search',
        description: isAr
          ? 'ابحث عن الكتب والمؤلفين والمواضيع في ثوانٍ باستخدام محرك الفهرسة المتطور لمدينة زويل.'
          : 'Find books, authors, and topics in seconds using our optimized Zewail-core database indexing.',
      },
      {
        icon: Shield,
        title: isAr ? 'محتوى موثوق' : 'Verified Content',
        description: isAr
          ? 'جميع المنشورات خاضعة للمراجعة الأكاديمية والتحقق قبل إتاحتها على المنصة للمستخدمين.'
          : 'All publications are academically reviewed and verified before being made available to users.',
      },
    ]
  }

  return (
    <section className="py-24 relative overflow-hidden bg-background border-y border-border">
      <div className="absolute inset-0 blueprint-grid" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full
            bg-zewail-blue/10 dark:bg-zewail-blue/15 border border-zewail-blue/30 mb-4">
            <Sparkles className="w-4 h-4 text-zewail-blue" />
            <span className="text-sm font-bold text-zewail-blue tracking-widest uppercase">{t.badge}</span>
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">{t.title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">{t.desc}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative"
              >
                <div className="relative bg-card border border-border rounded-2xl overflow-hidden h-full flex flex-col p-8
                  hover:shadow-xl hover:shadow-zewail-blue/8 hover:border-zewail-blue/30 transition-all duration-300">
                  {/* Top accent bar */}
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-zewail-blue/20 group-hover:bg-zewail-blue transition-colors duration-300" />

                  <div className="mb-5 inline-flex p-4 rounded-xl bg-zewail-blue/8 dark:bg-zewail-blue/15 text-zewail-blue
                    group-hover:bg-zewail-blue group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className={`text-xl font-bold text-foreground mb-3 ${isAr ? 'text-right' : ''}`}>{feature.title}</h3>
                  <p className={`text-muted-foreground leading-relaxed flex-1 ${isAr ? 'text-right' : ''}`}>{feature.description}</p>

                  <div className={`mt-6 flex items-center text-zewail-blue font-semibold text-sm ${isAr ? 'flex-row-reverse' : ''}`}>
                    {t.explore}
                    <span className={`${isAr ? 'mr-2 group-hover:-translate-x-2' : 'ml-2 group-hover:translate-x-2'} transition-transform duration-300`}>
                      {isAr ? '←' : '→'}
                    </span>
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
