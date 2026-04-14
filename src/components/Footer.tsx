'use client'

import { useAppStore } from '@/lib/store'
import { Atom, ExternalLink, MapPin, Mail, Phone } from 'lucide-react'

export default function Footer() {
  const { navigateTo, setNavigationTarget, language } = useAppStore()
  const isAr = language === 'ar'

  const t = {
    title: isAr ? 'معرض مدينة زويل الرقمي للكتاب' : 'Zewail Digital Book Fair',
    desc: isAr
      ? 'مركز متميز مخصص لتطوير البحث العلمي، وتوفير وصول لا مثيل له إلى المنشورات الأكاديمية والموارد الفكرية.'
      : 'A center of excellence dedicated to advancing scientific research, providing unparalleled access to academic publications.',
    quickLinks: isAr ? 'روابط سريعة' : 'Quick Links',
    contact: isAr ? 'تواصل معنا' : 'Contact',
    hubs: isAr ? 'مراكز المعرفة' : 'Knowledge Hubs',
    calendar: isAr ? 'التقويم' : 'Calendar',
    officialSite: isAr ? 'الموقع الرسمي' : 'Official Website',
    address: isAr ? 'مدينة زويل للعلوم والتكنولوجيا، الجيزة، مصر' : 'Zewail City of Science & Technology, Giza, Egypt',
    rights: isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.',
    poweredBy: isAr ? 'بدعم من IEEE ZC' : 'Powered by IEEE Zewail City',
  }

  const nav = (target: string) => {
    setNavigationTarget(target)
    navigateTo('home')
  }

  return (
    <footer className="relative overflow-hidden border-t border-border bg-[#0B1D35] dark:bg-[#030b16]" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle, #00B4D1 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />
      {/* Top glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zewail-blue/50 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-lg overflow-hidden border border-white/20">
                <img
                  src="/zewail-logo.png"
                  alt="Zewail City Logo"
                  className="w-14 h-14 object-contain p-0.5"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.removeAttribute('style');
                  }}
                />
                <span className="text-zewail-blue font-black text-2xl hidden">Z</span>
              </div>
              <span className="text-lg font-bold text-white leading-tight">{t.title}</span>
            </div>
            <p className="text-sm text-white/55 max-w-sm leading-relaxed mb-4">
              {t.desc}
            </p>
            <span className="text-xs text-zewail-blue/70 font-medium">{t.poweredBy}</span>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/50 mb-5 flex items-center gap-2">
              <span className="h-px w-4 bg-zewail-blue inline-block" />
              {t.quickLinks}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => nav('hubs-section')} className="text-white/55 hover:text-zewail-blue transition-colors cursor-pointer">
                  {t.hubs}
                </button>
              </li>
              <li>
                <button onClick={() => nav('calendar-section')} className="text-white/55 hover:text-zewail-blue transition-colors cursor-pointer">
                  {t.calendar}
                </button>
              </li>
              <li>
                <a href="https://www.zewailcity.edu.eg/" target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1 text-white/55 hover:text-zewail-blue transition-colors">
                  {t.officialSite} <ExternalLink className="size-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/50 mb-5 flex items-center gap-2">
              <span className="h-px w-4 bg-zewail-blue inline-block" />
              {t.contact}
            </h4>
            <ul className="space-y-4 text-sm text-white/55">
              <li className="flex items-start gap-2.5">
                <MapPin className="size-4 text-zewail-blue shrink-0 mt-0.5" />
                <span>{t.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 text-zewail-blue shrink-0" />
                <span>info@zewailcity.edu.eg</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 text-zewail-blue shrink-0" />
                <span dir="ltr">+20 2 3854 0400</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p dir="ltr">© {new Date().getFullYear()} {t.title}. {t.rights}</p>
          <p className="text-zewail-blue/40">zewailcity.edu.eg</p>
        </div>
      </div>
    </footer>
  )
}

