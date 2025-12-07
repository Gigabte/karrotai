'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function TermsOfService() {
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
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-white/40 text-sm mb-12">Last updated: December 2024</p>

          <div className="prose prose-invert prose-sm max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
              <p className="text-white/60 leading-relaxed">
                By accessing or using the Karrot AI website and services (&quot;Services&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you disagree with any part of the terms, you may not access the Services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Description of Services</h2>
              <p className="text-white/60 leading-relaxed">
                Karrot AI provides an AI-powered ingredient scanning application that helps users understand product ingredients and make informed health decisions. Our Services include:
              </p>
              <ul className="list-disc list-inside text-white/60 space-y-2 mt-2">
                <li>Waitlist registration for early access</li>
                <li>Promoter program for referral commissions</li>
                <li>AI-powered ingredient analysis (upon app launch)</li>
                <li>Personalized health insights and recommendations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. Waitlist Registration</h2>
              <p className="text-white/60 leading-relaxed">
                By joining our waitlist, you:
              </p>
              <ul className="list-disc list-inside text-white/60 space-y-2 mt-2">
                <li>Consent to receive emails about our launch and updates</li>
                <li>Provide accurate and truthful information</li>
                <li>Understand that waitlist position does not guarantee access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Promoter Program</h2>
              <p className="text-white/60 leading-relaxed">
                Our Promoter Program allows registered promoters to earn commissions by referring new users. By participating:
              </p>
              <ul className="list-disc list-inside text-white/60 space-y-2 mt-2">
                <li>You agree to promote Karrot AI ethically and honestly</li>
                <li>You will not use spam, misleading claims, or deceptive practices</li>
                <li>Commission rates are set at 20% and may be modified with notice</li>
                <li>Commissions are only payable after the app launches and meets minimum thresholds</li>
                <li>We reserve the right to terminate accounts for policy violations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. User Accounts</h2>
              <p className="text-white/60 leading-relaxed">
                When you create an account with us, you must:
              </p>
              <ul className="list-disc list-inside text-white/60 space-y-2 mt-2">
                <li>Provide accurate, complete, and current information</li>
                <li>Maintain the security of your password</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Prohibited Uses</h2>
              <p className="text-white/60 leading-relaxed">
                You may not use our Services:
              </p>
              <ul className="list-disc list-inside text-white/60 space-y-2 mt-2">
                <li>For any unlawful purpose</li>
                <li>To harass, abuse, or harm another person</li>
                <li>To impersonate any person or entity</li>
                <li>To interfere with or disrupt the Services</li>
                <li>To attempt unauthorized access to our systems</li>
                <li>To collect user data without consent</li>
                <li>To send spam or unsolicited communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. Intellectual Property</h2>
              <p className="text-white/60 leading-relaxed">
                The Services and their original content, features, and functionality are owned by Karrot AI and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. Disclaimer of Warranties</h2>
              <p className="text-white/60 leading-relaxed">
                The Services are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind. We do not warrant that:
              </p>
              <ul className="list-disc list-inside text-white/60 space-y-2 mt-2">
                <li>The Services will be uninterrupted or error-free</li>
                <li>Results from using the Services will be accurate or reliable</li>
                <li>The quality of the Services will meet your expectations</li>
              </ul>
              <p className="text-white/60 leading-relaxed mt-4">
                <strong className="text-white/80">Health Disclaimer:</strong> Karrot AI provides informational content only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">9. Limitation of Liability</h2>
              <p className="text-white/60 leading-relaxed">
                To the maximum extent permitted by law, Karrot AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, use, or other intangible losses resulting from your use of the Services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">10. Termination</h2>
              <p className="text-white/60 leading-relaxed">
                We may terminate or suspend your account and access to the Services immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, your right to use the Services will cease immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">11. Changes to Terms</h2>
              <p className="text-white/60 leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. Material changes will be notified via email or a prominent notice on our website. Your continued use of the Services after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">12. Governing Law</h2>
              <p className="text-white/60 leading-relaxed">
                These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">13. Contact Us</h2>
              <p className="text-white/60 leading-relaxed">
                If you have any questions about these Terms, please contact us at:
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
