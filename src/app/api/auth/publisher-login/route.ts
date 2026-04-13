import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { email, password, publisherId } = await request.json()

    if (!email || !password || !publisherId) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const user = await db.user.findUnique({ where: { email } })
    if (!user || user.password !== password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    if (user.role !== 'publisher' || user.publisherId !== publisherId) {
      return NextResponse.json({ error: 'Not authorized as publisher for this organization' }, { status: 403 })
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json({ user: userWithoutPassword })
  } catch (error) {
    console.error('Publisher login error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
