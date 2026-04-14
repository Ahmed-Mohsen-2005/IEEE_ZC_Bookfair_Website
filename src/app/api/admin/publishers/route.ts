import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const publishers = await db.publisher.findMany({
      include: { books: { select: { id: true, readCount: true } } },
      orderBy: { name: 'asc' },
    })
    return NextResponse.json({ publishers })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
