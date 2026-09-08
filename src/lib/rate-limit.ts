/**
 * Small in-memory rate limiter keyed by an arbitrary string (usually an IP).
 *
 * State lives in the process, so on serverless hosts each warm instance keeps
 * its own counters and the limit is "per instance", not global. That is still
 * enough to stop a single client from firing dozens of emails in a burst,
 * which is the realistic abuse case for a contact form. Swap the store for
 * Redis/Upstash if a global limit ever becomes necessary.
 */

type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()

/** Drop expired buckets so the map cannot grow without bound. */
function sweep(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key)
  }
}

export type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; retryAfterMs: number }

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now()

  // Cheap amortised cleanup: only sweep once the map gets noticeably large.
  if (buckets.size > 1000) sweep(now)

  const bucket = buckets.get(key)

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, remaining: limit - 1 }
  }

  if (bucket.count >= limit) {
    return { ok: false, retryAfterMs: bucket.resetAt - now }
  }

  bucket.count += 1
  return { ok: true, remaining: limit - bucket.count }
}
