'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users, BookOpen, BarChart3, TrendingUp, ShieldCheck, Trash2, Edit,
  Home, Sparkles, AlertTriangle, CheckCircle2, RefreshCw, Settings,
  Activity, Database, Crown, Building2, Search, X, Save
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

type Tab = 'users' | 'books' | 'publishers' | 'system'

interface ApiUser { id: string; name: string; email: string; role: string; publisherId: string | null; createdAt: string }
interface ApiBook { id: string; title: string; author: string; genre: string; language: string; year: number; readCount: number; fileUrl: string; publisher: { name: string; id: string } }
interface ApiPublisher { id: string; name: string; slug: string; tagline: string; books: { id: string; readCount: number }[] }

export default function AdminDashboard() {
  const { navigateTo, language } = useAppStore()
  const isAr = language === 'ar'

  const [users, setUsers]         = useState<ApiUser[]>([])
  const [books, setBooks]         = useState<ApiBook[]>([])
  const [publishers, setPublishers] = useState<ApiPublisher[]>([])
  const [loading, setLoading]     = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('users')
  const [userSearch, setUserSearch] = useState('')
  const [bookSearch, setBookSearch] = useState('')
  const [userRoleFilter, setUserRoleFilter] = useState<'all'|'visitor'|'publisher'|'admin'>('all')

  // Edit user
  const [editUser, setEditUser] = useState<ApiUser | null>(null)
  const [editRole, setEditRole] = useState('')
  // Edit book
  const [editBook, setEditBook] = useState<ApiBook | null>(null)
  const [editBookForm, setEditBookForm] = useState({ title: '', author: '', genre: '', year: '' })
  // Delete confirms
  const [delUser, setDelUser] = useState<ApiUser | null>(null)
  const [delBook, setDelBook] = useState<ApiBook | null>(null)

  const t = {
    home: isAr ? 'الرئيسية' : 'Back to Home',
    title: isAr ? 'لوحة تحكم المسؤول' : 'Admin Control Panel',
    subtitle: isAr ? 'إدارة كاملة للمستخدمين والكتب والناشرين والنظام' : 'Full control over users, books, publishers & system',
    tabs: { users: isAr ? 'المستخدمون' : 'Users', books: isAr ? 'الكتب' : 'Books', publishers: isAr ? 'الناشرون' : 'Publishers', system: isAr ? 'النظام' : 'System' },
    refresh: isAr ? 'تحديث' : 'Refresh',
    search: isAr ? 'بحث...' : 'Search...',
    roles: { all: isAr ? 'الكل' : 'All', visitor: isAr ? 'زائر' : 'Visitor', publisher: isAr ? 'ناشر' : 'Publisher', admin: isAr ? 'مسؤول' : 'Admin' },
    col: {
      name: isAr ? 'الاسم' : 'Name', email: isAr ? 'البريد' : 'Email', role: isAr ? 'الدور' : 'Role',
      joined: isAr ? 'انضم' : 'Joined', actions: isAr ? 'إجراءات' : 'Actions',
      title: isAr ? 'العنوان' : 'Title', author: isAr ? 'المؤلف' : 'Author',
      publisher: isAr ? 'الناشر' : 'Publisher', reads: isAr ? 'القراءات' : 'Reads', year: isAr ? 'السنة' : 'Year',
      books: isAr ? 'الكتب' : 'Books', totalReads: isAr ? 'إجمالي القراءات' : 'Total Reads',
    },
    editUser: isAr ? 'تعديل المستخدم' : 'Edit User',
    editBook: isAr ? 'تعديل الكتاب' : 'Edit Book',
    save: isAr ? 'حفظ' : 'Save',
    del: isAr ? 'حذف' : 'Delete',
    cancel: isAr ? 'إلغاء' : 'Cancel',
    confirmDel: (n: string) => isAr ? `هل تريد حذف "${n}" نهائياً؟` : `Permanently delete "${n}"?`,
    aiInsight: isAr ? 'رؤية الذكاء الاصطناعي' : 'AI Platform Insight',
    aiText: isAr ? 'معدل القراءة ارتفع ٢٣٪ هذا الأسبوع. أكثر الكتب تفاعلاً: تاريخ مصر الحديث.' : 'Reading rate up 23% this week. Most engaged: Modern Egypt History series.',
    sysTitles: { uptime: isAr ? 'وقت التشغيل' : 'Uptime', db: isAr ? 'قاعدة البيانات' : 'Database', api: isAr ? 'طلبات API اليوم' : 'API Calls Today' },
    noBooks: isAr ? 'لا توجد كتب' : 'No books found',
    noUsers: isAr ? 'لا يوجد مستخدمون' : 'No users found',
  }

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [uRes, bRes, pRes] = await Promise.all([
        fetch('/api/admin/users'), fetch('/api/books'), fetch('/api/admin/publishers'),
      ])
      if (uRes.ok) { const d = await uRes.json(); setUsers(d.users || []) }
      if (bRes.ok) { const d = await bRes.json(); setBooks(d.books || []) }
      if (pRes.ok) { const d = await pRes.json(); setPublishers(d.publishers || []) }
    } catch { toast.error(isAr ? 'فشل تحميل البيانات' : 'Failed to load data') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchAll() }, [])

  // ── User ops ──
  const saveUserRole = async () => {
    if (!editUser || !editRole) return
    const res = await fetch(`/api/admin/users/${editUser.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ role: editRole }) })
    if (res.ok) {
      setUsers(prev => prev.map(u => u.id === editUser.id ? { ...u, role: editRole } : u))
      toast.success(isAr ? 'تم تحديث الدور' : 'Role updated')
      setEditUser(null)
    } else { toast.error(isAr ? 'فشل التحديث' : 'Update failed') }
  }

  const deleteUser = async () => {
    if (!delUser) return
    const res = await fetch(`/api/admin/users/${delUser.id}`, { method: 'DELETE' })
    if (res.ok) { setUsers(prev => prev.filter(u => u.id !== delUser.id)); toast.success(isAr ? 'تم الحذف' : 'Deleted'); setDelUser(null) }
    else toast.error(isAr ? 'فشل الحذف' : 'Delete failed')
  }

  // ── Book ops ──
  const saveBook = async () => {
    if (!editBook) return
    const res = await fetch(`/api/books/${editBook.id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editBookForm.title, author: editBookForm.author, genre: editBookForm.genre, year: editBookForm.year }),
    })
    if (res.ok) {
      const { book } = await res.json()
      setBooks(prev => prev.map(b => b.id === editBook.id ? { ...b, ...book } : b))
      toast.success(isAr ? 'تم تحديث الكتاب' : 'Book updated')
      setEditBook(null)
    } else toast.error(isAr ? 'فشل التحديث' : 'Update failed')
  }

  const deleteBook = async () => {
    if (!delBook) return
    const res = await fetch(`/api/books/${delBook.id}`, { method: 'DELETE' })
    if (res.ok) { setBooks(prev => prev.filter(b => b.id !== delBook.id)); toast.success(isAr ? 'تم حذف الكتاب' : 'Book deleted'); setDelBook(null) }
    else toast.error(isAr ? 'فشل الحذف' : 'Delete failed')
  }

  const roleBadge = (role: string) => {
    const map: Record<string,string> = { admin: 'bg-purple-500/10 text-purple-500', publisher: 'bg-zewail-blue/10 text-zewail-blue', visitor: 'bg-emerald-500/10 text-emerald-600' }
    const labs: Record<string,string> = { admin: t.roles.admin, publisher: t.roles.publisher, visitor: t.roles.visitor }
    return <Badge className={`${map[role]||''} border-none text-xs`}>{labs[role]||role}</Badge>
  }

  const filteredUsers = users.filter(u => {
    const r = userRoleFilter === 'all' || u.role === userRoleFilter
    const s = !userSearch || u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase())
    return r && s
  })
  const filteredBooks = books.filter(b => !bookSearch || b.title.toLowerCase().includes(bookSearch.toLowerCase()) || b.author.toLowerCase().includes(bookSearch.toLowerCase()))

  const inputCls = "bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:border-zewail-blue h-9 text-sm"

  return (
    <div className="min-h-screen bg-background" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between mb-8">
          <div>
            <Button variant="ghost" size="sm" onClick={() => navigateTo('home')}
              className="text-muted-foreground hover:text-foreground mb-2 flex items-center gap-1">
              <Home className="h-4 w-4" /> {t.home}
            </Button>
            <div className="flex items-center gap-3 mb-1">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-purple-500/10">
                <Crown className="h-5 w-5 text-purple-500" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
            </div>
            <p className="text-muted-foreground ps-12">{t.subtitle}</p>
          </div>
          <Button onClick={fetchAll} variant="outline" size="sm" className="border-border text-muted-foreground hover:text-foreground flex items-center gap-2">
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> {t.refresh}
          </Button>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: isAr ? 'المستخدمون' : 'Users', value: users.length, icon: <Users className="h-5 w-5 text-purple-500" />, bg: 'bg-purple-500/10' },
            { label: isAr ? 'الكتب' : 'Books', value: books.length, icon: <BookOpen className="h-5 w-5 text-zewail-blue" />, bg: 'bg-zewail-blue/10' },
            { label: isAr ? 'الناشرون' : 'Publishers', value: publishers.length, icon: <Building2 className="h-5 w-5 text-amber-500" />, bg: 'bg-amber-500/10' },
            { label: isAr ? 'إجمالي القراءات' : 'Total Reads', value: books.reduce((s,b) => s + b.readCount, 0).toLocaleString(), icon: <BarChart3 className="h-5 w-5 text-emerald-500" />, bg: 'bg-emerald-500/10' },
          ].map(m => (
            <div key={m.label} className="bg-card rounded-2xl border border-border p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-xl ${m.bg}`}>{m.icon}</div>
                <span className="text-sm text-muted-foreground">{m.label}</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{m.value}</p>
            </div>
          ))}
        </div>

        {/* AI Insight */}
        <div className="mb-6 p-4 rounded-2xl border border-purple-500/20 bg-purple-500/5 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10 shrink-0"><Sparkles className="h-5 w-5 text-purple-500" /></div>
          <div>
            <p className="text-sm font-bold text-foreground mb-0.5">{t.aiInsight}</p>
            <p className="text-sm text-muted-foreground">{t.aiText}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 bg-muted rounded-xl w-fit">
          {(['users','books','publishers','system'] as Tab[]).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === tab ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
              {t.tabs[tab]}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* ── USERS ── */}
          {activeTab === 'users' && (
            <motion.div key="users" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="flex gap-3 mb-4 flex-wrap">
                <div className="relative flex-1 min-w-48">
                  <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder={t.search} value={userSearch} onChange={e => setUserSearch(e.target.value)} className={`${inputCls} ps-9`} />
                </div>
                <div className="flex gap-1.5">
                  {(['all','visitor','publisher','admin'] as const).map(r => (
                    <button key={r} onClick={() => setUserRoleFilter(r)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${userRoleFilter === r ? 'bg-purple-500 text-white' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>
                      {t.roles[r]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="p-5 border-b border-border flex items-center justify-between">
                  <h2 className="font-semibold text-foreground flex items-center gap-2"><Users className="h-4 w-4 text-purple-500" />{t.tabs.users} ({filteredUsers.length})</h2>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border">
                        {[t.col.name, t.col.email, t.col.role, t.col.joined, t.col.actions].map(h => (
                          <TableHead key={h} className="text-muted-foreground font-semibold">{h}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map(u => (
                        <TableRow key={u.id} className="border-border hover:bg-muted/20">
                          <TableCell>
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zewail-blue to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">{u.name.charAt(0)}</div>
                              <span className="font-medium text-foreground text-sm">{u.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm font-mono">{u.email}</TableCell>
                          <TableCell>{roleBadge(u.role)}</TableCell>
                          <TableCell className="text-muted-foreground text-xs">{new Date(u.createdAt).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-8 hover:text-zewail-blue hover:bg-zewail-blue/10" onClick={() => { setEditUser(u); setEditRole(u.role) }}><Edit className="h-3.5 w-3.5" /></Button>
                              <Button variant="ghost" size="sm" className="h-8 hover:text-red-500 hover:bg-red-500/10" onClick={() => setDelUser(u)}><Trash2 className="h-3.5 w-3.5" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredUsers.length === 0 && <TableRow><TableCell colSpan={5} className="text-center py-12 text-muted-foreground">{t.noUsers}</TableCell></TableRow>}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── BOOKS ── */}
          {activeTab === 'books' && (
            <motion.div key="books" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="relative mb-4">
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder={t.search} value={bookSearch} onChange={e => setBookSearch(e.target.value)} className={`${inputCls} ps-9`} />
              </div>
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="p-5 border-b border-border flex items-center justify-between">
                  <h2 className="font-semibold text-foreground flex items-center gap-2"><BookOpen className="h-4 w-4 text-zewail-blue" />{t.tabs.books} ({filteredBooks.length})</h2>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border">
                        {[t.col.title, t.col.author, t.col.publisher, t.col.year, t.col.reads, t.col.actions].map(h => (
                          <TableHead key={h} className="text-muted-foreground font-semibold">{h}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBooks.map(b => (
                        <TableRow key={b.id} className="border-border hover:bg-muted/20">
                          <TableCell className="font-medium text-foreground text-sm max-w-48 truncate">{b.title}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">{b.author}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">{b.publisher?.name || '—'}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">{b.year}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">{b.readCount.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-8 hover:text-zewail-blue hover:bg-zewail-blue/10" onClick={() => { setEditBook(b); setEditBookForm({ title: b.title, author: b.author, genre: b.genre, year: String(b.year) }) }}><Edit className="h-3.5 w-3.5" /></Button>
                              <Button variant="ghost" size="sm" className="h-8 hover:text-red-500 hover:bg-red-500/10" onClick={() => setDelBook(b)}><Trash2 className="h-3.5 w-3.5" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredBooks.length === 0 && <TableRow><TableCell colSpan={6} className="text-center py-12 text-muted-foreground">{t.noBooks}</TableCell></TableRow>}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── PUBLISHERS ── */}
          {activeTab === 'publishers' && (
            <motion.div key="publishers" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {publishers.map(p => {
                  const totalReads = p.books.reduce((s, b) => s + b.readCount, 0)
                  return (
                    <div key={p.id} className="bg-card rounded-2xl border border-border p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-zewail-blue/10 flex items-center justify-center"><Building2 className="h-5 w-5 text-zewail-blue" /></div>
                          <div>
                            <h3 className="font-bold text-foreground">{p.name}</h3>
                            <p className="text-xs text-muted-foreground font-mono">{p.slug}</p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-muted/50 rounded-xl p-3 text-center border border-border">
                          <p className="text-2xl font-bold text-foreground">{p.books.length}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{t.col.books}</p>
                        </div>
                        <div className="bg-muted/50 rounded-xl p-3 text-center border border-border">
                          <p className="text-2xl font-bold text-foreground">{totalReads.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{t.col.totalReads}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
                {publishers.length === 0 && (
                  <div className="col-span-2 text-center py-16 text-muted-foreground bg-card rounded-2xl border border-border">
                    {isAr ? 'لا يوجد ناشرون في قاعدة البيانات بعد' : 'No publishers in database yet'}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ── SYSTEM ── */}
          {activeTab === 'system' && (
            <motion.div key="system" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-bold text-foreground mb-5 flex items-center gap-2"><Settings className="h-5 w-5 text-muted-foreground" />{isAr ? 'معلومات النظام' : 'System Info'}</h3>
                <div className="space-y-4">
                  {[
                    { label: t.sysTitles.uptime, value: '99.9%', icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" /> },
                    { label: t.sysTitles.db,     value: 'SQLite / 2.4 MB', icon: <Database className="h-4 w-4 text-zewail-blue" /> },
                    { label: t.sysTitles.api,    value: '8,320', icon: <Activity className="h-4 w-4 text-amber-500" /> },
                  ].map(s => (
                    <div key={s.label} className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">{s.icon}{s.label}</div>
                      <span className="text-sm font-bold text-foreground font-mono">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-bold text-foreground mb-5 flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-purple-500" />{isAr ? 'صلاحيات الأدوار' : 'Role Permissions'}</h3>
                <div className="space-y-3">
                  {[
                    { role: 'admin', bg: 'bg-purple-500/10', perms: isAr ? ['لوحة التحكم الكاملة','إدارة المستخدمين','تعديل وحذف الكتب','عرض الناشرين','إحصاءات النظام'] : ['Full admin panel','Manage users','Edit & delete books','View publishers','System stats'] },
                    { role: 'publisher', bg: 'bg-zewail-blue/10', perms: isAr ? ['لوحة تحكم الناشر','رفع كتب جديدة','تعديل وحذف كتبه','إحصاءات كتبه'] : ['Publisher dashboard','Upload books','Edit & delete own books','Own book stats'] },
                    { role: 'visitor', bg: 'bg-emerald-500/10', perms: isAr ? ['تصفح الكتب','معاينة الكتب','التسجيل في الفعاليات','الرف الشخصي'] : ['Browse books','Preview books','Register for events','Personal shelf'] },
                  ].map(r => (
                    <div key={r.role} className={`rounded-xl p-3.5 border border-border ${r.bg}`}>
                      <p className="text-xs font-bold mb-2 capitalize">{t.roles[r.role as keyof typeof t.roles]}</p>
                      <ul className="space-y-1">
                        {r.perms.map(p => (
                          <li key={p} className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />{p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Edit User Dialog ── */}
      <Dialog open={!!editUser} onOpenChange={v => !v && setEditUser(null)}>
        <DialogContent className="max-w-sm bg-background border-border text-foreground" dir={isAr ? 'rtl' : 'ltr'}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Edit className="h-4 w-4 text-zewail-blue" />{t.editUser}</DialogTitle>
          </DialogHeader>
          {editUser && (
            <div className="space-y-4 mt-2">
              <div className="p-3 rounded-xl bg-muted/50 border border-border">
                <p className="font-semibold text-foreground text-sm">{editUser.name}</p>
                <p className="text-xs text-muted-foreground">{editUser.email}</p>
              </div>
              <div className="space-y-1.5">
                <Label className="text-foreground">{t.col.role}</Label>
                <Select value={editRole} onValueChange={setEditRole}>
                  <SelectTrigger className="bg-background border-border text-foreground"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="visitor">{t.roles.visitor}</SelectItem>
                    <SelectItem value="publisher">{t.roles.publisher}</SelectItem>
                    <SelectItem value="admin">{t.roles.admin}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={saveUserRole} className="w-full bg-zewail-blue text-white hover:bg-zewail-blue-dark"><Save className="h-4 w-4 me-2" />{t.save}</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Edit Book Dialog ── */}
      <Dialog open={!!editBook} onOpenChange={v => !v && setEditBook(null)}>
        <DialogContent className="max-w-sm bg-background border-border text-foreground" dir={isAr ? 'rtl' : 'ltr'}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Edit className="h-4 w-4 text-zewail-blue" />{t.editBook}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            {([['title', isAr ? 'العنوان' : 'Title'], ['author', isAr ? 'المؤلف' : 'Author'], ['genre', isAr ? 'النوع' : 'Genre'], ['year', isAr ? 'السنة' : 'Year']] as [keyof typeof editBookForm, string][]).map(([key, label]) => (
              <div key={key} className="space-y-1">
                <Label className="text-foreground text-xs">{label}</Label>
                <Input value={editBookForm[key]} onChange={e => setEditBookForm(f => ({ ...f, [key]: e.target.value }))} className={inputCls} />
              </div>
            ))}
            <Button onClick={saveBook} className="w-full bg-zewail-blue text-white hover:bg-zewail-blue-dark"><Save className="h-4 w-4 me-2" />{t.save}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Delete User Confirm ── */}
      <Dialog open={!!delUser} onOpenChange={v => !v && setDelUser(null)}>
        <DialogContent className="max-w-sm bg-background border-border text-foreground" dir={isAr ? 'rtl' : 'ltr'}>
          <DialogHeader>
            <DialogTitle className="text-red-500 flex items-center gap-2"><AlertTriangle className="h-4 w-4" />{isAr ? 'تأكيد الحذف' : 'Confirm Delete'}</DialogTitle>
            <DialogDescription>{delUser ? t.confirmDel(delUser.name) : ''}</DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-2">
            <Button variant="outline" onClick={() => setDelUser(null)} className="flex-1 border-border text-foreground">{t.cancel}</Button>
            <Button onClick={deleteUser} className="flex-1 bg-red-500 hover:bg-red-600 text-white">{t.del}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Delete Book Confirm ── */}
      <Dialog open={!!delBook} onOpenChange={v => !v && setDelBook(null)}>
        <DialogContent className="max-w-sm bg-background border-border text-foreground" dir={isAr ? 'rtl' : 'ltr'}>
          <DialogHeader>
            <DialogTitle className="text-red-500 flex items-center gap-2"><AlertTriangle className="h-4 w-4" />{isAr ? 'تأكيد الحذف' : 'Confirm Delete'}</DialogTitle>
            <DialogDescription>{delBook ? t.confirmDel(delBook.title) : ''}</DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-2">
            <Button variant="outline" onClick={() => setDelBook(null)} className="flex-1 border-border text-foreground">{t.cancel}</Button>
            <Button onClick={deleteBook} className="flex-1 bg-red-500 hover:bg-red-600 text-white">{t.del}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
