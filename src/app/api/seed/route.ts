import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { PUBLISHERS, BOOKS } from '@/lib/data'

export async function GET() {
  try {
    // Seed publishers
    for (const p of PUBLISHERS) {
      await db.publisher.upsert({
        where: { slug: p.slug },
        update: {
          name: p.name,
          tagline: p.tagline,
          description: p.description,
          accentColor: p.accentColor,
          bookCount: p.bookCount,
        },
        create: {
          id: p.id,
          name: p.name,
          slug: p.slug,
          tagline: p.tagline,
          description: p.description,
          accentColor: p.accentColor,
          bookCount: p.bookCount,
        },
      })
    }

    // Seed books
    for (const b of BOOKS) {
      await db.book.upsert({
        where: { id: b.id },
        update: {
          title: b.title,
          author: b.author,
          description: b.description,
          genre: b.genre,
          language: b.language,
          year: b.year,
          readCount: b.readCount,
          publisherId: b.publisherId,
        },
        create: {
          id: b.id,
          title: b.title,
          author: b.author,
          description: b.description,
          genre: b.genre,
          language: b.language,
          year: b.year,
          readCount: b.readCount,
          publisherId: b.publisherId,
        },
      })
    }

    // Seed a demo visitor
    await db.user.upsert({
      where: { email: 'visitor@zewail.edu.eg' },
      update: {},
      create: {
        email: 'visitor@zewail.edu.eg',
        name: 'Demo Visitor',
        password: 'demo123',
        role: 'visitor',
      },
    })

    // Seed a demo publisher user
    await db.user.upsert({
      where: { email: 'publisher@zewail.edu.eg' },
      update: {},
      create: {
        email: 'publisher@zewail.edu.eg',
        name: 'GEBO Publisher',
        password: 'demo123',
        role: 'publisher',
        publisherId: 'general-egyptian',
      },
    })

    return NextResponse.json({ success: true, message: 'Database seeded successfully' })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ success: false, error: 'Failed to seed database' }, { status: 500 })
  }
}
