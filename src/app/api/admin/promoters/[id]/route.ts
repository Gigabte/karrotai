import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Get admin token from header (same auth as stats endpoint)
    const adminEmail = request.headers.get('x-admin-email')
    
    if (!adminEmail) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify admin exists
    const admin = await prisma.admin.findUnique({
      where: { email: adminEmail }
    })

    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    // Check if promoter exists
    const promoter = await prisma.promoter.findUnique({
      where: { id }
    })

    if (!promoter) {
      return NextResponse.json({ error: 'Promoter not found' }, { status: 404 })
    }

    // First, delete all clicks associated with this promoter
    await prisma.click.deleteMany({
      where: { promoterId: id }
    })

    // Update waitlist users to remove promoter reference (keep the signups)
    await prisma.waitlistUser.updateMany({
      where: { promoterId: id },
      data: { promoterId: null }
    })

    // Delete the promoter
    await prisma.promoter.delete({
      where: { id }
    })

    return NextResponse.json({ success: true, message: 'Promoter deleted successfully' })
  } catch (error) {
    console.error('Error deleting promoter:', error)
    return NextResponse.json({ error: 'Failed to delete promoter' }, { status: 500 })
  }
}
