'use client'

import { useState } from 'react'
import { useAppStore, type PageView } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Menu, BookOpen, Calendar, LogIn, UserPlus, LogOut, Home, LayoutDashboard, Atom } from 'lucide-react'

export default function Navbar() {
  const { user, isAuthenticated, navigateTo, setAuthModalOpen, setAuthModalTab, setUser } = useAppStore()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNavClick = (page: PageView) => {
    navigateTo(page)
    setMobileOpen(false)
  }

  const handleRegister = () => {
    setAuthModalTab('register')
    setAuthModalOpen(true)
    setMobileOpen(false)
  }

  const handleLogin = () => {
    setAuthModalTab('login')
    setAuthModalOpen(true)
    setMobileOpen(false)
  }

  const handleLogout = () => {
    setUser(null)
    navigateTo('home')
    setMobileOpen(false)
  }

  const getNavItems = () => {
    if (!isAuthenticated || !user) {
      return [
        { label: 'Home', page: 'home' as PageView, icon: Home },
        { label: 'Pavilions', page: 'home' as PageView, icon: BookOpen },
        { label: 'Calendar', page: 'home' as PageView, icon: Calendar },
      ]
    }
    if (user.role === 'publisher') {
      return [
        { label: 'Home', page: 'home' as PageView, icon: Home },
        { label: 'Publisher Dashboard', page: 'publisher-dashboard' as PageView, icon: LayoutDashboard },
        { label: 'Pavilions', page: 'home' as PageView, icon: BookOpen },
        { label: 'Calendar', page: 'home' as PageView, icon: Calendar },
      ]
    }
    return [
      { label: 'Home', page: 'home' as PageView, icon: Home },
      { label: 'My Dashboard', page: 'visitor-dashboard' as PageView, icon: LayoutDashboard },
      { label: 'Pavilions', page: 'home' as PageView, icon: BookOpen },
      { label: 'Calendar', page: 'home' as PageView, icon: Calendar },
    ]
  }

  const navItems = getNavItems()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zewail-teal/20 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <div className="relative flex size-9 items-center justify-center rounded-lg bg-zewail-teal">
            <Atom className="size-5 text-white transition-transform group-hover:rotate-180 duration-500" />
            <div className="absolute -bottom-0.5 -right-0.5">
              <svg width="8" height="8" viewBox="0 0 10 10" className="text-zewail-gold">
                <polygon points="5,1 9,9 1,9" fill="currentColor" />
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight text-zewail-navy sm:text-base">
              Zewail Digital Book Pavilions
            </span>
            <span className="hidden text-[10px] leading-tight text-zewail-teal sm:block">
              Powered by IEEE Zewail City
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.page)}
                className="group relative flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-zewail-navy/70 transition-colors hover:bg-zewail-teal/10 hover:text-zewail-teal"
              >
                <Icon className="size-4 transition-transform group-hover:scale-110" />
                {item.label}
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-zewail-teal transition-all group-hover:w-3/4" />
              </button>
            )
          })}

          {isAuthenticated && user ? (
            <div className="ml-2 flex items-center gap-2">
              <Avatar className="size-8 border-2 border-zewail-teal/30">
                <AvatarFallback className="bg-zewail-teal/10 text-xs font-semibold text-zewail-teal">
                  {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="max-w-[100px] truncate text-sm font-medium text-zewail-navy">
                {user.name}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="ml-1 text-zewail-navy/40 hover:text-red-500"
              >
                <LogOut className="size-4" />
              </Button>
            </div>
          ) : (
            <div className="ml-2 flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRegister}
                className="border-zewail-teal text-zewail-teal hover:bg-zewail-teal hover:text-white"
              >
                <UserPlus className="size-4" />
                Register
              </Button>
              <Button
                size="sm"
                onClick={handleLogin}
                className="bg-zewail-navy text-white hover:bg-zewail-navy-light"
              >
                <LogIn className="size-4" />
                Login
              </Button>
            </div>
          )}
        </nav>

        {/* IEEE Badge (Desktop) */}
        <Badge
          variant="outline"
          className="absolute right-4 top-1.5 hidden rounded-full border-zewail-teal/20 bg-zewail-teal/5 px-2 py-0 text-[10px] text-zewail-teal xl:flex"
        >
          IEEE Zewail City
        </Badge>

        {/* Mobile Navigation */}
        <div className="flex items-center md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-zewail-navy">
                <Menu className="size-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-zewail-navy">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-zewail-teal">
                    <Atom className="size-4 text-white" />
                  </div>
                  Zewail Digital Book Pavilions
                </SheetTitle>
              </SheetHeader>

              <div className="mt-4 flex flex-col gap-1 px-4">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleNavClick(item.page)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zewail-navy transition-colors hover:bg-zewail-teal/10"
                    >
                      <Icon className="size-4 text-zewail-teal" />
                      {item.label}
                    </button>
                  )
                })}

                <div className="my-2 border-t border-zewail-teal/10" />

                {isAuthenticated && user ? (
                  <>
                    <div className="flex items-center gap-3 rounded-lg px-3 py-2.5">
                      <Avatar className="size-8 border-2 border-zewail-teal/30">
                        <AvatarFallback className="bg-zewail-teal/10 text-xs font-semibold text-zewail-teal">
                          {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-zewail-navy">{user.name}</span>
                        <span className="text-xs text-zewail-navy/40">{user.email}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                    >
                      <LogOut className="size-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleRegister}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zewail-teal transition-colors hover:bg-zewail-teal/10"
                    >
                      <UserPlus className="size-4" />
                      Register as Visitor
                    </button>
                    <button
                      onClick={handleLogin}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zewail-navy transition-colors hover:bg-zewail-navy/5"
                    >
                      <LogIn className="size-4" />
                      Login
                    </button>
                  </>
                )}
              </div>

              <div className="mt-auto px-4 pb-4">
                <Badge
                  variant="outline"
                  className="rounded-full border-zewail-teal/20 bg-zewail-teal/5 px-3 py-1 text-xs text-zewail-teal"
                >
                  Powered by IEEE Zewail City
                </Badge>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
