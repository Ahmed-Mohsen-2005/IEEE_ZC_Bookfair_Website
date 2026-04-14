import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    try {
      const user = await db.user.findUnique({ where: { email } })
      if (!user || user.password !== password) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...userWithoutPassword } = user
      return NextResponse.json({ user: userWithoutPassword })
    } catch (dbError) {
      console.error('Database connection error in login:', dbError)
      return NextResponse.json({ error: 'The server database is currently unavailable. Please try again or verify configuration.' }, { status: 503 })
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'An unexpected application error occurred' }, { status: 500 })
  }
}
