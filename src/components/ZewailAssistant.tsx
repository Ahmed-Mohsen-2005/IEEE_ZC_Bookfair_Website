'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Sparkles, Building2, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/lib/store'

interface Message {
  role: 'assistant' | 'user'
  content: string
}

export default function ZewailAssistant() {
  const { language } = useAppStore()
  const isAr = language === 'ar'

  const t = {
    title: isAr ? 'مساعد زويل الأكاديمي' : 'ZC Academic Assistant',
    online: isAr ? 'الأنظمة تعمل' : 'Systems Online',
    placeholder: isAr ? 'اسألني عن كتاب أو مؤلف...' : 'Ask about a book or author...',
    welcome: isAr
      ? 'مرحباً بك في معرض مدينة زويل للكتاب. أنا المساعد الأكاديمي. يمكنك أن تسألني عن كتب محددة، أو مؤلفين، أو مراكز المعرفة.'
      : 'Welcome to the Zewail City Book Fair. I am the academic assistant. Ask me to search for specific books, authors, or knowledge hubs.',
    suggestions: isAr
      ? ['ابحث عن كتب الكيمياء', 'ما هي آخر الإصدارات؟', 'كتب أحمد زويل']
      : ['Search chemistry books', 'Latest publications?', 'Ahmed Zewail works'],
    thinking: isAr ? 'يفكر...' : 'Thinking...',
    errorMsg: isAr ? 'لا يمكنني الوصول للقاعدة حالياً. أعد المحاولة لاحقاً.' : "I'm currently unable to access the database. Please try again later.",
  }

  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: t.welcome }])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Update welcome message when language changes
  useEffect(() => {
    setMessages([{ role: 'assistant', content: t.welcome }])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  const handleSend = async (text?: string) => {
    const query = text || input
    if (!query.trim() || isLoading) return
    setMessages(prev => [...prev, { role: 'user', content: query }])
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, language }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: res.ok ? data.content : t.errorMsg }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: t.errorMsg }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`fixed bottom-6 z-50 ${isAr ? 'left-6' : 'right-6'}`}>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => setIsOpen(true)}
            className="relative group p-4 rounded-full bg-gradient-to-br from-zewail-blue to-zewail-blue-dark text-white
              shadow-xl shadow-zewail-blue/30 hover:shadow-zewail-blue/50 border border-zewail-blue-dark/30 transition-all"
          >
            <Building2 className="w-7 h-7 relative z-10" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-zewail-blue/30 animate-ping opacity-60" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`absolute ${isAr ? 'left-0' : 'right-0'} bottom-0 w-80 sm:w-96 rounded-2xl border border-border
              bg-card shadow-2xl shadow-black/20 dark:shadow-black/50 flex flex-col overflow-hidden`}
            style={{ height: '520px' }}
            dir={isAr ? 'rtl' : 'ltr'}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-zewail-navy to-zewail-blue-dark border-b border-border flex justify-between items-center">
              <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                <div className="p-2 rounded-lg bg-white/10">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div className={isAr ? 'text-right' : ''}>
                  <h3 className="text-sm font-bold text-white">{t.title}</h3>
                  <p className="text-[10px] text-white/60 flex items-center gap-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    {t.online}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background dark:bg-card relative">
              <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 12 : -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex relative z-10 ${msg.role === 'user' ? (isAr ? 'justify-start' : 'justify-end') : (isAr ? 'justify-end' : 'justify-start')}`}
                >
                  <div className={`max-w-[82%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-zewail-blue text-white rounded-br-sm dark:rounded-br-sm'
                      : 'bg-muted text-foreground rounded-bl-sm border border-border'
                  }`}>
                    {msg.role === 'assistant' && (
                      <Sparkles className="w-3 h-3 text-zewail-blue mb-1.5" />
                    )}
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`flex relative z-10 ${isAr ? 'justify-end' : 'justify-start'}`}>
                  <div className="bg-muted border border-border p-3 rounded-2xl flex gap-1.5 items-center">
                    {[0, 0.15, 0.3].map((d, i) => (
                      <span key={i} className="w-2 h-2 rounded-full bg-zewail-blue animate-bounce" style={{ animationDelay: `${d}s`}} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Quick suggestion chips (after welcome only) */}
              {messages.length === 1 && !isLoading && (
                <div className={`flex flex-wrap gap-2 relative z-10 ${isAr ? 'justify-end' : 'justify-start'}`}>
                  {t.suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(s)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium border border-zewail-blue/30 bg-zewail-blue/8 dark:bg-zewail-blue/15 text-zewail-blue
                        hover:bg-zewail-blue hover:text-white transition-all duration-200"
                    >
                      <BookOpen className="w-3 h-3 inline me-1" />
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border bg-muted/50">
              <div className={`flex gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder={t.placeholder}
                  disabled={isLoading}
                  dir={isAr ? 'rtl' : 'ltr'}
                  className="flex-1 bg-background border border-border rounded-xl px-4 py-2 text-sm text-foreground
                    placeholder:text-muted-foreground focus:outline-none focus:border-zewail-blue focus:ring-1 focus:ring-zewail-blue
                    disabled:opacity-60 transition-colors"
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="p-3 bg-zewail-blue hover:bg-zewail-blue-dark rounded-xl text-white disabled:opacity-40 shrink-0"
                >
                  <Send className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
