'use client'

import { useState, useCallback } from 'react'
import { useAppStore } from '@/lib/store'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Atom, LogIn, UserPlus, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

const PUBLISHER_LIST = [
  { id: 'general-egyptian', name: 'General Egyptian Book Organization', nameAr: 'الهيئة المصرية العامة للكتاب' },
  { id: 'dar-al-maaref',    name: 'Dar Al-Maaref',                     nameAr: 'دار المعارف' },
  { id: 'national-library', name: 'National Library and Archives',      nameAr: 'دار الكتب والوثائق القومية' },
  { id: 'al-ahram',         name: 'Al-Ahram Publishing',               nameAr: 'دار الأهرام للنشر' },
]

export default function AuthModal() {
  const { authModalOpen, setAuthModalOpen, authModalTab, setAuthModalTab, setUser, language, navigateTo } = useAppStore()
  const isAr = language === 'ar'

  const t = {
    title:           isAr ? 'معرض مدينة زويل للكتاب' : 'Zewail City Book Fair',
    desc:            isAr ? 'سجل الدخول للوصول إلى لوحتك أو أنشئ حساباً جديداً.' : 'Sign in to access your dashboard or create a new account.',
    loginTab:        isAr ? 'تسجيل الدخول' : 'Sign In',
    registerTab:     isAr ? 'إنشاء حساب'   : 'Register',
    email:           isAr ? 'البريد الإلكتروني' : 'Email',
    password:        isAr ? 'كلمة المرور'      : 'Password',
    confirmPassword: isAr ? 'تأكيد كلمة المرور' : 'Confirm Password',
    fullName:        isAr ? 'الاسم الكامل'     : 'Full Name',
    publisherLogin:  isAr ? 'دخول الناشر'      : 'Publisher Login',
    selectPublisher: isAr ? 'اختر الناشر...'   : 'Choose your publisher...',
    publisherLabel:  isAr ? 'الناشر'           : 'Publisher',
    signIn:          isAr ? 'دخول'             : 'Sign In',
    signingIn:       isAr ? 'جارٍ الدخول...'   : 'Signing in...',
    createAccount:   isAr ? 'إنشاء الحساب'     : 'Create Account',
    creatingAccount: isAr ? 'جارٍ الإنشاء...'  : 'Creating account...',
    demoHint:        isAr
      ? '💡 للتجربة: visitor@gmail.com / VisitorPassword2026!'
      : '💡 Demo: visitor@gmail.com / VisitorPassword2026!',
    namePlaceholder: isAr ? 'أحمد علي' : 'Ahmed Ali',
    pwdMinHint:      isAr ? '٦ أحرف على الأقل' : 'At least 6 characters',
  }

  // ── Login state ──────────────────────────────────────
  const [loginEmail,      setLoginEmail]      = useState('')
  const [loginPassword,   setLoginPassword]   = useState('')
  const [loginLoading,    setLoginLoading]    = useState(false)
  const [showLoginPwd,    setShowLoginPwd]    = useState(false)

  // ── Register state ───────────────────────────────────
  const [regName,     setRegName]     = useState('')
  const [regEmail,    setRegEmail]    = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirm,  setRegConfirm]  = useState('')
  const [regLoading,  setRegLoading]  = useState(false)
  const [showRegPwd,  setShowRegPwd]  = useState(false)

  const reset = useCallback(() => {
    setLoginEmail(''); setLoginPassword('')
    setLoginLoading(false); setShowLoginPwd(false)
    setRegName(''); setRegEmail(''); setRegPassword(''); setRegConfirm('')
    setRegLoading(false); setShowRegPwd(false)
  }, [])

  const handleClose = (open: boolean) => { setAuthModalOpen(open); if (!open) reset() }
  const handleTabChange = (tab: string) => { setAuthModalTab(tab as 'login' | 'register'); reset() }

  const validateLogin = () => {
    if (!loginEmail.trim())    return isAr ? 'البريد الإلكتروني مطلوب' : 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail)) return isAr ? 'بريد إلكتروني غير صحيح' : 'Enter a valid email'
    if (!loginPassword.trim()) return isAr ? 'كلمة المرور مطلوبة'      : 'Password is required'
    return null
  }
  const validateRegister = () => {
    if (!regName.trim())    return isAr ? 'الاسم مطلوب'   : 'Name is required'
    if (!regEmail.trim())   return isAr ? 'البريد الإلكتروني مطلوب' : 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail)) return isAr ? 'بريد إلكتروني غير صحيح' : 'Enter a valid email'
    if (!regPassword.trim()) return isAr ? 'كلمة المرور مطلوبة' : 'Password is required'
    if (regPassword.length < 6) return isAr ? 'كلمة المرور 6 أحرف على الأقل' : 'Password must be at least 6 characters'
    if (regPassword !== regConfirm) return isAr ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match'
    return null
  }

  const handleLogin = async () => {
    const err = validateLogin(); if (err) { toast.error(err); return }
    setLoginLoading(true)
    try {
      const endpoint = '/api/auth/login'
      const body = { email: loginEmail, password: loginPassword }
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      let data: { user?: { name: string }; error?: string }
      try { data = await res.json() } catch { throw new Error(isAr ? 'خطأ في الاتصال بالخادم' : 'Server connection error. Please try again.') }
      if (!res.ok) throw new Error(data.error || (isAr ? 'فشل تسجيل الدخول' : 'Login failed'))
      const loggedUser = data.user as Parameters<typeof setUser>[0]
      setUser(loggedUser)
      setAuthModalOpen(false); reset()
      toast.success(isAr ? `مرحباً، ${loggedUser?.name}!` : `Welcome back, ${loggedUser?.name}!`)
      // Role-based redirect
      if (loggedUser?.role === 'admin') navigateTo('admin-dashboard')
      else if (loggedUser?.role === 'publisher') navigateTo('publisher-dashboard')
      else navigateTo('visitor-dashboard')
    } catch (e) {
      toast.error(e instanceof Error ? e.message : (isAr ? 'فشل تسجيل الدخول' : 'Login failed. Please try again.'))
    } finally { setLoginLoading(false) }
  }

  const handleRegister = async () => {
    const err = validateRegister(); if (err) { toast.error(err); return }
    setRegLoading(true)
    try {
      const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: regName, email: regEmail, password: regPassword }) })
      let data: { user?: { name: string }; error?: string }
      try { data = await res.json() } catch { throw new Error(isAr ? 'خطأ في الاتصال بالخادم' : 'Server connection error. Please try again.') }
      if (!res.ok) throw new Error(data.error || (isAr ? 'فشل إنشاء الحساب' : 'Registration failed'))
      const newUser = data.user as Parameters<typeof setUser>[0]
      setUser(newUser)
      setAuthModalOpen(false); reset()
      toast.success(isAr ? `مرحباً، ${newUser?.name}! تم إنشاء حسابك.` : `Welcome, ${newUser?.name}! Your account has been created.`)
      navigateTo('visitor-dashboard')
    } catch (e) {
      toast.error(e instanceof Error ? e.message : (isAr ? 'فشل إنشاء الحساب' : 'Registration failed. Please try again.'))
    } finally { setRegLoading(false) }
  }

  const inputBase = "bg-background border-border focus-visible:border-zewail-blue focus-visible:ring-zewail-blue/20 text-foreground placeholder:text-muted-foreground"

  const Spinner = () => (
    <div className="me-2 size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
  )

  return (
    <Dialog open={authModalOpen} onOpenChange={handleClose}>
      <DialogContent className={`sm:max-w-md bg-background text-foreground border-border ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
        <DialogHeader className={isAr ? 'text-right sm:text-right' : ''}>
          <DialogTitle className="flex items-center justify-start gap-2 text-foreground">
            <div className="flex size-8 p-1 items-center justify-center rounded-lg bg-white border border-border shadow-sm">
              <img src="/zewail-logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            {t.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">{t.desc}</DialogDescription>
        </DialogHeader>

        {/* Demo hint */}
        <div className="flex items-start gap-2 rounded-lg bg-zewail-blue/8 dark:bg-zewail-blue/10 border border-zewail-blue/20 px-3 py-2.5">
          <AlertCircle className="size-4 text-zewail-blue shrink-0 mt-0.5" />
          <p className="text-xs text-zewail-navy/70 dark:text-white/60 font-medium">{t.demoHint}</p>
        </div>

        <Tabs value={authModalTab} onValueChange={handleTabChange}>
          <TabsList className="w-full bg-muted">
            <TabsTrigger value="login"    className="flex-1 gap-1.5 data-[state=active]:bg-background data-[state=active]:text-foreground">
              <LogIn className="size-3.5" /> {t.loginTab}
            </TabsTrigger>
            <TabsTrigger value="register" className="flex-1 gap-1.5 data-[state=active]:bg-background data-[state=active]:text-foreground">
              <UserPlus className="size-3.5" /> {t.registerTab}
            </TabsTrigger>
          </TabsList>

          {/* ══════════════ LOGIN ══════════════ */}
          <TabsContent value="login" className="mt-4 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="l-email" className={`text-foreground ${isAr ? 'block w-full text-right' : ''}`}>{t.email}</Label>
              <Input id="l-email" type="email" placeholder="your@email.com"
                className={`${inputBase} ${isAr ? 'text-right' : ''}`} value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="l-pwd" className={`text-foreground ${isAr ? 'block w-full text-right' : ''}`}>{t.password}</Label>
              <div className="relative">
                <Input id="l-pwd" type={showLoginPwd ? 'text' : 'password'} placeholder="••••••••"
                  className={`${inputBase} ${isAr ? 'text-right pl-10' : 'pr-10'}`} value={loginPassword} onChange={e => setLoginPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()} />
                <button type="button" onClick={() => setShowLoginPwd(v => !v)}
                  className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground ${isAr ? 'left-3' : 'right-3'}`}>
                  {showLoginPwd ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>



            <Button onClick={handleLogin} disabled={loginLoading}
              className="w-full bg-zewail-navy dark:bg-zewail-blue text-white hover:bg-zewail-navy/90 dark:hover:bg-zewail-blue-dark">
              {loginLoading ? <><Spinner />{t.signingIn}</> : <><LogIn className="me-2 size-4" />{t.signIn}</>}
            </Button>
          </TabsContent>

          {/* ══════════════ REGISTER ══════════════ */}
          <TabsContent value="register" className="mt-4 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="r-name" className={`text-foreground ${isAr ? 'block w-full text-right' : ''}`}>{t.fullName}</Label>
              <Input id="r-name" placeholder={t.namePlaceholder}
                className={`${inputBase} ${isAr ? 'text-right' : ''}`} value={regName} onChange={e => setRegName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleRegister()} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="r-email" className={`text-foreground ${isAr ? 'block w-full text-right' : ''}`}>{t.email}</Label>
              <Input id="r-email" type="email" placeholder="your@email.com"
                className={`${inputBase} ${isAr ? 'text-right' : ''}`} value={regEmail} onChange={e => setRegEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleRegister()} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="r-pwd" className={`text-foreground ${isAr ? 'block w-full text-right' : ''}`}>{t.password}</Label>
              <div className="relative">
                <Input id="r-pwd" type={showRegPwd ? 'text' : 'password'} placeholder={t.pwdMinHint}
                  className={`${inputBase} ${isAr ? 'text-right pl-10' : 'pr-10'}`} value={regPassword} onChange={e => setRegPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleRegister()} />
                <button type="button" onClick={() => setShowRegPwd(v => !v)}
                  className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground ${isAr ? 'left-3' : 'right-3'}`}>
                  {showRegPwd ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="r-confirm" className={`text-foreground ${isAr ? 'block w-full text-right' : ''}`}>{t.confirmPassword}</Label>
              <div className="relative">
                <Input id="r-confirm" type={showRegPwd ? 'text' : 'password'} placeholder="••••••••"
                  className={`${inputBase} ${isAr ? 'text-right pl-10' : 'pr-10'}`} value={regConfirm} onChange={e => setRegConfirm(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleRegister()} />
              </div>
            </div>

            <Button onClick={handleRegister} disabled={regLoading}
              className="w-full bg-gradient-to-r from-zewail-blue to-zewail-blue-dark text-white hover:shadow-md hover:shadow-zewail-blue/30">
              {regLoading ? <><Spinner />{t.creatingAccount}</> : <><UserPlus className="me-2 size-4" />{t.createAccount}</>}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
