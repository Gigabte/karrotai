'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Login failed')
        setIsLoading(false)
        return
      }

      // Store admin session
      localStorage.setItem('adminEmail', data.admin.email)
      localStorage.setItem('adminName', data.admin.name)
      
      router.push('/admin/dashboard')
    } catch {
      setError('An error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 via-black to-black" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md py-8"
      >
        {/* Logo */}
        <Link href="/" className="flex justify-center mb-8 sm:mb-12">
          <Image 
            src="/logo.svg" 
            alt="Karrot AI" 
            width={80} 
            height={80}
            className="w-16 h-16 sm:w-20 sm:h-20 opacity-90 hover:opacity-100 transition-opacity"
          />
        </Link>

        {/* Admin Badge */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-amber-500/20 bg-amber-500/5">
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
            <span className="text-xs sm:text-sm text-amber-500 font-medium tracking-wide">ADMIN PORTAL</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3 tracking-tight">
            Admin Access
          </h1>
          <p className="text-zinc-500 text-xs sm:text-sm">
            Restricted access for Karrot AI administrators
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-red-500/10 border border-red-500/20"
            >
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-xs sm:text-sm">{error}</p>
            </motion.div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Admin email"
              required
              className="w-full px-12 py-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-base sm:text-sm text-white placeholder:text-zinc-600 focus:border-amber-500/50 focus:bg-zinc-900 transition-all duration-300"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-12 py-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-base sm:text-sm text-white placeholder:text-zinc-600 focus:border-amber-500/50 focus:bg-zinc-900 transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                Access Dashboard
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Back link */}
        <div className="mt-6 sm:mt-8 text-center">
          <Link 
            href="/" 
            className="text-zinc-600 hover:text-zinc-400 text-xs sm:text-sm transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </motion.div>

      {/* Bottom security notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute bottom-4 sm:bottom-8 text-center px-4"
      >
        <p className="text-zinc-700 text-xs">
          🔒 This is a secure admin portal. Unauthorized access is prohibited.
        </p>
      </motion.div>
    </div>
  )
}
