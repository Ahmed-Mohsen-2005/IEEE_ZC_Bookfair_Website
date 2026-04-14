import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/books — list all books (with publisher info)
export async function GET() {
  try {
    const books = await db.book.findMany({
      include: { publisher: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ books })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
