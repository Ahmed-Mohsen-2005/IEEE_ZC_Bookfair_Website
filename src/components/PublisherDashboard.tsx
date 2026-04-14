'use client'

import { useState, useRef, useCallback } from 'react'
import { useAppStore } from '@/lib/store'
import { BOOKS, PUBLISHERS, getBookCoverGradient, GENRES } from '@/lib/data'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Upload, BarChart3, BookOpen, Eye, Edit, Trash2,
  FileText, Users, TrendingUp, Home, Sparkles, CheckCircle2,
  X, CloudUpload, Tag, Globe, Save, AlertTriangle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

// ── Upload form state ──────────────────────────────────────────────────────
interface UploadForm {
  title: string; author: string; genre: string; language: string
  year: string; description: string; file: File | null
}
const EMPTY_FORM: UploadForm = { title: '', author: '', genre: '', language: 'Arabic', year: new Date().getFullYear().toString(), description: '', file: null }

export default function PublisherDashboard() {
  const { user, navigateTo, language } = useAppStore()
  const isAr = language === 'ar'
  const [uploadOpen, setUploadOpen] = useState(false)
  const [statsOpen, setStatsOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<string | null>(null)
  const [form, setForm] = useState<UploadForm>(EMPTY_FORM)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  // Edit state
  const [editBookId, setEditBookId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ title: '', author: '', genre: '', year: '' })
  const [saving, setSaving] = useState(false)
  // Delete state
  const [delBookId, setDelBookId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  // Uploaded books state (refreshed after upload)
  const [uploadedBooks, setUploadedBooks] = useState<{ id: string; title: string; author: string; genre: string; year: number; readCount: number }[]>([])
  const [showUploaded, setShowUploaded] = useState(false)

  const publisherId = user?.publisherId || 'general-egyptian'
  const publisher = PUBLISHERS.find(p => p.id === publisherId)
  const publisherBooks = BOOKS.filter(b => b.publisherId === publisherId)
  const totalReads = publisherBooks.reduce((sum, b) => sum + b.readCount, 0)

  const t = {
    home: isAr ? 'الرئيسية' : 'Back to Home',
    dashTitle: isAr ? 'لوحة تحكم الناشر' : 'Publisher Dashboard',
    dashDesc: isAr ? 'إدارة فهرسك الرقمي وتتبع مشاركة القراء' : 'Manage your digital catalog and track reader engagement',
    uploadBtn: isAr ? 'رفع كتاب جديد' : 'Upload New Book',
    metrics: {
      titles: isAr ? 'إجمالي العناوين' : 'Total Titles',
      reads: isAr ? 'إجمالي القراءات' : 'Total Reads',
      readers: isAr ? 'القراء النشطون' : 'Active Readers',
      engagement: isAr ? 'معدل التفاعل' : 'Engagement Rate',
    },
    growthMonth: isAr ? '+٣ هذا الشهر' : '+3 this month',
    growthWeek: isAr ? '+١٢٪ هذا الأسبوع' : '+12% this week',
    growthReaders: isAr ? '+٨٪ هذا الأسبوع' : '+8% this week',
    growthEng: isAr ? '+٥٪ هذا الشهر' : '+5% this month',
    catalog: isAr ? 'الفهرس الرقمي' : 'Digital Catalog',
    colTitle: isAr ? 'العنوان' : 'Title',
    colAuthor: isAr ? 'المؤلف' : 'Author',
    colGenre: isAr ? 'النوع' : 'Genre',
    colYear: isAr ? 'السنة' : 'Year',
    colReads: isAr ? 'القراءات' : 'Reads',
    colActions: isAr ? 'الإجراءات' : 'Actions',
    // Upload dialog
    uploadTitle: isAr ? 'رفع كتاب جديد' : 'Upload New Book',
    uploadDesc: isAr ? 'أضف كتاباً جديداً إلى فهرسك الرقمي وأتح للقراء الوصول إليه فوراً.' : 'Add a new book to your digital catalog and make it instantly available to readers.',
    fieldTitle: isAr ? 'عنوان الكتاب' : 'Book Title',
    fieldAuthor: isAr ? 'المؤلف' : 'Author',
    fieldGenre: isAr ? 'النوع الأدبي' : 'Genre',
    fieldLang: isAr ? 'اللغة' : 'Language',
    fieldYear: isAr ? 'سنة النشر' : 'Publication Year',
    fieldDesc: isAr ? 'الوصف' : 'Description',
    fieldFile: isAr ? 'رفع المحتوى (PDF/EPUB)' : 'Upload Content (PDF/EPUB)',
    dropHint: isAr ? 'اسحب وأفلت أو اضغط للرفع' : 'Drag & drop or click to upload',
    dropSize: isAr ? 'PDF أو EPUB حتى 50 ميغابايت' : 'PDF, EPUB up to 50MB',
    publishing: isAr ? 'جارٍ النشر...' : 'Publishing...',
    publish: isAr ? 'نشر الكتاب' : 'Publish Book',
    genrePlaceholder: isAr ? 'اختر النوع...' : 'Select genre...',
    langPlaceholder: isAr ? 'اختر اللغة...' : 'Select language...',
    // Stats dialog
    statsTitle: isAr ? 'إحصاءات القراء' : 'Reader Statistics',
    statTotal: isAr ? 'إجمالي القراءات' : 'Total Reads',
    statRating: isAr ? 'متوسط التقييم' : 'Avg. Rating',
    completionLabel: isAr ? 'معدل إتمام القراءة' : 'Reading completion rate',
    completionNote: isAr ? '٦٧٪ من القراء يكملون الكتاب' : '67% of readers complete the book',
    aiInsight: isAr ? 'تحليل الذكاء الاصطناعي' : 'AI Insight',
    aiDesc: isAr
      ? 'القراء الذين يتصفحون هذا الكتاب يميلون أيضاً إلى قراءة كتب مماثلة في النوع والعصر نفسهما. فكّر في إضافة مزيد من الكتب المماثلة.'
      : 'Readers who browse this book also tend to read similar titles in the same genre and era. Consider adding more related titles to boost discovery.',
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && (file.type === 'application/pdf' || file.name.endsWith('.epub')))
      setForm(f => ({ ...f, file }))
    else toast.error(isAr ? 'يُرجى رفع ملف PDF أو EPUB فقط' : 'Please upload a PDF or EPUB file')
  }, [isAr])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setForm(f => ({ ...f, file }))
  }

  const handleUpload = async () => {
    if (!form.title.trim()) { toast.error(isAr ? 'أدخل عنوان الكتاب' : 'Enter book title'); return }
    if (!form.author.trim()) { toast.error(isAr ? 'أدخل اسم المؤلف' : 'Enter author name'); return }
    if (!form.genre) { toast.error(isAr ? 'اختر النوع الأدبي' : 'Select a genre'); return }

    setUploading(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => { if (v && k !== 'file') fd.append(k, v as string) })
      fd.append('publisherId', publisherId)
      if (form.file) fd.append('file', form.file)

      const res = await fetch('/api/books/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      // Track uploaded book in local state
      setUploadedBooks(prev => [...prev, { id: data.book.id, title: form.title, author: form.author, genre: form.genre, year: parseInt(form.year), readCount: 0 }])
      setShowUploaded(true)
      toast.success(isAr ? `تم نشر "${form.title}" بنجاح! 🎉` : `"${form.title}" published successfully! 🎉`)
      setForm(EMPTY_FORM)
      setUploadOpen(false)
    } catch (e) {
      toast.error(isAr ? `فشل الرفع: ${e instanceof Error ? e.message : String(e)}` : `Upload failed: ${e instanceof Error ? e.message : String(e)}`)
    } finally {
      setUploading(false)
    }
  }

  const handleSaveEdit = async () => {
    if (!editBookId) return
    setSaving(true)
    try {
      const res = await fetch(`/api/books/${editBookId}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editForm.title, author: editForm.author, genre: editForm.genre, year: editForm.year }),
      })
      if (!res.ok) throw new Error()
      setUploadedBooks(prev => prev.map(b => b.id === editBookId ? { ...b, ...editForm, year: parseInt(editForm.year) } : b))
      toast.success(isAr ? 'تم تحديث الكتاب' : 'Book updated')
      setEditBookId(null)
    } catch { toast.error(isAr ? 'فشل التحديث' : 'Update failed') }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!delBookId) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/books/${delBookId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      setUploadedBooks(prev => prev.filter(b => b.id !== delBookId))
      toast.success(isAr ? 'تم حذف الكتاب' : 'Book deleted')
      setDelBookId(null)
    } catch { toast.error(isAr ? 'فشل الحذف' : 'Delete failed') }
    finally { setDeleting(false) }
  }

  const inputCls = "bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:border-zewail-blue"

  return (
    <div className="min-h-screen bg-background" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between mb-8">
          <div>
            <Button variant="ghost" size="sm" onClick={() => navigateTo('home')}
              className="text-muted-foreground hover:text-foreground mb-2 flex items-center gap-1">
              <ArrowLeft className={`h-4 w-4 ${isAr ? 'rotate-180' : ''}`} /> {t.home}
            </Button>
            <h1 className="text-3xl font-bold text-foreground">
              {isAr ? publisher?.nameAr : publisher?.name} — {t.dashTitle}
            </h1>
            <p className="text-muted-foreground mt-1">{t.dashDesc}</p>
          </div>
          <Button onClick={() => setUploadOpen(true)}
            className="bg-zewail-blue hover:bg-zewail-blue-dark text-white font-semibold rounded-xl shadow-md shadow-zewail-blue/20 flex items-center gap-2 px-5 py-3">
            <CloudUpload className="h-4 w-4" /> {t.uploadBtn}
          </Button>
        </motion.div>

        {/* Metrics */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: t.metrics.titles, value: publisherBooks.length.toString(), color: 'text-zewail-blue', icon: <BookOpen className="h-5 w-5 text-zewail-blue" />, bg: 'bg-zewail-blue/10', growth: t.growthMonth },
            { label: t.metrics.reads, value: totalReads.toLocaleString(), color: 'text-emerald-500', icon: <Eye className="h-5 w-5 text-emerald-500" />, bg: 'bg-emerald-500/10', growth: t.growthWeek },
            { label: t.metrics.readers, value: '1,847', color: 'text-amber-500', icon: <Users className="h-5 w-5 text-amber-500" />, bg: 'bg-amber-500/10', growth: t.growthReaders },
            { label: t.metrics.engagement, value: '73%', color: 'text-purple-500', icon: <BarChart3 className="h-5 w-5 text-purple-500" />, bg: 'bg-purple-500/10', growth: t.growthEng },
          ].map(m => (
            <div key={m.label} className="bg-card rounded-2xl border border-border p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-xl ${m.bg}`}>{m.icon}</div>
                <span className="text-sm text-muted-foreground">{m.label}</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{m.value}</p>
              <p className="text-xs text-emerald-500 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> {m.growth}
              </p>
            </div>
          ))}
        </motion.div>

        {/* AI Insight Banner */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="mb-8 p-4 rounded-2xl border border-zewail-blue/25 bg-zewail-blue/5 dark:bg-zewail-blue/10 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-zewail-blue/10 shrink-0">
            <Sparkles className="h-5 w-5 text-zewail-blue" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground mb-0.5">{t.aiInsight}</p>
            <p className="text-sm text-muted-foreground">{t.aiDesc}</p>
          </div>
        </motion.div>

        {/* Catalog Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">{t.catalog}</h2>
            <Badge className="bg-zewail-blue/10 text-zewail-blue border-none">
              {publisherBooks.length} {isAr ? 'عنوان' : 'titles'}
            </Badge>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-muted/30">
                  {[t.colTitle, t.colAuthor, t.colGenre, t.colYear, t.colReads, t.colActions].map(h => (
                    <TableHead key={h} className="text-muted-foreground font-semibold rtl:text-right">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {publisherBooks.map(book => (
                  <TableRow key={book.id} className="border-border hover:bg-muted/30 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-10 rounded-md bg-gradient-to-br ${getBookCoverGradient(book.title)} shrink-0 shadow-sm`} />
                        <span className="font-medium text-foreground text-sm line-clamp-1">{book.title}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{book.author}</TableCell>
                    <TableCell><Badge variant="secondary" className="bg-muted text-muted-foreground border-0 text-xs">{book.genre}</Badge></TableCell>
                    <TableCell className="text-muted-foreground text-sm">{book.year}</TableCell>
                    <TableCell className="text-muted-foreground text-sm font-medium">{book.readCount.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-zewail-blue hover:bg-zewail-blue/10"
                          onClick={() => { setEditBookId(book.id); setEditForm({ title: book.title, author: book.author, genre: book.genre, year: String(book.year) }) }}>
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-zewail-blue hover:bg-zewail-blue/10" onClick={() => { setSelectedBook(book.id); setStatsOpen(true) }}><BarChart3 className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-red-500 hover:bg-red-500/10" onClick={() => setDelBookId(book.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {showUploaded && uploadedBooks.map(book => (
                  <TableRow key={book.id} className="border-border hover:bg-muted/30 bg-emerald-500/5">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-10 rounded-md bg-gradient-to-br from-emerald-500 to-teal-600 shrink-0 shadow-sm" />
                        <div>
                          <span className="font-medium text-foreground text-sm line-clamp-1">{book.title}</span>
                          <Badge className="ms-2 bg-emerald-500/10 text-emerald-600 border-none text-[10px]">{isAr ? 'جديد' : 'New'}</Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{book.author}</TableCell>
                    <TableCell><Badge variant="secondary" className="bg-muted text-muted-foreground border-0 text-xs">{book.genre}</Badge></TableCell>
                    <TableCell className="text-muted-foreground text-sm">{book.year}</TableCell>
                    <TableCell className="text-muted-foreground text-sm font-medium">0</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-zewail-blue hover:bg-zewail-blue/10"
                          onClick={() => { setEditBookId(book.id); setEditForm({ title: book.title, author: book.author, genre: book.genre, year: String(book.year) }) }}>
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-red-500 hover:bg-red-500/10" onClick={() => setDelBookId(book.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>

        {/* ── Upload Dialog ──────────────────────────────── */}
        <Dialog open={uploadOpen} onOpenChange={v => { setUploadOpen(v); if (!v) setForm(EMPTY_FORM) }}>
          <DialogContent className="max-w-xl bg-background border-border text-foreground" dir={isAr ? 'rtl' : 'ltr'}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-foreground">
                <CloudUpload className="h-5 w-5 text-zewail-blue" /> {t.uploadTitle}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">{t.uploadDesc}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1.5">
                  <Label className="text-foreground flex items-center gap-1"><BookOpen className="h-3.5 w-3.5 text-zewail-blue" />{t.fieldTitle}</Label>
                  <Input placeholder={isAr ? 'عنوان الكتاب...' : 'Book title...'} className={inputCls}
                    value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                </div>
                <div className="col-span-2 space-y-1.5">
                  <Label className="text-foreground flex items-center gap-1"><Users className="h-3.5 w-3.5 text-zewail-blue" />{t.fieldAuthor}</Label>
                  <Input placeholder={isAr ? 'اسم المؤلف...' : 'Author name...'} className={inputCls}
                    value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground flex items-center gap-1"><Tag className="h-3.5 w-3.5 text-zewail-blue" />{t.fieldGenre}</Label>
                  <Select value={form.genre} onValueChange={v => setForm(f => ({ ...f, genre: v }))}>
                    <SelectTrigger className="bg-background border-border text-foreground"><SelectValue placeholder={t.genrePlaceholder} /></SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {GENRES.slice(1).map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground flex items-center gap-1"><Globe className="h-3.5 w-3.5 text-zewail-blue" />{t.fieldLang}</Label>
                  <Select value={form.language} onValueChange={v => setForm(f => ({ ...f, language: v }))}>
                    <SelectTrigger className="bg-background border-border text-foreground"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="Arabic">{isAr ? 'عربية' : 'Arabic'}</SelectItem>
                      <SelectItem value="English">{isAr ? 'إنجليزية' : 'English'}</SelectItem>
                      <SelectItem value="Multilingual">{isAr ? 'متعددة اللغات' : 'Multilingual'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-foreground">{t.fieldYear}</Label>
                  <Input type="number" min={1900} max={2030} className={inputCls}
                    value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-foreground">{t.fieldDesc}</Label>
                <Textarea placeholder={isAr ? 'وصف الكتاب...' : 'Book description...'} className={`${inputCls} resize-none`} rows={3}
                  value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>

              {/* Drop zone */}
              <div className="space-y-1.5">
                <Label className="text-foreground">{t.fieldFile}</Label>
                <div
                  onClick={() => fileRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                  onDragLeave={() => setDragOver(false)}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    dragOver ? 'border-zewail-blue bg-zewail-blue/8' : 'border-border hover:border-zewail-blue/50 hover:bg-muted/30'
                  }`}
                >
                  {form.file ? (
                    <div className="flex items-center justify-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                      <span className="text-sm font-medium text-foreground">{form.file.name}</span>
                      <button onClick={e => { e.stopPropagation(); setForm(f => ({ ...f, file: null })) }}
                        className="p-1 rounded-full hover:bg-muted text-muted-foreground">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">{t.dropHint}</p>
                      <p className="text-xs text-muted-foreground/60 mt-1">{t.dropSize}</p>
                    </>
                  )}
                  <input ref={fileRef} type="file" accept=".pdf,.epub" className="hidden" onChange={handleFileChange} />
                </div>
              </div>

              <Button onClick={handleUpload} disabled={uploading}
                className="w-full bg-gradient-to-r from-zewail-blue to-zewail-blue-dark text-white font-semibold rounded-xl py-5 shadow-md shadow-zewail-blue/20">
                {uploading
                  ? <><div className="me-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />{t.publishing}</>
                  : <><CloudUpload className="me-2 h-4 w-4" />{t.publish}</>}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* ── Stats Dialog ──────────────────────────────── */}
        <Dialog open={statsOpen} onOpenChange={setStatsOpen}>
          <DialogContent className="max-w-md bg-background border-border text-foreground" dir={isAr ? 'rtl' : 'ltr'}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-foreground">
                <BarChart3 className="h-5 w-5 text-zewail-blue" /> {t.statsTitle}
              </DialogTitle>
            </DialogHeader>
            {selectedBook && (() => {
              const book = BOOKS.find(b => b.id === selectedBook)
              if (!book) return null
              return (
                <div className="space-y-4 mt-2">
                  <h3 className={`font-semibold text-foreground text-sm ${isAr ? 'text-right' : ''}`}>{book.title}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: t.statTotal, value: book.readCount.toLocaleString() },
                      { label: t.statRating, value: '4.2 ⭐' },
                    ].map(s => (
                      <div key={s.label} className="bg-muted/50 rounded-xl p-4 text-center border border-border">
                        <p className="text-2xl font-bold text-foreground">{s.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4 border border-border">
                    <p className="text-xs text-muted-foreground mb-3 font-medium">{t.completionLabel}</p>
                    <div className="w-full h-2 bg-border rounded-full">
                      <div className="h-full bg-gradient-to-r from-zewail-blue to-cyan-400 rounded-full" style={{ width: '67%' }} />
                    </div>
                    <p className="text-xs text-muted-foreground/60 mt-2">{t.completionNote}</p>
                  </div>
                  {/* AI Insight */}
                  <div className="p-4 rounded-xl bg-zewail-blue/5 dark:bg-zewail-blue/10 border border-zewail-blue/20 flex items-start gap-3">
                    <Sparkles className="h-4 w-4 text-zewail-blue mt-0.5 shrink-0" />
                    <div className={isAr ? 'text-right' : ''}>
                      <p className="text-xs font-bold text-foreground mb-1">{t.aiInsight}</p>
                      <p className="text-xs text-muted-foreground">{t.aiDesc}</p>
                    </div>
                  </div>
                </div>
              )
            })()}
          </DialogContent>
        </Dialog>
        {/* ── Edit Book Dialog ── */}
        <Dialog open={!!editBookId} onOpenChange={v => !v && setEditBookId(null)}>
          <DialogContent className="max-w-sm bg-background border-border text-foreground" dir={isAr ? 'rtl' : 'ltr'}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2"><Edit className="h-4 w-4 text-zewail-blue" />{isAr ? 'تعديل الكتاب' : 'Edit Book'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 mt-2">
              {([['title', isAr ? 'العنوان' : 'Title'], ['author', isAr ? 'المؤلف' : 'Author'], ['genre', isAr ? 'النوع' : 'Genre'], ['year', isAr ? 'السنة' : 'Year']] as [keyof typeof editForm, string][]).map(([key, label]) => (
                <div key={key} className="space-y-1">
                  <Label className="text-foreground text-xs">{label}</Label>
                  <Input value={editForm[key]} onChange={e => setEditForm(f => ({ ...f, [key]: e.target.value }))} className={inputCls} />
                </div>
              ))}
              <Button onClick={handleSaveEdit} disabled={saving} className="w-full bg-zewail-blue text-white">
                {saving ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin me-2" /> : <Save className="h-4 w-4 me-2" />}
                {isAr ? 'حفظ التغييرات' : 'Save Changes'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* ── Delete Book Confirm ── */}
        <Dialog open={!!delBookId} onOpenChange={v => !v && setDelBookId(null)}>
          <DialogContent className="max-w-sm bg-background border-border text-foreground" dir={isAr ? 'rtl' : 'ltr'}>
            <DialogHeader>
              <DialogTitle className="text-red-500 flex items-center gap-2"><AlertTriangle className="h-4 w-4" />{isAr ? 'تأكيد الحذف' : 'Confirm Delete'}</DialogTitle>
              <DialogDescription>{isAr ? 'هل أنت متأكد من حذف هذا الكتاب؟ لا يمكن التراجع.' : 'Are you sure? This cannot be undone.'}</DialogDescription>
            </DialogHeader>
            <div className="flex gap-3 mt-2">
              <Button variant="outline" onClick={() => setDelBookId(null)} className="flex-1 border-border text-foreground">{isAr ? 'إلغاء' : 'Cancel'}</Button>
              <Button onClick={handleDelete} disabled={deleting} className="flex-1 bg-red-500 hover:bg-red-600 text-white">{isAr ? 'احذف' : 'Delete'}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
