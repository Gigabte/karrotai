'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Copy, 
  Check, 
  LogOut, 
  MousePointer, 
  Users, 
  TrendingUp, 
  Percent,
  Globe,
  Clock,
  Mail,
  MapPin,
  ArrowUpRight
} from 'lucide-react'

interface PromoterStats {
  promoter: {
    id: string
    name: string
    email: string
    referralCode: string
    commission: number
    createdAt: string
  }
  stats: {
    totalClicks: number
    totalSignups: number
    conversionRate: string
    clicksByCountry: { country: string; count: number }[]
    signupsByCountry: { country: string; count: number }[]
  }
  recentClicks: {
    id: string
    country: string | null
    city: string | null
    createdAt: string
  }[]
  recentSignups: {
    id: string
    email: string
    country: string | null
    city: string | null
    createdAt: string
  }[]
}

export default function PromoterDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [data, setData] = useState<PromoterStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/promoter/login')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchStats()
    }
  }, [status])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/promoter/stats')
      if (response.ok) {
        const statsData = await response.json()
        setData(statsData)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyReferralLink = () => {
    if (data?.promoter.referralCode) {
      const link = `${window.location.origin}?ref=${data.promoter.referralCode}`
      navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Mask email to show only partial (e.g., "jo***@gm***.com")
  const maskEmail = (email: string) => {
    const [localPart, domain] = email.split('@')
    if (!domain) return '***@***.***'
    
    const [domainName, domainExt] = domain.split('.')
    
    const maskedLocal = localPart.length > 2 
      ? localPart.slice(0, 2) + '***' 
      : localPart[0] + '***'
    
    const maskedDomain = domainName.length > 2 
      ? domainName.slice(0, 2) + '***' 
      : domainName[0] + '***'
    
    return `${maskedLocal}@${maskedDomain}.${domainExt || '***'}`
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-white/50 tracking-widest text-sm uppercase">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const referralLink = data?.promoter.referralCode 
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}?ref=${data.promoter.referralCode}`
    : ''

  const stats = [
    { 
      icon: MousePointer, 
      value: data?.stats.totalClicks || 0, 
      label: 'Total Clicks',
      color: 'from-blue-500/20 to-transparent'
    },
    { 
      icon: Users, 
      value: data?.stats.totalSignups || 0, 
      label: 'Waitlist Signups',
      color: 'from-green-500/20 to-transparent'
    },
    { 
      icon: TrendingUp, 
      value: `${data?.stats.conversionRate || '0.00'}%`, 
      label: 'Conversion Rate',
      color: 'from-purple-500/20 to-transparent'
    },
    { 
      icon: Percent, 
      value: `${data?.promoter.commission || 20}%`, 
      label: 'Commission Rate',
      color: 'from-orange-500/20 to-transparent'
    }
  ]

  return (
    <div className="min-h-screen bg-black noise-overlay">
      {/* Header */}
      <header className="glass-strong sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="Karrot AI"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <span className="text-sm tracking-[0.2em] uppercase text-white font-light">Karrot AI</span>
            </Link>
            <div className="flex items-center gap-6">
              <span className="text-sm text-white/40 tracking-wide hidden sm:block">Welcome, {data?.promoter.name}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors tracking-widest uppercase"
              >
                <LogOut className="h-4 w-4" strokeWidth={1.5} />
                <span className="hidden sm:block">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Dashboard</h1>
          <p className="text-white/40 text-sm tracking-wide">Track your referral performance and earnings</p>
        </motion.div>

        {/* Referral Link Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="glass p-6 lg:p-8 mb-8"
        >
          <h2 className="text-xs font-light text-white/50 tracking-widest uppercase mb-4">Your Referral Link</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              readOnly
              value={referralLink}
              className="flex-1 border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white tracking-wide"
            />
            <button
              onClick={copyReferralLink}
              className="btn-premium flex items-center justify-center gap-2 bg-white px-6 py-3 text-black transition-all hover:bg-white/90 tracking-widest text-sm uppercase"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 + index * 0.05 }}
              className="glass p-6 relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-50`} />
              <div className="relative z-10">
                <stat.icon className="h-5 w-5 text-white/40 mb-4" strokeWidth={1.5} />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-white/40 tracking-widest uppercase">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Clicks by Country */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass p-6 lg:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Globe className="h-5 w-5 text-white/40" strokeWidth={1.5} />
              <h3 className="text-xs font-light text-white/50 tracking-widest uppercase">Clicks by Country</h3>
            </div>
            {data?.stats.clicksByCountry && data.stats.clicksByCountry.length > 0 ? (
              <div className="space-y-4">
                {data.stats.clicksByCountry.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-white/60 text-sm tracking-wide">{item.country}</span>
                    <span className="text-white font-light">{item.count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/30 text-sm">No click data yet</p>
            )}
          </motion.div>

          {/* Signups by Country */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="glass p-6 lg:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-5 w-5 text-white/40" strokeWidth={1.5} />
              <h3 className="text-xs font-light text-white/50 tracking-widest uppercase">Signups by Country</h3>
            </div>
            {data?.stats.signupsByCountry && data.stats.signupsByCountry.length > 0 ? (
              <div className="space-y-4">
                {data.stats.signupsByCountry.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-white/60 text-sm tracking-wide">{item.country}</span>
                    <span className="text-white font-light">{item.count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/30 text-sm">No signup data yet</p>
            )}
          </motion.div>

          {/* Recent Clicks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass p-6 lg:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Clock className="h-5 w-5 text-white/40" strokeWidth={1.5} />
              <h3 className="text-xs font-light text-white/50 tracking-widest uppercase">Recent Clicks</h3>
            </div>
            {data?.recentClicks && data.recentClicks.length > 0 ? (
              <div className="space-y-4">
                {data.recentClicks.slice(0, 5).map((click) => (
                  <div key={click.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-white/30" strokeWidth={1.5} />
                      <span className="text-white/60 text-sm">
                        {click.city || 'Unknown'}, {click.country || 'Unknown'}
                      </span>
                    </div>
                    <span className="text-white/30 text-xs">{formatDate(click.createdAt)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/30 text-sm">No clicks yet</p>
            )}
          </motion.div>

          {/* Recent Signups */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="glass p-6 lg:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Mail className="h-5 w-5 text-white/40" strokeWidth={1.5} />
              <h3 className="text-xs font-light text-white/50 tracking-widest uppercase">Recent Signups</h3>
            </div>
            {data?.recentSignups && data.recentSignups.length > 0 ? (
              <div className="space-y-4">
                {data.recentSignups.slice(0, 5).map((signup) => (
                  <div key={signup.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div>
                      <div className="text-white text-sm">{maskEmail(signup.email)}</div>
                      <div className="text-white/30 text-xs flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" strokeWidth={1.5} />
                        {signup.city || 'Unknown'}, {signup.country || 'Unknown'}
                      </div>
                    </div>
                    <span className="text-white/30 text-xs">{formatDate(signup.createdAt)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/30 text-sm">No signups yet</p>
            )}
          </motion.div>
        </div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass p-6 lg:p-8"
        >
          <h3 className="text-xs font-light text-white/50 tracking-widest uppercase mb-8">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Share Your Link', description: 'Share your unique referral link with your audience' },
              { step: '02', title: 'Users Join Waitlist', description: 'When users sign up through your link, you get credit' },
              { step: '03', title: 'Earn Commission', description: `Earn ${data?.promoter.commission || 20}% commission when the app launches` }
            ].map((item, index) => (
              <div key={item.step} className="relative">
                <div className="text-6xl font-light text-white/5 absolute -top-4 left-0">{item.step}</div>
                <div className="relative z-10 pt-8">
                  <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                  <p className="text-white/40 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
