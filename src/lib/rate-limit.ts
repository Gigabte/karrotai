// Simple in-memory rate limiter
// For production, consider using Redis-based rate limiting

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

interface RateLimitConfig {
  interval: number // Time window in milliseconds
  maxRequests: number // Max requests per interval
}

export function rateLimit(
  identifier: string,
  config: RateLimitConfig = { interval: 60000, maxRequests: 5 }
): { success: boolean; remaining: number; resetIn: number } {
  const now = Date.now()
  const entry = rateLimitMap.get(identifier)

  // Clean up old entries periodically
  if (Math.random() < 0.01) {
    cleanupOldEntries(now)
  }

  if (!entry || now > entry.resetTime) {
    // Create new entry or reset expired one
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + config.interval
    })
    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetIn: config.interval
    }
  }

  if (entry.count >= config.maxRequests) {
    // Rate limit exceeded
    return {
      success: false,
      remaining: 0,
      resetIn: entry.resetTime - now
    }
  }

  // Increment counter
  entry.count++
  return {
    success: true,
    remaining: config.maxRequests - entry.count,
    resetIn: entry.resetTime - now
  }
}

function cleanupOldEntries(now: number) {
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key)
    }
  }
}

// Rate limit configurations for different endpoints
export const RATE_LIMITS = {
  waitlist: { interval: 60000, maxRequests: 3 }, // 3 signups per minute
  promoterRegister: { interval: 300000, maxRequests: 3 }, // 3 registrations per 5 minutes
  promoterLogin: { interval: 60000, maxRequests: 5 }, // 5 login attempts per minute
  adminLogin: { interval: 60000, maxRequests: 3 }, // 3 login attempts per minute
  trackClick: { interval: 1000, maxRequests: 10 }, // 10 clicks per second
}
