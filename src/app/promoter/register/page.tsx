'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail, Lock, User, ArrowRight, ArrowLeft, Copy, Check, Percent } from 'lucide-react'
import HCaptcha from '@hcaptcha/react-hcaptcha'

export default function PromoterRegister() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [referralCode, setReferralCode] = useState('')
  const [copied, setCopied] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const captchaRef = useRef<HCaptcha>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      setIsLoading(false)
      return
    }

    if (!captchaToken) {
      setError('Please complete the captcha verification')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/promoter/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, captchaToken })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setSuccess(true)
      setReferralCode(data.referralCode)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      // Reset captcha on error
      captchaRef.current?.resetCaptcha()
      setCaptchaToken(null)
    } finally {
      setIsLoading(false)
    }
  }

  const copyReferralLink = () => {
    const referralLink = `${window.location.origin}?ref=${referralCode}`
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (success) {
    const referralLink = `${typeof window !== 'undefined' ? window.location.origin : ''}?ref=${referralCode}`
    
    return (
      <div className="relative min-h-screen bg-black noise-overlay">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-3xl" />
        </div>

        <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg text-center"
          >
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/5 border border-white/10 mb-8">
              <Check className="h-10 w-10 text-white" strokeWidth={1.5} />
            </div>
            
            <h1 className="text-3xl font-bold text-white tracking-tight mb-3">Welcome Aboard</h1>
            <p className="text-white/40 text-sm tracking-wide mb-10">Your promoter account has been created successfully.</p>

            <div className="glass p-8 text-left">
              <h2 className="text-xs font-light text-white/50 tracking-widest uppercase mb-4">Your Unique Referral Link</h2>
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="text"
                  readOnly
                  value={referralLink}
                  className="flex-1 border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white tracking-wide"
                />
                <button
                  onClick={copyReferralLink}
                  className="btn-premium flex items-center gap-2 bg-white px-5 py-3 text-black transition-all hover:bg-white/90"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              
              <div className="flex items-center gap-3 py-4 border-t border-white/5">
                <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <Percent className="h-5 w-5 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-white text-sm">20% Commission</p>
                  <p className="text-white/40 text-xs">Earned on every referral when we launch</p>
                </div>
              </div>

              <Link
                href="/promoter/login"
                className="btn-premium group flex w-full items-center justify-center gap-2 bg-white py-4 text-black transition-all hover:bg-white/90 mt-6 tracking-widest text-sm uppercase font-light"
              >
                Go to Login
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
            </div>
          </motion.div>
        </main>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-black noise-overlay">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-3xl" />
        <div className="absolute top-20 left-20 w-px h-40 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-20 right-20 w-px h-40 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-8 py-6">
        <Link href="/" className="flex items-center gap-3 group">
          <ArrowLeft className="h-4 w-4 text-white/40 group-hover:text-white transition-colors" strokeWidth={1.5} />
          <span className="text-sm text-white/40 group-hover:text-white transition-colors tracking-widest uppercase">Back</span>
        </Link>
      </nav>

      <main className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-12">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.svg"
                alt="Karrot AI"
                width={60}
                height={60}
                className="h-16 w-16 object-contain mx-auto mb-6"
              />
            </Link>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Become a Promoter</h1>
            <p className="text-white/40 text-sm tracking-wide">
              Earn <span className="text-white">20% commission</span> on every referral
            </p>
          </div>

          <div className="glass p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-xs font-light text-white/50 tracking-widest uppercase">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" strokeWidth={1.5} />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border border-white/10 bg-white/[0.02] px-12 py-4 text-white placeholder-white/30 transition-all focus:border-white/30 focus:bg-white/[0.04] focus-ring tracking-wide"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-light text-white/50 tracking-widest uppercase">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" strokeWidth={1.5} />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-white/10 bg-white/[0.02] px-12 py-4 text-white placeholder-white/30 transition-all focus:border-white/30 focus:bg-white/[0.04] focus-ring tracking-wide"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-xs font-light text-white/50 tracking-widest uppercase">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" strokeWidth={1.5} />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-full border border-white/10 bg-white/[0.02] px-12 py-4 text-white placeholder-white/30 transition-all focus:border-white/30 focus:bg-white/[0.04] focus-ring tracking-wide"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-xs font-light text-white/50 tracking-widest uppercase">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" strokeWidth={1.5} />
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                    className="w-full border border-white/10 bg-white/[0.02] px-12 py-4 text-white placeholder-white/30 transition-all focus:border-white/30 focus:bg-white/[0.04] focus-ring tracking-wide"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* hCaptcha */}
              <div className="flex justify-center">
                <HCaptcha
                  ref={captchaRef}
                  sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || '10000000-ffff-ffff-ffff-000000000001'}
                  onVerify={(token) => setCaptchaToken(token)}
                  onExpire={() => setCaptchaToken(null)}
                  theme="dark"
                />
              </div>

              {error && (
                <p className="text-center text-red-400 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-premium group flex w-full items-center justify-center gap-2 bg-white py-4 text-black transition-all hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50 tracking-widest text-sm uppercase font-light"
              >
                {isLoading ? (
                  'Creating account...'
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-white/40 text-sm">
                Already have an account?{' '}
                <Link href="/promoter/login" className="text-white hover:text-white/80 transition-colors line-animated">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
