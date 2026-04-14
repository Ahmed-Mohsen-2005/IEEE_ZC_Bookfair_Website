import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// PATCH /api/admin/users/[id] — update role
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { role } = await request.json()
    if (!['visitor', 'publisher', 'admin'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }
    const user = await db.user.update({
      where: { id: params.id },
      data: { role },
      select: { id: true, name: true, email: true, role: true },
    })
    return NextResponse.json({ user })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
  }
}

// DELETE /api/admin/users/[id] — remove user
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Remove userBooks first (FK constraint)
    await db.userBook.deleteMany({ where: { userId: params.id } })
    await db.user.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
  }
}
