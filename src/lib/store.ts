import { create } from 'zustand'

export type PageView = 
  | 'home' 
  | 'visitor-dashboard' 
  | 'publisher-dashboard'
  | 'admin-dashboard'
  | 'pavilion-general-egyptian'
  | 'pavilion-dar-al-maaref'
  | 'pavilion-national-library'
  | 'pavilion-al-ahram'
  | 'event-detail'

export interface User {
  id: string
  email: string
  name: string
  role: 'visitor' | 'publisher' | 'admin'
  publisherId?: string
  avatar?: string
}

interface AppState {
  // Navigation
  currentPage: PageView
  navigateTo: (page: PageView) => void
  navigationTarget: string | null
  setNavigationTarget: (target: string | null) => void
  currentEventId: string | null
  setCurrentEventId: (id: string | null) => void
  
  // Auth
  user: User | null
  setUser: (user: User | null) => void
  isAuthenticated: boolean
  
  // Preferences
  theme: 'light' | 'dark'
  toggleTheme: () => void
  language: 'en' | 'ar'
  toggleLanguage: () => void

  // UI
  authModalOpen: boolean
  setAuthModalOpen: (open: boolean) => void
  authModalTab: 'login' | 'register'
  setAuthModalTab: (tab: 'login' | 'register') => void
  
  // Book Reader
  readingBookId: string | null
  setReadingBookId: (id: string | null) => void
  
  // Search
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchFilters: {
    genre: string
    language: string
    year: string
    publisher: string
  }
  setSearchFilters: (filters: Partial<AppState['searchFilters']>) => void
}

export const useAppStore = create<AppState>((set) => ({
  // Navigation
  currentPage: 'home',
  navigateTo: (page) => {
    set({ currentPage: page })
    if (page !== 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  navigationTarget: null,
  setNavigationTarget: (target) => set({ navigationTarget: target }),
  currentEventId: null,
  setCurrentEventId: (id) => set({ currentEventId: id }),
  
  // Auth
  user: null,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  isAuthenticated: false,
  
  // Preferences
  theme: 'light',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  language: 'en',
  toggleLanguage: () => set((state) => ({ language: state.language === 'en' ? 'ar' : 'en' })),

  // UI
  authModalOpen: false,
  setAuthModalOpen: (open) => set({ authModalOpen: open }),
  authModalTab: 'login',
  setAuthModalTab: (tab) => set({ authModalTab: tab }),
  
  // Book Reader
  readingBookId: null,
  setReadingBookId: (id) => set({ readingBookId: id }),
  
  // Search
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  searchFilters: {
    genre: '',
    language: '',
    year: '',
    publisher: '',
  },
  setSearchFilters: (filters) => set((state) => ({
    searchFilters: { ...state.searchFilters, ...filters }
  })),
}))
