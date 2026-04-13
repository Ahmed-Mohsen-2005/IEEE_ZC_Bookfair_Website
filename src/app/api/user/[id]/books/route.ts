import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const userBooks = await db.userBook.findMany({
      where: { userId: id },
      include: { book: { include: { publisher: true } } },
      orderBy: { addedAt: 'desc' },
    })

    return NextResponse.json({ userBooks })
  } catch (error) {
    console.error('User books fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch user books' }, { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { bookId, status } = await request.json()

    if (!bookId || !status) {
      return NextResponse.json({ error: 'bookId and status are required' }, { status: 400 })
    }

    const userBook = await db.userBook.upsert({
      where: {
        userId_bookId: { userId: id, bookId },
      },
      update: { status },
      create: { userId: id, bookId, status },
    })

    return NextResponse.json({ userBook })
  } catch (error) {
    console.error('Add user book error:', error)
    return NextResponse.json({ error: 'Failed to add book to list' }, { status: 500 })
  }
}
