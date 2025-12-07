# 🥕 Karrot AI - Waitlist Website

A premium waitlist website for Karrot AI - an AI-powered barcode scanning app. Includes a promoter affiliate system with tracking and analytics.

## Features

### Main Website
- **Premium Design**: Black/white/grey themed, modern and sleek UI
- **Waitlist Signup**: Email submission with automatic confirmation email
- **Referral Tracking**: Tracks signups from promoter referral links
- **Geolocation**: Captures country and city data for analytics

### Promoter System
- **Registration**: Promoters sign up and receive unique referral links
- **Dashboard**: Complete analytics dashboard showing:
  - Total clicks on referral link
  - Total waitlist signups
  - Conversion rate
  - Clicks and signups by country
  - Recent activity logs
- **20% Commission**: Promoters earn 20% commission when app launches

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **Email**: Nodemailer

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `.env`:
   ```env
   # Database
   DATABASE_URL="file:./dev.db"

   # NextAuth
   NEXTAUTH_SECRET="your-super-secret-key-change-in-production"
   NEXTAUTH_URL="http://localhost:3000"

   # Email Configuration (for sending waitlist confirmation emails)
   EMAIL_SERVER_HOST="smtp.gmail.com"
   EMAIL_SERVER_PORT="587"
   EMAIL_SERVER_USER="your-email@gmail.com"
   EMAIL_SERVER_PASSWORD="your-app-password"
   EMAIL_FROM="noreply@karrotai.com"

   # App URL
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Main waitlist landing page |
| `/?ref=XXXXX` | Waitlist page with promoter referral tracking |
| `/promoter/register` | Promoter registration page |
| `/promoter/login` | Promoter login page |
| `/promoter/dashboard` | Promoter analytics dashboard |

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/waitlist` | POST | Add email to waitlist |
| `/api/track-click` | POST | Track referral link click |
| `/api/promoter/register` | POST | Register new promoter |
| `/api/promoter/stats` | GET | Get promoter statistics |
| `/api/auth/[...nextauth]` | * | NextAuth authentication |

## Email Setup

To enable confirmation emails, you need to configure SMTP settings:

### Gmail Setup
1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password at https://myaccount.google.com/apppasswords
3. Use the generated password in `EMAIL_SERVER_PASSWORD`

### Other Providers
You can use any SMTP provider (SendGrid, Mailgun, etc.) by updating the email configuration in `.env`.

## Production Deployment

1. Update environment variables for production:
   - Use a proper database (PostgreSQL recommended)
   - Update `NEXTAUTH_URL` to your domain
   - Set a strong `NEXTAUTH_SECRET`
   - Configure production email service

2. Update Prisma schema for PostgreSQL if needed:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

3. Build and deploy:
   ```bash
   npm run build
   npm start
   ```

## License

© 2025 Karrot AI. All rights reserved.
