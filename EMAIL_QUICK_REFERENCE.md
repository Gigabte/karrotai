# 🚀 Email System Quick Reference

## ✅ What's Included

| Feature | Status | Location |
|---------|--------|----------|
| Waitlist Confirmation Email | ✅ Ready | Sent on signup |
| Promoter Welcome Email | ✅ Ready | Sent on registration |
| Newsletter/Announcement Email | ✅ Ready | Admin → Send Newsletter |
| Email Templates | ✅ 3 beautiful templates | `/src/emails/` |
| Bulk Email Sending | ✅ Batching support | API endpoint |
| HTML Support | ✅ Full HTML support | Newsletter content |

---

## 🔑 Setup Checklist

- [ ] Create [Resend](https://resend.com) account
- [ ] Add your domain (`yourdomain.com`)
- [ ] Add DNS records (SPF, DKIM, DMARC)
- [ ] Get API key
- [ ] Update `.env`:
  ```
  RESEND_API_KEY="re_your_key_here"
  EMAIL_FROM="Karrot AI <noreply@yourdomain.com>"
  ```
- [ ] Verify domain in Resend
- [ ] Test all 3 email types
- [ ] Send first newsletter!

---

## 📧 Email Files

```
/src/emails/
├── WaitlistConfirmation.tsx    # Waitlist signup email
├── PromoterWelcome.tsx          # Promoter registration email
└── Newsletter.tsx               # Admin newsletter template

/src/lib/email/
└── resend.ts                    # Email service functions

/src/app/api/
├── /waitlist/route.ts           # ← Sends confirmation email
├── /promoter/register/route.ts  # ← Sends welcome email
└── /admin/newsletter/route.ts   # ← Newsletter API endpoint

/src/app/admin/newsletter/
└── page.tsx                     # ← Newsletter admin UI
```

---

## 🎯 How Each Email Works

### Waitlist Confirmation (Auto)
```
User submits email on homepage
        ↓
Email validated & added to DB
        ↓
Confirmation email sent automatically
        ↓
User receives: "You're on the Waitlist!" email
```

### Promoter Welcome (Auto)
```
Promoter completes registration
        ↓
Account created with referral code
        ↓
Welcome email sent automatically
        ↓
User receives: Referral code + dashboard link
```

### Newsletter (Manual)
```
Admin clicks "Send Newsletter"
        ↓
Fills out form (subject, content, recipients)
        ↓
Admin hits "Send"
        ↓
Email sent to selected recipients (waitlist/promoters)
```

---

## 🧪 Testing Commands

```bash
# Navigate to project
cd /Users/sinan/Desktop/Karrot\ Ai\ Web/karrot-ai-web

# Dev server
npm run dev

# Test waitlist signup
# → http://localhost:3000 (submit form)

# Test promoter registration
# → http://localhost:3000/promoter/register (create account)

# Test newsletter
# → http://localhost:3000/admin/login
# → Dashboard → Send Newsletter
```

---

## 🔐 Admin Newsletter Access

**URL:** `/admin/newsletter`

**Login:**
- Email: `owner@karrotai.app`
- Password: `KarrotAdmin2024!`

**Features:**
- Send to waitlist users
- Send to promoters
- Send to both
- Custom subject, headline, content
- Optional CTA button
- Real-time sending progress

---

## 📊 Monitor Your Emails

1. Go to [Resend Dashboard](https://resend.com)
2. Click **Emails** tab
3. See all sent emails with:
   - Delivery status
   - Open rates (if enabled)
   - Bounce rates
   - Click tracking

---

## 🎨 Customize Emails

### Update Colors
In `/src/emails/WaitlistConfirmation.tsx`:
```typescript
// Change this color throughout the file
backgroundColor: '#f59e0b',  // Current: amber
// To: '#3b82f6' (blue), '#ef4444' (red), etc.
```

### Update Social Links
In all email files, update:
```typescript
<Link href="https://instagram.com/YOUR_HANDLE">
<Link href="https://x.com/YOUR_HANDLE">
<Link href="https://tiktok.com/@YOUR_HANDLE">
```

### Update Business Address
Add to footer of newsletter template:
```html
<p>
  Karrot AI Inc.<br>
  123 Main St<br>
  San Francisco, CA 94105
</p>
```

---

## 📈 Email Best Practices

✅ **Do:**
- Use clear subject lines
- Add real value in content
- Mobile-friendly (templates already are!)
- Test before sending to large lists
- Monitor bounce/spam rates
- Verify your domain properly

❌ **Don't:**
- Send marketing spam
- Use misleading subject lines
- Forget to add unsubscribe (add if needed)
- Ignore bounce rates
- Send to invalid emails
- Use non-verified domains

---

## 🚨 Common Issues

**Issue:** Emails not sending

**Solutions:**
1. Check API key is set in `.env`
2. Restart dev server after `.env` changes
3. Verify domain in Resend dashboard
4. Check Resend logs for errors
5. Ensure from address matches verified domain

**Issue:** Emails going to spam

**Solutions:**
1. Verify all DNS records (SPF, DKIM, DMARC)
2. Wait for DNS propagation (15-30 min)
3. Keep content professional
4. Send to real, active email addresses
5. Monitor bounce rates in Resend

---

## 💾 Batch Email Limits

**Free Tier (Resend):**
- 3,000 emails/month
- 100 emails/day

**Paid ($20/month):**
- 50,000 emails/month
- 1,000+ emails/day

Our system batches emails automatically, so large campaigns are processed smoothly.

---

## 📞 Need Help?

- **Resend Docs:** [resend.com/docs](https://resend.com/docs)
- **Resend Support:** [resend.com/support](https://resend.com/support)
- **Check logs:** Resend dashboard → Emails → View logs

---

**Status:** ✅ All systems ready to go!

Next step: Add your Resend API key and domain, then start sending emails! 🎉
