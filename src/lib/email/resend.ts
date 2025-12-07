import { Resend } from 'resend'
import { render } from '@react-email/render'
import WaitlistConfirmationEmail from '@/emails/WaitlistConfirmation'
import PromoterWelcomeEmail from '@/emails/PromoterWelcome'
import NewsletterEmail from '@/emails/Newsletter'

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

export interface SendWaitlistConfirmationParams {
  to: string
  email: string
  referralCode?: string
  promoterName?: string
}

export interface SendPromoterWelcomeParams {
  to: string
  name: string
  email: string
  referralCode: string
  commission: number
}

export interface SendNewsletterParams {
  to: string | string[]
  subject: string
  headline: string
  content: string
  ctaText?: string
  ctaUrl?: string
}

/**
 * Send waitlist confirmation email
 */
export async function sendWaitlistConfirmation({
  to,
  email,
  referralCode,
  promoterName
}: SendWaitlistConfirmationParams) {
  try {
    const emailHtml = await render(
      WaitlistConfirmationEmail({
        email,
        referralCode,
        promoterName
      })
    )

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Karrot AI <noreply@karrotai.com>',
      to,
      subject: "You're on the Karrot AI Waitlist! 🥕",
      html: emailHtml,
    })

    if (error) {
      console.error('Error sending waitlist confirmation:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error sending waitlist confirmation:', error)
    return { success: false, error }
  }
}

/**
 * Send promoter welcome email
 */
export async function sendPromoterWelcome({
  to,
  name,
  email,
  referralCode,
  commission
}: SendPromoterWelcomeParams) {
  try {
    const emailHtml = await render(
      PromoterWelcomeEmail({
        name,
        email,
        referralCode,
        commission
      })
    )

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Karrot AI <noreply@karrotai.com>',
      to,
      subject: `Welcome to Karrot AI Promoters - Start Earning ${commission}% Commission! 🚀`,
      html: emailHtml,
    })

    if (error) {
      console.error('Error sending promoter welcome:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error sending promoter welcome:', error)
    return { success: false, error }
  }
}

/**
 * Send newsletter/announcement email
 */
export async function sendNewsletter({
  to,
  subject,
  headline,
  content,
  ctaText,
  ctaUrl
}: SendNewsletterParams) {
  try {
    const emailHtml = await render(
      NewsletterEmail({
        subject,
        headline,
        content,
        ctaText,
        ctaUrl
      })
    )

    const recipients = Array.isArray(to) ? to : [to]

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Karrot AI <hello@karrotai.com>',
      to: recipients,
      subject,
      html: emailHtml,
    })

    if (error) {
      console.error('Error sending newsletter:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error sending newsletter:', error)
    return { success: false, error }
  }
}

/**
 * Send bulk emails (for sending to entire waitlist)
 */
export async function sendBulkEmails({
  recipients,
  subject,
  headline,
  content,
  ctaText,
  ctaUrl
}: {
  recipients: string[]
  subject: string
  headline: string
  content: string
  ctaText?: string
  ctaUrl?: string
}) {
  const results = {
    sent: 0,
    failed: 0,
    errors: [] as any[]
  }

  // Send in batches of 100 (Resend's limit)
  const batchSize = 100
  for (let i = 0; i < recipients.length; i += batchSize) {
    const batch = recipients.slice(i, i + batchSize)
    
    try {
      const result = await sendNewsletter({
        to: batch,
        subject,
        headline,
        content,
        ctaText,
        ctaUrl
      })

      if (result.success) {
        results.sent += batch.length
      } else {
        results.failed += batch.length
        results.errors.push(result.error)
      }
    } catch (error) {
      results.failed += batch.length
      results.errors.push(error)
    }

    // Add a small delay between batches to avoid rate limiting
    if (i + batchSize < recipients.length) {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  return results
}
