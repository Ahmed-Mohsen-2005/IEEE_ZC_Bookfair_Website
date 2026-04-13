import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q') || ''
    const genre = searchParams.get('genre') || ''
    const language = searchParams.get('language') || ''
    const year = searchParams.get('year') || ''
    const publisher = searchParams.get('publisher') || ''

    const where: Record<string, unknown> = {}

    if (q) {
      where.OR = [
        { title: { contains: q } },
        { author: { contains: q } },
        { description: { contains: q } },
      ]
    }

    if (genre) where.genre = genre
    if (language) where.language = language
    if (year) where.year = parseInt(year)
    if (publisher) where.publisherId = publisher

    const books = await db.book.findMany({
      where,
      include: { publisher: true },
      orderBy: { readCount: 'desc' },
    })

    return NextResponse.json({ books })
  } catch (error) {
    console.error('Books fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 })
  }
}
