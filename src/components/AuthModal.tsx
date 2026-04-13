'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Atom, LogIn, UserPlus, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'

const PUBLISHERS = [
  { id: 'general-egyptian', name: 'General Egyptian Book Organization' },
  { id: 'dar-al-maaref', name: 'Dar Al-Maaref' },
  { id: 'national-library', name: 'National Library and Archives' },
  { id: 'al-ahram', name: 'Al-Ahram' },
]

export default function AuthModal() {
  const { authModalOpen, setAuthModalOpen, authModalTab, setAuthModalTab, setUser } = useAppStore()

  // Login state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [isPublisherLogin, setIsPublisherLogin] = useState(false)
  const [selectedPublisher, setSelectedPublisher] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [showLoginPassword, setShowLoginPassword] = useState(false)

  // Register state
  const [registerName, setRegisterName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('')
  const [registerLoading, setRegisterLoading] = useState(false)
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)

  const resetForms = () => {
    setLoginEmail('')
    setLoginPassword('')
    setIsPublisherLogin(false)
    setSelectedPublisher('')
    setLoginLoading(false)
    setShowLoginPassword(false)
    setRegisterName('')
    setRegisterEmail('')
    setRegisterPassword('')
    setRegisterConfirmPassword('')
    setRegisterLoading(false)
    setShowRegisterPassword(false)
  }

  const handleClose = (open: boolean) => {
    setAuthModalOpen(open)
    if (!open) {
      resetForms()
    }
  }

  const handleTabChange = (tab: string) => {
    setAuthModalTab(tab as 'login' | 'register')
    resetForms()
  }

  // Login validation
  const validateLogin = (): string | null => {
    if (!loginEmail.trim()) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail)) return 'Please enter a valid email'
    if (!loginPassword.trim()) return 'Password is required'
    if (isPublisherLogin && !selectedPublisher) return 'Please select a publisher'
    return null
  }

  // Register validation
  const validateRegister = (): string | null => {
    if (!registerName.trim()) return 'Name is required'
    if (!registerEmail.trim()) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerEmail)) return 'Please enter a valid email'
    if (!registerPassword.trim()) return 'Password is required'
    if (registerPassword.length < 6) return 'Password must be at least 6 characters'
    if (registerPassword !== registerConfirmPassword) return 'Passwords do not match'
    return null
  }

  const handleLogin = async () => {
    const error = validateLogin()
    if (error) {
      toast.error(error)
      return
    }

    setLoginLoading(true)

    try {
      const endpoint = isPublisherLogin ? '/api/auth/publisher-login' : '/api/auth/login'
      const body = isPublisherLogin
        ? { email: loginEmail, password: loginPassword, publisherId: selectedPublisher }
        : { email: loginEmail, password: loginPassword }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Login failed')
      }

      setUser(data.user)
      setAuthModalOpen(false)
      resetForms()
      toast.success(`Welcome back, ${data.user.name}!`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Login failed. Please try again.')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleRegister = async () => {
    const error = validateRegister()
    if (error) {
      toast.error(error)
      return
    }

    setRegisterLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          password: registerPassword,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      setUser(data.user)
      setAuthModalOpen(false)
      resetForms()
      toast.success(`Welcome, ${data.user.name}! Your account has been created.`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Registration failed. Please try again.')
    } finally {
      setRegisterLoading(false)
    }
  }

  const handleLoginKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin()
  }

  const handleRegisterKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleRegister()
  }

  return (
    <Dialog open={authModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-zewail-navy">
            <div className="flex size-8 items-center justify-center rounded-lg bg-zewail-navy">
              <Atom className="size-4 text-zewail-blue" />
            </div>
            Zewail Digital Book Pavilions
          </DialogTitle>
          <DialogDescription>
            Sign in to access your dashboard or create a new account.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={authModalTab} onValueChange={handleTabChange}>
          <TabsList className="w-full">
            <TabsTrigger value="login" className="flex-1 gap-1.5">
              <LogIn className="size-3.5" />
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="flex-1 gap-1.5">
              <UserPlus className="size-3.5" />
              Register
            </TabsTrigger>
          </TabsList>

          {/* Login Form */}
          <TabsContent value="login" className="mt-4">
            <div className="flex flex-col gap-4" onKeyDown={handleLoginKeyDown}>
              <div className="flex flex-col gap-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="border-zewail-blue/30 focus-visible:border-zewail-blue focus-visible:ring-zewail-blue/20"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="login-password">Password</Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showLoginPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="pr-10 border-zewail-blue/30 focus-visible:border-zewail-blue focus-visible:ring-zewail-blue/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showLoginPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {/* Publisher Login Toggle */}
              <div className="flex items-center gap-3 rounded-lg border border-zewail-blue/20 bg-zewail-blue/5 p-3">
                <Switch
                  id="publisher-toggle"
                  checked={isPublisherLogin}
                  onCheckedChange={setIsPublisherLogin}
                  className="data-[state=checked]:bg-zewail-blue"
                />
                <Label htmlFor="publisher-toggle" className="cursor-pointer text-sm">
                  Publisher Login
                </Label>
              </div>

              {isPublisherLogin && (
                <div className="flex flex-col gap-2 animate-fade-in-up">
                  <Label htmlFor="publisher-select">Select Publisher</Label>
                  <Select value={selectedPublisher} onValueChange={setSelectedPublisher}>
                    <SelectTrigger
                      id="publisher-select"
                      className="w-full border-zewail-blue/30 focus:ring-zewail-blue/20"
                    >
                      <SelectValue placeholder="Choose your publisher..." />
                    </SelectTrigger>
                    <SelectContent>
                      {PUBLISHERS.map((pub) => (
                        <SelectItem key={pub.id} value={pub.id}>
                          {pub.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <Button
                onClick={handleLogin}
                disabled={loginLoading}
                className="mt-2 bg-zewail-navy text-white hover:bg-zewail-navy-light"
              >
                {loginLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing in...
                  </div>
                ) : (
                  <>
                    <LogIn className="size-4" />
                    Sign In
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          {/* Register Form */}
          <TabsContent value="register" className="mt-4">
            <div className="flex flex-col gap-4" onKeyDown={handleRegisterKeyDown}>
              <div className="flex flex-col gap-2">
                <Label htmlFor="register-name">Full Name</Label>
                <Input
                  id="register-name"
                  type="text"
                  placeholder="Ahmed Zewail"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className="border-zewail-blue/30 focus-visible:border-zewail-blue focus-visible:ring-zewail-blue/20"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="your@email.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="border-zewail-blue/30 focus-visible:border-zewail-blue focus-visible:ring-zewail-blue/20"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="register-password">Password</Label>
                <div className="relative">
                  <Input
                    id="register-password"
                    type={showRegisterPassword ? 'text' : 'password'}
                    placeholder="At least 6 characters"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="pr-10 border-zewail-blue/30 focus-visible:border-zewail-blue focus-visible:ring-zewail-blue/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showRegisterPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="register-confirm-password">Confirm Password</Label>
                <Input
                  id="register-confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  className="border-zewail-blue/30 focus-visible:border-zewail-blue focus-visible:ring-zewail-blue/20"
                />
              </div>

              <Button
                onClick={handleRegister}
                disabled={registerLoading}
                className="mt-2 bg-zewail-blue text-zewail-navy hover:bg-zewail-blue/80"
              >
                {registerLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="size-4 animate-spin rounded-full border-2 border-zewail-navy/30 border-t-zewail-navy" />
                    Creating account...
                  </div>
                ) : (
                  <>
                    <UserPlus className="size-4" />
                    Create Account
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
