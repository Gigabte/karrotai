# 📧 Email Setup Guide for Karrot AI

## Overview
Your Karrot AI waitlist now has a complete email system with beautiful, responsive email templates:

1. **Waitlist Confirmation Email** - Sent when users join the waitlist
2. **Promoter Welcome Email** - Sent when promoters register
3. **Newsletter/Announcement Email** - For sending updates to your audience

---

## 🚀 Quick Setup with Resend (Recommended)

### Why Resend?
- ✅ Modern, developer-friendly API
- ✅ Free tier: 3,000 emails/month, 100 emails/day
- ✅ Easy setup with your domain
- ✅ Great deliverability
- ✅ Simple dashboard and analytics

### Step 1: Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up with your email
3. Verify your email address

### Step 2: Add Your Domain
1. In Resend dashboard, click **"Domains"**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `karrotai.com`)
4. Add the DNS records shown to your domain provider:
   - **SPF Record** (TXT)
   - **DKIM Record** (TXT)
   - **DMARC Record** (TXT)

#### Example DNS Records (from your domain registrar):
```
Type: TXT
Name: @
Value: v=spf1 include:resend.com ~all

Type: TXT  
Name: resend._domainkey
Value: [provided by Resend]

Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com
```

### Step 3: Get Your API Key
1. In Resend dashboard, go to **"API Keys"**
2. Click **"Create API Key"**
3. Name it (e.g., "Karrot AI Production")
4. Copy the API key (starts with `re_`)

### Step 4: Update Environment Variables
Open your `.env` file and update:

```bash
# Resend API Key
RESEND_API_KEY="re_your_actual_api_key_here"

# Email sender (use your verified domain)
EMAIL_FROM="Karrot AI <noreply@yourdomain.com>"
# or
EMAIL_FROM="Karrot AI <hello@yourdomain.com>"
```

### Step 5: Verify Domain
1. After adding DNS records, wait 5-10 minutes
2. In Resend dashboard, click **"Verify"** on your domain
3. Once verified, you'll see a green checkmark ✓

---

## 📧 Email Templates Included

### 1. Waitlist Confirmation Email
**Sent automatically when someone joins the waitlist**

Features:
- Welcome message
- Confirmation of registered email
- Shows referral info if user was referred
- What's next section
- Social media links
- Professional branding

**Trigger:** User submits waitlist form on homepage

### 2. Promoter Welcome Email
**Sent automatically when a promoter registers**

Features:
- Welcome message with name
- Unique referral code (in a highlighted box)
- Clickable referral link
- Commission rate (20%)
- How it works guide
- Pro tips for promoting
- Link to promoter dashboard

**Trigger:** Promoter completes registration

### 3. Newsletter/Announcement Email
**Sent manually from admin dashboard**

Features:
- Custom subject line
- Custom headline
- HTML content support
- Optional CTA button
- Social media links
- Professional footer

**How to send:** Admin Dashboard → "Send Newsletter" button

---

## 🎨 Testing Your Emails

### Test in Development
Before going live, you can test with Resend's test mode:

1. Go to Resend dashboard
2. Click **"Emails"** → **"Send Test Email"**
3. Or just test locally - emails will appear in Resend logs even if not delivered

### Test Your Setup
```bash
# In your project directory
cd /Users/sinan/Desktop/Karrot\ Ai\ Web/karrot-ai-web

# Make sure dev server is running
npm run dev

# Test waitlist signup
# Go to http://localhost:3000 and submit the waitlist form

# Test promoter registration  
# Go to http://localhost:3000/promoter/register and create an account

# Test newsletter
# Go to http://localhost:3000/admin/login
# Login and click "Send Newsletter"
```

---

## 📊 Admin Newsletter Feature

### How to Send a Newsletter

1. **Login to Admin Dashboard**
   - Go to `/admin/login`
   - Email: `owner@karrotai.app`
   - Password: `KarrotAdmin2024!`

2. **Click "Send Newsletter" Button**
   - Located in the top right of the dashboard

3. **Fill Out the Form**
   - **Recipients:** Check who should receive (Waitlist Users, Promoters, or both)
   - **Subject Line:** Email subject (e.g., "Exciting News from Karrot AI!")
   - **Headline:** Main heading in email
   - **Content:** Main email body (HTML supported)
   - **CTA Button (optional):** Add a call-to-action button

4. **Send**
   - Click "Send Newsletter"
   - You'll see a success message with # of emails sent

### Newsletter Content Tips

**Good Subject Lines:**
- "We're Launching Soon! 🚀"
- "Exclusive Early Access for You"
- "Big Update: Karrot AI Beta is Here"

**HTML Content Example:**
```html
<p>Hey there! 👋</p>

<p>We're thrilled to announce that <strong>Karrot AI</strong> is launching next week!</p>

<p>As a valued member of our waitlist, you'll be among the first to get access. Here's what you can expect:</p>

<ul>
  <li>🎯 Personalized nutrition insights</li>
  <li>🥗 AI-powered meal planning</li>
  <li>📊 Real-time health tracking</li>
</ul>

<p>Stay tuned for your exclusive invite!</p>

<p>Best,<br>The Karrot AI Team</p>
```

---

## 🔧 Customization

### Update Email Templates
Email templates are in: `/src/emails/`

- `WaitlistConfirmation.tsx` - Waitlist confirmation
- `PromoterWelcome.tsx` - Promoter welcome
- `Newsletter.tsx` - Newsletter template

### Change Email Styling
Each template has inline styles at the bottom. You can customize:
- Colors (change `#f59e0b` to your brand color)
- Fonts
- Layout
- Button styles

### Update Social Links
In each template, update these URLs:
```typescript
<Link href="https://instagram.com/karrotai">Instagram</Link>
<Link href="https://x.com/karrotai">Twitter</Link>
<Link href="https://tiktok.com/@karrotai">TikTok</Link>
```

---

## 📈 Email Best Practices

### Deliverability
1. ✅ Always verify your domain with Resend
2. ✅ Use a real "from" address (not noreply@ ideally)
3. ✅ Keep email content relevant and valuable
4. ✅ Don't spam - only send when you have something meaningful to share
5. ✅ Monitor your Resend dashboard for bounce rates

### Content
1. 📝 Keep subject lines under 50 characters
2. 📝 Front-load important info
3. 📝 Use clear CTAs
4. 📝 Mobile-friendly (templates are already responsive!)
5. 📝 Test before sending to large lists

### Legal Compliance
1. 📋 Include unsubscribe option (add to newsletter template if needed)
2. 📋 Add your business address in footer
3. 📋 Follow CAN-SPAM / GDPR guidelines

---

## 🚨 Troubleshooting

### Emails Not Sending?

**Check 1: API Key**
```bash
# Make sure RESEND_API_KEY is set in .env
# Should start with "re_"
```

**Check 2: Domain Verified**
- Go to Resend dashboard → Domains
- Your domain should have a green checkmark

**Check 3: From Address**
- Must match your verified domain
- Example: If domain is `karrotai.com`, use `hello@karrotai.com`

**Check 4: Logs**
- Check Resend dashboard → Emails
- Check your terminal console for errors

### Domain Not Verifying?

1. **DNS Propagation:** Wait 15-30 minutes after adding DNS records
2. **Check DNS:** Use [dnschecker.org](https://dnschecker.org) to verify records are live
3. **Contact Support:** Resend has great support if stuck

### Rate Limits?

Free tier limits:
- 3,000 emails/month
- 100 emails/day

If you hit limits:
- Upgrade to paid plan ($20/month for 50k emails)
- Or use batch sending to spread out over days

---

## 💡 Next Steps

1. **Set up your domain with Resend** (15 minutes)
2. **Test all 3 email types** (5 minutes)
3. **Customize templates** with your branding (optional)
4. **Send your first newsletter** to announce launch date!

---

## 📞 Support

If you need help:
- **Resend Docs:** [resend.com/docs](https://resend.com/docs)
- **Resend Support:** [resend.com/support](https://resend.com/support)

---

## 🎉 You're All Set!

Your email system is ready to go. Just add your Resend API key and domain, and you'll be sending beautiful emails to your waitlist! 🚀
