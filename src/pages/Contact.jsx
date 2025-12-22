import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

function Contact() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // If navigated with #contact-form or #book-a-call, scroll into view on mount
  useEffect(() => {
    const hash = window.location.hash
    if (hash === '#contact-form') {
      const el = document.getElementById('contact-form')
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    if (hash === '#book-a-call') {
      const el = document.getElementById('book-a-call')
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  // Load Calendly script once
  useEffect(() => {
    const src = 'https://assets.calendly.com/assets/external/widget.js'
    const exists = document.querySelector(`script[src="${src}"]`)
    if (!exists) {
      const script = document.createElement('script')
      script.src = src
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = {
      name: formData.get('name')?.toString().trim(),
      email: formData.get('email')?.toString().trim(),
      company: formData.get('company')?.toString().trim() || undefined,
      message: formData.get('message')?.toString().trim(),
      website: formData.get('website')?.toString().trim() || undefined, // honeypot
    }

    const base = import.meta.env.VITE_BACKEND_URL
    const url = `${base}/api/contact`

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail || `Request failed: ${res.status}`)
      }
      setSuccess(true)
      form.reset()
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pt-28">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Contact</h1>
          <p className="mt-3 text-blue-100">Tell us about your venture—get a pragmatic plan in days.</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left: Contact form card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            {!success && (
              <form id="contact-form" className="grid gap-3" onSubmit={onSubmit}>
                <input name="name" type="text" placeholder="Name" required className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-blue-200/60 focus:outline-none" />
                <input name="email" type="email" placeholder="Email" required className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-blue-200/60 focus:outline-none" />
                <input name="company" type="text" placeholder="Company" className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-blue-200/60 focus:outline-none" />
                {/* Honeypot */}
                <input name="website" type="text" autoComplete="off" tabIndex="-1" className="hidden" />
                <textarea name="message" placeholder="What are you building?" required className="h-28 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-blue-200/60 focus:outline-none" />
                <button type="submit" disabled={loading} className="mt-2 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition disabled:opacity-60">
                  {loading ? 'Sending…' : 'Get my plan'}
                </button>
              </form>
            )}
            {success && (
              <div className="text-center py-10">
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12.5L9 16.5L19 6.5" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-white">We got your message, will get back to you asap in 22 hr!</h2>
                <p className="mt-2 text-blue-100">Meanwhile, feel free to explore our approach and pricing.</p>
                <div className="mt-6 flex justify-center gap-3">
                  <a href="/approach" className="px-5 py-2.5 rounded-lg bg-slate-800 text-slate-100 border border-slate-700 hover:border-slate-600 transition">Our approach</a>
                  <a href="/pricing" className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20 hover:brightness-110 transition">See pricing</a>
                </div>
              </div>
            )}
            {error && !success && <p className="mt-4 text-sm text-rose-300">{error}</p>}
          </div>

          {/* Right: Calendly embed card */}
          <div id="book-a-call" className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h2 className="text-xl font-semibold text-white">Book a strategy call</h2>
            <p className="mt-1 mb-4 text-sm text-blue-200/80">Pick a time that works for you — strategy, scoping, or quick Q&A.</p>
            {/* Calendly inline widget begin */}
            <div className="calendly-inline-widget" data-url="https://calendly.com/przntperfect/30min-discovery" style={{ minWidth: '320px', height: '700px' }}></div>
            {/* Calendly inline widget end */}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Contact
