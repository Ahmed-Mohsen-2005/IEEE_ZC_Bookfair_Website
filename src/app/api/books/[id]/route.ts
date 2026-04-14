import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { unlink } from 'fs/promises'
import path from 'path'

// PATCH /api/books/[id] — update a book
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { title, author, genre, language, year, description } = body
    const book = await db.book.update({
      where: { id: params.id },
      data: {
        ...(title       && { title }),
        ...(author      && { author }),
        ...(genre       && { genre }),
        ...(language    && { language }),
        ...(year        && { year: Number(year) }),
        ...(description !== undefined && { description }),
      },
      include: { publisher: true },
    })
    return NextResponse.json({ book })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

// DELETE /api/books/[id] — delete a book and its file
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const book = await db.book.findUnique({ where: { id: params.id } })
    if (!book) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    // Remove physical file if exists
    if (book.fileUrl) {
      try {
        await unlink(path.join(process.cwd(), 'public', book.fileUrl))
      } catch { /* file may already be gone */ }
    }

    await db.userBook.deleteMany({ where: { bookId: params.id } })
    await db.book.delete({ where: { id: params.id } })

    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
