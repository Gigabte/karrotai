'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react'

export default function PromoterLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        router.push('/promoter/dashboard')
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-black noise-overlay">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-white/[0.02] blur-3xl" />
        <div className="hidden sm:block absolute top-20 left-20 w-px h-40 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <div className="hidden sm:block absolute bottom-20 right-20 w-px h-40 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
          <ArrowLeft className="h-4 w-4 text-white/40 group-hover:text-white transition-colors" strokeWidth={1.5} />
          <span className="text-xs sm:text-sm text-white/40 group-hover:text-white transition-colors tracking-widest uppercase">Back</span>
        </Link>
      </nav>

      <main className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="text-center mb-8 sm:mb-12">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.svg"
                alt="Karrot AI"
                width={60}
                height={60}
                className="h-12 w-12 sm:h-16 sm:w-16 object-contain mx-auto mb-4 sm:mb-6"
              />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">Promoter Login</h1>
            <p className="text-white/40 text-xs sm:text-sm tracking-wide">Access your affiliate dashboard</p>
          </div>

          {/* Form */}
          <div className="glass p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
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
                    className="w-full border border-white/10 bg-white/[0.02] px-12 py-4 text-base sm:text-sm text-white placeholder-white/30 transition-all focus:border-white/30 focus:bg-white/[0.04] focus-ring tracking-wide"
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
                    className="w-full border border-white/10 bg-white/[0.02] px-12 py-4 text-base sm:text-sm text-white placeholder-white/30 transition-all focus:border-white/30 focus:bg-white/[0.04] focus-ring tracking-wide"
                    placeholder="••••••••"
                  />
                </div>
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
                  'Signing in...'
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-white/40 text-xs sm:text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/promoter/register" className="text-white hover:text-white/80 transition-colors line-animated">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
