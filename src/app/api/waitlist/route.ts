import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendWaitlistConfirmation } from '@/lib/email/resend'
import { rateLimit, RATE_LIMITS } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    // Check rate limit
    const rateLimitResult = rateLimit(`waitlist:${ip}`, RATE_LIMITS.waitlist)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(rateLimitResult.resetIn / 1000))
          }
        }
      )
    }

    const { email, referralCode, country, city } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Check if email already exists
    const existingUser = await prisma.waitlistUser.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ error: 'Email already on waitlist' }, { status: 400 })
    }

    // Find promoter by referral code if provided
    let promoterId = null
    let promoterName = null
    if (referralCode) {
      const promoter = await prisma.promoter.findUnique({
        where: { referralCode }
      })
      if (promoter) {
        promoterId = promoter.id
        promoterName = promoter.name
      }
    }

    // Create waitlist entry
    const waitlistUser = await prisma.waitlistUser.create({
      data: {
        email,
        country,
        city,
        referralCode,
        promoterId
      }
    })

    // Send confirmation email (don't block the response)
    sendWaitlistConfirmation({
      to: email,
      email,
      referralCode,
      promoterName: promoterName || undefined
    }).catch(err => console.error('Failed to send confirmation email:', err))

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully joined the waitlist!',
      id: waitlistUser.id 
    })
  } catch (error) {
    console.error('Error adding to waitlist:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
