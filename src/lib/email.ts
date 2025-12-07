import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

export async function sendWaitlistEmail(email: string) {
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@karrotai.com',
    to: email,
    subject: "🥕 You're on the Karrot AI Waitlist!",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #000000;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #111111; border-radius: 16px; overflow: hidden;">
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 40px 20px 40px; text-align: center;">
                    <h1 style="margin: 0; font-size: 48px; color: #ffffff;">🥕</h1>
                    <h2 style="margin: 20px 0 0 0; font-size: 28px; font-weight: 700; color: #ffffff;">Karrot AI</h2>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 20px 40px 40px 40px; text-align: center;">
                    <h3 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 600; color: #ffffff;">You're on the waitlist! 🎉</h3>
                    <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #888888;">
                      Thank you for joining the Karrot AI waitlist. We're building the most intelligent barcode scanning app powered by AI.
                    </p>
                    <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #888888;">
                      We'll notify you as soon as we launch. Get ready to scan smarter! 📱
                    </p>
                    
                    <!-- Divider -->
                    <div style="width: 60px; height: 2px; background-color: #333333; margin: 30px auto;"></div>
                    
                    <p style="margin: 0; font-size: 14px; color: #666666;">
                      Stay tuned for updates.
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 40px; background-color: #0a0a0a; text-align: center;">
                    <p style="margin: 0; font-size: 12px; color: #666666;">
                      © ${new Date().getFullYear()} Karrot AI. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}
