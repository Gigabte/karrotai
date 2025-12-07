import { v4 as uuidv4 } from 'uuid'

export function generateReferralCode(): string {
  // Generate a short, unique referral code
  const uuid = uuidv4().replace(/-/g, '')
  return uuid.substring(0, 8).toUpperCase()
}

export function getReferralLink(referralCode: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  return `${baseUrl}?ref=${referralCode}`
}
