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

interface NewsletterEmailProps {
  subject: string
  headline: string
  content: string
  ctaText?: string
  ctaUrl?: string
}

export const NewsletterEmail = ({
  subject,
  headline,
  content,
  ctaText,
  ctaUrl
}: NewsletterEmailProps) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://karrotai.com'

  return (
    <Html>
      <Head />
      <Preview>{subject}</Preview>
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
          <Section style={contentSection}>
            <Heading style={h1}>{headline}</Heading>
            
            <div dangerouslySetInnerHTML={{ __html: content }} style={text} />

            {ctaText && ctaUrl && (
              <Section style={ctaSection}>
                <Link href={ctaUrl} style={button}>
                  {ctaText}
                </Link>
              </Section>
            )}

            {/* Social Links */}
            <Section style={socialSection}>
              <Text style={socialText}>Stay connected with us:</Text>
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
              You're receiving this because you're on our waitlist.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default NewsletterEmail

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

const contentSection = {
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

const text = {
  color: '#52525b',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px',
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
