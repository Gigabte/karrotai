'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Shield,
  ArrowLeft,
  Send,
  Mail,
  Users,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react'

export default function NewsletterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  
  const [formData, setFormData] = useState({
    subject: '',
    headline: '',
    content: '',
    ctaText: '',
    ctaUrl: '',
    sendToWaitlist: true,
    sendToPromoters: true
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.subject || !formData.headline || !formData.content) {
      setResult({ success: false, message: 'Please fill in all required fields' })
      return
    }

    const adminEmail = localStorage.getItem('adminEmail')
    if (!adminEmail) {
      router.push('/admin/login')
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/admin/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-email': adminEmail
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (res.ok) {
        setResult({ 
          success: true, 
          message: data.message || 'Newsletter sent successfully!' 
        })
        // Reset form
        setFormData({
          subject: '',
          headline: '',
          content: '',
          ctaText: '',
          ctaUrl: '',
          sendToWaitlist: true,
          sendToPromoters: true
        })
      } else {
        setResult({ 
          success: false, 
          message: data.error || 'Failed to send newsletter' 
        })
      }
    } catch (error) {
      setResult({ 
        success: false, 
        message: 'Something went wrong. Please try again.' 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-zinc-900 sticky top-0 bg-black/80 backdrop-blur-xl z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <button className="p-2 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
                <ArrowLeft className="w-5 h-5 text-zinc-400" />
              </button>
            </Link>
            <Image src="/logo.svg" alt="Karrot AI" width={40} height={40} />
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5">
              <Shield className="w-4 h-4 text-amber-500" />
              <span className="text-xs text-amber-500 font-medium">ADMIN</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Mail className="w-8 h-8 text-amber-500" />
            <h1 className="text-3xl font-bold text-white">Send Newsletter</h1>
          </div>
          <p className="text-zinc-500">Send announcements and updates to your waitlist and promoters</p>
        </motion.div>

        {/* Result Message */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-xl border flex items-center gap-3 ${
              result.success 
                ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                : 'bg-red-500/10 border-red-500/50 text-red-400'
            }`}
          >
            {result.success ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <p className="text-sm">{result.message}</p>
          </motion.div>
        )}

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Recipients */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-zinc-400" />
              Recipients
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.sendToWaitlist}
                  onChange={(e) => setFormData({ ...formData, sendToWaitlist: e.target.checked })}
                  className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-white">Send to Waitlist Users</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.sendToPromoters}
                  onChange={(e) => setFormData({ ...formData, sendToPromoters: e.target.checked })}
                  className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-amber-500 focus:ring-amber-500"
                />
                <span className="text-white">Send to Promoters</span>
              </label>
            </div>
          </div>

          {/* Email Content */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 space-y-5">
            <h3 className="text-lg font-medium text-white mb-4">Email Content</h3>
            
            {/* Subject */}
            <div>
              <label className="block text-zinc-400 text-sm mb-2">
                Subject Line <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Exciting news from Karrot AI!"
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                required
              />
            </div>

            {/* Headline */}
            <div>
              <label className="block text-zinc-400 text-sm mb-2">
                Email Headline <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                placeholder="Big announcement!"
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-zinc-400 text-sm mb-2">
                Email Content (HTML supported) <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="<p>We're excited to announce...</p>"
                rows={8}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none font-mono text-sm"
                required
              />
              <p className="text-zinc-600 text-xs mt-2">You can use HTML tags for formatting</p>
            </div>

            {/* CTA Button (Optional) */}
            <div className="pt-4 border-t border-zinc-800">
              <h4 className="text-white text-sm font-medium mb-4">Call to Action (Optional)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-sm mb-2">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.ctaText}
                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                    placeholder="Learn More"
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-sm mb-2">
                    Button URL
                  </label>
                  <input
                    type="url"
                    value={formData.ctaUrl}
                    onChange={(e) => setFormData({ ...formData, ctaUrl: e.target.value })}
                    placeholder="https://karrotai.com"
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-4 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Newsletter
              </>
            )}
          </button>
        </motion.form>
      </main>
    </div>
  )
}
