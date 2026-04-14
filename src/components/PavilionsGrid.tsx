'use client'

import { motion } from 'framer-motion'
import { PUBLISHERS } from '@/lib/data'
import { useAppStore, type PageView } from '@/lib/store'
import { BookOpen, Landmark, Library, Newspaper, ChevronRight } from 'lucide-react'

const PAVILION_PAGES: Record<string, PageView> = {
  'general-egyptian': 'pavilion-general-egyptian',
  'dar-al-maaref': 'pavilion-dar-al-maaref',
  'national-library': 'pavilion-national-library',
  'al-ahram': 'pavilion-al-ahram',
}

const PAVILION_ICONS: Record<string, React.ReactNode> = {
  'general-egyptian': <Landmark className="h-7 w-7" />,
  'dar-al-maaref': <BookOpen className="h-7 w-7" />,
  'national-library': <Library className="h-7 w-7" />,
  'al-ahram': <Newspaper className="h-7 w-7" />,
}

export default function PavilionsGrid() {
  const { navigateTo, language } = useAppStore()
  const isAr = language === 'ar'

  const t = {
    tag: isAr ? 'المؤسسات الشريكة' : 'Partner Institutions',
    title: isAr ? 'مراكز المعرفة' : 'Knowledge Hubs',
    desc: isAr
      ? 'استكشف المجموعات الأدبية والمنشورات الأكاديمية المعتمدة من أبرز مؤسساتنا الشريكة في مصر.'
      : "Explore curated literary collections and verified academic publications from Egypt's leading publishing institutions.",
    access: isAr ? 'دخول المركز' : 'Access Hub',
  }

  return (
    <section id="hubs-section" className="relative py-24 px-6 bg-background overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Blueprint grid */}
      <div className="absolute inset-0 blueprint-grid" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zewail-blue/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-zewail-blue/25 bg-zewail-blue/8 dark:bg-zewail-blue/10">
            <Landmark className="w-3.5 h-3.5 text-zewail-blue" />
            <span className="text-xs font-bold tracking-wider text-zewail-blue uppercase">{t.tag}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light leading-relaxed">{t.desc}</p>
        </motion.div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 auto-rows-[300px]">
          {PUBLISHERS.map((publisher, i) => {
            const isFeatured = i === 0
            const isWide = i === 3
            const colSpan = isFeatured ? 'lg:col-span-8' : isWide ? 'lg:col-span-8' : 'lg:col-span-4'

            return (
              <motion.div
                key={publisher.id}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                onClick={() => navigateTo(PAVILION_PAGES[publisher.id])}
                className={`${colSpan} group cursor-pointer`}
              >
                <div className={`relative h-full rounded-3xl overflow-hidden border transition-all duration-500
                  border-border hover:border-zewail-blue/40
                  bg-card hover:shadow-xl hover:shadow-zewail-blue/10 dark:hover:shadow-black/40
                  ${isFeatured ? 'bg-gradient-to-br from-zewail-blue/5 to-card dark:from-zewail-blue/10' : ''}`}
                >
                  {/* Hover shimmer */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    bg-gradient-to-br from-zewail-blue/3 to-transparent" />

                  {/* Huge decorative background icon/logo */}
                  <div className="absolute end-4 bottom-4 transform group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-700" 
                       style={{ opacity: 0.08 }}>
                    <img 
                      src={publisher.logoUrl} 
                      alt="" 
                      className="w-56 h-56 object-contain pointer-events-none grayscale"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const next = e.currentTarget.nextElementSibling as HTMLElement;
                        if (next) next.style.display = 'block';
                      }}
                    />
                    <div style={{ display: 'none' }} className="text-zewail-blue dark:text-zewail-blue">
                      <BookOpen className="w-52 h-52" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative h-full p-8 flex flex-col z-10">
                    {/* Icon pill */}
                    <div className={`mb-6 p-3.5 rounded-2xl w-fit
                      ${isFeatured
                        ? 'bg-zewail-blue text-white shadow-lg shadow-zewail-blue/30'
                        : 'bg-background dark:bg-muted text-zewail-blue border border-border dark:border-zewail-blue/20'}`}
                    >
                      {PAVILION_ICONS[publisher.id]}
                    </div>

                    <h3 className={`font-bold text-foreground mb-3 ${isFeatured ? 'text-3xl' : 'text-xl'}`}>
                      {isAr ? publisher.nameAr : publisher.name}
                    </h3>
                    <p className={`text-muted-foreground font-light leading-relaxed line-clamp-3 flex-1 ${isFeatured ? 'text-base max-w-lg' : 'text-sm'}`}>
                      {isAr ? publisher.descriptionAr : publisher.description}
                    </p>

                    {/* Footer row */}
                    <div className="mt-4 flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-sm font-semibold text-muted-foreground group-hover:text-zewail-blue transition-colors">
                        {t.access}
                      </span>
                      <div className={`flex size-8 items-center justify-center rounded-full border border-border
                        group-hover:bg-zewail-blue group-hover:border-zewail-blue transition-all duration-300`}>
                        <ChevronRight className={`size-4 text-muted-foreground group-hover:text-white transition-colors ${isAr ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
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
