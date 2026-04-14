'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore, type PageView } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Menu, BookOpen, Calendar, LogIn, UserPlus, LogOut,
  Home, LayoutDashboard, Atom, Moon, Sun, Globe
} from 'lucide-react'

export default function Navbar() {
  const {
    user, isAuthenticated, navigateTo, setNavigationTarget,
    setAuthModalOpen, setAuthModalTab, setUser,
    theme, toggleTheme, language, toggleLanguage
  } = useAppStore()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isAr = language === 'ar'

  const t = {
    home: isAr ? 'الرئيسية' : 'Home',
    hubs: isAr ? 'المعارض' : 'Pavilions',
    calendar: isAr ? 'التقويم' : 'Calendar',
    myDashboard: isAr ? 'لوحتي' : 'My Dashboard',
    publisherDashboard: isAr ? 'لوحة الناشر' : 'Publisher Dashboard',
    adminDashboard: isAr ? 'لوحة المسؤول' : 'Admin Panel',
    register: isAr ? 'تسجيل' : 'Register',
    login: isAr ? 'دخول' : 'Sign In',
    logout: isAr ? 'خروج' : 'Sign Out',
    title: isAr ? 'معرض مدينة زويل للكتاب' : 'Zewail City Book Fair',
    subtitle: isAr ? 'مركز المعرفة' : 'Knowledge Hub',
    langLabel: isAr ? 'EN' : 'AR',
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (page: PageView, target?: string) => {
    if (target) setNavigationTarget(target)
    navigateTo(page)
    // Always scroll to top when going home, even if already there
    if (page === 'home' && !target) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  const handleLogout = () => {
    setUser(null)
    navigateTo('home')
    setMobileOpen(false)
  }

  const navItems = (() => {
    if (!isAuthenticated || !user) return [
      { label: t.home, page: 'home' as PageView, icon: Home },
      { label: t.hubs, page: 'home' as PageView, icon: BookOpen, target: 'hubs-section' },
      { label: t.calendar, page: 'home' as PageView, icon: Calendar, target: 'calendar-section' },
    ]
    if (user.role === 'admin') return [
      { label: t.home, page: 'home' as PageView, icon: Home },
      { label: t.adminDashboard, page: 'admin-dashboard' as PageView, icon: LayoutDashboard },
      { label: t.hubs, page: 'home' as PageView, icon: BookOpen, target: 'hubs-section' },
      { label: t.calendar, page: 'home' as PageView, icon: Calendar, target: 'calendar-section' },
    ]
    if (user.role === 'publisher') return [
      { label: t.home, page: 'home' as PageView, icon: Home },
      { label: t.publisherDashboard, page: 'publisher-dashboard' as PageView, icon: LayoutDashboard },
      { label: t.hubs, page: 'home' as PageView, icon: BookOpen, target: 'hubs-section' },
      { label: t.calendar, page: 'home' as PageView, icon: Calendar, target: 'calendar-section' },
    ]
    return [
      { label: t.home, page: 'home' as PageView, icon: Home },
      { label: t.myDashboard, page: 'visitor-dashboard' as PageView, icon: LayoutDashboard },
      { label: t.hubs, page: 'home' as PageView, icon: BookOpen, target: 'hubs-section' },
      { label: t.calendar, page: 'home' as PageView, icon: Calendar, target: 'calendar-section' },
    ]
  })()

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'border-b border-zewail-blue/20 bg-white/90 dark:bg-[#060f1c]/90 backdrop-blur-2xl shadow-lg shadow-zewail-blue/5 dark:shadow-black/40'
          : 'border-b border-transparent bg-white/60 dark:bg-[#060f1c]/60 backdrop-blur-xl'
      }`}
    >
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ── Logo ── */}
        <motion.button
          onClick={() => handleNavClick('home')}
          className="group flex shrink-0 items-center gap-3"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-white shadow-lg shadow-zewail-blue/20 overflow-hidden border border-zewail-blue/20">
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
          <div className={`flex flex-col ${isAr ? 'items-end text-right' : 'items-start text-left'}`}>
            <span className="text-sm font-bold leading-tight text-zewail-navy dark:text-white sm:text-base">
              {t.title}
            </span>
            <span className="hidden text-[11px] font-semibold leading-tight text-zewail-blue sm:block">
              {t.subtitle}
            </span>
          </div>
        </motion.button>

        {/* ── Desktop Nav ── */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.button
                key={i}
                onClick={() => handleNavClick(item.page, item.target)}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -1 }}
                className="group relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium
                           text-zewail-navy/70 dark:text-white/70
                           hover:bg-zewail-blue/8 dark:hover:bg-white/8 hover:text-zewail-blue dark:hover:text-zewail-blue
                           transition-all duration-200"
              >
                <Icon className="size-4 shrink-0 transition-transform group-hover:scale-110" />
                {item.label}
                <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-zewail-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </motion.button>
            )
          })}

          {/* ── Preferences (Theme + Language) ── */}
          <div className="mx-2 flex h-8 items-center gap-0.5 rounded-full border border-zewail-blue/20 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-1">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? (isAr ? 'وضع نهاري' : 'Light Mode') : (isAr ? 'وضع ليلي' : 'Dark Mode')}
              className="flex size-6 items-center justify-center rounded-full text-zewail-navy/60 dark:text-white/60
                         hover:bg-zewail-blue hover:text-white dark:hover:bg-zewail-blue dark:hover:text-white
                         transition-all duration-200"
            >
              {theme === 'dark' ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
            </button>
            {/* Divider */}
            <span className="h-4 w-px bg-zewail-blue/20 dark:bg-white/10" />
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              title={isAr ? 'Switch to English' : 'التبديل للعربية'}
              className="flex h-6 items-center gap-0.5 rounded-full px-1.5 text-[11px] font-bold
                         text-zewail-navy/60 dark:text-white/60
                         hover:bg-zewail-blue hover:text-white dark:hover:bg-zewail-blue dark:hover:text-white
                         transition-all duration-200"
            >
              <Globe className="size-3 shrink-0" />
              {t.langLabel}
            </button>
          </div>

          {/* ── Auth area ── */}
          <AnimatePresence mode="wait">
            {isAuthenticated && user ? (
              <motion.div key="user" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}
                className="flex items-center gap-2 border-s border-zewail-blue/20 dark:border-white/10 ps-3">
                <Avatar className="size-8 border-2 border-zewail-blue/30">
                  <AvatarFallback className="bg-gradient-to-br from-zewail-blue/20 to-zewail-blue text-xs font-bold text-white">
                    {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-[110px]">
                  <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
                  <p className="text-[10px] text-muted-foreground capitalize">{user.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex size-7 items-center justify-center rounded-lg text-muted-foreground
                             hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-all"
                >
                  <LogOut className="size-3.5" />
                </button>
              </motion.div>
            ) : (
              <motion.div key="guest" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}
                className="flex items-center gap-2 border-s border-zewail-blue/20 dark:border-white/10 ps-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { setAuthModalTab('register'); setAuthModalOpen(true) }}
                  className="h-8 border-zewail-blue/30 text-zewail-navy dark:text-white dark:border-white/20
                             hover:border-zewail-blue hover:bg-zewail-blue/10 dark:hover:bg-zewail-blue/20 transition-all"
                >
                  <UserPlus className="me-1 size-3.5" />
                  {t.register}
                </Button>
                <Button
                  size="sm"
                  onClick={() => { setAuthModalTab('login'); setAuthModalOpen(true) }}
                  className="h-8 bg-gradient-to-r from-zewail-blue to-zewail-blue-dark text-white
                             hover:shadow-md hover:shadow-zewail-blue/30 transition-all"
                >
                  <LogIn className="me-1 size-3.5" />
                  {t.login}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* ── Mobile ── */}
        <div className="flex items-center gap-1 md:hidden">
          {/* Compact pref bar */}
          <div className="flex h-8 items-center gap-0 rounded-full border border-zewail-blue/20 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-1">
            <button
              onClick={toggleTheme}
              className="flex size-6 items-center justify-center rounded-full text-zewail-navy/60 dark:text-white/60
                         hover:bg-zewail-blue hover:text-white dark:hover:bg-zewail-blue dark:hover:text-white transition-all"
            >
              {theme === 'dark' ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
            </button>
            <span className="h-4 w-px bg-zewail-blue/20 dark:bg-white/10" />
            <button
              onClick={toggleLanguage}
              className="flex h-6 items-center gap-0.5 rounded-full px-1.5 text-[11px] font-bold
                         text-zewail-navy/60 dark:text-white/60
                         hover:bg-zewail-blue hover:text-white dark:hover:bg-zewail-blue dark:hover:text-white transition-all"
            >
              <Globe className="size-3 shrink-0" />
              {t.langLabel}
            </button>
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="size-9 text-foreground hover:bg-zewail-blue/10">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side={isAr ? 'left' : 'right'}
              className="w-80 border-zewail-blue/20 bg-background dark:bg-card"
            >
              <SheetHeader className="border-b border-border pb-4 mb-6">
                <SheetTitle className="flex items-center gap-2 text-foreground">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-zewail-blue to-zewail-blue-dark">
                    <Atom className="size-4 text-white" />
                  </div>
                  {t.title}
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-1">
                {navItems.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.button
                      key={i}
                      onClick={() => handleNavClick(item.page, item.target)}
                      initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium
                                 text-foreground/70 hover:bg-zewail-blue/10 hover:text-zewail-blue transition-all"
                    >
                      <Icon className="size-5 text-zewail-blue shrink-0" />
                      {item.label}
                    </motion.button>
                  )
                })}
              </div>

              <div className="absolute bottom-6 inset-x-4 space-y-2">
                {isAuthenticated && user ? (
                  <>
                    <div className="flex items-center gap-3 rounded-xl bg-muted p-3">
                      <Avatar className="size-9 border-2 border-zewail-blue/30">
                        <AvatarFallback className="bg-gradient-to-br from-zewail-blue/20 to-zewail-blue text-xs font-bold text-white">
                          {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={handleLogout}>
                      <LogOut className="me-2 size-4" /> {t.logout}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full border-zewail-blue/30 text-zewail-navy dark:text-white" onClick={() => { setAuthModalTab('register'); setAuthModalOpen(true); setMobileOpen(false) }}>
                      <UserPlus className="me-2 size-4" /> {t.register}
                    </Button>
                    <Button className="w-full bg-gradient-to-r from-zewail-blue to-zewail-blue-dark text-white" onClick={() => { setAuthModalTab('login'); setAuthModalOpen(true); setMobileOpen(false) }}>
                      <LogIn className="me-2 size-4" /> {t.login}
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
