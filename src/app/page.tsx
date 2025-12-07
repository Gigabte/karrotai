'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Scan, 
  Shield, 
  Sparkles, 
  Heart, 
  ChevronRight, 
  Mail, 
  ArrowRight,
  Check,
  Zap,
  Eye,
  Leaf,
  AlertTriangle,
  BarChart3,
  Smartphone,
  Globe,
  Lock,
  Users,
  Share2,
  Copy,
  MessageCircle
} from 'lucide-react'

function WaitlistForm() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [hasTrackedClick, setHasTrackedClick] = useState(false)

  const shareUrl = typeof window !== 'undefined' ? window.location.origin : 'https://karrotai.app'
  const shareText = "I just joined the Karrot AI waitlist! Get early access to AI-powered health insights. Join me:"

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'width=550,height=450')
  }

  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
    window.open(url, '_blank')
  }

  useEffect(() => {
    const ref = searchParams.get('ref')
    if (ref && !hasTrackedClick) {
      setReferralCode(ref)
      
      // Check sessionStorage to prevent duplicate tracking on page refresh
      const trackedKey = `click_tracked_${ref}`
      if (!sessionStorage.getItem(trackedKey)) {
        trackClick(ref)
        sessionStorage.setItem(trackedKey, 'true')
        setHasTrackedClick(true)
      }
    }
  }, [searchParams, hasTrackedClick])

  const trackClick = async (code: string) => {
    try {
      let country = ''
      let city = ''
      
      try {
        const geoResponse = await fetch('https://ipapi.co/json/')
        if (geoResponse.ok) {
          const geoData = await geoResponse.json()
          country = geoData.country_name || ''
          city = geoData.city || ''
        }
      } catch (e) {
        console.log('Could not fetch geo data')
      }

      await fetch('/api/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          referralCode: code,
          country,
          city,
          userAgent: navigator.userAgent
        })
      })
    } catch (err) {
      console.error('Error tracking click:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      let country = ''
      let city = ''
      
      try {
        const geoResponse = await fetch('https://ipapi.co/json/')
        if (geoResponse.ok) {
          const geoData = await geoResponse.json()
          country = geoData.country_name || ''
          city = geoData.city || ''
        }
      } catch (e) {
        console.log('Could not fetch geo data')
      }

      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          referralCode,
          country,
          city
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center px-4"
      >
        <div className="mb-4 sm:mb-6 inline-flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-white/5 border border-white/10">
          <Check className="h-8 w-8 sm:h-10 sm:w-10 text-white" strokeWidth={1.5} />
        </div>
        <h2 className="mb-2 sm:mb-3 text-xl sm:text-2xl font-light tracking-wide text-white">You&apos;re on the list</h2>
        <p className="text-xs sm:text-sm text-white/50 tracking-wide mb-6 sm:mb-8">
          We&apos;ll notify you when Karrot AI launches.
        </p>
        
        {/* Social Share Section */}
        <div className="pt-6 border-t border-white/10">
          <p className="text-xs text-white/40 tracking-wide uppercase mb-4 flex items-center justify-center gap-2">
            <Share2 className="h-3 w-3" strokeWidth={1.5} />
            Share with friends
          </p>
          <div className="flex items-center justify-center gap-3">
            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300 text-xs tracking-wide"
            >
              <Copy className="h-4 w-4" strokeWidth={1.5} />
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            
            {/* Twitter/X */}
            <button
              onClick={shareToTwitter}
              className="flex items-center justify-center w-10 h-10 bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300"
              aria-label="Share on X (Twitter)"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </button>
            
            {/* WhatsApp */}
            <button
              onClick={shareToWhatsApp}
              className="flex items-center justify-center w-10 h-10 bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300"
              aria-label="Share on WhatsApp"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl px-2 sm:px-0">
      <div className="flex flex-col gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" strokeWidth={1.5} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full rounded-none border border-white/10 bg-white/[0.02] px-12 py-4 text-base sm:text-sm text-white placeholder-white/30 transition-all duration-300 focus:border-white/30 focus:bg-white/[0.04] focus-ring tracking-wide"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-premium group flex items-center justify-center gap-2 bg-white px-6 sm:px-8 py-4 text-black transition-all duration-300 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50 tracking-widest text-sm uppercase font-light"
        >
          {isSubmitting ? (
            'Joining...'
          ) : (
            <>
              Join Waitlist
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </>
          )}
        </button>
      </div>
      {error && (
        <p className="mt-4 text-center text-red-400 text-sm tracking-wide">{error}</p>
      )}
    </form>
  )
}

const features = [
  {
    icon: Scan,
    title: 'Instant Scanning',
    description: 'Point your camera at any product barcode or ingredient list for immediate AI-powered analysis.'
  },
  {
    icon: Heart,
    title: 'Health Insights',
    description: 'Get personalized health assessments based on your dietary restrictions and wellness goals.'
  },
  {
    icon: AlertTriangle,
    title: 'Harmful Detection',
    description: 'Instantly identify harmful additives, allergens, and ingredients that don\'t align with your health profile.'
  },
  {
    icon: Sparkles,
    title: 'AI Recommendations',
    description: 'Receive intelligent suggestions for healthier alternatives tailored to your preferences.'
  },
  {
    icon: BarChart3,
    title: 'Nutritional Analysis',
    description: 'Comprehensive breakdown of nutritional values with easy-to-understand health scores.'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your health data stays private and secure. We never share your personal information.'
  }
]

const stats = [
  { value: '10M+', label: 'Products in Database' },
  { value: '99.9%', label: 'Scanning Accuracy' },
  { value: '<5s', label: 'Analysis Time' },
  { value: '50+', label: 'Countries Supported' }
]

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen bg-black noise-overlay">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <Image
                src="/logo.svg"
                alt="Karrot AI"
                width={40}
                height={40}
                className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
              />
              <span className="text-sm sm:text-lg tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white font-light">Karrot AI</span>
            </Link>
            <div className="flex items-center gap-4 sm:gap-8">
              <a href="#features" className="hidden lg:block text-sm text-white/60 hover:text-white transition-colors tracking-widest uppercase">
                Features
              </a>
              <a href="#about" className="hidden lg:block text-sm text-white/60 hover:text-white transition-colors tracking-widest uppercase">
                About
              </a>
              <a href="#contact" className="hidden lg:block text-sm text-white/60 hover:text-white transition-colors tracking-widest uppercase">
                Contact
              </a>
              <Link 
                href="/faq"
                className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors tracking-wider sm:tracking-widest uppercase"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 px-4">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />
          <div 
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
              transform: `translate(-50%, ${scrollY * 0.1}px)`
            }}
          />
          {/* Left side decorative lines */}
          <div className="hidden lg:block absolute top-1/3 left-16 xl:left-24 w-px h-64 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          <div className="hidden lg:block absolute top-1/2 left-24 xl:left-32 w-16 h-px bg-gradient-to-r from-white/10 to-transparent" />
          
          {/* Right side decorative lines */}
          <div className="hidden lg:block absolute top-1/3 right-16 xl:right-24 w-px h-64 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          <div className="hidden lg:block absolute top-1/2 right-24 xl:right-32 w-16 h-px bg-gradient-to-l from-white/10 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 sm:mb-8"
          >
            <Image
              src="/logo.svg"
              alt="Karrot AI"
              width={120}
              height={120}
              className="mx-auto h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 object-contain animate-float"
              priority
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 sm:mb-6 text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white leading-tight"
          >
            Know What You
            <br />
            <span className="gradient-text">Consume</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 sm:mb-12 max-w-xl sm:max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/50 font-light tracking-wide leading-relaxed px-2"
          >
            AI-powered ingredient scanning that gives you personalized health insights in seconds. 
            Make informed decisions about every product you consume.
          </motion.p>

          {/* Waitlist Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center px-2"
          >
            <Suspense fallback={<div className="h-14 w-full max-w-xl animate-pulse bg-white/5" />}>
              <WaitlistForm />
            </Suspense>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 sm:mt-12 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-8 text-white/30 text-xs sm:text-sm tracking-wider sm:tracking-widest uppercase"
          >
            <div className="flex items-center gap-2">
              <Lock className="h-3 w-3 sm:h-4 sm:w-4" strokeWidth={1.5} />
              <span>Privacy First</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-3 w-3 sm:h-4 sm:w-4" strokeWidth={1.5} />
              <span>Instant Results</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-3 w-3 sm:h-4 sm:w-4" strokeWidth={1.5} />
              <span>Global Database</span>
            </div>
          </motion.div>

          {/* Scroll Indicator with decorative line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-12 sm:mt-16 flex items-start justify-center gap-8"
          >
            {/* Left decorative line */}
            <div className="hidden sm:block w-px h-16 bg-gradient-to-b from-white/20 to-transparent" />
            
            {/* Scroll indicator */}
            <div className="flex flex-col items-center gap-2 text-white/20">
              <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
              <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-white/20 to-transparent" />
            </div>
            
            {/* Right decorative line (for symmetry) */}
            <div className="hidden sm:block w-px h-16 bg-gradient-to-b from-white/20 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm text-white/40 tracking-wider sm:tracking-widest uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <span className="text-xs sm:text-sm text-white/40 tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 block">Features</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 sm:mb-6">
              Intelligence in Every Scan
            </h2>
            <p className="max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base text-white/50 font-light px-4">
              Powered by advanced AI to deliver personalized health insights instantly.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card-premium group glass p-6 sm:p-8"
              >
                <div className="mb-4 sm:mb-6 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">
                  <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-semibold text-white tracking-wide">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-white/50 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-16 sm:py-24 lg:py-32 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <span className="text-xs sm:text-sm text-white/40 tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 block">About</span>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 sm:mb-6">
                Your Personal Health Guardian
              </h2>
              <p className="text-sm sm:text-base text-white/50 font-light leading-relaxed mb-4 sm:mb-6">
                Karrot AI was born from a simple idea: everyone deserves to know exactly what they&apos;re putting into their body. 
                Our AI analyzes product ingredients in real-time, cross-referencing them with your personal health profile 
                to give you actionable insights.
              </p>
              <p className="text-sm sm:text-base text-white/50 font-light leading-relaxed mb-6 sm:mb-8">
                Whether you&apos;re managing allergies, following a specific diet, or simply trying to make healthier choices, 
                Karrot AI is your trusted companion for every shopping trip.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <div className="flex items-center gap-3 text-white/70">
                  <div className="h-2 w-2 rounded-full bg-white/50" />
                  <span className="text-xs sm:text-sm tracking-wide">Personalized Analysis</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <div className="h-2 w-2 rounded-full bg-white/50" />
                  <span className="text-xs sm:text-sm tracking-wide">Real-time Results</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <div className="h-2 w-2 rounded-full bg-white/50" />
                  <span className="text-xs sm:text-sm tracking-wide">Science-backed</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden max-w-sm mx-auto lg:max-w-none border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-10 pointer-events-none" />
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/about-video.mp4" type="video/mp4" />
                </video>
              </div>
              {/* Decorative Elements - Hidden on mobile */}
              <div className="hidden sm:block absolute -top-4 -right-4 w-16 sm:w-24 h-16 sm:h-24 border border-white/10 rounded-xl" />
              <div className="hidden sm:block absolute -bottom-4 -left-4 w-16 sm:w-24 h-16 sm:h-24 border border-white/10 rounded-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-16 sm:py-24 lg:py-32 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <span className="text-xs sm:text-sm text-white/40 tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 block">How It Works</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Three Simple Steps
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-8">
            {[
              { step: '01', icon: Smartphone, title: 'Scan', description: 'Point your camera at any product barcode or ingredient label' },
              { step: '02', icon: Eye, title: 'Analyze', description: 'Our AI instantly analyzes ingredients against your health profile' },
              { step: '03', icon: Leaf, title: 'Decide', description: 'Get clear, personalized recommendations for your health goals' }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative text-center md:text-left"
              >
                <div className="text-5xl sm:text-6xl lg:text-8xl font-light text-white/5 absolute -top-4 sm:-top-6 lg:-top-8 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0">{item.step}</div>
                <div className="relative z-10 pt-8 sm:pt-10 lg:pt-12">
                  <div className="mb-4 sm:mb-6 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/5 border border-white/10">
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-2 sm:mb-3 text-xl sm:text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="text-sm sm:text-base text-white/50 font-light">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 sm:mb-6">
              Be the First to Know
            </h2>
            <p className="text-sm sm:text-base text-white/50 font-light mb-8 sm:mb-12 max-w-xl mx-auto px-4">
              Join our waitlist today and get early access when we launch. 
              Start making healthier choices with AI-powered insights.
            </p>
            <Suspense fallback={<div className="h-14 w-full max-w-xl mx-auto animate-pulse bg-white/5" />}>
              <div className="flex justify-center">
                <WaitlistForm />
              </div>
            </Suspense>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-12 sm:py-16 lg:py-20 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 text-center sm:text-left">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-1 sm:mb-2">Get in Touch</h3>
              <p className="text-sm sm:text-base text-white/50 font-light">Have questions? We&apos;d love to hear from you.</p>
            </div>
            <a 
              href="mailto:contact@karrotai.app"
              className="group flex items-center gap-2 sm:gap-3 text-white hover:text-white/80 transition-colors"
            >
              <Mail className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
              <span className="text-sm sm:text-base tracking-wide">contact@karrotai.app</span>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 sm:py-12 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="flex flex-col gap-8">
            {/* Top Row - Logo and Social Links */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <Image
                  src="/logo.svg"
                  alt="Karrot AI"
                  width={32}
                  height={32}
                  className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
                />
                <span className="text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase text-white/60">Karrot AI</span>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/karrotai?igsh=aDgzY3NibnRzYWhu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all duration-300"
                  aria-label="Follow us on Instagram"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://tiktok.com/@karrot.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all duration-300"
                  aria-label="Follow us on TikTok"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a
                  href="https://x.com/KarrotAI?t=2iHy5bdpCuH5IlyLUSM9ug&s=08"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all duration-300"
                  aria-label="Follow us on X (Twitter)"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Bottom Row - Links and Copyright */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
                <Link href="/faq" className="text-xs sm:text-sm text-white/40 hover:text-white/60 transition-colors tracking-wide">
                  FAQ
                </Link>
                <Link href="/promoter/register" className="text-xs sm:text-sm text-white/40 hover:text-white/60 transition-colors tracking-wide">
                  Become a Promoter
                </Link>
                <Link href="/privacy" className="text-xs sm:text-sm text-white/40 hover:text-white/60 transition-colors tracking-wide">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-xs sm:text-sm text-white/40 hover:text-white/60 transition-colors tracking-wide">
                  Terms of Service
                </Link>
              </div>
              <span className="text-xs sm:text-sm text-white/40 tracking-wide">
                © {new Date().getFullYear()} Karrot AI. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
