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

interface WaitlistConfirmationEmailProps {
  email: string
  referralCode?: string
  promoterName?: string
}

export const WaitlistConfirmationEmail = ({
  email,
  referralCode,
  promoterName
}: WaitlistConfirmationEmailProps) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://karrotai.com'

  return (
    <Html>
      <Head />
      <Preview>Welcome to Karrot AI Waitlist - You're In! 🥕</Preview>
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
            <Heading style={h1}>🎉 You're In!</Heading>
            
            <Text style={text}>
              Welcome to <strong>Karrot AI</strong>! Thank you for joining our waitlist. You're now part of an exclusive community that's about to revolutionize how people make food choices.
            </Text>

            {promoterName && (
              <Section style={referralBox}>
                <Text style={referralText}>
                  🎁 <strong>VIP Referral Bonus!</strong>
                </Text>
                <Text style={referralSubtext}>
                  You were referred by <strong>{promoterName}</strong>. When we launch, they'll earn 20% commission on your purchase!
                </Text>
              </Section>
            )}

            <Text style={text}>
              <strong>Your email:</strong> {email}
            </Text>

            <Section style={infoBox}>
              <Heading style={h2}>✨ What You Get</Heading>
              <div style={bulletContainer}>
                <div style={bulletItem}>
                  <Text style={bulletIcon}>✓</Text>
                  <Text style={bulletContent}>Early access when we launch</Text>
                </div>
                <div style={bulletItem}>
                  <Text style={bulletIcon}>✓</Text>
                  <Text style={bulletContent}>Exclusive updates & sneak peeks</Text>
                </div>
                <div style={bulletItem}>
                  <Text style={bulletIcon}>✓</Text>
                  <Text style={bulletContent}>Premium features at launch</Text>
                </div>
                <div style={bulletItem}>
                  <Text style={bulletIcon}>✓</Text>
                  <Text style={bulletContent}>Special founder pricing</Text>
                </div>
              </div>
            </Section>

            <Section style={ctaSection}>
              <Link href={appUrl} style={button}>
                🥕 Visit Karrot AI
              </Link>
            </Section>

            {/* Enhanced Social Section */}
            <Section style={socialSection}>
              <Text style={socialHeading}>Stay Connected 📱</Text>
              <Text style={socialSubtext}>Follow us for daily health tips, product updates & exclusive content:</Text>
              <div style={socialLinksContainer}>
                <Link href="https://www.instagram.com/karrotai?igsh=aDgzY3NibnRzYWhu" style={socialLinkBadge}>
                  📸 Instagram
                </Link>
                <Link href="https://x.com/KarrotAI?t=2iHy5bdpCuH5IlyLUSM9ug&s=08" style={socialLinkBadge}>
                  𝕏 Twitter
                </Link>
                <Link href="https://tiktok.com/@karrot.ai" style={socialLinkBadge}>
                  🎵 TikTok
                </Link>
              </div>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} Karrot AI. All rights reserved.
            </Text>
            <Text style={footerText}>
              Questions? Reply to this email or contact us at{' '}
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

export default WaitlistConfirmationEmail

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
  margin: '0 0 12px',
}

const text = {
  color: '#52525b',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px',
}

const referralBox = {
  backgroundColor: '#fef3c7',
  border: '2px solid #f59e0b',
  borderRadius: '12px',
  padding: '16px',
  margin: '24px 0',
}

const referralText = {
  color: '#92400e',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0',
  textAlign: 'center' as const,
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
  margin: '0',
}

const bulletContainer = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '12px',
}

const bulletItem = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
}

const bulletIcon = {
  color: '#f59e0b',
  fontSize: '18px',
  fontWeight: 'bold',
  minWidth: '20px',
  margin: '0',
}

const bulletContent = {
  color: '#52525b',
  fontSize: '15px',
  margin: '0',
  flex: 1,
}

const referralSubtext = {
  color: '#92400e',
  fontSize: '14px',
  margin: '8px 0 0',
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

const socialHeading = {
  color: '#000000',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 8px',
}

const socialSubtext = {
  color: '#71717a',
  fontSize: '14px',
  margin: '0 0 16px',
}

const socialLinksContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '12px',
  flexWrap: 'wrap' as const,
}

const socialLinkBadge = {
  backgroundColor: '#f59e0b',
  color: '#000000',
  fontSize: '14px',
  fontWeight: '600',
  textDecoration: 'none',
  padding: '10px 16px',
  borderRadius: '6px',
  display: 'inline-block',
}

const socialText = {
  color: '#71717a',
  fontSize: '14px',
  margin: '0 0 12px',
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
