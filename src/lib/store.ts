import { create } from 'zustand'

export type PageView = 
  | 'home' 
  | 'visitor-dashboard' 
  | 'publisher-dashboard'
  | 'pavilion-general-egyptian'
  | 'pavilion-dar-al-maaref'
  | 'pavilion-national-library'
  | 'pavilion-al-ahram'

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
  
  // Auth
  user: User | null
  setUser: (user: User | null) => void
  isAuthenticated: boolean
  
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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },
  
  // Auth
  user: null,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  isAuthenticated: false,
  
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
