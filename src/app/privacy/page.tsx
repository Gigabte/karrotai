'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="relative min-h-screen bg-black noise-overlay">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 lg:px-8 py-6">
        <Link href="/" className="flex items-center gap-3 group">
          <ArrowLeft className="h-4 w-4 text-white/40 group-hover:text-white transition-colors" strokeWidth={1.5} />
          <span className="text-sm text-white/40 group-hover:text-white transition-colors tracking-widest uppercase">Back</span>
        </Link>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Karrot AI" width={32} height={32} className="h-8 w-8" />
          <span className="text-sm tracking-[0.2em] uppercase text-white font-light">Karrot AI</span>
        </Link>
      </nav>

      {/* Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-white/40 text-sm mb-12">Last updated: December 2024</p>

          <div className="prose prose-invert prose-sm max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
              <p className="text-white/60 leading-relaxed">
                Welcome to Karrot AI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring you have a positive experience when using our AI-powered ingredient scanning application and website.
              </p>
              <p className="text-white/60 leading-relaxed mt-4">
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our mobile application.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Information We Collect</h2>
              
              <h3 className="text-lg font-medium text-white/90 mb-2">Personal Information</h3>
              <p className="text-white/60 leading-relaxed">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside text-white/60 space-y-2 mt-2">
                <li>Register for our waitlist</li>
                <li>Create a promoter account</li>
                <li>Contact us directly</li>
                <li>Subscribe to our newsletter</li>
              </ul>
              <p className="text-white/60 leading-relaxed mt-4">
                This information may include your name, email address, and location (country/city).
              </p>

              <h3 className="text-lg font-medium text-white/90 mb-2 mt-6">Automatically Collected Information</h3>
              <p className="text-white/60 leading-relaxed">
                When you access our website, we may automatically collect certain information, including:
              </p>
              <ul className="list-disc list-inside text-white/60 space-y-2 mt-2">
                <li>Device and browser type</li>
                <li>IP address and approximate location</li>
                <li>Pages visited and time spent</li>
                <li>Referring website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
              <p className="text-white/60 leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-white/60 space-y-2 mt-2">
                <li>Process and manage your waitlist registration</li>
                <li>Send you updates about our app launch and features</li>
                <li>Track referrals and promoter commissions</li>
                <li>Improve our website and services</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Data Sharing and Disclosure</h2>
              <p className="text-white/60 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-white/60 space-y-2 mt-2">
                <li><strong className="text-white/80">Service Providers:</strong> With trusted third-party service providers who assist us in operating our website and services</li>
                <li><strong className="text-white/80">Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong className="text-white/80">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. Data Security</h2>
              <p className="text-white/60 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Your Rights</h2>
              <p className="text-white/60 leading-relaxed">
                Depending on your location, you may have the following rights regarding your personal data:
              </p>
              <ul className="list-disc list-inside text-white/60 space-y-2 mt-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to or restrict processing</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
              </ul>
              <p className="text-white/60 leading-relaxed mt-4">
                To exercise these rights, please contact us at <a href="mailto:contact@karrotai.app" className="text-white hover:text-white/80 underline">contact@karrotai.app</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. Cookies</h2>
              <p className="text-white/60 leading-relaxed">
                We use essential cookies to ensure our website functions properly. We may also use analytics cookies to understand how visitors interact with our website. You can control cookies through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. Children&apos;s Privacy</h2>
              <p className="text-white/60 leading-relaxed">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">9. Changes to This Policy</h2>
              <p className="text-white/60 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">10. Contact Us</h2>
              <p className="text-white/60 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-white/60 leading-relaxed mt-2">
                Email: <a href="mailto:contact@karrotai.app" className="text-white hover:text-white/80 underline">contact@karrotai.app</a>
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Karrot AI" width={24} height={24} className="h-6 w-6" />
            <span className="text-xs text-white/40">© {new Date().getFullYear()} Karrot AI</span>
          </div>
          <div className="flex gap-6">
            <Link href="/terms" className="text-xs text-white/40 hover:text-white/60 transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-xs text-white/40 hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
