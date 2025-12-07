import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Get admin token from header (simple auth check)
    const adminEmail = request.headers.get('x-admin-email')
    
    if (!adminEmail) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Verify admin exists
    const admin = await prisma.admin.findUnique({
      where: { email: adminEmail }
    })

    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get total waitlist count
    const totalWaitlist = await prisma.waitlistUser.count()

    // Get total clicks
    const totalClicks = await prisma.click.count()

    // Get total promoters
    const totalPromoters = await prisma.promoter.count()

    // Get waitlist signups by country
    const waitlistByCountry = await prisma.waitlistUser.groupBy({
      by: ['country'],
      _count: {
        country: true
      },
      orderBy: {
        _count: {
          country: 'desc'
        }
      }
    })

    // Get waitlist signups by promoter
    const waitlistByPromoter = await prisma.waitlistUser.groupBy({
      by: ['promoterId', 'referralCode'],
      _count: {
        promoterId: true
      },
      where: {
        promoterId: {
          not: null
        }
      },
      orderBy: {
        _count: {
          promoterId: 'desc'
        }
      }
    })

    // Get promoter details for the signups
    const promoterIds = waitlistByPromoter
      .filter(w => w.promoterId)
      .map(w => w.promoterId as string)

    const promoters = await prisma.promoter.findMany({
      where: {
        id: {
          in: promoterIds
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        referralCode: true,
        commission: true,
        createdAt: true,
        _count: {
          select: {
            clicks: true,
            waitlistUsers: true
          }
        }
      }
    })

    // Get all promoters with their stats
    const allPromoters = await prisma.promoter.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        referralCode: true,
        commission: true,
        createdAt: true,
        _count: {
          select: {
            clicks: true,
            waitlistUsers: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Get all waitlist users
    const allWaitlistUsers = await prisma.waitlistUser.findMany({
      include: {
        promoter: {
          select: {
            name: true,
            referralCode: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Get clicks by country
    const clicksByCountry = await prisma.click.groupBy({
      by: ['country'],
      _count: {
        country: true
      },
      orderBy: {
        _count: {
          country: 'desc'
        }
      }
    })

    // Get recent signups (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    const recentSignups = await prisma.waitlistUser.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      }
    })

    // Get direct signups (no promoter)
    const directSignups = await prisma.waitlistUser.count({
      where: {
        promoterId: null
      }
    })

    // Get referred signups
    const referredSignups = await prisma.waitlistUser.count({
      where: {
        promoterId: {
          not: null
        }
      }
    })

    // Calculate conversion rate
    const conversionRate = totalClicks > 0 
      ? ((referredSignups / totalClicks) * 100).toFixed(2)
      : '0.00'

    return NextResponse.json({
      overview: {
        totalWaitlist,
        totalClicks,
        totalPromoters,
        directSignups,
        referredSignups,
        recentSignups,
        conversionRate
      },
      waitlistByCountry: waitlistByCountry.map(w => ({
        country: w.country || 'Unknown',
        count: w._count.country
      })),
      clicksByCountry: clicksByCountry.map(c => ({
        country: c.country || 'Unknown',
        count: c._count.country
      })),
      promoters: allPromoters.map(p => ({
        id: p.id,
        name: p.name,
        email: p.email,
        referralCode: p.referralCode,
        commission: p.commission,
        clicks: p._count.clicks,
        signups: p._count.waitlistUsers,
        conversionRate: p._count.clicks > 0 
          ? ((p._count.waitlistUsers / p._count.clicks) * 100).toFixed(2)
          : '0.00',
        createdAt: p.createdAt
      })),
      waitlistUsers: allWaitlistUsers.map(w => ({
        id: w.id,
        email: w.email,
        country: w.country || 'Unknown',
        city: w.city || 'Unknown',
        referralCode: w.referralCode,
        promoterName: w.promoter?.name || null,
        createdAt: w.createdAt
      }))
    })
  } catch (error) {
    console.error('Admin stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
