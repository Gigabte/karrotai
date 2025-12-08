import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { generateReferralCode } from '@/lib/referral'
import { rateLimit, RATE_LIMITS } from '@/lib/rate-limit'
import { sendPromoterWelcome } from '@/lib/email/resend'

// Verify hCaptcha token
async function verifyHCaptcha(token: string): Promise<boolean> {
  const secret = process.env.HCAPTCHA_SECRET_KEY
  
  console.log('hCaptcha secret exists:', !!secret)
  console.log('hCaptcha token received:', !!token)
  
  // Skip verification in development with test keys
  if (secret === '0x0000000000000000000000000000000000000000') {
    return true
  }
  
  if (!secret) {
    console.error('HCAPTCHA_SECRET_KEY is not set')
    return false
  }
  
  try {
    const response = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secret}&response=${token}`
    })
    const data = await response.json()
    console.log('hCaptcha response:', JSON.stringify(data))
    return data.success === true
  } catch (error) {
    console.error('hCaptcha verification error:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    // Check rate limit
    const rateLimitResult = rateLimit(`promoter-register:${ip}`, RATE_LIMITS.promoterRegister)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many registration attempts. Please try again later.' },
        { status: 429 }
      )
    }

    const { email, password, name, captchaToken } = await request.json()

    // Verify captcha
    if (!captchaToken) {
      return NextResponse.json({ error: 'Please complete the captcha' }, { status: 400 })
    }
    
    const captchaValid = await verifyHCaptcha(captchaToken)
    if (!captchaValid) {
      return NextResponse.json({ error: 'Captcha verification failed' }, { status: 400 })
    }

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Check if email already exists
    const existingPromoter = await prisma.promoter.findUnique({
      where: { email }
    })

    if (existingPromoter) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Generate unique referral code
    let referralCode = generateReferralCode()
    
    // Ensure referral code is unique
    let existingCode = await prisma.promoter.findUnique({
      where: { referralCode }
    })
    
    while (existingCode) {
      referralCode = generateReferralCode()
      existingCode = await prisma.promoter.findUnique({
        where: { referralCode }
      })
    }

    // Create promoter
    const promoter = await prisma.promoter.create({
      data: {
        email,
        password: hashedPassword,
        name,
        referralCode
      }
    })

    // Send welcome email (don't block the response)
    sendPromoterWelcome({
      to: email,
      name,
      email,
      referralCode,
      commission: 20 // Default commission
    }).catch(err => console.error('Failed to send welcome email:', err))

    return NextResponse.json({ 
      success: true, 
      message: 'Account created successfully!',
      referralCode: promoter.referralCode
    })
  } catch (error) {
    console.error('Error creating promoter:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
