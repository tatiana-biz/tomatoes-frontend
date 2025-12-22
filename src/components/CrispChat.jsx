import { useEffect } from 'react'

export default function CrispChat() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Prevent duplicate injections (React 18 StrictMode mounts effects twice in dev)
    const existing = document.querySelector('script[data-crisp-loader="true"]')
    if (!existing) {
      window.$crisp = window.$crisp || []
      window.CRISP_WEBSITE_ID = 'bf521f0d-2063-44b4-9af2-c4903aa6f3a5'
      const s = document.createElement('script')
      s.src = 'https://client.crisp.chat/l.js'
      s.async = true
      s.setAttribute('data-crisp-loader', 'true')
      // Prefer head per Crisp guidance
      const head = document.getElementsByTagName('head')[0]
      head.appendChild(s)
    }

    // No cleanup to avoid removing chat widget on re-mount during development
    // return () => {}
  }, [])

  return null
}
