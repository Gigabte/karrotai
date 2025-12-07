import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const promoter = await prisma.promoter.findUnique({
          where: { email: credentials.email }
        })

        if (!promoter) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, promoter.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: promoter.id,
          email: promoter.email,
          name: promoter.name,
          referralCode: promoter.referralCode
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.referralCode = (user as { referralCode?: string }).referralCode
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string
        (session.user as { referralCode?: string }).referralCode = token.referralCode as string
      }
      return session
    }
  },
  pages: {
    signIn: '/promoter/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
