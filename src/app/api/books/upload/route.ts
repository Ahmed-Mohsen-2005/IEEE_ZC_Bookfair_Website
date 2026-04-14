import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const title       = formData.get('title') as string
    const author      = formData.get('author') as string
    const genre       = formData.get('genre') as string
    const language    = formData.get('language') as string
    const year        = parseInt(formData.get('year') as string || '2024')
    const description = formData.get('description') as string || ''
    const publisherSlug = formData.get('publisherId') as string   // this is actually the slug
    const file        = formData.get('file') as File | null

    if (!title || !author || !genre || !publisherSlug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Resolve publisher: look up by slug first, then by id (cuid)
    let publisher = await db.publisher.findFirst({
      where: { slug: publisherSlug },
    })
    if (!publisher) {
      publisher = await db.publisher.findFirst({
        where: { id: publisherSlug },
      })
    }
    if (!publisher) {
      // Auto-create a publisher record with this slug so upload never fails
      publisher = await db.publisher.create({
        data: {
          name: publisherSlug,
          slug: publisherSlug,
          tagline: '',
          description: '',
          accentColor: '#00B4D1',
        },
      })
    }

    // Save file to public/uploads/ (Local only)
    let fileUrl = ''
    if (file && file.size > 0) {
      if (process.env.VERCEL) {
        // Vercel Serverless is a read-only target (EROFS). We skip physical saving for the demo.
        fileUrl = '#'
      } else {
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
        await mkdir(uploadsDir, { recursive: true })
        const ext = file.name.split('.').pop() || 'pdf'
        const safeName = `${Date.now()}-${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${ext}`
        const bytes = await file.arrayBuffer()
        await writeFile(path.join(uploadsDir, safeName), Buffer.from(bytes))
        fileUrl = `/uploads/${safeName}`
      }
    }

    // Persist to DB
    const book = await db.book.create({
      data: {
        title,
        author,
        genre,
        language: language || 'Arabic',
        year,
        description,
        fileUrl,
        publisherId: publisher.id,
        readCount: 0,
      },
    })

    return NextResponse.json({ book }, { status: 201 })
  } catch (error) {
    console.error('Book upload error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
