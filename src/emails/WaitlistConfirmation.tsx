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
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://karrotai.app'

  return (
    <Html>
      <Head />
      <Preview>You're on the Karrot AI Waitlist</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logoSection}>
            <Img
              src={`${appUrl}/logo.png`}
              width="48"
              height="48"
              alt="Karrot AI"
              style={logo}
            />
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>You're on the list.</Heading>
            
            <Text style={text}>
              Thanks for joining the Karrot AI waitlist. We'll notify you when we launch.
            </Text>

            <Text style={textSmall}>
              <strong>Email:</strong> {email}
            </Text>

            {promoterName && (
              <Section style={referralBox}>
                <Text style={referralText}>
                  Referred by {promoterName}
                </Text>
              </Section>
            )}

            <Section style={divider} />

            <Text style={textSmall}>
              <strong>What's next?</strong>
            </Text>
            <Text style={textSmall}>
              • Early access to Karrot AI<br />
              • Product updates & news<br />
              • Exclusive launch pricing
            </Text>

            <Section style={ctaSection}>
              <Link href={appUrl} style={button}>
                Visit Karrot AI
              </Link>
            </Section>

            <Section style={faqSection}>
              <Text style={textSmall}>
                Have questions? Check out our{' '}
                <Link href="https://karrotai.app/faq" style={socialLink}>
                  FAQ
                </Link>
              </Text>
            </Section>

            {/* Social Links */}
            <Section style={socialSection}>
              <Text style={socialText}>Follow us</Text>
              <Text style={socialLinks}>
                <Link href="https://www.instagram.com/karrotai?igsh=aDgzY3NibnRzYWhu" style={socialLink}>
                  Instagram
                </Link>
                {' • '}
                <Link href="https://x.com/KarrotAI?t=2iHy5bdpCuH5IlyLUSM9ug&s=08" style={socialLink}>
                  Twitter
                </Link>
                {' • '}
                <Link href="https://tiktok.com/@karrot.ai" style={socialLink}>
                  TikTok
                </Link>
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} Karrot AI
            </Text>
            <Text style={footerText}>
              <Link href="mailto:contact@karrotai.app" style={footerLink}>
                contact@karrotai.app
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default WaitlistConfirmationEmail

// Styles - Minimalist Black/White/Grey Theme
const main = {
  backgroundColor: '#f5f5f5',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '480px',
}

const logoSection = {
  textAlign: 'center' as const,
  marginBottom: '24px',
}

const logo = {
  margin: '0 auto',
}

const content = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '32px',
  border: '1px solid #e5e5e5',
}

const h1 = {
  color: '#000000',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.3',
  margin: '0 0 16px',
  textAlign: 'center' as const,
}

const text = {
  color: '#404040',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 16px',
}

const textSmall = {
  color: '#525252',
  fontSize: '14px',
  lineHeight: '1.7',
  margin: '0 0 12px',
}

const referralBox = {
  backgroundColor: '#fafafa',
  border: '1px solid #e5e5e5',
  borderRadius: '6px',
  padding: '12px 16px',
  margin: '16px 0',
}

const referralText = {
  color: '#525252',
  fontSize: '13px',
  margin: '0',
  textAlign: 'center' as const,
}

const divider = {
  borderTop: '1px solid #e5e5e5',
  margin: '24px 0',
}

const ctaSection = {
  textAlign: 'center' as const,
  margin: '24px 0 16px',
}

const faqSection = {
  textAlign: 'center' as const,
  margin: '16px 0',
}

const button = {
  backgroundColor: '#000000',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '500',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
}

const socialSection = {
  textAlign: 'center' as const,
  marginTop: '24px',
  paddingTop: '20px',
  borderTop: '1px solid #e5e5e5',
}

const socialText = {
  color: '#737373',
  fontSize: '12px',
  margin: '0 0 8px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
}

const socialLinks = {
  color: '#525252',
  fontSize: '13px',
  margin: '0',
}

const socialLink = {
  color: '#000000',
  textDecoration: 'none',
}

const footer = {
  textAlign: 'center' as const,
  marginTop: '24px',
}

const footerText = {
  color: '#a3a3a3',
  fontSize: '12px',
  lineHeight: '1.5',
  margin: '4px 0',
}

const footerLink = {
  color: '#737373',
  textDecoration: 'none',
}
