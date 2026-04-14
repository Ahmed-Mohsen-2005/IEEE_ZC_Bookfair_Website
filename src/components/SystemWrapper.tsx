'use client'

import { useEffect } from 'react'
import { useAppStore } from '@/lib/store'

export default function SystemWrapper({ children }: { children: React.ReactNode }) {
  const { theme, language } = useAppStore()

  useEffect(() => {
    const root = document.documentElement

    // Apply theme class
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    // Apply RTL/LTR and lang
    root.setAttribute('lang', language)
    root.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr')
  }, [theme, language])

  return <>{children}</>
}
