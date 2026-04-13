'use client'

import { useAppStore, type PageView } from '@/lib/store'
import { Atom } from 'lucide-react'

export default function Footer() {
  const { navigateTo } = useAppStore()

  const handleNavClick = (page: PageView) => {
    navigateTo(page)
  }

  return (
    <footer className="mt-auto w-full bg-zewail-navy text-white/90 pyramid-watermark">
      {/* Subtle top border accent */}
      <div className="h-1 w-full bg-gradient-to-r from-zewail-blue via-zewail-gold to-zewail-blue" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Left section - Brand & Tribute */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-white/10">
                <Atom className="size-5 text-zewail-blue" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-tight text-white sm:text-base">
                  Zewail Digital Book Pavilions
                </span>
              </div>
            </div>
            <p className="text-sm italic text-white/50">
              In honor of Dr. Ahmed Zewail (1946-2016)
            </p>
            <p className="text-xs text-white/40 leading-relaxed">
              Nobel Laureate in Chemistry &bull; Father of Femtochemistry &bull; Champion of Science in Egypt
            </p>
          </div>

          {/* Center section - Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zewail-blue">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('home')}
                className="w-fit text-sm text-white/70 transition-colors hover:text-zewail-blue"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('pavilion-general-egyptian')}
                className="w-fit text-sm text-white/70 transition-colors hover:text-zewail-blue"
              >
                Pavilions
              </button>
              <button
                onClick={() => handleNavClick('home')}
                className="w-fit text-sm text-white/70 transition-colors hover:text-zewail-blue"
              >
                Calendar
              </button>
              <button
                onClick={() => handleNavClick('visitor-dashboard')}
                className="w-fit text-sm text-white/70 transition-colors hover:text-zewail-blue"
              >
                My Dashboard
              </button>
            </nav>
          </div>

          {/* Right section - IEEE */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zewail-blue">
              Organized By
            </h3>
            <div className="flex items-center gap-3">
              {/* IEEE Logo Placeholder */}
              <div className="flex size-12 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                <span className="text-lg font-bold text-zewail-blue">IEEE</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white/90">IEEE Zewail City</span>
                <span className="text-xs text-white/50">Student Branch</span>
              </div>
            </div>
            <p className="text-xs text-white/40 leading-relaxed">
              Empowering knowledge and technology at Zewail City of Science and Technology.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} Zewail Digital Book Pavilions. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-xs text-white/30">
              <svg width="10" height="10" viewBox="0 0 10 10" className="text-zewail-gold/40">
                <polygon points="5,1 9,9 1,9" fill="currentColor" />
              </svg>
              <span>Pyramid of Knowledge</span>
              <svg width="10" height="10" viewBox="0 0 10 10" className="text-zewail-gold/40">
                <polygon points="5,1 9,9 1,9" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
