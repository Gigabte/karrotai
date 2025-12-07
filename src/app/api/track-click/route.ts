import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { referralCode, country, city, userAgent, ipAddress } = await request.json()

    if (!referralCode) {
      return NextResponse.json({ error: 'Referral code is required' }, { status: 400 })
    }

    // Find promoter by referral code
    const promoter = await prisma.promoter.findUnique({
      where: { referralCode }
    })

    if (!promoter) {
      return NextResponse.json({ error: 'Invalid referral code' }, { status: 404 })
    }

    // Record the click
    await prisma.click.create({
      data: {
        promoterId: promoter.id,
        country,
        city,
        userAgent,
        ipAddress
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking click:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
