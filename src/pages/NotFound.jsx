import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 px-6">
      <div className="max-w-xl text-center">
        <div className="mb-6">
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
            <circle cx="36" cy="36" r="34" stroke="url(#g)" strokeWidth="2" />
            <path d="M24 28C28 22 44 22 48 28" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round"/>
            <path d="M27 44C31 48 41 48 45 44" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round"/>
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="72" y2="72" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22D3EE"/>
                <stop offset="1" stopColor="#60A5FA"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">404</h1>
        <p className="mt-3 text-lg text-slate-300">We couldn’t find that page. But we can help your systems find each other.</p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link to="/" className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium shadow-lg shadow-cyan-500/20 hover:brightness-110 transition">Go home</Link>
          <Link to="/contact" className="px-5 py-2.5 rounded-lg bg-slate-800 text-slate-100 border border-slate-700 hover:border-slate-600 transition">Contact us</Link>
        </div>
      </div>
    </div>
  )
}
