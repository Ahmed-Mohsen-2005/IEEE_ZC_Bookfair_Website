import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    try {
      const existing = await db.user.findUnique({ where: { email } })
      if (existing) {
        return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
      }

      const user = await db.user.create({
        data: { name, email, password, role: 'visitor' },
      })

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = user
      return NextResponse.json({ user: userWithoutPassword })
    } catch (dbError) {
      console.error('Database connection error in register:', dbError)
      return NextResponse.json({ error: 'The server database is currently unavailable. Please try again or verify configuration.' }, { status: 503 })
    }
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ error: 'An unexpected application error occurred' }, { status: 500 })
  }
}
