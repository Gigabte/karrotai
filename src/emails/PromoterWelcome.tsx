import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface PromoterWelcomeEmailProps {
  name: string
  email: string
  referralCode: string
  commission: number
}

export const PromoterWelcomeEmail = ({
  name,
  email,
  referralCode,
  commission
}: PromoterWelcomeEmailProps) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://karrotai.com'
  const dashboardUrl = `${appUrl}/promoter/dashboard`
  const referralLink = `${appUrl}?ref=${referralCode}`

  return (
    <Html>
      <Head />
      <Preview>Welcome to Karrot AI Promoter Program - Start Earning Commission! 🚀</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logoSection}>
            <Img
              src={`${appUrl}/logo.svg`}
              width="50"
              height="50"
              alt="Karrot AI"
              style={logo}
            />
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>Welcome, {name}! 🎉</Heading>
            
            <Text style={text}>
              Congratulations! You're now officially a <strong>Karrot AI Promoter</strong>. You can start earning <strong>{commission}% commission</strong> on every sale from your referrals when we launch!
            </Text>

            <Section style={highlightBox}>
              <Heading style={h2}>Your Referral Details</Heading>
              <Text style={text}>
                <strong>Referral Code:</strong>
              </Text>
              <div style={codeStyle}>{referralCode}</div>
              <Text style={{ ...text, marginTop: '16px' }}>
                <strong>Your Unique Link:</strong>
              </Text>
              <Link href={referralLink} style={linkStyle}>
                {referralLink}
              </Link>
            </Section>

            <Section style={infoBox}>
              <Heading style={h2}>How It Works</Heading>
              <Text style={bulletText}>
                <strong>1. Share Your Link</strong><br />
                Share your unique referral link with your audience on social media, blogs, or anywhere you connect with people.
              </Text>
              <Text style={bulletText}>
                <strong>2. Track Your Performance</strong><br />
                Monitor clicks, signups, and conversions in your personalized dashboard.
              </Text>
              <Text style={bulletText}>
                <strong>3. Earn Commission</strong><br />
                When we launch, you'll earn {commission}% commission on every sale from your referred users!
              </Text>
            </Section>

            <Section style={ctaSection}>
              <Link href={dashboardUrl} style={button}>
                Go to Your Dashboard
              </Link>
            </Section>

            <Section style={statsBox}>
              <Text style={statsText}>
                💡 <strong>Pro Tip:</strong> The best promoters share authentic stories about why they're excited about Karrot AI. Personal recommendations convert better than generic posts!
              </Text>
            </Section>

            {/* Social Links */}
            <Section style={socialSection}>
              <Text style={socialText}>Follow us and share our content:</Text>
              <div style={socialLinks}>
                <Link href="https://www.instagram.com/karrotai?igsh=aDgzY3NibnRzYWhu" style={socialLink}>Instagram</Link>
                <Text style={separator}>•</Text>
                <Link href="https://x.com/KarrotAI?t=2iHy5bdpCuH5IlyLUSM9ug&s=08" style={socialLink}>Twitter</Link>
                <Text style={separator}>•</Text>
                <Link href="https://tiktok.com/@karrot.ai" style={socialLink}>TikTok</Link>
              </div>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} Karrot AI. All rights reserved.
            </Text>
            <Text style={footerText}>
              Need help? Contact us at{' '}
              <Link href="mailto:support@karrotai.com" style={footerLink}>
                support@karrotai.com
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default PromoterWelcomeEmail

// Styles
const main = {
  backgroundColor: '#000000',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '600px',
}

const logoSection = {
  textAlign: 'center' as const,
  marginBottom: '32px',
}

const logo = {
  margin: '0 auto',
}

const content = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '40px 32px',
}

const h1 = {
  color: '#000000',
  fontSize: '28px',
  fontWeight: '700',
  lineHeight: '1.3',
  margin: '0 0 24px',
  textAlign: 'center' as const,
}

const h2 = {
  color: '#000000',
  fontSize: '20px',
  fontWeight: '600',
  margin: '0 0 16px',
}

const text = {
  color: '#52525b',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px',
}

const highlightBox = {
  backgroundColor: '#fef3c7',
  border: '2px solid #f59e0b',
  borderRadius: '12px',
  padding: '24px',
  margin: '24px 0',
}

const codeStyle = {
  backgroundColor: '#000000',
  color: '#f59e0b',
  padding: '12px 16px',
  borderRadius: '8px',
  fontSize: '18px',
  fontWeight: '700',
  display: 'block',
  textAlign: 'center' as const,
  letterSpacing: '2px',
}

const linkStyle = {
  color: '#f59e0b',
  fontSize: '14px',
  wordBreak: 'break-all' as const,
  textDecoration: 'underline',
}

const infoBox = {
  backgroundColor: '#f4f4f5',
  borderRadius: '12px',
  padding: '24px',
  margin: '24px 0',
}

const bulletText = {
  color: '#52525b',
  fontSize: '15px',
  lineHeight: '1.8',
  margin: '0 0 16px',
}

const statsBox = {
  backgroundColor: '#dbeafe',
  border: '2px solid #3b82f6',
  borderRadius: '12px',
  padding: '16px',
  margin: '24px 0',
}

const statsText = {
  color: '#1e40af',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '0',
}

const ctaSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#f59e0b',
  borderRadius: '8px',
  color: '#000000',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 32px',
}

const socialSection = {
  textAlign: 'center' as const,
  marginTop: '32px',
  paddingTop: '24px',
  borderTop: '1px solid #e4e4e7',
}

const socialText = {
  color: '#71717a',
  fontSize: '14px',
  margin: '0 0 12px',
}

const socialLinks = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
}

const socialLink = {
  color: '#f59e0b',
  fontSize: '14px',
  textDecoration: 'none',
}

const separator = {
  color: '#d4d4d8',
  fontSize: '14px',
  margin: '0 4px',
}

const footer = {
  textAlign: 'center' as const,
  marginTop: '32px',
}

const footerText = {
  color: '#a1a1aa',
  fontSize: '12px',
  lineHeight: '1.6',
  margin: '8px 0',
}

const footerLink = {
  color: '#f59e0b',
  textDecoration: 'none',
}
