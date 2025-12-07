import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const promoterId = (session.user as { id?: string }).id

    if (!promoterId) {
      return NextResponse.json({ error: 'Promoter not found' }, { status: 404 })
    }

    // Get promoter details
    const promoter = await prisma.promoter.findUnique({
      where: { id: promoterId },
      select: {
        id: true,
        name: true,
        email: true,
        referralCode: true,
        commission: true,
        createdAt: true
      }
    })

    if (!promoter) {
      return NextResponse.json({ error: 'Promoter not found' }, { status: 404 })
    }

    // Get click statistics
    const totalClicks = await prisma.click.count({
      where: { promoterId }
    })

    // Get clicks by country
    const clicksByCountry = await prisma.click.groupBy({
      by: ['country'],
      where: { promoterId },
      _count: true,
      orderBy: {
        _count: {
          country: 'desc'
        }
      }
    })

    // Get waitlist signups through this promoter
    const totalSignups = await prisma.waitlistUser.count({
      where: { promoterId }
    })

    // Get signups by country
    const signupsByCountry = await prisma.waitlistUser.groupBy({
      by: ['country'],
      where: { promoterId },
      _count: true,
      orderBy: {
        _count: {
          country: 'desc'
        }
      }
    })

    // Get recent clicks
    const recentClicks = await prisma.click.findMany({
      where: { promoterId },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        country: true,
        city: true,
        createdAt: true
      }
    })

    // Get recent signups
    const recentSignups = await prisma.waitlistUser.findMany({
      where: { promoterId },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        email: true,
        country: true,
        city: true,
        createdAt: true
      }
    })

    // Calculate conversion rate
    const conversionRate = totalClicks > 0 
      ? ((totalSignups / totalClicks) * 100).toFixed(2) 
      : '0.00'

    // Get clicks over time (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const clicksOverTime = await prisma.click.findMany({
      where: {
        promoterId,
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      select: {
        createdAt: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    return NextResponse.json({
      promoter,
      stats: {
        totalClicks,
        totalSignups,
        conversionRate,
        clicksByCountry: clicksByCountry.map(c => ({
          country: c.country || 'Unknown',
          count: c._count
        })),
        signupsByCountry: signupsByCountry.map(s => ({
          country: s.country || 'Unknown',
          count: s._count
        }))
      },
      recentClicks,
      recentSignups,
      clicksOverTime: clicksOverTime.map(c => c.createdAt)
    })
  } catch (error) {
    console.error('Error fetching promoter stats:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
