import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendBulkEmails } from '@/lib/email/resend'

export async function POST(request: NextRequest) {
  try {
    // Get admin email from header for authentication
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

    const { 
      subject, 
      headline, 
      content, 
      ctaText, 
      ctaUrl,
      sendToWaitlist = true,
      sendToPromoters = false 
    } = await request.json()

    if (!subject || !headline || !content) {
      return NextResponse.json(
        { error: 'Subject, headline, and content are required' }, 
        { status: 400 }
      )
    }

    const recipients: string[] = []

    // Get waitlist emails
    if (sendToWaitlist) {
      const waitlistUsers = await prisma.waitlistUser.findMany({
        select: { email: true }
      })
      recipients.push(...waitlistUsers.map(u => u.email))
    }

    // Get promoter emails
    if (sendToPromoters) {
      const promoters = await prisma.promoter.findMany({
        select: { email: true }
      })
      recipients.push(...promoters.map(p => p.email))
    }

    if (recipients.length === 0) {
      return NextResponse.json(
        { error: 'No recipients found' }, 
        { status: 400 }
      )
    }

    // Remove duplicates
    const uniqueRecipients = [...new Set(recipients)]

    // Send emails in batches
    const results = await sendBulkEmails({
      recipients: uniqueRecipients,
      subject,
      headline,
      content,
      ctaText,
      ctaUrl
    })

    return NextResponse.json({ 
      success: true,
      totalRecipients: uniqueRecipients.length,
      sent: results.sent,
      failed: results.failed,
      message: `Newsletter sent to ${results.sent} recipients. ${results.failed} failed.`
    })

  } catch (error) {
    console.error('Error sending newsletter:', error)
    return NextResponse.json(
      { error: 'Failed to send newsletter' }, 
      { status: 500 }
    )
  }
}
