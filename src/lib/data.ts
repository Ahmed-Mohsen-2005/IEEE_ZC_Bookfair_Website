export interface Publisher {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  accentColor: string
  logoUrl: string
  bookCount: number
}

export interface Book {
  id: string
  title: string
  author: string
  description: string
  genre: string
  language: string
  year: number
  coverUrl: string
  publisherId: string
  publisherName: string
  readCount: number
}

export interface FairEvent {
  id: string
  title: string
  description: string
  speaker: string
  date: string
  duration: string
  type: 'workshop' | 'panel' | 'talk'
  publisherName?: string
}

export const PUBLISHERS: Publisher[] = [
  {
    id: 'general-egyptian',
    name: 'General Egyptian Book Organization',
    slug: 'general-egyptian',
    tagline: 'State Custodian of Letters',
    description: 'The foremost national institution dedicated to the preservation, production, and dissemination of Egyptian literary and intellectual heritage. A pillar of state-sponsored cultural enrichment.',
    accentColor: '#C41E3A',
    logoUrl: '/publishers/general-egyptian.svg',
    bookCount: 1247,
  },
  {
    id: 'dar-al-maaref',
    name: 'Dar Al-Maaref',
    slug: 'dar-al-maaref',
    tagline: 'A Lighthouse of Knowledge Since 1890',
    description: 'Established in 1890, Dar Al-Maaref stands as one of Egypt\'s oldest and most revered publishing houses, illuminating the path of academic and literary excellence for over a century.',
    accentColor: '#2E7D32',
    logoUrl: '/publishers/dar-al-maaref.svg',
    bookCount: 892,
  },
  {
    id: 'national-library',
    name: 'National Library and Archives of Egypt',
    slug: 'national-library',
    tagline: 'Gatekeepers of National Memory',
    description: 'The guardian of Egypt\'s documentary heritage, preserving rare manuscripts, historical facsimiles, and the nation\'s archival treasures for future generations.',
    accentColor: '#B8860B',
    logoUrl: '/publishers/national-library.svg',
    bookCount: 634,
  },
  {
    id: 'al-ahram',
    name: 'Al-Ahram',
    slug: 'al-ahram',
    tagline: 'At the Peak of Thought',
    description: 'Egypt\'s most prominent publishing institution, shaping public discourse through authoritative political analysis, scientific commentary, and cultural thought leadership.',
    accentColor: '#C41E3A',
    logoUrl: '/publishers/al-ahram.svg',
    bookCount: 1056,
  },
]

export const BOOKS: Book[] = [
  // General Egyptian Book Organization
  {
    id: 'b1', title: 'The State Prize Winners: A Century of Excellence', author: 'Dr. Amira Hassan',
    description: 'A comprehensive anthology of Egypt\'s most prestigious literary award recipients spanning 100 years.', genre: 'Anthology', language: 'Arabic', year: 2023,
    coverUrl: '', publisherId: 'general-egyptian', publisherName: 'General Egyptian Book Organization', readCount: 3420,
  },
  {
    id: 'b2', title: 'Historical Archive: Modern Egypt 1805-1952', author: 'Prof. Mahmoud Fawzi',
    description: 'A definitive archival work documenting the transformation of modern Egypt through official records and correspondence.', genre: 'History', language: 'Arabic', year: 2022,
    coverUrl: '', publisherId: 'general-egyptian', publisherName: 'General Egyptian Book Organization', readCount: 2150,
  },
  {
    id: 'b3', title: 'Egyptian Poetry: From Pharaonic Verse to Modern Free Verse', author: 'Dr. Fatima El-Azhari',
    description: 'A sweeping journey through Egypt\'s poetic tradition, connecting ancient hieratic verse to contemporary literary movements.', genre: 'Poetry', language: 'Arabic', year: 2024,
    coverUrl: '', publisherId: 'general-egyptian', publisherName: 'General Egyptian Book Organization', readCount: 1890,
  },
  {
    id: 'b4', title: 'The Architecture of Cairo: A Visual History', author: 'Dr. Nasser Ibrahim',
    description: 'An illustrated chronicle of Cairo\'s architectural evolution from Fatimid foundations to modern skylines.', genre: 'Art & Architecture', language: 'Arabic', year: 2023,
    coverUrl: '', publisherId: 'general-egyptian', publisherName: 'General Egyptian Book Organization', readCount: 2760,
  },
  // Dar Al-Maaref
  {
    id: 'b5', title: 'Foundations of Arabic Linguistics', author: 'Dr. Youssef El-Sherif',
    description: 'The definitive academic reference on Arabic linguistic theory and its historical development.', genre: 'Academic', language: 'Arabic', year: 2021,
    coverUrl: '', publisherId: 'dar-al-maaref', publisherName: 'Dar Al-Maaref', readCount: 4560,
  },
  {
    id: 'b6', title: 'Classical Arabic Literature: An Anthology (1890-1950)', author: 'Prof. Layla Abdel-Rahim',
    description: 'A curated collection of the most influential Arabic literary works from the Nahda period.', genre: 'Classic Literature', language: 'Arabic', year: 2022,
    coverUrl: '', publisherId: 'dar-al-maaref', publisherName: 'Dar Al-Maaref', readCount: 3240,
  },
  {
    id: 'b7', title: 'Mathematics in the Islamic Golden Age', author: 'Dr. Khaled Mansour',
    description: 'A scholarly exploration of mathematical innovations from Al-Khwarizmi to the modern era.', genre: 'Science', language: 'Arabic', year: 2023,
    coverUrl: '', publisherId: 'dar-al-maaref', publisherName: 'Dar Al-Maaref', readCount: 2980,
  },
  {
    id: 'b8', title: 'The Lighthouse Compendium: 130 Years of Publishing', author: 'Various Authors',
    description: 'A commemorative volume celebrating Dar Al-Maaref\'s 130-year legacy of knowledge dissemination.', genre: 'Reference', language: 'Arabic', year: 2020,
    coverUrl: '', publisherId: 'dar-al-maaref', publisherName: 'Dar Al-Maaref', readCount: 5120,
  },
  // National Library and Archives
  {
    id: 'b9', title: 'Rare Manuscripts of the Mamluk Era', author: 'Dr. Aisha Farouk',
    description: 'High-resolution digital facsimiles of 50 previously unpublished Mamluk-era manuscripts with scholarly commentary.', genre: 'Manuscripts', language: 'Arabic', year: 2023,
    coverUrl: '', publisherId: 'national-library', publisherName: 'National Library and Archives', readCount: 1560,
  },
  {
    id: 'b10', title: 'Papyrus Documents: Digital Archive Vol. I', author: 'National Archives Team',
    description: 'The first comprehensive digital archive of Egyptian papyrus documents with translation and annotations.', genre: 'Archives', language: 'Multilingual', year: 2022,
    coverUrl: '', publisherId: 'national-library', publisherName: 'National Library and Archives', readCount: 2340,
  },
  {
    id: 'b11', title: 'Ottoman Court Records of Cairo', author: 'Prof. Hassan Al-Din',
    description: 'Digitized and transcribed court records from Ottoman Cairo, offering unprecedented insight into daily legal life.', genre: 'Historical Documents', language: 'Arabic', year: 2024,
    coverUrl: '', publisherId: 'national-library', publisherName: 'National Library and Archives', readCount: 1780,
  },
  {
    id: 'b12', title: 'Ancient Egyptian Architectural Treatises', author: 'Dr. Salma Ramadan',
    description: 'Digitized facsimiles of rare treatises on ancient Egyptian building techniques and architectural philosophy.', genre: 'Architecture', language: 'Arabic', year: 2023,
    coverUrl: '', publisherId: 'national-library', publisherName: 'National Library and Archives', readCount: 1320,
  },
  // Al-Ahram
  {
    id: 'b13', title: 'Political Thought in Contemporary Egypt', author: 'Dr. Raafat El-Sayed',
    description: 'An analytical exploration of Egypt\'s evolving political landscape through the lens of Al-Ahram\'s editorial legacy.', genre: 'Political Science', language: 'Arabic', year: 2024,
    coverUrl: '', publisherId: 'al-ahram', publisherName: 'Al-Ahram', readCount: 6870,
  },
  {
    id: 'b14', title: 'Science and Society: Bridging the Gap', author: 'Prof. Nadia El-Masry',
    description: 'A collection of essays examining the intersection of scientific advancement and social progress in the Arab world.', genre: 'Science', language: 'Arabic', year: 2023,
    coverUrl: '', publisherId: 'al-ahram', publisherName: 'Al-Ahram', readCount: 4320,
  },
  {
    id: 'b15', title: 'Current Affairs Annual Review 2024', author: 'Al-Ahram Editorial Board',
    description: 'The definitive annual review of regional and global current affairs from the Arab world\'s leading editorial voice.', genre: 'Current Affairs', language: 'Arabic', year: 2024,
    coverUrl: '', publisherId: 'al-ahram', publisherName: 'Al-Ahram', readCount: 8910,
  },
  {
    id: 'b16', title: 'The Pyramid of Ideas: Scientific Thought in the Middle East', author: 'Dr. Tarek El-Baz',
    description: 'A landmark publication tracing the trajectory of scientific thought from ancient civilizations to modern research institutions.', genre: 'Science & Philosophy', language: 'Arabic', year: 2022,
    coverUrl: '', publisherId: 'al-ahram', publisherName: 'Al-Ahram', readCount: 3450,
  },
]

export const EVENTS: FairEvent[] = [
  // Tuesday, April 21
  {
    id: 'e1', title: 'From Nanochemistry to Literature', description: 'A cross-disciplinary dialogue exploring how Dr. Zewail\'s femtochemistry inspires literary narratives of time and transformation.',
    speaker: 'Dr. Hossam El-Din Mostafa', date: '2025-04-21T10:00:00', duration: '1.5 hours', type: 'panel', publisherName: 'General Egyptian Book Organization',
  },
  {
    id: 'e2', title: 'Preserving Heritage in the Digital Age', description: 'How modern digitization techniques are saving Egypt\'s manuscript heritage for future generations.',
    speaker: 'Prof. Aisha Farouk', date: '2025-04-21T14:00:00', duration: '1 hour', type: 'talk', publisherName: 'National Library and Archives',
  },
  // Wednesday, April 22
  {
    id: 'e3', title: 'The Art of Translation: Arabic to the World', description: 'Master translators discuss the challenges and triumphs of bringing Arabic literature to global audiences.',
    speaker: 'Dr. Marilyn Booth & Dr. Nasser Abbas', date: '2025-04-22T10:00:00', duration: '2 hours', type: 'workshop', publisherName: 'Dar Al-Maaref',
  },
  {
    id: 'e4', title: 'Political Discourse and Media Responsibility', description: 'Leading journalists examine the evolving role of media in shaping political understanding.',
    speaker: 'Al-Ahram Editorial Board', date: '2025-04-22T14:00:00', duration: '1.5 hours', type: 'panel', publisherName: 'Al-Ahram',
  },
  // Thursday, April 23
  {
    id: 'e5', title: 'Digital Publishing Workshop', description: 'Hands-on workshop covering modern digital publishing tools and techniques.',
    speaker: 'Eng. Sarah Khalil', date: '2025-04-23T10:00:00', duration: '3 hours', type: 'workshop', publisherName: 'General Egyptian Book Organization',
  },
  {
    id: 'e6', title: 'Scientific Writing for the Public', description: 'How to communicate complex scientific concepts to general audiences effectively.',
    speaker: 'Dr. Tarek El-Baz', date: '2025-04-23T14:00:00', duration: '1 hour', type: 'talk', publisherName: 'Al-Ahram',
  },
  // Friday, April 24
  {
    id: 'e7', title: '130 Years of Dar Al-Maaref', description: 'A celebratory retrospective of Egypt\'s oldest publishing house and its impact on national culture.',
    speaker: 'Dar Al-Maaref Leadership', date: '2025-04-24T10:00:00', duration: '2 hours', type: 'panel', publisherName: 'Dar Al-Maaref',
  },
  {
    id: 'e8', title: 'Rare Manuscripts: A Digital Viewing', description: 'Exclusive digital viewing and discussion of recently digitized rare manuscripts from the National Archives.',
    speaker: 'National Archives Curators', date: '2025-04-24T14:00:00', duration: '1.5 hours', type: 'talk', publisherName: 'National Library and Archives',
  },
]

export const GENRES = [
  'All Genres', 'Anthology', 'History', 'Poetry', 'Art & Architecture', 
  'Academic', 'Classic Literature', 'Science', 'Reference', 'Manuscripts', 
  'Archives', 'Historical Documents', 'Architecture', 'Political Science', 
  'Current Affairs', 'Science & Philosophy',
]

export const LANGUAGES = ['All Languages', 'Arabic', 'English', 'Multilingual']

export function getBooksByPublisher(publisherId: string): Book[] {
  return BOOKS.filter(b => b.publisherId === publisherId)
}

export function getBookById(id: string): Book | undefined {
  return BOOKS.find(b => b.id === id)
}

export function searchBooks(query: string, filters: { genre?: string; language?: string; year?: string; publisher?: string }): Book[] {
  let results = [...BOOKS]
  
  if (query) {
    const q = query.toLowerCase()
    results = results.filter(b => 
      b.title.toLowerCase().includes(q) || 
      b.author.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q)
    )
  }
  
  if (filters.genre && filters.genre !== 'All Genres') {
    results = results.filter(b => b.genre === filters.genre)
  }
  
  if (filters.language && filters.language !== 'All Languages') {
    results = results.filter(b => b.language === filters.language)
  }
  
  if (filters.year) {
    results = results.filter(b => b.year.toString() === filters.year)
  }
  
  if (filters.publisher) {
    results = results.filter(b => b.publisherId === filters.publisher)
  }
  
  return results
}

// Color generator for book covers based on title hash
export function getBookCoverGradient(title: string): string {
  const colors = [
    'from-sky-400 to-blue-600',
    'from-emerald-400 to-teal-600',
    'from-amber-400 to-orange-600',
    'from-rose-400 to-red-600',
    'from-violet-400 to-purple-600',
    'from-cyan-400 to-sky-600',
    'from-lime-400 to-green-600',
    'from-fuchsia-400 to-pink-600',
    'from-indigo-400 to-blue-700',
    'from-yellow-400 to-amber-600',
  ]
  let hash = 0
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}
