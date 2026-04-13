'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import { BOOKS, PUBLISHERS, getBookCoverGradient } from '@/lib/data'
import { motion } from 'framer-motion'
import { ArrowLeft, Upload, BarChart3, BookOpen, Eye, Edit, Trash2, FileText, Users, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

export default function PublisherDashboard() {
  const { user, navigateTo } = useAppStore()
  const [uploadOpen, setUploadOpen] = useState(false)
  const [statsOpen, setStatsOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<string | null>(null)

  const publisherId = user?.publisherId || 'general-egyptian'
  const publisher = PUBLISHERS.find(p => p.id === publisherId)
  const publisherBooks = BOOKS.filter(b => b.publisherId === publisherId)

  const totalReads = publisherBooks.reduce((sum, b) => sum + b.readCount, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/30 to-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateTo('home')}
              className="text-zewail-navy/50 hover:text-zewail-navy mb-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
            </Button>
            <h1 className="text-3xl font-bold text-zewail-navy">
              {publisher?.name || 'Publisher'} Dashboard
            </h1>
            <p className="text-zewail-navy/50 mt-1">Manage your digital catalog and track engagement</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setUploadOpen(true)}
              className="bg-zewail-blue hover:bg-zewail-blue/90 text-zewail-navy font-semibold rounded-xl"
            >
              <Upload className="h-4 w-4 mr-2" /> Upload & Manage Catalog
            </Button>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white rounded-2xl border border-zewail-blue/10 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-zewail-blue/10">
                <BookOpen className="h-5 w-5 text-zewail-blue" />
              </div>
              <span className="text-sm text-zewail-navy/50">Total Titles</span>
            </div>
            <p className="text-3xl font-bold text-zewail-navy">{publisherBooks.length}</p>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +3 this month
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-zewail-blue/10 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-emerald-500/10">
                <Eye className="h-5 w-5 text-emerald-500" />
              </div>
              <span className="text-sm text-zewail-navy/50">Total Reads</span>
            </div>
            <p className="text-3xl font-bold text-zewail-navy">{totalReads.toLocaleString()}</p>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +12% this week
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-zewail-blue/10 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-amber-500/10">
                <Users className="h-5 w-5 text-amber-500" />
              </div>
              <span className="text-sm text-zewail-navy/50">Active Readers</span>
            </div>
            <p className="text-3xl font-bold text-zewail-navy">1,847</p>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +8% this week
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-zewail-blue/10 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-purple-500/10">
                <BarChart3 className="h-5 w-5 text-purple-500" />
              </div>
              <span className="text-sm text-zewail-navy/50">Engagement Rate</span>
            </div>
            <p className="text-3xl font-bold text-zewail-navy">73%</p>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +5% this month
            </p>
          </div>
        </motion.div>

        {/* Catalog Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-zewail-blue/10 overflow-hidden"
        >
          <div className="p-6 border-b border-zewail-blue/5">
            <h2 className="text-lg font-semibold text-zewail-navy">Digital Catalog</h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-zewail-blue/5">
                  <TableHead className="text-zewail-navy/50">Title</TableHead>
                  <TableHead className="text-zewail-navy/50">Author</TableHead>
                  <TableHead className="text-zewail-navy/50">Genre</TableHead>
                  <TableHead className="text-zewail-navy/50">Year</TableHead>
                  <TableHead className="text-zewail-navy/50">Reads</TableHead>
                  <TableHead className="text-zewail-navy/50">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {publisherBooks.map((book) => (
                  <TableRow key={book.id} className="border-zewail-blue/5 hover:bg-zewail-blue/5">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-10 rounded bg-gradient-to-br ${getBookCoverGradient(book.title)} flex-shrink-0`} />
                        <span className="font-medium text-zewail-navy">{book.title}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-zewail-navy/60">{book.author}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-zewail-blue/10 text-zewail-navy/60 border-0 text-xs">
                        {book.genre}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-zewail-navy/60">{book.year}</TableCell>
                    <TableCell className="text-zewail-navy/60">{book.readCount.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-8 text-zewail-navy/50 hover:text-zewail-accent">
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-zewail-navy/50 hover:text-zewail-blue" onClick={() => { setSelectedBook(book.id); setStatsOpen(true) }}>
                          <BarChart3 className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-zewail-navy/50 hover:text-emerald-600">
                          <FileText className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-zewail-navy/50 hover:text-red-500">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>

        {/* Upload Dialog */}
        <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-zewail-navy">Upload New Title</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Title</Label>
                <Input placeholder="Enter book title" className="mt-1 rounded-lg" />
              </div>
              <div>
                <Label>Author</Label>
                <Input placeholder="Enter author name" className="mt-1 rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Genre</Label>
                  <Select>
                    <SelectTrigger className="mt-1 rounded-lg">
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {['History', 'Science', 'Academic', 'Poetry', 'Political Science', 'Current Affairs'].map(g => (
                        <SelectItem key={g} value={g.toLowerCase()}>{g}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Language</Label>
                  <Select defaultValue="arabic">
                    <SelectTrigger className="mt-1 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arabic">Arabic</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="multilingual">Multilingual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Enter book description" className="mt-1 rounded-lg" rows={3} />
              </div>
              <div>
                <Label>Upload Content (PDF/EPUB)</Label>
                <div className="mt-1 border-2 border-dashed border-zewail-blue/20 rounded-xl p-8 text-center hover:border-zewail-blue/40 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 text-zewail-blue/40 mx-auto mb-2" />
                  <p className="text-sm text-zewail-navy/40">Drag and drop or click to upload</p>
                  <p className="text-xs text-zewail-navy/30 mt-1">PDF, EPUB up to 50MB</p>
                </div>
              </div>
              <Button
                className="w-full bg-zewail-blue hover:bg-zewail-blue/90 text-zewail-navy font-semibold rounded-xl"
                onClick={() => { toast.success('Title uploaded successfully!'); setUploadOpen(false) }}
              >
                Publish Title
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Stats Dialog */}
        <Dialog open={statsOpen} onOpenChange={setStatsOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-zewail-navy">Reader Statistics</DialogTitle>
            </DialogHeader>
            {selectedBook && (() => {
              const book = BOOKS.find(b => b.id === selectedBook)
              if (!book) return null
              return (
                <div className="space-y-4 mt-4">
                  <h3 className="font-semibold text-zewail-navy">{book.title}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zewail-blue/5 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-zewail-navy">{book.readCount.toLocaleString()}</p>
                      <p className="text-xs text-zewail-navy/50">Total Reads</p>
                    </div>
                    <div className="bg-zewail-blue/5 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-zewail-navy">4.2</p>
                      <p className="text-xs text-zewail-navy/50">Avg. Rating</p>
                    </div>
                  </div>
                  <div className="bg-zewail-blue/5 rounded-xl p-4">
                    <p className="text-xs text-zewail-navy/50 mb-2">Reading completion rate</p>
                    <div className="w-full h-2 bg-zewail-blue/20 rounded-full">
                      <div className="h-full bg-zewail-blue rounded-full" style={{ width: '67%' }} />
                    </div>
                    <p className="text-xs text-zewail-navy/40 mt-1">67% of readers complete the book</p>
                  </div>
                </div>
              )
            })()}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
