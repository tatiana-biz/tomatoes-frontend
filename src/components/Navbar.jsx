import { useState } from 'react'
import { ArrowRight, PhoneCall } from 'lucide-react'
import { Link } from 'react-router-dom'
import TomatoLogo from './TomatoLogo'

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 backdrop-blur supports-[backdrop-filter]:bg-white/5">
          <div className="flex items-center gap-3 px-4 py-3">
            <TomatoLogo className="shrink-0" size={28} />
            <Link to="/" className="text-lg font-semibold tracking-tight text-white">
              Blue Tomatoes
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 px-4">
            <Link to="/solutions" className="text-sm text-blue-100 hover:text-white transition-colors">Solutions</Link>
            <Link to="/approach" className="text-sm text-blue-100 hover:text-white transition-colors">Approach</Link>
            <Link to="/pricing" className="text-sm text-blue-100 hover:text-white transition-colors">Pricing</Link>
            <Link to="/contact" className="text-sm text-blue-100 hover:text-white transition-colors">Contact</Link>
            <Link to="/contact#book-a-call" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 hover:brightness-105 transition">
              <PhoneCall className="h-4 w-4" />
              Book a Strategy Call
              <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
          <button
            className="md:hidden mr-4 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 p-2 text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {open && (
          <div className="md:hidden mt-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
            <div className="flex flex-col gap-2">
              <Link to="/solutions" className="rounded-lg px-2 py-2 text-sm text-blue-100 hover:text-white">Solutions</Link>
              <Link to="/approach" className="rounded-lg px-2 py-2 text-sm text-blue-100 hover:text-white">Approach</Link>
              <Link to="/pricing" className="rounded-lg px-2 py-2 text-sm text-blue-100 hover:text-white">Pricing</Link>
              <Link to="/contact" className="rounded-lg px-2 py-2 text-sm text-blue-100 hover:text-white">Contact</Link>
              <Link to="/contact#book-a-call" className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20">
                <PhoneCall className="h-4 w-4" />
                Book a Strategy Call
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
