import { useEffect } from 'react'
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'

// Tiny analytics manager: choose between Vercel Analytics and Cloudflare Web Analytics
// Configure via environment variables:
// - VITE_ANALYTICS_PROVIDER: 'vercel' | 'cloudflare' | 'none'
// - VITE_CF_BEACON_TOKEN: Cloudflare Beacon token (required if provider = 'cloudflare')

export default function AnalyticsManager() {
  const provider = import.meta.env.VITE_ANALYTICS_PROVIDER || 'vercel'
  const cfToken = import.meta.env.VITE_CF_BEACON_TOKEN || ''

  useEffect(() => {
    if (provider !== 'cloudflare') return
    if (!cfToken) {
      console.warn('[analytics] Cloudflare token missing. Skipping Cloudflare Web Analytics.')
      return
    }
    const script = document.createElement('script')
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js'
    script.defer = true
    script.setAttribute('data-cf-beacon', JSON.stringify({ token: cfToken }))
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [provider, cfToken])

  if (provider === 'vercel') {
    return <VercelAnalytics />
  }
  // No visual output for Cloudflare or none — Cloudflare injects a script above
  return null
}
